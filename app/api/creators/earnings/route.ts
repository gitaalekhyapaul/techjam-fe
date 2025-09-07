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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Get earnings history
    const earnings = await DatabaseService.getCreatorEarnings(payload.userId, limit, skip)
    
    // Get earnings summary
    const summary = await DatabaseService.getCreatorEarningsSummary(payload.userId)

    return NextResponse.json({
      success: true,
      earnings: earnings.map(earning => ({
        id: earning._id,
        source: earning.source,
        amount: earning.amount / 100, // Convert to dollars
        description: earning.description,
        fromUserId: earning.fromUserId,
        createdAt: earning.createdAt
      })),
      summary: {
        totalEarnings: summary.totalEarnings / 100,
        monthlyEarnings: summary.monthlyEarnings / 100,
        earningsBySource: Object.fromEntries(
          Object.entries(summary.earningsBySource).map(([key, value]) => [key, value / 100])
        )
      },
      pagination: {
        page,
        limit,
        total: earnings.length
      }
    })

  } catch (error) {
    console.error('Get creator earnings error:', error)
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
