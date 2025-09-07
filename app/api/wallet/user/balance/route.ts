import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

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

    return NextResponse.json({
      success: true,
      balance: wallet.balance,
      currency: wallet.currency,
      lastUpdated: wallet.lastUpdated,
      totalDeposited: wallet.totalDeposited,
      totalWithdrawn: wallet.totalWithdrawn,
      totalSpent: wallet.totalSpent
    })

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

    let newBalance = wallet.balance
    let updateData: any = {}

    switch (operation) {
      case 'add':
        newBalance = wallet.balance + amount
        updateData = {
          balance: newBalance,
          totalDeposited: wallet.totalDeposited + amount,
          lastUpdated: new Date()
        }
        break
      case 'subtract':
        if (wallet.balance < amount) {
          return NextResponse.json(
            { error: 'Insufficient funds' },
            { status: 400 }
          )
        }
        newBalance = wallet.balance - amount
        updateData = {
          balance: newBalance,
          totalSpent: wallet.totalSpent + amount,
          lastUpdated: new Date()
        }
        break
      case 'withdraw':
        if (wallet.balance < amount) {
          return NextResponse.json(
            { error: 'Insufficient funds' },
            { status: 400 }
          )
        }
        newBalance = wallet.balance - amount
        updateData = {
          balance: newBalance,
          totalWithdrawn: wallet.totalWithdrawn + amount,
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

    return NextResponse.json({
      success: true,
      balance: updatedWallet!.balance,
      currency: updatedWallet!.currency,
      lastUpdated: updatedWallet!.lastUpdated,
      operation,
      amount
    })

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

