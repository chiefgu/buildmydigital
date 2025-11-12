'use client';

import { useEffect } from 'react';

/**
 * PREMIUM ENHANCEMENT: Advanced scroll-triggered animations
 * Multiple animation types with staggered delays
 * Uses Intersection Observer for performance
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px into viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Unobserve after animation for performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animationClasses = [
      '.fade-in',
      '.scale-fade',
      '.slide-left',
      '.slide-right',
      '.text-reveal'
    ];

    animationClasses.forEach(className => {
      const elements = document.querySelectorAll(className);
      elements.forEach(el => observer.observe(el));
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);
}
