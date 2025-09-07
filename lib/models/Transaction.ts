import { ObjectId } from 'mongodb'

export interface Transaction {
  _id?: ObjectId
  userId: ObjectId // User who made the transaction
  walletId: ObjectId // Reference to wallet (user or creator)
  type: "deposit" | "withdrawal" | "payment" | "earning" | "refund" | "fee"
  category: "wallet_funding" | "creator_payment" | "subscription" | "gift" | "withdrawal"
  
  // Transaction details
  amount: number
  currency: string
  description: string
  
  // Payment method details
  paymentMethod: {
    type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_transfer"
    last4?: string // Last 4 digits of card
    brand?: string // Visa, Mastercard, etc.
    expiryMonth?: number
    expiryYear?: number
  }
  
  // Status and processing
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  processingFee: number
  netAmount: number // Amount after fees
  
  // Metadata
  externalId: string // External payment processor ID
  metadata: {
    ipAddress?: string
    userAgent?: string
    deviceType?: string
    location?: {
      country: string
      city: string
    }
  }
  
  // Timestamps
  processedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateTransactionData {
  userId: ObjectId
  walletId: ObjectId
  type: "deposit" | "withdrawal" | "payment" | "earning" | "refund" | "fee"
  category: "wallet_funding" | "creator_payment" | "subscription" | "gift" | "withdrawal"
  amount: number
  currency: string
  description: string
  paymentMethod: {
    type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_transfer"
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
  }
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  processingFee: number
  netAmount: number
  externalId: string
  metadata: {
    ipAddress?: string
    userAgent?: string
    deviceType?: string
    location?: {
      country: string
      city: string
    }
  }
  processedAt?: Date
  completedAt?: Date
}

export interface UpdateTransactionData {
  type?: "deposit" | "withdrawal" | "payment" | "earning" | "refund" | "fee"
  category?: "wallet_funding" | "creator_payment" | "subscription" | "gift" | "withdrawal"
  amount?: number
  currency?: string
  description?: string
  paymentMethod?: {
    type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_transfer"
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
  }
  status?: "pending" | "processing" | "completed" | "failed" | "cancelled"
  processingFee?: number
  netAmount?: number
  externalId?: string
  metadata?: {
    ipAddress?: string
    userAgent?: string
    deviceType?: string
    location?: {
      country: string
      city: string
    }
  }
  processedAt?: Date
  completedAt?: Date
  updatedAt: Date
}