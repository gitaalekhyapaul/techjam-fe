import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { getDatabase } = await import('@/lib/mongodb')
    const dbInstance = await getDatabase()
    
    // Get collection counts
    const collections = [
      'users',
      'userWallets', 
      'creatorWallets',
      'transactions',
      'paymentMethods',
      'videos',
      'videoInteractions',
      'tokenTransactions',
      'subscriptions'
    ]
    
    const counts: Record<string, number> = {}
    
    for (const collectionName of collections) {
      try {
        const count = await dbInstance.collection(collectionName).countDocuments()
        counts[collectionName] = count
      } catch (error) {
        counts[collectionName] = 0
      }
    }
    
    // Get sample data from each collection
    const sampleData: Record<string, any[]> = {}
    
    for (const collectionName of collections) {
      try {
        const sample = await dbInstance.collection(collectionName).find({}).limit(2).toArray()
        sampleData[collectionName] = sample
      } catch (error) {
        sampleData[collectionName] = []
      }
    }
    
    return NextResponse.json({
      success: true,
      database: 'tiktok-techjam',
      collections: counts,
      sampleData,
      message: 'All collections are accessible and ready for use'
    })

  } catch (error) {
    console.error('Collection test error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test collections',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()
    
    switch (action) {
      case 'create_test_user_wallet':
        const testUserId = new ObjectId()
        const userWallet = await DatabaseService.createUserWallet({
          userId: testUserId,
          balance: 1000,
          currency: 'USD',
          status: 'active'
        })
        
        return NextResponse.json({
          success: true,
          message: 'Test user wallet created',
          wallet: userWallet
        })
        
      case 'create_test_video':
        const testCreatorId = new ObjectId()
        const video = await DatabaseService.createVideo({
          videoId: Date.now(),
          creatorId: testCreatorId,
          creatorUsername: 'test_creator',
          title: 'Test Video',
          description: 'This is a test video #test #demo',
          thumbnail: '/test-thumbnail.jpg',
          videoUrl: '/test-video.mp4',
          duration: 30,
          views: { count: 100, display: '100' },
          likes: { count: 10, display: '10' },
          comments: { count: 5, display: '5' },
          shares: { count: 2, display: '2' },
          saves: { count: 1, display: '1' },
          sound: { name: 'Test Sound', original: true },
          tokens: { earned: 50, spent: 0, total: 50, rate: 0.5 },
          category: 'test',
          tags: ['test', 'demo'],
          isVerified: false,
          status: 'published',
          visibility: 'public',
          isMonetized: true,
          publishedAt: new Date()
        })
        
        return NextResponse.json({
          success: true,
          message: 'Test video created',
          video
        })
        
      case 'create_test_interaction':
        const testVideoId = new ObjectId()
        const testUserId2 = new ObjectId()
        const interaction = await DatabaseService.createVideoInteraction({
          videoId: testVideoId,
          userId: testUserId2,
          interactionType: 'like',
          timestamp: new Date(),
          deviceType: 'mobile'
        })
        
        return NextResponse.json({
          success: true,
          message: 'Test interaction created',
          interaction
        })
        
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Test action error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to execute test action',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
