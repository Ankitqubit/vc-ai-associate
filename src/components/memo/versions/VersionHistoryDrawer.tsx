"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VersionList } from "./VersionList";
import { VersionDiff } from "./VersionDiff";
import { useMemoVersions } from "@/lib/hooks/use-memo-versions";
import { X, History, GitCompare } from "lucide-react";
import { toast } from "sonner";

interface VersionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memoId: string;
  currentVersion: number;
}

export function VersionHistoryDrawer({
  isOpen,
  onClose,
  memoId,
  currentVersion,
}: VersionHistoryDrawerProps) {
  const [activeTab, setActiveTab] = useState<"list" | "diff">("list");
  const {
    versions,
    isLoading,
    selectedVersion,
    compareVersion,
    diff,
    fetchVersions,
    selectVersion,
    setCompareVersion,
    restoreVersion,
    clearSelection,
  } = useMemoVersions();

  // Fetch versions when drawer opens
  useEffect(() => {
    if (isOpen && memoId) {
      fetchVersions(memoId);
    }
  }, [isOpen, memoId, fetchVersions]);

  // Clear selection when drawer closes
  useEffect(() => {
    if (!isOpen) {
      clearSelection();
      setActiveTab("list");
    }
  }, [isOpen, clearSelection]);

  const handleRestoreVersion = async (versionId: string) => {
    const success = await restoreVersion(memoId, versionId);

    if (success) {
      toast.success("Version restored successfully");
      onClose();
      // Trigger page reload to show restored content
      window.location.reload();
    } else {
      toast.error("Failed to restore version");
    }
  };

  const handleSelectVersion = (version: typeof selectedVersion) => {
    if (version) {
      selectVersion(version);

      // If this is the second selection, switch to diff view
      if (!selectedVersion && !compareVersion) {
        // First selection
        selectVersion(version);
      } else if (selectedVersion && !compareVersion) {
        // Second selection - set as compare version
        setCompareVersion(version);
        setActiveTab("diff");
      } else {
        // Reset and select new version
        clearSelection();
        selectVersion(version);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <SheetTitle>Version History</SheetTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription>
            {versions.length} version{versions.length !== 1 ? 's' : ''} saved
          </SheetDescription>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "list" | "diff")} className="flex-1 flex flex-col">
          <TabsList className="mx-6 grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Versions
            </TabsTrigger>
            <TabsTrigger value="diff" className="flex items-center gap-2" disabled={!diff}>
              <GitCompare className="h-4 w-4" />
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="flex-1 mt-4">
            <VersionList
              versions={versions}
              currentVersion={currentVersion}
              selectedVersion={selectedVersion}
              isLoading={isLoading}
              onSelectVersion={handleSelectVersion}
              onRestoreVersion={handleRestoreVersion}
            />
          </TabsContent>

          <TabsContent value="diff" className="flex-1 mt-4">
            {diff ? (
              <div>
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Comparing:</span>
                    <span className="font-medium text-foreground">
                      v{compareVersion?.versionNumber}
                    </span>
                    <span>→</span>
                    <span className="font-medium text-foreground">
                      v{selectedVersion?.versionNumber}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-7 text-xs"
                      onClick={() => {
                        clearSelection();
                        setActiveTab("list");
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
                <VersionDiff diffs={diff} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Select two versions to compare
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
