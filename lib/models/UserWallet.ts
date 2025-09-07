import { ObjectId } from 'mongodb'

export interface UserWallet {
  _id?: ObjectId
  userId: ObjectId // Reference to users collection
  balance: number // Current wallet balance
  currency: string // "USD", "EUR", etc.
  status: "active" | "suspended" | "closed"
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
  
  // Transaction summary
  totalDeposited: number
  totalWithdrawn: number
  totalSpent: number
  
  // Settings
  autoWithdraw: boolean
  withdrawThreshold: number
  preferredCurrency: string
}

export interface CreateUserWalletData {
  userId: ObjectId
  balance: number
  currency: string
  status: "active" | "suspended" | "closed"
  totalDeposited?: number
  totalWithdrawn?: number
  totalSpent?: number
  autoWithdraw?: boolean
  withdrawThreshold?: number
  preferredCurrency?: string
}

export interface UpdateUserWalletData {
  balance?: number
  currency?: string
  status?: "active" | "suspended" | "closed"
  totalDeposited?: number
  totalWithdrawn?: number
  totalSpent?: number
  autoWithdraw?: boolean
  withdrawThreshold?: number
  preferredCurrency?: string
  lastUpdated?: Date
  updatedAt: Date
}

