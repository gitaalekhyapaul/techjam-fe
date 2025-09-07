import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'

export async function POST(request: NextRequest) {
  try {
    const { creatorId } = await request.json()

    if (!creatorId) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Creator ID is required' 
          } 
        },
        { status: 400 }
      )
    }

    // Create sample earnings for testing
    const sampleEarnings = [
      {
        creatorId: creatorId as any,
        source: 'gifts' as const,
        amount: 5000, // $50.00 in cents
        description: 'Gift from fan @user123',
        fromUserId: 'user123' as any
      },
      {
        creatorId: creatorId as any,
        source: 'subscriptions' as const,
        amount: 999, // $9.99 in cents
        description: 'Monthly subscription from @fan456',
        fromUserId: 'fan456' as any
      },
      {
        creatorId: creatorId as any,
        source: 'boosts' as const,
        amount: 2500, // $25.00 in cents
        description: 'Content boost campaign',
        fromUserId: 'system' as any
      },
      {
        creatorId: creatorId as any,
        source: 'tips' as const,
        amount: 1000, // $10.00 in cents
        description: 'Tip from @supporter789',
        fromUserId: 'supporter789' as any
      }
    ]

    // Add sample earnings
    for (const earning of sampleEarnings) {
      await DatabaseService.createCreatorEarnings(earning)
    }

    // Update creator wallet with total earnings
    const totalEarnings = sampleEarnings.reduce((sum, earning) => sum + earning.amount, 0)
    await DatabaseService.updateCreatorWallet(creatorId, {
      balance: totalEarnings,
      totalEarnings: totalEarnings,
      monthlyEarnings: totalEarnings
    })

    return NextResponse.json({
      success: true,
      message: 'Sample creator data created successfully',
      totalEarnings: totalEarnings / 100, // Convert to dollars
      earningsCount: sampleEarnings.length
    })

  } catch (error) {
    console.error('Create test data error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Internal server error' 
        } 
      },
      { status: 500 }
    )
  }
}
