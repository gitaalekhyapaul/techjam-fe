import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'
import videosData from '@/data/videos.json'

export async function POST(request: NextRequest) {
  try {
    const { creatorId } = await request.json()
    
    if (!creatorId) {
      return NextResponse.json(
        { error: 'Creator ID is required' },
        { status: 400 }
      )
    }

    const creatorObjectId = new ObjectId(creatorId)
    const migratedVideos = []

    for (const video of videosData.videos) {
      // Convert string numbers to actual numbers
      const viewsCount = parseDisplayNumber(video.views)
      const likesCount = parseDisplayNumber(video.likes)
      const commentsCount = parseDisplayNumber(video.comments)
      const sharesCount = parseDisplayNumber(video.shares)
      const savesCount = parseDisplayNumber(video.saves)

      const videoData = {
        videoId: video.id,
        creatorId: creatorObjectId,
        creatorUsername: video.username,
        title: `Video ${video.id}`, // Generate title if not provided
        description: video.description,
        thumbnail: video.thumbnail,
        videoUrl: `/videos/${video.id}.mp4`, // Generate video URL
        duration: 30, // Default duration
        views: {
          count: viewsCount,
          display: video.views
        },
        likes: {
          count: likesCount,
          display: video.likes
        },
        comments: {
          count: commentsCount,
          display: video.comments
        },
        shares: {
          count: sharesCount,
          display: video.shares
        },
        saves: {
          count: savesCount,
          display: video.saves
        },
        sound: {
          name: video.sound,
          original: true
        },
        tokens: {
          earned: video.tokens.earned,
          spent: video.tokens.spent,
          total: video.tokens.total,
          rate: video.tokens.rate
        },
        category: getCategoryFromDescription(video.description),
        tags: extractHashtags(video.description),
        isVerified: video.verified,
        status: 'published' as const,
        visibility: 'public' as const,
        isMonetized: true,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
      }

      const createdVideo = await DatabaseService.createVideo(videoData)
      migratedVideos.push(createdVideo)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migratedVideos.length} videos`,
      videos: migratedVideos.map(v => ({
        id: v._id,
        videoId: v.videoId,
        title: v.title,
        creator: v.creatorUsername
      }))
    })

  } catch (error) {
    console.error('Video migration error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to migrate videos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Helper function to parse display numbers like "2.8M", "56.8K" to actual numbers
function parseDisplayNumber(display: string): number {
  const clean = display.replace(/[^\d.KM]/g, '')
  const num = parseFloat(clean)
  
  if (clean.includes('M')) {
    return Math.floor(num * 1000000)
  } else if (clean.includes('K')) {
    return Math.floor(num * 1000)
  } else {
    return Math.floor(num)
  }
}

// Helper function to extract category from description
function getCategoryFromDescription(description: string): string {
  const categories = [
    'dance', 'comedy', 'cooking', 'beauty', 'fashion', 'fitness',
    'gaming', 'music', 'art', 'education', 'lifestyle', 'travel',
    'pets', 'sports', 'tech', 'diy', 'nature'
  ]
  
  const lowerDesc = description.toLowerCase()
  for (const category of categories) {
    if (lowerDesc.includes(category)) {
      return category
    }
  }
  
  return 'general'
}

// Helper function to extract hashtags from description
function extractHashtags(description: string): string[] {
  const hashtagRegex = /#[\w]+/g
  const matches = description.match(hashtagRegex)
  return matches ? matches.map(tag => tag.substring(1)) : []
}

