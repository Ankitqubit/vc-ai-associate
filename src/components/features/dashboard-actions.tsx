"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";

export function DashboardActions() {
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

    return null;
}
