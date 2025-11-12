/**
 * Google Analytics 4 Tracking Utilities
 *
 * This file provides helper functions for tracking user interactions
 * across the BUILDMYDIGITAL website.
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Check if gtag is available and user has consented to analytics
 */
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return typeof window.gtag === 'function';
};

/**
 * Track custom events in GA4
 * @param eventName - Name of the event (e.g., 'cta_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!isAnalyticsEnabled()) {
    console.log('[Analytics] Event not tracked (analytics disabled):', eventName, eventParams);
    return;
  }

  try {
    window.gtag('event', eventName, eventParams);
    console.log('[Analytics] ✅ Event tracked:', eventName, eventParams);
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (
  ctaName: string,
  location: string,
  destination?: string
) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
    destination_url: destination,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (
  formName: string,
  formLocation: string,
  success: boolean = true
) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: formLocation,
    success: success,
  });
};

/**
 * Track form field interactions (when user starts filling)
 */
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    form_name: formName,
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (
  linkText: string,
  destination: string,
  linkType: 'header' | 'footer' | 'inline' = 'inline'
) => {
  trackEvent('navigation_click', {
    link_text: linkText,
    link_destination: destination,
    link_type: linkType,
  });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  });
};

/**
 * Track section visibility (when user scrolls to a section)
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('outbound_link_click', {
    link_url: url,
    link_text: linkText,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track video plays/interactions
 */
export const trackVideoInteraction = (
  videoName: string,
  action: 'play' | 'pause' | 'complete',
  currentTime?: number
) => {
  trackEvent('video_interaction', {
    video_name: videoName,
    video_action: action,
    video_current_time: currentTime,
  });
};

/**
 * Track pricing tier selection/interest
 */
export const trackPricingInterest = (
  tierName: string,
  action: 'view' | 'click_cta'
) => {
  trackEvent('pricing_interest', {
    pricing_tier: tierName,
    action: action,
  });
};

/**
 * Track testimonial interactions
 */
export const trackTestimonialView = (clientName: string) => {
  trackEvent('testimonial_view', {
    client_name: clientName,
  });
};

/**
 * Track chat widget interactions
 */
export const trackChatInteraction = (
  action: 'open' | 'close' | 'message_sent'
) => {
  trackEvent('chat_interaction', {
    chat_action: action,
  });
};

/**
 * Track when users spend significant time on page (engagement)
 */
export const trackEngagement = (timeSpent: number) => {
  trackEvent('user_engagement', {
    time_on_page: timeSpent,
  });
};

/**
 * Track cookie consent choices
 */
export const trackCookieConsent = (
  consentType: 'accept_all' | 'reject_all' | 'custom',
  analyticsEnabled: boolean,
  marketingEnabled: boolean
) => {
  trackEvent('cookie_consent', {
    consent_type: consentType,
    analytics_enabled: analyticsEnabled,
    marketing_enabled: marketingEnabled,
  });
};

// ============================================================================
// SESSION ANALYTICS STORAGE FOR CHAT CONTEXT
// ============================================================================

interface AnalyticsEvent {
  eventName: string;
  eventParams: Record<string, any>;
  timestamp: number;
  url: string;
}

interface PageView {
  url: string;
  title: string;
  timestamp: number;
  timeSpent?: number;
}

interface UserSession {
  sessionStart: number;
  events: AnalyticsEvent[];
  pageViews: PageView[];
  referrer: string;
  lastActivity: number;
}

const STORAGE_KEY = 'buildmydigital_session';

/**
 * Initialize or get existing session
 */
const getSession = (): UserSession => {
  if (typeof window === 'undefined') {
    return {
      sessionStart: Date.now(),
      events: [],
      pageViews: [],
      referrer: '',
      lastActivity: Date.now(),
    };
  }

  const stored = sessionStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('[Analytics] Error parsing stored session:', e);
    }
  }

  // Create new session
  const newSession: UserSession = {
    sessionStart: Date.now(),
    events: [],
    pageViews: [],
    referrer: document.referrer || 'direct',
    lastActivity: Date.now(),
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
  return newSession;
};

/**
 * Save session to storage
 */
const saveSession = (session: UserSession) => {
  if (typeof window === 'undefined') return;

  session.lastActivity = Date.now();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

/**
 * Store event in session for later analysis
 */
export const storeEventInSession = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;

  const session = getSession();

  session.events.push({
    eventName,
    eventParams: eventParams || {},
    timestamp: Date.now(),
    url: window.location.pathname,
  });

  // Keep only last 100 events to avoid storage issues
  if (session.events.length > 100) {
    session.events = session.events.slice(-100);
  }

  saveSession(session);
};

/**
 * Track page view and store in session
 */
export const trackPageView = (url?: string, title?: string) => {
  if (typeof window === 'undefined') return;

  const session = getSession();
  const currentUrl = url || window.location.pathname;
  const currentTitle = title || document.title;

  // Update time spent on previous page
  if (session.pageViews.length > 0) {
    const lastPage = session.pageViews[session.pageViews.length - 1];
    lastPage.timeSpent = Date.now() - lastPage.timestamp;
  }

  // Add new page view
  session.pageViews.push({
    url: currentUrl,
    title: currentTitle,
    timestamp: Date.now(),
  });

  saveSession(session);

  // Also track in GA4
  trackEvent('page_view', {
    page_url: currentUrl,
    page_title: currentTitle,
  });
};

/**
 * Enhanced tracking functions that also store in session
 */
export const trackCTAClickWithStorage = (
  ctaName: string,
  location: string,
  destination?: string
) => {
  trackCTAClick(ctaName, location, destination);
  storeEventInSession('cta_click', {
    cta_name: ctaName,
    cta_location: location,
    destination_url: destination,
  });
};

export const trackNavigationWithStorage = (
  linkText: string,
  destination: string,
  linkType: 'header' | 'footer' | 'inline' = 'inline'
) => {
  trackNavigation(linkText, destination, linkType);
  storeEventInSession('navigation_click', {
    link_text: linkText,
    link_destination: destination,
    link_type: linkType,
  });
};

export const trackPricingInterestWithStorage = (
  tierName: string,
  action: 'view' | 'click_cta'
) => {
  trackPricingInterest(tierName, action);
  storeEventInSession('pricing_interest', {
    pricing_tier: tierName,
    action: action,
  });
};

export const trackScrollDepthWithStorage = (percentage: number) => {
  trackScrollDepth(percentage);
  storeEventInSession('scroll_depth', {
    scroll_percentage: percentage,
  });
};

/**
 * Get comprehensive session analytics for chat context
 */
export const getSessionAnalytics = () => {
  if (typeof window === 'undefined') return null;

  const session = getSession();
  const now = Date.now();

  // Calculate session duration
  const sessionDuration = Math.round((now - session.sessionStart) / 1000); // in seconds

  // Get unique pages visited
  const pagesVisited = session.pageViews.map(pv => ({
    url: pv.url,
    title: pv.title,
    timeSpent: pv.timeSpent ? Math.round(pv.timeSpent / 1000) : 0,
  }));

  // Extract CTA clicks
  const ctaClicks = session.events
    .filter(e => e.eventName === 'cta_click')
    .map(e => ({
      name: e.eventParams.cta_name,
      location: e.eventParams.cta_location,
      timestamp: e.timestamp,
    }));

  // Extract pricing interests
  const pricingViews = session.events
    .filter(e => e.eventName === 'pricing_interest')
    .map(e => ({
      tier: e.eventParams.pricing_tier,
      action: e.eventParams.action,
    }));

  // Extract navigation patterns
  const navigationClicks = session.events
    .filter(e => e.eventName === 'navigation_click')
    .map(e => ({
      text: e.eventParams.link_text,
      destination: e.eventParams.link_destination,
    }));

  // Get max scroll depth
  const scrollEvents = session.events.filter(e => e.eventName === 'scroll_depth');
  const maxScrollDepth = scrollEvents.length > 0
    ? Math.max(...scrollEvents.map(e => e.eventParams.scroll_percentage))
    : 0;

  // Extract section views
  const sectionViews = session.events
    .filter(e => e.eventName === 'section_viewed')
    .map(e => ({
      name: e.eventParams.section_name,
      order: e.eventParams.section_order,
    }));

  // Get deepest section reached
  const deepestSection = sectionViews.length > 0
    ? Math.max(...sectionViews.map(s => s.order))
    : 0;

  const deepestSectionName = session.events
    .filter(e => e.eventName === 'section_viewed')
    .find(e => e.eventParams.section_order === deepestSection)
    ?.eventParams.section_name || 'None';

  return {
    sessionDuration, // in seconds
    sessionStart: new Date(session.sessionStart).toISOString(),
    referrer: session.referrer,
    pagesVisited,
    totalPages: pagesVisited.length,
    ctaClicks,
    pricingViews,
    navigationClicks,
    maxScrollDepth,
    sectionsViewed: sectionViews,
    deepestSection,
    deepestSectionName,
    totalEvents: session.events.length,
  };
};

/**
 * Clear session data (useful for testing or after chat submission)
 */
export const clearSessionAnalytics = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
};
