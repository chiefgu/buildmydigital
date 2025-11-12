# Chat System Setup Guide

##  What's Been Built

Your custom live chat system is now complete with:

- ✅ **Beautiful chat widget** matching your brand design
- ✅ **Real-time messaging** via Pusher
- ✅ **AI assistant** (OpenAI GPT-4) for automated responses when offline
- ✅ **Team/AI switching** - automatic based on online status
- ✅ **Message persistence** (in-memory, ready for database migration)
- ✅ **API routes** for sending/receiving messages

## 🚀 Quick Start

### 1. Get Your API Keys

#### OpenAI (for AI responses)
1. Go to https://platform.openai.com/api-keys
2. Sign up / Log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Cost**: ~$0.01-0.03 per conversation (very affordable)

#### Pusher (for real-time messaging)
1. Go to https://dashboard.pusher.com/accounts/sign_up
2. Create a free account
3. Create a new Channels app
4. Select "React" as your frontend and "Node.js" as your backend
5. Copy your credentials:
   - App ID
   - Key
   - Secret
   - Cluster (e.g., 'eu')
6. **Free tier**: 200k messages/day, 100 concurrent connections

### 2. Configure Environment Variables

Create a file named `.env.local` in your project root:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-your-actual-key-here

# Pusher Configuration (Server-side)
PUSHER_APP_ID=your-app-id
PUSHER_KEY=your-key-here
PUSHER_SECRET=your-secret-here
PUSHER_CLUSTER=eu

# Pusher Configuration (Client-side - exposed to browser)
NEXT_PUBLIC_PUSHER_KEY=your-key-here
NEXT_PUBLIC_PUSHER_CLUSTER=eu
```

**Important**: Never commit `.env.local` to git! It's already in `.gitignore`.

### 3. Test the Chat

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3003

3. Click the orange chat button in the bottom-right

4. Send a message - you should get an AI response!

## 📱 How It Works

### User Sends Message:
1. Message appears immediately in chat
2. Sent to `/api/chat/send` API route
3. API checks if team is online
4. **If offline**: OpenAI generates response
5. **If online**: Message queued for team response
6. Response sent back via Pusher (real-time) or HTTP

### Real-Time Updates:
- Each chat session has a unique Pusher channel (`chat-{sessionId}`)
- Messages broadcast to that channel
- Both user and team see updates instantly

### AI Assistant:
- Uses GPT-4 for intelligent responses
- Knows about your services and pricing
- Trained on your business context
- Encourages bookings and free audits

## 🎛️ Team Dashboard (Coming Next)

The next phase will include:
- Dashboard at `/dashboard/chat`
- See all active conversations
- Respond to messages in real-time
- Set your online/offline status
- View chat history

**Time to build**: ~3-4 hours

Would you like me to build the team dashboard now?

## 💾 Database Migration (Future)

Currently using in-memory storage (resets on server restart).

For production, migrate to:
- **PostgreSQL** via Vercel Postgres ($20/mo, recommended)
- **Supabase** (free tier available)
- **MySQL** or any SQL database

Migration is straightforward - just replace `/lib/db.ts` with database queries.

## 🔧 Customization

### Change AI Personality
Edit the system prompt in `/app/api/chat/send/route.ts` (line 62-78)

### Modify Chat UI
Edit `/components/ChatWidget.tsx`

### Add Features
- Email notifications when new chat arrives
- Save chat transcripts
- Add file upload
- Integrate with CRM

## 💰 Monthly Costs

**Minimal Setup (AI only)**:
- OpenAI: ~$5-15/mo (depends on usage)
- Pusher Free: $0
- **Total: $5-15/mo**

**With Database**:
- Add Vercel Postgres: +$20/mo
- Or Supabase: $0 (free tier)

**Much cheaper than Crisp/Intercom** ($60-100/mo) and you own the code!

## 🐛 Troubleshooting

### "Pusher key not configured" warning
- Add `NEXT_PUBLIC_PUSHER_KEY` to `.env.local`
- Restart dev server

### AI not responding
- Check `OPENAI_API_KEY` is correct
- Verify you have credits in OpenAI account
- Check browser console for errors

### Messages not appearing
- Check Pusher credentials are correct
- Verify cluster setting matches your Pusher app
- Check network tab for failed API calls

## 📞 Support

Issues? Check:
1. Browser console for errors
2. Terminal for server logs
3. Pusher dashboard for connection status
4. OpenAI dashboard for API usage

---

**Status**: Core chat system complete and functional!
**Next**: Team dashboard for responding to chats
