import { getDatabase } from '../mongodb'
import { ObjectId } from 'mongodb'
import { User, CreateUserData, UpdateUserData } from '../models/User'
import { Wallet, CreateWalletData, UpdateWalletData } from '../models/Wallet'
import { Transaction, CreateTransactionData, UpdateTransactionData } from '../models/Transaction'
import { PaymentMethod, CreatePaymentMethodData, UpdatePaymentMethodData } from '../models/PaymentMethod'
import { Subscription, CreateSubscriptionData, UpdateSubscriptionData } from '../models/Subscription'
import { CreatorWallet, CreateCreatorWalletData, UpdateCreatorWalletData, CreatorEarnings, CreateEarningsData } from '../models/CreatorWallet'
import { UserWallet, CreateUserWalletData, UpdateUserWalletData } from '../models/UserWallet'
import { Video, CreateVideoData, UpdateVideoData } from '../models/Video'
import { VideoInteraction, CreateVideoInteractionData, UpdateVideoInteractionData } from '../models/VideoInteraction'
import { TokenTransaction, CreateTokenTransactionData, UpdateTokenTransactionData } from '../models/TokenTransaction'
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

  // User Wallet operations
  static async createUserWallet(walletData: CreateUserWalletData): Promise<UserWallet> {
    const collection = await this.getCollection('userWallets')
    const wallet: UserWallet = {
      ...walletData,
      totalDeposited: walletData.totalDeposited || 0,
      totalWithdrawn: walletData.totalWithdrawn || 0,
      totalSpent: walletData.totalSpent || 0,
      autoWithdraw: walletData.autoWithdraw || false,
      withdrawThreshold: walletData.withdrawThreshold || 100,
      preferredCurrency: walletData.preferredCurrency || 'USD',
      lastUpdated: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(wallet)
    return { ...wallet, _id: result.insertedId }
  }

  static async getUserWallet(userId: ObjectId): Promise<UserWallet | null> {
    const collection = await this.getCollection('userWallets')
    return await collection.findOne({ userId })
  }

  static async updateUserWallet(userId: ObjectId, updateData: UpdateUserWalletData): Promise<UserWallet | null> {
    const collection = await this.getCollection('userWallets')
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    }
    
    const result = await collection.findOneAndUpdate(
      { userId },
      { $set: updateDoc },
      { returnDocument: 'after' }
    )
    
    return result || null
  }

  static async deleteUserWallet(userId: ObjectId): Promise<boolean> {
    const collection = await this.getCollection('userWallets')
    const result = await collection.deleteOne({ userId })
    return result.deletedCount > 0
  }

  // Video operations
  static async createVideo(videoData: CreateVideoData): Promise<Video> {
    const collection = await this.getCollection('videos')
    const video: Video = {
      ...videoData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(video)
    return { ...video, _id: result.insertedId }
  }

  static async getVideo(videoId: ObjectId): Promise<Video | null> {
    const collection = await this.getCollection('videos')
    return await collection.findOne({ _id: videoId })
  }

  static async getVideoByOriginalId(originalVideoId: number): Promise<Video | null> {
    const collection = await this.getCollection('videos')
    return await collection.findOne({ videoId: originalVideoId })
  }

  static async getVideosByCreator(creatorId: ObjectId, limit: number = 20, skip: number = 0): Promise<Video[]> {
    const collection = await this.getCollection('videos')
    return await collection
      .find({ creatorId, status: 'published' })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
  }

  static async getTrendingVideos(limit: number = 20): Promise<Video[]> {
    const collection = await this.getCollection('videos')
    return await collection
      .find({ status: 'published', visibility: 'public' })
      .sort({ 'views.count': -1, publishedAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async updateVideo(videoId: ObjectId, updateData: UpdateVideoData): Promise<Video | null> {
    const collection = await this.getCollection('videos')
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: videoId },
      { $set: updateDoc },
      { returnDocument: 'after' }
    )
    
    return result || null
  }

  static async deleteVideo(videoId: ObjectId): Promise<boolean> {
    const collection = await this.getCollection('videos')
    const result = await collection.deleteOne({ _id: videoId })
    return result.deletedCount > 0
  }

  // Video Interaction operations
  static async createVideoInteraction(interactionData: CreateVideoInteractionData): Promise<VideoInteraction> {
    const collection = await this.getCollection('videoInteractions')
    const interaction: VideoInteraction = {
      ...interactionData,
      createdAt: new Date()
    }
    
    const result = await collection.insertOne(interaction)
    return { ...interaction, _id: result.insertedId }
  }

  static async getVideoInteractions(videoId: ObjectId, limit: number = 50): Promise<VideoInteraction[]> {
    const collection = await this.getCollection('videoInteractions')
    return await collection
      .find({ videoId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async getUserInteractions(userId: ObjectId, limit: number = 50): Promise<VideoInteraction[]> {
    const collection = await this.getCollection('videoInteractions')
    return await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async updateVideoInteraction(interactionId: ObjectId, updateData: UpdateVideoInteractionData): Promise<VideoInteraction | null> {
    const collection = await this.getCollection('videoInteractions')
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: interactionId },
      { $set: updateDoc },
      { returnDocument: 'after' }
    )
    
    return result || null
  }

  // Token Transaction operations
  static async createTokenTransaction(transactionData: CreateTokenTransactionData): Promise<TokenTransaction> {
    const collection = await this.getCollection('tokenTransactions')
    const transaction: TokenTransaction = {
      ...transactionData,
      createdAt: new Date()
    }
    
    const result = await collection.insertOne(transaction)
    return { ...transaction, _id: result.insertedId }
  }

  static async getTokenTransactionsByUser(userId: ObjectId, limit: number = 50): Promise<TokenTransaction[]> {
    const collection = await this.getCollection('tokenTransactions')
    return await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async getTokenTransactionsByCreator(creatorId: ObjectId, limit: number = 50): Promise<TokenTransaction[]> {
    const collection = await this.getCollection('tokenTransactions')
    return await collection
      .find({ creatorId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
  }

  static async updateTokenTransaction(transactionId: ObjectId, updateData: UpdateTokenTransactionData): Promise<TokenTransaction | null> {
    const collection = await this.getCollection('tokenTransactions')
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: transactionId },
      { $set: updateDoc },
      { returnDocument: 'after' }
    )
    
    return result || null
  }

  // Analytics and reporting
  static async getVideoAnalytics(videoId: ObjectId, startDate?: Date, endDate?: Date) {
    const collection = await this.getCollection('videoInteractions')
    const matchStage: any = { videoId }
    
    if (startDate || endDate) {
      matchStage.timestamp = {}
      if (startDate) matchStage.timestamp.$gte = startDate
      if (endDate) matchStage.timestamp.$lte = endDate
    }
    
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: '$interactionType',
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' }
        }
      }
    ]
    
    return await collection.aggregate(pipeline).toArray()
  }

  static async getCreatorAnalytics(creatorId: ObjectId, startDate?: Date, endDate?: Date) {
    const videoCollection = await this.getCollection('videos')
    const interactionCollection = await this.getCollection('videoInteractions')
    
    // Get creator's videos
    const videos = await videoCollection.find({ creatorId }).toArray()
    const videoIds = videos.map(v => v._id)
    
    const matchStage: any = { videoId: { $in: videoIds } }
    if (startDate || endDate) {
      matchStage.timestamp = {}
      if (startDate) matchStage.timestamp.$gte = startDate
      if (endDate) matchStage.timestamp.$lte = endDate
    }
    
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalViews: { $sum: { $cond: [{ $eq: ['$interactionType', 'view'] }, 1, 0] } },
          totalLikes: { $sum: { $cond: [{ $eq: ['$interactionType', 'like'] }, 1, 0] } },
          totalShares: { $sum: { $cond: [{ $eq: ['$interactionType', 'share'] }, 1, 0] } },
          totalComments: { $sum: { $cond: [{ $eq: ['$interactionType', 'comment'] }, 1, 0] } },
          totalSaves: { $sum: { $cond: [{ $eq: ['$interactionType', 'save'] }, 1, 0] } },
          totalGifts: { $sum: { $cond: [{ $eq: ['$interactionType', 'gift'] }, 1, 0] } }
        }
      }
    ]
    
    const result = await interactionCollection.aggregate(pipeline).toArray()
    return result[0] || {
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      totalComments: 0,
      totalSaves: 0,
      totalGifts: 0
    }
  }

  // Token transfer methods
  async transferTokens(userId: string, videoId: string, amount: number): Promise<void> {
    const db = await this.getDatabase()
    const userWalletsCollection = db.collection('userWallets')
    const tokenTransactionsCollection = db.collection('tokenTransactions')

    // Deduct tokens from user wallet
    await userWalletsCollection.updateOne(
      { userId },
      { $inc: { tokens: -amount } }
    )

    // Create token transaction record
    await tokenTransactionsCollection.insertOne({
      userId,
      videoId,
      amount,
      type: 'transfer',
      timestamp: new Date(),
      status: 'completed'
    })
  }

  async updateVideoTokens(videoId: string, amount: number): Promise<void> {
    const db = await this.getDatabase()
    const videosCollection = db.collection('videos')

    await videosCollection.updateOne(
      { _id: new ObjectId(videoId) },
      { $inc: { 'tokens.earned': amount } }
    )
  }

  async updateCreatorEarnings(creatorId: string, amount: number): Promise<void> {
    const db = await this.getDatabase()
    const creatorWalletsCollection = db.collection('creatorWallets')

    await creatorWalletsCollection.updateOne(
      { creatorId },
      { $inc: { earnings: amount } }
    )
  }
}
