'use client';

import { useEffect, useRef } from 'react';
import { onCLS, onLCP, onFCP, onTTFB, onINP, Metric } from 'web-vitals';

interface PerformanceReport {
  url: string;
  metrics: {
    CLS?: number;
    LCP?: number;
    FCP?: number;
    TTFB?: number;
    INP?: number;
  };
  timestamp: string;
  userAgent: string;
  connection?: string;
  deviceMemory?: number;
}

// Thresholds for "slow" pages (based on Google's recommendations)
const THRESHOLDS = {
  LCP: 2500,  // Largest Contentful Paint (ms)
  CLS: 0.1,   // Cumulative Layout Shift (score)
  FCP: 1800,  // First Contentful Paint (ms)
  TTFB: 800,  // Time to First Byte (ms)
  INP: 200,   // Interaction to Next Paint (ms)
};

export function usePerformanceMonitor() {
  const metricsRef = useRef<PerformanceReport['metrics']>({});
  const reportedRef = useRef(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const reportMetric = (metric: Metric) => {
      // Store metric
      metricsRef.current[metric.name as keyof typeof metricsRef.current] = metric.value;

      // Check if metric exceeds threshold
      const threshold = THRESHOLDS[metric.name as keyof typeof THRESHOLDS];
      const isSlow = metric.value > threshold;

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'} ${isSlow ? '🔴 SLOW' : '✅'}`);
      }

      // If any metric is slow and we haven't reported yet, send report
      if (isSlow && !reportedRef.current) {
        sendPerformanceReport(metric);
      }
    };

    // Track all Core Web Vitals
    onCLS(reportMetric);
    onLCP(reportMetric);
    onFCP(reportMetric);
    onTTFB(reportMetric);
    onINP(reportMetric);

    // Send final report when page is being unloaded
    const handleBeforeUnload = () => {
      if (Object.keys(metricsRef.current).length > 0) {
        sendPerformanceReport();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendPerformanceReport = async (slowMetric?: Metric) => {
    if (reportedRef.current) return;
    reportedRef.current = true;

    try {
      const report: PerformanceReport = {
        url: window.location.href,
        metrics: metricsRef.current,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      // Add connection info if available
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (connection) {
        report.connection = connection.effectiveType;
      }

      // Add device memory if available
      if ('deviceMemory' in navigator) {
        report.deviceMemory = (navigator as any).deviceMemory;
      }

      // Send to API endpoint
      await fetch('/api/performance/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...report,
          slowMetric: slowMetric ? {
            name: slowMetric.name,
            value: slowMetric.value,
            threshold: THRESHOLDS[slowMetric.name as keyof typeof THRESHOLDS],
          } : null,
        }),
      });
    } catch (error) {
      console.error('[Performance Monitor] Failed to send report:', error);
    }
  };
}
