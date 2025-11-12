'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackCookieConsent } from '@/lib/analytics';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load existing preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      initializeTracking(savedPreferences);
    }
  }, []);

  const initializeTracking = (prefs: CookiePreferences) => {
    if (typeof window === 'undefined') return;

    // Declare gtag function type
    declare global {
      interface Window {
        gtag: (...args: any[]) => void;
      }
    }

    // Wait for gtag to be available
    const updateConsent = () => {
      if (typeof window.gtag !== 'function') {
        console.warn('[Cookie Consent] gtag not yet available, retrying...');
        setTimeout(updateConsent, 100);
        return;
      }

      // Update Google Analytics consent
      if (prefs.analytics) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
        console.log('[Cookie Consent] ✅ Analytics enabled');
      } else {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
        console.log('[Cookie Consent] ❌ Analytics denied');
      }

      // Update marketing/advertising consent
      if (prefs.marketing) {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        console.log('[Cookie Consent] ✅ Marketing enabled');

        // Initialize other marketing pixels here (Facebook, LinkedIn, etc.)
        // Example: window.fbq && window.fbq('consent', 'grant');
      } else {
        window.gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        console.log('[Cookie Consent] ❌ Marketing denied');
      }
    };

    updateConsent();
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    initializeTracking(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const prefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(prefs);
    trackCookieConsent('accept_all', true, true);
  };

  const rejectAll = () => {
    const prefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(prefs);
    trackCookieConsent('reject_all', false, false);
  };

  const saveCustom = () => {
    savePreferences(preferences);
    trackCookieConsent('custom', preferences.analytics, preferences.marketing);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.2)] border border-gray-200/60 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#EF8354] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">We Value Your Privacy</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#EF8354] text-white font-semibold hover:bg-[#d97446] transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Customize
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Read our{' '}
                <a href="/privacy-policy" className="underline hover:text-[#EF8354]">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/cookie-policy" className="underline hover:text-[#EF8354]">
                  Cookie Policy
                </a>
              </p>
            </div>
          </motion.div>
        )}

        {showSettings && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">Necessary Cookies</h3>
                      <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">Always Active</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Essential for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                  </div>
                  <label className="relative inline-block w-12 h-6 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#EF8354] transition-colors"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm"></div>
                  </label>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-gray-900 mb-2">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Used to track visitors across websites to display relevant ads and measure campaign performance.
                    </p>
                  </div>
                  <label className="relative inline-block w-12 h-6 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#EF8354] transition-colors"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm"></div>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={saveCustom}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#EF8354] text-white font-semibold hover:bg-[#d97446] transition-all duration-200 hover:scale-105"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Accept All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
