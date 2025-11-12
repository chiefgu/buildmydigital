import { NextRequest, NextResponse } from 'next/server';

// Helper endpoint to get your Telegram group chat ID
// Visit: http://localhost:3000/api/telegram/get-chat-id after sending a message in your group

export async function GET(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN not configured' }, { status: 500 });
  }

  try {
    // Get recent updates
    const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json({ error: 'Failed to get updates', details: data }, { status: 500 });
    }

    // Extract chat IDs from recent messages
    const chats = data.result
      .filter((update: any) => update.message?.chat)
      .map((update: any) => ({
        chatId: update.message.chat.id,
        chatTitle: update.message.chat.title || update.message.chat.first_name,
        chatType: update.message.chat.type,
        lastMessage: update.message.text || '[media]',
      }));

    // Remove duplicates
    const uniqueChats = Array.from(
      new Map(chats.map((chat: any) => [chat.chatId, chat])).values()
    );

    return NextResponse.json({
      success: true,
      instructions: [
        '1. Send a message in your Telegram group',
        '2. Refresh this page',
        '3. Copy the chat ID for your group',
        '4. Add it to .env.local as TELEGRAM_TEAM_CHAT_ID',
      ],
      chats: uniqueChats,
    });

  } catch (error) {
    console.error('Error getting chat ID:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
