import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { DatabaseService } from '@/lib/services/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string; userType: string }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = verifyToken(request)
    if (!payload) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'AUTH_REQUIRED', 
            message: 'Authentication required' 
          } 
        },
        { status: 401 }
      )
    }

    // Check if user is a creator
    if (payload.userType !== 'creator') {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'UNAUTHORIZED', 
            message: 'Creator access required' 
          } 
        },
        { status: 403 }
      )
    }

    // Get creator wallet
    let creatorWallet = await DatabaseService.getCreatorWalletByCreatorId(payload.userId)
    
    if (!creatorWallet) {
      // Create creator wallet if it doesn't exist
      creatorWallet = await DatabaseService.createCreatorWallet({
        creatorId: payload.userId as any,
        initialBalance: 0
      })
    }

    // Get earnings summary
    const earningsSummary = await DatabaseService.getCreatorEarningsSummary(payload.userId)

    return NextResponse.json({
      success: true,
      balance: creatorWallet.balance / 100, // Convert from cents to dollars
      currency: creatorWallet.currency,
      totalEarnings: earningsSummary.totalEarnings / 100,
      monthlyEarnings: earningsSummary.monthlyEarnings / 100,
      pendingWithdrawals: creatorWallet.pendingWithdrawals / 100,
      lastUpdated: creatorWallet.lastUpdated,
      earningsBySource: Object.fromEntries(
        Object.entries(earningsSummary.earningsBySource).map(([key, value]) => [key, value / 100])
      )
    })

  } catch (error) {
    console.error('Get creator wallet balance error:', error)
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
