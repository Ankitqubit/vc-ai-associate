"use client";

import { useEffect } from 'react';
import { MemoSection as MemoSectionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from '@/lib/contexts/memo-context';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

interface MemoSectionProps {
    section: MemoSectionType;
    sectionNumber: number;
}

export function MemoSection({ section, sectionNumber }: MemoSectionProps) {
    const { updateSection } = useMemo();

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
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
            const text = editor.getText();
            if (text !== section.content && text.trim()) {
                // Debounce save
                const timeoutId = setTimeout(() => {
                    updateSection(section.id, text);
                }, 1000);
                return () => clearTimeout(timeoutId);
            }
        },
    });

    // Update editor content when section changes
    useEffect(() => {
        if (editor && editor.getText() !== section.content) {
            editor.commands.setContent(section.content);
        }
    }, [section.content, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="mb-8">
            {/* Section Title - Clean and minimal like Notion */}
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {section.title}
            </h2>

            {/* Section Content - Clean, no borders, just like Notion */}
            <div className="transition-colors">
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
