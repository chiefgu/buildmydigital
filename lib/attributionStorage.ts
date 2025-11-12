/**
 * Attribution Storage
 * Manages user journeys and conversions in memory (use database in production)
 */

import { UserJourney, Touchpoint, ConversionEvent } from './attribution';

// Use globalThis pattern to share storage across Next.js API routes
const globalForAttribution = globalThis as unknown as {
  userJourneys: Map<string, UserJourney>;
  conversions: Map<string, ConversionEvent>;
  allTouchpoints: Touchpoint[];
};

export const userJourneys =
  globalForAttribution.userJourneys ?? new Map<string, UserJourney>();
export const conversions =
  globalForAttribution.conversions ?? new Map<string, ConversionEvent>();
export const allTouchpoints: Touchpoint[] =
  globalForAttribution.allTouchpoints ?? [];

if (process.env.NODE_ENV !== 'production') {
  globalForAttribution.userJourneys = userJourneys;
  globalForAttribution.conversions = conversions;
  globalForAttribution.allTouchpoints = allTouchpoints;
}

/**
 * Get or create a user journey
 */
export function getOrCreateJourney(userId: string): UserJourney {
  let journey = userJourneys.get(userId);

  if (!journey) {
    journey = {
      userId,
      touchpoints: [],
      firstTouchAt: Date.now(),
      lastTouchAt: Date.now(),
      touchpointCount: 0,
      converted: false,
      totalTimeSpent: 0,
      averageTimePerPage: 0,
      daysSinceFirstTouch: 0,
    };
    userJourneys.set(userId, journey);
  }

  return journey;
}

/**
 * Add a touchpoint to a user journey
 */
export function addTouchpoint(userId: string, touchpoint: Touchpoint): void {
  const journey = getOrCreateJourney(userId);

  journey.touchpoints.push(touchpoint);
  journey.lastTouchAt = touchpoint.timestamp;
  journey.touchpointCount = journey.touchpoints.length;

  // Calculate time metrics
  const daysSinceFirst =
    (journey.lastTouchAt - journey.firstTouchAt) / (1000 * 60 * 60 * 24);
  journey.daysSinceFirstTouch = daysSinceFirst;

  // Update average time per page
  const pagesWithTime = journey.touchpoints.filter(tp => tp.timeOnPage);
  if (pagesWithTime.length > 0) {
    journey.totalTimeSpent = pagesWithTime.reduce(
      (sum, tp) => sum + (tp.timeOnPage || 0),
      0
    );
    journey.averageTimePerPage = journey.totalTimeSpent / pagesWithTime.length;
  }

  userJourneys.set(userId, journey);

  // Also add to global touchpoints array for aggregate analytics
  allTouchpoints.push(touchpoint);

  console.log('[Attribution] Touchpoint added:', {
    userId,
    channel: touchpoint.channel,
    source: touchpoint.source,
    path: touchpoint.path,
    totalTouchpoints: journey.touchpointCount,
  });
}

/**
 * Record a conversion event
 */
export function recordConversion(
  userId: string,
  conversionEvent: Omit<ConversionEvent, 'id' | 'timestamp' | 'journey' | 'attribution'>
): ConversionEvent {
  const journey = getOrCreateJourney(userId);

  // Update journey with conversion data
  journey.converted = true;
  journey.conversionAt = Date.now();
  journey.conversionValue = conversionEvent.value;
  journey.conversionType = conversionEvent.type;

  // If no touchpoints exist, create a "direct" touchpoint for attribution
  if (journey.touchpoints.length === 0) {
    const directTouchpoint: Touchpoint = {
      timestamp: Date.now(),
      channel: 'direct',
      source: 'direct',
      medium: 'none',
      campaign: 'none',
      path: '/contact-form',
    };
    journey.touchpoints.push(directTouchpoint);
    journey.touchpointCount = 1;
  }

  // Calculate attribution (will be done in the API route to use the full attribution logic)
  const conversion: ConversionEvent = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    userId,
    journey,
    type: conversionEvent.type,
    value: conversionEvent.value,
    leadData: conversionEvent.leadData,
    attribution: {
      firstTouch: { touchpoint: journey.touchpoints[0], credit: 1, value: conversionEvent.value, channel: journey.touchpoints[0].channel },
      lastTouch: { touchpoint: journey.touchpoints[journey.touchpoints.length - 1], credit: 1, value: conversionEvent.value, channel: journey.touchpoints[journey.touchpoints.length - 1].channel },
      linear: [],
      timeDecay: [],
      positionBased: [],
    },
  };

  conversions.set(conversion.id, conversion);
  userJourneys.set(userId, journey);

  console.log('[Attribution] Conversion recorded:', {
    userId,
    type: conversion.type,
    value: conversion.value,
    touchpointCount: journey.touchpointCount,
    daysSinceFirstTouch: journey.daysSinceFirstTouch.toFixed(2),
  });

  return conversion;
}

/**
 * Get all user journeys
 */
export function getAllJourneys(): UserJourney[] {
  return Array.from(userJourneys.values());
}

/**
 * Get all conversions
 */
export function getAllConversions(): ConversionEvent[] {
  return Array.from(conversions.values());
}

/**
 * Get all touchpoints
 */
export function getAllTouchpoints(): Touchpoint[] {
  return allTouchpoints;
}

/**
 * Get journeys by channel
 */
export function getJourneysByChannel(channel: string): UserJourney[] {
  return getAllJourneys().filter(journey =>
    journey.touchpoints.some(tp => tp.channel === channel)
  );
}

/**
 * Get conversions by date range
 */
export function getConversionsByDateRange(
  startDate: number,
  endDate: number
): ConversionEvent[] {
  return getAllConversions().filter(
    conv => conv.timestamp >= startDate && conv.timestamp <= endDate
  );
}

/**
 * Clear all data (for testing)
 */
export function clearAllData(): void {
  userJourneys.clear();
  conversions.clear();
  allTouchpoints.length = 0;
  console.log('[Attribution] All data cleared');
}
