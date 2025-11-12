import { NextRequest, NextResponse } from 'next/server';

interface ImagePerformanceData {
  src: string;
  format: string;
  loadTime: number;
  testGroup: string;
  timestamp: string;
  userAgent: string;
}

// Simple in-memory store (replace with database in production)
const imagePerformanceData: ImagePerformanceData[] = [];
const MAX_STORED_DATA = 10000;

export async function POST(request: NextRequest) {
  try {
    const data: ImagePerformanceData = await request.json();

    // Store data
    imagePerformanceData.push(data);
    if (imagePerformanceData.length > MAX_STORED_DATA) {
      imagePerformanceData.shift();
    }

    console.log('[Image Performance] Recorded:', {
      format: data.format,
      loadTime: `${Math.round(data.loadTime)}ms`,
      testGroup: data.testGroup,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Image Performance] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    let data = imagePerformanceData;

    // Filter by format if provided
    if (format) {
      data = data.filter(d => d.format === format);
    }

    // Calculate statistics
    const stats = calculateStats(data);

    return NextResponse.json({
      stats,
      totalRecords: data.length,
      abTestResults: calculateABTestResults(),
    });
  } catch (error) {
    console.error('[Image Performance] Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

function calculateStats(data: ImagePerformanceData[]) {
  if (data.length === 0) {
    return {
      averageLoadTime: 0,
      medianLoadTime: 0,
      p95LoadTime: 0,
    };
  }

  const loadTimes = data.map(d => d.loadTime).sort((a, b) => a - b);

  const average = loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length;
  const median = loadTimes[Math.floor(loadTimes.length / 2)];
  const p95Index = Math.floor(loadTimes.length * 0.95);
  const p95 = loadTimes[p95Index];

  return {
    averageLoadTime: Math.round(average),
    medianLoadTime: Math.round(median),
    p95LoadTime: Math.round(p95),
  };
}

function calculateABTestResults() {
  const webpData = imagePerformanceData.filter(d => d.testGroup === 'webp');
  const avifData = imagePerformanceData.filter(d => d.testGroup === 'avif');

  const webpStats = calculateStats(webpData);
  const avifStats = calculateStats(avifData);

  // Determine winner (lower is better)
  let winner = 'inconclusive';
  const sampleSizeThreshold = 100; // Need at least 100 samples per group

  if (webpData.length >= sampleSizeThreshold && avifData.length >= sampleSizeThreshold) {
    const improvement = ((webpStats.averageLoadTime - avifStats.averageLoadTime) / webpStats.averageLoadTime) * 100;

    if (Math.abs(improvement) > 10) { // At least 10% difference
      winner = improvement > 0 ? 'avif' : 'webp';
    }
  }

  return {
    webp: {
      ...webpStats,
      sampleSize: webpData.length,
    },
    avif: {
      ...avifStats,
      sampleSize: avifData.length,
    },
    winner,
    recommendation:
      winner === 'inconclusive'
        ? 'Not enough data to determine a winner yet'
        : `Use ${winner.toUpperCase()} format for ${Math.abs(
            ((webpStats.averageLoadTime - avifStats.averageLoadTime) / webpStats.averageLoadTime) * 100
          ).toFixed(1)}% faster load times`,
  };
}
