# MongoDB Collection Schemas for TikTok TechJam

## 🏦 Wallet Operations Collections

### 1. User Wallets Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to users collection
  balance: number, // Current wallet balance
  currency: string, // "USD", "EUR", etc.
  status: "active" | "suspended" | "closed",
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date,
  
  // Transaction summary
  totalDeposited: number,
  totalWithdrawn: number,
  totalSpent: number,
  
  // Settings
  autoWithdraw: boolean,
  withdrawThreshold: number,
  preferredCurrency: string
}
```

### 2. Creator Wallets Collection
```typescript
{
  _id: ObjectId,
  creatorId: ObjectId, // Reference to users collection
  balance: number, // Current creator earnings balance
  currency: string,
  status: "active" | "suspended" | "pending_verification",
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date,
  
  // Earnings tracking
  totalEarnings: number,
  totalWithdrawn: number,
  pendingEarnings: number,
  
  // Creator-specific settings
  payoutMethod: "bank" | "paypal" | "crypto",
  payoutThreshold: number,
  taxId: string,
  businessName: string
}
```

### 3. Transactions Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId, // User who made the transaction
  walletId: ObjectId, // Reference to wallet (user or creator)
  type: "deposit" | "withdrawal" | "payment" | "earning" | "refund" | "fee",
  category: "wallet_funding" | "creator_payment" | "subscription" | "gift" | "withdrawal",
  
  // Transaction details
  amount: number,
  currency: string,
  description: string,
  
  // Payment method details
  paymentMethod: {
    type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_transfer",
    last4?: string, // Last 4 digits of card
    brand?: string, // Visa, Mastercard, etc.
    expiryMonth?: number,
    expiryYear?: number
  },
  
  // Status and processing
  status: "pending" | "processing" | "completed" | "failed" | "cancelled",
  processingFee: number,
  netAmount: number, // Amount after fees
  
  // Metadata
  externalId: string, // External payment processor ID
  metadata: {
    ipAddress?: string,
    userAgent?: string,
    deviceType?: string,
    location?: {
      country: string,
      city: string
    }
  },
  
  // Timestamps
  processedAt?: Date,
  completedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Payment Methods Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "credit_card" | "debit_card" | "paypal" | "google_pay" | "apple_pay" | "bank_account",
  
  // Card details (for card payments)
  cardDetails?: {
    brand: string, // "visa", "mastercard", "amex"
    last4: string,
    expiryMonth: number,
    expiryYear: number,
    holderName: string,
    fingerprint: string // For security
  },
  
  // Bank details (for bank transfers)
  bankDetails?: {
    bankName: string,
    accountNumber: string, // Encrypted
    routingNumber: string,
    accountType: "checking" | "savings"
  },
  
  // PayPal details
  paypalDetails?: {
    email: string,
    payerId: string
  },
  
  // Status and settings
  isDefault: boolean,
  isActive: boolean,
  isVerified: boolean,
  
  // Security
  encryptedData: string, // Encrypted sensitive information
  verificationStatus: "pending" | "verified" | "failed",
  
  createdAt: Date,
  updatedAt: Date,
  lastUsed: Date
}
```

## 🎥 Video Content Collections

### 5. Videos Collection
```typescript
{
  _id: ObjectId,
  videoId: number, // Original ID from JSON
  creatorId: ObjectId, // Reference to users collection
  creatorUsername: string,
  
  // Video metadata
  title: string,
  description: string,
  thumbnail: string, // URL to thumbnail image
  videoUrl: string, // URL to actual video file
  duration: number, // Duration in seconds
  
  // Engagement metrics
  views: {
    count: number,
    display: string // "2.8M", "1.2K", etc.
  },
  likes: {
    count: number,
    display: string
  },
  comments: {
    count: number,
    display: string
  },
  shares: {
    count: number,
    display: string
  },
  saves: {
    count: number,
    display: string
  },
  
  // Audio/Content
  sound: {
    name: string,
    original: boolean,
    audioUrl?: string
  },
  
  // Tokens system
  tokens: {
    earned: number, // Tokens earned from this video
    spent: number, // Tokens spent on this video
    total: number, // Total tokens for this video
    rate: number // Token earning rate per view
  },
  
  // Content classification
  category: string, // "dance", "comedy", "cooking", etc.
  tags: string[], // Hashtags
  isVerified: boolean, // Creator verification status
  
  // Status and visibility
  status: "draft" | "published" | "archived" | "deleted",
  visibility: "public" | "private" | "unlisted",
  isMonetized: boolean,
  
  // Timestamps
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date,
  lastViewedAt?: Date
}
```

### 6. Video Interactions Collection
```typescript
{
  _id: ObjectId,
  videoId: ObjectId, // Reference to videos collection
  userId: ObjectId, // User who interacted
  interactionType: "view" | "like" | "comment" | "share" | "save" | "gift",
  
  // Interaction details
  timestamp: Date,
  duration?: number, // For views - how long they watched
  deviceType: "mobile" | "desktop" | "tablet",
  location?: {
    country: string,
    city: string
  },
  
  // Gift details (if applicable)
  giftDetails?: {
    giftType: string,
    tokenValue: number,
    message?: string
  },
  
  // Comment details (if applicable)
  commentDetails?: {
    comment: string,
    parentCommentId?: ObjectId, // For replies
    isEdited: boolean
  },
  
  createdAt: Date
}
```

### 7. Creator Earnings Collection
```typescript
{
  _id: ObjectId,
  creatorId: ObjectId, // Reference to users collection
  videoId: ObjectId, // Reference to videos collection
  
  // Earnings breakdown
  totalEarnings: number,
  tokenEarnings: number, // From token system
  adRevenue: number, // From ads
  subscriptionRevenue: number, // From subscriptions
  giftRevenue: number, // From gifts
  
  // Time period
  period: "daily" | "weekly" | "monthly" | "yearly",
  periodStart: Date,
  periodEnd: Date,
  
  // Metrics
  views: number,
  engagement: {
    likes: number,
    comments: number,
    shares: number,
    saves: number
  },
  
  // Payout status
  payoutStatus: "pending" | "processed" | "paid",
  payoutDate?: Date,
  payoutMethod?: string,
  
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Token Transactions Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId, // User who spent tokens
  creatorId: ObjectId, // Creator who received tokens
  videoId: ObjectId, // Video that earned tokens
  
  // Transaction details
  tokenAmount: number,
  tokenValue: number, // USD value of tokens
  transactionType: "earn" | "spend" | "gift" | "reward",
  
  // Context
  context: {
    action: "view" | "like" | "share" | "comment" | "gift",
    description: string
  },
  
  // Status
  status: "pending" | "completed" | "cancelled",
  processedAt?: Date,
  
  createdAt: Date
}
```

## 🔗 Collection Relationships

### User → Wallet (1:1)
- Each user has one user wallet
- Each creator has one creator wallet

### User → Transactions (1:Many)
- Users can have multiple transactions
- Transactions reference both user and wallet

### User → Payment Methods (1:Many)
- Users can have multiple payment methods
- One can be marked as default

### Creator → Videos (1:Many)
- Creators can have multiple videos
- Videos reference creator for earnings

### Video → Interactions (1:Many)
- Videos can have multiple interactions
- Tracks all user engagement

### Creator → Earnings (1:Many)
- Creators can have multiple earnings records
- Organized by time periods

## 📊 Indexes for Performance

### User Wallets
- `{ userId: 1 }` - Unique index
- `{ status: 1 }` - For filtering active wallets

### Transactions
- `{ userId: 1, createdAt: -1 }` - User transaction history
- `{ walletId: 1, type: 1 }` - Wallet transaction filtering
- `{ status: 1, createdAt: -1 }` - Pending transactions

### Videos
- `{ creatorId: 1, createdAt: -1 }` - Creator's videos
- `{ status: 1, publishedAt: -1 }` - Published videos
- `{ category: 1, views.count: -1 }` - Category trending

### Video Interactions
- `{ videoId: 1, createdAt: -1 }` - Video engagement timeline
- `{ userId: 1, interactionType: 1 }` - User interaction history

### Creator Earnings
- `{ creatorId: 1, period: 1, periodStart: -1 }` - Creator earnings by period
- `{ payoutStatus: 1, payoutDate: -1 }` - Pending payouts

