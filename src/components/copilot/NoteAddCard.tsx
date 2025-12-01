import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, StickyNote } from "lucide-react";

interface NoteAddCardProps {
    note: string;
    category?: string;
    status: "inProgress" | "complete" | "error";
    result?: string;
}

export function NoteAddCard({ note, category, status, result }: NoteAddCardProps) {
    const isError = status === "error" || (status === "complete" && result?.startsWith("Error"));

    return (
        <Card className={`w-full max-w-sm border-2 ${isError ? "border-red-100 bg-red-50/50" : "border-amber-50 bg-amber-50/30"}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        {status === "inProgress" && <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />}
                        {status === "complete" && !isError && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {isError && <XCircle className="h-4 w-4 text-red-500" />}

                        <span className="text-sm font-medium text-slate-700">
                            {status === "inProgress" ? "Adding Note..." : isError ? "Failed to Add Note" : "Note Added"}
                        </span>
                    </div>
                    {category && (
                        <Badge variant="outline" className="bg-white text-slate-500 border-slate-200">
                            {category}
                        </Badge>
                    )}
                </div>

                <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm flex items-start space-x-3">
                    <StickyNote className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600 italic">
                        "{note}"
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
