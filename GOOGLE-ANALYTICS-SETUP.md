# Google Analytics 4 - Complete Setup & Tracking Guide

This guide explains how Google Analytics 4 (GA4) is implemented on the BUILDMYDIGITAL website and how to use the tracking system.

## Table of Contents
1. [Current Implementation](#current-implementation)
2. [What We're Tracking](#what-were-tracking)
3. [Setting Up Your GA4 Dashboard](#setting-up-your-ga4-dashboard)
4. [Creating Custom Conversions](#creating-custom-conversions)
5. [Viewing Reports](#viewing-reports)
6. [Adding New Tracking Events](#adding-new-tracking-events)

---

## Current Implementation

### ✅ Already Configured

1. **GA4 Measurement ID**: `G-DDGKWKTNXJ`
   - Configured in `.env.local`
   - Script loads in `app/layout.tsx`

2. **GDPR-Compliant Consent Management**
   - Tracking defaults to "denied" until user consents
   - Cookie banner with Accept/Reject/Customize options
   - Consent choices tracked as events

3. **Automated Tracking**
   - Page views (automatic)
   - Scroll depth (25%, 50%, 75%, 90%, 100%)
   - CTA button clicks across the site
   - Section visibility tracking
   - Cookie consent choices

---

## What We're Tracking

### 1. **CTA Click Events** (`cta_click`)

Tracks all Call-to-Action button clicks with parameters:
- `cta_name`: Button text (e.g., "Book Your Revenue Audit")
- `cta_location`: Where on the page (e.g., "Hero Section")
- `destination_url`: Where the button leads

**Example in GA4:**
```
Event: cta_click
Parameters:
  - cta_name: "Book Your Revenue Audit"
  - cta_location: "Hero Section"
  - destination_url: "#contact"
```

### 2. **Form Submissions** (`form_submit`)

Tracks when users submit forms:
- `form_name`: Which form was submitted
- `form_location`: Where on the page
- `success`: Whether submission succeeded

### 3. **Scroll Depth** (`scroll_depth`)

Automatically tracks when users reach:
- 25% of page
- 50% of page
- 75% of page
- 90% of page
- 100% of page (bottom)

### 4. **Section Views** (`section_view`)

Tracks when users scroll to major sections:
- Hero
- Who We Work With
- Revenue Infrastructure
- Pricing
- Testimonials
- Contact

### 5. **Navigation Clicks** (`navigation_click`)

Tracks menu and footer link clicks:
- `link_text`: Text of the clicked link
- `link_destination`: URL
- `link_type`: header, footer, or inline

### 6. **Pricing Interest** (`pricing_interest`)

Tracks interaction with pricing tiers:
- `pricing_tier`: Level 1, 2, or 3
- `action`: "view" or "click_cta"

### 7. **Chat Interactions** (`chat_interaction`)

Tracks chat widget usage:
- `chat_action`: open, close, message_sent

### 8. **Cookie Consent** (`cookie_consent`)

Tracks user consent choices:
- `consent_type`: accept_all, reject_all, custom
- `analytics_enabled`: true/false
- `marketing_enabled`: true/false

---

## Setting Up Your GA4 Dashboard

### Step 1: Access Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Select your property: **BUILDMYDIGITAL**

### Step 2: Verify Tracking is Working

**Real-Time Report:**
1. In GA4, go to **Reports** > **Realtime**
2. Open your website: http://localhost:3000 (or your live URL)
3. You should see:
   - Active users count increases
   - Page views appear
   - Events start appearing

**Debug Mode (Recommended for Testing):**
1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Open your site with the extension enabled
3. Open Chrome DevTools → Console
4. Look for GA debug logs showing all events

---

## Creating Custom Conversions

Conversions are the key business actions you want to track (form submissions, button clicks, etc.).

### Important Conversions to Set Up:

#### 1. Contact Form Submissions

1. In GA4, go to **Configure** > **Events**
2. Click **Create Event**
3. Create a new event called `contact_form_submit`
4. Then go to **Configure** > **Conversions**
5. Click **New Conversion Event**
6. Enter: `form_submit`
7. Click **Save**

#### 2. Primary CTA Clicks (Revenue Audit)

1. Go to **Configure** > **Conversions**
2. Click **New Conversion Event**
3. Create conversion for event: `cta_click`
4. Add condition: `cta_name` contains "Revenue Audit"

#### 3. Pricing Tier Selection

1. Create conversion for event: `pricing_interest`
2. Add condition: `action` equals "click_cta"

### Assigning Conversion Values

You can assign monetary values to conversions:

1. Go to **Configure** > **Events**
2. Find your conversion event
3. Click **Modify event** → **Modify parameter**
4. Add parameter `value` with estimated worth
   - Example: Revenue Audit booking = £2,500 (average client value)
   - Example: Pricing CTA click = £500 (qualified lead value)

---

## Viewing Reports

### 1. **Engagement Reports**

**Path:** Reports > Engagement > Events

Shows all tracked events with counts:
- `cta_click` - Total CTA clicks
- `scroll_depth` - How deep users scroll
- `form_submit` - Form submissions
- `section_view` - Section engagement

**How to Use:**
- Click any event to see detailed breakdown
- View which CTAs get the most clicks
- See which sections users engage with most

### 2. **Conversions Report**

**Path:** Reports > Engagement > Conversions

Shows your key business actions:
- Total conversions
- Conversion rate
- Value generated

**How to Use:**
- Track how many form submissions you get
- See which traffic sources convert best
- Calculate ROI on marketing

### 3. **User Journey (Path Exploration)**

**Path:** Explore > Path Exploration

Visualize how users move through your site:
- What pages they visit first
- Where they go next
- Where they drop off

**Setup:**
1. Go to **Explore**
2. Create new **Path exploration**
3. Starting point: Landing page
4. Track: Page views and events
5. See the flow from Hero → Pricing → Contact

### 4. **Scroll Depth Report (Custom)**

**Path:** Explore > Free Form

Create custom report:
1. Go to **Explore** > **Free Form**
2. Add dimension: `scroll_percentage`
3. Add metric: `Event count`
4. View: How many users scroll to each depth

**Insights:**
- If <50% reach bottom: Content too long or boring
- If 90%+ reach contact form: Strong engagement

### 5. **CTA Performance Report**

**Path:** Explore > Free Form

1. Go to **Explore** > **Free Form**
2. Add dimensions:
   - `cta_name`
   - `cta_location`
3. Add metrics:
   - `Event count`
   - `Conversions`
4. See which CTAs perform best

**Use Case:**
- Test different CTA copy
- See which page sections convert best
- Optimize button placement

---

## Understanding Key Metrics

### Event Count
Total number of times an event fired. High = good engagement.

### Conversion Rate
Percentage of users who complete a conversion action.
- **Good:** 2-5% for contact forms
- **Great:** 5-10%
- **Excellent:** 10%+

### Scroll Depth
How far users scroll down the page.
- <25%: Weak hook, improve hero section
- 25-50%: Good start, losing them mid-page
- 50-75%: Strong engagement
- 75-100%: Excellent engagement

### Session Duration
Average time users spend on site.
- <1 min: Bounce, not engaged
- 1-3 min: Browsing
- 3-5 min: Engaged, reading
- 5+ min: Highly engaged, ready to convert

---

## Adding New Tracking Events

### Example: Track Video Plays

1. **Add to analytics utility** (`lib/analytics.ts`):
```typescript
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    video_name: videoName,
  });
};
```

2. **Use in component**:
```tsx
import { trackVideoPlay } from '@/lib/analytics';

<video
  onPlay={() => trackVideoPlay('Homepage Hero Video')}
>
```

3. **View in GA4**:
- Go to **Reports** > **Engagement** > **Events**
- Find event: `video_play`
- See breakdown by `video_name`

### Example: Track Outbound Link Clicks

Already set up! Just use:
```tsx
import { trackOutboundLink } from '@/lib/analytics';

<a
  href="https://external-site.com"
  onClick={() => trackOutboundLink('https://external-site.com', 'Partner Site')}
>
```

---

## Advanced: Custom Audiences

Create audiences based on user behavior:

### High-Intent Visitors
Users who:
- Viewed Pricing
- Scrolled 75%+
- Clicked "Revenue Audit" CTA
- Did NOT submit form (yet)

**How to Create:**
1. Go to **Configure** > **Audiences**
2. Click **New Audience**
3. Add conditions:
   - Event `section_view` where `section_name` = "Pricing"
   - Event `scroll_depth` where `scroll_percentage` >= 75
   - Event `cta_click` where `cta_name` contains "Revenue Audit"
   - NOT Event `form_submit`
4. Use this audience for remarketing ads

### Engaged But Not Converting
Users who:
- Session duration >3 minutes
- Viewed multiple sections
- Did NOT convert

**Retargeting Strategy:**
- Show them a limited-time offer
- Offer a free resource (guide/template)
- Display testimonials

---

## Troubleshooting

### Events Not Showing Up

**Check 1: Analytics Enabled?**
- Open DevTools → Console
- Look for: `[Analytics] ✅ Event tracked: ...`
- If you see `[Analytics] Event not tracked (analytics disabled)` → User hasn't accepted cookies

**Check 2: GA4 Script Loading?**
- Open DevTools → Network tab
- Filter by "gtag"
- You should see: `gtag/js?id=G-DDGKWKTNXJ`

**Check 3: Measurement ID Correct?**
- Check `.env.local`
- Verify: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DDGKWKTNXJ`

### Data Delayed

GA4 can take 24-48 hours to process data fully. For real-time testing:
- Use **Realtime Report** in GA4
- Use **DebugView** in GA4 (requires Firebase)
- Check browser console logs

### Privacy & GDPR

**We're compliant!** Here's how:
1. Consent defaults to "denied"
2. No tracking until user accepts
3. User can reject or customize
4. Consent stored in localStorage
5. Cookie banner displays on first visit

---

## Best Practices

### 1. Set Up Weekly Email Reports
1. In GA4, go to **Library** > **Saved Reports**
2. Create custom report with key metrics
3. Schedule weekly email to yourself/team

### 2. Create a Dashboard
Combine these metrics in one view:
- Total conversions this week
- Top-performing CTAs
- Average scroll depth
- Contact form conversion rate

### 3. A/B Test CTAs
Use GA4 data to test:
- "Book Your Free Revenue Audit" vs "Get Your Revenue Audit"
- Different button colors
- CTA placement (hero vs mid-page vs footer)

### 4. Monitor Trends
Weekly review:
- Are conversions up or down?
- Which sections have low engagement?
- What's the drop-off point?

---

## Quick Reference

### All Tracked Events
| Event Name | What It Tracks |
|------------|----------------|
| `cta_click` | All CTA button clicks |
| `form_submit` | Form submissions |
| `form_start` | User starts filling form |
| `scroll_depth` | Page scroll milestones |
| `section_view` | Section visibility |
| `navigation_click` | Menu/footer links |
| `pricing_interest` | Pricing tier interactions |
| `chat_interaction` | Chat widget usage |
| `cookie_consent` | Consent banner choices |
| `outbound_link_click` | External link clicks |
| `testimonial_view` | Testimonial engagement |

### File Locations
- **Analytics Utility**: `/lib/analytics.ts`
- **Scroll Tracking Hook**: `/lib/useScrollTracking.ts`
- **Section Tracking Hook**: `/lib/useSectionTracking.ts`
- **Cookie Consent**: `/components/CookieConsent.tsx`
- **Environment Config**: `/.env.local`

---

## Need Help?

**Resources:**
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Event Parameters Reference](https://support.google.com/analytics/answer/9267735)
- [Conversion Tracking Guide](https://support.google.com/analytics/answer/9267568)

**Common Questions:**
- Events not showing? Check console logs
- Want to track something new? Add to `lib/analytics.ts`
- Need custom reports? Use Explore section in GA4

---

**Last Updated**: October 2025
**GA4 Property**: BUILDMYDIGITAL (G-DDGKWKTNXJ)
