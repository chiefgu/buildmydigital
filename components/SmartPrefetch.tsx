'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PrefetchRule {
  currentPath: string | RegExp;
  prefetchPaths: string[];
  probability: number; // 0-1, how likely user will navigate there
}

// Define intelligent prefetch rules based on user journey patterns
const PREFETCH_RULES: PrefetchRule[] = [
  // Homepage visitors likely to view services
  {
    currentPath: '/',
    prefetchPaths: ['/contact', '/about'],
    probability: 0.7,
  },

  // Contact page visitors might check services
  {
    currentPath: '/contact',
    prefetchPaths: ['/'],
    probability: 0.5,
  },

  // Users browsing case studies often check contact
  {
    currentPath: /^\/case-studies/,
    prefetchPaths: ['/contact', '/'],
    probability: 0.6,
  },
];

export default function SmartPrefetch() {
  const pathname = usePathname();
  const prefetchedRef = useRef<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Find matching prefetch rules
    const matchingRules = PREFETCH_RULES.filter(rule => {
      if (typeof rule.currentPath === 'string') {
        return pathname === rule.currentPath;
      }
      return rule.currentPath.test(pathname);
    });

    if (matchingRules.length === 0) return;

    // Get all paths to prefetch
    const pathsToPrefetch = matchingRules.flatMap(rule => rule.prefetchPaths);

    // Prefetch high-probability paths immediately
    matchingRules.forEach(rule => {
      if (rule.probability >= 0.7) {
        rule.prefetchPaths.forEach(path => {
          prefetchPath(path);
        });
      }
    });

    // For medium probability, wait for user to be idle
    const mediumProbabilityPaths = matchingRules
      .filter(rule => rule.probability >= 0.5 && rule.probability < 0.7)
      .flatMap(rule => rule.prefetchPaths);

    if (mediumProbabilityPaths.length > 0) {
      // Prefetch after 2 seconds of idle time
      const timer = setTimeout(() => {
        mediumProbabilityPaths.forEach(path => prefetchPath(path));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    // Set up intersection observer to prefetch links when they come into view
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const link = entry.target as HTMLAnchorElement;
              const href = link.getAttribute('href');

              if (href && href.startsWith('/') && !href.startsWith('/#')) {
                prefetchPath(href);
              }
            }
          });
        },
        {
          rootMargin: '50px', // Prefetch slightly before link is visible
        }
      );
    }

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      observerRef.current?.observe(link);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  const prefetchPath = (path: string) => {
    // Don't prefetch if already done
    if (prefetchedRef.current.has(path)) return;

    try {
      // Use Next.js router.prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'document';
      link.href = path;
      document.head.appendChild(link);

      prefetchedRef.current.add(path);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[SmartPrefetch] ✅ Prefetched: ${path}`);
      }
    } catch (error) {
      console.error('[SmartPrefetch] Failed to prefetch:', path, error);
    }
  };

  // Track hover events for even smarter prefetching
  useEffect(() => {
    let hoverTimeout: NodeJS.Timeout;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement | null;

      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('/#')) {
          // Prefetch after 100ms of hover (user likely to click)
          hoverTimeout = setTimeout(() => {
            prefetchPath(href);
          }, 100);
        }
      }
    };

    const handleMouseLeave = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
