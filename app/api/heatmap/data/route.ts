import { NextResponse } from 'next/server';
import { getAllSessions } from '@/lib/sessionStorage';

/**
 * GET /api/heatmap/data
 * Returns session recordings and aggregated heatmap statistics for the admin dashboard
 */

export async function GET() {
  try {
    const sessions = getAllSessions();

    // Calculate total clicks across all sessions
    const totalClicks = sessions.reduce((sum, session) => {
      const clickEvents = session.events.filter(e => e.type === 'click');
      return sum + clickEvents.length;
    }, 0);

    // Calculate average session duration
    const sessionsWithDuration = sessions.filter(s => s.duration && s.duration > 0);
    const averageSessionDuration = sessionsWithDuration.length > 0
      ? sessionsWithDuration.reduce((sum, s) => sum + (s.duration || 0), 0) / sessionsWithDuration.length
      : 0;

    return NextResponse.json({
      sessions,
      heatmap: {
        totalClicks,
        averageSessionDuration: Math.round(averageSessionDuration),
      },
    });
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    return NextResponse.json(
      {
        sessions: [],
        heatmap: {
          totalClicks: 0,
          averageSessionDuration: 0,
        },
      },
      { status: 500 }
    );
  }
}
