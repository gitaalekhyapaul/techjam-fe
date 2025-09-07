import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get('creatorId')
    const trending = searchParams.get('trending')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    let videos

    if (creatorId) {
      const creatorObjectId = new ObjectId(creatorId)
      videos = await DatabaseService.getVideosByCreator(creatorObjectId, limit, skip)
    } else if (trending === 'true') {
      videos = await DatabaseService.getTrendingVideos(limit)
    } else {
      // Get all published videos
      videos = await DatabaseService.getTrendingVideos(limit)
    }

    return NextResponse.json({
      success: true,
      videos,
      count: videos.length
    })

  } catch (error) {
    console.error('Get videos error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch videos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const videoData = await request.json()
    
    // Validate required fields
    if (!videoData.creatorId || !videoData.title || !videoData.description) {
      return NextResponse.json(
        { error: 'Missing required fields: creatorId, title, description' },
        { status: 400 }
      )
    }

    const creatorObjectId = new ObjectId(videoData.creatorId)
    
    const video = await DatabaseService.createVideo({
      ...videoData,
      creatorId: creatorObjectId,
      videoId: videoData.videoId || Date.now(), // Generate unique ID if not provided
      views: videoData.views || { count: 0, display: '0' },
      likes: videoData.likes || { count: 0, display: '0' },
      comments: videoData.comments || { count: 0, display: '0' },
      shares: videoData.shares || { count: 0, display: '0' },
      saves: videoData.saves || { count: 0, display: '0' },
      sound: videoData.sound || { name: 'Original Sound', original: true },
      tokens: videoData.tokens || { earned: 0, spent: 0, total: 0, rate: 0.5 },
      category: videoData.category || 'general',
      tags: videoData.tags || [],
      isVerified: videoData.isVerified || false,
      status: videoData.status || 'published',
      visibility: videoData.visibility || 'public',
      isMonetized: videoData.isMonetized || false,
      publishedAt: videoData.publishedAt || new Date()
    })

    return NextResponse.json({
      success: true,
      video
    })

  } catch (error) {
    console.error('Create video error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

