/**
 * Hook for tracking scroll depth in Google Analytics
 * Tracks both percentage thresholds and specific page sections
 */

import { useEffect, useRef } from 'react';
import { trackScrollDepthWithStorage, storeEventInSession } from './analytics';

const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

// Define page sections with their approximate positions
const PAGE_SECTIONS = [
  { name: 'Hero', selector: 'section:nth-of-type(1)', order: 1 },
  { name: 'Who We Work With', selector: 'section:nth-of-type(2)', order: 2 },
  { name: 'Revenue Infrastructure', id: 'infrastructure', order: 3 },
  { name: 'Pricing', id: 'pricing', order: 4 },
  { name: 'Testimonials', selector: 'section:nth-of-type(5)', order: 5 },
  { name: 'Contact', id: 'contact', order: 6 },
  { name: 'Footer', selector: 'section:nth-of-type(7)', order: 7 },
];

export function useScrollDepthTracking() {
  const trackedThresholds = useRef<Set<number>>(new Set());
  const trackedSections = useRef<Set<string>>(new Set());
  const deepestSection = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track percentage thresholds
      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !trackedThresholds.current.has(threshold)
        ) {
          trackedThresholds.current.add(threshold);
          trackScrollDepthWithStorage(threshold);
        }
      });

      // Track section visibility
      PAGE_SECTIONS.forEach((section) => {
        let element: Element | null = null;

        if (section.id) {
          element = document.getElementById(section.id);
        } else if (section.selector) {
          element = document.querySelector(section.selector);
        }

        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered "viewed" when it enters the viewport
          const isInView = rect.top < windowHeight && rect.bottom > 0;

          if (isInView && !trackedSections.current.has(section.name)) {
            trackedSections.current.add(section.name);

            // Update deepest section reached
            if (section.order > deepestSection.current) {
              deepestSection.current = section.order;
            }

            // Store section view event
            storeEventInSession('section_viewed', {
              section_name: section.name,
              section_order: section.order,
              deepest_section: deepestSection.current,
              deepest_section_name: PAGE_SECTIONS.find(s => s.order === deepestSection.current)?.name
            });

            console.log('[Scroll Tracking] Section viewed:', section.name, '- Deepest:', deepestSection.current);
          }
        }
      });
    };

    // Throttle scroll events
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 300);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
}
