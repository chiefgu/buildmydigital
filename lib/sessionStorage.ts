import { SessionRecording, HeatmapData } from './sessionRecording';

/**
 * Shared in-memory storage for session recordings
 * In production, replace with a database (PostgreSQL, MongoDB, etc.)
 *
 * IMPORTANT: Using globalThis to ensure storage is shared across
 * all API routes in Next.js development mode
 */
const globalForStorage = globalThis as unknown as {
  sessionRecordings: Map<string, SessionRecording>;
  heatmapData: Map<string, HeatmapData>;
};

export const sessionRecordings = globalForStorage.sessionRecordings ?? new Map<string, SessionRecording>();
export const heatmapData = globalForStorage.heatmapData ?? new Map<string, HeatmapData>();

// Store on globalThis to persist across hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForStorage.sessionRecordings = sessionRecordings;
  globalForStorage.heatmapData = heatmapData;
}

/**
 * Get all session recordings
 */
export function getAllSessions(): SessionRecording[] {
  return Array.from(sessionRecordings.values());
}

/**
 * Get a specific session recording
 */
export function getSession(sessionId: string): SessionRecording | undefined {
  return sessionRecordings.get(sessionId);
}

/**
 * Store a session recording
 */
export function storeSession(recording: SessionRecording): void {
  sessionRecordings.set(recording.sessionId, recording);
}

/**
 * Get heatmap data for a session
 */
export function getHeatmap(sessionId: string): HeatmapData | undefined {
  return heatmapData.get(sessionId);
}

/**
 * Store heatmap data for a session
 */
export function storeHeatmap(sessionId: string, heatmap: HeatmapData): void {
  heatmapData.set(sessionId, heatmap);
}
