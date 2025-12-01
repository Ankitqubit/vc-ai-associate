import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface FitScoreUpdateCardProps {
    newScore: number;
    rationale: string;
    status: "inProgress" | "complete" | "error";
    result?: string;
}

export function FitScoreUpdateCard({ newScore, rationale, status, result }: FitScoreUpdateCardProps) {
    const isError = status === "error" || (status === "complete" && result?.startsWith("Error"));

    return (
        <Card className={`w-full max-w-sm border-2 ${isError ? "border-red-100 bg-red-50/50" : "border-purple-50 bg-purple-50/30"}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {status === "inProgress" && <Loader2 className="h-4 w-4 text-purple-500 animate-spin" />}
                        {status === "complete" && !isError && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {isError && <XCircle className="h-4 w-4 text-red-500" />}

                        <span className="text-sm font-medium text-slate-700">
                            {status === "inProgress" ? "Updating Score..." : isError ? "Update Failed" : "Score Updated"}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full border border-purple-100">
                        <Sparkles className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-bold text-purple-700">{newScore}/100</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Rationale</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {rationale}
                    </p>
                </div>

                {isError && result && (
                    <p className="text-xs text-red-600 mt-3 bg-red-100/50 p-2 rounded border border-red-100">
                        {result}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
