"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useMemo } from "@/lib/contexts/memo-context";
import { SelectionProvider } from "@/lib/contexts/selection-context";
import { MemoCanvas } from "@/components/memo/memo-canvas";
import { getMemoByDealId } from "@/lib/data/mock-db";
import { AIInterface } from "@/components/layout/ai-interface";
import { DealHeader } from "@/components/features/deal-header";
import { DealHero } from "@/components/features/deal-hero";
import { DealMetrics } from "@/components/features/deal-metrics";
import { DealFitScore } from "@/components/features/deal-fit-score";
import { DealTimeline } from "@/components/features/deal-timeline";
import { DealEnrichment } from "@/components/features/deal-enrichment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DealPageContentProps {
    children: React.ReactNode;
    deal: Deal;
}

export function DealPageContent({ children, deal }: DealPageContentProps) {
    const params = useParams();
    const dealId = params.id as string;
    const { isCanvasOpen, closeCanvas, memo, setMemo } = useMemo();

    // Load existing memo on mount
    useEffect(() => {
        const existingMemo = getMemoByDealId(dealId);
        if (existingMemo && (!memo || memo.id !== existingMemo.id)) {
            setMemo(existingMemo);
        }
    }, [dealId, memo, setMemo]);

    return (
        <SelectionProvider>
            {children}
            <div className="h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
                {/* Main Content Area - Conditionally show Deal or Canvas */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
                    isCanvasOpen ? "opacity-100" : "opacity-100"
                )}>
                    {!isCanvasOpen ? (
                        // Deal Content
                        <>
                            <DealHeader />
                            <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                                <div className="max-w-5xl mx-auto space-y-8 pb-20">
                                    <DealHero />
                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6 inline-flex">
                                            <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">
                                                Overview
                                            </TabsTrigger>
                                            <TabsTrigger value="timeline" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">
                                                Timeline
                                            </TabsTrigger>
                                            <TabsTrigger value="documents" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">
                                                Documents
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <DealFitScore />
                                                <DealMetrics />
                                            </div>
                                            <DealEnrichment />
                                        </TabsContent>

                                        <TabsContent value="timeline">
                                            <DealTimeline />
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </main>
                        </>
                    ) : (
                        // Canvas Content
                        <MemoCanvas deal={deal} onClose={closeCanvas} />
                    )}
                </div>

                {/* AI Interface - Always visible on the right */}
                <AIInterface
                    layout="sidebar"
                    className="relative h-screen border-l border-slate-200 shadow-none z-0 w-[400px] flex-shrink-0"
                />
            </div>
        </SelectionProvider>
    );
}
