"use client";

import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useDealState } from "@/lib/contexts/deal-state-context";
import { DealCard } from "@/components/copilot/DealCard";
import { MetricsDisplay } from "@/components/copilot/MetricsDisplay";
import { MetricUpdateCard } from "@/components/copilot/MetricUpdateCard";
import { StageUpdateCard } from "@/components/copilot/StageUpdateCard";
import { NoteAddCard } from "@/components/copilot/NoteAddCard";
import { FitScoreUpdateCard } from "@/components/copilot/FitScoreUpdateCard";
import { CompanyUpdateCard } from "@/components/copilot/CompanyUpdateCard";

export function DealContext() {
    // Get deal state from context
    const { deal, updateMetric, updateStage, updateFitScore, updateCompany, addActivity, removeActivity, addLog } = useDealState();

    // Provide deal context to the AI
    useCopilotReadable({
        description: "Current deal being viewed",
        value: deal,
    });

    // Generative UI: Render Deal Snapshot
    useCopilotAction({
        name: "show_deal_snapshot",
        description: "Show a visual summary card of the deal with company info, fit score, and key metrics",
        parameters: [],
        handler: async () => {
            return "Displayed deal snapshot.";
        },
        render: ({ status, args }: any) => {
            if (status === "inProgress") {
                return <DealCard deal={deal} loading={true} />;
            }
            return <DealCard deal={deal} />;
        },
    });

    // Generative UI: Render Metrics Display
    useCopilotAction({
        name: "show_metrics",
        description: "Show detailed metrics display with trends and confidence levels",
        parameters: [],
        handler: async () => {
            return "Displayed metrics.";
        },
        render: ({ status, args }: any) => {
            if (status === "inProgress") {
                return <MetricsDisplay metrics={deal.metrics} loading={true} />;
            }
            return <MetricsDisplay metrics={deal.metrics} />;
        },
    });

    // Action: Update Deal Metric
    useCopilotAction({
        name: "update_deal_metric",
        description: "Update any metric for the deal (MRR, CAC, Burn Rate, etc.)",
        parameters: [
            {
                name: "metricName",
                type: "string",
                description: "The name of the metric to update (e.g., 'MRR', 'CAC', 'Burn')",
                required: true,
            },
            {
                name: "newValue",
                type: "string",
                description: "The new value for the metric (e.g., '$880K')",
                required: true,
            },
            {
                name: "trend",
                type: "string",
                description: "Optional trend indicator (e.g., '+15% MoM')",
                required: false,
            },
        ],
        handler: async ({ metricName, newValue, trend }: { metricName: string; newValue: string; trend?: string }) => {
            addLog(`[AI] Handler called for update_deal_metric: ${metricName} -> ${newValue}`);

            // 1. Capture previous state for rollback
            const previousMetric = deal.metrics.find((m) => m.name === metricName);
            const previousValue = previousMetric?.value;
            const previousTrend = previousMetric?.trend;

            // 2. Optimistic Update
            updateMetric(metricName, { value: newValue, trend });

            const activityId = `activity-${Date.now()}`;
            addActivity({
                id: activityId,
                type: 'ai_action',
                content: `Updated ${metricName} to ${newValue}${trend ? ` (${trend})` : ''}`,
                timestamp: new Date().toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            });

            // 3. Persist to server
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_metric',
                        dealId: deal.id,
                        metricName,
                        newValue,
                        trend
                    }),
                });

                if (!res.ok) throw new Error('Failed to save');

                return `Successfully updated ${metricName} to ${newValue}`;
            } catch (error) {
                // 4. Rollback on error
                console.error('Update failed:', error);
                if (previousValue) {
                    updateMetric(metricName, { value: previousValue, trend: previousTrend });
                }
                removeActivity(activityId);
                return `Error: Failed to update ${metricName}. Changes reverted.`;
            }
        },
        render: ({ status, args, result }: any) => {
            return (
                <MetricUpdateCard
                    metricName={args.metricName}
                    newValue={args.newValue}
                    trend={args.trend}
                    status={status}
                    result={result}
                />
            );
        },
    });

    // Action: Update Deal Stage
    useCopilotAction({
        name: "update_deal_stage",
        description: "Move the deal to a different pipeline stage. Valid stages are: 'Inbound', 'First Call', 'Deep Dive', 'IC', 'Term Sheet', 'Closed Won', 'Passed'. If the user asks to move to 'next stage', ask for clarification on which stage.",
        parameters: [
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
        handler: async ({ newStage, reason }: { newStage: string; reason?: string }) => {
            // 1. Capture previous state
            const previousStage = deal.stage;

            // 2. Optimistic Update
            updateStage(newStage);

            const activityId = `activity-${Date.now()}`;
            addActivity({
                id: activityId,
                type: 'ai_action',
                content: `Moved deal to ${newStage}${reason ? `: ${reason}` : ''}`,
                timestamp: new Date().toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            });

            // 3. Persist to server
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_stage',
                        dealId: deal.id,
                        newStage,
                        reason
                    }),
                });

                if (!res.ok) throw new Error('Failed to save');

                return `Successfully moved deal to ${newStage}. You can view the updated pipeline by asking me to "open the pipeline".`;
            } catch (error) {
                // 4. Rollback
                console.error('Update failed:', error);
                updateStage(previousStage);
                removeActivity(activityId);
                return `Error: Failed to move deal to ${newStage}. Changes reverted.`;
            }
        },
        render: ({ status, args, result }: any) => {
            return (
                <StageUpdateCard
                    newStage={args.newStage}
                    reason={args.reason}
                    status={status}
                    result={result}
                />
            );
        },
    });

    // Action: Add Deal Note
    useCopilotAction({
        name: "add_deal_note",
        description: "Add a note or observation to the deal",
        parameters: [
            {
                name: "note",
                type: "string",
                description: "The content of the note to add",
                required: true,
            },
            {
                name: "category",
                type: "string",
                description: "Optional category for the note (e.g., 'team', 'product', 'market')",
                required: false,
            },
        ],
        handler: async ({ note, category }: { note: string; category?: string }) => {
            // 1. Optimistic Update
            const noteId = `note-${Date.now()}`;
            addActivity({
                id: noteId,
                type: 'note',
                content: note,
                timestamp: new Date().toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
                ...(category && { category }),
            });

            // 2. Persist to server
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'add_note',
                        dealId: deal.id,
                        note,
                        category
                    }),
                });

                if (!res.ok) throw new Error('Failed to save');

                return `Note added: ${note}`;
            } catch (error) {
                // 3. Rollback
                console.error('Update failed:', error);
                removeActivity(noteId);
                return `Error: Failed to add note. Changes reverted.`;
            }
        },
        render: ({ status, args, result }: any) => {
            return (
                <NoteAddCard
                    note={args.note}
                    category={args.category}
                    status={status}
                    result={result}
                />
            );
        },
    });

    // Action: Update Fit Score
    useCopilotAction({
        name: "update_fit_score",
        description: "Update the deal's fit score with a new rationale",
        parameters: [
            {
                name: "newScore",
                type: "number",
                description: "The new fit score (0-100)",
                required: true,
            },
            {
                name: "rationale",
                type: "string",
                description: "Explanation for the new score",
                required: true,
            },
        ],
        handler: async ({ newScore, rationale }: { newScore: number; rationale: string }) => {
            // 1. Capture previous state
            const previousScore = deal.fitScore.score;
            const previousRationale = deal.fitScore.rationale;

            // 2. Optimistic Update
            updateFitScore(newScore, rationale);

            const activityId = `activity-${Date.now()}`;
            addActivity({
                id: activityId,
                type: 'ai_action',
                content: `Updated fit score to ${newScore}/100. ${rationale}`,
                timestamp: new Date().toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            });

            // 3. Persist to server
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_fit_score',
                        dealId: deal.id,
                        newScore,
                        rationale
                    }),
                });

                if (!res.ok) throw new Error('Failed to save');

                return `Fit score updated to ${newScore}`;
            } catch (error) {
                // 4. Rollback
                console.error('Update failed:', error);
                updateFitScore(previousScore, previousRationale);
                removeActivity(activityId);
                return `Error: Failed to update fit score. Changes reverted.`;
            }
        },
        render: ({ status, args, result }: any) => {
            return (
                <FitScoreUpdateCard
                    newScore={args.newScore}
                    rationale={args.rationale}
                    status={status}
                    result={result}
                />
            );
        },
    });

    // Action: Update Company Info
    useCopilotAction({
        name: "update_company_info",
        description: "Update company details like name or team size",
        parameters: [
            {
                name: "companyName",
                type: "string",
                description: "The new name of the company",
                required: false,
            },
            {
                name: "teamSize",
                type: "number",
                description: "The new number of employees",
                required: false,
            },
        ],
        handler: async ({ companyName, teamSize }: { companyName?: string; teamSize?: number }) => {
            // 1. Capture previous state
            const previousCompany = { ...deal.company };

            // 2. Optimistic Update
            updateCompany({
                ...(companyName && { name: companyName }),
                ...(teamSize !== undefined && { teamSize }),
            });

            const activityId = `activity-${Date.now()}`;
            const updates = [];
            if (companyName) updates.push(`name to "${companyName}"`);
            if (teamSize !== undefined) updates.push(`team size to ${teamSize}`);

            addActivity({
                id: activityId,
                type: 'ai_action',
                content: `Updated company: ${updates.join(', ')}`,
                timestamp: new Date().toISOString(),
                author: {
                    name: 'AI Associate',
                    isAi: true,
                },
            });

            // 3. Persist to server
            try {
                const res = await fetch('/api/deals/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_company',
                        dealId: deal.id,
                        companyName,
                        teamSize
                    }),
                });

                if (!res.ok) throw new Error('Failed to save');

                return `Successfully updated company info`;
            } catch (error) {
                // 4. Rollback
                console.error('Update failed:', error);
                updateCompany(previousCompany);
                removeActivity(activityId);
                return `Error: Failed to update company info. Changes reverted.`;
            }
        },
        render: ({ status, args, result }: any) => {
            return (
                <CompanyUpdateCard
                    companyName={args.companyName}
                    teamSize={args.teamSize}
                    status={status}
                    result={result}
                />
            );
        },
    });

    return null;
}
