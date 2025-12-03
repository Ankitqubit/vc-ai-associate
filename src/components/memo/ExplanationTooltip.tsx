"use client";

import { Button } from '@/components/ui/button';
import { X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationTooltipProps {
    explanation: string;
    position: { x: number; y: number };
    onClose: () => void;
    onAskFollowUp?: () => void;
}

export function ExplanationTooltip({
    explanation,
    position,
    onClose,
    onAskFollowUp,
}: ExplanationTooltipProps) {
    return (
        <div
            className="fixed z-50 w-96 bg-white rounded-lg shadow-2xl border border-slate-200 animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -100%) translateY(-10px)',
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-indigo-50">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✨</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">AI Explanation</h4>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-6 w-6 p-0 hover:bg-indigo-100"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                    {explanation}
                </p>
            </div>

            {/* Footer */}
            {onAskFollowUp && (
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onAskFollowUp}
                        className="w-full gap-2 text-xs"
                    >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Ask Follow-up Question
                    </Button>
                </div>
            )}

            {/* Arrow */}
            <div
                className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid white',
                }}
            />
        </div>
    );
}
