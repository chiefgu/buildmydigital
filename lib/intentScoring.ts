/**
 * Intent Signal Scoring System
 * Tracks user behavior and assigns intent scores (0-100)
 * Higher scores indicate higher purchase intent
 */

export interface IntentSignal {
  action: string;
  points: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface IntentScore {
  sessionId: string;
  userId?: string;
  totalScore: number;
  signals: IntentSignal[];
  isHotLead: boolean; // Score > 70
  lastUpdated: Date;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
  };
}

/**
 * Intent Scoring Configuration
 * Each action has a point value based on purchase intent strength
 */
export const INTENT_ACTIONS = {
  // High Intent Actions (15-25 points)
  VIEWED_PRICING: { points: 20, label: 'Viewed Pricing Page' },
  USED_ROI_CALCULATOR: { points: 25, label: 'Used ROI Calculator' },
  CLICKED_PRICING_CTA: { points: 20, label: 'Clicked Pricing CTA' },
  STARTED_CONTACT_FORM: { points: 18, label: 'Started Contact Form' },
  CLICKED_BOOK_AUDIT: { points: 22, label: 'Clicked Book Audit CTA' },

  // Medium Intent Actions (8-15 points)
  VIEWED_TESTIMONIALS: { points: 12, label: 'Viewed Testimonials Section' },
  SCROLLED_TO_PRICING: { points: 10, label: 'Scrolled to Pricing' },
  SPENT_3MIN_ON_SITE: { points: 15, label: 'Spent 3+ minutes on site' },
  VIEWED_INFRASTRUCTURE: { points: 10, label: 'Viewed Infrastructure Section' },
  CLICKED_CASE_STUDY: { points: 12, label: 'Clicked Case Study' },
  OPENED_CHAT_WIDGET: { points: 8, label: 'Opened Chat Widget' },

  // Lower Intent Actions (3-8 points)
  SCROLLED_50_PERCENT: { points: 5, label: 'Scrolled 50% of page' },
  SCROLLED_100_PERCENT: { points: 8, label: 'Scrolled to bottom' },
  SPENT_1MIN_ON_SITE: { points: 5, label: 'Spent 1+ minute on site' },
  CLICKED_NAV_LINK: { points: 3, label: 'Clicked Navigation Link' },
  VIEWED_WHO_WE_WORK_WITH: { points: 6, label: 'Viewed Who We Work With' },

  // Engagement Actions (5-10 points)
  RETURN_VISITOR: { points: 10, label: 'Returned to site' },
  MULTIPLE_PAGE_VIEWS: { points: 7, label: 'Viewed multiple pages' },
  HOVERED_ON_CTA: { points: 4, label: 'Hovered on CTA button' },

  // Conversion Actions (30-50 points - instant hot lead)
  SUBMITTED_CONTACT_FORM: { points: 50, label: 'Submitted Contact Form' },
  BOOKED_CALL: { points: 50, label: 'Booked Call via Calendly' },
  CLICKED_EMAIL: { points: 30, label: 'Clicked Email Link' },
} as const;

/**
 * Score thresholds for lead categorization
 */
export const SCORE_THRESHOLDS = {
  HOT_LEAD: 70,        // Immediate follow-up required
  WARM_LEAD: 40,       // High priority for nurturing
  ENGAGED: 20,         // Moderate interest
  BROWSING: 0,         // Low intent
} as const;

/**
 * Calculate the total intent score from signals
 */
export function calculateIntentScore(signals: IntentSignal[]): number {
  // Apply time decay - signals older than 30 minutes are worth less
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  const totalScore = signals.reduce((score, signal) => {
    let points = signal.points;

    // Apply time decay (50% after 30 minutes)
    if (signal.timestamp < thirtyMinutesAgo) {
      points = points * 0.5;
    }

    return score + points;
  }, 0);

  // Cap at 100
  return Math.min(Math.round(totalScore), 100);
}

/**
 * Get lead category based on score
 */
export function getLeadCategory(score: number): 'hot' | 'warm' | 'engaged' | 'browsing' {
  if (score >= SCORE_THRESHOLDS.HOT_LEAD) return 'hot';
  if (score >= SCORE_THRESHOLDS.WARM_LEAD) return 'warm';
  if (score >= SCORE_THRESHOLDS.ENGAGED) return 'engaged';
  return 'browsing';
}

/**
 * Get emoji for lead category
 */
export function getLeadEmoji(score: number): string {
  const category = getLeadCategory(score);
  switch (category) {
    case 'hot': return '🔥';
    case 'warm': return '⚡';
    case 'engaged': return '👀';
    case 'browsing': return '🌱';
  }
}

/**
 * Generate intent score summary message
 */
export function generateScoreSummary(intentScore: IntentScore): string {
  const category = getLeadCategory(intentScore.totalScore);
  const emoji = getLeadEmoji(intentScore.totalScore);

  const topSignals = intentScore.signals
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)
    .map(s => {
      const config = Object.values(INTENT_ACTIONS).find(a => a.points === s.points);
      return `  • ${config?.label || s.action} (+${s.points})`;
    })
    .join('\n');

  return `${emoji} Lead Score: ${intentScore.totalScore}/100 (${category.toUpperCase()})

Top Signals:
${topSignals}

Session ID: ${intentScore.sessionId}
Last Updated: ${new Date(intentScore.lastUpdated).toLocaleString('en-GB')}`;
}
