"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";

export function GlobalActions() {
    const router = useRouter();

    // Navigation action for deal-related queries
    useCopilotAction({
        name: "navigate_to_deal",
        description: "Navigate to a specific deal page when the user wants to view, discuss, or analyze a particular deal. Use this when the user mentions a company name or deal ID. Available deals: Acme Corp (deal-1), DataFlow AI (deal-2), HealthTech Solutions (deal-3), CloudScale (deal-4), EduLearn (deal-5), FinSync (deal-6).",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to navigate to (e.g., 'deal-1', 'deal-2', 'deal-3'). If the user mentions a company name, use the corresponding ID: Acme Corp=deal-1, DataFlow AI=deal-2, HealthTech Solutions=deal-3, CloudScale=deal-4, EduLearn=deal-5, FinSync=deal-6.",
                required: true,
            },
        ],
        handler: async ({ dealId }: { dealId: string }) => {
            // Map company names to deal IDs (case-insensitive)
            const companyMap: Record<string, string> = {
                'acme corp': 'deal-1',
                'acme': 'deal-1',
                'dataflow ai': 'deal-2',
                'dataflow': 'deal-2',
                'healthtech solutions': 'deal-3',
                'healthtech': 'deal-3',
                'cloudscale': 'deal-4',
                'edulearn': 'deal-5',
                'finsync': 'deal-6',
            };

            // Check if dealId is actually a company name
            const normalizedInput = dealId.toLowerCase().trim();
            const actualDealId = companyMap[normalizedInput] || dealId;

            router.push(`/deals/${actualDealId}`);
            return `Navigating to ${actualDealId}. The conversation will continue on the deal page.`;
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

    // Compare deals action
    useCopilotAction({
        name: "compare_deals",
        description: "Compare multiple deals side-by-side showing their fit scores, metrics, and key details. Use this when the user asks to compare deals or wants to see which deal is better.",
        parameters: [
            {
                name: "dealIds",
                type: "string[]",
                description: "Array of deal IDs to compare (e.g., ['deal-1', 'deal-3']). Can also accept company names which will be mapped to IDs.",
                required: true,
            },
        ],
        handler: async ({ dealIds }: { dealIds: string[] }) => {
            return `Comparing ${dealIds.length} deals. See the comparison above.`;
        },
    });

    // Get deal information action
    useCopilotAction({
        name: "get_deal_info",
        description: "Get detailed information about a specific deal including fit score, metrics, stage, and company details. Use this when the user asks about a specific company or deal.",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal (e.g., 'deal-1') or company name. Available deals: Acme Corp (deal-1), DataFlow AI (deal-2), HealthTech Solutions (deal-3), CloudScale (deal-4), EduLearn (deal-5), FinSync (deal-6).",
                required: true,
            },
        ],
        handler: async ({ dealId }: { dealId: string }) => {
            // Map company names to deal IDs
            const companyMap: Record<string, string> = {
                'acme corp': 'deal-1',
                'acme': 'deal-1',
                'dataflow ai': 'deal-2',
                'dataflow': 'deal-2',
                'healthtech solutions': 'deal-3',
                'healthtech': 'deal-3',
                'cloudscale': 'deal-4',
                'edulearn': 'deal-5',
                'finsync': 'deal-6',
            };

            const normalizedInput = dealId.toLowerCase().trim();
            const actualDealId = companyMap[normalizedInput] || dealId;

            // Return the dealId so AIInterface can render the card
            return {
                dealId: actualDealId,
                action: 'show_deal_info'
            };
        },
    });

    // List all deals action
    useCopilotAction({
        name: "list_all_deals",
        description: "List all deals in the pipeline with their stages and fit scores. Use this when the user asks to see all deals, what deals we have, or wants a pipeline overview.",
        parameters: [],
        handler: async () => {
            const { mockDeals } = require('@/lib/data/mock-db');
            const dealsList = mockDeals.map((d: any) =>
                `${d.company.name} (${d.stage}) - Fit Score: ${d.fitScore.score}/100`
            ).join('\n');

            return `Here are all the deals in our pipeline:\n\n${dealsList}\n\nWould you like to see details about any specific deal?`;
        },
    });

    return null;
}
