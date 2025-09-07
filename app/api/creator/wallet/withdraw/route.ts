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

    // Check if user is a creator
    if (payload.userType !== 'creator') {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'UNAUTHORIZED', 
            message: 'Creator wallet access required. Regular users should use user wallet.' 
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

    // Get current creator wallet
    const creatorWallet = await DatabaseService.getCreatorWalletByCreatorId(payload.userId)
    if (!creatorWallet) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'WALLET_NOT_FOUND', 
            message: 'Creator wallet not found' 
          } 
        },
        { status: 404 }
      )
    }

    // Check if creator has sufficient funds
    const amountInCents = Math.round(amount * 100)
    if (creatorWallet.balance < amountInCents) {
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

    // Update creator wallet balance
    const newBalance = creatorWallet.balance - amountInCents
    
    const updatedWallet = await DatabaseService.updateCreatorWallet(payload.userId, {
      balance: newBalance,
      pendingWithdrawals: creatorWallet.pendingWithdrawals + amountInCents
    })

    // Create transaction record for creator
    await DatabaseService.createTransaction({
      userId: payload.userId as any,
      type: 'withdrawal',
      amount: amountInCents,
      from: {
        id: payload.userId as any,
        type: 'creator',
        name: payload.username
      },
      to: {
        id: 'system' as any,
        type: 'system',
        name: 'Withdrawal System'
      },
      description: `Creator withdrawal of $${amount.toFixed(2)}`,
      paymentMethodId: paymentMethodId ? paymentMethodId as any : undefined,
      metadata: {
        withdrawalData: withdrawalData?.type || 'Unknown',
        processingTime: '1-3 business days',
        walletType: 'creator'
      }
    })

    return NextResponse.json({
      success: true,
      transactionId: `creator_wth_${Date.now()}`,
      newBalance: newBalance / 100, // Convert back to dollars
      processingTime: '1-3 business days',
      walletType: 'creator'
    })

  } catch (error) {
    console.error('Creator wallet withdrawal error:', error)
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
