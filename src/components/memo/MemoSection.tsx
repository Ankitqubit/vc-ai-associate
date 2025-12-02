"use client";

import { useState } from 'react';
import { MemoSection as MemoSectionType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RefreshCw, Edit2, FileText, Check, X, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from '@/lib/contexts/memo-context';

interface MemoSectionProps {
    section: MemoSectionType;
    sectionNumber: number;
}

export function MemoSection({ section, sectionNumber }: MemoSectionProps) {
    const { updateSection } = useMemo();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(section.content);

    const handleSave = () => {
        updateSection(section.id, editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(section.content);
        setIsEditing(false);
    };

    // Get source icon and label
    const sourceIcon = section.source === 'ai' ? Sparkles : section.source === 'human' ? User : FileText;
    const sourceLabel = section.source === 'ai' ? 'AI Generated' : section.source === 'human' ? 'Human Edited' : 'Mixed';
    const sourceColor = section.source === 'ai' ? 'text-indigo-500' : section.source === 'human' ? 'text-green-500' : 'text-purple-500';

    return (
        <div className="group relative">
            {/* Section Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs font-mono bg-white border-slate-200">
                            {sectionNumber}
                        </Badge>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {section.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className={cn("flex items-center gap-1.5", sourceColor)}>
                            {sourceIcon && <sourceIcon className="h-3.5 w-3.5" />}
                            <span>{sourceLabel}</span>
                        </div>
                        <span>•</span>
                        <span>Last edited by {section.lastEditedBy.name}</span>
                        {section.confidence && (
                            <>
                                <span>•</span>
                                <span className="capitalize">
                                    {section.confidence} confidence
                                </span>
                            </>
                        )}
                        {section.citations.length > 0 && (
                            <>
                                <span>•</span>
                                <span>{section.citations.length} citation{section.citations.length !== 1 ? 's' : ''}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isEditing && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="h-8 hover:bg-slate-100"
                            >
                                <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                                Edit
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 hover:bg-slate-100"
                            >
                                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                                Regenerate
                            </Button>
                        </>
                    )}
                    {isEditing && (
                        <>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleSave}
                                className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <Check className="h-3.5 w-3.5 mr-1.5" />
                                Save
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                                className="h-8 hover:bg-slate-100"
                            >
                                <X className="h-3.5 w-3.5 mr-1.5" />
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Section Content */}
            <Card className={cn(
                "p-6 transition-all duration-200 bg-white border-slate-200 shadow-sm",
                section.source === 'ai' && "border-l-4 border-l-indigo-500",
                section.source === 'human' && "border-l-4 border-l-green-500",
                section.source === 'mixed' && "border-l-4 border-l-purple-500",
                isEditing && "ring-2 ring-indigo-500"
            )}>
                {isEditing ? (
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full min-h-[200px] p-4 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y text-slate-900"
                        placeholder="Edit section content..."
                    />
                ) : (
                    <div className="prose prose-slate max-w-none">
                        {section.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() && (
                                <p key={idx} className="mb-4 last:mb-0 text-slate-700 leading-relaxed">
                                    {paragraph}
                                </p>
                            )
                        ))}
                    </div>
                )}

                {/* Citations */}
                {!isEditing && section.citations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                            Sources & Citations
                        </h4>
                        <div className="space-y-2">
                            {section.citations.map((citation, idx) => (
                                <div
                                    key={citation.id}
                                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer"
                                >
                                    <Badge variant="outline" className="text-[10px] font-mono shrink-0 bg-white border-slate-200">
                                        {idx + 1}
                                    </Badge>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-xs font-medium text-slate-900">
                                                {citation.source}
                                            </p>
                                            <Badge
                                                variant="secondary"
                                                className="text-[10px] capitalize bg-slate-100 text-slate-600 border-slate-200"
                                            >
                                                {citation.type}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2">
                                            {citation.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
