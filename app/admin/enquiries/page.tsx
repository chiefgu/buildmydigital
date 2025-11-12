'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface Enquiry {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  replied: boolean;
  replyAt?: number;
  replyMessage?: string;
  enrichedData?: {
    score: number;
    grade: string;
    qualified: boolean;
    tags: string[];
  };
  attribution?: {
    touchpoints: number;
    firstTouch: string;
    lastTouch: string;
  };
  intentScore?: number;
}

interface Stats {
  total: number;
  unreplied: number;
  replied: number;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unreplied: 0, replied: 0 });
  const [filter, setFilter] = useState<'all' | 'unreplied' | 'replied'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries?filter=${filter}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  // Send reply
  const handleSendReply = async () => {
    if (!selectedEnquiry || !replyMessage.trim()) return;

    setSending(true);
    try {
      const res = await fetch('/api/admin/enquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryId: selectedEnquiry.id,
          replyMessage,
          replyBy: 'Admin',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(null);
        setReplyMessage('');
        fetchEnquiries(); // Refresh list
      } else {
        alert('Failed to send reply: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Email Enquiries</h1>
          <p className="text-sm text-gray-600">Manage and reply to contact form submissions</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading enquiries...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard label="Total Enquiries" value={stats.total.toString()} />
              <StatCard label="Unreplied" value={stats.unreplied.toString()} highlight="warning" />
              <StatCard label="Replied" value={stats.replied.toString()} highlight="success" />
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('unreplied')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'unreplied'
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unreplied ({stats.unreplied})
                </button>
                <button
                  onClick={() => setFilter('replied')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'replied'
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Replied ({stats.replied})
                </button>
              </div>
            </div>

            {/* Enquiries List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-600">
                  No enquiries found
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {enquiries.map((enquiry) => (
                    <div key={enquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-semibold text-gray-900">{enquiry.name}</h3>
                            {enquiry.replied ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Replied
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                Pending
                              </span>
                            )}
                            {enquiry.enrichedData && (
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                enquiry.enrichedData.grade === 'A' ? 'bg-red-100 text-red-800' :
                                enquiry.enrichedData.grade === 'B' ? 'bg-orange-100 text-orange-800' :
                                enquiry.enrichedData.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                Grade {enquiry.enrichedData.grade}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-4">
                              <span>{enquiry.email}</span>
                              {enquiry.company && <span className="text-gray-500">• {enquiry.company}</span>}
                              <span className="text-gray-500">• {formatDate(enquiry.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        {!enquiry.replied && (
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#5558E3] transition-colors text-sm font-medium"
                          >
                            Reply
                          </button>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Message</div>
                        <div className="text-sm text-gray-900 whitespace-pre-wrap">{enquiry.message}</div>
                      </div>

                      {enquiry.enrichedData && enquiry.enrichedData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {enquiry.enrichedData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {enquiry.attribution && (
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{enquiry.attribution.touchpoints} touchpoint{enquiry.attribution.touchpoints !== 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>First: {enquiry.attribution.firstTouch}</span>
                          <span>•</span>
                          <span>Last: {enquiry.attribution.lastTouch}</span>
                        </div>
                      )}

                      {enquiry.replied && enquiry.replyMessage && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="text-xs font-medium text-green-800 mb-2 uppercase tracking-wider">
                            Your Reply {enquiry.replyAt && `• ${formatDate(enquiry.replyAt)}`}
                          </div>
                          <div className="text-sm text-green-900 whitespace-pre-wrap">{enquiry.replyMessage}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Reply Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Reply to {selectedEnquiry.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedEnquiry.email}</p>
            </div>

            <div className="p-6">
              {/* Original Message */}
              <div className="mb-6">
                <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Original Message</div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Reply Editor */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Your Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-sm"
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedEnquiry(null);
                    setReplyMessage('');
                  }}
                  disabled={sending}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyMessage.trim()}
                  className="px-6 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#5558E3] transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: 'warning' | 'success';
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-2xl font-semibold ${
        highlight === 'warning' ? 'text-orange-600' :
        highlight === 'success' ? 'text-green-600' :
        'text-gray-900'
      }`}>
        {value}
      </div>
    </div>
  );
}
