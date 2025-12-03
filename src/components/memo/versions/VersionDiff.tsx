"use client";

import { VersionDiff as VersionDiffType, DiffChange } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface VersionDiffProps {
  diffs: VersionDiffType[];
}

export function VersionDiff({ diffs }: VersionDiffProps) {
  if (!diffs || diffs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-sm text-muted-foreground">
          Select two versions to compare
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6 space-y-4">
      {diffs.map((diff) => (
        <DiffSection key={diff.sectionId} diff={diff} />
      ))}
    </div>
  );
}

function DiffSection({ diff }: { diff: VersionDiffType }) {
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="bg-muted/30 px-4 py-2 flex items-center gap-2">
        <span className="text-sm font-medium">{diff.sectionTitle}</span>
        <DiffTypeBadge type={diff.type} />
      </div>

      {/* Diff Content */}
      <div className="p-4">
        {diff.type === 'added' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Plus className="h-3 w-3 text-green-500" />
              Section added
            </p>
            <div
              className="text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: diff.newContent || '' }}
            />
          </div>
        )}

        {diff.type === 'removed' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Minus className="h-3 w-3 text-red-500" />
              Section removed
            </p>
            <div
              className="text-sm prose prose-sm max-w-none opacity-60 line-through"
              dangerouslySetInnerHTML={{ __html: diff.oldContent || '' }}
            />
          </div>
        )}

        {diff.type === 'modified' && (
          <div className="space-y-3">
            <InlineDiff changes={diff.changes} />
          </div>
        )}

        {diff.type === 'unchanged' && (
          <p className="text-xs text-muted-foreground">No changes</p>
        )}
      </div>
    </div>
  );
}

function InlineDiff({ changes }: { changes: DiffChange[] }) {
  return (
    <div className="text-sm leading-relaxed">
      {changes.map((change, idx) => (
        <span
          key={idx}
          className={cn(
            change.type === 'add' && "bg-green-500/20 text-green-700 dark:text-green-300",
            change.type === 'remove' && "bg-red-500/20 text-red-700 dark:text-red-300 line-through",
            change.type === 'unchanged' && "text-foreground"
          )}
        >
          {change.value}
        </span>
      ))}
    </div>
  );
}

function DiffTypeBadge({ type }: { type: VersionDiffType['type'] }) {
  switch (type) {
    case 'added':
      return (
        <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/50 text-green-700">
          <Plus className="h-3 w-3 mr-1" />
          Added
        </Badge>
      );
    case 'removed':
      return (
        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-500/50 text-red-700">
          <Minus className="h-3 w-3 mr-1" />
          Removed
        </Badge>
      );
    case 'modified':
      return (
        <Badge variant="outline" className="text-xs bg-yellow-500/10 border-yellow-500/50 text-yellow-700">
          Modified
        </Badge>
      );
    default:
      return null;
  }
}
