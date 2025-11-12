import { Resend } from 'resend';

// Initialize with placeholder if not provided (for build time)
// Will need to be configured in Vercel environment variables for runtime use
export const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_123');
