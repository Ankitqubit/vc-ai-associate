import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface StageUpdateCardProps {
    newStage: string;
    reason?: string;
    status: "inProgress" | "complete" | "error";
    result?: string;
    dealId?: string;
}

export function StageUpdateCard({ newStage, reason, status, result, dealId }: StageUpdateCardProps) {
    const isError = status === "error" || (status === "complete" && result?.startsWith("Error"));

    const cardContent = (
        <Card className={`w-full max-w-sm border-2 transition-all duration-300 ${isError ? "border-red-100 bg-red-50/50" : "border-indigo-50 bg-indigo-50/30"} ${dealId ? "hover:border-indigo-200 cursor-pointer group" : ""}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {status === "inProgress" && <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />}
                        {status === "complete" && !isError && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {isError && <XCircle className="h-4 w-4 text-red-500" />}

                        <span className="text-sm font-medium text-slate-700">
                            {status === "inProgress" ? "Moving Stage..." : isError ? "Move Failed" : "Stage Updated"}
                        </span>
                        {dealId && (
                            <ArrowRight className="h-3 w-3 text-indigo-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">New Stage</span>
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                            {newStage}
                        </Badge>
                    </div>
                    {reason && (
                        <p className="text-xs text-slate-500 italic border-t border-slate-50 pt-2 mt-2">
                            "{reason}"
                        </p>
                    )}
                </div>

                {isError && result && (
                    <p className="text-xs text-red-600 mt-3 bg-red-100/50 p-2 rounded border border-red-100">
                        {result}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    if (dealId) {
        return <Link href={`/deals/${dealId}`} className="block">{cardContent}</Link>;
    }

    return cardContent;
}
