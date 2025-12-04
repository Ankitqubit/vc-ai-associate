"use client";

import { Citation } from '@/lib/types';
import { CitationBadge } from './CitationBadge';

interface CitationRendererProps {
    children: React.ReactNode;
    citations: Citation[];
    onCitationClick?: (citation: Citation) => void;
}

/**
 * Wraps content and renders citation badges inline
 * Similar to Perplexity's citation system
 */
export function CitationRenderer({
    children,
    citations,
    onCitationClick
}: CitationRendererProps) {
    if (!citations || citations.length === 0) {
        return <>{children}</>;
    }

    return (
        <div className="relative inline">
            {children}
            {/* Render citation badges inline after the content */}
            <span className="inline-flex items-center gap-0.5 ml-0.5">
                {citations.map((citation, index) => (
                    <CitationBadge
                        key={citation.id}
                        citation={citation}
                        number={index + 1}
                        onClick={() => onCitationClick?.(citation)}
                    />
                ))}
            </span>
        </div>
    );
}

/**
 * Renders citations as a numbered list at the end of a section
 * For reference/footnote style citations
 */
export function CitationList({ citations }: { citations: Citation[] }) {
    if (!citations || citations.length === 0) return null;

    return (
        <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Sources</h4>
            <ol className="space-y-2 text-xs text-slate-600">
                {citations.map((citation, index) => (
                    <li key={citation.id} className="flex gap-2">
                        <span className="font-mono text-slate-400">
                            [{index + 1}]
                        </span>
                        <div>
                            <span className="font-medium">{citation.source}</span>
                            {citation.content && (
                                <p className="text-slate-500 mt-0.5">
                                    {citation.content.substring(0, 100)}
                                    {citation.content.length > 100 ? '...' : ''}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
