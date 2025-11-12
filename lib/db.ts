// Simple in-memory database for development
// TODO: Migrate to PostgreSQL/Supabase for production

export interface Message {
  id: string;
  sessionId: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  agentName?: string;
  agentId?: string;
  mediaUrl?: string;
}

export interface ChatSession {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  userEmail?: string;
  userName?: string;
  isActive: boolean;
  assignedAgent?: string;
  source?: 'web' | 'telegram' | 'whatsapp';
  telegramChatId?: string;
  telegramUserId?: string;
  whatsappNumber?: string;
  telegramTopicId?: number; // For Telegram Topics (Forum groups)
}

// In-memory storage (will be replaced with database)
class ChatDatabase {
  private messages: Map<string, Message[]> = new Map();
  private sessions: Map<string, ChatSession> = new Map();
  private teamOnline: Set<string> = new Set();

  // Messages
  addMessage(message: Message): Message {
    const sessionMessages = this.messages.get(message.sessionId) || [];
    sessionMessages.push(message);
    this.messages.set(message.sessionId, sessionMessages);

    // Update session last message time
    const session = this.sessions.get(message.sessionId);
    if (session) {
      session.lastMessageAt = message.timestamp;
    }

    return message;
  }

  getMessages(sessionId: string): Message[] {
    return this.messages.get(sessionId) || [];
  }

  // Sessions
  createSession(session: ChatSession): ChatSession {
    this.sessions.set(session.id, session);
    this.messages.set(session.id, []);
    return session;
  }

  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.get(sessionId);
  }

  getAllActiveSessions(): ChatSession[] {
    return Array.from(this.sessions.values()).filter(s => s.isActive);
  }

  updateSession(sessionId: string, updates: Partial<ChatSession>): ChatSession | undefined {
    const session = this.sessions.get(sessionId);
    if (session) {
      const updated = { ...session, ...updates };
      this.sessions.set(sessionId, updated);
      return updated;
    }
    return undefined;
  }

  // Team online status
  setTeamOnline(agentId: string): void {
    this.teamOnline.add(agentId);
  }

  setTeamOffline(agentId: string): void {
    this.teamOnline.delete(agentId);
  }

  isAnyTeamOnline(): boolean {
    return this.teamOnline.size > 0;
  }

  getOnlineTeam(): string[] {
    return Array.from(this.teamOnline);
  }

  // Telegram-specific methods
  getSessionByTelegramId(telegramChatId: string): ChatSession | undefined {
    return Array.from(this.sessions.values()).find(
      s => s.telegramChatId === telegramChatId
    );
  }

  getSessionByPhone(phoneNumber: string): ChatSession | undefined {
    return Array.from(this.sessions.values()).find(
      s => s.whatsappNumber === phoneNumber
    );
  }

  getSessionByTelegramTopic(topicId: number): ChatSession | undefined {
    return Array.from(this.sessions.values()).find(
      s => s.telegramTopicId === topicId
    );
  }

  // Mark session as read (for unread badge tracking)
  markSessionAsRead(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      // In production, this would update a "lastReadAt" timestamp in the database
      // For now, we'll just update the session's last interaction time
      console.log(`[DB] Marked session ${sessionId} as read`);
    }
  }
}

// Singleton instance that persists across hot-reloads
// This is critical for development with Turbopack/Fast Refresh
// Without this, hot-reloads will wipe the in-memory database
declare global {
  var chatDatabase: ChatDatabase | undefined;
}

if (!global.chatDatabase) {
  global.chatDatabase = new ChatDatabase();
  console.log('[DB] Created new ChatDatabase instance');
}

export const db = global.chatDatabase;
