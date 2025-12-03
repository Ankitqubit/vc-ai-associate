"use client";

import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CommentReply as CommentReplyType } from '@/lib/types';
import { MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentReplyProps {
  reply: CommentReplyType;
  onDelete?: (replyId: string) => void;
  currentUserId?: string;
}

export function CommentReply({
  reply,
  onDelete,
  currentUserId = 'user-current',
}: CommentReplyProps) {
  const timeAgo = formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true });
  const isOwnReply = reply.author.id === currentUserId;

  // Render @mentions as highlighted spans
  const renderContent = (content: string) => {
    // Simple regex to find @mentions in the text
    const mentionRegex = /@(\w+\s+\w+)/g;
    const parts = content.split(mentionRegex);

    return parts.map((part, index) => {
      // Every odd index is a captured mention name
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

  return (
    <div className="flex gap-2 pl-10">
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
        <AvatarFallback className="text-xs">
          {reply.author.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{reply.author.name}</span>
          {reply.author.isAi && (
            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
              AI
            </span>
          )}
          <span className="text-xs text-muted-foreground">{timeAgo}</span>

          {isOwnReply && onDelete && (
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
                <DropdownMenuItem
                  onClick={() => onDelete(reply.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete reply
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="text-sm text-foreground mt-1 whitespace-pre-wrap">
          {renderContent(reply.content)}
        </div>
      </div>
    </div>
  );
}
