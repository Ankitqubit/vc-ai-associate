"use client";

import { useEffect, useState } from 'react';
import { MemoSection as MemoSectionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from '@/lib/contexts/memo-context';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import { BubbleMenuToolbar } from './BubbleMenuToolbar';
import { useCopilotAction } from '@copilotkit/react-core';

interface MemoSectionProps {
    section: MemoSectionType;
    sectionNumber: number;
}

export function MemoSection({ section, sectionNumber }: MemoSectionProps) {
    const { updateSection } = useMemo();
    const [isAIProcessing, setIsAIProcessing] = useState(false);

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
            if (html !== section.content) {
                // Debounce save
                const timeoutId = setTimeout(() => {
                    updateSection(section.id, html);
                }, 1000);
                return () => clearTimeout(timeoutId);
            }
        },
    });

    // Update editor content when section changes
    useEffect(() => {
        if (editor && editor.getHTML() !== section.content) {
            editor.commands.setContent(section.content);
        }
    }, [section.content, editor]);

    // Handle AI actions
    const handleAIAction = async (action: string, selectedText: string) => {
        if (!editor) return;

        setIsAIProcessing(true);
        const { from, to } = editor.state.selection;

        try {
            // Here we'll integrate with CopilotKit to handle AI actions
            // For now, just showing a placeholder
            console.log(`AI Action: ${action}`, selectedText);

            // TODO: Integrate with CopilotKit action for each AI operation
            // Example actions:
            // - ask: Open AI chat with context
            // - explain: Get AI explanation and insert as comment/highlight
            // - rewrite/expand/simplify: Get AI suggestions and replace text
            // - fact-check: Verify against deal data
            // - flag-risk: Add risk annotation
            // - mark-key: Highlight as important

            // Placeholder: Show that AI is working
            setTimeout(() => {
                setIsAIProcessing(false);
            }, 1000);
        } catch (error) {
            console.error('AI action failed:', error);
            setIsAIProcessing(false);
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="mb-8 relative">
            {/* AI Processing Indicator */}
            {isAIProcessing && (
                <div className="absolute top-0 right-0 flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    AI working...
                </div>
            )}

            {/* Section Title - Clean and minimal like Notion */}
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {section.title}
            </h2>

            {/* Section Content - Clean, no borders, just like Notion */}
            <div className="transition-colors">
                {/* Bubble Menu Toolbar */}
                <BubbleMenuToolbar editor={editor} onAIAction={handleAIAction} />

                <EditorContent editor={editor} />
            </div>

            <style jsx global>{`
                .ProseMirror {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #334155;
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
            `}</style>
        </div>
    );
}
