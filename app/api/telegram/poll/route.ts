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

let lastUpdateId = 0;

export async function GET(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const teamChatId = process.env.TELEGRAM_TEAM_CHAT_ID;

  if (!token || !teamChatId) {
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 });
  }

  try {
    // Get updates from Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`
    );
    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json({ error: 'Failed to get updates' }, { status: 500 });
    }

    const updates = data.result || [];
    let processedCount = 0;

    for (const update of updates) {
      // Update the lastUpdateId to avoid processing same message twice
      if (update.update_id > lastUpdateId) {
        lastUpdateId = update.update_id;
      }

      // Process messages
      if (update.message) {
        const message = update.message;
        const chatId = message.chat.id.toString();

        // Only process messages from the team chat
        if (chatId !== teamChatId) {
          continue;
        }

        // Skip messages from our bot (confirmation messages)
        // Check if message is from the bot by: is_bot flag, username, or first_name
        if (
          message.from.is_bot ||
          message.from.username === 'BuildmyDigital_bot' ||
          message.from.first_name === 'BMD CHAT'
        ) {
          continue;
        }

        // Skip messages that are just media without text (bot notifications)
        if (!message.text) {
          continue;
        }

        // Check if this message is in a topic
        if (message.message_thread_id) {
          await handleTeamReply(message);
          processedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount,
      lastUpdateId,
    });

  } catch (error) {
    console.error('Telegram polling error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle team member replying in Telegram Topics
async function handleTeamReply(message: any) {
  try {
    // Get the topic ID from the message
    const topicId = message.message_thread_id;

    console.log('[Telegram] 📨 Processing reply in topic:', topicId);
    console.log('[Telegram] Message from:', message.from.first_name, message.from.username);
    console.log('[Telegram] Message text:', message.text);

    // Show all sessions BEFORE lookup
    const allSessions = db.getAllActiveSessions();
    console.log('[Telegram] 📊 Total active sessions:', allSessions.length);
    console.log('[Telegram] 📊 All sessions with topic IDs:', allSessions.map(s => ({
      sessionId: s.id.substring(0, 12),
      topicId: s.telegramTopicId,
      userName: s.userName,
    })));

    // Find the session by topic ID
    console.log('[Telegram] 🔍 Searching for session with topic ID:', topicId, '(type:', typeof topicId, ')');
    const session = db.getSessionByTelegramTopic(topicId);

    if (!session) {
      console.log('[Telegram] ❌ No session found for topic ID:', topicId);
      console.log('[Telegram] 🔍 Searching with manual filter...');
      const manualSearch = allSessions.filter(s => {
        console.log(`   - Session ${s.id.substring(0, 12)}: topicId=${s.telegramTopicId} (type: ${typeof s.telegramTopicId}), match: ${s.telegramTopicId === topicId}`);
        return s.telegramTopicId === topicId;
      });
      console.log('[Telegram] Manual search results:', manualSearch.length);
      return;
    }

    console.log('[Telegram] ✅ Found session:', session.id);

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
