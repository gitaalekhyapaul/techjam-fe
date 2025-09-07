// Static data and configuration for TikTok TechJam Frontend
// This file contains only static data that doesn't change frequently
// Dynamic data is handled via Next.js API routes with MongoDB

// Static video data (for display purposes)
export const videos = [
  {
    id: "1",
    title: "Amazing Dance Moves",
    creator: "DanceQueen",
    views: "2.3M",
    likes: "156K",
    comments: "8.2K",
    shares: "1.1K",
    duration: "0:45",
    thumbnail: "/tiktok-video-thumbnail-1.png",
    category: "dance"
  },
  {
    id: "2", 
    title: "Cooking Tutorial",
    creator: "ChefMike",
    views: "1.8M",
    likes: "98K",
    comments: "5.4K",
    shares: "892",
    duration: "2:15",
    thumbnail: "/tiktok-video-thumbnail-2.png",
    category: "cooking"
  },
  {
    id: "3",
    title: "Funny Pet Compilation",
    creator: "PetLover",
    views: "4.1M",
    likes: "287K",
    comments: "12.3K",
    shares: "2.8K",
    duration: "1:30",
    thumbnail: "/tiktok-video-thumbnail-3.png",
    category: "pets"
  },
  {
    id: "4",
    title: "Tech Review",
    creator: "TechGuru",
    views: "856K",
    likes: "45K",
    comments: "2.1K",
    shares: "234",
    duration: "3:20",
    thumbnail: "/tiktok-video-thumbnail-4.png",
    category: "tech"
  },
  {
    id: "5",
    title: "Fashion Haul",
    creator: "StyleIcon",
    views: "1.2M",
    likes: "67K",
    comments: "3.8K",
    shares: "567",
    duration: "1:45",
    thumbnail: "/tiktok-video-thumbnail-5.png",
    category: "fashion"
  },
  {
    id: "6",
    title: "Travel Vlog",
    creator: "Wanderlust",
    views: "2.7M",
    likes: "189K",
    comments: "9.1K",
    shares: "1.4K",
    duration: "2:30",
    thumbnail: "/tiktok-video-thumbnail-6.png",
    category: "travel"
  }
]

// Creator data
export const creators = [
  {
    id: "1",
    name: "DanceQueen",
    username: "@dancequeen",
    followers: "2.3M",
    following: "156",
    likes: "45.2M",
    verified: true,
    avatar: "/portrait-young-woman.png",
    bio: "Professional dancer sharing amazing moves! 💃",
    categories: ["dance", "fitness"]
  },
  {
    id: "2",
    name: "ChefMike",
    username: "@chefmike",
    followers: "1.8M",
    following: "89",
    likes: "32.1M",
    verified: true,
    avatar: "/person-named-mike.png",
    bio: "Master chef cooking up delicious recipes! 👨‍🍳",
    categories: ["cooking", "lifestyle"]
  },
  {
    id: "3",
    name: "PetLover",
    username: "@petlover",
    followers: "4.1M",
    following: "234",
    likes: "67.8M",
    verified: true,
    avatar: "/diverse-group-smiling.png",
    bio: "Animal lover sharing cute pet moments! 🐾",
    categories: ["pets", "comedy"]
  }
]

// Transaction data
export const transactions = [
  {
    id: "1",
    type: "gift",
    amount: 5.00,
    from: "User123",
    to: "DanceQueen",
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: "2",
    type: "subscription",
    amount: 9.99,
    from: "User456",
    to: "ChefMike",
    date: "2024-01-14",
    status: "completed"
  },
  {
    id: "3",
    type: "boost",
    amount: 25.00,
    from: "PetLover",
    to: "TikTok",
    date: "2024-01-13",
    status: "completed"
  }
]

// Payment method data
export const paymentMethods = [
  {
    id: "1",
    type: "Credit Card",
    lastFour: "4242",
    expiryDate: "12/25",
    isDefault: true
  },
  {
    id: "2",
    type: "PayPal",
    email: "user@example.com",
    isDefault: false
  }
]

// Subscription data
export const subscriptions = [
  {
    id: "1",
    creator: "DanceQueen",
    tier: "Premium",
    price: 9.99,
    status: "active",
    nextBilling: "2024-02-15"
  },
  {
    id: "2",
    creator: "ChefMike",
    tier: "Basic",
    price: 4.99,
    status: "active",
    nextBilling: "2024-02-14"
  }
]

// Boost campaign data
export const boostCampaigns = [
  {
    id: "1",
    name: "Trending Boost",
    budget: 50.00,
    spent: 32.50,
    reach: 12500,
    engagement: 8.7,
    status: "active"
  },
  {
    id: "2",
    name: "Audience Targeting",
    budget: 100.00,
    spent: 100.00,
    reach: 25000,
    engagement: 12.3,
    status: "completed"
  }
]

// TypeScript interfaces
export interface Video {
  id: string
  title: string
  creator: string
  views: string
  likes: string
  comments: string
  shares: string
  duration: string
  thumbnail: string
  category: string
}

export interface Creator {
  id: string
  name: string
  username: string
  followers: string
  following: string
  likes: string
  verified: boolean
  avatar: string
  bio: string
  categories: string[]
}

export interface Transaction {
  id: string
  type: "gift" | "subscription" | "boost" | "purchase" | "received"
  amount: number
  from: string
  to: string
  date: string
  status: "completed" | "pending" | "failed"
}

export interface PaymentMethod {
  id: string
  type: string
  lastFour?: string
  expiryDate?: string
  email?: string
  isDefault: boolean
}

export interface Subscription {
  id: string
  creator: string
  tier: string
  price: number
  status: "active" | "cancelled" | "expired"
  nextBilling: string
}

export interface BoostCampaign {
  id: string
  name: string
  budget: number
  spent: number
  reach: number
  engagement: number
  status: "active" | "completed" | "paused"
}

// Payment form data interfaces
export interface CreditCardData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export interface PayPalData {
  email: string
  password: string
}

export interface GooglePayData {
  selectedCard: string
  amount: number
}

export interface ApplePayData {
  selectedCard: string
  amount: number
  useBiometric: boolean
}

// Payment result interfaces
export interface PaymentResult {
  success: boolean
  message: string
  transactionId: string
  amount: number
  method: string
  processingTime: string
}

export interface WithdrawalResult {
  success: boolean
  message: string
  transactionId: string
  amount: number
  method: string
  processingTime: string
}

// Wallet balance interface
export interface WalletBalance {
  balance: number
  currency: string
  lastUpdated: string
}

// Payment method interface for saving
export interface PaymentMethod {
  id: string
  type: "Credit Card" | "PayPal" | "Google Pay" | "Apple Pay"
  cardType?: string
  lastFour?: string
  expiryDate?: string
  email?: string
  isDefault: boolean
  createdAt: number
}

// Mock API functions
export const mockApi = {
  // Simulate API delay
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Video APIs
  getVideos: async (): Promise<Video[]> => {
    await mockApi.delay(300)
    return videos
  },

  getVideo: async (id: string): Promise<Video | null> => {
    await mockApi.delay(200)
    return videos.find(video => video.id === id) || null
  },

  // Creator APIs
  getCreators: async (): Promise<Creator[]> => {
    await mockApi.delay(300)
    return creators
  },

  getCreator: async (id: string): Promise<Creator | null> => {
    await mockApi.delay(200)
    return creators.find(creator => creator.id === id) || null
  },

  // Transaction APIs
  getTransactions: async (): Promise<Transaction[]> => {
    await mockApi.delay(300)
    return transactions
  },

  // Payment method APIs
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await mockApi.delay(300)
    const stored = localStorage.getItem("paymentMethods")
    if (stored) {
      return JSON.parse(stored)
    }
    // Return default payment methods
    return [
      {
        id: "1",
        type: "Credit Card",
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "12/25",
        isDefault: true,
        createdAt: Date.now() - 86400000
      },
      {
        id: "2",
        type: "Credit Card",
        cardType: "Chase Bank",
        lastFour: "1234",
        expiryDate: "08/26",
        isDefault: false,
        createdAt: Date.now() - 172800000
      }
    ]
  },

  savePaymentMethod: async (paymentData: Omit<PaymentMethod, "id" | "createdAt">): Promise<PaymentMethod> => {
    await mockApi.delay(800)
    const existingMethods = await mockApi.getPaymentMethods()
    const newMethod: PaymentMethod = {
      ...paymentData,
      id: `pm_${Date.now()}`,
      createdAt: Date.now()
    }

    const updatedMethods = [...existingMethods, newMethod]
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods))

    return newMethod
  },

  // Payment processing APIs
  processCreditCardPayment: async (data: CreditCardData, amount: number): Promise<PaymentResult> => {
    await mockApi.delay(2000)
    return {
      success: true,
      message: "Payment processed successfully!",
      transactionId: `txn_${Date.now()}`,
      amount,
      method: "Credit Card",
      processingTime: "2-3 business days"
    }
  },

  processPayPalPayment: async (data: PayPalData, amount: number): Promise<PaymentResult> => {
    await mockApi.delay(1500)
    return {
      success: true,
      message: "PayPal payment successful!",
      transactionId: `txn_${Date.now()}`,
      amount,
      method: "PayPal",
      processingTime: "1-2 business days"
    }
  },

  processGooglePayPayment: async (data: GooglePayData): Promise<PaymentResult> => {
    await mockApi.delay(1000)
    return {
      success: true,
      message: "Google Pay payment successful!",
      transactionId: `txn_${Date.now()}`,
      amount: data.amount,
      method: "Google Pay",
      processingTime: "Instant"
    }
  },

  processApplePayPayment: async (data: ApplePayData): Promise<PaymentResult> => {
    await mockApi.delay(1000)
    return {
      success: true,
      message: "Apple Pay payment successful!",
      transactionId: `txn_${Date.now()}`,
      amount: data.amount,
      method: "Apple Pay",
      processingTime: "Instant"
    }
  },

  // Withdrawal processing APIs
  processCreditCardWithdrawal: async (data: CreditCardData, amount: number): Promise<WithdrawalResult> => {
    await mockApi.delay(2000)
    return {
      success: true,
      message: "Withdrawal processed successfully!",
      transactionId: `wth_${Date.now()}`,
      amount,
      method: "Credit Card",
      processingTime: "1-3 business days"
    }
  },

  processPayPalWithdrawal: async (data: PayPalData, amount: number): Promise<WithdrawalResult> => {
    await mockApi.delay(1500)
    return {
      success: true,
      message: "PayPal withdrawal successful!",
      transactionId: `wth_${Date.now()}`,
      amount,
      method: "PayPal",
      processingTime: "1-2 business days"
    }
  },

  processGooglePayWithdrawal: async (data: GooglePayData): Promise<WithdrawalResult> => {
    await mockApi.delay(1000)
    return {
      success: true,
      message: "Google Pay withdrawal successful!",
      transactionId: `wth_${Date.now()}`,
      amount: data.amount,
      method: "Google Pay",
      processingTime: "1-2 business days"
    }
  },

  processApplePayWithdrawal: async (data: ApplePayData): Promise<WithdrawalResult> => {
    await mockApi.delay(1000)
    return {
      success: true,
      message: "Apple Pay withdrawal successful!",
      transactionId: `wth_${Date.now()}`,
      amount: data.amount,
      method: "Apple Pay",
      processingTime: "1-2 business days"
    }
  },

  // Wallet balance APIs
  getWalletBalance: async (): Promise<WalletBalance> => {
    await mockApi.delay(300)
    const stored = localStorage.getItem("walletBalance")
    if (stored) {
      return JSON.parse(stored)
    }
    // Return default balance
    const defaultBalance = { balance: 3000, currency: "USD", lastUpdated: new Date().toISOString() }
    localStorage.setItem("walletBalance", JSON.stringify(defaultBalance))
    return defaultBalance
  },

  addToWallet: async (amount: number): Promise<WalletBalance> => {
    await mockApi.delay(500)
    const currentBalance = await mockApi.getWalletBalance()
    const newBalance = currentBalance.balance + amount
    const updatedBalance = { 
      balance: newBalance, 
      currency: "USD", 
      lastUpdated: new Date().toISOString() 
    }
    localStorage.setItem("walletBalance", JSON.stringify(updatedBalance))
    return updatedBalance
  },

  withdrawFromWallet: async (amount: number): Promise<WalletBalance> => {
    await mockApi.delay(500)
    const currentBalance = await mockApi.getWalletBalance()
    
    if (currentBalance.balance < amount) {
      throw new Error("Insufficient funds")
    }
    
    const newBalance = currentBalance.balance - amount
    const updatedBalance = { 
      balance: newBalance, 
      currency: "USD", 
      lastUpdated: new Date().toISOString() 
    }
    localStorage.setItem("walletBalance", JSON.stringify(updatedBalance))
    return updatedBalance
  }
}
