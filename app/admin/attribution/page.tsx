'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface ChannelPerformance {
  channel: string;
  visits: number;
  conversions: number;
  conversionRate: number;
  totalRevenue: number;
  revenuePerVisit: number;
  firstTouchRevenue: number;
  lastTouchRevenue: number;
  linearRevenue: number;
  topSources: { source: string; visits: number; conversions: number; revenue: number }[];
}

interface AttributionBreakdown {
  channel: string;
  credit: number;
  value: number;
  percentage: number;
}

interface AnalyticsData {
  summary: {
    totalVisits: number;
    totalConversions: number;
    conversionRate: number;
    avgTouchpoints: string;
    avgTimeToConversion: string;
    totalRevenue: number;
  };
  channelPerformance: ChannelPerformance[];
  attributionBreakdown: AttributionBreakdown[];
  topPages: { path: string; conversions: number }[];
  model: string;
}

export default function AttributionDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<string>('linear');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('all');

  useEffect(() => {
    fetchAnalytics();
  }, [model, dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const now = Date.now();
      let startDate = 0;

      if (dateRange === '7d') {
        startDate = now - 7 * 24 * 60 * 60 * 1000;
      } else if (dateRange === '30d') {
        startDate = now - 30 * 24 * 60 * 60 * 1000;
      }

      const response = await fetch(
        `/api/attribution/analytics?model=${model}&startDate=${startDate}&endDate=${now}`
      );
      const result = await response.json();

      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Attribution Analytics</h1>
          <p className="text-sm text-gray-600">Multi-touch attribution tracking and conversion funnel analysis</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading analytics...</span>
            </div>
          </div>
        ) : !data ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-gray-600">No attribution data available</p>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Attribution Model Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attribution Model
                  </label>
                  <select
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  >
                    <option value="first-touch">First-Touch (100% to first)</option>
                    <option value="last-touch">Last-Touch (100% to last)</option>
                    <option value="linear">Linear (Equal credit)</option>
                    <option value="time-decay">Time-Decay (Recent gets more)</option>
                    <option value="position-based">
                      Position-Based (40/20/40)
                    </option>
                  </select>
                </div>

                {/* Date Range Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDateRange('7d')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        dateRange === '7d'
                          ? 'bg-[#6366F1] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => setDateRange('30d')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        dateRange === '30d'
                          ? 'bg-[#6366F1] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => setDateRange('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        dateRange === 'all'
                          ? 'bg-[#6366F1] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Time
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <StatCard
                label="Total Visits"
                value={data.summary.totalVisits.toLocaleString()}
              />
              <StatCard
                label="Conversions"
                value={data.summary.totalConversions.toLocaleString()}
              />
              <StatCard
                label="Conversion Rate"
                value={`${data.summary.conversionRate.toFixed(2)}%`}
              />
              <StatCard
                label="Avg Touchpoints"
                value={data.summary.avgTouchpoints}
              />
              <StatCard
                label="Time to Convert"
                value={`${data.summary.avgTimeToConversion} days`}
              />
              <StatCard
                label="Total Revenue"
                value={`£${data.summary.totalRevenue.toLocaleString()}`}
              />
            </div>

            {/* Attribution Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Attribution by Channel ({model})
              </h2>
              <div className="space-y-3">
                {data.attributionBreakdown.map(item => (
                  <div key={item.channel} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {formatChannel(item.channel)}
                        </span>
                        <span className="text-xs text-gray-600">
                          {item.percentage.toFixed(1)}% credit
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#6366F1] h-2 rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="text-base font-semibold text-gray-900">
                        £{item.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Performance Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 overflow-x-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Channel Performance
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Channel
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Conv. Rate
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Revenue
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rev/Visit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.channelPerformance.map(channel => (
                    <tr key={channel.channel} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {formatChannel(channel.channel)}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-gray-700">
                        {channel.visits.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-gray-700">
                        {channel.conversions}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-gray-700">
                        {(channel.conversionRate * 100).toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        £{channel.totalRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-gray-700">
                        £{channel.revenuePerVisit.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Converting Pages */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Top Converting Pages
              </h2>
              <div className="space-y-2">
                {data.topPages.map((page, index) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#F0F1FF] text-[#6366F1] rounded-full text-sm font-semibold">
                        {index + 1}
                      </span>
                      <code className="text-sm font-mono text-gray-700">
                        {page.path}
                      </code>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {page.conversions} conversions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function formatChannel(channel: string): string {
  const channelNames: Record<string, string> = {
    'organic-search': 'Organic Search',
    'paid-search': 'Paid Search',
    'paid-social': 'Paid Social',
    'organic-social': 'Social Media',
    email: 'Email',
    direct: 'Direct',
    referral: 'Referral',
    display: 'Display Ads',
    affiliate: 'Affiliate',
    other: 'Other',
  };

  return channelNames[channel] || channel;
}
