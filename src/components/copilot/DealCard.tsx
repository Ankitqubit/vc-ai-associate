"use client";

import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Building2, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DealCardProps {
    deal: Deal;
    loading?: boolean;
    isNew?: boolean;
}

export function DealCard({ deal, loading, isNew }: DealCardProps) {
    const getFitScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getFitScoreBg = (score: number) => {
        if (score >= 80) return "from-green-500/20 to-green-600/20";
        if (score >= 60) return "from-yellow-500/20 to-yellow-600/20";
        return "from-red-500/20 to-red-600/20";
    };

    if (loading) {
        return (
            <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
        );
    }

    if (!deal) {
        return (
            <div className="rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm p-6">
                <p className="text-sm text-muted-foreground">No deal data available.</p>
            </div>
        );
    }

    return (
        <Link
            href={`/deals/${deal.id}`}
            className={cn(
                "block group relative rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer",
                isNew && "animate-in slide-in-from-bottom-4 fade-in duration-700 shadow-lg hover:shadow-xl"
            )}
        >
            {/* NEW badge with confetti effect */}
            {isNew && (
                <>
                    <div className="absolute top-3 right-3 z-10 animate-in zoom-in duration-500 delay-300">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                            NEW
                        </span>
                    </div>
                    {/* Success glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 animate-pulse pointer-events-none" />
                </>
            )}

            {/* Header with gradient */}
            <div className={cn(
                "bg-gradient-to-r p-6 border-b border-border/50",
                getFitScoreBg(deal.fitScore.score)
            )}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{deal.company.name}</h3>
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                            {deal.company.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {deal.company.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {deal.company.teamSize} team
                            </div>
                        </div>
                    </div>

                    {/* Fit Score Badge */}
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "text-3xl font-bold",
                            getFitScoreColor(deal.fitScore.score)
                        )}>
                            {deal.fitScore.score}
                        </div>
                        <div className="text-xs text-muted-foreground">Fit Score</div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {deal.metrics.slice(0, 3).map((metric) => (
                        <div
                            key={metric.id}
                            className="bg-gradient-to-br from-muted/50 to-background/50 rounded-lg p-3 border border-border/50"
                        >
                            <div className="text-xs text-muted-foreground mb-1">{metric.name}</div>
                            <div className="text-lg font-semibold mb-1">{metric.value}</div>
                            {metric.trend && (
                                <div className="flex items-center gap-1 text-xs text-green-500">
                                    <TrendingUp className="h-3 w-3" />
                                    {metric.trend}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Stage and Source */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {deal.stage}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            via {deal.source}
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Owner: {deal.owner.name}
                    </div>
                </div>
            </div>
        </Link>
    );
}
