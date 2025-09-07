import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get('creatorId')
    
    if (!creatorId) {
      return NextResponse.json(
        { error: 'Creator ID is required' },
        { status: 400 }
      )
    }

    const wallet = await DatabaseService.getCreatorWalletByCreatorId(creatorId)

    if (!wallet) {
      return NextResponse.json(
        { error: 'Creator wallet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      balance: wallet.balance,
      currency: wallet.currency,
      lastUpdated: wallet.lastUpdated,
      totalEarnings: wallet.totalEarnings,
      totalWithdrawn: wallet.totalWithdrawn,
      pendingEarnings: wallet.pendingEarnings
    })

  } catch (error) {
    console.error('Get creator wallet balance error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get creator wallet balance',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { creatorId, amount, operation } = await request.json()
    
    if (!creatorId || amount === undefined || !operation) {
      return NextResponse.json(
        { error: 'Missing required fields: creatorId, amount, operation' },
        { status: 400 }
      )
    }

    const wallet = await DatabaseService.getCreatorWalletByCreatorId(creatorId)

    if (!wallet) {
      return NextResponse.json(
        { error: 'Creator wallet not found' },
        { status: 404 }
      )
    }

    let newBalance = wallet.balance
    let updateData: any = {}

    switch (operation) {
      case 'add_earnings':
        newBalance = wallet.balance + amount
        updateData = {
          balance: newBalance,
          totalEarnings: wallet.totalEarnings + amount,
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

    const updatedWallet = await DatabaseService.updateCreatorWallet(creatorId, updateData)

    return NextResponse.json({
      success: true,
      balance: updatedWallet!.balance,
      currency: updatedWallet!.currency,
      lastUpdated: updatedWallet!.lastUpdated,
      operation,
      amount
    })

  } catch (error) {
    console.error('Update creator wallet error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update creator wallet',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

