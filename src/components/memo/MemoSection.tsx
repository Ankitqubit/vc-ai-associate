"use client";

import { useEffect, useState, useRef } from 'react';
import { MemoSection as MemoSectionType, CommentThread, TeamMember } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from '@/lib/contexts/memo-context';
import { useSelection } from '@/lib/contexts/selection-context';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import { CommentMark } from '@/lib/tiptap/extensions/CommentMark';
import { BubbleMenuToolbar } from './BubbleMenuToolbar';
import { CommentPopover } from './comments/CommentPopover';
import { useCopilotAction } from '@copilotkit/react-core';
import { AIPreviewDiff } from './AIPreviewDiff';
import { ExplanationTooltip } from './ExplanationTooltip';
import { toast } from 'sonner';
import { mockTeamMembers } from '@/lib/data/mock-db';

interface MemoSectionProps {
    section: MemoSectionType;
    sectionNumber: number;
}

export function MemoSection({ section, sectionNumber }: MemoSectionProps) {
    const { updateSection } = useMemo();
    const { setSelectedText } = useSelection();
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [aiActionType, setAiActionType] = useState<string>('');
    const [originalContent, setOriginalContent] = useState(section.content);
    const [wasEdited, setWasEdited] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout>();
    const isUpdatingRef = useRef(false);

    // Preview/Diff state
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState<{
        original: string;
        new: string;
        action: string;
        selectionRange: { from: number; to: number };
    } | null>(null);

    // Explanation state
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [explanationPosition, setExplanationPosition] = useState({ x: 0, y: 0 });

    // Comment state
    const [comments, setComments] = useState<CommentThread[]>([]);
    const [showCommentPopover, setShowCommentPopover] = useState(false);
    const [commentSelection, setCommentSelection] = useState<{
        text: string;
        from: number;
        to: number;
    } | null>(null);
    const [commentPosition, setCommentPosition] = useState({ top: 0, left: 0 });

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-indigo-600 underline cursor-pointer hover:text-indigo-700',
                },
            }),
            Highlight.configure({
                multicolor: true,
            }),
            CommentMark,
            BubbleMenuExtension,
            Placeholder.configure({
                placeholder: 'Click to add content...',
            }),
        ],
        content: section.content,
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[120px] py-3',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();

            // Skip if we're updating from external source
            if (isUpdatingRef.current) {
                return;
            }

            if (html !== section.content) {
                // Check if this is a significant edit (>5% content change)
                const oldLength = originalContent.replace(/<[^>]*>/g, '').length;
                const newLength = html.replace(/<[^>]*>/g, '').length;
                const changePercent = Math.abs(newLength - oldLength) / Math.max(oldLength, 1);

                // Mark as edited if significant change from original AI content
                if (changePercent > 0.05 && section.source === 'ai') {
                    setWasEdited(true);
                }

                // Debounce save - clear previous timeout
                if (saveTimeoutRef.current) {
                    clearTimeout(saveTimeoutRef.current);
                }
                saveTimeoutRef.current = setTimeout(() => {
                    updateSection(section.id, html);
                }, 1000);
            }
        },
    });

    // Update editor content when section changes (from external sources only)
    useEffect(() => {
        if (editor && editor.getHTML() !== section.content) {
            isUpdatingRef.current = true;
            editor.commands.setContent(section.content);
            // Reset flag after a brief delay
            setTimeout(() => {
                isUpdatingRef.current = false;
            }, 100);
        }
    }, [section.content, editor]);

    // Handle AI actions from toolbar
    const handleAIAction = async (action: string, selectedText: string) => {
        if (!editor) return;

        const { from, to } = editor.state.selection;

        try {
            setIsAIProcessing(true);
            setAiActionType(action);

            switch (action) {
                case 'ask':
                    // Set selected text in context for chat sidebar
                    setSelectedText(selectedText, section.title);
                    toast.success('Context Added to Chat', {
                        description: 'Type your question in the chat sidebar'
                    });
                    setIsAIProcessing(false);
                    setAiActionType('');
                    break;

                case 'explain':
                    // Get AI explanation and show tooltip
                    const explainResponse = await fetch('/api/memos/explain-text', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            text: selectedText,
                            context: {
                                sectionTitle: section.title,
                                sectionType: section.type,
                            },
                        }),
                    });

                    if (!explainResponse.ok) throw new Error('Failed to get explanation');

                    const explainData = await explainResponse.json();

                    // Get position of selection
                    const coords = editor.view.coordsAtPos(from);
                    setExplanationPosition({ x: coords.left + (coords.right - coords.left) / 2, y: coords.top });
                    setExplanation(explainData.explanation);
                    setShowExplanation(true);

                    // Highlight text in yellow
                    editor.chain().focus().setHighlight({ color: '#fef08a' }).run();
                    setWasEdited(true);
                    setIsAIProcessing(false);
                    setAiActionType('');
                    break;

                case 'rewrite':
                case 'expand':
                case 'simplify':
                    // Call AI API to transform the text
                    const response = await fetch('/api/memos/transform-text', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            text: selectedText,
                            action,
                            context: {
                                sectionTitle: section.title,
                                sectionType: section.type,
                            },
                        }),
                    });

                    if (!response.ok) throw new Error('Failed to transform text');

                    const data = await response.json();

                    // Show preview instead of applying immediately
                    setPreviewData({
                        original: selectedText,
                        new: data.transformedText,
                        action,
                        selectionRange: { from, to },
                    });
                    setShowPreview(true);
                    setIsAIProcessing(false);
                    setAiActionType('');
                    break;

                case 'flag-risk':
                    // Highlight as risk (red)
                    editor.chain().focus().setHighlight({ color: '#fecaca' }).run();
                    setWasEdited(true);
                    toast.success('Flagged as Risk', {
                        description: 'Text highlighted in red'
                    });
                    setIsAIProcessing(false);
                    setAiActionType('');
                    break;

                case 'mark-key':
                    // Highlight as key point (green)
                    editor.chain().focus().setHighlight({ color: '#bbf7d0' }).run();
                    setWasEdited(true);
                    toast.success('Marked as Key Point', {
                        description: 'Text highlighted in green'
                    });
                    setIsAIProcessing(false);
                    setAiActionType('');
                    break;

                default:
                    console.log(`Unknown action: ${action}`);
                    setIsAIProcessing(false);
                    setAiActionType('');
            }
        } catch (error) {
            console.error('AI action failed:', error);
            toast.error('Action Failed', {
                description: error instanceof Error ? error.message : 'Please try again'
            });
            setIsAIProcessing(false);
            setAiActionType('');
        }
    };

    // Handle accepting preview changes
    const handleAcceptPreview = () => {
        if (!editor || !previewData) return;

        const { from, to } = previewData.selectionRange;
        editor.chain().focus().deleteRange({ from, to }).insertContent(previewData.new).run();
        setWasEdited(true);
        setShowPreview(false);
        setPreviewData(null);

        toast.success('Changes Applied', {
            description: `Text ${previewData.action}d successfully`
        });
    };

    // Handle rejecting preview changes
    const handleRejectPreview = () => {
        setShowPreview(false);
        setPreviewData(null);
        toast.info('Changes Discarded', {
            description: 'Original text preserved'
        });
    };

    // Handle retrying with same action
    const handleRetryPreview = async () => {
        if (!previewData) return;

        setShowPreview(false);
        const tempData = previewData;
        setPreviewData(null);

        // Re-run the same action
        await handleAIAction(tempData.action, tempData.original);
    };

    // Handle comment creation from toolbar
    const handleComment = (selectedText: string, from: number, to: number) => {
        if (!editor) return;

        // Get position of selection for popover
        const coords = editor.view.coordsAtPos(from);
        setCommentPosition({
            top: coords.bottom + 10,
            left: coords.left
        });

        setCommentSelection({ text: selectedText, from, to });
        setShowCommentPopover(true);
    };

    // Create a new comment
    const handleCreateComment = async (content: string, mentions: any[]) => {
        if (!commentSelection || !editor) return;

        try {
            const commentId = `comment-${Date.now()}`;

            // Add comment mark to the selected text
            const { from, to } = commentSelection;
            editor.chain()
                .focus()
                .setTextSelection({ from, to })
                .setCommentMark(commentId)
                .run();

            // Create comment thread
            const newComment: CommentThread = {
                id: commentId,
                memoId: section.id, // Using section.id as memoId for now
                sectionId: section.id,
                textRange: {
                    from: commentSelection.from,
                    to: commentSelection.to,
                    text: commentSelection.text,
                },
                content,
                author: {
                    id: 'user-current',
                    name: mockTeamMembers[0].name,
                    avatar: mockTeamMembers[0].avatar,
                    isAi: false,
                },
                mentions,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'open',
                replies: [],
            };

            setComments((prev) => [...prev, newComment]);
            setShowCommentPopover(false);
            setCommentSelection(null);

            toast.success('Comment Added', {
                description: 'Your comment has been saved',
            });
        } catch (error) {
            console.error('Failed to create comment:', error);
            toast.error('Failed to Add Comment', {
                description: 'Please try again',
            });
        }
    };

    // Reply to a comment
    const handleReply = async (threadId: string, content: string, mentions: any[]) => {
        try {
            const reply = {
                id: `reply-${Date.now()}`,
                threadId,
                content,
                author: {
                    id: 'user-current',
                    name: mockTeamMembers[0].name,
                    avatar: mockTeamMembers[0].avatar,
                    isAi: false,
                },
                mentions,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === threadId
                        ? { ...comment, replies: [...comment.replies, reply] }
                        : comment
                )
            );

            toast.success('Reply Added');
        } catch (error) {
            console.error('Failed to add reply:', error);
            toast.error('Failed to Add Reply');
        }
    };

    // Delete a comment
    const handleDeleteComment = async (threadId: string) => {
        try {
            // Remove comment mark from editor
            if (editor) {
                editor.chain().focus().unsetCommentMark(threadId).run();
            }

            setComments((prev) => prev.filter((comment) => comment.id !== threadId));
            toast.success('Comment Deleted');
        } catch (error) {
            console.error('Failed to delete comment:', error);
            toast.error('Failed to Delete Comment');
        }
    };

    // Delete a reply
    const handleDeleteReply = async (threadId: string, replyId: string) => {
        try {
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === threadId
                        ? {
                              ...comment,
                              replies: comment.replies.filter((reply) => reply.id !== replyId),
                          }
                        : comment
                )
            );
            toast.success('Reply Deleted');
        } catch (error) {
            console.error('Failed to delete reply:', error);
            toast.error('Failed to Delete Reply');
        }
    };

    // Resolve/dismiss a comment
    const handleResolveComment = async (threadId: string, status: CommentThread['status']) => {
        try {
            const resolvedBy =
                status !== 'open'
                    ? {
                          id: 'user-current',
                          name: mockTeamMembers[0].name,
                          timestamp: new Date().toISOString(),
                      }
                    : undefined;

            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === threadId
                        ? { ...comment, status, resolvedBy, updatedAt: new Date().toISOString() }
                        : comment
                )
            );

            // Update comment mark status in editor
            if (editor) {
                const { doc } = editor.state;
                doc.descendants((node, pos) => {
                    node.marks.forEach((mark) => {
                        if (mark.type.name === 'commentMark' && mark.attrs.commentId === threadId) {
                            editor.commands.setTextSelection({ from: pos, to: pos + node.nodeSize });
                            editor.commands.setCommentMark(threadId);
                        }
                    });
                });
            }

            const statusText = status === 'addressed' ? 'Addressed' : status === 'dismissed' ? 'Dismissed' : 'Reopened';
            toast.success(`Comment ${statusText}`);
        } catch (error) {
            console.error('Failed to update comment:', error);
            toast.error('Failed to Update Comment');
        }
    };

    if (!editor) {
        return null;
    }

    // Determine if this is human-edited content
    const isHumanContent = section.source === 'human' || section.source === 'mixed' || (section.source === 'ai' && wasEdited);

    return (
        <div className="mb-8 relative group">
            {/* AI Processing Indicator */}
            {isAIProcessing && (
                <div className="absolute top-0 right-0 flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg shadow-sm z-10 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="font-medium">
                        {aiActionType === 'rewrite' && 'Rewriting...'}
                        {aiActionType === 'expand' && 'Expanding...'}
                        {aiActionType === 'simplify' && 'Simplifying...'}
                        {aiActionType === 'explain' && 'Generating explanation...'}
                        {!aiActionType && 'AI working...'}
                    </span>
                </div>
            )}

            {/* Section Title - Clean and minimal like Notion */}
            <h2 className={cn(
                "text-2xl font-bold mb-3 transition-colors",
                isHumanContent ? "text-cyan-600" : "text-slate-900"
            )}>
                {section.title}
            </h2>

            {/* Section Content with color differentiation */}
            <div className="transition-colors">
                {/* Bubble Menu Toolbar */}
                <BubbleMenuToolbar
                    editor={editor}
                    onAIAction={handleAIAction}
                    onComment={handleComment}
                />

                <EditorContent
                    editor={editor}
                    className={cn(
                        "memo-content",
                        isHumanContent && "text-cyan-700"
                    )}
                />
            </div>

            {/* Preview/Diff Modal */}
            {showPreview && previewData && (
                <AIPreviewDiff
                    originalText={previewData.original}
                    newText={previewData.new}
                    actionType={previewData.action}
                    onAccept={handleAcceptPreview}
                    onReject={handleRejectPreview}
                    onRetry={handleRetryPreview}
                />
            )}

            {/* Explanation Tooltip */}
            {showExplanation && explanation && (
                <ExplanationTooltip
                    explanation={explanation}
                    position={explanationPosition}
                    onClose={() => setShowExplanation(false)}
                    onAskFollowUp={() => {
                        setShowExplanation(false);
                        toast.info('Ask in Chat', {
                            description: 'Use the chat sidebar to ask follow-up questions'
                        });
                    }}
                />
            )}

            {/* Comment Popover */}
            <CommentPopover
                isOpen={showCommentPopover}
                onOpenChange={setShowCommentPopover}
                position={commentPosition}
                selectedText={commentSelection?.text}
                onCreateComment={handleCreateComment}
                threads={comments}
                teamMembers={mockTeamMembers}
                onReply={handleReply}
                onDelete={handleDeleteComment}
                onDeleteReply={handleDeleteReply}
                onResolve={handleResolveComment}
                currentUserId="user-current"
            />

            <style jsx global>{`
                .ProseMirror {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #334155;
                }

                .memo-content.text-cyan-700 .ProseMirror,
                .memo-content.text-cyan-700 .ProseMirror p,
                .memo-content.text-cyan-700 .ProseMirror h1,
                .memo-content.text-cyan-700 .ProseMirror h2,
                .memo-content.text-cyan-700 .ProseMirror li {
                    color: #0e7490 !important;
                }

                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #94a3b8;
                    pointer-events: none;
                    height: 0;
                }

                .ProseMirror:focus {
                    outline: none;
                }

                .ProseMirror h1 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }

                .ProseMirror h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                }

                .ProseMirror ul,
                .ProseMirror ol {
                    padding-left: 1.5rem;
                    margin: 0.75rem 0;
                }

                .ProseMirror li {
                    margin: 0.25rem 0;
                }

                .ProseMirror strong {
                    font-weight: 600;
                }

                .ProseMirror em {
                    font-style: italic;
                }

                /* Comment highlighting */
                .comment-highlight {
                    background-color: #fef3c7;
                    border-bottom: 2px solid #f59e0b;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .comment-highlight:hover {
                    background-color: #fde68a;
                }

                .comment-highlight[data-comment-status="addressed"] {
                    background-color: #d1fae5;
                    border-bottom-color: #10b981;
                }

                .comment-highlight[data-comment-status="dismissed"] {
                    background-color: #f3f4f6;
                    border-bottom-color: #9ca3af;
                }
            `}</style>
        </div>
    );
}
