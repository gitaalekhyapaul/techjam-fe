import { ObjectId } from 'mongodb'

export interface Subscription {
  _id?: ObjectId
  userId: ObjectId
  creatorId: ObjectId
  tier: 'Basic' | 'Premium' | 'VIP'
  price: number // in cents
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  nextBilling: Date
  paymentMethodId: ObjectId
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
}

export interface CreateSubscriptionData {
  userId: ObjectId
  creatorId: ObjectId
  tier: Subscription['tier']
  price: number
  paymentMethodId: ObjectId
  nextBilling: Date
}

export interface UpdateSubscriptionData {
  tier?: Subscription['tier']
  status?: Subscription['status']
  nextBilling?: Date
  paymentMethodId?: ObjectId
  cancelledAt?: Date
}
