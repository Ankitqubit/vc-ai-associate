"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";

/**
 * Deal Intake Actions - Handles creation of new deals from uploaded decks
 *
 * Flow:
 * 1. User uploads PDF → File uploads with progress
 * 2. AI "analyzes" and extracts mock data
 * 3. AI presents data and asks for confirmation
 * 4. User says "yes" or provides corrections
 * 5. AI creates deal using this action
 */
export function DealIntakeActions() {
    const router = useRouter();

    // Create a new deal from extracted deck data
    useCopilotAction({
        name: "create_deal_from_deck",
        description: `Create a new deal from pitch deck data. CRITICAL: ONLY call this action when the user EXPLICITLY confirms deal creation with phrases like:
- "yes"
- "yes, create it"
- "create the deal"
- "looks good, create it"
- "go ahead"

DO NOT call this action automatically after analysis. WAIT for explicit user confirmation.
You must first present extracted data and ask "Should I create a deal for this company?"
Then WAIT for the user's response before calling this action.`,
        parameters: [
            {
                name: "companyName",
                type: "string",
                description: "The name of the company (REQUIRED). If not provided in deck, ask the user.",
                required: true,
            },
            {
                name: "description",
                type: "string",
                description: "Brief description of what the company does (1-2 sentences). If not clear from deck, ask user.",
                required: true,
            },
            {
                name: "mrr",
                type: "string",
                description: "Monthly Recurring Revenue (e.g., '$450K'). Optional, can be empty if not in deck.",
                required: false,
            },
            {
                name: "teamSize",
                type: "number",
                description: "Number of team members. Optional.",
                required: false,
            },
            {
                name: "location",
                type: "string",
                description: "Company location (e.g., 'San Francisco, CA'). Optional.",
                required: false,
            },
            {
                name: "foundingDate",
                type: "string",
                description: "When the company was founded (year or date). Optional.",
                required: false,
            },
            {
                name: "stage",
                type: "string",
                description: "Funding stage (e.g., 'Seed', 'Series A'). Defaults to 'Inbound' if not specified.",
                required: false,
            },
        ],
        handler: async ({
            companyName,
            description,
            mrr,
            teamSize,
            location,
            foundingDate,
            stage
        }: {
            companyName: string;
            description: string;
            mrr?: string;
            teamSize?: number;
            location?: string;
            foundingDate?: string;
            stage?: string;
        }) => {
            try {
                // Create a new deal ID
                const dealId = `deal-${Date.now()}`;

                // In a real app, this would call an API to create the deal
                // For now, we'll simulate it with the existing deals API

                console.log('Creating deal with data:', {
                    dealId,
                    companyName,
                    description,
                    mrr,
                    teamSize,
                    location,
                    foundingDate,
                    stage: stage || 'Inbound'
                });

                // Simulate deal creation
                // TODO: Call actual API when backend is ready
                // const response = await fetch('/api/deals/create', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ ... })
                // });

                // For now, navigate to an existing deal as a demo
                // In production, navigate to the newly created deal
                router.push('/pipeline');

                return `✅ **Deal created successfully!**

📊 **${companyName}**
${description}

${mrr ? `💰 MRR: ${mrr}` : ''}
${teamSize ? `👥 Team: ${teamSize} people` : ''}
${location ? `📍 Location: ${location}` : ''}
${foundingDate ? `📅 Founded: ${foundingDate}` : ''}

The deal has been added to your pipeline in **${stage || 'Inbound'}** stage.

What would you like to do next?
• Draft founder questions
• Research competitors
• Generate investment memo`;
            } catch (error) {
                console.error('Failed to create deal:', error);
                return `❌ Sorry, I encountered an error creating the deal. Please try again or create it manually.`;
            }
        },
    });

    // Ask clarifying questions about the uploaded deck
    useCopilotAction({
        name: "request_missing_deck_info",
        description: `Ask the user for missing information from the uploaded deck. Use this when you've analyzed a deck but key information is missing (like company name, description, or metrics). This helps create a complete deal profile.`,
        parameters: [
            {
                name: "missingFields",
                type: "string[]",
                description: "Array of field names that are missing (e.g., ['company name', 'MRR', 'team size'])",
                required: true,
            },
        ],
        handler: async ({ missingFields }: { missingFields: string[] }) => {
            const fieldsList = missingFields.join(', ');
            return `I need a bit more information to create the deal. Could you provide:

${missingFields.map((field, i) => `${i + 1}. **${field}**`).join('\n')}

You can answer all at once or one by one!`;
        },
    });

    return null;
}
