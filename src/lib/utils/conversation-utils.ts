import { Conversation, ConversationGroup, GroupedConversations } from '../types/conversation';

/**
 * Group conversations by time periods
 */
export function groupConversationsByTime(conversations: Conversation[]): GroupedConversations {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const last7days = new Date(today);
  last7days.setDate(last7days.getDate() - 7);
  const last30days = new Date(today);
  last30days.setDate(last30days.getDate() - 30);

  const grouped: GroupedConversations = {
    today: [],
    yesterday: [],
    last7days: [],
    last30days: [],
    older: [],
    pinned: []
  };

  // First separate pinned conversations
  const pinned = conversations.filter(c => c.isPinned);
  const unpinned = conversations.filter(c => !c.isPinned);

  grouped.pinned = pinned;

  // Group unpinned by time
  unpinned.forEach(conv => {
    const convDate = new Date(conv.updatedAt);

    if (convDate >= today) {
      grouped.today.push(conv);
    } else if (convDate >= yesterday) {
      grouped.yesterday.push(conv);
    } else if (convDate >= last7days) {
      grouped.last7days.push(conv);
    } else if (convDate >= last30days) {
      grouped.last30days.push(conv);
    } else {
      grouped.older.push(conv);
    }
  });

  return grouped;
}

/**
 * Format timestamp for display
 */
export function formatConversationTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Generate conversation title from first message
 */
export function generateConversationTitle(firstMessage: string): string {
  const maxLength = 50;
  const cleaned = firstMessage.trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return cleaned.substring(0, maxLength).trim() + '...';
}

/**
 * Generate conversation preview from messages
 */
export function generateConversationPreview(firstMessage: string): string {
  const maxLength = 60;
  const cleaned = firstMessage.trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return cleaned.substring(0, maxLength).trim() + '...';
}

/**
 * Filter conversations by search query
 */
export function filterConversations(conversations: Conversation[], query: string): Conversation[] {
  if (!query.trim()) return conversations;

  const lowerQuery = query.toLowerCase();

  return conversations.filter(conv =>
    conv.title.toLowerCase().includes(lowerQuery) ||
    conv.preview.toLowerCase().includes(lowerQuery) ||
    conv.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Sort conversations by updated date (most recent first)
 */
export function sortConversations(conversations: Conversation[]): Conversation[] {
  return [...conversations].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}
