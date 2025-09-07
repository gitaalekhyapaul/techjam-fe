import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'

export async function GET(request: NextRequest) {
  try {
    // Get all user wallets
    const userWallets = await DatabaseService.getCollection('wallets')
    const userWalletsData = await userWallets.find({}).toArray()

    // Get all creator wallets
    const creatorWallets = await DatabaseService.getCollection('creatorWallets')
    const creatorWalletsData = await creatorWallets.find({}).toArray()

    // Get all transactions
    const transactions = await DatabaseService.getCollection('transactions')
    const userTransactions = await transactions.find({ 
      'metadata.walletType': 'user' 
    }).toArray()
    
    const creatorTransactions = await transactions.find({ 
      'metadata.walletType': 'creator' 
    }).toArray()

    return NextResponse.json({
      success: true,
      separation: {
        userWallets: {
          count: userWalletsData.length,
          wallets: userWalletsData.map(wallet => ({
            id: wallet._id,
            userId: wallet.userId,
            balance: wallet.balance / 100, // Convert to dollars
            currency: wallet.currency,
            lastUpdated: wallet.lastUpdated
          }))
        },
        creatorWallets: {
          count: creatorWalletsData.length,
          wallets: creatorWalletsData.map(wallet => ({
            id: wallet._id,
            creatorId: wallet.creatorId,
            balance: wallet.balance / 100, // Convert to dollars
            totalEarnings: wallet.totalEarnings / 100,
            currency: wallet.currency,
            lastUpdated: wallet.lastUpdated
          }))
        },
        transactions: {
          userTransactions: {
            count: userTransactions.length,
            transactions: userTransactions.map(tx => ({
              id: tx._id,
              type: tx.type,
              amount: tx.amount / 100,
              walletType: tx.metadata?.walletType,
              description: tx.description,
              createdAt: tx.createdAt
            }))
          },
          creatorTransactions: {
            count: creatorTransactions.length,
            transactions: creatorTransactions.map(tx => ({
              id: tx._id,
              type: tx.type,
              amount: tx.amount / 100,
              walletType: tx.metadata?.walletType,
              description: tx.description,
              createdAt: tx.createdAt
            }))
          }
        }
      },
      summary: {
        totalUserWallets: userWalletsData.length,
        totalCreatorWallets: creatorWalletsData.length,
        totalUserTransactions: userTransactions.length,
        totalCreatorTransactions: creatorTransactions.length,
        userTotalBalance: userWalletsData.reduce((sum, wallet) => sum + wallet.balance, 0) / 100,
        creatorTotalBalance: creatorWalletsData.reduce((sum, wallet) => sum + wallet.balance, 0) / 100
      }
    })

  } catch (error) {
    console.error('Wallet separation test error:', error)
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
