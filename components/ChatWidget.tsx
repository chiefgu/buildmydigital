'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pusher from 'pusher-js';
import { trackChatInteraction, getSessionAnalytics } from '@/lib/analytics';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  agentName?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<Pusher | null>(null);

  // User details state
  const [hasProvidedDetails, setHasProvidedDetails] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Pusher for real-time updates
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
      console.warn('Pusher key not configured. Real-time messaging will not work.');
      return;
    }

    pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
    });

    const channel = pusherRef.current.subscribe(`chat-${sessionId}`);

    channel.bind('new-message', (data: Message) => {
      // Only add messages from agents/AI (user messages are added immediately on send)
      if (data.sender !== 'user') {
        setMessages(prev => [...prev, {
          ...data,
          timestamp: new Date(data.timestamp)
        }]);

        // Increment unread count if chat is closed
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusherRef.current?.disconnect();
    };
  }, [sessionId]);

  // Polling fallback when Pusher is not configured
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PUSHER_KEY || !isOpen) return;

    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
        if (!response.ok) return;

        const data = await response.json();
        setIsOnline(data.isTeamOnline || false);

        // Update messages if we have new ones
        if (data.messages && data.messages.length > messages.length) {
          const newMessages = data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));

          // Count new agent/AI messages if chat is closed
          if (!isOpen) {
            const newAgentMessages = newMessages.filter((msg: Message) =>
              msg.sender !== 'user' && !messages.find(m => m.id === msg.id)
            );
            if (newAgentMessages.length > 0) {
              setUnreadCount(prev => prev + newAgentMessages.length);
            }
          }

          setMessages(newMessages);
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };

    // Poll every 3 seconds
    const interval = setInterval(pollMessages, 3000);

    return () => clearInterval(interval);
  }, [sessionId, isOpen, messages.length]);

  // Load existing messages when chat opens
  useEffect(() => {
    if (!isOpen) return;

    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
        if (!response.ok) return;

        const data = await response.json();
        setIsOnline(data.isTeamOnline || false);

        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
          // If we have messages, user has already provided details
          setHasProvidedDetails(true);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [isOpen, sessionId]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Save input text before clearing it
    const messageText = inputText;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Track message sent
    trackChatInteraction('message_sent');

    try {
      // Send message to API
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messageText,
          sessionId,
          userName: userName || undefined,
          userEmail: userEmail || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Update online status
      setIsOnline(data.isTeamOnline || false);

      // If AI responded immediately (no Pusher), add the message
      if (data.aiMessage && !process.env.NEXT_PUBLIC_PUSHER_KEY) {
        setMessages(prev => [...prev, {
          ...data.aiMessage,
          timestamp: new Date(data.aiMessage.timestamp)
        }]);

        // Increment unread count if chat is closed
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: `${Date.now()}-error`,
        text: 'Sorry, there was an error sending your message. Please try again.',
        sender: 'agent',
        timestamp: new Date(),
        agentName: 'System'
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Bottom Right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0); // Clear unread count when opening
              trackChatInteraction('open');
            }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#EF8354] text-white shadow-[0_8px_32px_rgba(239,131,84,0.4)] hover:shadow-[0_12px_40px_rgba(239,131,84,0.5)] transition-all duration-300 flex items-center justify-center group"
          >
            <svg
              className="w-7 h-7 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {/* Notification badge - only show when there are unread messages */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse font-bold text-white shadow-lg">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 w-auto sm:w-[360px] h-[600px] sm:max-w-[360px] bg-white backdrop-blur-xl rounded-[28px] shadow-[0_32px_80px_rgba(0,0,0,0.14),0_12px_24px_rgba(0,0,0,0.10),0_4px_8px_rgba(0,0,0,0.06)] border-2 border-gray-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#EF8354] to-[#d97446] p-5 flex items-center justify-between shadow-[0_8px_24px_rgba(239,131,84,0.2)] relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-[16px] bg-white/25 backdrop-blur-md flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white" className="w-6 h-6">
                    <rect x="10" y="60" width="30" height="30"/>
                    <rect x="35" y="35" width="30" height="30"/>
                    <rect x="60" y="10" width="30" height="30"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] tracking-tight leading-tight">BUILDMYDIGITAL</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-300 shadow-[0_0_12px_rgba(134,239,172,0.8)] animate-pulse' : 'bg-white/40'}`} />
                    <span className="text-white/95 text-[12px] font-semibold">
                      {isOnline ? 'Team is online' : 'Team will reply soon'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  trackChatInteraction('close');
                }}
                className="w-10 h-10 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center justify-center relative z-10 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Welcome Form (shown before chat starts) */}
            {!hasProvidedDetails && (
              <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-5 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent">
                <div className="w-full max-w-sm space-y-5 py-2" style={{ maxWidth: '320px' }}>
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#EF8354] via-[#EF8354] to-[#d97446] rounded-[18px] flex items-center justify-center shadow-[0_12px_32px_rgba(239,131,84,0.3),0_4px_12px_rgba(239,131,84,0.2)] border border-[#EF8354]/20">
                      <svg className="w-7 h-7 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-gray-900 tracking-tight leading-tight">👋 Welcome!</h3>
                      <p className="text-gray-600 font-medium text-[14px] mt-2 leading-relaxed">Send us a message and we'll get back to you shortly.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="userName" className="block text-[13px] font-bold text-gray-800 mb-2 tracking-tight">
                        Your Name
                      </label>
                      <input
                        id="userName"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="John Smith"
                        style={{ padding: '12px 16px' }}
                        className="w-full rounded-[16px] border-2 border-gray-100 focus:border-[#EF8354] focus:ring-4 focus:ring-[#EF8354]/10 outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white hover:border-gray-200 focus:bg-white text-[14px] text-gray-900 placeholder:text-[13px] placeholder-gray-400 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="userEmail" className="block text-[13px] font-bold text-gray-800 mb-2 tracking-tight">
                        Email Address
                      </label>
                      <input
                        id="userEmail"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="john@example.com"
                        style={{ padding: '12px 16px' }}
                        className="w-full rounded-[16px] border-2 border-gray-100 focus:border-[#EF8354] focus:ring-4 focus:ring-[#EF8354]/10 outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white hover:border-gray-200 focus:bg-white text-[14px] text-gray-900 placeholder:text-[13px] placeholder-gray-400 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="initialMessage" className="block text-[13px] font-bold text-gray-800 mb-2 tracking-tight">
                        Your Message
                      </label>
                      <textarea
                        id="initialMessage"
                        value={initialMessage}
                        onChange={(e) => setInitialMessage(e.target.value)}
                        placeholder="Hi, I'm interested in learning more about..."
                        rows={3}
                        style={{ padding: '12px 16px' }}
                        className="w-full rounded-[16px] border-2 border-gray-100 focus:border-[#EF8354] focus:ring-4 focus:ring-[#EF8354]/10 outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white hover:border-gray-200 focus:bg-white text-[14px] text-gray-900 placeholder:text-[13px] placeholder-gray-400 resize-none font-medium leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (userName.trim() && userEmail.trim() && initialMessage.trim()) {
                          setHasProvidedDetails(true);
                          trackChatInteraction('start_chat');

                          // Add user's initial message
                          const userMessage: Message = {
                            id: `${Date.now()}-user`,
                            text: initialMessage,
                            sender: 'user',
                            timestamp: new Date()
                          };

                          setMessages([userMessage]);

                          // Collect session analytics
                          const sessionAnalytics = getSessionAnalytics();
                          console.log('[Chat] Collected session analytics:', sessionAnalytics);

                          // Send the message to the API with analytics
                          try {
                            const response = await fetch('/api/chat/send', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                text: initialMessage,
                                sessionId,
                                userName,
                                userEmail,
                                sessionAnalytics, // Include analytics data
                              }),
                            });

                            const data = await response.json();

                            if (response.ok) {
                              setIsOnline(data.isTeamOnline || false);

                              // If AI responded immediately (no Pusher), add the message
                              if (data.aiMessage && !process.env.NEXT_PUBLIC_PUSHER_KEY) {
                                setTimeout(() => {
                                  setMessages(prev => [...prev, {
                                    ...data.aiMessage,
                                    timestamp: new Date(data.aiMessage.timestamp)
                                  }]);
                                  // No need to increment unread since user just sent a message (chat is open)
                                }, 500);
                              }
                            }
                          } catch (error) {
                            console.error('Failed to send initial message:', error);
                          }

                          // Clear the initial message
                          setInitialMessage('');
                        }
                      }}
                      disabled={!userName.trim() || !userEmail.trim() || !initialMessage.trim()}
                      className="w-full px-5 py-[14px] rounded-[16px] bg-gradient-to-r from-[#EF8354] via-[#EF8354] to-[#d97446] text-white font-bold text-[15px] hover:shadow-[0_12px_32px_rgba(239,131,84,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_16px_rgba(239,131,84,0.25)]"
                    >
                      Send Message
                    </button>

                    <p className="text-[11px] text-gray-500 text-center font-semibold flex items-center justify-center gap-2 pt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Your information is safe and secure</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area */}
            {hasProvidedDetails && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/30 via-transparent to-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[82%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender !== 'user' && (
                      <div className="text-[10px] font-bold text-gray-600 mb-2 px-2 uppercase tracking-wider">
                        {message.agentName}
                      </div>
                    )}
                    <div className={`rounded-[20px] px-5 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-[#EF8354] via-[#EF8354] to-[#d97446] text-white shadow-[0_6px_20px_rgba(239,131,84,0.25),0_2px_8px_rgba(239,131,84,0.15)]'
                          : 'bg-white text-gray-900 border-2 border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                      }`}
                    >
                      <p className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{message.text}</p>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 px-2 font-semibold">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-[20px] px-5 py-3 border-2 border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            )}

            {/* Input Area - only show after details provided */}
            {hasProvidedDetails && (
            <div className="border-t-2 border-gray-50 p-4 bg-white/80 backdrop-blur-sm">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{ padding: '12px 16px' }}
                  className="flex-1 rounded-[16px] border-2 border-gray-100 focus:border-[#EF8354] focus:ring-4 focus:ring-[#EF8354]/10 outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white hover:border-gray-200 focus:bg-white text-[14px] text-gray-900 placeholder:text-[13px] placeholder-gray-400 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isTyping}
                  className="px-5 py-3 rounded-[16px] bg-gradient-to-r from-[#EF8354] via-[#EF8354] to-[#d97446] text-white hover:shadow-[0_8px_20px_rgba(239,131,84,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-[0_4px_12px_rgba(239,131,84,0.2)]"
                >
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-3 text-center font-semibold flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                We typically reply within minutes
              </p>
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
