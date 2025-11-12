import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions } from '@/lib/intentStorage';

/**
 * GET /api/intent/analytics
 * Get intent scoring analytics and statistics
 */
export async function GET(request: NextRequest) {
  try {
    const sessions = getAllSessions();

    if (sessions.length === 0) {
      return NextResponse.json({
        success: true,
        totalSessions: 0,
        averageScore: 0,
        highIntentCount: 0,
        mediumIntentCount: 0,
        lowIntentCount: 0,
        topSignals: [],
        scoreDistribution: {},
      });
    }

    // Calculate statistics
    const totalScore = sessions.reduce((sum, s) => sum + s.totalScore, 0);
    const averageScore = totalScore / sessions.length;

    // Count by intent level
    const highIntentCount = sessions.filter(s => s.totalScore >= 70).length;
    const mediumIntentCount = sessions.filter(
      s => s.totalScore >= 40 && s.totalScore < 70
    ).length;
    const lowIntentCount = sessions.filter(s => s.totalScore < 40).length;

    // Get top signals (most common actions)
    const signalCounts = new Map<string, number>();
    sessions.forEach(session => {
      session.signals.forEach(signal => {
        signalCounts.set(signal.action, (signalCounts.get(signal.action) || 0) + 1);
      });
    });

    const topSignals = Array.from(signalCounts.entries())
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Score distribution (buckets of 10)
    const scoreDistribution: Record<string, number> = {};
    for (let i = 0; i <= 100; i += 10) {
      const bucket = `${i}-${i + 9}`;
      scoreDistribution[bucket] = sessions.filter(
        s => s.totalScore >= i && s.totalScore < i + 10
      ).length;
    }

    return NextResponse.json({
      success: true,
      totalSessions: sessions.length,
      averageScore: Math.round(averageScore),
      highIntentCount,
      mediumIntentCount,
      lowIntentCount,
      topSignals,
      scoreDistribution,
    });
  } catch (error) {
    console.error('[Intent Analytics] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get intent analytics' },
      { status: 500 }
    );
  }
}
