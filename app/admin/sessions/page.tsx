'use client';

import { useState, useEffect } from 'react';
import SessionReplayPlayer from '@/components/SessionReplayPlayer';
import { SessionRecording } from '@/lib/sessionRecording';

interface SessionSummary {
  sessionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  eventsCount: number;
  frictionCount: number;
  url: string;
  viewport: { width: number; height: number };
}

export default function SessionsAdmin() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SessionRecording | null>(null);
  const [filter, setFilter] = useState<'all' | 'friction' | 'long'>('all');

  // Fetch all sessions
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/session/record?all=true');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/session/record?sessionId=${sessionId}`);
      const data = await response.json();
      setSelectedSession(data.recording);
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'friction') return session.frictionCount > 0;
    if (filter === 'long') return (session.duration || 0) > 180000; // 3+ minutes
    return true;
  });

  const formatDuration = (ms?: number) => {
    if (!ms) return 'N/A';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Session Recordings</h1>
          <p className="text-gray-600">Watch user sessions and identify friction points</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
              </div>
              <div className="text-4xl">🎬</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">With Friction</p>
                <p className="text-3xl font-bold text-red-900">
                  {sessions.filter(s => s.frictionCount > 0).length}
                </p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg Duration</p>
                <p className="text-3xl font-bold text-blue-900">
                  {sessions.length > 0
                    ? formatDuration(
                        sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length
                      )
                    : 'N/A'}
                </p>
              </div>
              <div className="text-4xl">⏱️</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Events</p>
                <p className="text-3xl font-bold text-green-900">
                  {sessions.reduce((sum, s) => sum + s.eventsCount, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setFilter('friction')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'friction'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              ⚠️ With Friction
            </button>
            <button
              onClick={() => setFilter('long')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'long'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              ⏱️ Long Sessions (3+ min)
            </button>
          </div>
        </div>

        {/* Sessions List */}
        {loading ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading sessions...</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions yet</h3>
            <p className="text-gray-600">
              Session recording is active. Sessions will appear here as visitors browse your site.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions
              .sort((a, b) => b.startTime - a.startTime)
              .map((session) => (
                <div
                  key={session.sessionId}
                  className={`bg-white rounded-lg p-6 border-2 transition-all hover:shadow-lg cursor-pointer ${
                    session.frictionCount > 0
                      ? 'border-red-300 bg-red-50/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => loadSession(session.sessionId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">
                        {session.frictionCount > 0 ? '⚠️' : '🎬'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            Session {session.sessionId.slice(-8)}
                          </h3>
                          {session.frictionCount > 0 && (
                            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                              {session.frictionCount} FRICTION
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Started:</span>
                            <p className="font-medium text-gray-900">
                              {new Date(session.startTime).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <p className="font-medium text-gray-900">
                              {formatDuration(session.duration)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Events:</span>
                            <p className="font-medium text-gray-900">
                              {session.eventsCount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Viewport:</span>
                            <p className="font-medium text-gray-900">
                              {session.viewport.width}x{session.viewport.height}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500 text-sm">URL:</span>
                          <p className="text-sm text-blue-600 truncate">{session.url}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        loadSession(session.sessionId);
                      }}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Replay
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Replay Player Modal */}
      {selectedSession && (
        <SessionReplayPlayer
          recording={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}
