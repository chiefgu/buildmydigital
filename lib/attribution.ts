/**
 * Multi-Touch Attribution System
 *
 * Features:
 * - Track user journey across multiple touchpoints
 * - Support multiple attribution models (first-touch, last-touch, linear, time-decay, position-based)
 * - Classify marketing channels automatically
 * - Calculate ROI and conversion paths
 * - Revenue attribution per touchpoint
 */

export interface Touchpoint {
  id: string;
  timestamp: number;

  // Page information
  url: string;
  path: string;
  title: string;

  // Traffic source
  source: string; // utm_source or parsed from referrer
  medium: string; // utm_medium or parsed
  campaign?: string; // utm_campaign
  term?: string; // utm_term (keywords)
  content?: string; // utm_content (ad variant)

  // Channel classification
  channel: MarketingChannel;

  // Referrer information
  referrer?: string;
  referrerDomain?: string;

  // Engagement metrics
  timeOnPage?: number; // milliseconds
  scrollDepth?: number; // 0-100%
  engaged?: boolean; // Did user interact?

  // Device/location
  device?: 'desktop' | 'mobile' | 'tablet';
  location?: {
    country?: string;
    city?: string;
  };
}

export type MarketingChannel =
  | 'organic-search' // Google, Bing organic results
  | 'paid-search' // Google Ads, Bing Ads
  | 'paid-social' // Facebook Ads, LinkedIn Ads
  | 'organic-social' // Social media (non-paid)
  | 'email' // Email campaigns
  | 'direct' // Direct traffic (typed URL, bookmarks)
  | 'referral' // External websites
  | 'display' // Display ads
  | 'affiliate' // Affiliate links
  | 'other'; // Unknown/other

export interface UserJourney {
  userId: string; // Anonymous ID (cookie-based)
  sessionId?: string;

  touchpoints: Touchpoint[];

  // Journey metadata
  firstTouchAt: number;
  lastTouchAt: number;
  touchpointCount: number;

  // Conversion information
  converted: boolean;
  conversionAt?: number;
  conversionValue?: number; // Revenue in GBP/USD
  conversionType?: 'contact-form' | 'purchase' | 'signup' | 'demo-request';

  // Journey metrics
  totalTimeSpent: number; // milliseconds across all sessions
  averageTimePerPage: number;
  daysSinceFirstTouch: number;
}

export interface ConversionEvent {
  id: string;
  timestamp: number;

  userId: string;
  journey: UserJourney;

  type: 'contact-form' | 'purchase' | 'signup' | 'demo-request';
  value: number; // Revenue in GBP/USD

  // Lead data (if applicable)
  leadData?: {
    name: string;
    email: string;
    company?: string;
    qualified: boolean;
    score: number;
  };

  // Attribution results
  attribution: {
    firstTouch: AttributionResult;
    lastTouch: AttributionResult;
    linear: AttributionResult[];
    timeDecay: AttributionResult[];
    positionBased: AttributionResult[];
  };
}

export interface AttributionResult {
  touchpoint: Touchpoint;
  credit: number; // 0-1 (percentage of attribution)
  value: number; // Revenue attributed to this touchpoint
  channel: MarketingChannel;
}

export interface ChannelPerformance {
  channel: MarketingChannel;

  // Traffic metrics
  visits: number;
  uniqueVisitors: number;

  // Conversion metrics
  conversions: number;
  conversionRate: number;
  averageTimeToConversion: number; // days

  // Revenue metrics
  totalRevenue: number;
  averageOrderValue: number;
  revenuePerVisit: number;

  // Attribution breakdowns
  firstTouchRevenue: number;
  lastTouchRevenue: number;
  linearRevenue: number;

  // Top sources within channel
  topSources: {
    source: string;
    visits: number;
    conversions: number;
    revenue: number;
  }[];
}

/**
 * Classify marketing channel from touchpoint data
 */
export function classifyMarketingChannel(touchpoint: {
  source?: string;
  medium?: string;
  referrer?: string;
  referrerDomain?: string;
}): MarketingChannel {
  const { source, medium, referrer, referrerDomain } = touchpoint;

  const sourceLower = source?.toLowerCase() || '';
  const mediumLower = medium?.toLowerCase() || '';
  const domainLower = referrerDomain?.toLowerCase() || '';

  // Direct traffic (no referrer or same domain)
  if (!referrer || referrer === '' || domainLower.includes('guestdigital')) {
    return 'direct';
  }

  // Paid search
  if (
    mediumLower.includes('cpc') ||
    mediumLower.includes('ppc') ||
    mediumLower.includes('paid') ||
    sourceLower.includes('google ads') ||
    sourceLower.includes('bing ads')
  ) {
    return 'paid-search';
  }

  // Organic search
  const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu', 'yandex'];
  if (searchEngines.some(engine => domainLower.includes(engine))) {
    return 'organic-search';
  }

  // Email
  if (
    mediumLower.includes('email') ||
    sourceLower.includes('email') ||
    sourceLower.includes('newsletter')
  ) {
    return 'email';
  }

  // Paid social
  if (
    mediumLower.includes('paid-social') ||
    mediumLower.includes('cpm') ||
    mediumLower.includes('social-paid')
  ) {
    return 'paid-social';
  }

  // Organic social
  const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'youtube', 'pinterest'];
  if (
    socialPlatforms.some(platform => domainLower.includes(platform)) ||
    socialPlatforms.some(platform => sourceLower.includes(platform)) ||
    mediumLower.includes('social')
  ) {
    return 'organic-social';
  }

  // Display ads
  if (
    mediumLower.includes('display') ||
    mediumLower.includes('banner') ||
    mediumLower.includes('cpm')
  ) {
    return 'display';
  }

  // Affiliate
  if (
    mediumLower.includes('affiliate') ||
    sourceLower.includes('affiliate')
  ) {
    return 'affiliate';
  }

  // Referral (any other external site)
  if (referrer && !domainLower.includes('guestdigital')) {
    return 'referral';
  }

  return 'other';
}

/**
 * Parse UTM parameters from URL
 */
export function parseUTMParams(url: string): {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
} {
  try {
    const urlObj = new URL(url);
    return {
      source: urlObj.searchParams.get('utm_source') || undefined,
      medium: urlObj.searchParams.get('utm_medium') || undefined,
      campaign: urlObj.searchParams.get('utm_campaign') || undefined,
      term: urlObj.searchParams.get('utm_term') || undefined,
      content: urlObj.searchParams.get('utm_content') || undefined,
    };
  } catch {
    return {};
  }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string | undefined {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return undefined;
  }
}

/**
 * Create a touchpoint from page visit data
 */
export function createTouchpoint(data: {
  url: string;
  title: string;
  referrer?: string;
  userAgent?: string;
  location?: { country?: string; city?: string };
}): Touchpoint {
  const { url, title, referrer, userAgent, location } = data;

  // Parse UTM parameters
  const utmParams = parseUTMParams(url);

  // Get referrer domain
  const referrerDomain = referrer ? extractDomain(referrer) : undefined;

  // Determine source and medium
  let source = utmParams.source;
  let medium = utmParams.medium;

  // If no UTM params, infer from referrer
  if (!source && referrerDomain) {
    source = referrerDomain;
  }

  if (!medium && referrer) {
    medium = 'referral';
  }

  // Classify marketing channel
  const channel = classifyMarketingChannel({
    source,
    medium,
    referrer,
    referrerDomain,
  });

  // Detect device type from user agent
  let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile')) device = 'mobile';
    else if (ua.includes('tablet') || ua.includes('ipad')) device = 'tablet';
  }

  const touchpoint: Touchpoint = {
    id: `tp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    url,
    path: new URL(url).pathname,
    title,
    source: source || 'direct',
    medium: medium || 'none',
    campaign: utmParams.campaign,
    term: utmParams.term,
    content: utmParams.content,
    channel,
    referrer,
    referrerDomain,
    device,
    location,
  };

  return touchpoint;
}

/**
 * Attribution Models
 */

/**
 * First-Touch Attribution
 * Give 100% credit to the first touchpoint
 */
export function firstTouchAttribution(journey: UserJourney): AttributionResult {
  const firstTouchpoint = journey.touchpoints[0];
  return {
    touchpoint: firstTouchpoint,
    credit: 1.0,
    value: journey.conversionValue || 0,
    channel: firstTouchpoint.channel,
  };
}

/**
 * Last-Touch Attribution
 * Give 100% credit to the last touchpoint before conversion
 */
export function lastTouchAttribution(journey: UserJourney): AttributionResult {
  const lastTouchpoint = journey.touchpoints[journey.touchpoints.length - 1];
  return {
    touchpoint: lastTouchpoint,
    credit: 1.0,
    value: journey.conversionValue || 0,
    channel: lastTouchpoint.channel,
  };
}

/**
 * Linear Attribution
 * Distribute credit equally across all touchpoints
 */
export function linearAttribution(journey: UserJourney): AttributionResult[] {
  const touchpointCount = journey.touchpoints.length;
  const creditPerTouch = 1 / touchpointCount;
  const valuePerTouch = (journey.conversionValue || 0) / touchpointCount;

  return journey.touchpoints.map(touchpoint => ({
    touchpoint,
    credit: creditPerTouch,
    value: valuePerTouch,
    channel: touchpoint.channel,
  }));
}

/**
 * Time-Decay Attribution
 * Give more credit to touchpoints closer to conversion
 * Uses exponential decay with 7-day half-life
 */
export function timeDecayAttribution(journey: UserJourney): AttributionResult[] {
  if (!journey.conversionAt) {
    return linearAttribution(journey);
  }

  const HALF_LIFE_DAYS = 7;
  const conversionTime = journey.conversionAt;

  // Calculate decay weights for each touchpoint
  const weights = journey.touchpoints.map(tp => {
    const daysSinceTouch = (conversionTime - tp.timestamp) / (1000 * 60 * 60 * 24);
    // Exponential decay: weight = 2^(-days / half_life)
    return Math.pow(2, -daysSinceTouch / HALF_LIFE_DAYS);
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  return journey.touchpoints.map((touchpoint, i) => ({
    touchpoint,
    credit: weights[i] / totalWeight,
    value: (weights[i] / totalWeight) * (journey.conversionValue || 0),
    channel: touchpoint.channel,
  }));
}

/**
 * Position-Based Attribution (U-Shaped)
 * 40% to first touch, 40% to last touch, 20% to middle touches
 */
export function positionBasedAttribution(journey: UserJourney): AttributionResult[] {
  const touchpointCount = journey.touchpoints.length;
  const conversionValue = journey.conversionValue || 0;

  if (touchpointCount === 1) {
    // Single touchpoint gets 100%
    return [{
      touchpoint: journey.touchpoints[0],
      credit: 1.0,
      value: conversionValue,
      channel: journey.touchpoints[0].channel,
    }];
  }

  if (touchpointCount === 2) {
    // Two touchpoints: 50/50
    return journey.touchpoints.map(tp => ({
      touchpoint: tp,
      credit: 0.5,
      value: conversionValue * 0.5,
      channel: tp.channel,
    }));
  }

  // 3+ touchpoints: 40% first, 40% last, 20% distributed to middle
  const middleCount = touchpointCount - 2;
  const middleCreditPer = 0.2 / middleCount;

  return journey.touchpoints.map((touchpoint, i) => {
    let credit: number;

    if (i === 0) {
      credit = 0.4; // First touch
    } else if (i === touchpointCount - 1) {
      credit = 0.4; // Last touch
    } else {
      credit = middleCreditPer; // Middle touches
    }

    return {
      touchpoint,
      credit,
      value: credit * conversionValue,
      channel: touchpoint.channel,
    };
  });
}

/**
 * Calculate all attribution models for a conversion
 */
export function calculateAllAttributions(journey: UserJourney): ConversionEvent['attribution'] {
  return {
    firstTouch: firstTouchAttribution(journey),
    lastTouch: lastTouchAttribution(journey),
    linear: linearAttribution(journey),
    timeDecay: timeDecayAttribution(journey),
    positionBased: positionBasedAttribution(journey),
  };
}

/**
 * Aggregate attribution results by channel
 */
export function aggregateByChannel(
  attributionResults: AttributionResult[]
): Map<MarketingChannel, { credit: number; value: number; touchpoints: number }> {
  const channelMap = new Map<MarketingChannel, { credit: number; value: number; touchpoints: number }>();

  attributionResults.forEach(result => {
    const existing = channelMap.get(result.channel) || { credit: 0, value: 0, touchpoints: 0 };
    channelMap.set(result.channel, {
      credit: existing.credit + result.credit,
      value: existing.value + result.value,
      touchpoints: existing.touchpoints + 1,
    });
  });

  return channelMap;
}

/**
 * Calculate channel performance metrics
 */
export function calculateChannelPerformance(
  conversions: ConversionEvent[],
  allTouchpoints: Touchpoint[]
): ChannelPerformance[] {
  const channelStats = new Map<MarketingChannel, {
    visits: number;
    uniqueVisitors: Set<string>;
    conversions: number;
    totalRevenue: number;
    firstTouchRevenue: number;
    lastTouchRevenue: number;
    linearRevenue: number;
    conversionTimes: number[];
    sources: Map<string, { visits: number; conversions: number; revenue: number }>;
  }>();

  // Initialize all channels
  const allChannels: MarketingChannel[] = [
    'organic-search', 'paid-search', 'paid-social', 'organic-social',
    'email', 'direct', 'referral', 'display', 'affiliate', 'other'
  ];

  allChannels.forEach(channel => {
    channelStats.set(channel, {
      visits: 0,
      uniqueVisitors: new Set(),
      conversions: 0,
      totalRevenue: 0,
      firstTouchRevenue: 0,
      lastTouchRevenue: 0,
      linearRevenue: 0,
      conversionTimes: [],
      sources: new Map(),
    });
  });

  // Aggregate touchpoint data
  allTouchpoints.forEach(tp => {
    const stats = channelStats.get(tp.channel)!;
    stats.visits++;
    // uniqueVisitors would need userId from context

    const sourceStats = stats.sources.get(tp.source) || { visits: 0, conversions: 0, revenue: 0 };
    sourceStats.visits++;
    stats.sources.set(tp.source, sourceStats);
  });

  // Aggregate conversion data
  conversions.forEach(conversion => {
    const journey = conversion.journey;

    // First touch
    const firstChannel = conversion.attribution.firstTouch.channel;
    const firstStats = channelStats.get(firstChannel)!;
    firstStats.firstTouchRevenue += conversion.value;

    // Last touch
    const lastChannel = conversion.attribution.lastTouch.channel;
    const lastStats = channelStats.get(lastChannel)!;
    lastStats.lastTouchRevenue += conversion.value;
    lastStats.conversions++;
    lastStats.totalRevenue += conversion.value;

    // Linear attribution
    conversion.attribution.linear.forEach(result => {
      const stats = channelStats.get(result.channel)!;
      stats.linearRevenue += result.value;

      const sourceStats = stats.sources.get(result.touchpoint.source) || { visits: 0, conversions: 0, revenue: 0 };
      sourceStats.revenue += result.value;
      stats.sources.set(result.touchpoint.source, sourceStats);
    });

    // Time to conversion
    const timeToConversion = (journey.conversionAt! - journey.firstTouchAt) / (1000 * 60 * 60 * 24); // days
    lastStats.conversionTimes.push(timeToConversion);
  });

  // Calculate final metrics
  return allChannels.map(channel => {
    const stats = channelStats.get(channel)!;

    const topSources = Array.from(stats.sources.entries())
      .map(([source, data]) => ({ source, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      channel,
      visits: stats.visits,
      uniqueVisitors: stats.uniqueVisitors.size,
      conversions: stats.conversions,
      conversionRate: stats.visits > 0 ? stats.conversions / stats.visits : 0,
      averageTimeToConversion: stats.conversionTimes.length > 0
        ? stats.conversionTimes.reduce((sum, t) => sum + t, 0) / stats.conversionTimes.length
        : 0,
      totalRevenue: stats.totalRevenue,
      averageOrderValue: stats.conversions > 0 ? stats.totalRevenue / stats.conversions : 0,
      revenuePerVisit: stats.visits > 0 ? stats.totalRevenue / stats.visits : 0,
      firstTouchRevenue: stats.firstTouchRevenue,
      lastTouchRevenue: stats.lastTouchRevenue,
      linearRevenue: stats.linearRevenue,
      topSources,
    };
  }).filter(perf => perf.visits > 0 || perf.conversions > 0); // Only return channels with data
}
