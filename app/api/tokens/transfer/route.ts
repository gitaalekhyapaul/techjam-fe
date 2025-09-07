import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { userId, videoId, amount } = await request.json()

    if (!userId || !videoId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user wallet
    const userWallet = await DatabaseService.getUserWallet(new ObjectId(userId))
    if (!userWallet) {
      return NextResponse.json(
        { success: false, error: 'User wallet not found' },
        { status: 404 }
      )
    }

    // Check if user has enough tokens
    if (userWallet.tokens < amount) {
      return NextResponse.json(
        { success: false, error: 'Insufficient tokens' },
        { status: 400 }
      )
    }

    // Get video
    const video = await DatabaseService.getVideoById(videoId)
    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      )
    }

    // Get creator wallet
    const creatorWallet = await DatabaseService.getCreatorWalletByCreatorId(video.creatorId.toString())
    if (!creatorWallet) {
      return NextResponse.json(
        { success: false, error: 'Creator wallet not found' },
        { status: 404 }
      )
    }

    // Perform token transfer
    await DatabaseService.transferTokens(userId, videoId, amount)

    // Update video token count
    await DatabaseService.updateVideoTokens(videoId, amount)

    // Update creator earnings
    await DatabaseService.updateCreatorEarnings(video.creatorId.toString(), amount)

    return NextResponse.json({
      success: true,
      message: 'Tokens transferred successfully',
      newUserBalance: userWallet.tokens - amount,
      newVideoTokens: video.tokens.earned + amount,
      newCreatorEarnings: creatorWallet.earnings + amount
    })
  } catch (error) {
    console.error('Error transferring tokens:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

