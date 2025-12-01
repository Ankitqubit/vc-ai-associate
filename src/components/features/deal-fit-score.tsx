"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function DealFitScore() {
    const { deal } = useDealState();

    return (
        <Card className="md:col-span-2 border-indigo-100 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-900 flex items-center">
                        <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
                        Thesis Fit Score
                    </h3>
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 px-3 py-1 text-sm">
                        {deal.fitScore.score}/100
                    </Badge>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                    {deal.fitScore.rationale}
                </p>

                <div className="space-y-4">
                    {Object.entries(deal.fitScore.breakdown).map(([key, value]) => (
                        <div key={key} className="group">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="capitalize text-slate-500 font-medium group-hover:text-indigo-600 transition-colors">{key}</span>
                                <span className="font-semibold text-slate-900">{value}/100</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
