"use client";

import { FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalyzingDeckCardProps {
  fileName?: string;
  onComplete?: () => void;
}

const analysisSteps = [
  { id: 1, label: "Extracting text from deck", duration: 800 },
  { id: 2, label: "Identifying company information", duration: 1000 },
  { id: 3, label: "Analyzing market & traction", duration: 1200 },
  { id: 4, label: "Extracting team details", duration: 900 },
  { id: 5, label: "Calculating fit score", duration: 1100 },
  { id: 6, label: "Generating deal profile", duration: 800 }
];

export function AnalyzingDeckCard({ fileName = "pitch_deck.pdf", onComplete }: AnalyzingDeckCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 500);
      return;
    }

    const step = analysisSteps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id]);
      setCurrentStep(prev => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progress = (completedSteps.length / analysisSteps.length) * 100;

  return (
    <div className="my-4 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-indigo-900">
              {isComplete ? "Analysis Complete" : "Analyzing Pitch Deck"}
            </h3>
            {isComplete && (
              <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in duration-300" />
            )}
          </div>
          <p className="text-sm text-indigo-600/70 font-medium truncate">
            {fileName}
          </p>
        </div>

        {!isComplete && (
          <div className="flex-shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-700">
            {isComplete ? "Ready" : "Processing..."}
          </span>
          <span className="text-xs font-semibold text-indigo-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Analysis Steps */}
      <div className="space-y-2">
        {analysisSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === index && !isComplete;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                isCompleted
                  ? "bg-white/60 border border-green-100"
                  : isCurrent
                  ? "bg-white border border-indigo-200 shadow-sm"
                  : "bg-transparent"
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 animate-in zoom-in duration-200" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                )}
              </div>

              <span
                className={`text-sm transition-colors duration-300 ${
                  isCompleted
                    ? "text-green-700 font-medium"
                    : isCurrent
                    ? "text-indigo-700 font-medium"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>

              {isCurrent && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-green-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">
              Deal profile ready! Check the results below.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
