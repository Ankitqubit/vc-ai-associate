"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Paperclip, ArrowUp, X, Maximize2, Minimize2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage, ActionExecutionMessage } from "@copilotkit/runtime-client-gql";
import { MetricUpdateCard } from "@/components/copilot/MetricUpdateCard";
import { StageUpdateCard } from "@/components/copilot/StageUpdateCard";
import { NoteAddCard } from "@/components/copilot/NoteAddCard";
import { FitScoreUpdateCard } from "@/components/copilot/FitScoreUpdateCard";
import { CompanyUpdateCard } from "@/components/copilot/CompanyUpdateCard";
import { DealCard } from "@/components/copilot/DealCard";
import { MetricsDisplay } from "@/components/copilot/MetricsDisplay";
import { DealComparisonCard } from "@/components/copilot/DealComparisonCard";
import { CallSummaryCard } from "@/components/copilot/CallSummaryCard";
import { MemoGenerateCard } from "@/components/copilot/MemoGenerateCard";
import { useSafeDealState } from "@/lib/contexts/deal-state-context";
import { getDealById } from "@/lib/data/mock-db";
import { useSelection } from "@/lib/contexts/selection-context";
import { ContextCard } from "@/components/chat/ContextCard";
import { FileUploadZone } from "@/components/deals/FileUploadZone";
import { FilePreviewCard } from "@/components/deals/FilePreviewCard";

interface AttachedFile {
    file: File;
    id: string;
    uploadProgress: number;
    status: 'uploading' | 'parsing' | 'success' | 'error';
    errorMessage?: string;
}

// Wrapper component to fetch deals for comparison
function DealComparisonWrapper({ dealIds }: { dealIds: string[] }) {
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = () => {
            const fetchedDeals = dealIds.map(id => getDealById(id)).filter(Boolean);
            setDeals(fetchedDeals);
            setLoading(false);
        };
        fetchDeals();
    }, [dealIds]);

    return <DealComparisonCard deals={deals} loading={loading} />;
}

interface AIInterfaceProps {
    layout?: "floating" | "sidebar" | "center";
    className?: string;
    onChatStateChange?: (isActive: boolean) => void;
}

export function AIInterface({ layout = "floating", className, onChatStateChange }: AIInterfaceProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDictating, setIsDictating] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isVoiceListening, setIsVoiceListening] = useState(false);
    const [isAISpeaking, setIsAISpeaking] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dealState = useSafeDealState();
    const deal = dealState?.deal;
    const { selectedText, selectionSource, clearSelection } = useSelection();

    const { visibleMessages, appendMessage, isLoading } = useCopilotChat({
        initialMessages: [],
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleMessages]);

    // Notify parent component when chat becomes active/inactive
    useEffect(() => {
        if (onChatStateChange) {
            onChatStateChange(isChatActive || visibleMessages.length > 0);
        }
    }, [isChatActive, visibleMessages, onChatStateChange]);

    // Simulate voice activity based on loading state
    useEffect(() => {
        if (isLoading) {
            setIsAISpeaking(true);
        } else {
            const timer = setTimeout(() => setIsAISpeaking(false), 1500); // Keep speaking visualizer briefly after loading
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;

        // Build message content with context if available
        let messageContent = inputValue;

        if (selectedText) {
            // Format context as quoted block (Perplexity-style)
            const quotedContext = `> ${selectedText.replace(/\n/g, '\n> ')}`;
            const sourceInfo = selectionSource ? `\n> *From: ${selectionSource}*` : '';
            messageContent = `${quotedContext}${sourceInfo}\n\n${inputValue}`;
        }

        appendMessage(new TextMessage({
            content: messageContent,
            role: Role.User,
        }));

        setInputValue("");

        // Clear context after sending
        if (selectedText) {
            clearSelection();
        }
    };

    const handleDictate = () => {
        setIsDictating(!isDictating);
        // In a real app, this would trigger browser speech recognition
        if (!isDictating) {
            setTimeout(() => {
                setInputValue("Update the MRR to $50k");
                setIsDictating(false);
            }, 2000);
        }
    };

    const handleVoiceConversation = () => {
        setIsVoiceMode(true);
        setIsVoiceListening(true);
    };

    // File upload handlers
    const handleFileDrop = (files: File[]) => {
        const newFiles: AttachedFile[] = files.map(file => ({
            file,
            id: `${Date.now()}-${Math.random()}`,
            uploadProgress: 0,
            status: 'uploading' as const,
        }));

        setAttachedFiles(prev => [...prev, ...newFiles]);
        setIsDragging(false);

        newFiles.forEach((attachedFile) => {
            simulateUpload(attachedFile.id);
        });
    };

    const simulateUpload = (fileId: string) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setAttachedFiles(prev =>
                prev.map(f =>
                    f.id === fileId
                        ? { ...f, uploadProgress: progress }
                        : f
                )
            );

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setAttachedFiles(prev =>
                        prev.map(f =>
                            f.id === fileId
                                ? { ...f, status: 'parsing' }
                                : f
                        )
                    );

                    setTimeout(() => {
                        setAttachedFiles(prev =>
                            prev.map(f =>
                                f.id === fileId
                                    ? { ...f, status: 'success' }
                                    : f
                            )
                        );

                        const file = attachedFiles.find(f => f.id === fileId);
                        if (file) {
                            appendMessage(new TextMessage({
                                content: `I've analyzed ${file.file.name}. Here's what I found:\n\n📊 **Company**: Acme Corp\n💰 **MRR**: $450K (+15% MoM)\n👥 **Team**: 12 people\n📍 **Location**: San Francisco, CA\n\nShould I create a deal for this company?`,
                                role: Role.Assistant,
                            }));
                        }
                    }, 2000);
                }, 500);
            }
        }, 200);
    };

    const handleRemoveFile = (fileId: string) => {
        setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const handlePaperclipClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            handleFileDrop(files);
        }
        e.target.value = '';
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Helper to check if a message is from the user
    const isUserMessage = (msg: any) => {
        return msg.role === "user" || msg.role === Role.User;
    };

    // Helper to render custom content based on message type or tool calls
    const renderMessageContent = (msg: any) => {
        // 1. Handle Text Content
        const content = msg.content;
        if (typeof content === 'string' && content.trim().length > 0) {
            // Check if message contains quoted context (starts with >)
            const quoteMatch = content.match(/^((?:>.+(?:\n|$))+)\n*([\s\S]*)$/);

            if (quoteMatch && isUserMessage(msg)) {
                const [, quotedText, actualMessage] = quoteMatch;

                return (
                    <div className="space-y-2.5">
                        {/* Quoted Context - styled like Perplexity */}
                        <div className="border-l-2 border-white/40 pl-3 py-2 bg-white/20 rounded-r">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap text-white/90">
                                {quotedText.replace(/^> /gm, '').replace(/^\*/gm, '').replace(/\*$/gm, '')}
                            </p>
                        </div>
                        {/* User's Question */}
                        {actualMessage && <p className="leading-relaxed text-white">{actualMessage}</p>}
                    </div>
                );
            }

            return <p className="leading-relaxed">{content}</p>;
        }

        // 2. Handle UI Component (if provided by CopilotKit)
        if (msg.ui) {
            return msg.ui;
        }

        // 3. Handle Action Execution (Manual Rendering)
        if (msg.type === "ActionExecutionMessage" || msg.name) {
            const args = msg.arguments || {};
            const status = msg.status || "inProgress";
            const result = msg.result;

            switch (msg.name) {
                case "update_deal_metric":
                    return (
                        <MetricUpdateCard
                            metricName={args.metricName}
                            newValue={args.newValue}
                            trend={args.trend}
                            status={status}
                            result={result}
                        />
                    );
                case "update_any_deal_metric":
                    return (
                        <MetricUpdateCard
                            metricName={args.metricName}
                            newValue={args.newValue}
                            trend={args.trend}
                            status={status}
                            result={result}
                        />
                    );
                case "add_note_to_any_deal":
                    return (
                        <NoteAddCard
                            note={args.note}
                            category={args.category}
                            status={status}
                            result={result}
                        />
                    );
                case "update_deal_stage":
                    return (
                        <StageUpdateCard
                            newStage={args.newStage}
                            reason={args.reason}
                            status={status}
                            result={result}
                        />
                    );
                case "add_deal_note":
                    return (
                        <NoteAddCard
                            note={args.note}
                            category={args.category}
                            status={status}
                            result={result}
                        />
                    );
                case "update_fit_score":
                    return (
                        <FitScoreUpdateCard
                            newScore={args.newScore}
                            rationale={args.rationale}
                            status={status}
                            result={result}
                        />
                    );
                case "update_company_info":
                    return (
                        <CompanyUpdateCard
                            companyName={args.companyName}
                            teamSize={args.teamSize}
                            status={status}
                            result={result}
                        />
                    );
                case "show_deal_snapshot":
                    if (!deal) return null;
                    return <DealCard deal={deal} />;
                case "show_metrics":
                    return deal ? <MetricsDisplay metrics={deal.metrics} /> : null;
                case "compare_deals":
                    // Fetch deals by IDs and render comparison
                    const dealIds = args?.dealIds || result?.dealIds;
                    if (!dealIds || dealIds.length === 0) return null;

                    return <DealComparisonWrapper dealIds={dealIds} />;
                case "get_deal_info":
                    // Show deal card for the requested deal
                    const requestedDealId = result?.dealId || args?.dealId;
                    if (!requestedDealId) return null;

                    const requestedDeal = getDealById(requestedDealId);
                    if (!requestedDeal) return null;

                    return <DealCard deal={requestedDeal} />;
                case "show_call_summary":
                    return <CallSummaryCard summary={result.summary} dealId={result.dealId} />;
                case "generate_investment_memo":
                    return (
                        <MemoGenerateCard
                            dealId={args.dealId}
                            status={status}
                            result={result}
                        />
                    );
            }
        }

        // 4. Hide Result Messages (usually redundant if card is shown)
        if (msg.type === "ResultMessage") {
            return null;
        }

        // 5. Fallback for unknown messages (only if they have content)
        if (msg.content) {
            return <p className="leading-relaxed">{msg.content}</p>;
        }

        return null;
    };

    if (layout === "center") {
        const hasChatHistory = visibleMessages.length > 0;

        return (
            <div
                className={cn("flex flex-col h-full max-w-4xl mx-auto px-6 relative", className)}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                {/* File Upload Zone Overlay */}
                <FileUploadZone
                    isActive={isDragging}
                    onDrop={handleFileDrop}
                />

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.pptx,.ppt"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                />

                {/* Chat Messages Area - Flex-1 with scroll */}
                <div className="flex-1 overflow-y-auto py-6">
                    <div className="space-y-4">
                        {visibleMessages.map((msg, index) => {
                            const content = renderMessageContent(msg);
                            if (!content) return null;

                            const isUI = !(msg as any).content && ((msg as any).ui || (msg as any).type === "ActionExecutionMessage" || (msg as any).name);

                            return (
                                <div
                                    key={msg.id || index}
                                    className={cn(
                                        "flex w-full animate-in slide-in-from-bottom-2 duration-300",
                                        isUserMessage(msg) ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {isUI ? (
                                        <div className="w-full max-w-md">
                                            {content}
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "max-w-[75%] rounded-2xl px-5 py-3.5 text-sm shadow-sm relative",
                                            isUserMessage(msg)
                                                ? "bg-indigo-600 text-white rounded-br-md"
                                                : "bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-md"
                                        )}>
                                            {content}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-md flex items-center space-x-1.5">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer - Fixed at bottom with suggestions + input */}
                <div className="flex-shrink-0 pb-6 space-y-3">
                    {/* Context Card */}
                    {selectedText && (
                        <ContextCard
                            text={selectedText}
                            source={selectionSource || undefined}
                            onClose={clearSelection}
                        />
                    )}

                    {/* Attached Files Preview */}
                    {attachedFiles.length > 0 && (
                        <div className="space-y-2">
                            {attachedFiles.map((attachedFile) => (
                                <FilePreviewCard
                                    key={attachedFile.id}
                                    file={attachedFile.file}
                                    uploadProgress={attachedFile.uploadProgress}
                                    status={attachedFile.status}
                                    onRemove={() => handleRemoveFile(attachedFile.id)}
                                    errorMessage={attachedFile.errorMessage}
                                />
                            ))}
                        </div>
                    )}

                    {/* Quick Action Suggestions - Hidden when chat is active */}
                    <div className={cn(
                        "flex justify-center gap-3 transition-all duration-500 ease-in-out",
                        hasChatHistory ? "mb-0 h-0 opacity-0 overflow-hidden" : "mb-4 opacity-100"
                    )}>
                        {["Summarize recent deals", "Draft an investment memo", "Check market trends"].map((action) => (
                            <button
                                key={action}
                                onClick={() => setInputValue(action)}
                                className="text-sm text-slate-500 bg-white/50 hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-full border border-slate-200/50 hover:border-indigo-100 transition-all shadow-sm"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar - Always visible at bottom */}
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all p-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-indigo-600 ml-1"
                            onClick={handlePaperclipClick}
                        >
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            onFocus={() => setIsChatActive(true)}
                            placeholder="Ask anything about your deals..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-lg text-slate-900 placeholder:text-slate-400 py-3 px-2"
                            disabled={isLoading || isDictating}
                        />
                        <div className="flex items-center pr-1 space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "text-slate-400 hover:text-indigo-600 transition-colors",
                                    isDictating && "text-red-500 bg-red-50 animate-pulse"
                                )}
                                onClick={handleDictate}
                            >
                                <Mic className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={handleSubmit}
                                disabled={isLoading || isDictating || !inputValue.trim()}
                                className={cn(
                                    "h-10 w-10 rounded-xl transition-all shadow-sm",
                                    inputValue.trim() ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-100 text-slate-300"
                                )}
                            >
                                {isLoading ? (
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <ArrowUp className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === "floating" && !isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:scale-105 z-50"
            >
                <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20" />
                <div className="relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute -top-1 -right-1" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </div>
            </Button>
        );
    }

    return (
        <aside
            className={cn(
                "bg-white shadow-2xl transition-all duration-500 ease-in-out flex flex-col overflow-hidden border border-slate-200/60 backdrop-blur-xl relative",
                // Only apply fixed positioning if NOT provided in className (or if layout implies it and className doesn't override)
                // Actually, let's make it fixed by default for floating/sidebar unless overridden
                !className && "fixed z-40",
                !className && layout === "floating" && "bottom-6 right-6 rounded-2xl",
                !className && layout === "sidebar" && "top-0 right-0 h-screen border-l",

                isExpanded ? "w-[600px] h-[80vh]" : "w-[400px]",
                layout === "sidebar" ? "h-screen" : "h-[600px]",
                isVoiceMode && "bg-gradient-to-b from-indigo-50/50 to-white",
                className // Allow overriding everything
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
            {/* File Upload Zone Overlay */}
            <FileUploadZone
                isActive={isDragging}
                onDrop={handleFileDrop}
            />

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.pptx,.ppt"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
            />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                            AI
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-sm">AI Associate</h3>
                        <p className="text-xs text-slate-500 flex items-center">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    {isVoiceMode && (
                        <Button variant="ghost" size="icon" onClick={() => setIsVoiceMode(false)} className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    {layout === "floating" && (
                        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden relative group flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent opacity-50 pointer-events-none" />

                <ScrollArea className="h-full p-4" ref={scrollRef}>
                    <div className="space-y-6 pb-4">
                        {visibleMessages.map((msg, index) => {
                            const content = renderMessageContent(msg);
                            if (!content) return null;

                            const isUI = !(msg as any).content && ((msg as any).ui || (msg as any).type === "ActionExecutionMessage" || (msg as any).name);

                            return (
                                <div
                                    key={msg.id || index}
                                    className={cn(
                                        "flex w-full animate-in slide-in-from-bottom-2 duration-300",
                                        isUserMessage(msg) ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {isUI ? (
                                        <div className="w-full max-w-[85%]">
                                            {content}
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative group/msg transition-all hover:shadow-md",
                                            isUserMessage(msg)
                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                : "bg-white border border-slate-100 text-slate-700 rounded-bl-none"
                                        )}>
                                            {content}

                                            <span className={cn(
                                                "text-[10px] absolute -bottom-5 opacity-0 group-hover/msg:opacity-100 transition-opacity",
                                                isUserMessage(msg) ? "right-0 text-slate-400" : "left-0 text-slate-400"
                                            )}>
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
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

            {/* Input Area / Voice Mode Area */}
            <div className={cn(
                "bg-white border-t border-slate-100 flex-shrink-0 transition-all duration-300",
                isVoiceMode ? "p-8" : "p-4"
            )}>
                {!isVoiceMode ? (
                    // Normal Input Mode
                    <div className="space-y-3">
                        {/* Context Card */}
                        {selectedText && (
                            <ContextCard
                                text={selectedText}
                                source={selectionSource || undefined}
                                onClose={clearSelection}
                            />
                        )}

                        {/* Attached Files Preview */}
                        {attachedFiles.length > 0 && (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {attachedFiles.map((attachedFile) => (
                                    <FilePreviewCard
                                        key={attachedFile.id}
                                        file={attachedFile.file}
                                        uploadProgress={attachedFile.uploadProgress}
                                        status={attachedFile.status}
                                        onRemove={() => handleRemoveFile(attachedFile.id)}
                                        errorMessage={attachedFile.errorMessage}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-indigo-600 ml-1 flex-shrink-0"
                            onClick={handlePaperclipClick}
                        >
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <input
                            type="text"
                            value={isDictating ? "Listening..." : inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            placeholder="Ask anything..."
                            className={cn(
                                "flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 py-3 px-2",
                                isDictating && "text-indigo-600 font-medium"
                            )}
                            disabled={isDictating || isLoading}
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
                                    disabled={isDictating || isLoading}
                                    className="h-8 w-8 rounded-xl transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                    title="Voice Conversation"
                                >
                                    <Headphones className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    size="icon"
                                    onClick={handleSubmit}
                                    disabled={isLoading || isDictating}
                                    className="h-8 w-8 rounded-xl transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                    title="Send"
                                >
                                    {isLoading ? (
                                        <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <ArrowUp className="h-4 w-4" />
                                    )}
                                </Button>
                            )}
                        </div>
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
        </aside>
    );
}
