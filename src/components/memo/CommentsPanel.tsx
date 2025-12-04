"use client";

import { useMemo } from '@/lib/contexts/memo-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, CheckCircle2, Users, X, Reply, FileText, MapPin } from 'lucide-react';
import { CommentThread } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CommentsPanelProps {
    onClose?: () => void;
}

export function CommentsPanel({ onClose }: CommentsPanelProps) {
    const { memo, comments, teamMembers } = useMemo();
    const [selectedThread, setSelectedThread] = useState<string | null>(null);

    if (!memo) {
        return null;
    }

    // Group comments by section
    const commentsBySection = memo.sections.map(section => ({
        section,
        comments: comments.filter(c => c.sectionId === section.id),
    })).filter(group => group.comments.length > 0);

    const openCount = comments.filter(c => c.status === 'open').length;
    const resolvedCount = comments.filter(c => c.status === 'resolved').length;

    return (
        <div className="h-full flex flex-col bg-white border-l border-slate-200">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-600" />
                    <h3 className="font-semibold text-sm">Comments</h3>
                    <Badge variant="secondary" className="ml-1 h-5 text-xs">
                        {comments.length}
                    </Badge>
                </div>
                {onClose && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-7 w-7 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Stats */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-slate-600">{openCount} open</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-600">{resolvedCount} resolved</span>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto">
                {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <MessageSquare className="h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-sm font-medium text-slate-900 mb-1">
                            No comments yet
                        </p>
                        <p className="text-xs text-slate-500">
                            Select text in the memo to add a comment, or ask the AI to comment on sections.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 p-4">
                        {commentsBySection.map(({ section, comments: sectionComments }) => (
                            <div key={section.id} className="space-y-2">
                                {/* Section Header */}
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs font-normal">
                                        {section.title}
                                    </Badge>
                                    <span className="text-xs text-slate-500">
                                        {sectionComments.length} {sectionComments.length === 1 ? 'comment' : 'comments'}
                                    </span>
                                </div>

                                {/* Comment Threads */}
                                {sectionComments.map(thread => (
                                    <CommentThreadCard
                                        key={thread.id}
                                        thread={thread}
                                        isExpanded={selectedThread === thread.id}
                                        onToggle={() => setSelectedThread(
                                            selectedThread === thread.id ? null : thread.id
                                        )}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface CommentThreadCardProps {
    thread: CommentThread;
    isExpanded: boolean;
    onToggle: () => void;
}

function CommentThreadCard({ thread, isExpanded, onToggle }: CommentThreadCardProps) {
    const isResolved = thread.status === 'resolved';
    const isAiAuthor = thread.author.isAi;
    const hasHighlightedText = !!thread.textRange.text;

    const handleClick = (e: React.MouseEvent) => {
        // Toggle expansion
        onToggle();

        // Scroll to section
        const sectionElement = document.getElementById(`section-${thread.sectionId}`);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add temporary highlight effect
            sectionElement.classList.add('bg-blue-50', 'ring-2', 'ring-blue-300', 'ring-offset-2');
            setTimeout(() => {
                sectionElement.classList.remove('bg-blue-50', 'ring-2', 'ring-blue-300', 'ring-offset-2');
            }, 2000);
        }
    };

    return (
        <Card
            className={cn(
                "p-3 cursor-pointer transition-all hover:shadow-sm hover:border-blue-300",
                isResolved && "opacity-60 border-green-200 bg-green-50/30",
                isAiAuthor && "border-blue-200 bg-blue-50/30"
            )}
            onClick={handleClick}
        >
            {/* Thread Header */}
            <div className="flex items-start gap-2 mb-2">
                <Avatar className="h-6 w-6 mt-0.5">
                    {thread.author.avatar ? (
                        <AvatarImage src={thread.author.avatar} />
                    ) : null}
                    <AvatarFallback className={cn(
                        "text-xs",
                        isAiAuthor ? "bg-blue-500 text-white" : "bg-slate-200"
                    )}>
                        {isAiAuthor ? 'AI' : thread.author.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-900">
                            {thread.author.name}
                        </span>
                        {isAiAuthor && (
                            <Badge variant="secondary" className="h-4 text-[10px] px-1">
                                AI
                            </Badge>
                        )}
                        {isResolved && (
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                        )}
                        <span className="text-[10px] text-slate-500 ml-auto">
                            {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                        </span>
                    </div>

                    {/* Comment Type Indicator & Highlighted Text */}
                    <div className="flex items-start gap-1.5 mb-2">
                        {thread.textRange.text ? (
                            // Inline comment indicator
                            <>
                                <MapPin className="h-3 w-3 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 text-[11px] text-slate-600 bg-yellow-50 border border-yellow-200 rounded px-2 py-1 italic">
                                    "{thread.textRange.text}"
                                </div>
                            </>
                        ) : (
                            // Section comment indicator
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                <FileText className="h-3 w-3" />
                                <span>Section comment</span>
                            </div>
                        )}
                    </div>

                    {/* Comment Content */}
                    <p className={cn(
                        "text-xs text-slate-700 leading-relaxed",
                        !isExpanded && "line-clamp-2"
                    )}>
                        {thread.content}
                    </p>

                    {/* Mentions */}
                    {thread.mentions.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-blue-600">
                            <Users className="h-3 w-3" />
                            <span>{thread.mentions.map(m => m.userName).join(', ')}</span>
                        </div>
                    )}

                    {/* Replies Count */}
                    {thread.replies.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
                            <Reply className="h-3 w-3" />
                            <span>{thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Expanded View - Replies */}
            {isExpanded && thread.replies.length > 0 && (
                <div className="ml-8 mt-3 space-y-2 border-l-2 border-slate-200 pl-3">
                    {thread.replies.map(reply => (
                        <div key={reply.id} className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                    {reply.author.avatar ? (
                                        <AvatarImage src={reply.author.avatar} />
                                    ) : null}
                                    <AvatarFallback className={cn(
                                        "text-[10px]",
                                        reply.author.isAi ? "bg-blue-500 text-white" : "bg-slate-200"
                                    )}>
                                        {reply.author.isAi ? 'AI' : reply.author.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] font-medium text-slate-900">
                                    {reply.author.name}
                                </span>
                                {reply.author.isAi && (
                                    <Badge variant="secondary" className="h-3 text-[9px] px-1">
                                        AI
                                    </Badge>
                                )}
                                <span className="text-[9px] text-slate-500 ml-auto">
                                    {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed">
                                {reply.content}
                            </p>
                            {reply.mentions.length > 0 && (
                                <div className="flex items-center gap-1 text-[9px] text-blue-600">
                                    <Users className="h-2.5 w-2.5" />
                                    <span>{reply.mentions.map(m => m.userName).join(', ')}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
