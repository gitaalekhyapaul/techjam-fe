import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = new ObjectId(params.id)
    const video = await DatabaseService.getVideo(videoId)

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      video
    })

  } catch (error) {
    console.error('Get video error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = new ObjectId(params.id)
    const updateData = await request.json()

    const video = await DatabaseService.updateVideo(videoId, updateData)

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      video
    })

  } catch (error) {
    console.error('Update video error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = new ObjectId(params.id)
    const deleted = await DatabaseService.deleteVideo(videoId)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    })

  } catch (error) {
    console.error('Delete video error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

