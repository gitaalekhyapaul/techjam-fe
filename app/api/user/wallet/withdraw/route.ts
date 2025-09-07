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

export async function POST(request: NextRequest) {
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

    // Check if user is a regular user (not creator)
    if (payload.userType === 'creator') {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'UNAUTHORIZED', 
            message: 'User wallet access required. Creators should use creator wallet.' 
          } 
        },
        { status: 403 }
      )
    }

    const { amount, paymentMethodId, withdrawalData } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Valid amount is required' 
          } 
        },
        { status: 400 }
      )
    }

    // Get current user wallet
    const wallet = await DatabaseService.getWalletByUserId(payload.userId)
    if (!wallet) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'WALLET_NOT_FOUND', 
            message: 'User wallet not found' 
          } 
        },
        { status: 404 }
      )
    }

    // Check if user has sufficient funds
    const amountInCents = Math.round(amount * 100)
    if (wallet.balance < amountInCents) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'INSUFFICIENT_FUNDS', 
            message: 'Insufficient funds for withdrawal' 
          } 
        },
        { status: 400 }
      )
    }

    // Simulate withdrawal processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update user wallet balance
    const newBalance = wallet.balance - amountInCents
    
    const updatedWallet = await DatabaseService.updateWallet(payload.userId, {
      balance: newBalance,
      totalWithdrawn: wallet.totalWithdrawn + amountInCents
    })

    // Create transaction record
    await DatabaseService.createTransaction({
      userId: payload.userId as any,
      type: 'withdrawal',
      amount: amountInCents,
      from: {
        id: payload.userId as any,
        type: 'user',
        name: payload.username
      },
      to: {
        id: 'system' as any,
        type: 'system',
        name: 'Withdrawal System'
      },
      description: `User withdrawal of $${amount.toFixed(2)}`,
      paymentMethodId: paymentMethodId ? paymentMethodId as any : undefined,
      metadata: {
        withdrawalData: withdrawalData?.type || 'Unknown',
        processingTime: '1-3 business days',
        walletType: 'user'
      }
    })

    return NextResponse.json({
      success: true,
      transactionId: `user_wth_${Date.now()}`,
      newBalance: newBalance / 100, // Convert back to dollars
      processingTime: '1-3 business days',
      walletType: 'user'
    })

  } catch (error) {
    console.error('User wallet withdrawal error:', error)
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
