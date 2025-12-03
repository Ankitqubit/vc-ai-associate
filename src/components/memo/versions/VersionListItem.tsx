"use client";

import { MemoVersion } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { History, Bot, User, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface VersionListItemProps {
  version: MemoVersion;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: () => void;
  onRestore?: () => void;
}

export function VersionListItem({
  version,
  isSelected,
  isCurrent,
  onClick,
  onRestore,
}: VersionListItemProps) {
  const timeAgo = formatDistanceToNow(new Date(version.createdAt), { addSuffix: true });

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all",
        "hover:bg-muted/50 hover:border-primary/50",
        isSelected
          ? "bg-primary/10 border-primary"
          : "bg-background border-border/50",
        "group"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Timeline dot */}
        <div className="flex flex-col items-center mt-1">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isSelected ? "bg-primary" : "bg-muted-foreground/40"
            )}
          />
          {!isCurrent && (
            <div className="w-px h-full bg-border/50 mt-1 min-h-[20px]" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              Version {version.versionNumber}
            </span>
            {isCurrent && (
              <Badge variant="outline" className="text-xs bg-primary/10 border-primary/50">
                <CheckCircle className="h-3 w-3 mr-1" />
                Current
              </Badge>
            )}
            {version.createdBy.isAi && (
              <Badge variant="outline" className="text-xs bg-cyan-500/10 border-cyan-500/50">
                <Bot className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>

          {/* Author & Time */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {version.createdBy.isAi ? (
              <Bot className="h-3 w-3" />
            ) : (
              <User className="h-3 w-3" />
            )}
            <span>{version.createdBy.name}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          {/* Description */}
          {version.changeDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {version.changeDescription}
            </p>
          )}

          {/* Restore Button (only show on hover for non-current versions) */}
          {!isCurrent && onRestore && (
            <Button
              size="sm"
              variant="ghost"
              className="mt-2 h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onRestore();
              }}
            >
              <History className="h-3 w-3 mr-1" />
              Restore
            </Button>
          )}
        </div>
      </div>
    </button>
  );
}
