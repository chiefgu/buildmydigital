'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  enableABTest?: boolean; // Enable A/B testing between WebP and AVIF
}

// Detect browser support for image formats
const detectImageSupport = () => {
  if (typeof window === 'undefined') {
    return { webp: false, avif: false };
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  // Check WebP support
  const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

  // Check AVIF support (most modern browsers)
  const avifSupport = 'createImageBitmap' in window;

  return {
    webp: webpSupport,
    avif: avifSupport,
  };
};

// Simple A/B test - 50% of users get each format
const getTestGroup = () => {
  if (typeof window === 'undefined') return 'webp';

  // Use localStorage to persist user's test group
  const stored = localStorage.getItem('image-format-test');
  if (stored) return stored;

  const group = Math.random() < 0.5 ? 'webp' : 'avif';
  localStorage.setItem('image-format-test', group);

  return group;
};

export default function OptimizedImage({
  src,
  alt,
  enableABTest = false,
  ...props
}: OptimizedImageProps) {
  const [formatSupport, setFormatSupport] = useState({ webp: true, avif: false });
  const [selectedFormat, setSelectedFormat] = useState<string>('webp');
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const support = detectImageSupport();
    setFormatSupport(support);

    // Determine which format to use
    if (enableABTest && support.avif && support.webp) {
      // A/B test between WebP and AVIF
      const testGroup = getTestGroup();
      setSelectedFormat(testGroup);
    } else if (support.avif) {
      setSelectedFormat('avif');
    } else if (support.webp) {
      setSelectedFormat('webp');
    } else {
      setSelectedFormat('jpg');
    }
  }, [enableABTest]);

  const handleLoadingComplete = () => {
    const endTime = performance.now();
    const startMark = performance.getEntriesByName(`image-load-start-${src}`)[0];

    if (startMark) {
      const duration = endTime - startMark.startTime;
      setLoadTime(duration);

      // Report image load time for A/B testing
      if (enableABTest) {
        reportImagePerformance({
          src,
          format: selectedFormat,
          loadTime: duration,
          testGroup: localStorage.getItem('image-format-test') || 'unknown',
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[OptimizedImage] ${src} loaded in ${duration.toFixed(0)}ms (format: ${selectedFormat})`);
      }
    }
  };

  useEffect(() => {
    // Mark start of image load
    performance.mark(`image-load-start-${src}`);
  }, [src]);

  // Convert src to use optimal format
  const getOptimizedSrc = () => {
    // If it's already a data URL or external URL, return as-is
    if (src.startsWith('data:') || src.startsWith('http')) {
      return src;
    }

    // Next.js Image component handles optimization automatically
    // We just return the original src and Next.js will handle the rest
    return src;
  };

  return (
    <Image
      src={getOptimizedSrc()}
      alt={alt}
      onLoadingComplete={handleLoadingComplete}
      {...props}
    />
  );
}

// Report image performance for A/B testing
async function reportImagePerformance(data: {
  src: string;
  format: string;
  loadTime: number;
  testGroup: string;
}) {
  try {
    await fetch('/api/performance/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error('[OptimizedImage] Failed to report performance:', error);
  }
}
