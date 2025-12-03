"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedTextContext {
    selectedText: string | null;
    selectionSource: string | null;
    setSelectedText: (text: string | null, source?: string) => void;
    clearSelection: () => void;
}

const SelectionContext = createContext<SelectedTextContext | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
    const [selectedText, setSelectedTextState] = useState<string | null>(null);
    const [selectionSource, setSelectionSource] = useState<string | null>(null);

    const setSelectedText = (text: string | null, source?: string) => {
        setSelectedTextState(text);
        setSelectionSource(source || null);
    };

    const clearSelection = () => {
        setSelectedTextState(null);
        setSelectionSource(null);
    };

    return (
        <SelectionContext.Provider value={{ selectedText, selectionSource, setSelectedText, clearSelection }}>
            {children}
        </SelectionContext.Provider>
    );
}

export function useSelection() {
    const context = useContext(SelectionContext);

    // Return default empty context if not wrapped in provider
    // This allows AIInterface to work on pages without SelectionProvider
    if (context === undefined) {
        return {
            selectedText: null,
            selectionSource: null,
            setSelectedText: () => {},
            clearSelection: () => {},
        };
    }

    return context;
}
