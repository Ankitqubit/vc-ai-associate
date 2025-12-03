"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamMember } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AtSign, Send } from 'lucide-react';

interface CommentInputProps {
  placeholder?: string;
  onSubmit: (content: string, mentions: Array<{ userId: string; userName: string; position: number }>) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  teamMembers: TeamMember[];
  className?: string;
}

interface MentionSuggestion {
  member: TeamMember;
  index: number;
}

export function CommentInput({
  placeholder = 'Add a comment...',
  onSubmit,
  onCancel,
  autoFocus = false,
  teamMembers,
  className,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionPosition, setMentionPosition] = useState(0);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [mentions, setMentions] = useState<Array<{ userId: string; userName: string; position: number }>>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionListRef = useRef<HTMLDivElement>(null);

  // Filter team members based on search
  const filteredMembers = mentionSearch
    ? teamMembers.filter((member) =>
        member.name.toLowerCase().includes(mentionSearch.toLowerCase()) ||
        member.email.toLowerCase().includes(mentionSearch.toLowerCase())
      )
    : teamMembers;

  // Handle @mention detection
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = content.substring(0, cursorPos);
    const lastAtSymbol = textBeforeCursor.lastIndexOf('@');

    if (lastAtSymbol !== -1 && lastAtSymbol === cursorPos - 1) {
      // Just typed @
      setShowMentions(true);
      setMentionSearch('');
      setMentionPosition(lastAtSymbol);
      setSelectedMentionIndex(0);
    } else if (lastAtSymbol !== -1) {
      // Typing after @
      const searchText = textBeforeCursor.substring(lastAtSymbol + 1);
      const hasSpace = searchText.includes(' ') || searchText.includes('\n');

      if (!hasSpace && cursorPos === textBeforeCursor.length) {
        setShowMentions(true);
        setMentionSearch(searchText);
        setMentionPosition(lastAtSymbol);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  }, [content]);

  // Handle keyboard navigation in mention list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showMentions) {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedMentionIndex((prev) =>
          prev < filteredMembers.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        if (filteredMembers[selectedMentionIndex]) {
          insertMention(filteredMembers[selectedMentionIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowMentions(false);
        break;
    }
  };

  // Insert @mention into text
  const insertMention = (member: TeamMember) => {
    const beforeMention = content.substring(0, mentionPosition);
    const afterMention = content.substring(textareaRef.current?.selectionStart || content.length);
    const mentionText = `@${member.name} `;
    const newContent = beforeMention + mentionText + afterMention;

    // Track the mention
    setMentions((prev) => [
      ...prev,
      {
        userId: member.id,
        userName: member.name,
        position: mentionPosition,
      },
    ]);

    setContent(newContent);
    setShowMentions(false);
    setMentionSearch('');

    // Focus back on textarea and move cursor after mention
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = mentionPosition + mentionText.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content, mentions);
    setContent('');
    setMentions([]);
  };

  const handleCancel = () => {
    setContent('');
    setMentions([]);
    onCancel?.();
  };

  return (
    <div className={cn('relative', className)}>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="min-h-[80px] resize-none pr-10"
        rows={3}
      />

      {/* @Mention Suggestions Dropdown */}
      {showMentions && filteredMembers.length > 0 && (
        <div
          ref={mentionListRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg max-h-[200px] overflow-y-auto"
        >
          {filteredMembers.map((member, index) => (
            <button
              key={member.id}
              onClick={() => insertMention(member)}
              className={cn(
                'w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left',
                index === selectedMentionIndex && 'bg-slate-100 dark:bg-slate-800'
              )}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{member.name}</div>
                <div className="text-xs text-muted-foreground truncate">{member.email}</div>
              </div>
              <div className="text-xs text-muted-foreground capitalize">{member.role}</div>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <AtSign className="h-3 w-3" />
          Type @ to mention team members
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="gap-1"
          >
            <Send className="h-3 w-3" />
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
