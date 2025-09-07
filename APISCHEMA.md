# TikTok TechJam API Schema Documentation

## Overview
This document defines the complete API schema for the TikTok TechJam platform, including all endpoints, data models, and integration patterns.

## Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### 🔐 Authentication (`/api/auth`)

#### POST `/api/auth/login`
**Description**: User login with username/email and password
**Request Body**:
```typescript
{
  username: string
  password: string
  userType?: 'user' | 'creator'
}
```
**Response**:
```typescript
{
  success: boolean
  token: string
  user: {
    id: string
    username: string
    email: string
    userType: 'user' | 'creator'
    profile: UserProfile
  }
}
```

#### POST `/api/auth/register`
**Description**: User registration
**Request Body**:
```typescript
{
  username: string
  email: string
  password: string
  userType: 'user' | 'creator'
  profile: {
    displayName: string
    bio?: string
    avatar?: string
  }
}
```

#### POST `/api/auth/logout`
**Description**: User logout (invalidate token)
**Response**:
```typescript
{
  success: boolean
  message: string
}
```

### 👤 Users (`/api/users`)

#### GET `/api/users/profile`
**Description**: Get current user profile
**Response**:
```typescript
{
  id: string
  username: string
  email: string
  userType: 'user' | 'creator'
  profile: UserProfile
  createdAt: string
  updatedAt: string
}
```

#### PUT `/api/users/profile`
**Description**: Update user profile
**Request Body**:
```typescript
{
  displayName?: string
  bio?: string
  avatar?: string
  preferences?: UserPreferences
}
```

#### GET `/api/users/analytics`
**Description**: Get user analytics (for creators)
**Response**:
```typescript
{
  totalEarnings: number
  monthlyEarnings: number
  totalFollowers: number
  totalViews: number
  engagementRate: number
  topVideos: VideoAnalytics[]
}
```

### 🎭 Creators (`/api/creators`)

#### GET `/api/creators`
**Description**: Get all creators with pagination
**Query Parameters**:
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `category`: string (optional)
- `verified`: boolean (optional)

**Response**:
```typescript
{
  creators: Creator[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
```

#### GET `/api/creators/:id`
**Description**: Get specific creator details
**Response**:
```typescript
{
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  verified: boolean
  followers: number
  following: number
  totalLikes: number
  categories: string[]
  earnings: CreatorEarnings
  recentVideos: Video[]
}
```

#### PUT `/api/creators/:id/earnings`
**Description**: Update creator earnings (internal use)
**Request Body**:
```typescript
{
  amount: number
  type: 'gift' | 'subscription' | 'boost' | 'ad_revenue'
  source: string
}
```

### 💰 Wallet (`/api/wallet`)

#### GET `/api/wallet/balance`
**Description**: Get user wallet balance
**Response**:
```typescript
{
  balance: number
  currency: string
  lastUpdated: string
  pendingTransactions: number
}
```

#### POST `/api/wallet/add-funds`
**Description**: Add funds to wallet
**Request Body**:
```typescript
{
  amount: number
  paymentMethodId: string
  paymentData: CreditCardData | PayPalData | GooglePayData | ApplePayData
}
**Response**:
```typescript
{
  success: boolean
  transactionId: string
  newBalance: number
  processingTime: string
}
```

#### POST `/api/wallet/withdraw`
**Description**: Withdraw funds from wallet
**Request Body**:
```typescript
{
  amount: number
  paymentMethodId: string
  withdrawalData: CreditCardData | PayPalData | GooglePayData | ApplePayData
}
```

#### GET `/api/wallet/transactions`
**Description**: Get wallet transaction history
**Query Parameters**:
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `type`: 'all' | 'deposit' | 'withdrawal' | 'gift' | 'subscription'

**Response**:
```typescript
{
  transactions: Transaction[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
```

### 💳 Payments (`/api/payments`)

#### GET `/api/payments/methods`
**Description**: Get user payment methods
**Response**:
```typescript
{
  methods: PaymentMethod[]
}
```

#### POST `/api/payments/methods`
**Description**: Add new payment method
**Request Body**:
```typescript
{
  type: 'Credit Card' | 'PayPal' | 'Google Pay' | 'Apple Pay'
  cardData?: CreditCardData
  paypalData?: PayPalData
  isDefault?: boolean
}
```

#### PUT `/api/payments/methods/:id`
**Description**: Update payment method
**Request Body**:
```typescript
{
  isDefault?: boolean
  cardData?: Partial<CreditCardData>
}
```

#### DELETE `/api/payments/methods/:id`
**Description**: Delete payment method

#### POST `/api/payments/process`
**Description**: Process payment
**Request Body**:
```typescript
{
  amount: number
  paymentMethodId: string
  paymentData: CreditCardData | PayPalData | GooglePayData | ApplePayData
  recipientId?: string
  type: 'gift' | 'subscription' | 'boost' | 'deposit'
}
```

### 📊 Transactions (`/api/transactions`)

#### GET `/api/transactions`
**Description**: Get all transactions
**Query Parameters**:
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `type`: string (optional)
- `status`: string (optional)
- `dateFrom`: string (optional)
- `dateTo`: string (optional)

**Response**:
```typescript
{
  transactions: Transaction[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  summary: {
    totalAmount: number
    totalTransactions: number
    thisMonth: number
  }
}
```

#### GET `/api/transactions/:id`
**Description**: Get specific transaction details
**Response**:
```typescript
{
  id: string
  type: string
  amount: number
  status: string
  from: User
  to: User | Creator
  description: string
  date: string
  processingTime?: string
  metadata?: any
}
```

### 📱 Subscriptions (`/api/subscriptions`)

#### GET `/api/subscriptions`
**Description**: Get user subscriptions
**Response**:
```typescript
{
  subscriptions: Subscription[]
  totalMonthlyCost: number
}
```

#### POST `/api/subscriptions`
**Description**: Create new subscription
**Request Body**:
```typescript
{
  creatorId: string
  tier: 'Basic' | 'Premium' | 'VIP'
  paymentMethodId: string
}
```

#### PUT `/api/subscriptions/:id`
**Description**: Update subscription
**Request Body**:
```typescript
{
  tier?: 'Basic' | 'Premium' | 'VIP'
  status?: 'active' | 'cancelled' | 'paused'
}
```

#### DELETE `/api/subscriptions/:id`
**Description**: Cancel subscription

### 📈 Analytics (`/api/analytics`)

#### GET `/api/analytics/creator/:id`
**Description**: Get creator analytics
**Query Parameters**:
- `period`: '7d' | '30d' | '90d' | '1y'
- `metric`: 'earnings' | 'followers' | 'views' | 'engagement'

**Response**:
```typescript
{
  period: string
  metrics: {
    earnings: number
    followers: number
    views: number
    engagement: number
    growth: {
      earnings: number
      followers: number
      views: number
    }
  }
  chartData: ChartDataPoint[]
  topContent: ContentAnalytics[]
}
```

#### GET `/api/analytics/user/:id`
**Description**: Get user spending analytics
**Response**:
```typescript
{
  totalSpent: number
  monthlySpending: number
  topCreators: CreatorSpending[]
  spendingByCategory: CategorySpending[]
  recentActivity: Transaction[]
}
```

## Data Models

### User
```typescript
interface User {
  id: string
  username: string
  email: string
  password: string // hashed
  userType: 'user' | 'creator'
  profile: UserProfile
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
  isActive: boolean
}

interface UserProfile {
  displayName: string
  bio?: string
  avatar?: string
  verified: boolean
  followers: number
  following: number
  totalLikes: number
}

interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private'
    showEarnings: boolean
  }
  language: string
  timezone: string
}
```

### Creator
```typescript
interface Creator {
  id: string
  userId: string
  username: string
  displayName: string
  bio: string
  avatar: string
  verified: boolean
  categories: string[]
  earnings: CreatorEarnings
  stats: CreatorStats
  createdAt: Date
  updatedAt: Date
}

interface CreatorEarnings {
  total: number
  monthly: number
  thisYear: number
  bySource: {
    gifts: number
    subscriptions: number
    boosts: number
    adRevenue: number
  }
}

interface CreatorStats {
  followers: number
  following: number
  totalLikes: number
  totalViews: number
  engagementRate: number
  avgViewsPerVideo: number
}
```

### Wallet
```typescript
interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  lastUpdated: Date
  pendingTransactions: number
  totalDeposited: number
  totalWithdrawn: number
  createdAt: Date
  updatedAt: Date
}
```

### Transaction
```typescript
interface Transaction {
  id: string
  userId: string
  type: 'gift' | 'subscription' | 'boost' | 'deposit' | 'withdrawal' | 'refund'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  from: {
    id: string
    type: 'user' | 'creator' | 'system'
    name: string
  }
  to: {
    id: string
    type: 'user' | 'creator' | 'system'
    name: string
  }
  description: string
  paymentMethodId?: string
  processingTime?: string
  metadata?: any
  createdAt: Date
  updatedAt: Date
}
```

### PaymentMethod
```typescript
interface PaymentMethod {
  id: string
  userId: string
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
```

### Subscription
```typescript
interface Subscription {
  id: string
  userId: string
  creatorId: string
  tier: 'Basic' | 'Premium' | 'VIP'
  price: number
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  nextBilling: Date
  paymentMethodId: string
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
}
```

## Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
}
```

### Common Error Codes
- `AUTH_REQUIRED` - Authentication required
- `INVALID_CREDENTIALS` - Invalid login credentials
- `INSUFFICIENT_FUNDS` - Insufficient wallet balance
- `PAYMENT_FAILED` - Payment processing failed
- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Insufficient permissions
- `RATE_LIMITED` - Too many requests

## Rate Limiting
- **Authentication endpoints**: 5 requests per minute
- **Payment endpoints**: 10 requests per minute
- **General API**: 100 requests per minute
- **Analytics endpoints**: 20 requests per minute

## Security
- All passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- API keys are required for external integrations
- All payment data is encrypted
- CORS is configured for specific origins
- Input validation on all endpoints
- SQL injection prevention
- XSS protection

## Development Notes
- All timestamps are in ISO 8601 format
- All monetary amounts are in USD cents (integer)
- Pagination starts from page 1
- Default limit is 20 items per page
- Maximum limit is 100 items per page
- All endpoints return JSON
- Content-Type: application/json for all requests
