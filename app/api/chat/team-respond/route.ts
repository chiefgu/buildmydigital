import { NextRequest, NextResponse } from 'next/server';
import { db, Message } from '@/lib/db';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { text, sessionId, agentName, agentId } = await request.json();

    if (!text || !sessionId || !agentName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get session
    const session = db.getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Add team message
    const teamMessage: Message = {
      id: `${Date.now()}-agent`,
      sessionId,
      text,
      sender: 'agent',
      timestamp: new Date(),
      agentName,
      agentId,
    };

    db.addMessage(teamMessage);

    // Send to Telegram if this is a Telegram session
    if (session.source === 'telegram' && session.telegramChatId) {
      await sendTelegramMessage(session.telegramChatId, text, agentName);
    }

    // Broadcast to user's chat
    if (process.env.PUSHER_KEY) {
      await pusher.trigger(`chat-${sessionId}`, 'new-message', teamMessage);
    }

    return NextResponse.json({
      success: true,
      message: teamMessage,
    });

  } catch (error) {
    console.error('Team respond error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send messages to Telegram
async function sendTelegramMessage(chatId: string, text: string, agentName?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn('Telegram bot token not configured');
    return;
  }

  try {
    const formattedText = agentName
      ? `💬 <b>${agentName}</b>\n\n${text}`
      : text;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedText,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}
