"use client";

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useRouter, useParams } from "next/navigation";
import { useMemo } from "@/lib/contexts/memo-context";
import { useSafeDealState } from "@/lib/contexts/deal-state-context";

export function MemoActions() {
    const router = useRouter();
    const params = useParams();
    const dealState = useSafeDealState();
    const currentDealId = (params?.id as string) || dealState?.deal?.id;
    const { memo, setMemo, setIsGenerating, updateSection, openCanvas: openCanvasFromContext } = useMemo();

    // Provide current deal context to AI
    useCopilotReadable({
        description: "Current deal ID being viewed (use this when generating memos)",
        value: currentDealId ? { dealId: currentDealId } : null,
    });

    // Action: Generate Investment Memo
    useCopilotAction({
        name: "generate_investment_memo",
        description: "IMPORTANT: Use this action when the user asks to generate, create, draft, or write an IC memo, investment memo, investment committee memo, or memo for a deal. This opens a canvas view and generates a comprehensive IC memo with all required sections. DO NOT generate memo content as text - always use this action instead.",
        parameters: [
            {
                name: "dealId",
                type: "string",
                description: "The ID of the deal to generate a memo for (e.g., 'deal-1'). If currently viewing a deal page, use that deal's ID.",
                required: true,
            },
        ],
        handler: async ({ dealId }: { dealId: string }) => {
            // STEP 1: Open canvas FIRST (shows immediately)
            openCanvasFromContext();
            setIsGenerating(true);

            // STEP 2: Generate memo in background (canvas already open)
            try {
                const response = await fetch('/api/memos/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ dealId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to generate memo');
                }

                const data = await response.json();
                setMemo(data.memo);

                return `Successfully generated IC memo with ${data.memo.sections.length} sections (${data.memo.metadata.wordCount} words). The memo canvas is now open on the right side of your screen. Click the "IC Memo" button in the header to view it anytime.`;
            } catch (error) {
                console.error('Failed to generate memo:', error);
                return "Failed to generate memo. Please try again.";
            } finally {
                setIsGenerating(false);
            }
        },
    });

    // Action: Regenerate Memo Section
    useCopilotAction({
        name: "regenerate_memo_section",
        description: "Regenerate a specific section of the current memo with optional feedback to improve it. Use this when the user wants to enhance, expand, or modify a particular section. Section types: executive_summary, company_overview, problem_solution, market_analysis, product, traction_metrics, team, business_model, competitive_landscape, thesis_fit, risks_concerns, open_questions, recommendation.",
        parameters: [
            {
                name: "sectionType",
                type: "string",
                description: "The type of section to regenerate (e.g., 'risks_concerns', 'market_analysis')",
                required: true,
            },
            {
                name: "feedback",
                type: "string",
                description: "How to improve the section (e.g., 'add more detail', 'focus on competitive risks', 'make it more concise')",
                required: false,
            },
        ],
        handler: async ({ sectionType, feedback }: { sectionType: string; feedback?: string }) => {
            if (!memo) {
                return "No memo is currently open. Please generate a memo first.";
            }

            const section = memo.sections.find(s => s.type === sectionType);
            if (!section) {
                return `Section '${sectionType}' not found in the current memo.`;
            }

            setIsGenerating(true);

            try {
                const response = await fetch('/api/memos/regenerate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        memoId: memo.id,
                        sectionId: section.id,
                        feedback,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to regenerate section');
                }

                const data = await response.json();

                // Update the section in context
                updateSection(section.id, data.section.content);

                return {
                    success: true,
                    sectionTitle: section.title,
                    wordCount: data.section.content.split(' ').length,
                    message: `Successfully regenerated "${section.title}" section${feedback ? ` with your feedback: "${feedback}"` : ''}.`,
                };
            } catch (error) {
                console.error('Failed to regenerate section:', error);
                return {
                    success: false,
                    message: "I'm sorry, I couldn't regenerate that section. Please try again.",
                };
            } finally {
                setIsGenerating(false);
            }
        },
        render: ({ status, args, result }: any) => {
            if (status === "inProgress") {
                const sectionTitle = memo?.sections.find(s => s.type === args.sectionType)?.title || args.sectionType;
                return (
                    <div className="w-full max-w-md p-4 border border-border/50 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8">
                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                                <div className="relative w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🔄</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Regenerating {sectionTitle}...</p>
                                {args.feedback && (
                                    <p className="text-xs text-muted-foreground mt-1">With feedback: {args.feedback}</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }

            if (status === "complete" && result?.success) {
                return (
                    <div className="w-full max-w-md p-4 border border-green-200/50 rounded-lg bg-green-500/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <div>
                                <p className="font-medium text-sm">{result.sectionTitle} Updated</p>
                                <p className="text-xs text-muted-foreground">{result.wordCount} words</p>
                            </div>
                        </div>
                    </div>
                );
            }

            return null;
        },
    });

    // Action: Check Memo Completeness
    useCopilotAction({
        name: "check_memo_completeness",
        description: "Check what sections are missing or incomplete in the current memo. Use this to understand what still needs to be written or improved.",
        parameters: [],
        handler: async () => {
            if (!memo) {
                return "No memo is currently open.";
            }

            const requiredSections = memo.template.sections.filter(s => s.required);
            const completeSections = memo.sections.filter(s => s.content.length > 100);
            const incompleteSections = requiredSections.filter(
                templateSection => !memo.sections.find(
                    s => s.type === templateSection.type && s.content.length > 100
                )
            );

            return {
                completeness: memo.metadata.completeness,
                totalSections: memo.sections.length,
                completeSections: completeSections.length,
                incompleteSections: incompleteSections.map(s => s.title),
                suggestion: incompleteSections.length > 0
                    ? `Consider expanding: ${incompleteSections.slice(0, 3).map(s => s.title).join(', ')}`
                    : 'All required sections are complete!',
            };
        },
        render: ({ result }: any) => {
            if (!result) return null;

            return (
                <div className="w-full max-w-md p-4 border border-border/50 rounded-lg bg-muted/30">
                    <h3 className="font-semibold text-sm mb-3">Memo Completeness: {Math.round(result.completeness)}%</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Complete Sections</span>
                            <span className="font-medium">{result.completeSections} / {result.totalSections}</span>
                        </div>
                        {result.incompleteSections.length > 0 && (
                            <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                                <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                                    Needs attention: {result.incompleteSections.join(', ')}
                                </p>
                            </div>
                        )}
                        {result.incompleteSections.length === 0 && (
                            <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded">
                                <p className="text-xs font-medium text-green-700 dark:text-green-400">
                                    ✓ All required sections complete!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        },
    });

    return null;
}
