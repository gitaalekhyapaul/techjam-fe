// Mock API service for sharing functionality
export interface ShareData {
  id: string
  platform: string
  url: string
  title: string
  description: string
  timestamp: Date
  shares: number
  clicks: number
}

export interface ShareStats {
  totalShares: number
  totalClicks: number
  platformBreakdown: {
    platform: string
    shares: number
    clicks: number
  }[]
}

class SharingApiService {
  private baseUrl = '/api/sharing'

  // Get sharing statistics
  async getShareStats(): Promise<ShareStats> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`)
      if (!response.ok) {
        throw new Error('Failed to fetch share stats')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching share stats:', error)
      // Return mock data if API fails
      return {
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
    }
  }

  // Get sharing history
  async getShareHistory(): Promise<ShareData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/history`)
      if (!response.ok) {
        throw new Error('Failed to fetch share history')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching share history:', error)
      // Return mock data if API fails
      return [
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
    }
  }

  // Share content to a platform
  async shareContent(platform: string, content: { title: string; description: string; url?: string }): Promise<{ success: boolean; shareUrl?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          ...content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to share content')
      }

      return await response.json()
    } catch (error) {
      console.error('Error sharing content:', error)
      // Return mock success response
      return {
        success: true,
        shareUrl: `https://${platform.toLowerCase()}.com/shared/${Date.now()}`
      }
    }
  }

  // Track share click
  async trackShareClick(shareId: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/track/${shareId}`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('Error tracking share click:', error)
    }
  }
}

export const sharingApiService = new SharingApiService()
