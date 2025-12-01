"use client";

import { useCopilotReadable, useCopilotAction, useRenderToolCall } from "@copilotkit/react-core";
import { Deal } from "@/lib/types";
import { DealCard } from "@/components/copilot/DealCard";
import { MetricsDisplay } from "@/components/copilot/MetricsDisplay";

interface DealContextProps {
    deal: Deal;
}

export function DealContext({ deal }: DealContextProps) {
    // Provide deal context to the AI
    useCopilotReadable({
        description: "Current deal being viewed",
        value: deal,
    });

    // Generative UI: Render Deal Snapshot
    useRenderToolCall({
        name: "show_deal_snapshot",
        description: "Show a visual summary card of the deal with company info, fit score, and key metrics",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to display",
                required: true,
            },
        ],
        render: ({ status, args }) => {
            if (status === "inProgress") {
                return <DealCard deal={deal} loading={true} />;
            }

            return <DealCard deal={deal} />;
        },
    });

    // Generative UI: Render Metrics Display
    useRenderToolCall({
        name: "show_metrics",
        description: "Show detailed metrics display with trends and confidence levels",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal whose metrics to display",
                required: true,
            },
        ],
        render: ({ status, args }) => {
            if (status === "inProgress") {
                return <MetricsDisplay metrics={deal.metrics} loading={true} />;
            }

            return <MetricsDisplay metrics={deal.metrics} />;
        },
    });

    // Action: Update deal stage
    useCopilotAction({
        name: "update_deal_stage",
        description: "Update the stage of a deal in the pipeline",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to update",
                required: true,
            },
            {
                name: "newStage",
                type: "string",
                description: "The new stage for the deal (e.g., 'Due Diligence', 'Term Sheet', 'Closed')",
                required: true,
            },
        ],
        handler: async ({ dealId, newStage }) => {
            // TODO: Implement actual API call to update deal
            alert(`Deal ${dealId} moved to ${newStage}`);
            return `Successfully moved deal to ${newStage}`;
        },
    });

    // Action: Add note to deal
    useCopilotAction({
        name: "add_deal_note",
        description: "Add a note or comment to a deal",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal",
                required: true,
            },
            {
                name: "note",
                type: "string",
                description: "The note content to add",
                required: true,
            },
        ],
        handler: async ({ dealId, note }) => {
            // TODO: Implement actual API call to add note
            alert(`Note added to deal ${dealId}: ${note}`);
            return `Note added successfully`;
        },
    });

    return null;
}
