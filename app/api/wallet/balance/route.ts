import { NextRequest, NextResponse } from 'next/server'
import { TokenUtils } from '@/constants/tokens'

// Mock user wallet data (in real app, this would be in database)
let mockUserWallet = {
  tk: 1000,
  tki: 400,
  total: 1004
}

export async function GET(request: NextRequest) {
  try {
    // Return current user wallet balance
    return NextResponse.json({
      success: true,
      walletType: 'user',
      balance: {
        tk: mockUserWallet.tk,
        tki: mockUserWallet.tki,
        total: mockUserWallet.total
      },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Get balance error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get wallet balance',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}