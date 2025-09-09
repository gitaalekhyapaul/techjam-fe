import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'
import { TokenUtils, WalletResponse, WalletBalance } from '@/constants/tokens'

export async function POST(request: NextRequest) {
  try {
    const { fromUserId, toCreatorId, amount } = await request.json()
    
    if (!fromUserId || !toCreatorId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: fromUserId, toCreatorId, amount' },
        { status: 400 }
      )
    }

    // Validate transfer amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Transfer amount must be greater than 0' },
        { status: 400 }
      )
    }

    const fromUserObjectId = new ObjectId(fromUserId)
    
    // Get both wallets
    const [userWallet, creatorWallet] = await Promise.all([
      DatabaseService.getUserWallet(fromUserObjectId),
      DatabaseService.getCreatorWalletByCreatorId(toCreatorId)
    ])

    if (!userWallet) {
      return NextResponse.json(
        { error: 'User wallet not found' },
        { status: 404 }
      )
    }

    if (!creatorWallet) {
      return NextResponse.json(
        { error: 'Creator wallet not found' },
        { status: 404 }
      )
    }

    const userTkBalance = userWallet.balance || 0
    const userTkiBalance = userWallet.tkiBalance || 0
    const userTotalBalance = TokenUtils.calculateTotalBalance(userTkBalance, userTkiBalance)

    // Validate user has sufficient balance
    if (amount > userTkBalance) {
      return NextResponse.json(
        { error: 'Insufficient TK balance for transfer' },
        { status: 400 }
      )
    }

    // Calculate new balances
    const newUserTkBalance = userTkBalance - amount
    const newCreatorTkBalance = (creatorWallet.balance || 0) + amount
    
    // Calculate TKI rebate for creator
    const creatorRebate = TokenUtils.calculateRebate(amount)
    const newCreatorTkiBalance = (creatorWallet.tkiBalance || 0) + creatorRebate

    // Update both wallets in a transaction-like manner
    const [updatedUserWallet, updatedCreatorWallet] = await Promise.all([
      DatabaseService.updateUserWallet(fromUserObjectId, {
        balance: newUserTkBalance,
        totalSpent: (userWallet.totalSpent || 0) + amount,
        lastUpdated: new Date()
      }),
      DatabaseService.updateCreatorWallet(toCreatorId, {
        balance: newCreatorTkBalance,
        tkiBalance: newCreatorTkiBalance,
        totalEarnings: (creatorWallet.totalEarnings || 0) + amount,
        lastUpdated: new Date()
      })
    ])

    // Return updated balances for both wallets
    const userBalance: WalletBalance = TokenUtils.createBalance(
      updatedUserWallet!.balance || 0,
      updatedUserWallet!.tkiBalance || 0
    )

    const creatorBalance: WalletBalance = TokenUtils.createBalance(
      updatedCreatorWallet!.balance || 0,
      updatedCreatorWallet!.tkiBalance || 0
    )

    return NextResponse.json({
      success: true,
      transfer: {
        amount,
        fromUserId,
        toCreatorId,
        timestamp: new Date()
      },
      userWallet: {
        walletType: 'user' as const,
        balance: userBalance
      },
      creatorWallet: {
        walletType: 'creator' as const,
        balance: creatorBalance
      }
    })

  } catch (error) {
    console.error('Transfer error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process transfer',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

