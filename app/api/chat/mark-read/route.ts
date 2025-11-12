import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    // Mark all messages in this session as read
    db.markSessionAsRead(sessionId);

    console.log(`[Mark Read] Marked session ${sessionId} as read`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking session as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark as read' },
      { status: 500 }
    );
  }
}
