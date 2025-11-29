"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ArrowRight, MoreHorizontal, Mic, Paperclip, X, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "ai" | "user";
    content: string;
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        role: "ai",
        content: "I've analyzed the Acme Corp deck. The team is strong, but the market is crowded. \n\nI can help you:\n• Draft founder questions\n• Research competitors\n• Write a one-pager",
        timestamp: new Date(),
    },
];

export function AIPanel() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            let aiResponse = "I'm on it.";

            if (content.toLowerCase().includes("question")) {
                aiResponse = "Here are 3 suggested questions for the founder:\n1. **Unit Economics**: What is your CAC payback period?\n2. **Competition**: How do you differentiate from Flexport?\n3. **Burn**: What is your current runway?";
            } else if (content.toLowerCase().includes("competitor")) {
                aiResponse = "Searching market data...\n\nFound 3 key competitors:\n• **Competitor A** ($10M ARR, Series B)\n• **Competitor B** (Niche focus, Bootstrapped)\n• **Competitor C** (Legacy incumbent)";
            } else if (content.toLowerCase().includes("voice") || content.toLowerCase().includes("listen")) {
                aiResponse = "I'm listening. You can speak now.";
            } else {
                aiResponse = "I've updated the deal record with that information. Anything else?";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponse,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const toggleVoiceMode = () => {
        if (isListening) {
            setIsListening(false);
            handleSendMessage("Analyze the risks based on what I just said.");
        } else {
            setIsListening(true);
            // Simulate "listening" for 3 seconds then auto-submitting
            setTimeout(() => {
                // In a real app, this would be the transcribed text
                // For now, we just let the user stop it manually or wait
            }, 3000);
        }
    };

    return (
        <aside className="w-[400px] bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col h-full z-30 relative font-sans">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-sm">AI Associate</h3>
                        <div className="flex items-center space-x-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">Online</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30" ref={scrollRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn("flex max-w-[85%] flex-col", msg.role === "user" ? "items-end" : "items-start")}>
                            <div
                                className={cn(
                                    "rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed",
                                    msg.role === "user"
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-md"
                                )}
                            >
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full animate-in fade-in">
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Voice Mode Overlay */}
            {isListening && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-200">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full animate-pulse" />
                        <div className="h-24 w-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-bounce">
                            <Mic className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900">Listening...</h3>
                        <p className="text-slate-500 text-sm">Speak clearly to your AI Associate</p>
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                        onClick={toggleVoiceMode}
                    >
                        <StopCircle className="h-5 w-5 mr-2" />
                        Stop Recording
                    </Button>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 ml-1">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 py-3 px-2"
                    />
                    <div className="flex items-center pr-1 space-x-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("text-slate-400 hover:text-indigo-600 transition-colors", isListening && "text-indigo-600 bg-indigo-50")}
                            onClick={toggleVoiceMode}
                        >
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button
                            size="icon"
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "h-8 w-8 rounded-xl transition-all shadow-sm",
                                inputValue.trim()
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            )}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
