"use client";

import { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface MetricsDisplayProps {
    metrics: Deal["metrics"];
    loading?: boolean;
}

export function MetricsDisplay({ metrics, loading }: MetricsDisplayProps) {
    const getConfidenceColor = (confidence: string) => {
        if (confidence === "High") return "text-green-500";
        if (confidence === "Medium") return "text-yellow-500";
        return "text-red-500";
    };

    const getConfidenceIcon = (confidence: string) => {
        if (confidence === "High") return CheckCircle;
        return AlertCircle;
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse rounded-lg border border-border/50 bg-muted/30 p-4">
                        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="h-6 bg-muted rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground mb-3">
                Key Metrics
            </div>

            {metrics.map((metric) => {
                const ConfidenceIcon = getConfidenceIcon(metric.confidence);

                return (
                    <div
                        key={metric.id}
                        className="group rounded-lg border border-border/50 bg-gradient-to-br from-background/50 to-muted/30 p-4 hover:border-primary/50 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium">{metric.name}</h4>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs",
                                        getConfidenceColor(metric.confidence)
                                    )}>
                                        <ConfidenceIcon className="h-3 w-3" />
                                        {metric.confidence}
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">
                                    {metric.value}
                                </div>
                                {metric.trend && (
                                    <div className={cn(
                                        "flex items-center gap-1 text-sm font-medium",
                                        metric.trend.startsWith("+") ? "text-green-500" : "text-red-500"
                                    )}>
                                        {metric.trend.startsWith("+") ? (
                                            <TrendingUp className="h-4 w-4" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4" />
                                        )}
                                        {metric.trend}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-2 border-t border-border/50 mt-2">
                            <div className="text-xs text-muted-foreground">
                                Source: {metric.source}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
