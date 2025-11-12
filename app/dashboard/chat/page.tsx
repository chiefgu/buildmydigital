'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Pusher from 'pusher-js';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  agentName?: string;
}

interface Session {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  userEmail?: string;
  userName?: string;
  isActive: boolean;
  messages: Message[];
  unreadCount?: number;
  source?: 'web' | 'telegram' | 'whatsapp';
}

export default function ChatDashboard() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [agentId] = useState(() => `agent-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<Pusher | null>(null);

  // Set agent name from session
  useEffect(() => {
    if (session?.user?.name && !agentName) {
      setAgentName(session.user.name);
    }
  }, [session, agentName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedSession?.messages]);

  // Load sessions
  const loadSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize
  useEffect(() => {
    loadSessions();

    // Set up Pusher for real-time updates
    if (process.env.NEXT_PUBLIC_PUSHER_KEY) {
      pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
      });

      const channel = pusherRef.current.subscribe('team-dashboard');

      channel.bind('new-user-message', (data: any) => {
        // Reload sessions when new message arrives
        loadSessions();
      });
    }

    // Poll for updates every 10 seconds
    const interval = setInterval(loadSessions, 10000);

    return () => {
      clearInterval(interval);
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  // Subscribe to selected session's channel
  useEffect(() => {
    if (!selectedSession || !process.env.NEXT_PUBLIC_PUSHER_KEY || !pusherRef.current) return;

    const channel = pusherRef.current.subscribe(`chat-${selectedSession.id}`);

    channel.bind('new-message', (message: Message) => {
      setSelectedSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, { ...message, timestamp: new Date(message.timestamp) }]
        };
      });
      loadSessions(); // Refresh sessions list
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [selectedSession?.id]);

  // Update online status
  const toggleOnlineStatus = async () => {
    try {
      const response = await fetch('/api/chat/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          status: isOnline ? 'offline' : 'online',
        }),
      });

      if (response.ok) {
        setIsOnline(!isOnline);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Send message
  const handleSend = async () => {
    if (!inputText.trim() || !selectedSession) return;

    try {
      const response = await fetch('/api/chat/team-respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          sessionId: selectedSession.id,
          agentName,
          agentId,
        }),
      });

      if (response.ok) {
        setInputText('');
        const data = await response.json();

        // Only update locally if Pusher is not configured
        // Otherwise, Pusher will handle the message update via the subscription
        if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
          setSelectedSession(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              messages: [...prev.messages, { ...data.message, timestamp: new Date(data.message.timestamp) }]
            };
          });
        }

        loadSessions();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Chat Dashboard</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
              {sessions.length} active {sessions.length === 1 ? 'conversation' : 'conversations'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Logged in user */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session?.user?.name || agentName}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>

            {/* Online/Offline Toggle */}
            <button
              onClick={toggleOnlineStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isOnline
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              {isOnline ? 'Online' : 'Offline'}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
              className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p>No active conversations yet</p>
                  <p className="text-sm mt-2">Chats will appear here when users message you</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sessions.map((session) => {
                    const lastMessage = session.messages[session.messages.length - 1];
                    return (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedSession?.id === session.id ? 'bg-orange-50 border-l-4 border-[#EF8354]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {session.userName || 'Anonymous User'}
                            </span>
                            {session.source === 'telegram' && (
                              <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium" title="Telegram">
                                📱
                              </span>
                            )}
                            {session.source === 'web' && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-medium" title="Website">
                                🌐
                              </span>
                            )}
                          </div>
                          {session.unreadCount && session.unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[#EF8354] text-white text-xs font-medium">
                              {session.unreadCount}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <p className="text-sm text-gray-600 truncate">
                            {lastMessage.sender === 'user' ? '💬 ' : '👤 '}
                            {lastMessage.text}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(session.lastMessageAt).toLocaleString()}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    {selectedSession.userName || 'Anonymous User'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Started {new Date(selectedSession.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedSession.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[70%]`}>
                        {message.sender !== 'user' && (
                          <div className="text-xs text-gray-500 mb-1 px-1">{message.agentName}</div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            message.sender === 'user'
                              ? 'bg-gray-100 text-gray-900 rounded-tl-md'
                              : message.sender === 'ai'
                              ? 'bg-purple-100 text-purple-900 rounded-tr-md'
                              : 'bg-[#EF8354] text-white rounded-tr-md'
                          }`}
                        >
                          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 px-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF8354] focus:ring-2 focus:ring-[#EF8354]/20 outline-none transition-all duration-200 bg-white"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputText.trim()}
                      className="px-6 py-3 rounded-xl bg-[#EF8354] text-white hover:bg-[#d97446] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm mt-2">Choose a conversation from the left to start responding</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
