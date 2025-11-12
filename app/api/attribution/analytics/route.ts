import { NextRequest, NextResponse } from 'next/server';
import {
  getAllConversions,
  getAllTouchpoints,
  getAllJourneys,
} from '@/lib/attributionStorage';
import { calculateChannelPerformance, aggregateByChannel } from '@/lib/attribution';

/**
 * GET /api/attribution/analytics
 * Get attribution analytics and channel performance
 *
 * Query params:
 * - startDate: Unix timestamp (optional)
 * - endDate: Unix timestamp (optional)
 * - model: Attribution model (first-touch, last-touch, linear, time-decay, position-based)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate')
      ? parseInt(searchParams.get('startDate')!)
      : 0;
    const endDate = searchParams.get('endDate')
      ? parseInt(searchParams.get('endDate')!)
      : Date.now();
    const model = searchParams.get('model') || 'linear';

    // Get all data
    const allConversions = getAllConversions();
    const allTouchpoints = getAllTouchpoints();
    const allJourneys = getAllJourneys();

    // Filter by date range
    const conversions = allConversions.filter(
      conv => conv.timestamp >= startDate && conv.timestamp <= endDate
    );

    // Calculate channel performance
    const channelPerformance = calculateChannelPerformance(
      conversions,
      allTouchpoints
    );

    // Get top converting pages
    const pageConversions = new Map<string, number>();
    conversions.forEach(conv => {
      conv.journey.touchpoints.forEach(tp => {
        pageConversions.set(tp.path, (pageConversions.get(tp.path) || 0) + 1);
      });
    });

    const topPages = Array.from(pageConversions.entries())
      .map(([path, conversions]) => ({ path, conversions }))
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, 10);

    // Calculate attribution by selected model
    const attributionByChannel = new Map<string, { credit: number; value: number }>();

    conversions.forEach(conv => {
      let attributionResults;

      switch (model) {
        case 'first-touch':
          attributionResults = [conv.attribution.firstTouch];
          break;
        case 'last-touch':
          attributionResults = [conv.attribution.lastTouch];
          break;
        case 'time-decay':
          attributionResults = conv.attribution.timeDecay;
          break;
        case 'position-based':
          attributionResults = conv.attribution.positionBased;
          break;
        case 'linear':
        default:
          attributionResults = conv.attribution.linear;
          break;
      }

      const channelAgg = aggregateByChannel(attributionResults);
      channelAgg.forEach((data, channel) => {
        const existing = attributionByChannel.get(channel) || { credit: 0, value: 0 };
        attributionByChannel.set(channel, {
          credit: existing.credit + data.credit,
          value: existing.value + data.value,
        });
      });
    });

    const attributionBreakdown = Array.from(attributionByChannel.entries()).map(
      ([channel, data]) => ({
        channel,
        credit: data.credit,
        value: data.value,
        percentage: conversions.length > 0 ? (data.credit / conversions.length) * 100 : 0,
      })
    );

    // Journey metrics
    const avgTouchpoints =
      allJourneys.reduce((sum, j) => sum + j.touchpointCount, 0) /
      (allJourneys.length || 1);

    const convertedJourneys = allJourneys.filter(j => j.converted);
    const avgTimeToConversion =
      convertedJourneys.reduce((sum, j) => sum + j.daysSinceFirstTouch, 0) /
      (convertedJourneys.length || 1);

    // Summary stats
    const summary = {
      totalVisits: allTouchpoints.length,
      totalConversions: conversions.length,
      conversionRate:
        allTouchpoints.length > 0
          ? (conversions.length / allTouchpoints.length) * 100
          : 0,
      avgTouchpoints: avgTouchpoints.toFixed(1),
      avgTimeToConversion: avgTimeToConversion.toFixed(1),
      totalRevenue: conversions.reduce((sum, c) => sum + c.value, 0),
    };

    return NextResponse.json({
      success: true,
      summary,
      channelPerformance: channelPerformance.sort(
        (a, b) => b.totalRevenue - a.totalRevenue
      ),
      attributionBreakdown: attributionBreakdown.sort(
        (a, b) => b.percentage - a.percentage
      ),
      topPages,
      model,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error('[Attribution Analytics] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get attribution analytics' },
      { status: 500 }
    );
  }
}
