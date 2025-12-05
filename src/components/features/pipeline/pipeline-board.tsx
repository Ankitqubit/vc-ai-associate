"use client";

import { useState, useEffect } from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { PipelineColumn } from "./pipeline-column";
import { PipelineDealCard } from "./pipeline-deal-card";
import { Deal, DealStage } from "@/lib/types";
import { getAllDeals } from "@/lib/data/mock-db";
import { Loader2, Sparkles } from "lucide-react";

const STAGES = [
    "Inbound",
    "First Call",
    "Deep Dive",
    "IC",
    "Term Sheet",
    "Closed Won",
    "Passed"
];

export function PipelineBoard() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeId, setActiveId] = useState<string | null>(null);

    const fetchDeals = async () => {
        setIsLoading(true);
        try {
            const data = await getAllDeals();
            setDeals(data);
            console.log('[PipelineBoard] Fetched deals:', data.map(d => `${d.company.name}: ${d.stage}`));
        } catch (error) {
            console.error("Failed to fetch deals", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, []);

    // Re-fetch when page becomes visible (e.g., after navigation)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                console.log('[PipelineBoard] Page visible, refreshing deals');
                fetchDeals();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', fetchDeals);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', fetchDeals);
        };
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const dealId = active.id as string;
        const newStage = over.id as DealStage;

        // Find the deal
        const deal = deals.find(d => d.id === dealId);
        if (!deal || deal.stage === newStage) return;

        // Optimistic update
        setDeals(prev => prev.map(d =>
            d.id === dealId ? { ...d, stage: newStage } : d
        ));

        // TODO: API call to persist change
        console.log(`Moved deal ${dealId} to ${newStage}`);
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* AI Insights Banner */}
            <div className="flex-shrink-0 px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/20 z-10">
                <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50/50 px-4 py-2 rounded-full w-fit border border-indigo-100/50 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">AI Insight: 3 deals in "Deep Dive" have been inactive for &gt;7 days.</span>
                </div>
            </div>

            {/* Board Area */}
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                    <div className="flex h-full gap-6 min-w-max">
                        {STAGES.map(stage => (
                            <PipelineColumn
                                key={stage}
                                id={stage}
                                title={stage}
                                deals={deals.filter(d => d.stage === stage)}
                            />
                        ))}
                    </div>
                </div>

                <DragOverlay>
                    {activeId ? (
                        <PipelineDealCard deal={deals.find(d => d.id === activeId)!} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
