"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Paperclip, ArrowUp, Headphones, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAI } from "@/lib/contexts/ai-context";
import { useSpeechRecognition } from "@/lib/hooks/use-speech-recognition";

interface AIInterfaceProps {
    layout?: "floating" | "sidebar";
    initialMinimized?: boolean;
}

export function AIInterface({ layout = "floating", initialMinimized = false }: AIInterfaceProps) {
    // Reverted to Simulated AI Context
    const { messages, isProcessing, executeCommand } = useAI();

    const [inputValue, setInputValue] = useState("");
    const [voiceTranscript, setVoiceTranscript] = useState("");
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isAISpeaking, setIsAISpeaking] = useState(false);
    const [isMinimized, setIsMinimized] = useState(initialMinimized);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Dictation mode (voice-to-text)
    const { isListening: isDictating, isSupported, startListening: startDictation, stopListening: stopDictation } = useSpeechRecognition({
        onTranscript: (text) => setInputValue(text),
        continuous: false,
    });

    // Voice conversation mode (voice-to-voice)
    const { isListening: isVoiceListening, startListening: startVoiceListening } = useSpeechRecognition({
        onTranscript: (text) => setVoiceTranscript(text),
        continuous: false,
        onEnd: () => {
            // Auto-triggered when silence is detected
            handleVoiceEnd();
        }
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = () => {
        if (!inputValue.trim() || isProcessing) return;
        executeCommand(inputValue);
        setInputValue("");
    };

    const handleDictate = () => {
        if (isDictating) {
            stopDictation();
        } else {
            if (!isSupported) {
                alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
                return;
            }
            startDictation();
        }
    };

    const handleVoiceConversation = () => {
        if (!isSupported) {
            alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
            return;
        }
        setIsVoiceMode(true);
        setVoiceTranscript("");
        setTimeout(() => startVoiceListening(), 300);
    };

    const handleVoiceEnd = () => {
        // Called automatically when silence is detected
        if (!voiceTranscript.trim()) {
            setIsVoiceMode(false);
            return;
        }

        // Simulate AI processing and response
        setIsAISpeaking(true);

        setTimeout(() => {
            setIsAISpeaking(false);
            setIsVoiceMode(false);

            // Execute the command
            executeCommand(voiceTranscript);
            setVoiceTranscript("");
        }, 2500);
    };

    const isFloating = layout === "floating";

    if (isFloating) {
        // Floating layout for Dashboard
        return (
            <div className="w-full max-w-2xl mx-auto relative">
                {/* Compact Recent Messages */}
                {messages.length > 0 && !isVoiceMode && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4 space-y-3 max-h-40 overflow-y-auto mb-4">
                        {messages.slice(-2).map((msg) => (
                            <div key={msg.id} className={cn("text-sm", msg.role === "user" ? "text-slate-600" : "text-indigo-600")}>
                                <span className="font-medium">{msg.role === "user" ? "You" : "AI"}:</span> {msg.content}
                            </div>
                        ))}
                    </div>
                )}

                {/* Input Bar or Voice Mode */}
                <div className={cn(
                    "relative group z-20 transition-all duration-300",
                    isVoiceMode && "bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8"
                )}>

                    {!isVoiceMode ? (
                        // Normal Input Mode
                        <>
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 transition-opacity duration-500",
                                isDictating ? "opacity-30 animate-pulse" : "group-hover:opacity-20"
                            )} />

                            <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 flex items-center p-2 transition-shadow duration-300 group-hover:shadow-xl">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 ml-1">
                                    <Paperclip className="h-5 w-5" />
                                </Button>

                                <input
                                    type="text"
                                    value={isDictating && !inputValue ? "Listening..." : inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    placeholder="Type or dictate your query..."
                                    className={cn(
                                        "flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 px-4 py-3 text-base",
                                        isDictating && "text-indigo-600 font-medium"
                                    )}
                                    disabled={isDictating || isProcessing}
                                />

                                <div className="flex items-center space-x-1 pr-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "text-slate-400 hover:text-indigo-600 transition-colors",
                                            isDictating && "text-red-500 bg-red-50 animate-pulse"
                                        )}
                                        onClick={handleDictate}
                                        title="Voice-to-Text (Dictation)"
                                    >
                                        <Mic className="h-5 w-5" />
                                    </Button>

                                    {!inputValue.trim() ? (
                                        <Button
                                            size="icon"
                                            onClick={handleVoiceConversation}
                                            disabled={isDictating || isProcessing}
                                            className="rounded-xl h-10 w-10 shadow-md transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
                                            title="Voice Conversation (Voice-to-Voice)"
                                        >
                                            <Headphones className="h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            size="icon"
                                            onClick={handleSubmit}
                                            disabled={isProcessing || isDictating}
                                            className="rounded-xl h-10 w-10 shadow-md transition-all bg-indigo-600 hover:bg-indigo-700 text-white"
                                            title="Send Message"
                                        >
                                            {isProcessing ? (
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <ArrowUp className="h-5 w-5" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <p className="text-center text-xs text-slate-400 mt-3 font-light">
                                <span className="inline-flex items-center mr-4">
                                    <Mic className="h-3 w-3 mr-1" /> Dictate
                                </span>
                                <span className="inline-flex items-center">
                                    <Headphones className="h-3 w-3 mr-1" /> Voice / <ArrowUp className="h-3 w-3 ml-1" /> Send
                                </span>
                            </p>
                        </>
                    ) : (
                        // Inline Voice Mode (Expanded)
                        <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
                            {/* Orb Visualizer */}
                            <div className="relative flex items-center justify-center">
                                {(isVoiceListening || isAISpeaking) && (
                                    <>
                                        <div className="absolute w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"
                                            style={{ animationDuration: '2s' }} />
                                        <div className="absolute w-32 h-32 rounded-full bg-indigo-400/30 blur-2xl animate-pulse"
                                            style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
                                    </>
                                )}

                                <div className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                                    isVoiceListening && "bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/50",
                                    isAISpeaking && "bg-gradient-to-tr from-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50"
                                )}>
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                </div>
                            </div>

                            {/* Status Text */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {isVoiceListening && "Listening..."}
                                    {isAISpeaking && "AI is responding"}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {isVoiceListening && "Speak clearly, I'll process your request"}
                                    {isAISpeaking && "Processing and responding..."}
                                </p>
                                {voiceTranscript && !isAISpeaking && (
                                    <p className="text-xs text-slate-400 mt-2">You said: "{voiceTranscript}"</p>
                                )}
                            </div>

                            {/* Waveform */}
                            {(isVoiceListening || isAISpeaking) && (
                                <div className="flex items-center space-x-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "w-1 rounded-full transition-all",
                                                isVoiceListening ? "bg-indigo-400" : "bg-purple-400"
                                            )}
                                            style={{
                                                height: `${Math.random() * 20 + 8}px`,
                                                animationName: 'pulse',
                                                animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                                                animationTimingFunction: 'ease-in-out',
                                                animationIterationCount: 'infinite',
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Sidebar layout for detail pages
    return (
        <aside className={cn(
            "bg-white/90 backdrop-blur-xl border-l border-slate-200 shadow-2xl flex flex-col h-full z-30 relative font-sans transition-all duration-300 ease-in-out",
            isMinimized ? "w-16" : "w-[400px]"
        )}>
            {/* Header */}
            <div className={cn(
                "border-b border-slate-100 flex items-center bg-white/50 backdrop-blur-md flex-shrink-0 transition-all",
                isMinimized ? "flex-col py-4 space-y-4 h-full border-b-0" : "p-4 justify-between"
            )}>
                <div className={cn("flex items-center", isMinimized ? "flex-col space-y-4" : "space-x-3")}>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform cursor-pointer"
                        title={isMinimized ? "Expand AI Associate" : "AI Associate"}
                    >
                        <Headphones className="h-4 w-4 text-white" />
                    </button>

                    {!isMinimized && (
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
                    )}
                </div>

                {!isMinimized && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-slate-600"
                        onClick={() => setIsMinimized(true)}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Content - Only visible when expanded */}
            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                        <ScrollArea className="flex-1 p-4 bg-slate-50/30">
                            <div className="space-y-6" ref={scrollRef}>
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
                                                    "rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed whitespace-pre-wrap",
                                                    msg.role === "user"
                                                        ? "bg-indigo-600 text-white rounded-br-none"
                                                        : "bg-white border border-slate-100 text-slate-700 rounded-bl-none shadow-md"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-1 px-1">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {isProcessing && !isVoiceMode && (
                                    <div className="flex justify-start w-full animate-in fade-in">
                                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Input Area */}
                    <div className={cn(
                        "bg-white border-t border-slate-100 flex-shrink-0 transition-all duration-300",
                        isVoiceMode ? "p-8" : "p-4"
                    )}>
                        {!isVoiceMode ? (
                            // Normal Input Mode
                            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 ml-1 flex-shrink-0">
                                    <Paperclip className="h-5 w-5" />
                                </Button>
                                <input
                                    type="text"
                                    value={isDictating && !inputValue ? "Listening..." : inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    placeholder="Ask anything..."
                                    className={cn(
                                        "flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 py-3 px-2",
                                        isDictating && "text-indigo-600 font-medium"
                                    )}
                                    disabled={isDictating || isProcessing}
                                />
                                <div className="flex items-center pr-1 space-x-1 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "text-slate-400 hover:text-indigo-600 transition-colors",
                                            isDictating && "text-red-500 bg-red-50 animate-pulse"
                                        )}
                                        onClick={handleDictate}
                                        title="Voice-to-Text"
                                    >
                                        <Mic className="h-5 w-5" />
                                    </Button>

                                    {!inputValue.trim() ? (
                                        <Button
                                            size="icon"
                                            onClick={handleVoiceConversation}
                                            disabled={isDictating || isProcessing}
                                            className="h-8 w-8 rounded-xl transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                            title="Voice Conversation"
                                        >
                                            <Headphones className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            size="icon"
                                            onClick={handleSubmit}
                                            disabled={isProcessing || isDictating}
                                            className="h-8 w-8 rounded-xl transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                            title="Send"
                                        >
                                            {isProcessing ? (
                                                <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <ArrowUp className="h-4 w-4" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Inline Voice Mode (Expanded)
                            <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
                                {/* Orb Visualizer */}
                                <div className="relative flex items-center justify-center">
                                    {(isVoiceListening || isAISpeaking) && (
                                        <>
                                            <div className="absolute w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl animate-pulse"
                                                style={{ animationDuration: '2s' }} />
                                            <div className="absolute w-24 h-24 rounded-full bg-indigo-400/30 blur-xl animate-pulse"
                                                style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
                                        </>
                                    )}

                                    <div className={cn(
                                        "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
                                        isVoiceListening && "bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/50",
                                        isAISpeaking && "bg-gradient-to-tr from-purple-500 to-pink-600 shadow-xl shadow-purple-500/50"
                                    )}>
                                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                    </div>
                                </div>

                                {/* Status Text */}
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-900">
                                        {isVoiceListening && "Listening..."}
                                        {isAISpeaking && "AI is responding"}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {isVoiceListening && "Speak clearly, I'll process your request"}
                                        {isAISpeaking && "Processing and responding..."}
                                    </p>
                                </div>

                                {/* Waveform */}
                                {(isVoiceListening || isAISpeaking) && (
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-0.5 rounded-full transition-all",
                                                    isVoiceListening ? "bg-indigo-400" : "bg-purple-400"
                                                )}
                                                style={{
                                                    height: `${Math.random() * 16 + 6}px`,
                                                    animationName: 'pulse',
                                                    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                                                    animationTimingFunction: 'ease-in-out',
                                                    animationIterationCount: 'infinite',
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </aside>
    );
}
