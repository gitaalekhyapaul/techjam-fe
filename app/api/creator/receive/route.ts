import { NextRequest, NextResponse } from 'next/server'
import { TokenUtils } from '@/constants/tokens'

// Mock wallet data (in real app, this would be in database)
let mockUserWallet = {
  tk: 1000,
  tki: 400,
  total: 1004
}

let mockCreatorWallet = {
  tk: 500,
  tki: 200,
  total: 502
}

export async function POST(request: NextRequest) {
  try {
    const { fromUserId, amount, description } = await request.json()

    // Validation
    if (!fromUserId || !amount) {
      return NextResponse.json(
        { error: 'fromUserId and amount are required' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    // Validate amount
    const validation = TokenUtils.validateAmount(amount, 'TK', 'transfer')
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Check if user has sufficient TK balance
    if (mockUserWallet.tk < amount) {
      return NextResponse.json(
        { error: 'Insufficient TK (Sparks) balance for transfer' },
        { status: 400 }
      )
    }

    // Calculate new user wallet balances (deduct TK)
    const newUserTkBalance = TokenUtils.roundToTwoDecimals(mockUserWallet.tk - amount)
    const newUserTotalBalance = TokenUtils.calculateTotalBalance(newUserTkBalance, mockUserWallet.tki)

    // Calculate new creator wallet balances (add TK + TKI rebate)
    const newCreatorTkBalance = TokenUtils.roundToTwoDecimals(mockCreatorWallet.tk + amount)
    const tkiRebate = TokenUtils.calculateRebate(amount)
    const newCreatorTkiBalance = TokenUtils.roundToTwoDecimals(mockCreatorWallet.tki + tkiRebate)
    const newCreatorTotalBalance = TokenUtils.calculateTotalBalance(newCreatorTkBalance, newCreatorTkiBalance)

    // Update mock wallets
    mockUserWallet = {
      tk: newUserTkBalance,
      tki: mockUserWallet.tki, // TKI unchanged for user
      total: newUserTotalBalance
    }

    mockCreatorWallet = {
      tk: newCreatorTkBalance,
      tki: newCreatorTkiBalance,
      total: newCreatorTotalBalance
    }

    // Return updated balances for both wallets
    return NextResponse.json({
      success: true,
      transfer: {
        amount: amount,
        fromUserId: fromUserId,
        description: description || `Transfer of ${TokenUtils.formatAmount(amount, 'TK')} TK (Sparks)`,
        tkiRebate: tkiRebate
      },
      userWallet: {
        walletType: 'user',
        balance: {
          tk: mockUserWallet.tk,
          tki: mockUserWallet.tki,
          total: mockUserWallet.total
        }
      },
      creatorWallet: {
        walletType: 'creator',
        balance: {
          tk: mockCreatorWallet.tk,
          tki: mockCreatorWallet.tki,
          total: mockCreatorWallet.total
        }
      },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Receive payment error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

