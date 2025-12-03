"use client";

import { Button } from '@/components/ui/button';
import { Check, X, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIPreviewDiffProps {
    originalText: string;
    newText: string;
    onAccept: () => void;
    onReject: () => void;
    onRetry: () => void;
    actionType: string;
}

export function AIPreviewDiff({
    originalText,
    newText,
    onAccept,
    onReject,
    onRetry,
    actionType,
}: AIPreviewDiffProps) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Review AI {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Compare the changes and decide whether to accept or reject them
                    </p>
                </div>

                {/* Diff Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Original */}
                        <div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                Original
                            </div>
                            <div className="prose prose-sm max-w-none p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="text-slate-700 line-through decoration-red-400">
                                    {originalText}
                                </div>
                            </div>
                        </div>

                        {/* New */}
                        <div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                AI Suggestion
                            </div>
                            <div className="prose prose-sm max-w-none p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                <div className="text-indigo-900 font-medium">
                                    {newText}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inline Diff View (Alternative) */}
                    <div className="mt-6">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                            Combined View
                        </div>
                        <div className="prose prose-sm max-w-none p-4 bg-white rounded-lg border border-slate-200">
                            <span className="bg-red-100 text-red-800 line-through px-1">
                                {originalText}
                            </span>
                            {' → '}
                            <span className="bg-indigo-100 text-indigo-900 px-1 font-medium">
                                {newText}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                        Press <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">Tab</kbd> to accept,
                        <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono ml-1">Esc</kbd> to reject
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRetry}
                            className="gap-2"
                        >
                            <RotateCw className="h-4 w-4" />
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onReject}
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <X className="h-4 w-4" />
                            Discard
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={onAccept}
                            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Check className="h-4 w-4" />
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
