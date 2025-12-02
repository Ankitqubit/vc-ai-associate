"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Phone, FileText, Calendar } from "lucide-react";
import { CallSummaryUploadModal } from "@/components/features/call-summary-upload-modal";
import { CallSummaryCard, CallSummary } from "@/components/copilot/CallSummaryCard";
import { useDealState } from "@/lib/contexts/deal-state-context";

export function DealTimeline() {
    const { deal } = useDealState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [summaries, setSummaries] = useState<CallSummary[]>(deal.callSummaries || []);

    const handleSummarize = async (transcript: string, metadata: any) => {
        try {
            const response = await fetch('/api/calls/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transcript,
                    metadata,
                    dealId: deal.id
                })
            });

            if (!response.ok) throw new Error('Failed to summarize');

            const data = await response.json();
            setSummaries(prev => [data.summary, ...prev]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
                <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Call Summary
                </Button>
            </div>

            <div className="space-y-4">
                {summaries.length === 0 ? (
                    <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                        <CardContent className="p-8 text-center">
                            <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                <Phone className="h-6 w-6 text-indigo-500" />
                            </div>
                            <h4 className="text-sm font-medium text-slate-900 mb-1">No calls recorded yet</h4>
                            <p className="text-sm text-slate-500 mb-4">
                                Add a call summary to track key insights, metrics, and next steps.
                            </p>
                            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                                Add First Summary
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    summaries.map((summary, index) => (
                        <div key={index} className="relative pl-8 pb-8 last:pb-0">
                            {/* Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />

                            {/* Timeline Dot */}
                            <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-white" />

                            <CallSummaryCard summary={summary} />
                        </div>
                    ))
                )}
            </div>

            <CallSummaryUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSummarize={handleSummarize}
            />
        </div>
    );
}
