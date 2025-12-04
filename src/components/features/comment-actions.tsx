"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useMemo } from "@/lib/contexts/memo-context";
import { CommentThread, CommentReply, TeamMember } from "@/lib/types";
import { toast } from "sonner";
import { CommentAddedCard } from "@/components/copilot/CommentAddedCard";

/**
 * CopilotKit actions for AI to interact with memo comments
 * Enables AI to create, reply to, resolve, and manage comment threads
 */
export function CommentActions() {
    const { memo, comments, setComments, teamMembers } = useMemo();

    // Action: Add Comment to Section
    useCopilotAction({
        name: "add_comment_to_section",
        description: "Add a comment or discussion to a specific memo section. Use this when the user asks to comment on a section, raise a concern, ask a question, or tag someone about a specific part of the memo. You can @mention team members by name. Available sections: executive_summary, company_overview, problem_solution, market_analysis, product, traction_metrics, team, business_model, competitive_landscape, thesis_fit, risks_concerns, open_questions, recommendation.",
        parameters: [
            {
                name: "sectionType",
                type: "string",
                description: "The type of section to comment on (e.g., 'risks_concerns', 'company_overview')",
                required: true,
            },
            {
                name: "highlightedText",
                type: "string",
                description: "Specific text from the section to highlight (optional, for context)",
                required: false,
            },
            {
                name: "comment",
                type: "string",
                description: "The comment content. Can include @mentions like '@Sarah Chen' or '@Michael Ross'.",
                required: true,
            },
            {
                name: "mentionNames",
                type: "string[]",
                description: "Array of team member names to @mention (e.g., ['Sarah Chen', 'Michael Ross'])",
                required: false,
            },
        ],
        handler: async ({ sectionType, highlightedText, comment, mentionNames }: {
            sectionType: string;
            highlightedText?: string;
            comment: string;
            mentionNames?: string[];
        }) => {
            if (!memo) {
                return "No memo is currently open. Please generate a memo first.";
            }

            // Find the section
            const section = memo.sections.find(s => s.type === sectionType);
            if (!section) {
                return `Section '${sectionType}' not found in the current memo.`;
            }

            // Parse mentions from comment content and mentionNames array
            const mentions: Array<{ userId: string; userName: string; position: number }> = [];
            const mentionSet = new Set<string>(mentionNames || []);

            // Extract mentions from comment text
            const mentionRegex = /@([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
            let match;
            while ((match = mentionRegex.exec(comment)) !== null) {
                mentionSet.add(match[1]);
            }

            // Map mention names to team member IDs
            mentionSet.forEach((mentionName) => {
                const member = teamMembers.find(m =>
                    m.name.toLowerCase() === mentionName.toLowerCase()
                );
                if (member) {
                    const position = comment.indexOf(`@${mentionName}`);
                    mentions.push({
                        userId: member.id,
                        userName: member.name,
                        position: position >= 0 ? position : 0,
                    });
                }
            });

            // Determine text range (if highlighted text provided, find it in section content)
            let textRange = {
                from: 0,
                to: 0,
                text: highlightedText || '',
            };

            if (highlightedText) {
                // Strip HTML tags for searching
                const plainContent = section.content.replace(/<[^>]*>/g, '');
                const startIndex = plainContent.indexOf(highlightedText);
                if (startIndex >= 0) {
                    textRange = {
                        from: startIndex,
                        to: startIndex + highlightedText.length,
                        text: highlightedText,
                    };
                }
            }

            // Create new comment thread
            const newThread: CommentThread = {
                id: `ai-comment-${Date.now()}`,
                memoId: memo.id,
                sectionId: section.id,
                textRange,
                content: comment,
                author: {
                    id: 'ai-assistant',
                    name: 'AI Associate',
                    isAi: true,
                },
                mentions,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'open',
                replies: [],
            };

            // Add to comments
            setComments((prev) => [...prev, newThread]);

            toast.success('Comment Added', {
                description: `Added to ${section.title}`,
            });

            return {
                success: true,
                commentId: newThread.id,
                sectionTitle: section.title,
                mentionedUsers: mentions.map(m => m.userName),
                message: `Successfully added comment to "${section.title}"${mentions.length > 0 ? ` and mentioned ${mentions.map(m => m.userName).join(', ')}` : ''}.`,
            };
        },
        render: ({ status, args, result }: any) => {
            return (
                <CommentAddedCard
                    sectionType={args.sectionType}
                    sectionTitle={result?.sectionTitle}
                    comment={args.comment}
                    mentionedUsers={args.mentionNames || result?.mentionedUsers}
                    status={status}
                    result={result}
                />
            );
        },
    });

    // Action: Reply to Comment
    useCopilotAction({
        name: "reply_to_comment",
        description: "Reply to an existing comment thread. Use this when the user asks to respond to someone's comment or continue a discussion.",
        parameters: [
            {
                name: "commentId",
                type: "string",
                description: "The ID of the comment thread to reply to. You can find this from the comments context.",
                required: true,
            },
            {
                name: "reply",
                type: "string",
                description: "The reply content. Can include @mentions.",
                required: true,
            },
            {
                name: "mentionNames",
                type: "string[]",
                description: "Array of team member names to @mention in the reply",
                required: false,
            },
        ],
        handler: async ({ commentId, reply, mentionNames }: {
            commentId: string;
            reply: string;
            mentionNames?: string[];
        }) => {
            const thread = comments.find(c => c.id === commentId);
            if (!thread) {
                return `Comment thread '${commentId}' not found.`;
            }

            // Parse mentions
            const mentions: Array<{ userId: string; userName: string; position: number }> = [];
            const mentionSet = new Set<string>(mentionNames || []);

            const mentionRegex = /@([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
            let match;
            while ((match = mentionRegex.exec(reply)) !== null) {
                mentionSet.add(match[1]);
            }

            mentionSet.forEach((mentionName) => {
                const member = teamMembers.find(m =>
                    m.name.toLowerCase() === mentionName.toLowerCase()
                );
                if (member) {
                    const position = reply.indexOf(`@${mentionName}`);
                    mentions.push({
                        userId: member.id,
                        userName: member.name,
                        position: position >= 0 ? position : 0,
                    });
                }
            });

            // Create reply
            const newReply: CommentReply = {
                id: `ai-reply-${Date.now()}`,
                threadId: commentId,
                content: reply,
                author: {
                    id: 'ai-assistant',
                    name: 'AI Associate',
                    isAi: true,
                },
                mentions,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Add reply to thread
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId
                        ? { ...comment, replies: [...comment.replies, newReply] }
                        : comment
                )
            );

            toast.success('Reply Added');

            return {
                success: true,
                replyId: newReply.id,
                message: `Successfully replied to comment${mentions.length > 0 ? ` and mentioned ${mentions.map(m => m.userName).join(', ')}` : ''}.`,
            };
        },
        render: ({ status, result }: any) => {
            if (status === "inProgress") {
                return (
                    <div className="w-full max-w-md p-4 border border-border/50 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8">
                                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
                                <div className="relative w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">↩️</span>
                                </div>
                            </div>
                            <p className="font-medium text-sm">Adding Reply...</p>
                        </div>
                    </div>
                );
            }

            if (status === "complete" && result?.success) {
                return (
                    <div className="w-full max-w-md p-4 border border-purple-200/50 rounded-lg bg-purple-500/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">↩️</span>
                            </div>
                            <p className="font-medium text-sm">Reply Added</p>
                        </div>
                    </div>
                );
            }

            return null;
        },
    });

    // Action: Resolve Comment
    useCopilotAction({
        name: "resolve_comment",
        description: "Mark a comment thread as resolved or reopen it. Use this when a discussion has been addressed or needs to be reopened.",
        parameters: [
            {
                name: "commentId",
                type: "string",
                description: "The ID of the comment thread to resolve/reopen",
                required: true,
            },
            {
                name: "status",
                type: "string",
                description: "New status: 'resolved' or 'open'",
                required: true,
            },
        ],
        handler: async ({ commentId, status }: {
            commentId: string;
            status: 'open' | 'resolved';
        }) => {
            const thread = comments.find(c => c.id === commentId);
            if (!thread) {
                return `Comment thread '${commentId}' not found.`;
            }

            const resolvedBy = status === 'resolved' ? {
                id: 'ai-assistant',
                name: 'AI Associate',
                timestamp: new Date().toISOString(),
            } : undefined;

            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId
                        ? { ...comment, status, resolvedBy, updatedAt: new Date().toISOString() }
                        : comment
                )
            );

            toast.success(status === 'resolved' ? 'Comment Resolved' : 'Comment Reopened');

            return {
                success: true,
                status,
                message: `Comment ${status === 'resolved' ? 'resolved' : 'reopened'} successfully.`,
            };
        },
        render: ({ status, args, result }: any) => {
            if (status === "inProgress") {
                return (
                    <div className="w-full max-w-md p-4 border border-border/50 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                                <div className="relative w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                            </div>
                            <p className="font-medium text-sm">{args.status === 'resolved' ? 'Resolving' : 'Reopening'} Comment...</p>
                        </div>
                    </div>
                );
            }

            if (status === "complete" && result?.success) {
                return (
                    <div className={`w-full max-w-md p-4 border rounded-lg ${
                        result.status === 'resolved'
                            ? 'border-green-200/50 bg-green-500/5'
                            : 'border-yellow-200/50 bg-yellow-500/5'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                result.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}>
                                <span className="text-white text-sm">{result.status === 'resolved' ? '✓' : '🔄'}</span>
                            </div>
                            <p className="font-medium text-sm">Comment {result.status === 'resolved' ? 'Resolved' : 'Reopened'}</p>
                        </div>
                    </div>
                );
            }

            return null;
        },
    });

    return null;
}
