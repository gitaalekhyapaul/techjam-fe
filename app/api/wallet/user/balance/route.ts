import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'
import { TokenUtils, WalletResponse, WalletBalance } from '@/constants/tokens'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userObjectId = new ObjectId(userId)
    const wallet = await DatabaseService.getUserWallet(userObjectId)

    if (!wallet) {
      return NextResponse.json(
        { error: 'User wallet not found' },
        { status: 404 }
      )
    }

    // Convert legacy balance to token format
    const tokenBalance: WalletBalance = TokenUtils.createBalance(
      wallet.balance || 0, // TK balance
      wallet.tkiBalance || 0 // TKI balance
    )

    const response: WalletResponse = {
      walletType: 'user',
      balance: tokenBalance
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Get user wallet balance error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get wallet balance',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, amount, operation } = await request.json()
    
    if (!userId || amount === undefined || !operation) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, amount, operation' },
        { status: 400 }
      )
    }

    const userObjectId = new ObjectId(userId)
    const wallet = await DatabaseService.getUserWallet(userObjectId)

    if (!wallet) {
      return NextResponse.json(
        { error: 'User wallet not found' },
        { status: 404 }
      )
    }

    const currentTkBalance = wallet.balance || 0
    const currentTkiBalance = wallet.tkiBalance || 0
    const totalBalance = TokenUtils.calculateTotalBalance(currentTkBalance, currentTkiBalance)
    
    let newTkBalance = currentTkBalance
    let newTkiBalance = currentTkiBalance
    let updateData: any = {}

    // Validate transaction
    const validation = TokenUtils.validateTransaction(amount, totalBalance)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    switch (operation) {
      case 'add':
        // Add TK and calculate TKI rebate
        newTkBalance = currentTkBalance + amount
        const rebate = TokenUtils.calculateRebate(amount)
        newTkiBalance = currentTkiBalance + rebate
        
        updateData = {
          balance: newTkBalance,
          tkiBalance: newTkiBalance,
          totalDeposited: (wallet.totalDeposited || 0) + amount,
          lastUpdated: new Date()
        }
        break
      case 'subtract':
        // Only deduct from TK balance
        newTkBalance = currentTkBalance - amount
        updateData = {
          balance: newTkBalance,
          totalSpent: (wallet.totalSpent || 0) + amount,
          lastUpdated: new Date()
        }
        break
      case 'withdraw':
        // Withdraw from total balance (TK + TKI)
        if (amount > totalBalance) {
          return NextResponse.json(
            { error: 'Insufficient total balance' },
            { status: 400 }
          )
        }
        
        // Withdraw from TK first, then TKI if needed
        if (amount <= currentTkBalance) {
          newTkBalance = currentTkBalance - amount
        } else {
          const remainingAmount = amount - currentTkBalance
          newTkBalance = 0
          newTkiBalance = currentTkiBalance - remainingAmount
        }
        
        updateData = {
          balance: newTkBalance,
          tkiBalance: newTkiBalance,
          totalWithdrawn: (wallet.totalWithdrawn || 0) + amount,
          lastUpdated: new Date()
        }
        break
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        )
    }

    const updatedWallet = await DatabaseService.updateUserWallet(userObjectId, updateData)

    // Return updated balance in token format
    const updatedTokenBalance: WalletBalance = TokenUtils.createBalance(
      updatedWallet!.balance || 0,
      updatedWallet!.tkiBalance || 0
    )

    const response: WalletResponse = {
      walletType: 'user',
      balance: updatedTokenBalance
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Update user wallet error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update wallet',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

