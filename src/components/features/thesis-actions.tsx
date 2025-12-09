"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";
import { getThesis, updateThesisBlock } from "@/lib/data/mock-thesis";

export function ThesisActions() {
    const router = useRouter();
    const thesis = getThesis();

    // Make thesis readable to the AI
    useCopilotReadable({
        description: "The fund's investment thesis - defines what kinds of deals we invest in and prioritize",
        value: {
            focusStatement: thesis.focusStatement,
            hardConstraints: {
                stages: thesis.hardConstraints.stages,
                geographies: thesis.hardConstraints.geographies,
                checkSizeRange: `${thesis.hardConstraints.checkSizeMin} - ${thesis.hardConstraints.checkSizeMax}`,
                excludedSectors: thesis.hardConstraints.excludedSectors,
            },
            softPreferences: {
                evaluationWeights: {
                    team: `${thesis.softPreferences.teamWeight}%`,
                    market: `${thesis.softPreferences.marketWeight}%`,
                    traction: `${thesis.softPreferences.tractionWeight}%`,
                    product: `${thesis.softPreferences.productWeight}%`,
                },
                sectorAppetites: thesis.softPreferences.sectorAppetites,
                preferredBusinessModels: thesis.softPreferences.businessModels,
            },
            antiPortfolio: thesis.antiPortfolio,
        },
    });

    // Action to navigate to thesis settings
    useCopilotAction({
        name: "view_investment_thesis",
        description: "Navigate to the investment thesis settings page where the user can view and edit the fund's investment criteria, constraints, and preferences. Use this when the user asks about the thesis, wants to see investment criteria, or wants to update thesis settings.",
        parameters: [],
        handler: async () => {
            router.push('/settings/thesis');
            return "Opening the investment thesis editor. You can view and edit all thesis blocks including focus statement, hard constraints, soft preferences, sector appetites, and anti-portfolio patterns.";
        },
    });

    // Action to explain thesis fit for a company
    useCopilotAction({
        name: "explain_thesis_fit",
        description: "Explain how a specific aspect of a company or deal fits (or doesn't fit) with the investment thesis. Use this when the user asks why a deal has a certain fit score, or wants to understand alignment with thesis.",
        parameters: [
            {
                name: "companyName",
                type: "string",
                description: "The name of the company to evaluate against the thesis",
                required: true,
            },
            {
                name: "aspect",
                type: "string",
                description: "The specific aspect to evaluate: 'stage', 'geography', 'sector', 'checkSize', 'team', 'market', 'traction', 'product', or 'overall'",
                required: false,
            },
        ],
        handler: async ({ companyName, aspect }: { companyName: string; aspect?: string }) => {
            const thesisData = getThesis();

            let explanation = `Evaluating ${companyName} against our investment thesis:\n\n`;

            if (!aspect || aspect === 'overall') {
                explanation += `**Investment Focus**: ${thesisData.focusStatement}\n\n`;
                explanation += `**Hard Constraints**:\n`;
                explanation += `- Stages: ${thesisData.hardConstraints.stages.join(', ')}\n`;
                explanation += `- Geographies: ${thesisData.hardConstraints.geographies.join(', ')}\n`;
                explanation += `- Check Size: ${thesisData.hardConstraints.checkSizeMin} - ${thesisData.hardConstraints.checkSizeMax}\n`;
                explanation += `- Excluded: ${thesisData.hardConstraints.excludedSectors.join(', ')}\n\n`;

                explanation += `**Evaluation Weights**:\n`;
                explanation += `- Team: ${thesisData.softPreferences.teamWeight}%\n`;
                explanation += `- Market: ${thesisData.softPreferences.marketWeight}%\n`;
                explanation += `- Traction: ${thesisData.softPreferences.tractionWeight}%\n`;
                explanation += `- Product: ${thesisData.softPreferences.productWeight}%\n\n`;

                explanation += `**Sector Appetites**:\n`;
                const highAppetite = thesisData.softPreferences.sectorAppetites
                    .filter(s => s.appetite === 'high')
                    .map(s => s.sector);
                explanation += `- High: ${highAppetite.join(', ')}\n`;

                if (thesisData.antiPortfolio) {
                    explanation += `\n**Anti-Portfolio**: ${thesisData.antiPortfolio}`;
                }
            } else {
                // Specific aspect explanation
                explanation += `Analyzing ${aspect} fit for ${companyName}...`;
            }

            return explanation;
        },
    });

    // Action to update thesis focus statement
    useCopilotAction({
        name: "update_thesis_focus",
        description: "Update the main investment focus statement in the thesis. Use this when the user wants to change or refine what the fund focuses on investing in.",
        parameters: [
            {
                name: "newFocusStatement",
                type: "string",
                description: "The new focus statement describing the fund's investment focus",
                required: true,
            },
        ],
        handler: async ({ newFocusStatement }: { newFocusStatement: string }) => {
            const focusBlock = thesis.blocks.find(b => b.type === 'focus');
            if (focusBlock) {
                updateThesisBlock(focusBlock.id, newFocusStatement, true);
                return `Updated investment focus statement. The new focus is: "${newFocusStatement}". You can view the full thesis at /settings/thesis`;
            }
            return "Could not find focus block to update.";
        },
    });

    // Action to update investment stages
    useCopilotAction({
        name: "update_investment_stages",
        description: "Update the investment stages in the hard constraints. Use this when the user wants to add, remove, or modify which funding stages the fund invests in (e.g., Seed, Series A, Series B, Series C).",
        parameters: [
            {
                name: "stages",
                type: "string[]",
                description: "Array of investment stages. Common stages: 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Growth'",
                required: true,
            },
        ],
        handler: async ({ stages }: { stages: string[] }) => {
            const constraintsBlock = thesis.blocks.find(b => b.type === 'constraints');
            if (constraintsBlock) {
                try {
                    const data = JSON.parse(constraintsBlock.content);
                    data.stages = stages;
                    updateThesisBlock(constraintsBlock.id, JSON.stringify(data), true);
                    return `Updated investment stages to: ${stages.join(', ')}. The fund now targets these funding stages.`;
                } catch (e) {
                    return "Error updating investment stages.";
                }
            }
            return "Could not find constraints block to update.";
        },
    });

    // Action to update anti-portfolio
    useCopilotAction({
        name: "update_anti_portfolio",
        description: "Update the anti-portfolio section that describes what patterns or types of companies the fund avoids. Use this when the user wants to add or modify investment exclusions or red flags.",
        parameters: [
            {
                name: "newAntiPortfolio",
                type: "string",
                description: "The updated anti-portfolio description",
                required: true,
            },
        ],
        handler: async ({ newAntiPortfolio }: { newAntiPortfolio: string }) => {
            const antiBlock = thesis.blocks.find(b => b.type === 'anti_portfolio');
            if (antiBlock) {
                updateThesisBlock(antiBlock.id, newAntiPortfolio, true);
                return `Updated anti-portfolio patterns. The fund now avoids: "${newAntiPortfolio}". View full thesis at /settings/thesis`;
            }
            return "Could not find anti-portfolio block to update.";
        },
    });

    // Action to add excluded sector
    useCopilotAction({
        name: "add_excluded_sector",
        description: "Add a new sector to the excluded sectors list in hard constraints. Use this when the user wants to exclude a specific industry or sector from consideration.",
        parameters: [
            {
                name: "sector",
                type: "string",
                description: "The sector name to exclude (e.g., 'Crypto', 'Gaming', 'Consumer Hardware')",
                required: true,
            },
        ],
        handler: async ({ sector }: { sector: string }) => {
            const constraintsBlock = thesis.blocks.find(b => b.type === 'constraints');
            if (constraintsBlock) {
                try {
                    const data = JSON.parse(constraintsBlock.content);
                    if (!data.excluded.includes(sector)) {
                        data.excluded.push(sector);
                        updateThesisBlock(constraintsBlock.id, JSON.stringify(data), true);
                        return `Added "${sector}" to excluded sectors. The fund will now filter out deals in this sector. Current exclusions: ${data.excluded.join(', ')}`;
                    }
                    return `"${sector}" is already in the excluded sectors list.`;
                } catch (e) {
                    return "Error updating excluded sectors.";
                }
            }
            return "Could not find constraints block to update.";
        },
    });

    // Action to update sector appetite
    useCopilotAction({
        name: "update_sector_appetite",
        description: "Update the investment appetite level for a specific sector. Use this when the user wants to increase or decrease interest in a particular industry.",
        parameters: [
            {
                name: "sector",
                type: "string",
                description: "The sector name (e.g., 'B2B SaaS', 'FinTech', 'HealthTech')",
                required: true,
            },
            {
                name: "appetite",
                type: "string",
                description: "The appetite level: 'high', 'medium', or 'low'",
                required: true,
            },
        ],
        handler: async ({ sector, appetite }: { sector: string; appetite: 'high' | 'medium' | 'low' }) => {
            const sectorsBlock = thesis.blocks.find(b => b.type === 'sectors');
            if (sectorsBlock) {
                try {
                    const data = JSON.parse(sectorsBlock.content);

                    // Remove from all appetite levels
                    ['high', 'medium', 'low'].forEach(level => {
                        if (data[level]) {
                            data[level] = data[level].filter((s: string) => s !== sector);
                        }
                    });

                    // Add to new appetite level
                    if (!data[appetite]) data[appetite] = [];
                    if (!data[appetite].includes(sector)) {
                        data[appetite].push(sector);
                    }

                    updateThesisBlock(sectorsBlock.id, JSON.stringify(data), true);
                    return `Updated sector appetite: "${sector}" is now marked as ${appetite} appetite. View full thesis at /settings/thesis`;
                } catch (e) {
                    return "Error updating sector appetite.";
                }
            }
            return "Could not find sectors block to update.";
        },
    });

    return null;
}
