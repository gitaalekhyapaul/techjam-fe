import { ObjectId } from 'mongodb'

export interface CreatorWallet {
  _id?: ObjectId
  creatorId: ObjectId
  balance: number // in cents
  currency: string
  totalEarnings: number // in cents
  monthlyEarnings: number // in cents
  pendingWithdrawals: number // in cents
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreatorEarnings {
  _id?: ObjectId
  creatorId: ObjectId
  source: 'gifts' | 'subscriptions' | 'boosts' | 'ad_revenue' | 'tips'
  amount: number // in cents
  description: string
  fromUserId?: ObjectId
  transactionId?: ObjectId
  createdAt: Date
}

export interface CreateCreatorWalletData {
  creatorId: ObjectId
  initialBalance?: number
}

export interface UpdateCreatorWalletData {
  balance?: number
  totalEarnings?: number
  monthlyEarnings?: number
  pendingWithdrawals?: number
}

export interface CreateEarningsData {
  creatorId: ObjectId
  source: CreatorEarnings['source']
  amount: number
  description: string
  fromUserId?: ObjectId
  transactionId?: ObjectId
}
