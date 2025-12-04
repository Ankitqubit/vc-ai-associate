"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";
import { DealCard } from "@/components/copilot/DealCard";

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

    // Simulate deck analysis
    useCopilotAction({
        name: "analyze_pitch_deck",
        description: `🚨 STEP 2 ONLY: Analyze pitch deck after user confirms they want analysis.

❌ DO NOT CALL THIS IF:
- User just uploaded a file and you haven't asked them yet
- This is your first response after seeing [ATTACHED FILE: ...]

✅ ONLY CALL THIS WHEN:
- User explicitly said "yes", "analyze it", "sure", etc. in response to your suggestion
- You already asked: "Would you like me to analyze this deck?"

This is STEP 2 of the workflow.`,
        parameters: [
            {
                name: "fileName",
                type: "string",
                description: "Name of the file to analyze",
                required: false,
            },
        ],
        handler: async ({ fileName }) => {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Return mock analysis (hardcoded for now)
            return `✅ **Analysis Complete**

I've extracted the following information from the pitch deck:

📊 **Company**: Acme Corp
📝 **Description**: B2B SaaS platform for logistics automation
💰 **MRR**: $450K (+15% MoM)
👥 **Team**: 12 people
📍 **Location**: San Francisco, CA
🏢 **Industry**: B2B SaaS - Logistics Automation
📅 **Founded**: 2023

Would you like me to create a deal for this company?`;
        },
    });

    // Create a new deal from extracted deck data
    useCopilotAction({
        name: "create_deal_from_deck",
        description: `🚨 STEP 3 ONLY: Create deal after user explicitly confirms they want to create it.

❌ DO NOT CALL THIS ACTION IF:
- User just uploaded a file (they haven't confirmed analysis yet)
- You haven't called analyze_pitch_deck yet
- User hasn't explicitly said "yes" to creating the deal
- This is your first response after seeing a file

✅ ONLY CALL THIS ACTION WHEN:
1. You already called analyze_pitch_deck AND it completed
2. You asked "Would you like me to create a deal for [Company]?"
3. User explicitly confirmed with "yes", "create it", "go ahead", etc.

This is STEP 3 of the workflow. Do not skip steps!`,
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

                console.log('🎯 create_deal_from_deck ACTION CALLED!', {
                    dealId,
                    companyName,
                    description,
                    mrr,
                    teamSize,
                    location,
                    foundingDate,
                    stage: stage || 'Inbound'
                });

                // Return success message (render will handle UI)
                const result = `✅ **Deal created successfully!**

📊 **${companyName}** has been added to your pipeline.

Click the card below to view full details.`;

                console.log('🎯 Action returning result:', result);
                return result;
            } catch (error) {
                console.error('Failed to create deal:', error);
                return `❌ Sorry, I encountered an error creating the deal. Please try again or create it manually.`;
            }
        },
        // Use render to display custom UI (DealCard) in the chat
        render: ({ status, result, args }: any) => {
            console.log('🔍 render function called!', { status, result, args });

            const { companyName, description, mrr, teamSize, location, stage } = args;

            const deal = {
                id: 'deal-1', // Link to existing mock deal page
                company: {
                    name: companyName,
                    description: description,
                    location: location || 'N/A',
                    teamSize: teamSize || 0,
                },
                metrics: [
                    {
                        id: '1',
                        name: 'MRR',
                        value: mrr || '$0',
                        trend: '+15% MoM'
                    },
                    {
                        id: '2',
                        name: 'ARR',
                        value: mrr ? `$${(parseInt(mrr.replace(/[^0-9]/g, '')) * 12)}K` : '$0',
                        trend: null
                    },
                    {
                        id: '3',
                        name: 'Burn',
                        value: '$120K',
                        trend: null
                    }
                ],
                fitScore: { score: 78 },
                stage: stage || 'Inbound',
                source: 'Pitch Deck Upload',
                owner: { name: 'Sarah Analyst' },
                lastActivity: 'Just now'
            };

            // Match the pattern from update_deal_metric - always return component
            return (
                <DealCard
                    deal={deal}
                    isNew={true}
                    loading={status === "inProgress"}
                />
            );
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
