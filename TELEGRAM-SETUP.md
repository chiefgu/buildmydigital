# Telegram Bot Integration Setup Guide

## ✅ Integration Complete!

Your chat system now supports Telegram! Users can message your Telegram bot and you'll see their messages in your dashboard.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Your Telegram Bot

1. Open Telegram app (on phone or desktop)
2. Search for **@BotFather**
3. Start a conversation
4. Send: `/newbot`
5. Follow the prompts:
   - Choose bot name (e.g., "BUILDMYDIGITAL Support")
   - Choose username (must end in `bot`, e.g., `BuildMyDigitalBot`)
6. **Copy the API token** (looks like: `6234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Add Token to Environment Variables

Add to your `.env.local` file:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-bot-token-here
```

### Step 3: Deploy Your Webhook (Production)

Your webhook endpoint is: `https://yourdomain.com/api/telegram/webhook`

**Option A: Using Telegram API Directly**

```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com/api/telegram/webhook"}'
```

Replace:
- `<YOUR_BOT_TOKEN>` with your actual token
- `yourdomain.com` with your production domain

**Option B: Using Browser**

Visit this URL (replace the placeholders):
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/api/telegram/webhook
```

### Step 4: Test It!

1. Search for your bot in Telegram (e.g., `@BuildMyDigitalBot`)
2. Send `/start` to begin
3. Send a message
4. Check your dashboard - the message should appear!

---

## 🧪 Local Development Testing

For local testing, you need to expose your local server to the internet. Use one of these:

### Option 1: ngrok (Recommended)

1. Install ngrok: https://ngrok.com/download
2. Run your dev server: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
5. Set webhook:
   ```bash
   curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
     -H "Content-Type: application/json" \
     -d '{"url": "https://abc123.ngrok.io/api/telegram/webhook"}'
   ```

### Option 2: Cloudflare Tunnel

1. Install: `npm install -g cloudflared`
2. Run: `cloudflared tunnel --url localhost:3000`
3. Use the provided URL to set webhook

---

## 📱 Features Supported

### Incoming Messages
- ✅ **Text messages** - All text appears in dashboard
- ✅ **Photos** - Displayed with media URL
- ✅ **Videos** - Link provided in dashboard
- ✅ **Documents** - File name and link shown
- ✅ **Voice messages** - Audio file link provided
- ✅ **Captions** - Image/video captions included

### Outgoing Messages
- ✅ **Agent responses** - Sent from dashboard to user
- ✅ **Agent name** - Shows who replied
- ✅ **HTML formatting** - Bold, italic, etc.

---

## 🎨 Dashboard Features

### Message Source Indicators
- 📱 **Blue badge** = Telegram message
- 🌐 **Purple badge** = Website chat
- Hover over badge to see source

### User Display
- Shows Telegram username if available (e.g., `@henry`)
- Falls back to first/last name
- Unique session per Telegram chat

---

## 🔧 Advanced Configuration

### Custom Welcome Message

Edit `/app/api/telegram/webhook/route.ts` around line 30:

```typescript
await sendTelegramMessage(chatId,
  "👋 Welcome to BUILDMYDIGITAL Support!\n\n" +
  "Your custom message here..."
);
```

### Add Bot Commands

In BotFather:
1. Send `/mybots`
2. Select your bot
3. Click "Edit Commands"
4. Add commands like:
   ```
   start - Start conversation
   help - Get help
   status - Check support hours
   ```

### Enable Group Chat Support

By default, bot only works in private chats. To enable groups:

1. In BotFather, send `/mybots`
2. Select your bot
3. Click "Group Privacy"
4. Disable privacy mode

Then update your webhook handler to process group messages.

---

## 🚨 Troubleshooting

### Webhook Not Working

Check webhook status:
```bash
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
```

Should return:
```json
{
  "ok": true,
  "result": {
    "url": "https://yourdomain.com/api/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

### Delete Webhook (for testing)

```bash
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook
```

### Messages Not Appearing in Dashboard

1. Check server logs for errors
2. Verify `TELEGRAM_BOT_TOKEN` in `.env.local`
3. Restart your dev server
4. Ensure Pusher is configured (for real-time updates)

### Bot Not Responding

1. Check the webhook URL is correct
2. Verify your server is accessible from internet
3. Check Telegram API status: https://telegram.org/api/status

---

## 💰 Pricing

**Telegram Bot API is 100% FREE!**
- ✅ Unlimited messages
- ✅ No monthly fees
- ✅ No setup costs
- ✅ Unlimited users

---

## 🔐 Security Best Practices

### Production Checklist

- [ ] Use HTTPS (required by Telegram)
- [ ] Keep bot token secret (never commit to git)
- [ ] Validate incoming webhooks (optional, add secret token)
- [ ] Rate limit requests
- [ ] Handle errors gracefully
- [ ] Log important events

### Add Webhook Secret (Optional)

Update webhook with secret token:
```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com/api/telegram/webhook", "secret_token": "your-secret-here"}'
```

Then verify in your handler:
```typescript
const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
if (secretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## 📚 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Webhook Guide](https://core.telegram.org/bots/webhooks)

---

## 🎉 What's Next?

Your Telegram integration is ready! You can now:

1. Share your bot link: `https://t.me/YourBotUsername`
2. Add bot link to your website
3. Use QR code for easy access
4. Monitor conversations in dashboard

**All messages from Telegram will appear alongside your website chat!** 🚀
