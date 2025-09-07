import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'

export async function GET(request: NextRequest) {
  try {
    // Get creator wallet data
    const creatorWallets = await DatabaseService.getCollection('creatorWallets')
    const creatorWalletsData = await creatorWallets.find({}).toArray()

    // Get creator transactions
    const transactions = await DatabaseService.getCollection('transactions')
    const creatorTransactions = await transactions.find({ 
      'metadata.walletType': 'creator' 
    }).toArray()

    // Calculate total creator balance
    const totalCreatorBalance = creatorWalletsData.reduce((sum, wallet) => sum + wallet.balance, 0) / 100

    // Get recent creator withdrawals
    const recentWithdrawals = creatorTransactions
      .filter(tx => tx.type === 'withdrawal')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    return NextResponse.json({
      success: true,
      creatorBalance: {
        totalBalance: totalCreatorBalance,
        walletCount: creatorWalletsData.length,
        wallets: creatorWalletsData.map(wallet => ({
          id: wallet._id,
          creatorId: wallet.creatorId,
          balance: wallet.balance / 100,
          totalEarnings: wallet.totalEarnings / 100,
          monthlyEarnings: wallet.monthlyEarnings / 100,
          lastUpdated: wallet.lastUpdated
        }))
      },
      recentWithdrawals: recentWithdrawals.map(tx => ({
        id: tx._id,
        amount: tx.amount / 100,
        method: tx.metadata?.withdrawalData?.type || 'Unknown',
        createdAt: tx.createdAt,
        description: tx.description
      })),
      summary: {
        totalCreatorWallets: creatorWalletsData.length,
        totalCreatorBalance: totalCreatorBalance,
        totalCreatorTransactions: creatorTransactions.length,
        recentWithdrawalCount: recentWithdrawals.length
      }
    })

  } catch (error) {
    console.error('Creator balance dynamic test error:', error)
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
