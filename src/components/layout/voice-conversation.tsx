"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceConversationProps {
    isOpen: boolean;
    onClose: () => void;
    onCommand?: (transcript: string) => void;
}

export function VoiceConversation({ isOpen, onClose, onCommand }: VoiceConversationProps) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isAISpeaking, setIsAISpeaking] = useState(false);

    useEffect(() => {
        if (isOpen && !isListening) {
            setTimeout(() => setIsListening(true), 300);
        }
    }, [isOpen]);

    const handleStopListening = () => {
        setIsListening(false);

        const simulatedTranscript = "Show me the analysis for Acme Corp";
        setTranscript(simulatedTranscript);

        setTimeout(() => {
            setIsAISpeaking(true);
            setAiResponse("Opening Acme Corp deal workspace. The fit score is 78 out of 100.");

            setTimeout(() => {
                setIsAISpeaking(false);
                if (onCommand) {
                    onCommand(simulatedTranscript);
                }
            }, 3000);
        }, 1000);
    };

    const handleClose = () => {
        setIsListening(false);
        setTranscript("");
        setAiResponse("");
        setIsAISpeaking(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-32 px-4 pointer-events-none">
            <div className="w-full max-w-md pointer-events-auto animate-in slide-in-from-bottom-4 fade-in duration-300">
                {/* Floating Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 relative">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 h-8 w-8 rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>

                    {/* Orb Visualizer */}
                    <div className="flex flex-col items-center space-y-6 mb-6">
                        <div className="relative flex items-center justify-center">
                            {(isListening || isAISpeaking) && (
                                <>
                                    <div className="absolute inset-0 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"
                                        style={{ animationDuration: '2s' }} />
                                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-indigo-400/30 blur-2xl animate-pulse"
                                        style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
                                </>
                            )}

                            <div className={cn(
                                "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                                isListening && "bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/50",
                                isAISpeaking && "bg-gradient-to-tr from-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50",
                                !isListening && !isAISpeaking && "bg-slate-200"
                            )}>
                                <div className={cn(
                                    "w-3 h-3 rounded-full",
                                    (isListening || isAISpeaking) ? "bg-white" : "bg-slate-400"
                                )} />
                            </div>
                        </div>

                        {/* Status Text */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {isListening && "Listening..."}
                                {isAISpeaking && "AI is responding"}
                                {!isListening && !isAISpeaking && "Voice ended"}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                {isListening && "Speak clearly. I'll process your request."}
                                {isAISpeaking && aiResponse}
                                {!isListening && !isAISpeaking && transcript && `You said: "${transcript}"`}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center">
                        {isListening && (
                            <Button
                                size="lg"
                                onClick={handleStopListening}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 shadow-lg"
                            >
                                <StopCircle className="h-4 w-4 mr-2" />
                                Stop
                            </Button>
                        )}

                        {!isListening && !isAISpeaking && (
                            <Button
                                size="lg"
                                onClick={handleClose}
                                variant="outline"
                                className="rounded-full px-6"
                            >
                                Close
                            </Button>
                        )}
                    </div>

                    {/* Waveform Indicator */}
                    {(isListening || isAISpeaking) && (
                        <div className="flex items-center justify-center space-x-1.5 mt-6">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-1 rounded-full transition-all",
                                        isListening ? "bg-indigo-400" : "bg-purple-400"
                                    )}
                                    style={{
                                        height: `${Math.random() * 20 + 8}px`,
                                        animation: `pulse ${Math.random() * 0.5 + 0.5}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
