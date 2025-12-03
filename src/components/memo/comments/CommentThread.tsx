"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CommentThread as CommentThreadType, TeamMember } from '@/lib/types';
import { CommentReply } from './CommentReply';
import { CommentInput } from './CommentInput';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  MoreVertical,
  Trash2,
  Reply as ReplyIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CommentThreadProps {
  thread: CommentThreadType;
  teamMembers: TeamMember[];
  onReply: (threadId: string, content: string, mentions: any[]) => void;
  onDelete?: (threadId: string) => void;
  onDeleteReply?: (threadId: string, replyId: string) => void;
  onResolve?: (threadId: string, status: CommentThreadType['status']) => void;
  currentUserId?: string;
  className?: string;
}

export function CommentThread({
  thread,
  teamMembers,
  onReply,
  onDelete,
  onDeleteReply,
  onResolve,
  currentUserId = 'user-current',
  className,
}: CommentThreadProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true });
  const isOwnComment = thread.author.id === currentUserId;

  const handleReply = (content: string, mentions: any[]) => {
    onReply(thread.id, content, mentions);
    setShowReplyInput(false);
  };

  const handleResolve = (status: CommentThreadType['status']) => {
    onResolve?.(thread.id, status);
  };

  // Render @mentions as highlighted spans
  const renderContent = (content: string) => {
    const mentionRegex = /@(\w+\s+\w+)/g;
    const parts = content.split(mentionRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            className="text-blue-600 dark:text-blue-400 font-medium"
          >
            @{part}
          </span>
        );
      }
      return part;
    });
  };

  const getStatusBadge = () => {
    switch (thread.status) {
      case 'addressed':
        return (
          <Badge variant="outline" className="gap-1 text-green-700 bg-green-50 border-green-200">
            <CheckCircle className="h-3 w-3" />
            Addressed
          </Badge>
        );
      case 'dismissed':
        return (
          <Badge variant="outline" className="gap-1 text-gray-600 bg-gray-50 border-gray-200">
            <XCircle className="h-3 w-3" />
            Dismissed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            Open
          </Badge>
        );
    }
  };

  return (
    <div className={cn('group', className)}>
      {/* Highlighted Text Context */}
      {thread.textRange.text && (
        <div className="mb-3 p-2 bg-slate-50 dark:bg-slate-900 border-l-2 border-slate-300 dark:border-slate-700 rounded text-sm text-muted-foreground italic">
          "{thread.textRange.text}"
        </div>
      )}

      {/* Main Comment */}
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
          <AvatarFallback className="text-xs">
            {thread.author.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">{thread.author.name}</span>
            {thread.author.isAi && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                AI
              </span>
            )}
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
            {getStatusBadge()}

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onResolve && (
                  <>
                    <DropdownMenuItem onClick={() => handleResolve('addressed')}>
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Mark as addressed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleResolve('dismissed')}>
                      <XCircle className="h-3 w-3 mr-2" />
                      Dismiss
                    </DropdownMenuItem>
                    {thread.status !== 'open' && (
                      <DropdownMenuItem onClick={() => handleResolve('open')}>
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Reopen
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                  </>
                )}
                {isOwnComment && onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(thread.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete comment
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="text-sm text-foreground mt-1.5 whitespace-pre-wrap">
            {renderContent(thread.content)}
          </div>

          {/* Resolution Info */}
          {thread.resolvedBy && (
            <div className="text-xs text-muted-foreground mt-2">
              Resolved by {thread.resolvedBy.name} •{' '}
              {formatDistanceToNow(new Date(thread.resolvedBy.timestamp), { addSuffix: true })}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <ReplyIcon className="h-3 w-3 mr-1" />
              Reply
            </Button>

            {thread.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? 'Show' : 'Hide'} {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-3">
              <CommentInput
                placeholder="Write a reply..."
                onSubmit={handleReply}
                onCancel={() => setShowReplyInput(false)}
                autoFocus
                teamMembers={teamMembers}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {!isCollapsed && thread.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {thread.replies.map((reply) => (
            <CommentReply
              key={reply.id}
              reply={reply}
              onDelete={onDeleteReply ? (replyId) => onDeleteReply(thread.id, replyId) : undefined}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
