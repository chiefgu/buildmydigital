'use client';

import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import SmartPrefetch from './SmartPrefetch';

export default function PerformanceProvider() {
  // Initialize performance monitoring
  usePerformanceMonitor();

  return (
    <>
      {/* Smart Prefetch - Intelligently prefetches likely next pages */}
      <SmartPrefetch />
    </>
  );
}
