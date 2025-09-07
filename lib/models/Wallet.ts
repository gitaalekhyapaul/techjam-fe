import { ObjectId } from 'mongodb'

export interface Wallet {
  _id?: ObjectId
  userId: ObjectId
  balance: number // in cents
  currency: string
  lastUpdated: Date
  pendingTransactions: number
  totalDeposited: number
  totalWithdrawn: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateWalletData {
  userId: ObjectId
  initialBalance?: number
}

export interface UpdateWalletData {
  balance?: number
  pendingTransactions?: number
  totalDeposited?: number
  totalWithdrawn?: number
}
