export interface Conversation {
  id: string;
  title: string;
  preview: string; // First few words of conversation
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  messages: ConversationMessage[];
  dealId?: string; // Optional link to a specific deal
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type ConversationGroup = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'older';

export interface GroupedConversations {
  today: Conversation[];
  yesterday: Conversation[];
  last7days: Conversation[];
  last30days: Conversation[];
  older: Conversation[];
  pinned: Conversation[];
}
