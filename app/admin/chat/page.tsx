'use client';

import AdminLayout from '@/components/AdminLayout';
import AdminChatInterface from '@/components/AdminChatInterface';

export default function LiveChatAdmin() {
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Live Chat</h1>
          <p className="text-sm text-gray-600">Respond to customer inquiries in real-time</p>
        </div>

        {/* Chat Interface */}
        <AdminChatInterface />
      </div>
    </AdminLayout>
  );
}
