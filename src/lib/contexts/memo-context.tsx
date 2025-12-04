"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useCopilotReadable } from '@copilotkit/react-core';
import { InvestmentMemo, MemoSection, CommentThread, TeamMember } from '../types';

interface MemoContextType {
    memo: InvestmentMemo | null;
    setMemo: (memo: InvestmentMemo | null) => void;
    isGenerating: boolean;
    setIsGenerating: (generating: boolean) => void;
    updateSection: (sectionId: string, content: string) => void;
    regenerateSection: (sectionId: string, feedback?: string) => Promise<void>;
    addVersion: (changeDescription: string) => void;
    getSectionById: (sectionId: string) => MemoSection | undefined;
    isCanvasOpen: boolean;
    setIsCanvasOpen: (open: boolean) => void;
    openCanvas: () => void;
    closeCanvas: () => void;
    // Comment management
    comments: CommentThread[];
    setComments: (comments: CommentThread[] | ((prev: CommentThread[]) => CommentThread[])) => void;
    teamMembers: TeamMember[];
    getCommentsBySection: (sectionId: string) => CommentThread[];
}

const MemoContext = createContext<MemoContextType | null>(null);

interface MemoProviderProps {
    children: ReactNode;
    initialMemo?: InvestmentMemo | null;
}

export function MemoProvider({ children, initialMemo = null }: MemoProviderProps) {
    const [memo, setMemoState] = useState<InvestmentMemo | null>(initialMemo);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [comments, setComments] = useState<CommentThread[]>([]);

    // Mock team members - in production, fetch from API
    const teamMembers: TeamMember[] = [
        { id: 'user-1', name: 'Sarah Chen', email: 'sarah@vc.com', avatar: 'https://i.pravatar.cc/150?img=1', role: 'partner' },
        { id: 'user-2', name: 'Michael Ross', email: 'michael@vc.com', avatar: 'https://i.pravatar.cc/150?img=2', role: 'principal' },
        { id: 'user-3', name: 'Emily Zhang', email: 'emily@vc.com', avatar: 'https://i.pravatar.cc/150?img=3', role: 'associate' },
        { id: 'user-current', name: 'You', email: 'you@vc.com', role: 'analyst' },
    ];

    // Provide current memo context to CopilotKit AI
    useCopilotReadable({
        description: "Current investment memo being edited or viewed. Contains all sections, citations, and metadata.",
        value: memo ? {
            id: memo.id,
            dealId: memo.dealId,
            title: memo.title,
            status: memo.status,
            sections: memo.sections.map(s => ({
                id: s.id,
                type: s.type,
                title: s.title,
                content: s.content,
                source: s.source,
                citationCount: s.citations.length,
            })),
            metadata: memo.metadata,
        } : null,
    });

    // Provide comments context to CopilotKit AI
    useCopilotReadable({
        description: "All comments and discussions on the current memo. Each comment is attached to a specific section and may have replies. Status can be 'open' or 'resolved'. Use this to understand what has been discussed, what concerns have been raised, and what follow-ups are needed.",
        value: comments.length > 0 ? {
            totalComments: comments.length,
            openComments: comments.filter(c => c.status === 'open').length,
            resolvedComments: comments.filter(c => c.status === 'resolved').length,
            commentThreads: comments.map(thread => ({
                id: thread.id,
                sectionId: thread.sectionId,
                sectionType: memo?.sections.find(s => s.id === thread.sectionId)?.type,
                highlightedText: thread.textRange.text,
                content: thread.content,
                author: thread.author.name,
                isAiComment: thread.author.isAi,
                status: thread.status,
                mentions: thread.mentions.map(m => m.userName),
                createdAt: thread.createdAt,
                replyCount: thread.replies.length,
                replies: thread.replies.map(r => ({
                    content: r.content,
                    author: r.author.name,
                    isAi: r.author.isAi,
                    mentions: r.mentions.map(m => m.userName),
                    createdAt: r.createdAt,
                })),
            })),
        } : null,
    });

    // Provide team members context to CopilotKit AI
    useCopilotReadable({
        description: "Team members who can be @mentioned in comments. Use this to know who to tag when creating comments.",
        value: {
            members: teamMembers.map(m => ({
                id: m.id,
                name: m.name,
                role: m.role,
                email: m.email,
            })),
        },
    });

    const setMemo = useCallback((newMemo: InvestmentMemo | null) => {
        setMemoState(newMemo);
    }, []);

    const updateSection = useCallback((sectionId: string, content: string) => {
        if (!memo) return;

        const updatedSections = memo.sections.map(section => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    content,
                    source: section.source === 'ai' ? 'mixed' : section.source,
                    lastEditedBy: {
                        name: 'Human User',
                        isAi: false,
                        timestamp: new Date().toISOString(),
                    },
                    version: section.version + 1,
                } as MemoSection;
            }
            return section;
        });

        setMemoState({
            ...memo,
            sections: updatedSections,
            updatedAt: new Date().toISOString(),
        });

        // Create version snapshot after edit (debounced to avoid too many versions)
        // Only create version if significant change (>50 characters difference)
        const section = memo.sections.find(s => s.id === sectionId);
        if (section && Math.abs(content.length - section.content.length) > 50) {
            // Debounce version creation to avoid creating versions on every keystroke
            setTimeout(async () => {
                try {
                    await fetch(`/api/memos/${memo.id}/versions`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            changeDescription: `Edited ${section.title} section`,
                        }),
                    });
                } catch (error) {
                    console.error('Failed to create version:', error);
                }
            }, 3000); // 3 second debounce
        }
    }, [memo]);

    const regenerateSection = useCallback(async (sectionId: string, feedback?: string) => {
        if (!memo) return;

        setIsGenerating(true);
        try {
            // This will be called by the CopilotAction
            // We're just updating the local state here
            console.log(`Regenerating section ${sectionId} with feedback: ${feedback}`);
        } catch (error) {
            console.error('Failed to regenerate section:', error);
        } finally {
            setIsGenerating(false);
        }
    }, [memo]);

    const addVersion = useCallback((changeDescription: string) => {
        if (!memo) return;

        const newVersion = {
            id: `version-${Date.now()}`,
            memoId: memo.id,
            versionNumber: memo.currentVersion + 1,
            sections: [...memo.sections],
            createdAt: new Date().toISOString(),
            createdBy: {
                name: 'AI Associate',
                isAi: true,
            },
            changeDescription,
        };

        setMemoState({
            ...memo,
            versions: [...memo.versions, newVersion],
            currentVersion: newVersion.versionNumber,
            updatedAt: new Date().toISOString(),
        });
    }, [memo]);

    const getSectionById = useCallback((sectionId: string): MemoSection | undefined => {
        if (!memo) return undefined;
        return memo.sections.find(s => s.id === sectionId);
    }, [memo]);

    const openCanvas = useCallback(() => {
        setIsCanvasOpen(true);
    }, []);

    const closeCanvas = useCallback(() => {
        setIsCanvasOpen(false);
    }, []);

    const getCommentsBySection = useCallback((sectionId: string): CommentThread[] => {
        return comments.filter(c => c.sectionId === sectionId);
    }, [comments]);

    const value: MemoContextType = {
        memo,
        setMemo,
        isGenerating,
        setIsGenerating,
        updateSection,
        regenerateSection,
        addVersion,
        getSectionById,
        isCanvasOpen,
        setIsCanvasOpen,
        openCanvas,
        closeCanvas,
        comments,
        setComments,
        teamMembers,
        getCommentsBySection,
    };

    return (
        <MemoContext.Provider value={value}>
            {children}
        </MemoContext.Provider>
    );
}

export function useMemo() {
    const context = useContext(MemoContext);
    if (!context) {
        throw new Error('useMemo must be used within a MemoProvider');
    }
    return context;
}
