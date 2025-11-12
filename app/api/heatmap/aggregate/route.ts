import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions } from '@/lib/sessionStorage';

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

/**
 * Aggregate click data from all sessions
 * Groups nearby clicks together (within 20px radius)
 */
function aggregateClicks(sessions: any[]): ClickPoint[] {
  const clickMap = new Map<string, ClickPoint>();
  const gridSize = 20; // Group clicks within 20px grid cells

  sessions.forEach(session => {
    session.events
      .filter((event: any) => event.type === 'click')
      .forEach((click: any) => {
        const x = click.data?.x || 0;
        const y = click.data?.y || 0;

        // Round to grid for aggregation
        const gridX = Math.floor(x / gridSize) * gridSize;
        const gridY = Math.floor(y / gridSize) * gridSize;
        const key = `${gridX},${gridY}`;

        if (clickMap.has(key)) {
          const existing = clickMap.get(key)!;
          existing.count++;
        } else {
          clickMap.set(key, { x: gridX, y: gridY, count: 1 });
        }
      });
  });

  return Array.from(clickMap.values())
    .sort((a, b) => b.count - a.count); // Sort by most clicked
}

/**
 * GET /api/heatmap/aggregate
 * Returns aggregated click heatmap data from all sessions
 *
 * Query params:
 * - url: Filter by specific page URL (optional)
 * - from: Start timestamp (optional)
 * - to: End timestamp (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const urlFilter = searchParams.get('url');
    const fromTime = searchParams.get('from') ? parseInt(searchParams.get('from')!) : 0;
    const toTime = searchParams.get('to') ? parseInt(searchParams.get('to')!) : Date.now();

    // Get all sessions from storage (shared with session recording API)
    const allSessions = getAllSessions();
    console.log('[Heatmap] Total sessions in storage:', allSessions.length);

    // Filter sessions
    let filteredSessions = allSessions;

    if (urlFilter) {
      filteredSessions = filteredSessions.filter(s => s.url.includes(urlFilter));
    }

    filteredSessions = filteredSessions.filter(s => {
      return s.startTime >= fromTime && s.startTime <= toTime;
    });

    console.log('[Heatmap] Filtered sessions:', filteredSessions.length);

    // Calculate viewport bounds
    let maxWidth = 1920;
    let maxHeight = 1080;

    if (filteredSessions.length > 0) {
      maxWidth = Math.max(...filteredSessions.map((s: any) => s.viewport?.width || 1920));
      maxHeight = Math.max(...filteredSessions.map((s: any) => s.viewport?.height || 1080));
    }

    // Aggregate click data
    const aggregatedClicks = aggregateClicks(filteredSessions);
    console.log('[Heatmap] Aggregated clicks:', aggregatedClicks.length, 'Total count:', aggregatedClicks.reduce((sum, p) => sum + p.count, 0));

    // Calculate total clicks
    const totalClicks = aggregatedClicks.reduce((sum, point) => sum + point.count, 0);

    const heatmapData: HeatmapData = {
      clicks: aggregatedClicks,
      totalSessions: filteredSessions.length,
      totalClicks,
      viewport: {
        maxWidth,
        maxHeight,
      },
      timeRange: {
        from: fromTime,
        to: toTime,
      },
    };

    return NextResponse.json({
      success: true,
      heatmap: heatmapData,
    });
  } catch (error) {
    console.error('Error aggregating heatmap:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate heatmap data' },
      { status: 500 }
    );
  }
}
