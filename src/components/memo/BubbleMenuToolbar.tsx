"use client";

import { useEffect, useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Sparkles,
    HelpCircle,
    RefreshCw,
    Maximize2,
    Minimize2,
    AlertCircle,
    Star,
    MessageSquare,
} from 'lucide-react';

interface BubbleMenuToolbarProps {
    editor: Editor;
    onAIAction?: (action: string, selectedText: string) => void;
    onComment?: (selectedText: string, from: number, to: number) => void;
}

export function BubbleMenuToolbar({ editor, onAIAction, onComment }: BubbleMenuToolbarProps) {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const handleAIAction = (action: string) => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');

        if (onAIAction && selectedText) {
            onAIAction(action, selectedText);
        }
    };

    const handleComment = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');

        if (onComment && selectedText) {
            onComment(selectedText, from, to);
        }
    };

    useEffect(() => {
        const updateMenu = () => {
            const { from, to, empty } = editor.state.selection;

            if (empty) {
                setShow(false);
                return;
            }

            const start = editor.view.coordsAtPos(from);
            const end = editor.view.coordsAtPos(to);

            const left = Math.max((start.left + end.left) / 2, 10);
            const top = start.top - 60; // Position above selection

            setPosition({ top, left });
            setShow(true);
        };

        editor.on('selectionUpdate', updateMenu);
        editor.on('update', updateMenu);

        return () => {
            editor.off('selectionUpdate', updateMenu);
            editor.off('update', updateMenu);
        };
    }, [editor]);

    if (!show) return null;

    return (
        <div
            ref={menuRef}
            className="fixed z-50 flex items-center gap-1 p-2 bg-slate-900 text-white rounded-lg shadow-2xl border border-slate-700"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)',
            }}
        >
            {/* AI Actions - Prominent */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('ask')}
                className="h-8 px-2 text-white hover:bg-slate-800 gap-1.5"
                title="Ask AI about this"
            >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-xs">Ask</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('explain')}
                className="h-8 px-2 text-white hover:bg-slate-800 gap-1.5"
                title="Explain this"
            >
                <HelpCircle className="h-3.5 w-3.5" />
                <span className="text-xs">Explain</span>
            </Button>

            {onComment && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleComment}
                    className="h-8 px-2 text-white hover:bg-slate-800 gap-1.5"
                    title="Add comment"
                >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span className="text-xs">Comment</span>
                </Button>
            )}

            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* Standard Formatting */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('bold') ? 'bg-slate-800' : ''
                }`}
                title="Bold (Cmd+B)"
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('italic') ? 'bg-slate-800' : ''
                }`}
                title="Italic (Cmd+I)"
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('underline') ? 'bg-slate-800' : ''
                }`}
                title="Underline (Cmd+U)"
            >
                <Underline className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('strike') ? 'bg-slate-800' : ''
                }`}
                title="Strikethrough"
            >
                <Strikethrough className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* Lists */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('bulletList') ? 'bg-slate-800' : ''
                }`}
                title="Bullet List"
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`h-8 w-8 p-0 text-white hover:bg-slate-800 ${
                    editor.isActive('orderedList') ? 'bg-slate-800' : ''
                }`}
                title="Numbered List"
            >
                <ListOrdered className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* AI Actions */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('rewrite')}
                className="h-8 w-8 p-0 text-white hover:bg-slate-800"
                title="Rewrite"
            >
                <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('expand')}
                className="h-8 w-8 p-0 text-white hover:bg-slate-800"
                title="Expand with detail"
            >
                <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('simplify')}
                className="h-8 w-8 p-0 text-white hover:bg-slate-800"
                title="Simplify"
            >
                <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('flag-risk')}
                className="h-8 w-8 p-0 text-white hover:bg-slate-800"
                title="Flag as Risk"
            >
                <AlertCircle className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAIAction('mark-key')}
                className="h-8 w-8 p-0 text-white hover:bg-slate-800"
                title="Mark as Key Point"
            >
                <Star className="h-4 w-4" />
            </Button>
        </div>
    );
}
