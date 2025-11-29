"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Deal, Metric } from "@/lib/types";
import { mockDeals as initialMockDeals } from "@/lib/data/mock-db";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { DealSnapshot } from "@/components/ai/deal-snapshot";

interface DealContextType {
    deals: Deal[];
    currentDeal: Deal | undefined;
    setCurrentDealId: (id: string | null) => void;
    updateDealMetric: (dealId: string, metricName: string, value: string) => void;
    getDealById: (id: string) => Deal | undefined;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children }: { children: ReactNode }) {
    const [deals, setDeals] = useState<Deal[]>(initialMockDeals);
    const [currentDealId, setCurrentDealId] = useState<string | null>(null);

    const currentDeal = deals.find((d) => d.id === currentDealId);

    const getDealById = (id: string) => {
        return deals.find((d) => d.id === id);
    };

    const updateDealMetric = (dealId: string, metricName: string, value: string) => {
        console.log(`Updating deal ${dealId}: ${metricName} -> ${value}`);
        setDeals((prevDeals) =>
            prevDeals.map((deal) => {
                if (deal.id !== dealId) return deal;

                // Find if metric exists
                const metricIndex = deal.metrics.findIndex(
                    (m) => m.name.toLowerCase() === metricName.toLowerCase()
                );

                let newMetrics = [...deal.metrics];

                if (metricIndex >= 0) {
                    // Update existing metric
                    newMetrics[metricIndex] = {
                        ...newMetrics[metricIndex],
                        value: value,
                        trend: "Updated via AI", // Optional: indicate change
                    };
                } else {
                    // Add new metric (optional, but good for robustness)
                    // For now, let's just update existing ones to be safe
                    console.warn(`Metric ${metricName} not found in deal ${dealId}`);
                    return deal;
                }

                return {
                    ...deal,
                    metrics: newMetrics,
                };
            })
        );
    };

    // --- CopilotKit Integration ---
    useCopilotReadable({
        description: "The current list of deals available in the workspace",
        value: deals,
    });

    useCopilotReadable({
        description: "The currently active deal being viewed by the user",
        value: currentDeal,
    });

    useCopilotAction({
        name: "updateDealMetric",
        description: "Update a specific metric (MRR, Valuation, Burn, CAC) for a deal.",
        parameters: [
            {
                name: "metricName",
                type: "string",
                description: "The name of the metric to update (e.g., 'MRR', 'Valuation', 'Burn', 'CAC')",
                required: true,
            },
            {
                name: "value",
                type: "string",
                description: "The new value for the metric (e.g., '550k', '$15M')",
                required: true,
            },
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to update. If not provided, defaults to the current deal.",
                required: false,
            },
        ],
        handler: async ({ metricName, value, dealId }) => {
            const targetId = dealId || currentDealId || "deal-1";
            updateDealMetric(targetId, metricName, value);
            return `Updated ${metricName} to ${value} for deal ${targetId}.`;
        },
    });

    useCopilotAction({
        name: "showDealAnalysis",
        description: "Show a visual analysis snapshot of a deal.",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to show. Defaults to current deal.",
                required: false,
            },
        ],
        handler: async ({ dealId }) => {
            // Handler logic (optional if using render)
            return "Showing deal analysis...";
        },
        render: ({ status, args }) => {
            const targetId = args.dealId || currentDealId || "deal-1";
            const deal = deals.find(d => d.id === targetId);

            if (!deal) return <div>Deal not found</div>;

            return <DealSnapshot deal={deal} />;
        },
    });

    return (
        <DealContext.Provider
            value={{
                deals,
                currentDeal,
                setCurrentDealId,
                updateDealMetric,
                getDealById,
            }}
        >
            {children}
        </DealContext.Provider>
    );
}

export function useDeal() {
    const context = useContext(DealContext);
    if (!context) {
        throw new Error("useDeal must be used within a DealProvider");
    }
    return context;
}
