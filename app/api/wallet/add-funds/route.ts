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

    const { amount, paymentMethodId, paymentData } = await request.json()

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

    // Get current wallet
    let wallet = await DatabaseService.getWalletByUserId(payload.userId)
    if (!wallet) {
      wallet = await DatabaseService.createWallet({
        userId: payload.userId as any,
        initialBalance: 0
      })
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update wallet balance
    const amountInCents = Math.round(amount * 100)
    const newBalance = wallet.balance + amountInCents
    
    const updatedWallet = await DatabaseService.updateWallet(payload.userId, {
      balance: newBalance,
      totalDeposited: wallet.totalDeposited + amountInCents
    })

    // Create transaction record
    await DatabaseService.createTransaction({
      userId: payload.userId as any,
      type: 'deposit',
      amount: amountInCents,
      from: {
        id: 'system' as any,
        type: 'system',
        name: 'Payment System'
      },
      to: {
        id: payload.userId as any,
        type: 'user',
        name: payload.username
      },
      description: `Deposit of $${amount.toFixed(2)}`,
      paymentMethodId: paymentMethodId ? paymentMethodId as any : undefined,
      metadata: {
        paymentData: paymentData?.type || 'Unknown',
        processingTime: '2-3 business days'
      }
    })

    return NextResponse.json({
      success: true,
      transactionId: `txn_${Date.now()}`,
      newBalance: newBalance / 100, // Convert back to dollars
      processingTime: '2-3 business days'
    })

  } catch (error) {
    console.error('Add funds error:', error)
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
