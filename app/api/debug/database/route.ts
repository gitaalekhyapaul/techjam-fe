import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    
    // Get collection counts
    const usersCount = await db.collection('users').countDocuments()
    const walletsCount = await db.collection('wallets').countDocuments()
    const transactionsCount = await db.collection('transactions').countDocuments()
    const paymentMethodsCount = await db.collection('paymentMethods').countDocuments()
    const subscriptionsCount = await db.collection('subscriptions').countDocuments()
    
    // Get sample data
    const sampleUsers = await db.collection('users').find({}).limit(3).toArray()
    const sampleWallets = await db.collection('wallets').find({}).limit(3).toArray()
    const sampleTransactions = await db.collection('transactions').find({}).limit(3).toArray()
    
    return NextResponse.json({
      success: true,
      database: 'tiktok-techjam',
      collections: {
        users: usersCount,
        wallets: walletsCount,
        transactions: transactionsCount,
        paymentMethods: paymentMethodsCount,
        subscriptions: subscriptionsCount
      },
      sampleData: {
        users: sampleUsers.map(user => ({
          id: user._id,
          username: user.username,
          email: user.email,
          userType: user.userType,
          createdAt: user.createdAt
        })),
        wallets: sampleWallets.map(wallet => ({
          id: wallet._id,
          userId: wallet.userId,
          balance: wallet.balance,
          currency: wallet.currency,
          lastUpdated: wallet.lastUpdated
        })),
        transactions: sampleTransactions.map(transaction => ({
          id: transaction._id,
          type: transaction.type,
          amount: transaction.amount,
          status: transaction.status,
          description: transaction.description,
          createdAt: transaction.createdAt
        }))
      }
    })
    
  } catch (error) {
    console.error('Database debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'DATABASE_ERROR', 
          message: 'Failed to connect to database',
          details: error instanceof Error ? error.message : 'Unknown error'
        } 
      },
      { status: 500 }
    )
  }
}
