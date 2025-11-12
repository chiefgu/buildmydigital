import { NextRequest, NextResponse } from 'next/server';

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
  slowMetric?: {
    name: string;
    value: number;
    threshold: number;
  } | null;
}

// Simple in-memory store (replace with database in production)
const performanceReports: PerformanceReport[] = [];
const MAX_STORED_REPORTS = 1000;

// More reliable rate limiting: track last notification with reports
const NOTIFICATION_COOLDOWN = 60 * 60 * 1000; // 1 hour in milliseconds

export async function POST(request: NextRequest) {
  try {
    const report: PerformanceReport = await request.json();

    console.log('[Performance] Report received:', {
      url: report.url,
      metrics: report.metrics,
      slowMetric: report.slowMetric,
    });

    // Store report (keep only last MAX_STORED_REPORTS)
    performanceReports.push(report);
    if (performanceReports.length > MAX_STORED_REPORTS) {
      performanceReports.shift();
    }

    // If this is a slow page report, check if we should send notification
    if (report.slowMetric) {
      const now = Date.now();

      // Check recent reports for this URL to see if we already notified
      const recentReportsForUrl = performanceReports
        .filter(r => r.url === report.url && r.slowMetric)
        .slice(-10); // Check last 10 slow reports for this URL

      // Find the most recent notification timestamp by checking if we have reports within cooldown
      const hasRecentNotification = recentReportsForUrl.some(r => {
        const reportTime = new Date(r.timestamp).getTime();
        const timeSinceReport = now - reportTime;
        // If there's a report within the last hour (excluding the current one)
        return timeSinceReport < NOTIFICATION_COOLDOWN && timeSinceReport > 1000;
      });

      if (!hasRecentNotification) {
        console.log('[Performance] 📧 Sending notification for slow page:', report.url);
        await notifySlowPage(report);
      } else {
        console.log('[Performance] ⏱️ Skipping notification - already sent recently for:', report.url);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Performance] Error processing report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const limit = parseInt(searchParams.get('limit') || '50');

    let reports = performanceReports;

    // Filter by URL if provided
    if (url) {
      reports = reports.filter(r => r.url.includes(url));
    }

    // Get most recent reports
    const recentReports = reports.slice(-limit).reverse();

    // Calculate averages
    const averages = calculateAverages(reports);

    return NextResponse.json({
      reports: recentReports,
      averages,
      totalReports: reports.length,
    });
  } catch (error) {
    console.error('[Performance] Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

async function notifySlowPage(report: PerformanceReport) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('[Performance] Telegram not configured, skipping notification');
    return;
  }

  const { slowMetric, url, metrics, connection, deviceMemory } = report;

  if (!slowMetric) return;

  // Format metric value
  const formatValue = (value: number, name: string) => {
    if (name === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  // Determine severity emoji
  const getSeverityEmoji = (value: number, threshold: number) => {
    const ratio = value / threshold;
    if (ratio > 2) return '🔴';
    if (ratio > 1.5) return '🟠';
    return '🟡';
  };

  const emoji = getSeverityEmoji(slowMetric.value, slowMetric.threshold);

  // Build metrics summary
  const metricsSummary = Object.entries(metrics)
    .map(([name, value]) => `${name}: ${formatValue(value!, name)}`)
    .join('\n');

  // Build message
  let message = `${emoji} *Slow Page Detected*\n\n`;
  message += `*URL:* ${url}\n\n`;
  message += `*Problem:* ${slowMetric.name} is ${formatValue(slowMetric.value, slowMetric.name)} (threshold: ${formatValue(slowMetric.threshold, slowMetric.name)})\n\n`;
  message += `*All Metrics:*\n${metricsSummary}\n\n`;

  if (connection) {
    message += `*Connection:* ${connection}\n`;
  }

  if (deviceMemory) {
    message += `*Device Memory:* ${deviceMemory}GB\n`;
  }

  message += `\n_${report.timestamp}_`;

  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    console.log('[Performance] ✅ Slow page notification sent to Telegram');
  } catch (error) {
    console.error('[Performance] ❌ Failed to send Telegram notification:', error);
  }
}

function calculateAverages(reports: PerformanceReport[]) {
  if (reports.length === 0) {
    return {
      LCP: 0,
      CLS: 0,
      FCP: 0,
      TTFB: 0,
      INP: 0,
    };
  }

  const sums = {
    LCP: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0,
    INP: 0,
  };

  const counts = {
    LCP: 0,
    CLS: 0,
    FCP: 0,
    TTFB: 0,
    INP: 0,
  };

  reports.forEach(report => {
    Object.entries(report.metrics).forEach(([key, value]) => {
      if (value !== undefined) {
        sums[key as keyof typeof sums] += value;
        counts[key as keyof typeof counts]++;
      }
    });
  });

  return {
    LCP: counts.LCP > 0 ? Math.round(sums.LCP / counts.LCP) : 0,
    CLS: counts.CLS > 0 ? parseFloat((sums.CLS / counts.CLS).toFixed(3)) : 0,
    FCP: counts.FCP > 0 ? Math.round(sums.FCP / counts.FCP) : 0,
    TTFB: counts.TTFB > 0 ? Math.round(sums.TTFB / counts.TTFB) : 0,
    INP: counts.INP > 0 ? Math.round(sums.INP / counts.INP) : 0,
  };
}
