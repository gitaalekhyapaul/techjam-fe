import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/services/database'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Create user123 (regular user)
    const userPassword = await bcrypt.hash('1234', 10)
    const user = await DatabaseService.createUser({
      username: 'user123',
      email: 'user123@example.com',
      password: userPassword,
      profile: {
        displayName: 'Regular User',
        bio: 'A regular TikTok user',
        avatar: '/placeholder-user.jpg',
        verified: false,
        followers: 0,
        following: 0,
        totalLikes: 0
      },
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          profileVisibility: 'public',
          showEarnings: false
        },
        language: 'en',
        timezone: 'UTC'
      }
    })

    // Create Creator123 (creator)
    const creatorPassword = await bcrypt.hash('1234', 10)
    const creator = await DatabaseService.createUser({
      username: 'Creator123',
      email: 'creator123@example.com',
      password: creatorPassword,
      profile: {
        displayName: 'Content Creator',
        bio: 'A TikTok content creator',
        avatar: '/placeholder-user.jpg',
        verified: true,
        followers: 0,
        following: 0,
        totalLikes: 0
      },
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          profileVisibility: 'public',
          showEarnings: true
        },
        language: 'en',
        timezone: 'UTC'
      }
    })

    // Create user wallet for user123
    const userWallet = await DatabaseService.createUserWallet({
      userId: user._id!,
      balance: 1000, // Starting with 1000 tokens
      currency: 'USD',
      status: 'active',
      totalDeposited: 1000,
      totalWithdrawn: 0,
      totalSpent: 0,
      autoWithdraw: false,
      withdrawThreshold: 100,
      preferredCurrency: 'USD'
    })

    // Create creator wallet for Creator123
    const creatorWallet = await DatabaseService.createCreatorWallet({
      creatorId: creator._id!,
      balance: 500, // Starting with 500 earnings
      currency: 'USD',
      status: 'active',
      totalEarnings: 500,
      totalWithdrawn: 0,
      pendingEarnings: 0,
      payoutMethod: 'bank',
      payoutThreshold: 50,
      taxId: '',
      businessName: 'Creator123 Content'
    })

    return NextResponse.json({
      success: true,
      message: 'Users and wallets created successfully',
      users: {
        user: {
          id: user._id,
          username: user.username,
          type: 'user',
          walletId: userWallet._id,
          balance: userWallet.balance
        },
        creator: {
          id: creator._id,
          username: creator.username,
          type: 'creator',
          walletId: creatorWallet._id,
          balance: creatorWallet.balance
        }
      }
    })

  } catch (error) {
    console.error('User setup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create users and wallets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

