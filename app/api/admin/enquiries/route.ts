import { NextRequest, NextResponse } from 'next/server';
import {
  getAllEnquiries,
  getUnrepliedEnquiries,
  getRepliedEnquiries,
  getEnquiriesCount,
} from '@/lib/enquiryStorage';

/**
 * GET /api/admin/enquiries
 * Get all enquiries with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // 'all', 'unreplied', 'replied'

    let enquiries;
    switch (filter) {
      case 'unreplied':
        enquiries = getUnrepliedEnquiries();
        break;
      case 'replied':
        enquiries = getRepliedEnquiries();
        break;
      default:
        enquiries = getAllEnquiries();
    }

    const stats = getEnquiriesCount();

    return NextResponse.json({
      success: true,
      enquiries,
      stats,
    });
  } catch (error) {
    console.error('[Admin Enquiries] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
