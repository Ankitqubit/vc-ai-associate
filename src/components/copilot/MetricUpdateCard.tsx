import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricUpdateCardProps {
    metricName: string;
    newValue: string;
    trend?: string;
    status: "inProgress" | "complete" | "error";
    result?: string;
    dealId?: string;
}

export function MetricUpdateCard({ metricName, newValue, trend, status, result, dealId }: MetricUpdateCardProps) {
    const isError = status === "error" || (status === "complete" && result?.startsWith("Error"));
    const isSuccess = status === "complete" && !isError;

    const cardContent = (
        <div className={cn(
            "w-full max-w-sm transition-all duration-300",
            "rounded-lg border border-border/50",
            "bg-gradient-to-br from-background/50 to-muted/30",
            "p-4",
            isError ? "border-red-200/50" : "hover:border-primary/50",
            dealId && "cursor-pointer group"
        )}>
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 text-muted-foreground font-medium">
                            {metricName}
                        </Badge>
                        {status === "inProgress" && (
                            <span className="flex items-center text-xs text-indigo-500 font-medium animate-pulse">
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                Updating...
                            </span>
                        )}
                        {dealId && (
                            <ArrowRight className="h-3 w-3 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        )}
                    </div>

                    {/* Main Value Area */}
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-foreground">
                            {newValue}
                        </span>
                        {trend && (
                            <div className={cn(
                                "flex items-center text-sm font-medium",
                                trend.startsWith("+") ? "text-green-500" : "text-red-500"
                            )}>
                                <TrendingUp className={cn("h-4 w-4 mr-1", !trend.startsWith("+") && "rotate-180")} />
                                {trend}
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Icons */}
                <div className="ml-2">
                    {isSuccess && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {isError && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
            </div>

            {/* Status/Result Footer */}
            <div className="pt-2 border-t border-border/50 mt-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                        {isSuccess ? "Update confirmed" : isError ? "Update failed" : "Waiting for confirmation..."}
                    </span>
                    <span className="text-muted-foreground">
                        Source: AI Update
                    </span>
                </div>

                {isError && result && (
                    <p className="mt-2 text-xs text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">
                        {result}
                    </p>
                )}
            </div>
        </div>
    );

    if (dealId) {
        return <Link href={`/deals/${dealId}`} className="block">{cardContent}</Link>;
    }

    return cardContent;
}
