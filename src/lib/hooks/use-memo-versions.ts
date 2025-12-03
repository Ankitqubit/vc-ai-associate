import { useState, useCallback } from 'react';
import { MemoVersion, VersionDiff } from '@/lib/types';
import { calculateVersionDiff } from '@/lib/utils/diff';

interface UseMemoVersionsReturn {
  versions: MemoVersion[];
  isLoading: boolean;
  selectedVersion: MemoVersion | null;
  compareVersion: MemoVersion | null;
  diff: VersionDiff[] | null;

  fetchVersions: (memoId: string) => Promise<void>;
  selectVersion: (version: MemoVersion | null) => void;
  setCompareVersion: (version: MemoVersion | null) => void;
  restoreVersion: (memoId: string, versionId: string) => Promise<boolean>;
  clearSelection: () => void;
}

export function useMemoVersions(): UseMemoVersionsReturn {
  const [versions, setVersions] = useState<MemoVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<MemoVersion | null>(null);
  const [compareVersion, setCompareVersion] = useState<MemoVersion | null>(null);
  const [diff, setDiff] = useState<VersionDiff[] | null>(null);

  /**
   * Fetch all versions for a memo
   */
  const fetchVersions = useCallback(async (memoId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/memos/${memoId}/versions`);
      if (!response.ok) throw new Error('Failed to fetch versions');

      const data = await response.json();
      setVersions(data.versions || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
      setVersions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Select a version to view
   */
  const selectVersion = useCallback((version: MemoVersion | null) => {
    setSelectedVersion(version);

    // If comparing two versions, calculate diff
    if (version && compareVersion) {
      const versionDiff = calculateVersionDiff(compareVersion, version);
      setDiff(versionDiff);
    } else {
      setDiff(null);
    }
  }, [compareVersion]);

  /**
   * Set the version to compare against
   */
  const setCompareVersionCallback = useCallback((version: MemoVersion | null) => {
    setCompareVersion(version);

    // If comparing two versions, calculate diff
    if (version && selectedVersion) {
      const versionDiff = calculateVersionDiff(version, selectedVersion);
      setDiff(versionDiff);
    } else {
      setDiff(null);
    }
  }, [selectedVersion]);

  /**
   * Restore a previous version
   */
  const restoreVersion = useCallback(async (memoId: string, versionId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/memos/${memoId}/versions/${versionId}/restore`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to restore version');

      // Refetch versions to get the new state
      await fetchVersions(memoId);

      return true;
    } catch (error) {
      console.error('Error restoring version:', error);
      return false;
    }
  }, [fetchVersions]);

  /**
   * Clear all selections
   */
  const clearSelection = useCallback(() => {
    setSelectedVersion(null);
    setCompareVersion(null);
    setDiff(null);
  }, []);

  return {
    versions,
    isLoading,
    selectedVersion,
    compareVersion,
    diff,
    fetchVersions,
    selectVersion,
    setCompareVersion: setCompareVersionCallback,
    restoreVersion,
    clearSelection,
  };
}
