import { NextRequest, NextResponse } from 'next/server';
import { createTouchpoint } from '@/lib/attribution';
import { addTouchpoint, getOrCreateJourney } from '@/lib/attributionStorage';

/**
 * POST /api/attribution/track
 * Track user touchpoints (page views) and engagement metrics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, url, title, referrer, userId, timeOnPage, scrollDepth, engaged } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      );
    }

    if (type === 'pageview') {
      // Create touchpoint from page view
      const userAgent = request.headers.get('user-agent') || undefined;

      const touchpoint = createTouchpoint({
        url,
        title,
        referrer,
        userAgent,
      });

      // Add to user journey
      addTouchpoint(userId, touchpoint);

      return NextResponse.json({
        success: true,
        touchpoint: {
          id: touchpoint.id,
          channel: touchpoint.channel,
          source: touchpoint.source,
          path: touchpoint.path,
        },
      });
    } else if (type === 'engagement') {
      // Update last touchpoint with engagement metrics
      const journey = getOrCreateJourney(userId);

      if (journey.touchpoints.length > 0) {
        const lastTouchpoint = journey.touchpoints[journey.touchpoints.length - 1];
        lastTouchpoint.timeOnPage = timeOnPage;
        lastTouchpoint.scrollDepth = scrollDepth;
        lastTouchpoint.engaged = engaged;

        console.log('[Attribution] Engagement metrics updated:', {
          userId,
          path: lastTouchpoint.path,
          timeOnPage: `${(timeOnPage / 1000).toFixed(1)}s`,
          scrollDepth: `${scrollDepth}%`,
          engaged,
        });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Attribution Track] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track attribution' },
      { status: 500 }
    );
  }
}
