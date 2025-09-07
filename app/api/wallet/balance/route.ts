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

    const wallet = await DatabaseService.getWalletByUserId(payload.userId)
    
    if (!wallet) {
      // Create wallet if it doesn't exist
      const newWallet = await DatabaseService.createWallet({
        userId: payload.userId as any,
        initialBalance: 0
      })
      
      return NextResponse.json({
        success: true,
        balance: newWallet.balance / 100, // Convert from cents to dollars
        currency: newWallet.currency,
        lastUpdated: newWallet.lastUpdated,
        pendingTransactions: newWallet.pendingTransactions
      })
    }

    return NextResponse.json({
      success: true,
      balance: wallet.balance / 100, // Convert from cents to dollars
      currency: wallet.currency,
      lastUpdated: wallet.lastUpdated,
      pendingTransactions: wallet.pendingTransactions
    })

  } catch (error) {
    console.error('Get wallet balance error:', error)
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
