"use client";

import { X, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContextCardProps {
    text: string;
    source?: string;
    onClose: () => void;
    className?: string;
}

export function ContextCard({ text, source, onClose, className }: ContextCardProps) {
    return (
        <div className={cn(
            "flex items-start gap-3 p-4 bg-slate-100 rounded-lg border border-slate-200 mb-3",
            className
        )}>
            {/* Quote Icon */}
            <Quote className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />

            {/* Text Content */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-relaxed">
                    {text}
                </p>
                {source && (
                    <p className="text-xs text-slate-500 mt-1">
                        From: {source}
                    </p>
                )}
            </div>

            {/* Close Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-slate-200 flex-shrink-0"
            >
                <X className="h-4 w-4 text-slate-400" />
            </Button>
        </div>
    );
}
