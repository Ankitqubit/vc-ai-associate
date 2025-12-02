"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";

export function GlobalActions() {
    const router = useRouter();

    // Navigation action for deal-related queries
    useCopilotAction({
        name: "navigate_to_deal",
        description: "Navigate to a specific deal page when the user wants to view, discuss, or analyze a particular deal. Use this when the user mentions a company name or deal ID.",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to navigate to (e.g., 'deal-1', 'deal-2'). If the user mentions a company name, map it to the corresponding deal ID.",
                required: true,
            },
        ],
        handler: async ({ dealId }: { dealId: string }) => {
            router.push(`/deals/${dealId}`);
            return `Navigating to ${dealId}. The conversation will continue on the deal page.`;
        },
    });

    // Navigation action for pipeline view
    useCopilotAction({
        name: "navigate_to_pipeline",
        description: "Navigate to the deal pipeline view (Kanban board) to see all deals by stage. Use this when the user asks to see the pipeline, all deals, or wants to visualize the deal flow.",
        parameters: [],
        handler: async () => {
            router.push('/pipeline');
            return "Opening the pipeline view.";
        },
    });

    // Global action to update any deal's stage (for pipeline view)
    useCopilotAction({
        name: "update_any_deal_stage",
        description: "Update the stage of any deal by its ID or company name. Use this when on the pipeline view or when you need to update a deal that's not currently being viewed. Valid stages: 'Inbound', 'First Call', 'Deep Dive', 'IC', 'Term Sheet', 'Closed Won', 'Passed'.",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to update (e.g., 'deal-1'). If the user mentions a company name, use the corresponding deal ID.",
                required: true,
            },
            {
                name: "newStage",
                type: "string",
                description: "The new stage for the deal. Must be one of: 'Inbound', 'First Call', 'Deep Dive', 'IC', 'Term Sheet', 'Closed Won', 'Passed'.",
                required: true,
            },
            {
                name: "reason",
                type: "string",
                description: "Optional reason for the stage change",
                required: false,
            },
        ],
        handler: async ({ dealId, newStage, reason }: { dealId: string; newStage: string; reason?: string }) => {
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'update_stage',
                        dealId,
                        newStage,
                        reason
                    }),
                });

                if (!res.ok) throw new Error('Failed to update deal');

                return `Successfully moved deal ${dealId} to ${newStage}. You can refresh the pipeline view to see the change.`;
            } catch (error) {
                console.error('Failed to update deal stage:', error);
                return `Error: Failed to move deal to ${newStage}.`;
            }
        },
    });

    return null;
}
