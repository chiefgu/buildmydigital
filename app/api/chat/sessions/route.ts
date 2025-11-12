import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sessions = db.getAllActiveSessions();

    // Get messages for each session
    const sessionsWithMessages = sessions.map(session => ({
      ...session,
      messages: db.getMessages(session.id),
      unreadCount: db.getMessages(session.id).filter(m =>
        m.sender === 'user' &&
        new Date(m.timestamp) > session.lastMessageAt
      ).length,
    }));

    // Sort by most recent activity
    sessionsWithMessages.sort((a, b) =>
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );

    return NextResponse.json({
      sessions: sessionsWithMessages,
      isAnyTeamOnline: db.isAnyTeamOnline(),
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
