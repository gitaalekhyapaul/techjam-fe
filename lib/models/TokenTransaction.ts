import { ObjectId } from 'mongodb'

export interface TokenTransaction {
  _id?: ObjectId
  userId: ObjectId // User who spent tokens
  creatorId: ObjectId // Creator who received tokens
  videoId: ObjectId // Video that earned tokens
  
  // Transaction details
  tokenAmount: number
  tokenValue: number // USD value of tokens
  transactionType: "earn" | "spend" | "gift" | "reward"
  
  // Context
  context: {
    action: "view" | "like" | "share" | "comment" | "gift"
    description: string
  }
  
  // Status
  status: "pending" | "completed" | "cancelled"
  processedAt?: Date
  
  createdAt: Date
}

export interface CreateTokenTransactionData {
  userId: ObjectId
  creatorId: ObjectId
  videoId: ObjectId
  tokenAmount: number
  tokenValue: number
  transactionType: "earn" | "spend" | "gift" | "reward"
  context: {
    action: "view" | "like" | "share" | "comment" | "gift"
    description: string
  }
  status: "pending" | "completed" | "cancelled"
  processedAt?: Date
}

export interface UpdateTokenTransactionData {
  tokenAmount?: number
  tokenValue?: number
  transactionType?: "earn" | "spend" | "gift" | "reward"
  context?: {
    action: "view" | "like" | "share" | "comment" | "gift"
    description: string
  }
  status?: "pending" | "completed" | "cancelled"
  processedAt?: Date
}

