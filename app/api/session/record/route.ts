import { NextRequest, NextResponse } from 'next/server';
import { SessionRecording, generateHeatmapData, FrictionEvent } from '@/lib/sessionRecording';
import {
  sessionRecordings,
  heatmapData,
  storeSession,
  storeHeatmap,
  getAllSessions,
  getSession,
  getHeatmap
} from '@/lib/sessionStorage';

// Track which sessions have already been notified to prevent spam
const notifiedSessions = new Set<string>();

/**
 * Send Telegram notification for high-friction sessions
 * Only sends ONCE per session to prevent spam
 */
async function notifyHighFriction(sessionId: string, frictionEvents: FrictionEvent[]) {
  // Check if friction notifications are disabled
  if (process.env.DISABLE_FRICTION_NOTIFICATIONS === 'true') {
    return;
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  // Only notify if there are significant friction events (5+ to reduce false positives)
  if (frictionEvents.length < 5) return;

  // Check if we've already notified for this session
  if (notifiedSessions.has(sessionId)) {
    return; // Already notified, don't spam
  }

  // Mark this session as notified
  notifiedSessions.add(sessionId);

  try {
    const rageClicks = frictionEvents.filter(e => e.type === 'rage_click');
    const deadClicks = frictionEvents.filter(e => e.type === 'dead_click');

    let message = `⚠️ HIGH FRICTION SESSION DETECTED\n\n`;
    message += `Session ID: ${sessionId}\n`;
    message += `Total Friction Events: ${frictionEvents.length}\n\n`;

    if (rageClicks.length > 0) {
      message += `🔴 Rage Clicks: ${rageClicks.length}\n`;
      rageClicks.slice(0, 3).forEach(e => {
        message += `  • ${e.element} (${e.count}x clicks)\n`;
      });
    }

    if (deadClicks.length > 0) {
      message += `\n💀 Dead Clicks: ${deadClicks.length}\n`;
      deadClicks.slice(0, 3).forEach(e => {
        message += `  • ${e.element}\n`;
      });
    }

    message += `\n⚠️ User experiencing issues - review session replay!`;

    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    console.log('[Session] High friction notification sent');
  } catch (error) {
    console.error('[Session] Error sending friction notification:', error);
  }
}

/**
 * POST /api/session/record
 * Store a session recording
 */
export async function POST(request: NextRequest) {
  try {
    const recording: SessionRecording = await request.json();

    if (!recording.sessionId || !recording.events) {
      return NextResponse.json(
        { error: 'Invalid recording data' },
        { status: 400 }
      );
    }

    // Store the recording
    sessionRecordings.set(recording.sessionId, recording);
    console.log(`[Session] Stored recording. Total sessions now: ${sessionRecordings.size}`);

    // Generate and store heatmap data
    const heatmap = generateHeatmapData(recording);
    heatmapData.set(recording.sessionId, heatmap);

    // Check for high friction (5+ events to reduce noise)
    if (recording.frictionEvents && recording.frictionEvents.length >= 5) {
      await notifyHighFriction(recording.sessionId, recording.frictionEvents);
    }

    console.log(`[Session] Recording saved: ${recording.sessionId} (${recording.events.length} events, ${recording.frictionEvents.length} friction)`);

    return NextResponse.json({
      success: true,
      sessionId: recording.sessionId,
      eventsRecorded: recording.events.length,
      frictionDetected: recording.frictionEvents.length,
    });
  } catch (error) {
    console.error('[Session] Error storing recording:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/session/record?sessionId=xxx
 * Get a session recording
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const getAll = searchParams.get('all') === 'true';

    if (getAll) {
      // Return all sessions (summary only)
      const sessions = Array.from(sessionRecordings.values()).map(s => ({
        sessionId: s.sessionId,
        startTime: s.startTime,
        endTime: s.endTime,
        duration: s.duration,
        eventsCount: s.events.length,
        frictionCount: s.frictionEvents.length,
        url: s.url,
        viewport: s.viewport,
      }));

      return NextResponse.json({ sessions });
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      );
    }

    const recording = sessionRecordings.get(sessionId);

    if (!recording) {
      return NextResponse.json(
        { error: 'Recording not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ recording });
  } catch (error) {
    console.error('[Session] Error retrieving recording:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/session/record/heatmap?sessionId=xxx
 * Get heatmap data for a session
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      );
    }

    const heatmap = heatmapData.get(sessionId);

    if (!heatmap) {
      return NextResponse.json(
        { error: 'Heatmap not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ heatmap });
  } catch (error) {
    console.error('[Session] Error retrieving heatmap:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
