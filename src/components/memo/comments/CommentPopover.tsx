"use client";

import { useEffect, useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CommentThread } from './CommentThread';
import { CommentInput } from './CommentInput';
import { CommentThread as CommentThreadType, TeamMember } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';

interface CommentPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  position?: { top: number; left: number };
  // For new comments
  selectedText?: string;
  onCreateComment?: (content: string, mentions: any[]) => void;
  // For existing comments
  threads?: CommentThreadType[];
  teamMembers: TeamMember[];
  onReply?: (threadId: string, content: string, mentions: any[]) => void;
  onDelete?: (threadId: string) => void;
  onDeleteReply?: (threadId: string, replyId: string) => void;
  onResolve?: (threadId: string, status: CommentThreadType['status']) => void;
  currentUserId?: string;
}

export function CommentPopover({
  isOpen,
  onOpenChange,
  position,
  selectedText,
  onCreateComment,
  threads = [],
  teamMembers,
  onReply,
  onDelete,
  onDeleteReply,
  onResolve,
  currentUserId,
}: CommentPopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-position popover near selected text
  useEffect(() => {
    if (isOpen && position && contentRef.current) {
      const content = contentRef.current;
      content.style.position = 'fixed';
      content.style.top = `${position.top}px`;
      content.style.left = `${position.left}px`;
    }
  }, [isOpen, position]);

  const isNewComment = !threads || threads.length === 0;

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {/* Hidden trigger - we control opening programmatically */}
        <span />
      </PopoverTrigger>

      <PopoverContent
        ref={contentRef}
        className="w-[400px] p-0"
        align="start"
        side="right"
        sideOffset={10}
      >
        <div className="p-4 border-b bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <h3 className="font-medium text-sm">
              {isNewComment ? 'Add Comment' : 'Comments'}
            </h3>
            {!isNewComment && (
              <span className="text-xs text-muted-foreground ml-auto">
                {threads.length} {threads.length === 1 ? 'thread' : 'threads'}
              </span>
            )}
          </div>
        </div>

        <ScrollArea className="max-h-[500px]">
          <div className="p-4">
            {/* Show selected text context for new comments */}
            {isNewComment && selectedText && (
              <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900 border-l-2 border-blue-500 rounded text-sm italic">
                "{selectedText}"
              </div>
            )}

            {/* New Comment Input */}
            {isNewComment && onCreateComment && (
              <CommentInput
                placeholder="Add your comment..."
                onSubmit={onCreateComment}
                onCancel={() => onOpenChange(false)}
                autoFocus
                teamMembers={teamMembers}
              />
            )}

            {/* Existing Comment Threads */}
            {!isNewComment && (
              <div className="space-y-6">
                {threads.map((thread) => (
                  <CommentThread
                    key={thread.id}
                    thread={thread}
                    teamMembers={teamMembers}
                    onReply={onReply!}
                    onDelete={onDelete}
                    onDeleteReply={onDeleteReply}
                    onResolve={onResolve}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isNewComment && threads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No comments yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
