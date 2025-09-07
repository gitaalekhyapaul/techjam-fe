import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock sharing statistics data
    const shareStats = {
      totalShares: 1247,
      totalClicks: 3892,
      platformBreakdown: [
        { platform: 'TikTok', shares: 456, clicks: 1234 },
        { platform: 'Instagram', shares: 234, clicks: 567 },
        { platform: 'Twitter', shares: 189, clicks: 445 },
        { platform: 'Facebook', shares: 178, clicks: 432 },
        { platform: 'YouTube', shares: 190, clicks: 1214 }
      ]
    }

    return NextResponse.json(shareStats)
  } catch (error) {
    console.error('Error fetching share stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch share statistics' },
      { status: 500 }
    )
  }
}
