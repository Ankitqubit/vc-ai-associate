import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

interface MetricUpdateCardProps {
    metricName: string;
    newValue: string;
    trend?: string;
    status: "inProgress" | "complete" | "error";
    result?: string;
}

export function MetricUpdateCard({ metricName, newValue, trend, status, result }: MetricUpdateCardProps) {
    const isError = status === "error" || (status === "complete" && result?.startsWith("Error"));

    return (
        <Card className={`w-full max-w-sm border-2 ${isError ? "border-red-100 bg-red-50/50" : "border-indigo-50 bg-indigo-50/30"}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {status === "inProgress" && <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />}
                        {status === "complete" && !isError && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {isError && <XCircle className="h-4 w-4 text-red-500" />}

                        <span className="text-sm font-medium text-slate-700">
                            {status === "inProgress" ? "Updating Metric..." : isError ? "Update Failed" : "Update Successful"}
                        </span>
                    </div>
                    <Badge variant="outline" className="bg-white text-slate-500 border-slate-200">
                        {metricName}
                    </Badge>
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">New Value</p>
                        <p className="text-xl font-bold text-slate-900">{newValue}</p>
                    </div>
                    {trend && (
                        <div className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trend}
                        </div>
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
}
