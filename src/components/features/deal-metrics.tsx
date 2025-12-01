"use client";

import { useDealState } from "@/lib/contexts/deal-state-context";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";


export function DealMetrics() {
    const { deal } = useDealState();
    console.log(`[DealMetrics] Rendering with deal metrics:`, deal.metrics);

    return (
        <div className="space-y-4">
            {deal.metrics.map((metric) => (
                <Card key={metric.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            {metric.name}
                        </p>
                        <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                            {metric.trend && (
                                <div className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {metric.trend}
                                </div>
                            )}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                            <span className="text-slate-400">Confidence</span>
                            <span className={metric.confidence === 'High' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
                                {metric.confidence}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
