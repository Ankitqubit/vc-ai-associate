import { getDealById } from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Building, MapPin, Globe, Users,
    ArrowLeft, Sparkles,
    TrendingUp, Calendar
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AIInterface } from "@/components/layout/ai-interface";
import { DealContext } from "@/components/features/deal-context";
import { DealStateProvider } from "@/lib/contexts/deal-state-context";
import { DealHeader } from "@/components/features/deal-header";
import { DealHero } from "@/components/features/deal-hero";
import { DealMetrics } from "@/components/features/deal-metrics";
import { DealFitScore } from "@/components/features/deal-fit-score";
import { DebugPanel } from "@/components/features/debug-panel";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DealPage({ params }: PageProps) {
    const resolvedParams = await params;
    const deal = getDealById(resolvedParams.id);

    if (!deal) {
        return notFound();
    }

    return (
        <DealStateProvider initialDeal={deal}>
            <div className="h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
                <DealContext />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Top Navigation */}
                    <DealHeader />

                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                        <div className="max-w-5xl mx-auto space-y-8 pb-20">

                            {/* Hero Section */}
                            <DealHero />

                            {/* Tabs & Content */}
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6 inline-flex">
                                    <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Overview</TabsTrigger>
                                    <TabsTrigger value="timeline" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Timeline</TabsTrigger>
                                    <TabsTrigger value="documents" className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Documents</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                    {/* Thesis Fit Score */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <DealFitScore />

                                        {/* Key Metrics */}
                                        <DealMetrics />
                                    </div>

                                </TabsContent>

                                <TabsContent value="timeline">
                                    <Card className="border-slate-200 shadow-sm">
                                        <CardContent className="p-6">
                                            <p className="text-slate-500 text-center py-8">Timeline view coming soon...</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                        </div>
                    </main>
                </div>

                {/* AI Interface - Sidebar Mode */}
                <AIInterface layout="sidebar" />

                <DebugPanel />

            </div>
        </DealStateProvider>
    );
}
