import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * POST /api/heatmap/screenshot
 * Captures a full-page screenshot of a URL using Playwright
 *
 * Body:
 * - url: URL to capture (default: homepage)
 * - width: Viewport width (default: 1920)
 * - height: Viewport height (default: 1080)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url = 'http://localhost:3000', width = 1920 } = body;

    console.log('[Screenshot] Capturing full-page screenshot of:', url);

    // Launch browser
    const browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      viewport: { width, height: 1080 }, // Initial viewport
    });

    const page = await context.newPage();

    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to be fully loaded
    await page.waitForTimeout(2000);

    // Scroll to bottom to trigger lazy loading
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Scroll back to top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    // Get actual page height
    const pageHeight = await page.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    });

    console.log('[Screenshot] Page dimensions:', width, 'x', pageHeight, 'px');

    // Take full-page screenshot
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    await browser.close();

    // Save screenshot to public folder
    const screenshotsDir = path.join(process.cwd(), 'public', 'heatmap-screenshots');
    await mkdir(screenshotsDir, { recursive: true });

    const filename = `homepage-${width}x${pageHeight}.png`;
    const filepath = path.join(screenshotsDir, filename);

    await writeFile(filepath, screenshot);

    console.log('[Screenshot] Saved to:', filepath);

    return NextResponse.json({
      success: true,
      url: `/heatmap-screenshots/${filename}`,
      dimensions: { width, height: pageHeight },
    });
  } catch (error) {
    console.error('[Screenshot] Error capturing screenshot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}
