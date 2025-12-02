"use client";

import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2, TrendingUp, Users, MapPin, ArrowRight } from "lucide-react";

interface DealComparisonCardProps {
    deals: Deal[];
    loading?: boolean;
}

export function DealComparisonCard({ deals, loading }: DealComparisonCardProps) {
    if (loading) {
        return (
            <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-48 bg-muted rounded"></div>
                    <div className="h-48 bg-muted rounded"></div>
                </div>
            </div>
        );
    }

    if (!deals || deals.length === 0) {
        return (
            <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm p-6">
                <p className="text-sm text-muted-foreground">No deals to compare.</p>
            </div>
        );
    }

    const getFitScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getFitScoreBg = (score: number) => {
        if (score >= 80) return "from-green-500/10 to-green-600/10 border-green-500/20";
        if (score >= 60) return "from-yellow-500/10 to-yellow-600/10 border-yellow-500/20";
        return "from-red-500/10 to-red-600/10 border-red-500/20";
    };

    return (
        <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border/50">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    Deal Comparison ({deals.length} deals)
                </h3>
            </div>

            {/* Comparison Grid */}
            <div className={cn(
                "grid gap-4 p-6",
                deals.length === 2 ? "grid-cols-2" : deals.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
            )}>
                {deals.map((deal) => (
                    <div
                        key={deal.id}
                        className="rounded-lg border border-border/50 bg-background/50 overflow-hidden hover:border-primary/50 transition-all"
                    >
                        {/* Company Header */}
                        <div className={cn(
                            "bg-gradient-to-r p-4 border-b border-border/50",
                            getFitScoreBg(deal.fitScore.score)
                        )}>
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-primary" />
                                    <h4 className="font-semibold text-sm">{deal.company.name}</h4>
                                </div>
                                <div className={cn(
                                    "text-2xl font-bold",
                                    getFitScoreColor(deal.fitScore.score)
                                )}>
                                    {deal.fitScore.score}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {deal.company.description}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-3">
                            {/* Stage */}
                            <div>
                                <div className="text-xs text-muted-foreground mb-1">Stage</div>
                                <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium inline-block">
                                    {deal.stage}
                                </div>
                            </div>

                            {/* Location & Team */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {deal.company.location}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Users className="h-3 w-3" />
                                    {deal.company.teamSize} team
                                </div>
                            </div>

                            {/* Top Metrics */}
                            <div className="space-y-2 pt-2 border-t border-border/50">
                                {deal.metrics.slice(0, 2).map((metric) => (
                                    <div key={metric.id} className="space-y-1">
                                        <div className="text-xs text-muted-foreground">{metric.name}</div>
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-sm font-semibold">{metric.value}</div>
                                            {metric.trend && (
                                                <div className="flex items-center gap-1 text-xs text-green-500">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {metric.trend}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Fit Score Breakdown */}
                            <div className="pt-2 border-t border-border/50">
                                <div className="text-xs text-muted-foreground mb-2">Fit Breakdown</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <div className="text-muted-foreground">Team</div>
                                        <div className="font-medium">{deal.fitScore.breakdown.team}/100</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Market</div>
                                        <div className="font-medium">{deal.fitScore.breakdown.market}/100</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Traction</div>
                                        <div className="font-medium">{deal.fitScore.breakdown.traction}/100</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground">Product</div>
                                        <div className="font-medium">{deal.fitScore.breakdown.product}/100</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="bg-muted/30 p-4 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Winner: </span>
                    {deals.reduce((prev, current) =>
                        (prev.fitScore.score > current.fitScore.score) ? prev : current
                    ).company.name} ({deals.reduce((prev, current) =>
                        (prev.fitScore.score > current.fitScore.score) ? prev : current
                    ).fitScore.score}/100)
                </div>
            </div>
        </div>
    );
}
