/**
 * Enquiry Storage
 * Manages contact form enquiries and replies in memory (use database in production)
 */

export interface Enquiry {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  ipAddress: string;
  userAgent: string;
  referrer: string;

  // Enrichment data
  enrichedData?: {
    score: number;
    grade: string;
    qualified: boolean;
    tags: string[];
    qualificationReasons: string[];
    companyData?: any;
    contactData?: any;
  };

  // Attribution data
  attribution?: {
    touchpoints: number;
    daysSinceFirstTouch: number;
    firstTouch: string;
    lastTouch: string;
  };

  // Intent score
  intentScore?: number;

  // Reply tracking
  replied: boolean;
  replyAt?: number;
  replyMessage?: string;
  replyBy?: string;
}

// Use globalThis pattern to share storage across Next.js API routes
const globalForEnquiries = globalThis as unknown as {
  enquiries: Map<string, Enquiry>;
};

export const enquiries =
  globalForEnquiries.enquiries ?? new Map<string, Enquiry>();

if (process.env.NODE_ENV !== 'production') {
  globalForEnquiries.enquiries = enquiries;
}

/**
 * Save a new enquiry
 */
export function saveEnquiry(enquiry: Omit<Enquiry, 'id' | 'timestamp' | 'replied'>): Enquiry {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    replied: false,
  };

  enquiries.set(newEnquiry.id, newEnquiry);

  console.log('[Enquiry Storage] Saved new enquiry:', {
    id: newEnquiry.id,
    email: newEnquiry.email,
    score: newEnquiry.enrichedData?.score,
  });

  return newEnquiry;
}

/**
 * Get all enquiries, sorted by timestamp (newest first)
 */
export function getAllEnquiries(): Enquiry[] {
  return Array.from(enquiries.values())
    .sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Get a single enquiry by ID
 */
export function getEnquiry(id: string): Enquiry | undefined {
  return enquiries.get(id);
}

/**
 * Mark enquiry as replied
 */
export function markAsReplied(id: string, replyMessage: string, replyBy: string): boolean {
  const enquiry = enquiries.get(id);
  if (!enquiry) return false;

  enquiry.replied = true;
  enquiry.replyAt = Date.now();
  enquiry.replyMessage = replyMessage;
  enquiry.replyBy = replyBy;

  enquiries.set(id, enquiry);

  console.log('[Enquiry Storage] Marked enquiry as replied:', {
    id,
    replyBy,
  });

  return true;
}

/**
 * Get unreplied enquiries
 */
export function getUnrepliedEnquiries(): Enquiry[] {
  return getAllEnquiries().filter(e => !e.replied);
}

/**
 * Get replied enquiries
 */
export function getRepliedEnquiries(): Enquiry[] {
  return getAllEnquiries().filter(e => e.replied);
}

/**
 * Get enquiries count
 */
export function getEnquiriesCount(): {
  total: number;
  unreplied: number;
  replied: number;
} {
  const all = getAllEnquiries();
  return {
    total: all.length,
    unreplied: all.filter(e => !e.replied).length,
    replied: all.filter(e => e.replied).length,
  };
}

/**
 * Clear all enquiries (for testing)
 */
export function clearAllEnquiries(): void {
  enquiries.clear();
  console.log('[Enquiry Storage] All enquiries cleared');
}
