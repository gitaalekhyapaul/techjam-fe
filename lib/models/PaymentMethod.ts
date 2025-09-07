import { ObjectId } from 'mongodb'

export interface PaymentMethod {
  _id?: ObjectId
  userId: ObjectId
  type: 'Credit Card' | 'PayPal' | 'Google Pay' | 'Apple Pay'
  cardType?: string
  lastFour: string
  expiryDate?: string
  email?: string
  isDefault: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreatePaymentMethodData {
  userId: ObjectId
  type: PaymentMethod['type']
  cardType?: string
  lastFour: string
  expiryDate?: string
  email?: string
  isDefault?: boolean
}

export interface UpdatePaymentMethodData {
  isDefault?: boolean
  isActive?: boolean
  cardType?: string
  lastFour?: string
  expiryDate?: string
  email?: string
}
