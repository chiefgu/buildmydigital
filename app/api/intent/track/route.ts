import { NextRequest, NextResponse } from 'next/server';
import {
  IntentSignal,
  IntentScore,
  calculateIntentScore,
  getLeadCategory,
  generateScoreSummary,
  SCORE_THRESHOLDS
} from '@/lib/intentScoring';
import {
  getOrCreateIntentScore,
  updateIntentScore,
  getIntentScore,
} from '@/lib/intentStorage';

/**
 * Send Telegram notification for hot leads
 */
async function notifyHotLead(intentScore: IntentScore) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('[Intent] Telegram not configured, skipping notification');
    return;
  }

  try {
    const summary = generateScoreSummary(intentScore);
    const userInfo = intentScore.userInfo;

    let message = `🔥 HOT LEAD ALERT! 🔥\n\n`;

    if (userInfo?.name || userInfo?.email || userInfo?.company) {
      message += `👤 Contact Info:\n`;
      if (userInfo.name) message += `  Name: ${userInfo.name}\n`;
      if (userInfo.email) message += `  Email: ${userInfo.email}\n`;
      if (userInfo.company) message += `  Company: ${userInfo.company}\n`;
      message += `\n`;
    }

    message += summary;
    message += `\n\n⚡ Action Required: Follow up immediately!`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    console.log('[Intent] Hot lead notification sent to Telegram');
  } catch (error) {
    console.error('[Intent] Error sending Telegram notification:', error);
  }
}

/**
 * POST /api/intent/track
 * Track an intent signal
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action, points, metadata, timestamp } = body;

    if (!sessionId || !action || typeof points !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create intent score for this session
    const intentScore = getOrCreateIntentScore(sessionId);

    // Add the new signal
    const signal: IntentSignal = {
      action,
      points,
      timestamp: new Date(timestamp),
      metadata,
    };

    intentScore.signals.push(signal);
    intentScore.totalScore = calculateIntentScore(intentScore.signals);
    intentScore.lastUpdated = new Date();

    const wasHotLead = intentScore.isHotLead;
    intentScore.isHotLead = intentScore.totalScore >= SCORE_THRESHOLDS.HOT_LEAD;

    // Store updated score
    updateIntentScore(sessionId, intentScore);

    // Send notification if this is a new hot lead
    if (intentScore.isHotLead && !wasHotLead) {
      console.log(`[Intent] 🔥 New hot lead detected! Score: ${intentScore.totalScore}`);
      await notifyHotLead(intentScore);
    }

    const category = getLeadCategory(intentScore.totalScore);

    return NextResponse.json({
      success: true,
      score: intentScore.totalScore,
      category,
      isHotLead: intentScore.isHotLead,
    });
  } catch (error) {
    console.error('[Intent] Error tracking signal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/intent/track?sessionId=xxx
 * Get intent score for a session
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      );
    }

    const intentScore = getIntentScore(sessionId);

    if (!intentScore) {
      return NextResponse.json({
        sessionId,
        totalScore: 0,
        signals: [],
        isHotLead: false,
        category: 'browsing',
      });
    }

    const category = getLeadCategory(intentScore.totalScore);

    return NextResponse.json({
      sessionId: intentScore.sessionId,
      totalScore: intentScore.totalScore,
      signals: intentScore.signals,
      isHotLead: intentScore.isHotLead,
      category,
      userInfo: intentScore.userInfo,
    });
  } catch (error) {
    console.error('[Intent] Error getting score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/intent/track
 * Update user info for a session
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userInfo } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    const intentScore = getIntentScore(sessionId);
    if (!intentScore) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update user info
    intentScore.userInfo = {
      ...intentScore.userInfo,
      ...userInfo,
    };

    updateIntentScore(sessionId, intentScore);

    // If this is a hot lead and we just got contact info, send updated notification
    if (intentScore.isHotLead && userInfo.email) {
      await notifyHotLead(intentScore);
    }

    return NextResponse.json({
      success: true,
      score: intentScore.totalScore,
    });
  } catch (error) {
    console.error('[Intent] Error updating user info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
