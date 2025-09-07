import { ObjectId } from 'mongodb'

export interface Transaction {
  _id?: ObjectId
  userId: ObjectId
  type: 'gift' | 'subscription' | 'boost' | 'deposit' | 'withdrawal' | 'refund'
  amount: number // in cents
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  from: {
    id: ObjectId
    type: 'user' | 'creator' | 'system'
    name: string
  }
  to: {
    id: ObjectId
    type: 'user' | 'creator' | 'system'
    name: string
  }
  description: string
  paymentMethodId?: ObjectId
  processingTime?: string
  metadata?: any
  createdAt: Date
  updatedAt: Date
}

export interface CreateTransactionData {
  userId: ObjectId
  type: Transaction['type']
  amount: number
  from: Transaction['from']
  to: Transaction['to']
  description: string
  paymentMethodId?: ObjectId
  metadata?: any
}

export interface UpdateTransactionData {
  status?: Transaction['status']
  processingTime?: string
  metadata?: any
}
