"use client";

import { useState, useEffect } from 'react';
import { useMemo } from '@/lib/contexts/memo-context';
import { MemoEditor } from './MemoEditor';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, FileText, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoCanvasProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MemoCanvas({ isOpen, onClose }: MemoCanvasProps) {
    const { memo, isGenerating } = useMemo();
    const [isExpanded, setIsExpanded] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Canvas Panel */}
            <div
                className={cn(
                    "fixed right-0 top-0 h-screen bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col transition-all duration-300 ease-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                    isExpanded ? "w-[90vw]" : "w-[60vw]"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                {memo?.title || 'Investment Memo'}
                            </h2>
                            {memo && (
                                <p className="text-xs text-slate-500">
                                    {Math.round(memo.metadata.completeness)}% complete • {memo.metadata.wordCount} words
                                </p>
                            )}
                        </div>
                    </div>

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
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="h-8 text-slate-600 hover:text-slate-900"
                        >
                            {isExpanded ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 text-slate-600 hover:text-slate-900"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

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
                                <div className="text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <p className="font-medium mb-2">💡 Try asking the AI:</p>
                                    <p className="text-indigo-600">"Generate an IC memo for this deal"</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
