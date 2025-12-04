"use client";

import { useState } from 'react';
import { Citation } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FileText, Clock, ExternalLink } from 'lucide-react';

interface CitationBadgeProps {
    citation: Citation;
    number: number;
    onClick?: () => void;
}

export function CitationBadge({ citation, number, onClick }: CitationBadgeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getSourceIcon = () => {
        switch (citation.type) {
            case 'deck':
                return <FileText className="h-3 w-3" />;
            case 'transcript':
                return <Clock className="h-3 w-3" />;
            case 'external':
            case 'research':
                return <ExternalLink className="h-3 w-3" />;
            default:
                return <FileText className="h-3 w-3" />;
        }
    };

    const getSourceLabel = () => {
        switch (citation.type) {
            case 'deck':
                return citation.slideNumber ? `Slide ${citation.slideNumber}` : citation.source;
            case 'transcript':
                return citation.timestamp ? `Call Transcript (${citation.timestamp})` : citation.source;
            case 'research':
            case 'external':
                return citation.source;
            default:
                return citation.source;
        }
    };

    return (
        <HoverCard
            open={isOpen}
            onOpenChange={setIsOpen}
            openDelay={200}
            closeDelay={300}
        >
            <HoverCardTrigger asChild>
                <button
                    className={cn(
                        "inline-flex items-center justify-center",
                        "w-5 h-5 mx-0.5",
                        "text-[10px] font-medium",
                        "bg-blue-50 text-blue-600 hover:bg-blue-100",
                        "border border-blue-200 hover:border-blue-300",
                        "rounded transition-all",
                        "cursor-pointer",
                        "align-super",
                        "relative -top-0.5"
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        if (onClick) onClick();
                    }}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {number}
                </button>
            </HoverCardTrigger>
            <HoverCardContent
                side="top"
                align="start"
                className="w-80 p-3 bg-white"
                sideOffset={5}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="space-y-2">
                    {/* Source Header */}
                    <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5 text-blue-600">
                            {getSourceIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">
                                {getSourceLabel()}
                            </p>
                            {citation.confidence && (
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                    Confidence: {citation.confidence}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Content Preview */}
                    {citation.content && (
                        <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded p-2 leading-relaxed">
                            {citation.content.length > 150
                                ? `${citation.content.substring(0, 150)}...`
                                : citation.content}
                        </div>
                    )}

                    {/* URL Link */}
                    {citation.url && (
                        <a
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="h-2.5 w-2.5" />
                            View original source
                        </a>
                    )}

                    {/* Click for more hint */}
                    <div className="text-[10px] text-blue-600 pt-1 border-t border-slate-100">
                        Click to view full source →
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
