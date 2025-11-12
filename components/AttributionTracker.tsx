'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Attribution Tracker Component
 *
 * Tracks user journey across the site:
 * - Page views with UTM parameters
 * - Referrer information
 * - Time on page
 * - Scroll depth
 * - Engagement signals
 */
export default function AttributionTracker() {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const pageStartTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const [engaged, setEngaged] = useState(false);

  // Generate or retrieve user ID from cookie
  useEffect(() => {
    let uid = getCookie('_guest_uid');

    if (!uid) {
      uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCookie('_guest_uid', uid, 365); // 1 year expiry
    }

    setUserId(uid);
  }, []);

  // Track page view when pathname changes
  useEffect(() => {
    if (!userId) return;

    // Reset tracking metrics for new page
    pageStartTime.current = Date.now();
    maxScrollDepth.current = 0;
    setEngaged(false);

    // Get current URL with all params
    const url = window.location.href;
    const title = document.title;
    const referrer = document.referrer;

    // Track this page view as a touchpoint
    trackTouchpoint({
      url,
      title,
      referrer,
      userId,
    });

    console.log('[Attribution Tracker] Page view tracked:', {
      path: pathname,
      url,
      userId,
    });
  }, [pathname, userId]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
      }

      // Consider user "engaged" if they scroll past 50%
      if (scrollPercentage > 50 && !engaged) {
        setEngaged(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [engaged]);

  // Track user engagement (clicks, key presses)
  useEffect(() => {
    const handleEngagement = () => {
      if (!engaged) {
        setEngaged(true);
      }
    };

    window.addEventListener('click', handleEngagement);
    window.addEventListener('keypress', handleEngagement);

    return () => {
      window.removeEventListener('click', handleEngagement);
      window.removeEventListener('keypress', handleEngagement);
    };
  }, [engaged]);

  // Send touchpoint update when user leaves page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!userId) return;

      const timeOnPage = Date.now() - pageStartTime.current;

      // Send final touchpoint update with engagement metrics
      updateTouchpoint(userId, {
        timeOnPage,
        scrollDepth: maxScrollDepth.current,
        engaged,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userId, engaged]);

  return null; // This component doesn't render anything
}

/**
 * Track a new touchpoint (page view)
 */
async function trackTouchpoint(data: {
  url: string;
  title: string;
  referrer: string;
  userId: string;
}) {
  try {
    await fetch('/api/attribution/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        ...data,
      }),
    });
  } catch (error) {
    console.error('[Attribution Tracker] Error tracking touchpoint:', error);
  }
}

/**
 * Update touchpoint with engagement metrics
 */
function updateTouchpoint(
  userId: string,
  metrics: {
    timeOnPage: number;
    scrollDepth: number;
    engaged: boolean;
  }
) {
  try {
    // Use sendBeacon for reliable delivery during page unload
    const data = JSON.stringify({
      type: 'engagement',
      userId,
      ...metrics,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/attribution/track', data);
    } else {
      // Fallback for browsers without sendBeacon
      fetch('/api/attribution/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        keepalive: true,
      }).catch(() => {
        // Ignore errors during page unload
      });
    }
  } catch (error) {
    // Ignore errors during page unload
  }
}

/**
 * Cookie helpers
 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}
