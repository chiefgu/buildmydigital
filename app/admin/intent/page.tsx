'use client';

import { useState, useEffect } from 'react';
import { getLeadCategory } from '@/lib/intentScoring';
import AdminLayout from '@/components/AdminLayout';

interface IntentSession {
  sessionId: string;
  totalScore: number;
  signals: Array<{
    action: string;
    points: number;
    timestamp: string;
    metadata?: Record<string, any>;
  }>;
  isHotLead: boolean;
  category: string;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
  };
}

export default function IntentDashboard() {
  const [sessions, setSessions] = useState<IntentSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'engaged'>('all');

  // In a real implementation, you would fetch all sessions from your backend
  // For now, this is a placeholder that would need backend support
  useEffect(() => {
    // Simulated data - replace with actual API call
    setLoading(false);
  }, []);

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    if (filter === 'hot') return session.isHotLead;
    if (filter === 'warm') return session.totalScore >= 40 && session.totalScore < 70;
    if (filter === 'engaged') return session.totalScore >= 20 && session.totalScore < 40;
    return true;
  });

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Intent Score Dashboard</h1>
          <p className="text-sm text-gray-600">Monitor visitor engagement and identify hot leads in real-time</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Total Sessions</p>
            <p className="text-3xl font-semibold text-gray-900">{sessions.length}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Hot Leads</p>
            <p className="text-3xl font-semibold text-gray-900">
              {sessions.filter(s => s.isHotLead).length}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Warm Leads</p>
            <p className="text-3xl font-semibold text-gray-900">
              {sessions.filter(s => s.totalScore >= 40 && s.totalScore < 70).length}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Avg Score</p>
            <p className="text-3xl font-semibold text-gray-900">
              {sessions.length > 0
                ? Math.round(sessions.reduce((sum, s) => sum + s.totalScore, 0) / sessions.length)
                : 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setFilter('hot')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'hot'
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hot Leads (70+)
            </button>
            <button
              onClick={() => setFilter('warm')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'warm'
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Warm Leads (40-69)
            </button>
            <button
              onClick={() => setFilter('engaged')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'engaged'
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Engaged (20-39)
            </button>
          </div>
        </div>

        {/* Sessions List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading sessions...</span>
            </div>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions yet</h3>
            <p className="text-sm text-gray-600">
              Intent tracking is active. Sessions will appear here as visitors interact with your site.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.sessionId}
                className="bg-white rounded-lg p-6 border border-gray-200 transition-all hover:border-[#6366F1] hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {session.userInfo?.name || `Session ${session.sessionId.slice(-8)}`}
                      </h3>
                      {session.isHotLead && (
                        <span className="px-2 py-1 bg-[#6366F1] text-white text-xs font-semibold rounded-full">
                          HOT LEAD
                        </span>
                      )}
                    </div>
                    {session.userInfo?.email && (
                      <p className="text-sm text-gray-600">{session.userInfo.email}</p>
                    )}
                    {session.userInfo?.company && (
                      <p className="text-sm text-gray-600">{session.userInfo.company}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">
                      {session.totalScore}
                    </div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                      {session.category}
                    </div>
                  </div>
                </div>

                {/* Signals */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Activity Timeline</h4>
                  <div className="space-y-2">
                    {session.signals.slice(0, 5).map((signal, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <span className="text-[#6366F1] font-semibold">+{signal.points}</span>
                        <span className="text-gray-600">{signal.action.replace(/_/g, ' ')}</span>
                        <span className="text-gray-400 text-xs ml-auto">
                          {new Date(signal.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {session.signals.length > 5 && (
                      <p className="text-xs text-gray-500 italic">
                        +{session.signals.length - 5} more actions
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
