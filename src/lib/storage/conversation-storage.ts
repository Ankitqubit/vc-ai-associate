import { Conversation, ConversationMessage } from '../types/conversation';
import { generateConversationTitle, generateConversationPreview } from '../utils/conversation-utils';

const STORAGE_KEY = 'vc-ai-conversations';

/**
 * Get all conversations from localStorage
 */
export function getAllConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const conversations = JSON.parse(stored);

    // Convert date strings back to Date objects
    return conversations.map((conv: any) => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      updatedAt: new Date(conv.updatedAt),
      messages: conv.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return [];
  }
}

/**
 * Save all conversations to localStorage
 */
export function saveAllConversations(conversations: Conversation[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Failed to save conversations:', error);
  }
}

/**
 * Create a new conversation
 */
export function createConversation(firstMessage?: string, dealId?: string): Conversation {
  const now = new Date();

  const conversation: Conversation = {
    id: `conv-${Date.now()}`,
    title: firstMessage ? generateConversationTitle(firstMessage) : 'New conversation',
    preview: firstMessage ? generateConversationPreview(firstMessage) : '',
    createdAt: now,
    updatedAt: now,
    isPinned: false,
    messages: [],
    dealId
  };

  // If there's a first message, add it
  if (firstMessage) {
    conversation.messages.push({
      id: `msg-${Date.now()}`,
      role: 'user',
      content: firstMessage,
      timestamp: now
    });
  }

  const conversations = getAllConversations();
  conversations.unshift(conversation);
  saveAllConversations(conversations);

  return conversation;
}

/**
 * Get a conversation by ID
 */
export function getConversationById(id: string): Conversation | null {
  const conversations = getAllConversations();
  return conversations.find(c => c.id === id) || null;
}

/**
 * Update a conversation
 */
export function updateConversation(id: string, updates: Partial<Conversation>): void {
  const conversations = getAllConversations();
  const index = conversations.findIndex(c => c.id === id);

  if (index === -1) return;

  conversations[index] = {
    ...conversations[index],
    ...updates,
    updatedAt: new Date()
  };

  saveAllConversations(conversations);
}

/**
 * Add a message to a conversation
 */
export function addMessageToConversation(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string
): void {
  const conversations = getAllConversations();
  const conversation = conversations.find(c => c.id === conversationId);

  if (!conversation) return;

  const message: ConversationMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role,
    content,
    timestamp: new Date()
  };

  conversation.messages.push(message);
  conversation.updatedAt = new Date();

  // Update title and preview if this is the first user message
  if (conversation.messages.length === 1 && role === 'user') {
    conversation.title = generateConversationTitle(content);
    conversation.preview = generateConversationPreview(content);
  }

  saveAllConversations(conversations);
}

/**
 * Delete a conversation
 */
export function deleteConversation(id: string): void {
  const conversations = getAllConversations();
  const filtered = conversations.filter(c => c.id !== id);
  saveAllConversations(filtered);
}

/**
 * Rename a conversation
 */
export function renameConversation(id: string, newTitle: string): void {
  updateConversation(id, { title: newTitle });
}

/**
 * Toggle pin status
 */
export function togglePinConversation(id: string): void {
  const conversation = getConversationById(id);
  if (!conversation) return;

  updateConversation(id, { isPinned: !conversation.isPinned });
}

/**
 * Clear all conversations
 */
export function clearAllConversations(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
