"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

    return (
        <Card
            className={`w-full max-w-sm border-2 transition-all duration-300 ${
                isError
                    ? "border-red-100 bg-red-50/50"
                    : status === "inProgress"
                    ? "border-indigo-100 bg-indigo-50/30"
                    : "border-indigo-50 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 hover:border-indigo-200"
            }`}
        >
            <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {status === "inProgress" && <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />}
                        {isSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {isError && <XCircle className="h-4 w-4 text-red-500" />}

                        <span className="text-sm font-medium text-slate-700">
                            {status === "inProgress" ? "Generating Memo..." : isError ? "Generation Failed" : "Memo Created"}
                        </span>
                    </div>

                    {isSuccess && (
                        <Badge variant="outline" className="bg-white text-indigo-600 border-indigo-100">
                            Draft
                        </Badge>
                    )}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 mb-1">
                                {memo?.title || "Investment Committee Memo"}
                            </h4>

                            {status === "inProgress" && (
                                <div className="space-y-2">
                                    <p className="text-xs text-slate-500">
                                        Analyzing deal data and generating sections...
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                        <div
                                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        />
                                        <div
                                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                    </div>
                                </div>
                            )}

                            {isSuccess && memo && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-xs text-slate-600">
                                        <span>{memo.sections.length} sections</span>
                                        <span>•</span>
                                        <span>{memo.metadata.wordCount.toLocaleString()} words</span>
                                        <span>•</span>
                                        <span>{Math.round(memo.metadata.completeness)}% complete</span>
                                    </div>

                                    <Link href={memoUrl}>
                                        <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white group">
                                            Open Memo
                                            <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {isError && (
                                <p className="text-xs text-slate-500">
                                    An error occurred during generation
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {isError && errorMessage && (
                    <p className="text-xs text-red-600 mt-3 bg-red-100/50 p-2 rounded border border-red-100">
                        {errorMessage}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
