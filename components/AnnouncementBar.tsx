'use client';

import { useState, useEffect } from 'react';
import { trackCTAClick } from '@/lib/analytics';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
    // Dispatch custom event so Navigation can react
    window.dispatchEvent(new CustomEvent('announcement-dismissed'));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-3 left-0 right-0 z-[60] px-6 transition-all duration-500 ease-in-out"
      style={{
        opacity: isScrolled ? 0 : 1,
        transform: isScrolled ? 'translateY(-20px)' : 'translateY(0)',
        pointerEvents: isScrolled ? 'none' : 'auto'
      }}
    >
      <div className="max-w-[1400px] mx-auto bg-gradient-to-r from-[#FF7A59] to-[#FFB366] text-white rounded-[20px] px-6 py-2 flex items-center justify-between">
        {/* Centered announcement text */}
        <div className="flex-1 flex items-center justify-center">
          <a
            href="/contact"
            onClick={() => trackCTAClick('Announcement Bar CTA', 'Announcement Bar', '/contact')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <span className="text-sm md:text-base font-medium">
              <span className="hidden sm:inline">Transform your business with our </span>
              <span className="font-bold">Revenue Growth System</span>
              <span className="hidden sm:inline"> - Book your free audit today</span>
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
