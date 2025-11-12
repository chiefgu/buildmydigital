/**
 * Intent Tracking Hook
 * Automatically tracks user behaviors and calculates intent score
 */

import { useEffect, useCallback, useRef } from 'react';
import { INTENT_ACTIONS, IntentSignal, calculateIntentScore } from './intentScoring';

const STORAGE_KEY = 'intent_signals';
const SESSION_ID_KEY = 'session_id';

/**
 * Get or create session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get stored signals
 */
function getStoredSignals(): IntentSignal[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const signals = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return signals.map((s: any) => ({
      ...s,
      timestamp: new Date(s.timestamp)
    }));
  } catch (error) {
    console.error('Error loading intent signals:', error);
    return [];
  }
}

/**
 * Store signals
 */
function storeSignals(signals: IntentSignal[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signals));
  } catch (error) {
    console.error('Error storing intent signals:', error);
  }
}

/**
 * Send signal to backend
 */
async function sendSignalToBackend(action: string, points: number, metadata?: Record<string, any>) {
  try {
    await fetch('/api/intent/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: getSessionId(),
        action,
        points,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Error sending intent signal:', error);
  }
}

/**
 * Intent Tracking Hook
 */
export function useIntentTracking() {
  const sessionId = getSessionId();
  const trackedActions = useRef<Set<string>>(new Set());
  const startTime = useRef<Date>(new Date());

  /**
   * Track an intent signal
   */
  const trackIntent = useCallback((
    actionKey: keyof typeof INTENT_ACTIONS,
    metadata?: Record<string, any>
  ) => {
    const action = INTENT_ACTIONS[actionKey];
    if (!action) {
      console.warn('Unknown intent action:', actionKey);
      return;
    }

    // Prevent duplicate tracking of certain actions
    const dedupeKey = `${actionKey}-${metadata?.context || ''}`;
    if (trackedActions.current.has(dedupeKey)) {
      return;
    }
    trackedActions.current.add(dedupeKey);

    const signal: IntentSignal = {
      action: actionKey,
      points: action.points,
      timestamp: new Date(),
      metadata,
    };

    // Store locally
    const signals = getStoredSignals();
    signals.push(signal);
    storeSignals(signals);

    // Send to backend
    sendSignalToBackend(actionKey, action.points, metadata);

    // Calculate new score
    const newScore = calculateIntentScore(signals);

    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Intent] ${action.label} (+${action.points}) | Total Score: ${newScore}/100`);
    }
  }, []);

  /**
   * Get current intent score
   */
  const getCurrentScore = useCallback((): number => {
    const signals = getStoredSignals();
    return calculateIntentScore(signals);
  }, []);

  // Track time-based signals
  useEffect(() => {
    // Track 1 minute on site
    const oneMinTimer = setTimeout(() => {
      trackIntent('SPENT_1MIN_ON_SITE');
    }, 60 * 1000);

    // Track 3 minutes on site
    const threeMinTimer = setTimeout(() => {
      trackIntent('SPENT_3MIN_ON_SITE');
    }, 3 * 60 * 1000);

    return () => {
      clearTimeout(oneMinTimer);
      clearTimeout(threeMinTimer);
    };
  }, [trackIntent]);

  // Track scroll depth
  useEffect(() => {
    let scrolled50 = false;
    let scrolled100 = false;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

      if (scrollPercent >= 50 && !scrolled50) {
        scrolled50 = true;
        trackIntent('SCROLLED_50_PERCENT');
      }

      if (scrollPercent >= 95 && !scrolled100) {
        scrolled100 = true;
        trackIntent('SCROLLED_100_PERCENT');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackIntent]);

  // Track return visitor
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('has_visited');
    if (hasVisitedBefore) {
      trackIntent('RETURN_VISITOR');
    } else {
      localStorage.setItem('has_visited', 'true');
    }
  }, [trackIntent]);

  return {
    trackIntent,
    getCurrentScore,
    sessionId,
  };
}

/**
 * Helper hooks for specific tracking scenarios
 */

/**
 * Track when an element comes into view
 */
export function useTrackOnView(
  actionKey: keyof typeof INTENT_ACTIONS,
  enabled: boolean = true
) {
  const { trackIntent } = useIntentTracking();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!enabled || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackIntent(actionKey);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(actionKey.toLowerCase().replace(/_/g, '-'));
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [actionKey, trackIntent, enabled]);
}

/**
 * Track CTA hover
 */
export function useTrackCTAHover(ctaName: string) {
  const { trackIntent } = useIntentTracking();

  return useCallback(() => {
    trackIntent('HOVERED_ON_CTA', { ctaName });
  }, [trackIntent, ctaName]);
}
