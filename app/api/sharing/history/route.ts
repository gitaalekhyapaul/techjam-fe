import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock sharing history data
    const shareHistory = [
      {
        id: '1',
        platform: 'TikTok',
        url: 'https://tiktok.com/@creator/video/123',
        title: 'Dance Challenge Tutorial',
        description: 'Learn this viral dance in 60 seconds!',
        timestamp: new Date('2024-01-15T10:30:00Z'),
        shares: 234,
        clicks: 567
      },
      {
        id: '2',
        platform: 'Instagram',
        url: 'https://instagram.com/p/abc123',
        title: 'Cooking Tips & Tricks',
        description: '5 kitchen hacks that will change your life',
        timestamp: new Date('2024-01-14T15:45:00Z'),
        shares: 189,
        clicks: 445
      },
      {
        id: '3',
        platform: 'Twitter',
        url: 'https://twitter.com/creator/status/123456',
        title: 'Lifestyle Vlog',
        description: 'A day in my life as a content creator',
        timestamp: new Date('2024-01-13T09:20:00Z'),
        shares: 156,
        clicks: 389
      },
      {
        id: '4',
        platform: 'Facebook',
        url: 'https://facebook.com/creator/posts/123456',
        title: 'Fitness Routine',
        description: '10-minute workout for busy people',
        timestamp: new Date('2024-01-12T14:15:00Z'),
        shares: 123,
        clicks: 298
      },
      {
        id: '5',
        platform: 'YouTube',
        url: 'https://youtube.com/watch?v=abc123',
        title: 'Tech Review',
        description: 'iPhone 15 Pro Max - Full Review',
        timestamp: new Date('2024-01-11T11:30:00Z'),
        shares: 445,
        clicks: 1234
      }
    ]

    return NextResponse.json(shareHistory)
  } catch (error) {
    console.error('Error fetching share history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch share history' },
      { status: 500 }
    )
  }
}
