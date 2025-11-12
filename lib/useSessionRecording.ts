/**
 * Session Recording Hook
 * Automatically records user sessions for replay and analysis
 */

import { useEffect, useRef, useCallback } from 'react';
import { SessionRecorder, SessionRecording, generateHeatmapData } from './sessionRecording';

const STORAGE_KEY = 'session_recording';
const SEND_INTERVAL = 10000; // Send data every 10 seconds (for testing)

/**
 * Get session ID from intent tracking
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('session_id') || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Send recording to backend
 */
async function sendRecording(recording: SessionRecording) {
  try {
    const response = await fetch('/api/session/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recording),
    });

    if (!response.ok) {
      throw new Error(`Failed to send recording: ${response.statusText}`);
    }

    console.log('[Session] Recording sent to backend');
  } catch (error) {
    console.error('[Session] Error sending recording:', error);
  }
}

/**
 * Session Recording Hook
 */
export function useSessionRecording(options: {
  enabled?: boolean;
  sendInterval?: number;
} = {}) {
  const {
    enabled = true,
    sendInterval = SEND_INTERVAL,
  } = options;

  const recorderRef = useRef<SessionRecorder | null>(null);
  const sendTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start recording
   */
  const startRecording = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    const sessionId = getSessionId();
    const recorder = new SessionRecorder(sessionId);
    recorder.start();
    recorderRef.current = recorder;

    console.log('[Session] Recording started:', sessionId);

    // Set up periodic sending
    sendTimerRef.current = setInterval(() => {
      const recording = recorder.getRecording();
      console.log('[Session] Periodic check - Events:', recording?.events.length || 0);
      if (recording && recording.events.length > 0) {
        console.log('[Session] Sending recording with', recording.events.length, 'events');
        sendRecording(recording);
      } else {
        console.log('[Session] No events to send yet');
      }
    }, sendInterval);
  }, [enabled, sendInterval]);

  /**
   * Stop recording and send final data
   */
  const stopRecording = useCallback(async () => {
    if (!recorderRef.current) return;

    const recording = recorderRef.current.stop();
    if (recording) {
      await sendRecording(recording);
      console.log('[Session] Recording stopped and sent');
    }

    if (sendTimerRef.current) {
      clearInterval(sendTimerRef.current);
      sendTimerRef.current = null;
    }

    recorderRef.current = null;
  }, []);

  /**
   * Get current recording
   */
  const getCurrentRecording = useCallback((): SessionRecording | null => {
    return recorderRef.current?.getRecording() || null;
  }, []);

  // Start recording on mount
  useEffect(() => {
    if (!enabled) return;

    startRecording();

    // Stop and send on page unload
    const handleUnload = () => {
      const recording = recorderRef.current?.stop();
      if (recording) {
        // Use sendBeacon for reliable sending on page unload
        const blob = new Blob([JSON.stringify(recording)], { type: 'application/json' });
        navigator.sendBeacon('/api/session/record', blob);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      stopRecording();
    };
  }, [enabled, startRecording, stopRecording]);

  return {
    startRecording,
    stopRecording,
    getCurrentRecording,
    isRecording: recorderRef.current !== null,
  };
}

/**
 * Hook to check if user is experiencing friction
 */
export function useFrictionDetection() {
  const { getCurrentRecording } = useSessionRecording();

  const getFrictionEvents = useCallback(() => {
    const recording = getCurrentRecording();
    return recording?.frictionEvents || [];
  }, [getCurrentRecording]);

  const hasRageClicks = useCallback(() => {
    const frictionEvents = getFrictionEvents();
    return frictionEvents.some(e => e.type === 'rage_click');
  }, [getFrictionEvents]);

  const hasDeadClicks = useCallback(() => {
    const frictionEvents = getFrictionEvents();
    return frictionEvents.some(e => e.type === 'dead_click');
  }, [getFrictionEvents]);

  return {
    getFrictionEvents,
    hasRageClicks,
    hasDeadClicks,
  };
}
