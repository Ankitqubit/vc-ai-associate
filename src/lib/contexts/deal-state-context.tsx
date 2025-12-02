"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Deal, Company } from '@/lib/types';

interface DealStateContextValue {
    deal: Deal;
    updateDeal: (updates: Partial<Deal>) => void;
    updateMetric: (metricName: string, updates: { value?: string; trend?: string; confidence?: string }) => void;
    updateStage: (newStage: string) => void;
    updateFitScore: (newScore: number, rationale: string) => void;
    updateCompany: (updates: Partial<Company>) => void;
    addActivity: (activity: any) => void;
    removeActivity: (id: string) => void;
    isLoading: boolean;
    error: string | null;
    logs: string[];
    addLog: (message: string) => void;
}

const DealStateContext = createContext<DealStateContextValue | undefined>(undefined);

interface DealStateProviderProps {
    children: React.ReactNode;
    initialDeal: Deal;
}

export function DealStateProvider({ children, initialDeal }: DealStateProviderProps) {
    const [deal, setDeal] = useState<Deal>(initialDeal);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = useCallback((message: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 20));
    }, []);

    // Update entire deal object
    const updateDeal = useCallback((updates: Partial<Deal>) => {
        setDeal((prev) => ({ ...prev, ...updates }));
    }, []);

    // Helper to normalize metric names for fuzzy matching
    const normalizeMetricName = (name: string): string => {
        const lower = name.toLowerCase().trim();
        if (lower.includes('burn')) return 'Burn';
        if (lower.includes('mrr') || lower.includes('revenue')) return 'MRR';
        if (lower.includes('cac') || lower.includes('acquisition')) return 'CAC';
        if (lower.includes('ltv') || lower.includes('lifetime')) return 'LTV';
        return name; // Return original if no alias found, but matching logic below will still handle case-insensitivity
    };

    // Update a specific metric
    const updateMetric = useCallback((metricName: string, updates: { value?: string; trend?: string; confidence?: string }) => {
        const msg = `updateMetric called for ${metricName} with value ${updates.value}`;
        console.log(`[DealStateContext] ${msg}`);
        addLog(msg);

        const targetMetricName = normalizeMetricName(metricName);
        addLog(`Normalized ${metricName} to ${targetMetricName}`);

        setDeal((prev) => {
            const newMetrics = prev.metrics.map((metric) => {
                // Check exact match OR normalized match
                if (metric.name.toLowerCase() === metricName.toLowerCase() ||
                    metric.name === targetMetricName) {
                    console.log(`[DealStateContext] Found metric ${metric.name}, updating...`);
                    return { ...metric, value: updates.value || metric.value, trend: updates.trend, confidence: (updates.confidence as any) || metric.confidence };
                }
                return metric;
            });
            console.log(`[DealStateContext] New metrics:`, newMetrics);
            return {
                ...prev,
                metrics: newMetrics,
            };
        });
    }, []);

    // Update deal stage
    const updateStage = useCallback((newStage: string) => {
        setDeal((prev) => ({
            ...prev,
            stage: newStage as any, // Allow any stage string for flexibility
            lastActivity: new Date().toISOString(),
        }));
    }, []);

    // Update fit score
    const updateFitScore = useCallback((newScore: number, rationale: string) => {
        setDeal((prev) => ({
            ...prev,
            fitScore: {
                ...prev.fitScore,
                score: newScore,
                rationale,
            },
        }));
    }, []);

    // Update company details
    const updateCompany = useCallback((updates: Partial<Company>) => {
        setDeal((prev) => ({
            ...prev,
            company: {
                ...prev.company,
                ...updates,
            },
            lastActivity: new Date().toISOString(),
        }));
    }, []);

    // Add activity to timeline
    const addActivity = useCallback((activity: any) => {
        setDeal((prev) => ({
            ...prev,
            activities: [activity, ...prev.activities],
            lastActivity: new Date().toISOString(),
        }));
    }, []);

    // Remove activity (for rollback)
    const removeActivity = useCallback((id: string) => {
        setDeal((prev) => ({
            ...prev,
            activities: prev.activities.filter((a) => a.id !== id),
        }));
    }, []);

    const value: DealStateContextValue = {
        deal,
        updateDeal,
        updateMetric,
        updateStage,
        updateFitScore,
        updateCompany,
        addActivity,
        removeActivity,
        isLoading,
        error,
        logs,
        addLog,
    };

    return (
        <DealStateContext.Provider value={value}>
            {children}
        </DealStateContext.Provider>
    );
}

export function useDealState() {
    const context = useContext(DealStateContext);
    if (context === undefined) {
        throw new Error('useDealState must be used within a DealStateProvider');
    }
    return context;
}

export function useSafeDealState() {
    return useContext(DealStateContext);
}
