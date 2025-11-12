# Admin Dashboard - BUILDMYDIGITAL

Comprehensive admin panel for analytics, monitoring, and insights across all marketing and sales systems.

## 🎯 Access

**Main Dashboard**: `http://localhost:3000/admin`

This serves as the central hub for all admin features with quick stats, feature cards, and system status.

## 📊 Feature Dashboards

### 1. **Heatmap Analytics** (`/admin/heatmap`)
Visual analysis of user behavior on your website.

**Features:**
- Click heatmaps with visual overlay
- Scroll depth tracking
- Session recordings playback
- Full-page screenshot visualization
- Session list with duration and click counts
- Real-time session aggregation

**Metrics Shown:**
- Total Sessions
- Total Clicks
- Average Session Duration

**Use Cases:**
- See where visitors click most
- Identify UI elements that get ignored
- Find confusing navigation patterns
- Optimize call-to-action placement

---

### 2. **Attribution Analytics** (`/admin/attribution`)
Multi-touch attribution tracking for conversion funnels.

**Features:**
- 5 attribution models (first-touch, last-touch, linear, time-decay, position-based)
- Channel performance breakdown
- Top converting pages
- Revenue attribution per channel
- Date range filtering (7d, 30d, all time)
- Conversion path visualization

**Metrics Shown:**
- Total Visits
- Total Conversions
- Conversion Rate
- Average Touchpoints
- Average Time to Conversion
- Total Revenue

**Marketing Channels Tracked:**
- 🔍 Organic Search
- 💰 Paid Search
- 📱 Paid Social
- 👥 Organic Social
- 📧 Email
- 🔗 Direct
- 🌐 Referral
- 🖼️ Display Ads
- 🤝 Affiliate

**Use Cases:**
- Calculate true ROI per marketing channel
- See complete customer journey from first touch to conversion
- Identify which content assists in conversions
- Make data-driven budget allocation decisions

---

### 3. **Intent Scoring** (`/admin/intent`)
Real-time visitor intent analysis and behavioral scoring.

**Features:**
- Intent score tracking (0-100 scale)
- Behavioral signal monitoring
- Hot lead identification (70+ score)
- Lead categorization (Hot, Warm, Cold, Browsing)
- Real-time notifications for high-intent visitors

**Metrics Shown:**
- Total Sessions
- Average Intent Score
- High Intent Visitor Count

**Tracked Signals:**
- Page views (especially pricing, contact pages)
- Time on page
- Scroll depth
- CTA clicks
- Form interactions
- Navigation patterns

**Use Cases:**
- Identify high-intent visitors in real-time
- Prioritize outreach based on behavior
- Trigger targeted campaigns for warm leads
- Qualify leads before sales contact

---

### 4. **Lead Enrichment System**
Auto-enhancement of contact form submissions.

**Features:**
- IP-based company lookup (free via ipapi.co)
- Email domain enrichment
- Automatic lead scoring (0-100)
- Letter grading (A/B/C/D)
- Auto-tagging by industry, size, location
- Pre-qualification logic
- Telegram notifications with enriched data

**Data Enriched:**
- Company name and domain
- Industry classification
- Company size
- Location (city, region, country)
- Lead quality score
- Qualification status

**Use Cases:**
- Automatically research leads before contact
- Prioritize high-quality leads
- Segment leads by industry/size
- Save time on manual research

---

### 5. **AI Chat Widget**
Live chat with AI-powered assistance and lead qualification.

**Features:**
- Real-time chat widget on homepage
- Session analytics integration
- Automatic AI summaries of conversations
- Telegram integration for team notifications
- Lead qualification scoring

**Metrics Tracked:**
- Session duration
- Pages visited
- Engagement signals
- Scroll depth
- CTA interactions

**Use Cases:**
- Provide instant support to visitors
- Qualify leads through conversation
- Capture contact info
- Generate AI summaries for sales team

---

## 🎛️ System Status

The admin dashboard shows real-time status of all systems:

- **Attribution Tracking**: Active/Inactive
- **Heatmap Recording**: Active/Inactive
- **Intent Scoring**: Active/Inactive
- **Lead Enrichment**: Active/Inactive

All systems use in-memory storage with `globalThis` pattern for development. **In production, replace with database storage.**

## 📈 Quick Stats Overview

The main dashboard shows aggregated metrics:

- **Total Visits**: Sum of all attribution touchpoints
- **Conversions**: Total contact form submissions
- **Heatmap Sessions**: Total recorded user sessions
- **High Intent Visitors**: Visitors with 70+ intent score

## 🔧 Technical Architecture

### Storage Pattern
All systems use `globalThis` pattern for sharing state across Next.js API routes:

```typescript
const globalForX = globalThis as unknown as {
  dataStore: Map<string, DataType>;
};

export const dataStore = globalForX.dataStore ?? new Map();

if (process.env.NODE_ENV !== 'production') {
  globalForX.dataStore = dataStore;
}
```

### API Routes

**Attribution:**
- `POST /api/attribution/track` - Track touchpoints
- `GET /api/attribution/analytics` - Get attribution analytics

**Heatmap:**
- `POST /api/heatmap/screenshot` - Capture page screenshots
- `GET /api/heatmap/data` - Get session and click data
- `POST /api/heatmap/aggregate` - Aggregate heatmap data

**Intent:**
- `POST /api/intent/track` - Track intent signals
- `GET /api/intent/analytics` - Get intent analytics
- `PUT /api/intent/track` - Update user info

**Session:**
- `POST /api/session/record` - Record session events

**Contact:**
- `POST /api/contact/submit` - Submit contact form (with enrichment & attribution)

## 🎨 Design

The admin dashboard follows the BUILDMYDIGITAL design system:

- **Soft gradients**: 200/100 color levels for professional look
- **Cards with depth**: Gradient backgrounds with white content boxes
- **Hover animations**: Framer Motion powered interactions
- **Responsive grid**: Mobile-first design with asymmetric layouts
- **Dark header**: Professional contrast with light content

## 📱 Mobile Responsive

All dashboards are fully responsive:
- Single column on mobile
- Adaptive grids on tablets
- Full-width on desktop
- Touch-friendly controls

## 🚀 Production Deployment Checklist

### 1. **Database Integration**
Replace all in-memory storage with database:

```typescript
// Instead of:
const store = new Map();

// Use:
import { prisma } from '@/lib/prisma';
await prisma.touchpoint.create({ data: ... });
```

### 2. **Environment Variables**
Set all required env vars:
- `TELEGRAM_BOT_TOKEN` - Telegram bot for notifications
- `TELEGRAM_CHAT_ID` - Chat ID for lead alerts
- `HUNTER_API_KEY` - (Optional) Email enrichment
- `PDL_API_KEY` - (Optional) People Data Labs
- `CLEARBIT_API_KEY` - (Optional) Company enrichment
- `APOLLO_API_KEY` - (Optional) B2B contact data

### 3. **Analytics Consent**
Implement cookie consent:
```typescript
// Only track if user consented
if (hasAnalyticsConsent()) {
  trackTouchpoint(data);
}
```

### 4. **Data Retention**
Set retention policies:
- Attribution data: 90 days
- Heatmap sessions: 30 days
- Intent scores: 60 days

### 5. **Performance Optimization**
- Add database indexes on userId, sessionId, timestamp
- Implement data archiving for old records
- Cache analytics calculations
- Use Redis for hot lead detection

### 6. **Security**
- Add authentication to `/admin/*` routes
- Implement RBAC (Role-Based Access Control)
- Rate limit API endpoints
- Sanitize user inputs

## 📚 Documentation

- **Attribution System**: See `/ATTRIBUTION-SYSTEM.md`
- **API Reference**: Inline JSDoc in all API routes
- **Component Props**: TypeScript interfaces in component files

## 🎯 Usage Tips

### For Marketing
1. **Use UTM parameters** in all campaigns for accurate attribution
2. **Check attribution weekly** to optimize budget allocation
3. **Monitor top pages** that assist in conversions
4. **Test different channels** and compare attribution models

### For Sales
1. **Check intent scores** before outreach (prioritize 70+ scores)
2. **Review enriched lead data** before calling
3. **Look at conversion paths** to understand context
4. **Use chat transcripts** from AI widget for conversation starters

### For Product
1. **Analyze heatmaps** to optimize UI/UX
2. **Check scroll depth** on important pages
3. **Review session recordings** to find friction points
4. **Monitor top converting pages** to replicate success

## 🔗 Quick Links

- **Main Dashboard**: `/admin`
- **Heatmap**: `/admin/heatmap`
- **Attribution**: `/admin/attribution`
- **Intent Scoring**: `/admin/intent`
- **Contact Form**: `/contact` (public-facing with enrichment)
- **Homepage**: `/` (with AI chat widget)

## 📊 Sample Workflow

### Lead Generation to Conversion

1. **Visitor arrives** via Google Ads (UTM tracked)
   - Attribution: First touch recorded as "Paid Search"
   - Intent: 10 points for page view

2. **Browses pricing page**
   - Attribution: Second touchpoint recorded
   - Intent: +20 points (pricing page view)
   - Heatmap: Clicks and scroll tracked

3. **Clicks "Book Demo" CTA**
   - Intent: +30 points
   - Total score now 60/100 (Warm Lead)

4. **Submits contact form**
   - Attribution: Conversion recorded, all models calculated
   - Enrichment: IP lookup, email domain parsing, scoring
   - Lead Score: 75/100, Grade: B, Qualified: ✅
   - Telegram: Notification sent with:
     - Enriched company data
     - Intent score: 60/100
     - Attribution journey (Paid Search → Direct → Direct)
     - Conversion path shown

5. **Sales team receives Telegram notification** with:
   - Contact info
   - Company name, size, industry
   - Lead quality score
   - Behavioral signals
   - Complete marketing journey

## ✅ Benefits

- **Save 20+ hours/week** on manual lead research
- **Increase conversion rate** with data-driven optimization
- **Improve ROI** through accurate attribution
- **Faster follow-up** with hot lead alerts
- **Better sales conversations** with enriched context

---

**Built with**: Next.js 15, TypeScript, Framer Motion, TailwindCSS
**Author**: BUILDMYDIGITAL
**Date**: October 2025
