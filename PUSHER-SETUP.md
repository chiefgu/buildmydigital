# Pusher Channels Setup (5 minutes)

## Step 1: Create Pusher Account

1. Go to https://dashboard.pusher.com/accounts/sign_up
2. Sign up with email or GitHub
3. Verify your email

## Step 2: Create a Channels App

1. After login, click **"Create app"** or **"Channels apps"** in sidebar
2. Fill in:
   - **App name**: `BUILDMYDIGITAL Chat` (or any name)
   - **Cluster**: Select `eu` (Europe) - closer = faster
   - **Tech stack**:
     - Frontend: **React**
     - Backend: **Node.js**
3. Click **"Create app"**

## Step 3: Get Your Credentials

You'll see a screen with your credentials:

```
App ID: 1234567
Key: abcdef123456
Secret: xyz789secret
Cluster: eu
```

## Step 4: Add to .env.local

Open `/Users/henry/Desktop/BUILDMYDIGITAL/buildmydigital-site/.env.local` and fill in:

```bash
PUSHER_APP_ID=1234567
PUSHER_KEY=abcdef123456
PUSHER_SECRET=xyz789secret
PUSHER_CLUSTER=eu

NEXT_PUBLIC_PUSHER_KEY=abcdef123456
NEXT_PUBLIC_PUSHER_CLUSTER=eu
```

**Important**:
- `PUSHER_KEY` appears twice (once for server, once for client)
- Make sure `NEXT_PUBLIC_PUSHER_KEY` = `PUSHER_KEY` (same value!)

## Step 5: Restart Server

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test!

1. Open http://localhost:3003
2. Click the orange chat button
3. Send a message like "What services do you offer?"
4. You should get an AI response from Gemini!

## Troubleshooting

### "Pusher key not configured" warning
- Make sure you added `NEXT_PUBLIC_PUSHER_KEY` to `.env.local`
- Restart dev server after adding keys

### Messages not appearing
- Check all 6 Pusher values are filled in `.env.local`
- Verify cluster matches (eu, us2, ap1, etc.)
- Check Pusher dashboard > "Debug Console" for connection errors

### Still not working?
Check browser console (F12) and terminal for error messages.

---

## Free Tier Limits

Pusher Channels free tier includes:
- ✅ 200,000 messages per day
- ✅ 100 concurrent connections
- ✅ Unlimited channels

**Perfect for testing and small sites!**

Upgrade only if you exceed these limits (~$49/mo for next tier).
