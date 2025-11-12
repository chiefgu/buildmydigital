'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pusher from 'pusher-js';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: string;
  agentName?: string;
}

interface ChatSession {
  id: string;
  userName?: string;
  userEmail?: string;
  startedAt: string;
  lastMessageAt: string;
  messages: Message[];
  unreadCount: number;
  sessionAnalytics?: {
    totalTimeOnSite?: number;
    pagesVisited?: number;
    referrer?: string;
    intentScore?: number;
  };
}

export default function AdminChatInterface() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agentTyping, setAgentTyping] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<Pusher | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedSession?.messages]);

  // Fetch sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions');
      if (!response.ok) return;

      const data = await response.json();
      setSessions(data.sessions || []);

      // Update selected session if it exists
      if (selectedSession) {
        const updatedSession = data.sessions.find((s: ChatSession) => s.id === selectedSession.id);
        if (updatedSession) {
          setSelectedSession(updatedSession);

          // Mark messages as read for this session
          if (updatedSession.unreadCount > 0) {
            fetch('/api/chat/mark-read', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId: updatedSession.id }),
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Pusher for real-time updates
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
      console.warn('[Admin Chat] Pusher not configured, using polling fallback');
      // Fallback to polling
      const interval = setInterval(fetchSessions, 3000);
      return () => clearInterval(interval);
    }

    // Initialize Pusher
    pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
    });

    // Subscribe to admin updates channel
    const adminChannel = pusherRef.current.subscribe('admin-chat-updates');

    // Listen for new sessions
    adminChannel.bind('new-session', () => {
      console.log('[Admin Chat] New session detected');
      fetchSessions();
    });

    // Listen for new messages in any session
    adminChannel.bind('new-message', (data: { sessionId: string }) => {
      console.log('[Admin Chat] New message in session:', data.sessionId);
      fetchSessions();
    });

    // Listen for typing indicators
    adminChannel.bind('user-typing', (data: { sessionId: string, isTyping: boolean }) => {
      if (selectedSession?.id === data.sessionId) {
        setAgentTyping(data.isTyping);
      }
    });

    return () => {
      adminChannel.unbind_all();
      adminChannel.unsubscribe();
      pusherRef.current?.disconnect();
    };
  }, [selectedSession?.id]);

  // Initial load
  useEffect(() => {
    fetchSessions();
  }, []);

  const handleSendReply = async () => {
    if (!selectedSession || !replyText.trim()) return;

    setSending(true);
    try {
      const response = await fetch('/api/chat/team-respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          text: replyText,
          agentName: 'Support Team',
        }),
      });

      if (response.ok) {
        setReplyText('');
        fetchSessions(); // Refresh to get the new message
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedSession || !e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 10MB.');
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sessionId', selectedSession.id);

      const response = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();

      // Send message with file URL
      await fetch('/api/chat/team-respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          text: `📎 ${file.name}`,
          agentName: 'Support Team',
          mediaUrl: data.url,
        }),
      });

      // Refresh sessions
      fetchSessions();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!selectedSession) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send typing indicator
    fetch('/api/chat/typing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: selectedSession.id,
        isTyping: true,
      }),
    });

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      fetch('/api/chat/typing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          isTyping: false,
        }),
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
          <span className="text-sm text-gray-600">Loading chats...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-[600px] flex">
      {/* Sessions List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">Live Chats</h3>
          <p className="text-xs text-gray-600 mt-1">{sessions.length} active {sessions.length === 1 ? 'session' : 'sessions'}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">No active chats</p>
              <p className="text-xs text-gray-500 mt-1">New chats will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    setSelectedSession(session);
                    // Mark as read
                    if (session.unreadCount > 0) {
                      fetch('/api/chat/mark-read', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId: session.id }),
                      });
                    }
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedSession?.id === session.id ? 'bg-[#F0F1FF] border-l-2 border-[#6366F1]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {session.userName || 'Anonymous User'}
                      </p>
                      {session.userEmail && (
                        <p className="text-xs text-gray-500 truncate">{session.userEmail}</p>
                      )}
                    </div>
                    {session.unreadCount > 0 && (
                      <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#6366F1] text-white text-xs font-semibold rounded-full animate-pulse">
                        {session.unreadCount > 99 ? '99+' : session.unreadCount}
                      </span>
                    )}
                  </div>

                  {session.messages.length > 0 && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {session.messages[session.messages.length - 1].text}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    {new Date(session.lastMessageAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  {/* Session Analytics */}
                  {session.sessionAnalytics && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {session.sessionAnalytics.intentScore && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                          Intent: {session.sessionAnalytics.intentScore}
                        </span>
                      )}
                      {session.sessionAnalytics.pagesVisited && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {session.sessionAnalytics.pagesVisited} pages
                        </span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header with Analytics */}
            <div className="border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {selectedSession.userName || 'Anonymous User'}
                    </h3>
                    {selectedSession.userEmail && (
                      <p className="text-xs text-gray-600 mt-1">{selectedSession.userEmail}</p>
                    )}
                  </div>
                  {selectedSession.sessionAnalytics?.intentScore && (
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      selectedSession.sessionAnalytics.intentScore >= 70 ? 'bg-red-100 text-red-800' :
                      selectedSession.sessionAnalytics.intentScore >= 50 ? 'bg-orange-100 text-orange-800' :
                      selectedSession.sessionAnalytics.intentScore >= 30 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      🔥 Intent: {selectedSession.sessionAnalytics.intentScore}/100
                    </div>
                  )}
                </div>
              </div>

              {/* Visitor Analytics Summary */}
              {selectedSession.sessionAnalytics && (
                <div className="px-4 pb-4">
                  <details className="group">
                    <summary className="cursor-pointer text-xs font-semibold text-gray-700 hover:text-[#6366F1] transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Visitor Analytics Summary
                    </summary>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {selectedSession.sessionAnalytics.pagesVisited !== undefined && (
                        <div className="bg-white rounded-lg p-2 border border-gray-200">
                          <div className="text-gray-500 text-[10px] uppercase font-semibold">Pages Visited</div>
                          <div className="text-gray-900 font-bold">{selectedSession.sessionAnalytics.pagesVisited}</div>
                        </div>
                      )}
                      {selectedSession.sessionAnalytics.totalTimeOnSite !== undefined && (
                        <div className="bg-white rounded-lg p-2 border border-gray-200">
                          <div className="text-gray-500 text-[10px] uppercase font-semibold">Time on Site</div>
                          <div className="text-gray-900 font-bold">{Math.floor(selectedSession.sessionAnalytics.totalTimeOnSite / 1000)}s</div>
                        </div>
                      )}
                      {selectedSession.sessionAnalytics.referrer && (
                        <div className="bg-white rounded-lg p-2 border border-gray-200 col-span-2">
                          <div className="text-gray-500 text-[10px] uppercase font-semibold">Referrer</div>
                          <div className="text-gray-900 font-medium text-[11px] truncate">{selectedSession.sessionAnalytics.referrer}</div>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedSession.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    {message.sender !== 'user' && (
                      <div className="text-xs font-medium text-gray-600 mb-1 text-right">
                        {message.agentName || 'You'}
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-2.5 ${
                        message.sender === 'user'
                          ? 'bg-white border border-gray-200 text-gray-900'
                          : 'bg-[#6366F1] text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-left' : 'text-right'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* User Typing Indicator */}
              {agentTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingFile || !selectedSession}
                  className="px-3 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Attach file"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || sending}
                  className="px-6 py-2.5 rounded-lg bg-[#6366F1] text-white hover:bg-[#5558E3] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
              {uploadingFile && (
                <div className="mt-2 text-xs text-gray-600 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-[#6366F1]"></div>
                  Uploading file...
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Select a chat</p>
              <p className="text-xs text-gray-500 mt-1">Choose a conversation from the left to start responding</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
