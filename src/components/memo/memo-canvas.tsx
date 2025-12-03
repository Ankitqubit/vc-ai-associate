"use client";

import { useEffect } from 'react';
import { useMemo } from '@/lib/contexts/memo-context';
import { MemoEditor } from './MemoEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, FileText, Download, Share2, ChevronRight } from 'lucide-react';
import { Deal } from '@/lib/types';

interface MemoCanvasProps {
    deal: Deal;
    onClose: () => void;
}

export function MemoCanvas({ deal, onClose }: MemoCanvasProps) {
    const { memo, isGenerating } = useMemo();

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
                {/* Left side - Back button and breadcrumb */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-9 gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Deal
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-slate-700">{deal.company.name}</span>
                        <ChevronRight className="h-4 w-4" />
                        <span>Investment Memo</span>
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2">
                    {memo && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-slate-600 hover:text-slate-900"
                            >
                                <Share2 className="h-4 w-4 mr-1.5" />
                                Share
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-slate-600 hover:text-slate-900"
                            >
                                <Download className="h-4 w-4 mr-1.5" />
                                Export
                            </Button>
                            <div className="w-px h-6 bg-slate-200 mx-2" />
                        </>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 text-slate-600 hover:text-slate-900"
                        title="Close (ESC)"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Memo Status Bar */}
            {memo && (
                <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>Auto-saved</span>
                    </div>
                    <div className="w-px h-4 bg-slate-300" />
                    <span>{Math.round(memo.metadata.completeness)}% complete</span>
                    <div className="w-px h-4 bg-slate-300" />
                    <span>{memo.metadata.wordCount} words</span>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white">
                {memo ? (
                    <MemoEditor />
                ) : isGenerating ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-pulse flex items-center justify-center mx-auto mb-6">
                                <FileText className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-slate-900">Generating Memo...</h3>
                            <p className="text-slate-600 mb-6">
                                Creating your investment memo. This will take just a moment.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-indigo-600">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="h-10 w-10 text-indigo-500" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-slate-900">No Memo Yet</h3>
                            <p className="text-slate-600 mb-6">
                                Generate an investment memo using the AI assistant to get started.
                            </p>
                            <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <p className="font-medium mb-2">💡 Try asking the AI:</p>
                                <p className="text-indigo-600">"Generate an IC memo for this deal"</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
