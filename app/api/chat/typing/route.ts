import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher (server-side)
const pusher = process.env.PUSHER_APP_ID ? new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER || 'eu',
  useTLS: true,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { sessionId, isTyping, sender = 'agent' } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    // Broadcast typing indicator via Pusher
    if (pusher) {
      const channel = sender === 'user' ? 'admin-chat-updates' : `chat-${sessionId}`;
      const event = sender === 'user' ? 'user-typing' : 'agent-typing';

      await pusher.trigger(channel, event, {
        sessionId,
        isTyping,
        sender,
        timestamp: new Date().toISOString(),
      });

      console.log(`[Typing] Sent ${event} indicator for session ${sessionId}: ${isTyping}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling typing indicator:', error);
    return NextResponse.json(
      { error: 'Failed to send typing indicator' },
      { status: 500 }
    );
  }
}
