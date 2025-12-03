"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemoGenerateCardProps {
    dealId: string;
    status: "inProgress" | "complete" | "error";
    result?: {
        success?: boolean;
        memo?: {
            id: string;
            title: string;
            sections: any[];
            metadata: {
                wordCount: number;
                completeness: number;
            };
        };
        message?: string;
    } | string;
}

export function MemoGenerateCard({ dealId, status, result }: MemoGenerateCardProps) {
    const isError = status === "error" || (status === "complete" && typeof result === "object" && result.success === false);
    const isSuccess = status === "complete" && !isError;

    const memo = typeof result === "object" ? result.memo : null;
    const errorMessage = typeof result === "string" ? result : typeof result === "object" ? result.message : null;
    const memoUrl = `/deals/${dealId}/memo`;

    const cardContent = (
        <div
            className={cn(
                "w-full max-w-sm transition-all duration-300",
                "rounded-lg border border-border/50",
                "bg-gradient-to-br from-background/50 to-muted/30",
                "p-4",
                isError ? "border-red-200/50" : "hover:border-primary/50",
                isSuccess && dealId && "cursor-pointer group"
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 text-muted-foreground font-medium">
                                Investment Memo
                            </Badge>
                            {status === "inProgress" && (
                                <span className="flex items-center text-xs text-indigo-500 font-medium">
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    Generating...
                                </span>
                            )}
                            {isSuccess && dealId && (
                                <ExternalLink className="h-3 w-3 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            )}
                        </div>
                    </div>

                    {/* Memo Title */}
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                        {memo?.title || "IC Memo Draft"}
                    </h4>

                    {/* Memo Stats - Only show when complete */}
                    {isSuccess && memo && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{memo.sections.length} sections</span>
                            <span>•</span>
                            <span>{memo.metadata.wordCount.toLocaleString()} words</span>
                            <span>•</span>
                            <span>{Math.round(memo.metadata.completeness)}% complete</span>
                        </div>
                    )}

                    {/* Loading message */}
                    {status === "inProgress" && (
                        <p className="text-xs text-muted-foreground">
                            Analyzing deal data and generating sections...
                        </p>
                    )}
                </div>

                {/* Status Icons */}
                <div className="ml-2">
                    {isSuccess && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {isError && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
            </div>

            {/* Status Footer */}
            <div className="pt-2 border-t border-border/50 mt-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                        {isSuccess ? "Memo created successfully" : isError ? "Generation failed" : "Generating memo..."}
                    </span>
                    {isSuccess && (
                        <span className="text-primary font-medium group-hover:underline">
                            Open Memo →
                        </span>
                    )}
                </div>

                {/* Error Message */}
                {isError && errorMessage && (
                    <p className="mt-2 text-xs text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );

    if (isSuccess && dealId) {
        return (
            <Link href={memoUrl} className="block">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
