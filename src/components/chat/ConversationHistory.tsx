"use client";

import { useState } from "react";
import { MessageSquare, Plus, Search, MoreVertical, Trash2, Edit2, Pin, PinOff, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation } from "@/lib/types/conversation";
import {
  groupConversationsByTime,
  formatConversationTime,
  filterConversations
} from "@/lib/utils/conversation-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationHistoryProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (id: string) => void;
  onRenameConversation?: (id: string, newTitle: string) => void;
  onTogglePin?: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function ConversationHistory({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onTogglePin,
  isCollapsed = false,
  onToggleCollapse,
  className
}: ConversationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Filter conversations
  const filteredConversations = filterConversations(conversations, searchQuery);

  // Group filtered conversations
  const grouped = groupConversationsByTime(filteredConversations);

  const handleRename = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim() && onRenameConversation) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // Render a conversation item
  const renderConversationItem = (conv: Conversation) => {
    const isActive = activeConversationId === conv.id;
    const isEditing = editingId === conv.id;

    return (
      <div
        key={conv.id}
        className={cn(
          "group relative rounded-lg cursor-pointer transition-all mb-1",
          isActive
            ? "bg-indigo-50 border border-indigo-200"
            : "hover:bg-slate-50 border border-transparent"
        )}
        onClick={() => !isEditing && onSelectConversation(conv.id)}
      >
        <div className="flex items-start gap-2 p-2.5">
          <MessageSquare className={cn(
            "h-4 w-4 mt-0.5 flex-shrink-0",
            isActive ? "text-indigo-600" : "text-slate-400"
          )} />

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleSaveRename(conv.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename(conv.id);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="w-full text-sm font-medium px-1 py-0.5 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <div className="flex items-center gap-1">
                  {conv.isPinned && (
                    <Pin className="h-3 w-3 text-indigo-500 flex-shrink-0" />
                  )}
                  <h4 className={cn(
                    "text-sm font-medium truncate flex-1",
                    isActive ? "text-indigo-900" : "text-slate-900"
                  )}>
                    {conv.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {conv.preview}
                </p>
                <span className="text-xs text-slate-400 mt-1 block">
                  {formatConversationTime(conv.updatedAt)}
                </span>
              </>
            )}
          </div>

          {/* Action Menu */}
          {!isEditing && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-3.5 w-3.5 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {onRenameConversation && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(conv.id, conv.title);
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-2" />
                    Rename
                  </DropdownMenuItem>
                )}
                {onTogglePin && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin(conv.id);
                    }}
                  >
                    {conv.isPinned ? (
                      <>
                        <PinOff className="h-3.5 w-3.5 mr-2" />
                        Unpin
                      </>
                    ) : (
                      <>
                        <Pin className="h-3.5 w-3.5 mr-2" />
                        Pin
                      </>
                    )}
                  </DropdownMenuItem>
                )}
                {onDeleteConversation && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    );
  };

  // Render a group section
  const renderGroup = (title: string, items: Conversation[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-2 mb-2">
          {title}
        </h3>
        <div>
          {items.map(renderConversationItem)}
        </div>
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <div className={cn("w-16 bg-white border-r border-slate-200 flex flex-col h-full items-center", className)}>
        <div className="p-3 border-b border-slate-200">
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
        <div className="p-3">
          <Button
            onClick={onNewConversation}
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-72 bg-white border-r border-slate-200 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onToggleCollapse && (
              <Button
                onClick={onToggleCollapse}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Menu className="h-4 w-4 text-slate-600" />
              </Button>
            )}
            <h2 className="text-sm font-semibold text-slate-900">Conversations</h2>
          </div>
        </div>
        <Button
          onClick={onNewConversation}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          New conversation
        </Button>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-3 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50"
          />
          {searchQuery && (
            <Button
              onClick={() => setSearchQuery("")}
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500 font-medium mb-1">
                {searchQuery ? "No conversations found" : "No conversations yet"}
              </p>
              <p className="text-xs text-slate-400">
                {searchQuery ? "Try a different search term" : "Start a new conversation to get started"}
              </p>
            </div>
          ) : (
            <>
              {renderGroup("Pinned", grouped.pinned)}
              {renderGroup("Today", grouped.today)}
              {renderGroup("Yesterday", grouped.yesterday)}
              {renderGroup("Last 7 days", grouped.last7days)}
              {renderGroup("Last 30 days", grouped.last30days)}
              {renderGroup("Older", grouped.older)}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
