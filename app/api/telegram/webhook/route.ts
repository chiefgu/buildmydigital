import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
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
    const update = await request.json();

    // Handle messages from team group
    if (update.message) {
      const message = update.message;
      const chatId = message.chat.id.toString();
      const teamChatId = process.env.TELEGRAM_TEAM_CHAT_ID;

      // Only process messages from the team chat
      if (chatId !== teamChatId) {
        return NextResponse.json({ ok: true });
      }

      // Skip messages from our bot (confirmation messages)
      if (
        message.from.is_bot ||
        message.from.username === 'BuildmyDigital_bot' ||
        message.from.first_name === 'BMD CHAT'
      ) {
        return NextResponse.json({ ok: true });
      }

      // Skip messages that are just media without text
      if (!message.text) {
        return NextResponse.json({ ok: true });
      }

      // Check if this message is in a topic (has message_thread_id)
      if (message.message_thread_id) {
        await handleTeamReply(message);
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: true }); // Always return ok to Telegram
  }
}

// Handle team member replying in Telegram Topics
async function handleTeamReply(message: any) {
  try {
    // Get the topic ID from the message
    const topicId = message.message_thread_id;

    // Find the session by topic ID
    const session = db.getSessionByTelegramTopic(topicId);

    if (!session) {
      console.log('No session found for Telegram topic ID:', topicId);
      return;
    }

    // Get agent name
    const agentName = message.from.first_name + (message.from.last_name ? ` ${message.from.last_name}` : '');
    const replyText = message.text || '[Media]';

    // Add message to database
    const teamMessage = {
      id: `${Date.now()}-agent-telegram`,
      sessionId: session.id,
      text: replyText,
      sender: 'agent' as const,
      timestamp: new Date(),
      agentName,
    };

    db.addMessage(teamMessage);

    // Send to website user via Pusher
    if (process.env.PUSHER_KEY) {
      await pusher.trigger(`chat-${session.id}`, 'new-message', teamMessage);
    }

    // Also broadcast to dashboard
    if (process.env.PUSHER_KEY) {
      await pusher.trigger('team-dashboard', 'new-agent-message', {
        sessionId: session.id,
        message: teamMessage,
      });
    }

    // Send confirmation back to Telegram topic
    await sendConfirmationToTelegram(session, agentName, topicId);

    console.log(`Reply from ${agentName} sent to session ${session.id}`);

  } catch (error) {
    console.error('Error handling team reply:', error);
  }
}

// Send a quick confirmation in the topic
async function sendConfirmationToTelegram(session: any, agentName: string, topicId: number) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_TEAM_CHAT_ID;

  if (!token || !chatId || !topicId) return;

  try {
    // Send a subtle confirmation to the topic
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_thread_id: topicId,
        text: `✅ <i>${agentName}'s reply sent to website user</i>`,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    // Silently fail - not critical
  }
}
