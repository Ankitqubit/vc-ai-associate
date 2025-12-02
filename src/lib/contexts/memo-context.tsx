"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useCopilotReadable } from '@copilotkit/react-core';
import { InvestmentMemo, MemoSection } from '../types';

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
