'use client';

import { useState, useEffect } from 'react';
import HeatmapOverlay from '@/components/HeatmapOverlay';
import AdminLayout from '@/components/AdminLayout';

interface ClickPoint {
  x: number;
  y: number;
  count: number;
}

interface HeatmapData {
  clicks: ClickPoint[];
  totalSessions: number;
  totalClicks: number;
  viewport: {
    maxWidth: number;
    maxHeight: number;
  };
  timeRange: {
    from: number;
    to: number;
  };
}

export default function HeatmapAdmin() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('all');
  const [opacity, setOpacity] = useState(0.6);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [screenshotDimensions, setScreenshotDimensions] = useState<{ width: number; height: number } | null>(null);

  /**
   * Capture screenshot of homepage
   */
  const captureScreenshot = async (width: number) => {
    setScreenshotLoading(true);
    try {
      const response = await fetch('/api/heatmap/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.origin, // Capture current site
          width,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setScreenshotUrl(data.url);
        setScreenshotDimensions(data.dimensions);
        console.log('[Heatmap] Screenshot captured:', data.url, 'Dimensions:', data.dimensions);
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    } finally {
      setScreenshotLoading(false);
    }
  };

  /**
   * Fetch heatmap data
   */
  const fetchHeatmap = async () => {
    setLoading(true);
    try {
      // Calculate time range based on filter
      const now = Date.now();
      let from = 0;

      switch (timeFilter) {
        case '24h':
          from = now - (24 * 60 * 60 * 1000);
          break;
        case '7d':
          from = now - (7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          from = now - (30 * 24 * 60 * 60 * 1000);
          break;
        case 'all':
        default:
          from = 0;
      }

      const params = new URLSearchParams({
        from: from.toString(),
        to: now.toString(),
      });

      const response = await fetch(`/api/heatmap/aggregate?${params}`);
      const data = await response.json();

      if (data.success) {
        setHeatmapData(data.heatmap);

        // Capture screenshot if we have viewport dimensions and don't have one yet
        if (data.heatmap.viewport && !screenshotUrl) {
          captureScreenshot(data.heatmap.viewport.maxWidth);
        }
      }
    } catch (error) {
      console.error('Error fetching heatmap:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch on mount and when filter changes
   */
  useEffect(() => {
    fetchHeatmap();
  }, [timeFilter]);

  /**
   * Get top clicked areas
   */
  const getTopClicks = () => {
    if (!heatmapData) return [];
    return heatmapData.clicks
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  /**
   * Format number with commas
   */
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Click Heatmap</h1>
          <p className="text-sm text-gray-600">Visualize where visitors are clicking on your site</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Total Clicks</p>
            <p className="text-3xl font-semibold text-gray-900">
              {heatmapData ? formatNumber(heatmapData.totalClicks) : '-'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Sessions Tracked</p>
            <p className="text-3xl font-semibold text-gray-900">
              {heatmapData ? formatNumber(heatmapData.totalSessions) : '-'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Click Areas</p>
            <p className="text-3xl font-semibold text-gray-900">
              {heatmapData ? formatNumber(heatmapData.clicks.length) : '-'}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Avg Clicks/Session</p>
            <p className="text-3xl font-semibold text-gray-900">
              {heatmapData && heatmapData.totalSessions > 0
                ? (heatmapData.totalClicks / heatmapData.totalSessions).toFixed(1)
                : '-'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
              {(['24h', '7d', '30d', 'all'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === filter
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === '24h' && 'Last 24 Hours'}
                  {filter === '7d' && 'Last 7 Days'}
                  {filter === '30d' && 'Last 30 Days'}
                  {filter === 'all' && 'All Time'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Opacity:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity * 100}
                onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                className="w-32"
              />
              <span className="text-sm text-gray-600 w-12">{Math.round(opacity * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Heatmap Visualization */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Loading heatmap data...</span>
            </div>
          </div>
        ) : !heatmapData || heatmapData.clicks.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No click data yet</h3>
            <p className="text-sm text-gray-600">
              Click data will appear here as visitors interact with your site.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Heatmap Canvas - Full Width */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Heatmap Visualization</h2>
                {screenshotUrl && !screenshotLoading && (
                  <button
                    onClick={() => {
                      setScreenshotUrl(null);
                      setScreenshotDimensions(null);
                      captureScreenshot(heatmapData.viewport.maxWidth);
                    }}
                    className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Refresh Screenshot
                  </button>
                )}
              </div>

              <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: '70vh' }}>
                {screenshotLoading && (
                  <div className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#6366F1]"></div>
                      <span className="text-sm text-gray-600">Capturing screenshot...</span>
                    </div>
                  </div>
                )}

                {/* Heatmap Canvas - scrollable */}
                <div className="relative w-full h-full overflow-auto bg-gray-50">
                  <div className="relative" style={{
                    width: screenshotDimensions?.width || heatmapData.viewport.maxWidth,
                    height: screenshotDimensions?.height || heatmapData.viewport.maxHeight
                  }}>
                    {/* Screenshot background */}
                    {screenshotUrl && (
                      <img
                        src={screenshotUrl}
                        alt="Website screenshot"
                        className="absolute inset-0 w-full h-full object-contain object-top"
                      />
                    )}

                    {/* Coordinate grid fallback (if no screenshot) */}
                    {!screenshotUrl && (
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, #ddd 1px, transparent 1px),
                            linear-gradient(to bottom, #ddd 1px, transparent 1px)
                          `,
                          backgroundSize: '50px 50px',
                        }}
                      />
                    )}

                    {/* Heatmap overlay */}
                    <div className="absolute inset-0">
                      <HeatmapOverlay
                        clicks={heatmapData.clicks}
                        width={screenshotDimensions?.width || heatmapData.viewport.maxWidth}
                        height={screenshotDimensions?.height || heatmapData.viewport.maxHeight}
                        opacity={opacity}
                      />
                    </div>

                    {/* Legend */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-300 shadow-lg z-10">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Heat Intensity</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-600">Low</div>
                        <div
                          className="h-4 w-24 rounded"
                          style={{
                            background: 'linear-gradient(to right, hsl(240, 100%, 50%), hsl(180, 100%, 50%), hsl(120, 100%, 50%), hsl(60, 100%, 50%), hsl(0, 100%, 50%))',
                          }}
                        />
                        <div className="text-xs text-gray-600">High</div>
                      </div>
                    </div>

                    {/* Dimensions label */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-300 shadow-lg text-xs text-gray-600">
                      {screenshotDimensions
                        ? `Screenshot: ${screenshotDimensions.width} × ${screenshotDimensions.height}px`
                        : `Viewport: ${heatmapData.viewport.maxWidth} × ${heatmapData.viewport.maxHeight}px`
                      }
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                <strong>Tip:</strong> {screenshotUrl
                  ? 'The heatmap overlay shows where visitors clicked on your actual website. Red areas = more clicks, Blue areas = fewer clicks.'
                  : 'Screenshot is loading. Meanwhile, click positions are shown on a coordinate grid.'}
              </p>
            </div>

            {/* Top Click Areas - Below Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Click Areas</h2>
                <div className="space-y-3">
                  {getTopClicks().map((click, index) => (
                    <div
                      key={`${click.x}-${click.y}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F0F1FF] text-[#6366F1] flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Position ({click.x}, {click.y})
                          </div>
                          <div className="text-xs text-gray-500">
                            {click.count.toLocaleString()} clicks
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {((click.count / heatmapData.totalClicks) * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">of total</div>
                      </div>
                    </div>
                  ))}

                  {getTopClicks().length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No click data available
                    </div>
                  )}
                </div>
              </div>

              {/* Insights */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Heatmap Insights</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Identify which CTAs get the most engagement</li>
                  <li>• Find dead zones where users never click</li>
                  <li>• Optimize button placement based on click density</li>
                  <li>• Compare click patterns across different time periods</li>
                  <li>• Discover unexpected user behaviors</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
