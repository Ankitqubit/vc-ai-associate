"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThinkingStep {
    id: string;
    label: string;
    duration: number; // milliseconds to complete
}

interface AIThinkingProps {
    context?: "analyzing" | "creating" | "searching" | "processing" | "default";
    className?: string;
}

const THINKING_TEMPLATES: Record<string, ThinkingStep[]> = {
    analyzing: [
        { id: "read", label: "Reading document structure", duration: 800 },
        { id: "extract", label: "Extracting company information", duration: 1200 },
        { id: "metrics", label: "Identifying key metrics", duration: 1000 },
        { id: "score", label: "Calculating fit score", duration: 900 },
    ],
    creating: [
        { id: "validate", label: "Validating information", duration: 600 },
        { id: "structure", label: "Structuring deal data", duration: 800 },
        { id: "save", label: "Saving to pipeline", duration: 700 },
        { id: "render", label: "Preparing card", duration: 500 },
    ],
    searching: [
        { id: "query", label: "Processing query", duration: 500 },
        { id: "index", label: "Searching knowledge base", duration: 900 },
        { id: "rank", label: "Ranking results", duration: 700 },
    ],
    processing: [
        { id: "think", label: "Thinking", duration: 800 },
        { id: "analyze", label: "Analyzing context", duration: 1000 },
        { id: "formulate", label: "Formulating response", duration: 900 },
    ],
    default: [
        { id: "process", label: "Processing request", duration: 1000 },
        { id: "prepare", label: "Preparing response", duration: 800 },
    ],
};

export function AIThinking({ context = "default", className }: AIThinkingProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const steps = THINKING_TEMPLATES[context] || THINKING_TEMPLATES.default;

    useEffect(() => {
        if (currentStep >= steps.length) return;

        const timer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, steps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep, steps]);

    return (
        <div
            className={cn(
                "flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300",
                className
            )}
        >
            <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 rounded-2xl rounded-bl-md shadow-lg shadow-indigo-500/5 overflow-hidden max-w-md">
                {/* Header */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                >
                    <div className="flex items-center space-x-2.5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md animate-pulse" />
                            <div className="relative bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full p-1.5">
                                <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                            Thinking...
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="text-xs text-slate-400 font-medium">
                            {currentStep}/{steps.length}
                        </div>
                        {isCollapsed ? (
                            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        ) : (
                            <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        )}
                    </div>
                </button>

                {/* Steps */}
                {!isCollapsed && (
                    <div className="px-4 pb-3 space-y-2 border-t border-slate-100">
                        {steps.map((step, index) => {
                            const isComplete = index < currentStep;
                            const isCurrent = index === currentStep;
                            const isPending = index > currentStep;

                            return (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex items-center space-x-2.5 py-1.5 transition-all duration-300",
                                        isComplete && "animate-in fade-in slide-in-from-left-2",
                                        isCurrent && "animate-in fade-in slide-in-from-left-2"
                                    )}
                                >
                                    {/* Icon */}
                                    <div className="relative flex-shrink-0">
                                        {isComplete && (
                                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-0.5 animate-in zoom-in duration-200">
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                        {isCurrent && (
                                            <>
                                                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-sm animate-pulse" />
                                                <div className="relative bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full p-0.5">
                                                    <Loader2 className="h-3 w-3 text-white animate-spin" />
                                                </div>
                                            </>
                                        )}
                                        {isPending && (
                                            <div className="bg-slate-200 rounded-full p-0.5">
                                                <div className="h-3 w-3" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={cn(
                                            "text-xs transition-colors duration-300",
                                            isComplete && "text-slate-500",
                                            isCurrent && "text-slate-700 font-medium",
                                            isPending && "text-slate-400"
                                        )}
                                    >
                                        {step.label}
                                    </span>

                                    {/* Progress bar for current step */}
                                    {isCurrent && (
                                        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden ml-auto">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full animate-progress"
                                                style={{
                                                    animation: `progress ${step.duration}ms linear forwards`,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Progress bar at bottom when collapsed */}
                {isCollapsed && (
                    <div className="h-1 bg-slate-100 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-500 animate-shimmer"
                            style={{
                                width: `${(currentStep / steps.length) * 100}%`,
                                transition: "width 0.3s ease-out",
                            }}
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes progress {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }

                .animate-shimmer {
                    background-size: 200% 100%;
                    animation: shimmer 2s linear infinite;
                }
            `}</style>
        </div>
    );
}
