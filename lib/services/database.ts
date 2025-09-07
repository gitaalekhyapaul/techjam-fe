import { getDatabase } from '../mongodb'
import { User, CreateUserData, UpdateUserData } from '../models/User'
import { Wallet, CreateWalletData, UpdateWalletData } from '../models/Wallet'
import { Transaction, CreateTransactionData, UpdateTransactionData } from '../models/Transaction'
import { PaymentMethod, CreatePaymentMethodData, UpdatePaymentMethodData } from '../models/PaymentMethod'
import { Subscription, CreateSubscriptionData, UpdateSubscriptionData } from '../models/Subscription'
import { CreatorWallet, CreateCreatorWalletData, UpdateCreatorWalletData, CreatorEarnings, CreateEarningsData } from '../models/CreatorWallet'
import { ObjectId } from 'mongodb'

export class DatabaseService {
  private static async getCollection(collectionName: string) {
    const db = await getDatabase()
    return db.collection(collectionName)
  }

  // User operations
  static async createUser(userData: CreateUserData): Promise<User> {
    const collection = await this.getCollection('users')
    const user: User = {
      ...userData,
      profile: {
        ...userData.profile,
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
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    }
    
    const result = await collection.insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  static async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection('users')
    return await collection.findOne({ _id: new ObjectId(id) }) as User | null
  }

  static async getUserByUsername(username: string): Promise<User | null> {
    const collection = await this.getCollection('users')
    return await collection.findOne({ username }) as User | null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection('users')
    return await collection.findOne({ email }) as User | null
  }

  static async updateUser(id: string, updateData: UpdateUserData): Promise<User | null> {
    const collection = await this.getCollection('users')
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    )
    return result as User | null
  }

  // Wallet operations
  static async createWallet(walletData: CreateWalletData): Promise<Wallet> {
    const collection = await this.getCollection('wallets')
    const wallet: Wallet = {
      ...walletData,
      balance: walletData.initialBalance || 0,
      currency: 'USD',
      lastUpdated: new Date(),
      pendingTransactions: 0,
      totalDeposited: 0,
      totalWithdrawn: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(wallet)
    return { ...wallet, _id: result.insertedId }
  }

  static async getWalletByUserId(userId: string): Promise<Wallet | null> {
    const collection = await this.getCollection('wallets')
    return await collection.findOne({ userId: new ObjectId(userId) }) as Wallet | null
  }

  static async updateWallet(userId: string, updateData: UpdateWalletData): Promise<Wallet | null> {
    const collection = await this.getCollection('wallets')
    const result = await collection.findOneAndUpdate(
      { userId: new ObjectId(userId) },
      { 
        $set: { 
          ...updateData, 
          lastUpdated: new Date(),
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    return result as Wallet | null
  }

  // Transaction operations
  static async createTransaction(transactionData: CreateTransactionData): Promise<Transaction> {
    const collection = await this.getCollection('transactions')
    const transaction: Transaction = {
      ...transactionData,
      currency: 'USD',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(transaction)
    return { ...transaction, _id: result.insertedId }
  }

  static async getTransactionsByUserId(userId: string, limit: number = 20, skip: number = 0): Promise<Transaction[]> {
    const collection = await this.getCollection('transactions')
    return await collection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray() as Transaction[]
  }

  static async updateTransaction(id: string, updateData: UpdateTransactionData): Promise<Transaction | null> {
    const collection = await this.getCollection('transactions')
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    return result as Transaction | null
  }

  // Payment method operations
  static async createPaymentMethod(paymentData: CreatePaymentMethodData): Promise<PaymentMethod> {
    const collection = await this.getCollection('paymentMethods')
    const paymentMethod: PaymentMethod = {
      ...paymentData,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(paymentMethod)
    return { ...paymentMethod, _id: result.insertedId }
  }

  static async getPaymentMethodsByUserId(userId: string): Promise<PaymentMethod[]> {
    const collection = await this.getCollection('paymentMethods')
    return await collection
      .find({ userId: new ObjectId(userId), isActive: true })
      .sort({ isDefault: -1, createdAt: -1 })
      .toArray() as PaymentMethod[]
  }

  static async updatePaymentMethod(id: string, updateData: UpdatePaymentMethodData): Promise<PaymentMethod | null> {
    const collection = await this.getCollection('paymentMethods')
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    return result as PaymentMethod | null
  }

  // Subscription operations
  static async createSubscription(subscriptionData: CreateSubscriptionData): Promise<Subscription> {
    const collection = await this.getCollection('subscriptions')
    const subscription: Subscription = {
      ...subscriptionData,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(subscription)
    return { ...subscription, _id: result.insertedId }
  }

  static async getSubscriptionsByUserId(userId: string): Promise<Subscription[]> {
    const collection = await this.getCollection('subscriptions')
    return await collection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray() as Subscription[]
  }

  static async updateSubscription(id: string, updateData: UpdateSubscriptionData): Promise<Subscription | null> {
    const collection = await this.getCollection('subscriptions')
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    return result as Subscription | null
  }

  // Creator wallet operations
  static async createCreatorWallet(walletData: CreateCreatorWalletData): Promise<CreatorWallet> {
    const collection = await this.getCollection('creatorWallets')
    const wallet: CreatorWallet = {
      ...walletData,
      balance: walletData.initialBalance || 0,
      currency: 'USD',
      totalEarnings: 0,
      monthlyEarnings: 0,
      pendingWithdrawals: 0,
      lastUpdated: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(wallet)
    return { ...wallet, _id: result.insertedId }
  }

  static async getCreatorWalletByCreatorId(creatorId: string): Promise<CreatorWallet | null> {
    const collection = await this.getCollection('creatorWallets')
    return await collection.findOne({ creatorId: new ObjectId(creatorId) }) as CreatorWallet | null
  }

  static async updateCreatorWallet(creatorId: string, updateData: UpdateCreatorWalletData): Promise<CreatorWallet | null> {
    const collection = await this.getCollection('creatorWallets')
    const result = await collection.findOneAndUpdate(
      { creatorId: new ObjectId(creatorId) },
      { 
        $set: { 
          ...updateData, 
          lastUpdated: new Date(),
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    return result as CreatorWallet | null
  }

  // Creator earnings operations
  static async createCreatorEarnings(earningsData: CreateEarningsData): Promise<CreatorEarnings> {
    const collection = await this.getCollection('creatorEarnings')
    const earnings: CreatorEarnings = {
      ...earningsData,
      createdAt: new Date()
    }
    
    const result = await collection.insertOne(earnings)
    return { ...earnings, _id: result.insertedId }
  }

  static async getCreatorEarnings(creatorId: string, limit: number = 50, skip: number = 0): Promise<CreatorEarnings[]> {
    const collection = await this.getCollection('creatorEarnings')
    return await collection
      .find({ creatorId: new ObjectId(creatorId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray() as CreatorEarnings[]
  }

  static async getCreatorEarningsSummary(creatorId: string): Promise<{
    totalEarnings: number
    monthlyEarnings: number
    earningsBySource: Record<string, number>
  }> {
    const collection = await this.getCollection('creatorEarnings')
    
    // Get total earnings
    const totalResult = await collection.aggregate([
      { $match: { creatorId: new ObjectId(creatorId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]).toArray()
    
    // Get monthly earnings (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const monthlyResult = await collection.aggregate([
      { 
        $match: { 
          creatorId: new ObjectId(creatorId),
          createdAt: { $gte: thirtyDaysAgo }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]).toArray()
    
    // Get earnings by source
    const sourceResult = await collection.aggregate([
      { $match: { creatorId: new ObjectId(creatorId) } },
      { $group: { _id: '$source', total: { $sum: '$amount' } } }
    ]).toArray()
    
    const earningsBySource = sourceResult.reduce((acc, item) => {
      acc[item._id] = item.total
      return acc
    }, {} as Record<string, number>)
    
    return {
      totalEarnings: totalResult[0]?.total || 0,
      monthlyEarnings: monthlyResult[0]?.total || 0,
      earningsBySource
    }
  }
}
