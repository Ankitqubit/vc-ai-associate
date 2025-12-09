"use client";

import { useState, useEffect } from 'react';
import { ThesisBlock as ThesisBlockType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Pencil, Check, X, Sparkles } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface ThesisBlockProps {
  block: ThesisBlockType;
  onUpdate?: (blockId: string, content: string) => void;
}

export function ThesisBlock({ block, onUpdate }: ThesisBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(block.content);
  const [currentContent, setCurrentContent] = useState(block.content);

  // Update local state when block content changes (from AI or other updates)
  useEffect(() => {
    setCurrentContent(block.content);
    setEditedContent(block.content);
  }, [block.content]);

  // For prose blocks (focus, anti_portfolio), use rich text editor
  const isProse = block.type === 'focus' || block.type === 'anti_portfolio';

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Click to edit...',
      }),
    ],
    content: block.content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setEditedContent(editor.getHTML());
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    if (editor) {
      editor.setEditable(true);
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(block.id, editedContent);
    }
    setIsEditing(false);
    if (editor) {
      editor.setEditable(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(block.content);
    if (editor) {
      editor.commands.setContent(block.content);
      editor.setEditable(false);
    }
    setIsEditing(false);
  };

  // Render structured data blocks differently
  const renderStructuredContent = () => {
    try {
      const data = JSON.parse(currentContent);

      if (block.type === 'constraints') {
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Investment Stages</p>
              <div className="flex flex-wrap gap-2">
                {data.stages?.map((stage: string) => (
                  <span key={stage} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {stage}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Geographies</p>
              <div className="flex flex-wrap gap-2">
                {data.geographies?.map((geo: string) => (
                  <span key={geo} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {geo}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Check Size</p>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                {data.checkSize}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Excluded Sectors</p>
              <div className="flex flex-wrap gap-2">
                {data.excluded?.map((sector: string) => (
                  <span key={sector} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    × {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      }

      if (block.type === 'preferences') {
        const weights = data.weights || {};
        return (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700 mb-3">Priority Weights:</p>
            {Object.entries(weights).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize text-slate-700">{key}</span>
                  <span className="font-semibold text-indigo-600">{value}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (block.type === 'sectors') {
        return (
          <div className="space-y-4">
            {data.high && data.high.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-600 mb-2">High Appetite</p>
                <div className="flex flex-wrap gap-2">
                  {data.high.map((sector: string) => (
                    <span key={sector} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.medium && data.medium.length > 0 && (
              <div>
                <p className="text-xs font-medium text-yellow-600 mb-2">Medium Appetite</p>
                <div className="flex flex-wrap gap-2">
                  {data.medium.map((sector: string) => (
                    <span key={sector} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.low && data.low.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">Low Appetite</p>
                <div className="flex flex-wrap gap-2">
                  {data.low.map((sector: string) => (
                    <span key={sector} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.businessModels && data.businessModels.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">Business Models</p>
                <div className="flex flex-wrap gap-2">
                  {data.businessModels.map((model: string) => (
                    <span key={model} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
    } catch (e) {
      return <p className="text-sm text-slate-600">{currentContent}</p>;
    }
  };

  return (
    <div className={cn(
      "rounded-xl border transition-all duration-200",
      isEditing
        ? "border-indigo-300 bg-white shadow-lg"
        : "border-slate-200 bg-gradient-to-br from-white to-slate-50"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">{block.title}</h3>
          {block.lastEditedBy?.isAi && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              AI
            </span>
          )}
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Check className="h-3.5 w-3.5" />
              Save
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {isProse ? (
          <div className={cn(
            "prose prose-sm max-w-none",
            isEditing && "min-h-[100px]"
          )}>
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div>{renderStructuredContent()}</div>
        )}

        {/* Last edited by */}
        {block.lastEditedBy && !isEditing && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Last edited by {block.lastEditedBy.name}
              {block.lastEditedBy.timestamp && (
                <> · {new Date(block.lastEditedBy.timestamp).toLocaleDateString()}</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
