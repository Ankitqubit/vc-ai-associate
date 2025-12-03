import { diffWords, diffLines, Change } from 'diff';
import { VersionDiff, DiffChange, MemoVersion, MemoSection } from '@/lib/types';

/**
 * Calculate diff between two memo versions
 */
export function calculateVersionDiff(
  oldVersion: MemoVersion,
  newVersion: MemoVersion
): VersionDiff[] {
  const diffs: VersionDiff[] = [];
  const oldSectionsMap = new Map(oldVersion.sections.map(s => [s.id, s]));
  const newSectionsMap = new Map(newVersion.sections.map(s => [s.id, s]));

  // Check for modified and unchanged sections
  newVersion.sections.forEach(newSection => {
    const oldSection = oldSectionsMap.get(newSection.id);

    if (!oldSection) {
      // Section was added
      diffs.push({
        sectionId: newSection.id,
        sectionTitle: newSection.title,
        type: 'added',
        newContent: newSection.content,
        changes: [{ type: 'add', value: newSection.content }],
      });
    } else if (oldSection.content !== newSection.content) {
      // Section was modified
      const changes = calculateContentDiff(oldSection.content, newSection.content);
      diffs.push({
        sectionId: newSection.id,
        sectionTitle: newSection.title,
        type: 'modified',
        oldContent: oldSection.content,
        newContent: newSection.content,
        changes,
      });
    } else {
      // Section unchanged
      diffs.push({
        sectionId: newSection.id,
        sectionTitle: newSection.title,
        type: 'unchanged',
        oldContent: oldSection.content,
        newContent: newSection.content,
        changes: [{ type: 'unchanged', value: newSection.content }],
      });
    }
  });

  // Check for removed sections
  oldVersion.sections.forEach(oldSection => {
    if (!newSectionsMap.has(oldSection.id)) {
      diffs.push({
        sectionId: oldSection.id,
        sectionTitle: oldSection.title,
        type: 'removed',
        oldContent: oldSection.content,
        changes: [{ type: 'remove', value: oldSection.content }],
      });
    }
  });

  return diffs;
}

/**
 * Calculate word-level diff for content
 */
export function calculateContentDiff(oldContent: string, newContent: string): DiffChange[] {
  const changes: DiffChange[] = [];
  const diff = diffWords(oldContent, newContent);

  diff.forEach((part: Change) => {
    if (part.added) {
      changes.push({ type: 'add', value: part.value });
    } else if (part.removed) {
      changes.push({ type: 'remove', value: part.value });
    } else {
      changes.push({ type: 'unchanged', value: part.value });
    }
  });

  return changes;
}

/**
 * Calculate line-level diff for content (useful for large sections)
 */
export function calculateLineDiff(oldContent: string, newContent: string): DiffChange[] {
  const changes: DiffChange[] = [];
  const diff = diffLines(oldContent, newContent);
  let lineNumber = 1;

  diff.forEach((part: Change) => {
    if (part.added) {
      changes.push({ type: 'add', value: part.value, lineNumber });
      lineNumber += part.count || 1;
    } else if (part.removed) {
      changes.push({ type: 'remove', value: part.value, lineNumber });
    } else {
      changes.push({ type: 'unchanged', value: part.value, lineNumber });
      lineNumber += part.count || 1;
    }
  });

  return changes;
}

/**
 * Calculate change summary statistics
 */
export function calculateChangeStats(diffs: VersionDiff[]): {
  additions: number;
  deletions: number;
  modifications: number;
  totalChanges: number;
} {
  let additions = 0;
  let deletions = 0;
  let modifications = 0;

  diffs.forEach(diff => {
    if (diff.type === 'added') additions++;
    if (diff.type === 'removed') deletions++;
    if (diff.type === 'modified') modifications++;
  });

  return {
    additions,
    deletions,
    modifications,
    totalChanges: additions + deletions + modifications,
  };
}

/**
 * Calculate percentage of content that changed
 */
export function calculateChangePercentage(
  oldVersion: MemoVersion,
  newVersion: MemoVersion
): number {
  const oldContent = oldVersion.sections.map(s => s.content).join(' ');
  const newContent = newVersion.sections.map(s => s.content).join(' ');

  if (oldContent.length === 0) return 100;

  const diff = diffWords(oldContent, newContent);
  const changedWords = diff.filter(part => part.added || part.removed)
    .reduce((count, part) => count + (part.value.split(/\s+/).length || 0), 0);
  const totalWords = oldContent.split(/\s+/).length || 1;

  return Math.round((changedWords / totalWords) * 100);
}

/**
 * Strip HTML tags from content for plain text diff
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Get human-readable change description
 */
export function getChangeDescription(diffs: VersionDiff[]): string {
  const stats = calculateChangeStats(diffs);

  if (stats.totalChanges === 0) {
    return 'No changes';
  }

  const parts: string[] = [];

  if (stats.additions > 0) {
    parts.push(`${stats.additions} section${stats.additions > 1 ? 's' : ''} added`);
  }
  if (stats.modifications > 0) {
    parts.push(`${stats.modifications} section${stats.modifications > 1 ? 's' : ''} modified`);
  }
  if (stats.deletions > 0) {
    parts.push(`${stats.deletions} section${stats.deletions > 1 ? 's' : ''} removed`);
  }

  return parts.join(', ');
}
