import { ObjectId } from 'mongodb'

export interface PaymentMethod {
  _id?: ObjectId
  userId: ObjectId
  type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_account"
  
  // Card details (for card payments)
  cardDetails?: {
    brand: string // "visa", "mastercard", "amex"
    last4: string
    expiryMonth: number
    expiryYear: number
    holderName: string
    fingerprint: string // For security
  }
  
  // Bank details (for bank transfers)
  bankDetails?: {
    bankName: string
    accountNumber: string // Encrypted
    routingNumber: string
    accountType: "checking" | "savings"
  }
  
  // PayPal details
  paypalDetails?: {
    email: string
    payerId: string
  }
  
  // Status and settings
  isDefault: boolean
  isActive: boolean
  isVerified: boolean
  
  // Security
  encryptedData: string // Encrypted sensitive information
  verificationStatus: "pending" | "verified" | "failed"
  
  createdAt: Date
  updatedAt: Date
  lastUsed: Date
}

export interface CreatePaymentMethodData {
  userId: ObjectId
  type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_account"
  cardDetails?: {
    brand: string
    last4: string
    expiryMonth: number
    expiryYear: number
    holderName: string
    fingerprint: string
  }
  bankDetails?: {
    bankName: string
    accountNumber: string
    routingNumber: string
    accountType: "checking" | "savings"
  }
  paypalDetails?: {
    email: string
    payerId: string
  }
  isDefault?: boolean
  isActive?: boolean
  isVerified?: boolean
  encryptedData: string
  verificationStatus: "pending" | "verified" | "failed"
  lastUsed?: Date
}

export interface UpdatePaymentMethodData {
  type?: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_account"
  cardDetails?: {
    brand: string
    last4: string
    expiryMonth: number
    expiryYear: number
    holderName: string
    fingerprint: string
  }
  bankDetails?: {
    bankName: string
    accountNumber: string
    routingNumber: string
    accountType: "checking" | "savings"
  }
  paypalDetails?: {
    email: string
    payerId: string
  }
  isDefault?: boolean
  isActive?: boolean
  isVerified?: boolean
  encryptedData?: string
  verificationStatus?: "pending" | "verified" | "failed"
  lastUsed?: Date
  updatedAt: Date
}