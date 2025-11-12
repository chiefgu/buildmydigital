/**
 * Lead Enrichment Service
 * Auto-enhances contact form submissions with company data, scoring, and tagging
 */

export interface LeadData {
  // Form data
  name: string;
  email: string;
  company?: string;
  message: string;

  // Client metadata
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;

  // Enriched data
  enrichedData?: EnrichedLeadData;

  // Timestamps
  submittedAt: number;
}

export interface EnrichedLeadData {
  // Company information
  companyData?: {
    name?: string;
    domain?: string;
    industry?: string;
    size?: string; // '1-10', '11-50', '51-200', '201-500', '501+'
    revenue?: string;
    location?: {
      city?: string;
      region?: string;
      country?: string;
    };
    logo?: string;
    description?: string;
  };

  // Contact information
  contactData?: {
    linkedInUrl?: string;
    jobTitle?: string;
    seniority?: 'C-Level' | 'VP' | 'Director' | 'Manager' | 'Individual Contributor' | 'Unknown';
  };

  // Lead scoring
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D'; // A = Hot, B = Warm, C = Cold, D = Unqualified

  // Auto-generated tags
  tags: string[];

  // Qualification status
  qualified: boolean;
  qualificationReasons: string[];
}

/**
 * Enrich a lead with company and contact data
 */
export async function enrichLead(lead: LeadData): Promise<EnrichedLeadData> {
  console.log('[Lead Enrichment] Starting enrichment for:', lead.email);

  const enrichedData: EnrichedLeadData = {
    score: 0,
    grade: 'D',
    tags: [],
    qualified: false,
    qualificationReasons: [],
  };

  try {
    // 1. IP-based company lookup
    if (lead.ipAddress) {
      const companyFromIP = await getCompanyFromIP(lead.ipAddress);
      if (companyFromIP) {
        enrichedData.companyData = companyFromIP;
        enrichedData.tags.push('ip-enriched');
      }
    }

    // 2. Email domain enrichment
    const emailDomain = extractDomain(lead.email);
    if (emailDomain && !isFreeEmailProvider(emailDomain)) {
      const companyFromEmail = await getCompanyFromDomain(emailDomain);
      if (companyFromEmail) {
        enrichedData.companyData = { ...enrichedData.companyData, ...companyFromEmail };
        enrichedData.tags.push('email-enriched');
      }
    } else if (isFreeEmailProvider(emailDomain)) {
      enrichedData.tags.push('personal-email');
      enrichedData.qualificationReasons.push('Using personal email (free provider)');
    }

    // 3. LinkedIn enrichment (placeholder for API integration)
    const contactInfo = await enrichContactData(lead.name, lead.email, enrichedData.companyData?.domain);
    if (contactInfo) {
      enrichedData.contactData = contactInfo;
      enrichedData.tags.push('linkedin-found');
    }

    // 4. Industry tagging
    if (enrichedData.companyData?.industry) {
      enrichedData.tags.push(`industry:${enrichedData.companyData.industry.toLowerCase()}`);
    }

    // 5. Company size tagging
    if (enrichedData.companyData?.size) {
      enrichedData.tags.push(`size:${enrichedData.companyData.size}`);
    }

    // 6. Location tagging
    if (enrichedData.companyData?.location?.country) {
      enrichedData.tags.push(`location:${enrichedData.companyData.location.country}`);
    }

    // 7. Calculate lead score
    enrichedData.score = calculateLeadScore(lead, enrichedData);
    enrichedData.grade = getLeadGrade(enrichedData.score);

    // 8. Pre-qualify lead
    const qualification = qualifyLead(lead, enrichedData);
    enrichedData.qualified = qualification.qualified;
    enrichedData.qualificationReasons = qualification.reasons;

    console.log('[Lead Enrichment] Complete:', {
      email: lead.email,
      score: enrichedData.score,
      grade: enrichedData.grade,
      qualified: enrichedData.qualified,
      tags: enrichedData.tags,
    });

    return enrichedData;
  } catch (error) {
    console.error('[Lead Enrichment] Error:', error);
    return enrichedData;
  }
}

/**
 * Get company data from IP address
 * Uses ipapi.co for IP geolocation and company lookup
 */
async function getCompanyFromIP(ipAddress: string): Promise<any | null> {
  try {
    // Skip localhost/private IPs
    if (ipAddress === '127.0.0.1' || ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.')) {
      console.log('[IP Lookup] Skipping private IP:', ipAddress);
      return null;
    }

    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      headers: { 'User-Agent': 'BUILDMYDIGITAL Lead Enrichment' },
    });

    if (!response.ok) {
      console.log('[IP Lookup] API error:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.error) {
      console.log('[IP Lookup] Error:', data.reason);
      return null;
    }

    return {
      location: {
        city: data.city,
        region: data.region,
        country: data.country_name,
      },
      // Note: org field often contains ISP info, not always company name
      name: data.org || undefined,
    };
  } catch (error) {
    console.error('[IP Lookup] Error:', error);
    return null;
  }
}

/**
 * Get company data from email domain
 * Uses Hunter.io or Clearbit (when API keys configured)
 */
async function getCompanyFromDomain(domain: string): Promise<any | null> {
  try {
    // For now, use a simple domain-to-company heuristic
    // In production, integrate with Hunter.io or Clearbit

    const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

    if (HUNTER_API_KEY) {
      const response = await fetch(
        `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          return {
            name: data.data.organization,
            domain: data.data.domain,
            industry: data.data.industry,
          };
        }
      }
    }

    // Fallback: Basic domain parsing
    const companyName = domain.split('.')[0];
    return {
      domain,
      name: capitalizeCompanyName(companyName),
    };
  } catch (error) {
    console.error('[Domain Lookup] Error:', error);
    return null;
  }
}

/**
 * Enrich contact data with LinkedIn and professional info
 *
 * Alternative services:
 * - PDL (People Data Labs) - https://www.peopledatalabs.com/
 * - Clearbit Enrichment API - https://clearbit.com/enrichment
 * - Apollo.io API - https://www.apollo.io/
 * - Snov.io - https://snov.io/
 * - RocketReach API - https://rocketreach.co/
 */
async function enrichContactData(
  name: string,
  email: string,
  companyDomain?: string
): Promise<any | null> {
  try {
    // PDL (People Data Labs) integration
    const PDL_API_KEY = process.env.PDL_API_KEY;
    if (PDL_API_KEY) {
      const response = await fetch('https://api.peopledatalabs.com/v5/person/enrich', {
        method: 'GET',
        headers: {
          'X-Api-Key': PDL_API_KEY,
        },
        // @ts-ignore
        params: new URLSearchParams({
          email,
          pretty: 'true',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.linkedin_url) {
          return {
            linkedInUrl: data.linkedin_url,
            jobTitle: data.job_title,
            seniority: mapSeniorityLevel(data.job_title_levels?.[0]),
          };
        }
      }
    }

    // Clearbit Enrichment API integration
    const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;
    if (CLEARBIT_API_KEY) {
      const response = await fetch(
        `https://person.clearbit.com/v2/combined/find?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${CLEARBIT_API_KEY}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.person) {
          return {
            linkedInUrl: data.person.linkedin?.handle
              ? `https://www.linkedin.com/in/${data.person.linkedin.handle}`
              : undefined,
            jobTitle: data.person.employment?.title,
            seniority: mapSeniorityLevel(data.person.employment?.seniority),
          };
        }
      }
    }

    // Apollo.io API integration
    const APOLLO_API_KEY = process.env.APOLLO_API_KEY;
    if (APOLLO_API_KEY) {
      const response = await fetch('https://api.apollo.io/v1/people/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          api_key: APOLLO_API_KEY,
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.person) {
          return {
            linkedInUrl: data.person.linkedin_url,
            jobTitle: data.person.title,
            seniority: mapSeniorityLevel(data.person.seniority),
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error('[Contact Enrichment] Error:', error);
    return null;
  }
}

/**
 * Map seniority level from various APIs to standard format
 */
function mapSeniorityLevel(level?: string): 'C-Level' | 'VP' | 'Director' | 'Manager' | 'Individual Contributor' | 'Unknown' {
  if (!level) return 'Unknown';

  const lowerLevel = level.toLowerCase();

  if (lowerLevel.includes('c-level') || lowerLevel.includes('ceo') || lowerLevel.includes('cto') ||
      lowerLevel.includes('cfo') || lowerLevel.includes('coo') || lowerLevel.includes('chief')) {
    return 'C-Level';
  }
  if (lowerLevel.includes('vp') || lowerLevel.includes('vice president')) {
    return 'VP';
  }
  if (lowerLevel.includes('director') || lowerLevel.includes('head of')) {
    return 'Director';
  }
  if (lowerLevel.includes('manager') || lowerLevel.includes('lead')) {
    return 'Manager';
  }

  return 'Individual Contributor';
}

/**
 * Calculate lead score (0-100)
 */
function calculateLeadScore(lead: LeadData, enriched: EnrichedLeadData): number {
  let score = 0;

  // Company email (not free provider) +30
  const emailDomain = extractDomain(lead.email);
  if (emailDomain && !isFreeEmailProvider(emailDomain)) {
    score += 30;
  }

  // Company data found +20
  if (enriched.companyData?.name) {
    score += 20;
  }

  // Company size scoring
  const size = enriched.companyData?.size;
  if (size === '51-200') score += 15;
  else if (size === '201-500') score += 20;
  else if (size === '501+') score += 15;
  else if (size === '11-50') score += 10;
  else if (size === '1-10') score += 5;

  // Industry relevance (target industries)
  const industry = enriched.companyData?.industry?.toLowerCase() || '';
  if (
    industry.includes('tech') ||
    industry.includes('software') ||
    industry.includes('saas') ||
    industry.includes('ecommerce')
  ) {
    score += 15;
  }

  // LinkedIn found +10
  if (enriched.contactData?.linkedInUrl) {
    score += 10;
  }

  // Seniority bonus
  const seniority = enriched.contactData?.seniority;
  if (seniority === 'C-Level') score += 15;
  else if (seniority === 'VP') score += 10;
  else if (seniority === 'Director') score += 8;
  else if (seniority === 'Manager') score += 5;

  // Message quality (indicates serious intent)
  if (lead.message.length > 100) score += 5;
  if (lead.message.length > 200) score += 5;

  // UK/Europe location (target market)
  const country = enriched.companyData?.location?.country;
  if (country === 'United Kingdom' || country === 'Ireland') score += 10;
  else if (
    country === 'Germany' ||
    country === 'France' ||
    country === 'Netherlands' ||
    country === 'Belgium'
  ) score += 8;

  return Math.min(100, score);
}

/**
 * Convert score to letter grade
 */
function getLeadGrade(score: number): 'A' | 'B' | 'C' | 'D' {
  if (score >= 80) return 'A'; // Hot lead
  if (score >= 60) return 'B'; // Warm lead
  if (score >= 40) return 'C'; // Cold lead
  return 'D'; // Unqualified
}

/**
 * Pre-qualify lead
 */
function qualifyLead(
  lead: LeadData,
  enriched: EnrichedLeadData
): { qualified: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // Qualification criteria
  const hasBusinessEmail = !isFreeEmailProvider(extractDomain(lead.email));
  const hasCompanyData = !!enriched.companyData?.name;
  const goodScore = enriched.score >= 40;

  if (!hasBusinessEmail) {
    reasons.push('Using personal email');
  }

  if (!hasCompanyData) {
    reasons.push('No company data found');
  }

  if (!goodScore) {
    reasons.push('Low lead score');
  }

  if (lead.message.length < 20) {
    reasons.push('Very short message (low intent)');
  }

  // Qualified if: business email AND (company data OR good score)
  const qualified = hasBusinessEmail && (hasCompanyData || goodScore);

  if (qualified) {
    reasons.push('Meets qualification criteria');
  }

  return { qualified, reasons };
}

/**
 * Extract domain from email
 */
function extractDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

/**
 * Check if email domain is a free provider
 */
function isFreeEmailProvider(domain: string): boolean {
  const freeProviders = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'icloud.com',
    'aol.com',
    'mail.com',
    'protonmail.com',
    'zoho.com',
    'yandex.com',
  ];

  return freeProviders.includes(domain);
}

/**
 * Capitalize company name
 */
function capitalizeCompanyName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
