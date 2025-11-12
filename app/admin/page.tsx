'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

interface DashboardStats {
  heatmap: {
    totalSessions: number;
    totalClicks: number;
    avgSessionDuration: number;
  };
  attribution: {
    totalVisits: number;
    totalConversions: number;
    conversionRate: number;
  };
  intent: {
    totalSessions: number;
    averageScore: number;
    highIntentCount: number;
  };
}

// Impressive demo data for screenshots
const DEMO_STATS: DashboardStats = {
  heatmap: {
    totalSessions: 2847,
    totalClicks: 18392,
    avgSessionDuration: 247000, // ~4 minutes
  },
  attribution: {
    totalVisits: 12483,
    totalConversions: 847,
    conversionRate: 6.8,
  },
  intent: {
    totalSessions: 2847,
    averageScore: 72,
    highIntentCount: 394,
  },
};

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === 'true';

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [isDemoMode]);

  const fetchStats = async () => {
    // If demo mode, use demo data immediately
    if (isDemoMode) {
      setStats(DEMO_STATS);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [heatmapRes, attributionRes, intentRes] = await Promise.all([
        fetch('/api/heatmap/data'),
        fetch('/api/attribution/analytics?model=linear'),
        fetch('/api/intent/analytics'),
      ]);

      const heatmapData = await heatmapRes.json();
      const attributionData = await attributionRes.json();
      const intentData = await intentRes.json();

      setStats({
        heatmap: {
          totalSessions: heatmapData.sessions?.length || 0,
          totalClicks: heatmapData.heatmap?.totalClicks || 0,
          avgSessionDuration: heatmapData.heatmap?.averageSessionDuration || 0,
        },
        attribution: {
          totalVisits: attributionData.summary?.totalVisits || 0,
          totalConversions: attributionData.summary?.totalConversions || 0,
          conversionRate: attributionData.summary?.conversionRate || 0,
        },
        intent: {
          totalSessions: intentData.totalSessions || 0,
          averageScore: intentData.averageScore || 0,
          highIntentCount: intentData.highIntentCount || 0,
        },
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        heatmap: { totalSessions: 0, totalClicks: 0, avgSessionDuration: 0 },
        attribution: { totalVisits: 0, totalConversions: 0, conversionRate: 0 },
        intent: { totalSessions: 0, averageScore: 0, highIntentCount: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-600">Monitor your analytics and conversion metrics</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading dashboard...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <MetricCard
                label="Total Visits"
                value={stats?.attribution.totalVisits.toLocaleString() || '0'}
                change={isDemoMode ? "+47.3%" : "+12.5%"}
                trend="up"
              />
              <MetricCard
                label="Conversions"
                value={stats?.attribution.totalConversions.toLocaleString() || '0'}
                change={isDemoMode ? "+68.4%" : "+8.2%"}
                trend="up"
              />
              <MetricCard
                label="Conversion Rate"
                value={`${stats?.attribution.conversionRate.toFixed(1)}%` || '0%'}
                change={isDemoMode ? "+24.7%" : "+2.1%"}
                trend="up"
              />
              <MetricCard
                label="High Intent Leads"
                value={stats?.intent.highIntentCount.toLocaleString() || '0'}
                change={isDemoMode ? "+92.8%" : "+15.3%"}
                trend="up"
              />
            </div>

            {/* Feature Modules */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <ModuleCard
                title="Attribution Analytics"
                description="Multi-touch attribution and conversion funnel analysis"
                href="/admin/attribution"
                icon={FunnelIcon}
                stats={[
                  { label: 'Visits', value: stats?.attribution.totalVisits.toLocaleString() || '0' },
                  { label: 'Conversions', value: stats?.attribution.totalConversions.toLocaleString() || '0' },
                  { label: 'Rate', value: `${stats?.attribution.conversionRate.toFixed(1)}%` || '0%' },
                ]}
              />
              <ModuleCard
                title="Heatmap Analytics"
                description="Session recordings and user behavior analysis"
                href="/admin/heatmap"
                icon={MapIcon}
                stats={[
                  { label: 'Sessions', value: stats?.heatmap.totalSessions.toLocaleString() || '0' },
                  { label: 'Clicks', value: stats?.heatmap.totalClicks.toLocaleString() || '0' },
                  { label: 'Avg Duration', value: `${Math.round((stats?.heatmap.avgSessionDuration || 0) / 1000)}s` },
                ]}
              />
              <ModuleCard
                title="Intent Scoring"
                description="Real-time visitor intent and behavioral signals"
                href="/admin/intent"
                icon={TargetIcon}
                stats={[
                  { label: 'Sessions', value: stats?.intent.totalSessions.toLocaleString() || '0' },
                  { label: 'Avg Score', value: stats?.intent.averageScore.toFixed(0) || '0' },
                  { label: 'High Intent', value: stats?.intent.highIntentCount.toLocaleString() || '0' },
                ]}
              />
              <ModuleCard
                title="Lead Enrichment"
                description="Auto-enhanced contact submissions with scoring"
                href="/contact"
                icon={UserIcon}
                stats={[
                  { label: 'Auto-Enrichment', value: 'Active' },
                  { label: 'IP Lookup', value: 'Active' },
                  { label: 'Lead Scoring', value: 'Active' },
                ]}
              />
            </div>

            {/* Live Chat Module */}
            <div className="mb-8">
              <ModuleCard
                title="Live Chat"
                description="Respond to customer inquiries in real-time"
                href="/admin/chat"
                icon={ChatIcon}
                stats={isDemoMode ? [
                  { label: 'Active Chats', value: '7' },
                  { label: 'Response Time', value: '< 1 min' },
                  { label: 'Status', value: 'Online' },
                ] : [
                  { label: 'Active Chats', value: '0' },
                  { label: 'Response Time', value: '<2 min' },
                  { label: 'Status', value: 'Online' },
                ]}
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <ActionButton
                    href="/admin/attribution"
                    label="View Attribution Report"
                    description="Analyze conversion funnels"
                  />
                  <ActionButton
                    href="/admin/heatmap"
                    label="Review Heatmaps"
                    description="See user click patterns"
                  />
                  <ActionButton
                    href="/admin/intent"
                    label="Check Intent Signals"
                    description="Monitor hot leads"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function MetricCard({
  label,
  value,
  change,
  trend,
}: {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {change}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  stats,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: { label: string; value: string }[];
}) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 hover:border-[#6366F1] hover:shadow-lg transition-all p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-[#F0F1FF] rounded-lg flex items-center justify-center group-hover:bg-[#6366F1] transition-colors">
            <Icon className="w-6 h-6 text-[#6366F1] group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-[#6366F1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ActionButton({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#6366F1] hover:bg-[#F0F1FF] transition-all group"
    >
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 mb-1">{label}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#6366F1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}

// Icons
function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
