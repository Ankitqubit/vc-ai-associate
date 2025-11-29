"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Globe } from "lucide-react";
import { Deal } from "@/lib/types";

export function DealSnapshot({ deal }: { deal: Deal }) {
    return (
        <Card className="w-full border-indigo-100 shadow-md bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                            {deal.company.name}
                            <Badge variant="secondary" className="ml-2 bg-indigo-50 text-indigo-700 border-indigo-100">
                                {deal.fitScore.score}/100
                            </Badge>
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">{deal.company.description}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {deal.metrics.slice(0, 4).map((metric) => (
                        <div key={metric.id} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <p className="text-xs text-slate-400 uppercase font-semibold">{metric.name}</p>
                            <p className="text-sm font-bold text-slate-900">{metric.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                    <span className="flex items-center"><Globe className="h-3 w-3 mr-1" /> {deal.company.location}</span>
                    <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {deal.company.teamSize}</span>
                </div>
            </CardContent>
        </Card>
    );
}
