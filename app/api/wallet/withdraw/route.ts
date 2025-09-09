import { NextRequest, NextResponse } from 'next/server'
import { TokenUtils } from '@/constants/tokens'

// Mock user wallet data (in real app, this would be in database)
let mockUserWallet = {
  tk: 1000,
  tki: 400,
  total: 1004
}

export async function POST(request: NextRequest) {
  try {
    const { amount, method } = await request.json()

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    if (!method) {
      return NextResponse.json(
        { error: 'Withdrawal method is required' },
        { status: 400 }
      )
    }

    // Validate amount
    const validation = TokenUtils.validateAmount(amount, 'TK', 'withdraw')
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Check if sufficient TK balance
    if (mockUserWallet.tk < amount) {
      return NextResponse.json(
        { error: 'Insufficient TK (Sparks) balance for withdrawal' },
        { status: 400 }
      )
    }

    // Calculate new balances (only deduct TK, TKI remains unchanged)
    const newTkBalance = TokenUtils.roundToTwoDecimals(mockUserWallet.tk - amount)
    const newTotalBalance = TokenUtils.calculateTotalBalance(newTkBalance, mockUserWallet.tki)

    // Update mock wallet
    mockUserWallet = {
      tk: newTkBalance,
      tki: mockUserWallet.tki, // TKI balance unchanged
      total: newTotalBalance
    }

    // Return updated balance
    return NextResponse.json({
      success: true,
      walletType: 'user',
      balance: {
        tk: mockUserWallet.tk,
        tki: mockUserWallet.tki,
        total: mockUserWallet.total
      },
      lastUpdated: new Date().toISOString(),
      amountWithdrawn: amount,
      withdrawalMethod: method
    })

  } catch (error) {
    console.error('Withdraw funds error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to withdraw funds',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

