"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Edit2, Check, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CallSummary {
    id?: string;
    whatWeLearned: string[];
    metricsShared: Array<{ name: string; value: string; change?: string }>;
    risksAndConcerns: string[];
    nextSteps: string[];
    metadata: {
        date: string;
        participants: string[];
        duration?: number;
    };
}

interface CallSummaryCardProps {
    summary: CallSummary;
    onApprove?: () => void;
    onEdit?: () => void;
}

export function CallSummaryCard({ summary, onApprove, onEdit }: CallSummaryCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Card className="w-full border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            📞 Call Summary
                            <span className="text-xs font-normal text-muted-foreground">
                                • {summary.metadata.date}
                            </span>
                        </CardTitle>
                        <div className="text-xs text-muted-foreground">
                            with {summary.metadata.participants.join(", ")}
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="space-y-4 text-sm">
                    {/* What We Learned */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-primary flex items-center gap-2">
                            💡 What We Learned
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                            {summary.whatWeLearned.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Metrics Shared */}
                    {summary.metricsShared.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-primary flex items-center gap-2">
                                📊 Metrics Shared
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {summary.metricsShared.map((metric, i) => (
                                    <div key={i} className="bg-muted/50 p-2 rounded border border-border/50">
                                        <div className="text-xs text-muted-foreground">{metric.name}</div>
                                        <div className="font-semibold">{metric.value}</div>
                                        {metric.change && (
                                            <div className="text-xs text-green-500">{metric.change}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Risks */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-red-500 flex items-center gap-2">
                            ⚠️ Risks & Concerns
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                            {summary.risksAndConcerns.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-2">
                        <h4 className="font-medium text-green-500 flex items-center gap-2">
                            ✅ Next Steps
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-1">
                            {summary.nextSteps.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {onEdit && (
                                <Button variant="outline" size="sm" onClick={onEdit}>
                                    <Edit2 className="h-3 w-3 mr-2" />
                                    Edit
                                </Button>
                            )}
                            {onApprove && (
                                <Button size="sm" onClick={onApprove}>
                                    <Check className="h-3 w-3 mr-2" />
                                    Approve & Add
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
