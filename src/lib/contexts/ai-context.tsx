"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface AIMessage {
    id: string;
    role: "ai" | "user";
    content: string;
    timestamp: Date;
}

interface AIContextType {
    messages: AIMessage[];
    addMessage: (message: Omit<AIMessage, "id" | "timestamp">) => void;
    clearMessages: () => void;
    isProcessing: boolean;
    setIsProcessing: (value: boolean) => void;
    currentDealId: string | null;
    setCurrentDealId: (id: string | null) => void;
    executeCommand: (command: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentDealId, setCurrentDealId] = useState<string | null>(null);

    const addMessage = (message: Omit<AIMessage, "id" | "timestamp">) => {
        const newMessage: AIMessage = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    const executeCommand = (command: string) => {
        setIsProcessing(true);

        // Add user message
        addMessage({ role: "user", content: command });

        // Simulate AI processing
        setTimeout(() => {
            const cmd = command.toLowerCase();

            if (cmd.includes("acme") && (cmd.includes("show") || cmd.includes("analysis") || cmd.includes("deal"))) {
                // ... existing logic ...
                // AI response
                addMessage({
                    role: "ai",
                    content: "Opening Acme Corp workspace. Let me show you the analysis...",
                });

                // Navigate after brief delay
                setTimeout(() => {
                    setCurrentDealId("deal-1");
                    router.push("/deals/deal-1");

                    // Add context message after navigation
                    setTimeout(() => {
                        addMessage({
                            role: "ai",
                            content: "Here's the Acme Corp analysis. The fit score is 78/100. What would you like to explore?",
                        });
                        setIsProcessing(false);
                    }, 500);
                }, 1000);
            } else if (cmd.includes("question")) {
                addMessage({
                    role: "ai",
                    content: "Here are 3 suggested questions for the founder:\n1. What is your CAC payback period?\n2. How do you differentiate from Flexport?\n3. What is your current runway?",
                });
                setIsProcessing(false);
            } else if (cmd.includes("competitor")) {
                addMessage({
                    role: "ai",
                    content: "I found 3 key competitors:\n• Competitor A ($10M ARR, Series B)\n• Competitor B (Niche focus, Bootstrapped)\n• Competitor C (Legacy incumbent)",
                });
                setIsProcessing(false);
            } else {
                addMessage({
                    role: "ai",
                    content: "I understand. Let me help you with that.",
                });
                setIsProcessing(false);
            }
        }, 800);
    };

    return (
        <AIContext.Provider
            value={{
                messages,
                addMessage,
                clearMessages,
                isProcessing,
                setIsProcessing,
                currentDealId,
                setCurrentDealId,
                executeCommand,
            }}
        >
            {children}
        </AIContext.Provider>
    );
}

export function useAI() {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error("useAI must be used within AIProvider");
    }
    return context;
}
