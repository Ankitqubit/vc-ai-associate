"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // I might need to create this if it doesn't exist, or use standard textarea
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Check if Label exists, otherwise use standard label
import { Loader2, Upload, FileText } from "lucide-react";

interface CallSummaryUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSummarize: (transcript: string, metadata: any) => Promise<void>;
}

export function CallSummaryUploadModal({ isOpen, onClose, onSummarize }: CallSummaryUploadModalProps) {
    const [transcript, setTranscript] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [participants, setParticipants] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSummarize = async () => {
        if (!transcript.trim()) return;

        setIsProcessing(true);
        try {
            await onSummarize(transcript, {
                date,
                participants: participants.split(',').map(p => p.trim()).filter(Boolean)
            });
            onClose();
        } catch (error) {
            console.error("Failed to summarize:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add Call Summary</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Participants (comma separated)</label>
                            <Input
                                placeholder="e.g. Sarah Chen, Mike Ross"
                                value={participants}
                                onChange={(e) => setParticipants(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Transcript</label>
                        <textarea
                            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Paste call transcript here..."
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button onClick={handleSummarize} disabled={!transcript.trim() || isProcessing}>
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Summary
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
