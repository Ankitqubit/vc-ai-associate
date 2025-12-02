"use client";

import { useMemo } from '@/lib/contexts/memo-context';
import { MemoSection } from './MemoSection';

export function MemoEditor() {
    const { memo, isGenerating } = useMemo();

    if (!memo) {
        return null;
    }

    // Sort sections by their template order
    const sortedSections = [...memo.sections].sort((a, b) => {
        const orderA = memo.template.sections.find(ts => ts.type === a.type)?.order || 999;
        const orderB = memo.template.sections.find(ts => ts.type === b.type)?.order || 999;
        return orderA - orderB;
    });

    return (
        <div className="max-w-3xl mx-auto pb-20 px-6">
            {/* Memo Title - Clean like Notion */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    {memo.title}
                </h1>
            </div>

            {/* Generating indicator - minimal */}
            {isGenerating && (
                <div className="mb-6 p-3 bg-indigo-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-indigo-600">
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                    </div>
                </div>
            )}

            {/* All Sections - Continuous flow */}
            <div>
                {sortedSections.map((section, index) => (
                    <MemoSection
                        key={section.id}
                        section={section}
                        sectionNumber={index + 1}
                    />
                ))}
            </div>
        </div>
    );
}
