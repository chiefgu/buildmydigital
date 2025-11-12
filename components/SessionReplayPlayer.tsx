'use client';

import { useState, useEffect, useRef } from 'react';
import { SessionRecording, RecordedEvent } from '@/lib/sessionRecording';

interface SessionReplayPlayerProps {
  recording: SessionRecording;
  onClose?: () => void;
}

export default function SessionReplayPlayer({ recording, onClose }: SessionReplayPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const duration = recording.duration || 0;
  const events = recording.events;

  /**
   * Play/Pause
   */
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Seek to specific time
   */
  const seekTo = (time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
    setIsPlaying(false);
  };

  /**
   * Get events at current time
   */
  const getEventsAtTime = (time: number): RecordedEvent[] => {
    const relativeTime = recording.startTime + time;
    return events.filter(
      e => e.timestamp <= relativeTime && e.timestamp >= recording.startTime
    );
  };

  /**
   * Render current frame
   */
  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get all events up to current time
    const currentEvents = getEventsAtTime(currentTime);

    // Draw mouse trail
    const mouseMoves = currentEvents.filter(e => e.type === 'mousemove');
    if (mouseMoves.length > 0) {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();

      mouseMoves.forEach((event, i) => {
        const x = event.data.x || 0;
        const y = event.data.y || 0;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    }

    // Draw current mouse position
    const lastMouseMove = mouseMoves[mouseMoves.length - 1];
    if (lastMouseMove) {
      const x = lastMouseMove.data.x || 0;
      const y = lastMouseMove.data.y || 0;

      // Draw cursor
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw cursor pointer
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 12, y + 12);
      ctx.stroke();
    }

    // Draw clicks
    const clicks = currentEvents.filter(e => e.type === 'click');
    clicks.forEach(click => {
      const x = click.data.x || 0;
      const y = click.data.y || 0;
      const age = currentTime - (click.timestamp - recording.startTime);
      const maxAge = 1000; // 1 second

      if (age < maxAge) {
        const alpha = 1 - (age / maxAge);
        const radius = 20 + (age / maxAge) * 10;

        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });

    // Draw friction events
    recording.frictionEvents.forEach(friction => {
      const age = currentTime - (friction.timestamp - recording.startTime);
      const maxAge = 2000; // 2 seconds

      if (age >= 0 && age < maxAge) {
        // We don't have exact coordinates for friction events,
        // so we'll show them as a notification
        const alpha = 1 - (age / maxAge);
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.font = '14px Arial';
        ctx.fillText(
          friction.type.replace(/_/g, ' ').toUpperCase(),
          10,
          30 + (friction.type === 'rage_click' ? 0 : 20)
        );
      }
    });
  };

  /**
   * Animation loop
   */
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    let lastTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setCurrentTime(prev => {
        const next = prev + (delta * playbackSpeed);
        if (next >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, duration]);

  /**
   * Render frame when currentTime changes
   */
  useEffect(() => {
    renderFrame();
  }, [currentTime]);

  /**
   * Set canvas size to match recording viewport
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = recording.viewport.width;
      canvas.height = recording.viewport.height;
    }
  }, [recording.viewport]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div>
          <h2 className="text-white font-bold text-lg">Session Replay</h2>
          <p className="text-gray-400 text-sm">
            {new Date(recording.startTime).toLocaleString()} • {formatTime(duration)} duration
          </p>
        </div>
        <div className="flex items-center gap-4">
          {recording.frictionEvents.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
              <span>⚠️</span>
              <span>{recording.frictionEvents.length} friction events</span>
            </div>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-gray-800 p-8 flex items-center justify-center">
        <div className="relative" style={{ maxWidth: recording.viewport.width, maxHeight: recording.viewport.height }}>
          <canvas
            ref={canvasRef}
            className="bg-white shadow-2xl rounded-lg"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 'calc(100vh - 250px)',
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
        {/* Timeline */}
        <div
          ref={timelineRef}
          className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            seekTo(percentage * duration);
          }}
        >
          {/* Progress */}
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          {/* Friction markers */}
          {recording.frictionEvents.map((friction, i) => {
            const position = ((friction.timestamp - recording.startTime) / duration) * 100;
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-1 bg-red-500"
                style={{ left: `${position}%` }}
                title={friction.type}
              />
            );
          })}
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Time */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Speed control */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Speed:</span>
            {[0.5, 1, 2, 4].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
