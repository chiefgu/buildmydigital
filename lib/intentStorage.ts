/**
 * Intent Scoring Storage
 * Manages intent scores in memory (use database in production)
 */

import { IntentScore } from './intentScoring';

// Use globalThis pattern to share storage across Next.js API routes
const globalForIntent = globalThis as unknown as {
  intentScores: Map<string, IntentScore>;
};

export const intentScores =
  globalForIntent.intentScores ?? new Map<string, IntentScore>();

if (process.env.NODE_ENV !== 'production') {
  globalForIntent.intentScores = intentScores;
}

/**
 * Get or create an intent score for a session
 */
export function getOrCreateIntentScore(sessionId: string): IntentScore {
  let intentScore = intentScores.get(sessionId);

  if (!intentScore) {
    intentScore = {
      sessionId,
      totalScore: 0,
      signals: [],
      isHotLead: false,
      lastUpdated: new Date(),
    };
    intentScores.set(sessionId, intentScore);
  }

  return intentScore;
}

/**
 * Update an intent score
 */
export function updateIntentScore(sessionId: string, score: IntentScore): void {
  intentScores.set(sessionId, score);
}

/**
 * Get an intent score by session ID
 */
export function getIntentScore(sessionId: string): IntentScore | undefined {
  return intentScores.get(sessionId);
}

/**
 * Get all intent scores
 */
export function getAllSessions(): IntentScore[] {
  return Array.from(intentScores.values());
}

/**
 * Clear all intent scores (for testing)
 */
export function clearAllScores(): void {
  intentScores.clear();
  console.log('[Intent Storage] All scores cleared');
}
