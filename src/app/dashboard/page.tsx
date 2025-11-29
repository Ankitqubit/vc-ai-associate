"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AIInterface } from "@/components/layout/ai-interface";

import { useDeal } from "@/lib/contexts/deal-context";

export default function DashboardPage() {
    const { getDealById } = useDeal();
    const deal = getDealById("deal-1"); // Acme Corp

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans relative overflow-hidden flex flex-col">
            {/* ... existing background ... */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 p-6 max-w-5xl mx-auto w-full">

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    {/* ... existing hero content ... */}
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                        <div className="relative h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-indigo-50 group-hover:scale-105 transition-transform duration-300">
                            <Sparkles className="h-8 w-8 text-indigo-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-medium text-slate-900 tracking-tight">
                            Good morning, Sarah.
                        </h1>
                        <p className="text-lg text-slate-500 font-light">
                            I've analyzed 3 new items for you today.
                        </p>
                    </div>
                </div>

                {/* Insight Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">

                    {/* Card 1: The New Deal */}
                    <Link href="/deals/deal-1" className="group">
                        <Card className="h-full p-6 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                                    Top Pick
                                </Badge>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {deal?.company.name || "Acme Corp"} Analysis
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                Strong {deal?.stage || "Series A"} fit ({deal?.fitScore.score || 78}/100). {deal?.company.description || "Ex-Google team building logistics AI."}
                            </p>
                            <div className="flex items-center text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Review Deal <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                        </Card>
                    </Link>

                    {/* Card 2: Market Insight */}
                    <div className="group cursor-pointer">
                        <Card className="h-full p-6 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">
                                SaaS Multiples Update
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                B2B SaaS multiples have compressed by 0.5x this week.
                            </p>
                        </Card>
                    </div>

                    {/* Card 3: Upcoming Call */}
                    <div className="group cursor-pointer">
                        <Card className="h-full p-6 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className="text-slate-500 border-slate-200">
                                    2:00 PM
                                </Badge>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">
                                Prep for Linear Call
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                I've prepared a one-pager summary for your call with Karri.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* AI Interface - Floating Mode */}
                <AIInterface layout="floating" />

            </main>
        </div>
    );
}
