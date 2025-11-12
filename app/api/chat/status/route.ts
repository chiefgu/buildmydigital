import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { agentId, status } = await request.json();

    if (!agentId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (status === 'online') {
      db.setTeamOnline(agentId);
    } else {
      db.setTeamOffline(agentId);
    }

    return NextResponse.json({
      success: true,
      status,
      onlineTeam: db.getOnlineTeam(),
    });

  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      isAnyTeamOnline: db.isAnyTeamOnline(),
      onlineTeam: db.getOnlineTeam(),
    });
  } catch (error) {
    console.error('Get status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
