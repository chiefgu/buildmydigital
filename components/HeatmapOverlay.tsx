'use client';

import { useEffect, useRef, useState } from 'react';

interface ClickPoint {
  x: number;
  y: number;
  count: number;
}

interface HeatmapOverlayProps {
  clicks: ClickPoint[];
  width: number;
  height: number;
  maxCount?: number;
  opacity?: number;
}

/**
 * Heatmap visualization component
 * Renders click data as a heatmap overlay using HTML5 Canvas
 */
export default function HeatmapOverlay({
  clicks,
  width,
  height,
  maxCount,
  opacity = 0.6,
}: HeatmapOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);

  // Calculate max count if not provided
  const maxClickCount = maxCount || Math.max(...clicks.map(c => c.count), 1);

  /**
   * Get color for heat intensity
   * 0 = blue (cold), 1 = red (hot)
   */
  const getHeatColor = (intensity: number): string => {
    // Clamp intensity between 0 and 1
    intensity = Math.max(0, Math.min(1, intensity));

    // Use HSL color space for smooth gradients
    // Blue (240°) → Cyan (180°) → Green (120°) → Yellow (60°) → Red (0°)
    const hue = (1 - intensity) * 240; // Blue to Red
    const saturation = 100;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  /**
   * Render heatmap on canvas
   */
  const renderHeatmap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set global opacity
    ctx.globalAlpha = opacity;

    // Render each click point as a radial gradient
    clicks.forEach(click => {
      const intensity = click.count / maxClickCount;
      const radius = 30 + (intensity * 40); // Larger radius for more clicks

      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        click.x, click.y, 0,
        click.x, click.y, radius
      );

      const color = getHeatColor(intensity);
      gradient.addColorStop(0, color.replace(')', ', 0.8)').replace('hsl', 'hsla'));
      gradient.addColorStop(0.5, color.replace(')', ', 0.4)').replace('hsl', 'hsla'));
      gradient.addColorStop(1, color.replace(')', ', 0)').replace('hsl', 'hsla'));

      // Draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(
        click.x - radius,
        click.y - radius,
        radius * 2,
        radius * 2
      );
    });

    // Apply blur for smooth heatmap effect
    ctx.filter = 'blur(20px)';
    ctx.globalCompositeOperation = 'lighter';

    setIsRendering(false);
  };

  /**
   * Re-render when clicks change
   */
  useEffect(() => {
    renderHeatmap();
  }, [clicks, width, height, opacity]);

  return (
    <div className="relative" style={{ width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
      {isRendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
