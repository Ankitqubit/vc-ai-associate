"use client";

import { useState } from "react";
import { MessageSquare, Plus, Search, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Conversation {
    id: string;
    title: string;
    preview: string;
    timestamp: Date;
}

interface ConversationHistoryProps {
    conversations: Conversation[];
    activeConversationId?: string;
    onSelectConversation: (id: string) => void;
    onNewConversation: () => void;
    onDeleteConversation?: (id: string) => void;
    onRenameConversation?: (id: string, newTitle: string) => void;
    className?: string;
}

export function ConversationHistory({
    conversations,
    activeConversationId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation,
    onRenameConversation,
    className
}: ConversationHistoryProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filteredConversations = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = diff / (1000 * 60 * 60);
        const days = diff / (1000 * 60 * 60 * 24);

        if (hours < 1) return "Just now";
        if (hours < 24) return `${Math.floor(hours)}h ago`;
        if (days < 7) return `${Math.floor(days)}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className={cn("w-64 bg-white border-r border-slate-200 flex flex-col h-full", className)}>
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <Button
                    onClick={onNewConversation}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                </Button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-slate-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            {searchQuery ? "No conversations found" : "No conversations yet"}
                        </div>
                    ) : (
                        filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={cn(
                                    "group relative p-3 rounded-lg cursor-pointer transition-all",
                                    activeConversationId === conv.id
                                        ? "bg-indigo-50 border border-indigo-100"
                                        : "hover:bg-slate-50 border border-transparent"
                                )}
                                onClick={() => onSelectConversation(conv.id)}
                                onMouseEnter={() => setHoveredId(conv.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="flex items-start gap-2">
                                    <MessageSquare className={cn(
                                        "h-4 w-4 mt-0.5 flex-shrink-0",
                                        activeConversationId === conv.id ? "text-indigo-600" : "text-slate-400"
                                    )} />
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn(
                                            "text-sm font-medium truncate",
                                            activeConversationId === conv.id ? "text-indigo-900" : "text-slate-900"
                                        )}>
                                            {conv.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 truncate mt-0.5">
                                            {conv.preview}
                                        </p>
                                        <span className="text-xs text-slate-400 mt-1 block">
                                            {formatTimestamp(conv.timestamp)}
                                        </span>
                                    </div>

                                    {/* Action Menu */}
                                    {hoveredId === conv.id && onDeleteConversation && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteConversation(conv.id);
                                            }}
                                        >
                                            <Trash2 className="h-3 w-3 text-slate-400 hover:text-red-600" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
