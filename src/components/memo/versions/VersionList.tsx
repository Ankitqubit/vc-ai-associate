"use client";

import { MemoVersion } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VersionListItem } from "./VersionListItem";
import { Loader2, History } from "lucide-react";

interface VersionListProps {
  versions: MemoVersion[];
  currentVersion: number;
  selectedVersion: MemoVersion | null;
  isLoading: boolean;
  onSelectVersion: (version: MemoVersion) => void;
  onRestoreVersion: (versionId: string) => void;
}

export function VersionList({
  versions,
  currentVersion,
  selectedVersion,
  isLoading,
  onSelectVersion,
  onRestoreVersion,
}: VersionListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">Loading versions...</p>
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <History className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-sm font-medium text-foreground mb-1">No version history yet</p>
        <p className="text-xs text-muted-foreground">
          Versions will be created automatically as you edit
        </p>
      </div>
    );
  }

  // Sort versions by version number descending (newest first)
  const sortedVersions = [...versions].sort((a, b) => b.versionNumber - a.versionNumber);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {sortedVersions.map((version) => (
          <VersionListItem
            key={version.id}
            version={version}
            isSelected={selectedVersion?.id === version.id}
            isCurrent={version.versionNumber === currentVersion}
            onClick={() => onSelectVersion(version)}
            onRestore={() => onRestoreVersion(version.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
