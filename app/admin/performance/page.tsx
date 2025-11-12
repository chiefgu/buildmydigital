'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface PerformanceMetrics {
  LCP: number;
  CLS: number;
  FCP: number;
  TTFB: number;
  INP: number;
}

interface PerformanceReport {
  url: string;
  metrics: Partial<PerformanceMetrics>;
  timestamp: string;
  connection?: string;
  deviceMemory?: number;
  slowMetric?: {
    name: string;
    value: number;
    threshold: number;
  } | null;
}

interface ImageABTestResults {
  webp: {
    averageLoadTime: number;
    medianLoadTime: number;
    p95LoadTime: number;
    sampleSize: number;
  };
  avif: {
    averageLoadTime: number;
    medianLoadTime: number;
    p95LoadTime: number;
    sampleSize: number;
  };
  winner: string;
  recommendation: string;
}

export default function PerformanceDashboard() {
  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [averages, setAverages] = useState<PerformanceMetrics>({
    LCP: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0,
    INP: 0,
  });
  const [abTestResults, setAbTestResults] = useState<ImageABTestResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
    fetchImageABTestResults();

    const interval = setInterval(() => {
      fetchPerformanceData();
      fetchImageABTestResults();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch('/api/performance/report?limit=50');
      const data = await response.json();

      setReports(data.reports || []);
      setAverages(data.averages || {});
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
      setLoading(false);
    }
  };

  const fetchImageABTestResults = async () => {
    try {
      const response = await fetch('/api/performance/image');
      const data = await response.json();

      setAbTestResults(data.abTestResults || null);
    } catch (error) {
      console.error('Failed to fetch A/B test results:', error);
    }
  };

  const getScoreColor = (value: number, metric: string) => {
    const thresholds: Record<string, { good: number; fair: number }> = {
      LCP: { good: 2500, fair: 4000 },
      CLS: { good: 0.1, fair: 0.25 },
      FCP: { good: 1800, fair: 3000 },
      TTFB: { good: 800, fair: 1800 },
      INP: { good: 200, fair: 500 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'text-gray-900';

    if (value <= threshold.good) return 'text-green-600';
    if (value <= threshold.fair) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatValue = (value: number, metric: string) => {
    if (metric === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  const getMetricDescription = (metric: string): { full: string; short: string } => {
    const descriptions: Record<string, { full: string; short: string }> = {
      LCP: {
        full: 'Largest Contentful Paint',
        short: 'Main content load time'
      },
      CLS: {
        full: 'Cumulative Layout Shift',
        short: 'Visual stability'
      },
      FCP: {
        full: 'First Contentful Paint',
        short: 'Initial content display'
      },
      TTFB: {
        full: 'Time to First Byte',
        short: 'Server response time'
      },
      INP: {
        full: 'Interaction to Next Paint',
        short: 'Click responsiveness'
      },
    };
    return descriptions[metric] || { full: '', short: '' };
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Performance Dashboard</h1>
          <p className="text-sm text-gray-600">Real-time Core Web Vitals monitoring and optimization insights</p>
        </div>


        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading performance data...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Core Web Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {Object.entries(averages).map(([metric, value]) => (
                <StatCard
                  key={metric}
                  label={metric}
                  value={formatValue(value, metric)}
                  color={getScoreColor(value, metric)}
                  description={getMetricDescription(metric)}
                />
              ))}
            </div>

            {/* Image A/B Test Results */}
            {abTestResults && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Image Format A/B Test
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* WebP Results */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">WebP</h3>
                      <span className="text-xs text-gray-600">
                        {abTestResults.webp.sampleSize} samples
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium text-gray-900">{abTestResults.webp.averageLoadTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-medium text-gray-900">{abTestResults.webp.medianLoadTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">P95:</span>
                        <span className="font-medium text-gray-900">{abTestResults.webp.p95LoadTime}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* AVIF Results */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">AVIF</h3>
                      <span className="text-xs text-gray-600">
                        {abTestResults.avif.sampleSize} samples
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium text-gray-900">{abTestResults.avif.averageLoadTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-medium text-gray-900">{abTestResults.avif.medianLoadTime}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">P95:</span>
                        <span className="font-medium text-gray-900">{abTestResults.avif.p95LoadTime}ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Winner and Recommendation */}
                <div className={`rounded-lg p-4 ${
                  abTestResults.winner === 'inconclusive' ? 'bg-gray-50' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {abTestResults.winner === 'inconclusive' ? '⏳' : '🏆'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        {abTestResults.winner === 'inconclusive'
                          ? 'Test In Progress'
                          : `Winner: ${abTestResults.winner.toUpperCase()}`}
                      </h4>
                      <p className="text-sm text-gray-700">{abTestResults.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Reports */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Performance Reports
              </h2>

              {reports.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No performance reports yet. Data will appear as users visit your site.
                </div>
              ) : (
                <div className="space-y-3">
                  {reports.map((report, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        report.slowMetric ? 'border-red-200 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900 mb-1">{report.url}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(report.timestamp).toLocaleString()}
                          </div>
                        </div>
                        {report.slowMetric && (
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            SLOW
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(report.metrics).map(([metric, value]) => (
                          <div key={metric} className="text-sm">
                            <div className="text-gray-600 text-xs">{metric}</div>
                            <div className={`font-semibold ${getScoreColor(value!, metric)}`}>
                              {formatValue(value!, metric)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {(report.connection || report.deviceMemory) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 flex gap-4 text-xs text-gray-600">
                          {report.connection && (
                            <span>Connection: {report.connection}</span>
                          )}
                          {report.deviceMemory && (
                            <span>Memory: {report.deviceMemory}GB</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monitoring Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatusItem label="Core Web Vitals Tracking" status="active" />
                <StatusItem label="Slow Page Detection" status="active" />
                <StatusItem label="Intelligent Prefetching" status="active" />
                <StatusItem label="Image A/B Testing" status="active" />
                <StatusItem label="Edge Caching" status="active" />
                <StatusItem label="Telegram Notifications" status="active" />
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
  color,
  description,
}: {
  label: string;
  value: string;
  color?: string;
  description?: { full: string; short: string };
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </div>
      {description && (
        <div className="text-xs text-gray-500 mb-2" title={description.full}>
          {description.short}
        </div>
      )}
      <div className={`text-2xl font-semibold ${color || 'text-gray-900'}`}>{value}</div>
    </div>
  );
}

function StatusItem({ label, status }: { label: string; status: 'active' | 'inactive' }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
