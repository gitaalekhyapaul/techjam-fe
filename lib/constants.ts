// TikTok TechJam Frontend - Constants and Mock Data
// This file centralizes all shared data, mock APIs, and configuration values

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Video {
  id: number
  thumbnail: string
  views: string
  username: string
  verified: boolean
  description?: string
  likes?: string
  comments?: string
  shares?: string
  saves?: string
  sound?: string
  creator?: string
}

export interface Creator {
  id: string
  username: string
  displayName: string
  followers: string
  avatar: string
  verified: boolean
}

export interface Transaction {
  id: string
  type: "gift" | "subscription" | "boost" | "purchase" | "received" | "withdrawal" | "earned" | "sent"
  amount: number
  description: string
  date: string
  status?: "completed" | "pending" | "failed"
  time?: string
}

export interface GiftTransaction {
  id: string
  recipient: string
  amount: number
  date: string
  type: "sent" | "received"
}

export interface PaymentMethod {
  id: string
  type: string
  name: string
  icon: string // Icon name for Lucide React
}

export interface SubscribedCreator {
  id: number
  name: string
  avatar: string
  supportLevel: string
  videos: Array<{
    id: number
    thumbnail: string
    title: string
  }>
  hasGifts: boolean
  unreadMessages: number
}

export interface NewUpdate {
  id: number
  creator: string
  avatar: string
  content: string
  time: string
  type: string
}

export interface Benefit {
  icon: string
  text: string
}

export interface BoostCampaign {
  id: number
  name: string
  status: string
  duration: string
  cost: number
  performance: number
}

// ============================================================================
// MOCK VIDEO DATA
// ============================================================================

export const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    thumbnail: "/tiktok-video-thumbnail-1.png",
    views: "2.8M",
    username: "lexidpratt",
    verified: false,
    description: "This is absolutely incredible! You have to see this to believe it! 🤯 #amazing #viral #trending",
    likes: "56.8K",
    comments: "4211",
    shares: "6451",
    saves: "4456",
    sound: "Original Sound",
    creator: "lexidpratt"
  },
  {
    id: 2,
    thumbnail: "/tiktok-video-thumbnail-2.png",
    views: "3.8M",
    username: "mustsharenews",
    verified: true,
    description: "Breaking news that you need to see! 📰 #news #breaking #viral",
    likes: "89.2K",
    comments: "5678",
    shares: "8234",
    saves: "6789",
    sound: "Original Sound",
    creator: "mustsharenews"
  },
  {
    id: 3,
    thumbnail: "/tiktok-video-thumbnail-3.png",
    views: "630.1K",
    username: "kdarshen",
    verified: true,
    description: "Incredible transformation! You won't believe this 😱 #transformation #amazing #viral",
    likes: "23.4K",
    comments: "1234",
    shares: "2345",
    saves: "3456",
    sound: "Original Sound",
    creator: "kdarshen"
  },
  {
    id: 4,
    thumbnail: "/tiktok-video-thumbnail-4.png",
    views: "5.2M",
    username: "megsdeangells",
    verified: true,
    description: "This is absolutely mind-blowing! 🤯 #mindblowing #viral #trending",
    likes: "156.7K",
    comments: "9876",
    shares: "12345",
    saves: "8765",
    sound: "Original Sound",
    creator: "megsdeangells"
  },
  {
    id: 5,
    thumbnail: "/tiktok-video-thumbnail-5.png",
    views: "712.7K",
    username: "thisntfeb",
    verified: false,
    description: "You have to see this to believe it! 😍 #amazing #viral #trending",
    likes: "34.2K",
    comments: "2345",
    shares: "3456",
    saves: "4567",
    sound: "Original Sound",
    creator: "thisntfeb"
  },
  {
    id: 6,
    thumbnail: "/tiktok-video-thumbnail-6.png",
    views: "56.4K",
    username: "yungkaiverse",
    verified: false,
    description: "Check out this amazing content! 🚀 #viral #trending #fyp",
    likes: "12.3K",
    comments: "890",
    shares: "1234",
    saves: "567",
    sound: "Original Sound",
    creator: "yungkaiverse"
  },
  {
    id: 7,
    thumbnail: "/cooking-content.png",
    views: "1.2M",
    username: "chefmaria_",
    verified: true
  },
  {
    id: 8,
    thumbnail: "/pet-content.png",
    views: "890K",
    username: "fluffypaws",
    verified: false
  },
  {
    id: 9,
    thumbnail: "/fashion-content.png",
    views: "2.1M",
    username: "stylebyava",
    verified: true
  },
  {
    id: 10,
    thumbnail: "/tech-content.png",
    views: "445K",
    username: "techguru2024",
    verified: false
  },
  {
    id: 11,
    thumbnail: "/fitness-content.png",
    views: "1.8M",
    username: "fitnessjake",
    verified: true
  },
  {
    id: 12,
    thumbnail: "/art-content.png",
    views: "320K",
    username: "artbyluna",
    verified: false
  },
  {
    id: 13,
    thumbnail: "/travel-content.png",
    views: "3.5M",
    username: "wanderlust_sam",
    verified: true
  },
  {
    id: 14,
    thumbnail: "/music-content.png",
    views: "670K",
    username: "beatmaker_pro",
    verified: false
  },
  {
    id: 15,
    thumbnail: "/comedy-content.png",
    views: "4.2M",
    username: "funnyguy_mike",
    verified: true
  },
  {
    id: 16,
    thumbnail: "/beauty-content.png",
    views: "1.5M",
    username: "glowup_queen",
    verified: true
  },
  {
    id: 17,
    thumbnail: "/gaming-content.png",
    views: "2.8M",
    username: "progamer_alex",
    verified: false
  },
  {
    id: 18,
    thumbnail: "/dance-content.png",
    views: "5.1M",
    username: "dancemoves_lily",
    verified: true
  },
  {
    id: 19,
    thumbnail: "/diy-content.png",
    views: "780K",
    username: "crafty_hands",
    verified: false
  },
  {
    id: 20,
    thumbnail: "/nature-content.png",
    views: "1.1M",
    username: "wildlifephoto",
    verified: true
  },
  {
    id: 21,
    thumbnail: "/sports-content.png",
    views: "2.3M",
    username: "athlete_zone",
    verified: false
  },
  {
    id: 22,
    thumbnail: "/lifestyle-content.png",
    views: "950K",
    username: "dailyvibes_",
    verified: true
  },
  {
    id: 23,
    thumbnail: "/education-content.png",
    views: "1.7M",
    username: "learnwithme",
    verified: true
  }
]

// ============================================================================
// MOCK CREATOR DATA
// ============================================================================

export const MOCK_CREATORS: Creator[] = [
  {
    id: "1",
    username: "@sarah_dance",
    displayName: "Sarah Martinez",
    followers: "2.3M",
    avatar: "/diverse-group-smiling.png",
    verified: true
  },
  {
    id: "2",
    username: "@mike_creator",
    displayName: "Mike Johnson",
    followers: "1.8M",
    avatar: "/person-named-mike.png",
    verified: true
  },
  {
    id: "3",
    username: "@dance_queen",
    displayName: "Emma Wilson",
    followers: "950K",
    avatar: "/portrait-young-woman.png",
    verified: false
  },
  {
    id: "4",
    username: "@comedy_king",
    displayName: "Alex Chen",
    followers: "3.1M",
    avatar: "/diverse-group-meeting.png",
    verified: true
  }
]

// ============================================================================
// MOCK TRANSACTION DATA
// ============================================================================

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "gift",
    amount: -25.0,
    description: "Sent virtual gift to @sarah_dance",
    date: "2 hours ago",
    status: "completed"
  },
  {
    id: "2",
    type: "subscription",
    amount: -9.99,
    description: "Premium subscription renewal",
    date: "1 day ago",
    status: "completed"
  },
  {
    id: "3",
    type: "boost",
    amount: -50.0,
    description: "Video boost package",
    date: "3 days ago",
    status: "completed"
  },
  {
    id: "4",
    type: "received",
    amount: 15.0,
    description: "Gift from @mike_creator",
    date: "5 days ago",
    status: "completed"
  },
  {
    id: "5",
    type: "withdrawal",
    amount: 500.00,
    description: "Withdrawal to bank account",
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: "6",
    type: "earned",
    amount: 125.50,
    description: "Creator earnings",
    date: "2024-01-14",
    status: "completed"
  }
]

export const MOCK_GIFT_HISTORY: GiftTransaction[] = [
  { id: "1", recipient: "@sarah_dance", amount: 25.0, date: "2 hours ago", type: "sent" },
  { id: "2", recipient: "@mike_creator", amount: 15.0, date: "5 days ago", type: "received" },
  { id: "3", recipient: "@dance_queen", amount: 10.0, date: "1 week ago", type: "sent" },
  { id: "4", recipient: "@comedy_king", amount: 30.0, date: "2 weeks ago", type: "sent" }
]

// ============================================================================
// MOCK PAYMENT METHODS
// ============================================================================

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "1",
    type: "Credit Card",
    name: "Visa ending in 4242",
    icon: "CreditCard"
  },
  {
    id: "2",
    type: "Bank Account",
    name: "Chase Bank ending in 1234",
    icon: "Building2"
  }
]

// ============================================================================
// MOCK SUBSCRIPTION DATA
// ============================================================================

export const MOCK_SUBSCRIBED_CREATORS: SubscribedCreator[] = [
  {
    id: 1,
    name: "@charlidamelio",
    avatar: "/placeholder-user.jpg",
    supportLevel: "Top Supporter",
    videos: [
      { id: 1, thumbnail: "/dance-content.png", title: "New Dance" },
      { id: 2, thumbnail: "/dance-content.png", title: "Behind Scenes" },
      { id: 3, thumbnail: "/dance-content.png", title: "Exclusive" }
    ],
    hasGifts: true,
    unreadMessages: 2
  },
  {
    id: 2,
    name: "@addisonre",
    avatar: "/placeholder-user.jpg",
    supportLevel: "Supporter",
    videos: [
      { id: 4, thumbnail: "/beauty-content.png", title: "Makeup Tutorial" },
      { id: 5, thumbnail: "/beauty-content.png", title: "Get Ready" },
      { id: 6, thumbnail: "/beauty-content.png", title: "Q&A" }
    ],
    hasGifts: false,
    unreadMessages: 0
  },
  {
    id: 3,
    name: "@zachking",
    avatar: "/placeholder-user.jpg",
    supportLevel: "VIP",
    videos: [
      { id: 7, thumbnail: "/comedy-content.png", title: "Magic Trick" },
      { id: 8, thumbnail: "/comedy-content.png", title: "How I Did It" },
      { id: 9, thumbnail: "/comedy-content.png", title: "Bloopers" }
    ],
    hasGifts: true,
    unreadMessages: 5
  }
]

export const MOCK_NEW_UPDATES: NewUpdate[] = [
  {
    id: 1,
    creator: "@charlidamelio",
    avatar: "/placeholder-user.jpg",
    content: "Just dropped exclusive behind-the-scenes content!",
    time: "2h ago",
    type: "exclusive"
  },
  {
    id: 2,
    creator: "@zachking",
    avatar: "/placeholder-user.jpg",
    content: "New magic tutorial available for VIP subscribers",
    time: "4h ago",
    type: "tutorial"
  },
  {
    id: 3,
    creator: "@addisonre",
    avatar: "/placeholder-user.jpg",
    content: "Live Q&A session starting in 30 minutes!",
    time: "6h ago",
    type: "live"
  }
]

export const MOCK_BENEFITS: Benefit[] = [
  { icon: "TrendingUp", text: "Bonus content" },
  { icon: "Gift", text: "Gifts for top supporters" },
  { icon: "Calendar", text: "Entry for private TikTok events" },
  { icon: "Users2", text: "Access to Discord or private chats" }
]

// ============================================================================
// MOCK BOOST CAMPAIGNS
// ============================================================================

export const MOCK_BOOST_CAMPAIGNS: BoostCampaign[] = [
  {
    id: 1,
    name: "Viral Boost",
    status: "active",
    duration: "3 days",
    cost: 25,
    performance: 150
  },
  {
    id: 2,
    name: "Trending Push",
    status: "completed",
    duration: "7 days",
    cost: 50,
    performance: 300
  },
  {
    id: 3,
    name: "Peak Time Boost",
    status: "scheduled",
    duration: "5 days",
    cost: 40,
    performance: 0
  }
]

// ============================================================================
// USER STATE CONSTANTS
// ============================================================================

export const DEFAULT_USER_STATE = {
  balance: 1247.5,
  subscriptionLevel: "Premium",
  hypesReceived: 15420,
  sparksUsed: 8750,
  currentBoost: 2.5,
  nextBoostAt: 1500,
  showBalance: true
}

// ============================================================================
// API ENDPOINTS (MOCK)
// ============================================================================

export const API_ENDPOINTS = {
  VIDEOS: "/api/videos",
  CREATORS: "/api/creators",
  TRANSACTIONS: "/api/transactions",
  SUBSCRIPTIONS: "/api/subscriptions",
  WALLET: "/api/wallet",
  BOOSTS: "/api/boosts"
} as const

// ============================================================================
// UI CONSTANTS
// ============================================================================

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  PAGINATION_LIMIT: 20,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_VIDEO_FORMATS: ["mp4", "mov", "avi", "mkv"],
  SUPPORTED_IMAGE_FORMATS: ["jpg", "jpeg", "png", "gif", "webp"]
} as const

// ============================================================================
// PAYMENT INTERFACE TYPES
// ============================================================================

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

export interface PaymentResult {
  success: boolean
  transactionId: string
  amount: number
  method: string
  message: string
}

export interface WithdrawalResult {
  success: boolean
  transactionId: string
  amount: number
  method: string
  message: string
  processingTime: string
}

export interface WalletBalance {
  balance: number
}

export interface WalletTransaction {
  type: "add" | "withdraw"
  amount: number
  balance: number
  timestamp: number
}

export interface PaymentMethod {
  id: string
  type: "Credit Card" | "PayPal" | "Google Pay" | "Apple Pay"
  cardType?: string
  lastFour: string
  expiryDate?: string
  email?: string
  isDefault: boolean
  createdAt: number
}

// ============================================================================
// MOCK API FUNCTIONS
// ============================================================================

export const mockApi = {
  // Simulate API delay
  delay: (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

  // Mock video fetching
  getVideos: async (): Promise<Video[]> => {
    await mockApi.delay(500)
    return MOCK_VIDEOS
  },

  // Mock creator fetching
  getCreators: async (): Promise<Creator[]> => {
    await mockApi.delay(300)
    return MOCK_CREATORS
  },

  // Mock transaction fetching
  getTransactions: async (): Promise<Transaction[]> => {
    await mockApi.delay(400)
    return MOCK_TRANSACTIONS
  },

  // Mock subscription data fetching
  getSubscriptions: async (): Promise<SubscribedCreator[]> => {
    await mockApi.delay(600)
    return MOCK_SUBSCRIBED_CREATORS
  },

  // Mock user data fetching
  getUserData: async () => {
    await mockApi.delay(200)
    return DEFAULT_USER_STATE
  },

  // Mock payment processing
  processCreditCardPayment: async (cardData: CreditCardData, amount: number): Promise<PaymentResult> => {
    await mockApi.delay(2000)
    return {
      success: true,
      transactionId: `CC_${Date.now()}`,
      amount,
      method: "Credit Card",
      message: "Payment processed successfully"
    }
  },

  processPayPalPayment: async (paypalData: PayPalData, amount: number): Promise<PaymentResult> => {
    await mockApi.delay(1500)
    return {
      success: true,
      transactionId: `PP_${Date.now()}`,
      amount,
      method: "PayPal",
      message: "PayPal payment completed"
    }
  },

  processGooglePayPayment: async (googlePayData: GooglePayData): Promise<PaymentResult> => {
    await mockApi.delay(1000)
    return {
      success: true,
      transactionId: `GP_${Date.now()}`,
      amount: googlePayData.amount,
      method: "Google Pay",
      message: "Google Pay transaction successful"
    }
  },

  processApplePayPayment: async (applePayData: ApplePayData): Promise<PaymentResult> => {
    await mockApi.delay(1200)
    return {
      success: true,
      transactionId: `AP_${Date.now()}`,
      amount: applePayData.amount,
      method: "Apple Pay",
      message: "Apple Pay payment completed"
    }
  },

  // Mock withdrawal processing
  processCreditCardWithdrawal: async (cardData: CreditCardData, amount: number): Promise<WithdrawalResult> => {
    await mockApi.delay(3000) // Longer delay for withdrawals
    return {
      success: true,
      transactionId: `WD_CC_${Date.now()}`,
      amount,
      method: "Credit Card",
      message: "Withdrawal processed successfully",
      processingTime: "1-3 business days"
    }
  },

  processPayPalWithdrawal: async (paypalData: PayPalData, amount: number): Promise<WithdrawalResult> => {
    await mockApi.delay(2500)
    return {
      success: true,
      transactionId: `WD_PP_${Date.now()}`,
      amount,
      method: "PayPal",
      message: "PayPal withdrawal completed",
      processingTime: "1-2 business days"
    }
  },

  processGooglePayWithdrawal: async (googlePayData: GooglePayData): Promise<WithdrawalResult> => {
    await mockApi.delay(2000)
    return {
      success: true,
      transactionId: `WD_GP_${Date.now()}`,
      amount: googlePayData.amount,
      method: "Google Pay",
      message: "Google Pay withdrawal successful",
      processingTime: "1-2 business days"
    }
  },

  processApplePayWithdrawal: async (applePayData: ApplePayData): Promise<WithdrawalResult> => {
    await mockApi.delay(2200)
    return {
      success: true,
      transactionId: `WD_AP_${Date.now()}`,
      amount: applePayData.amount,
      method: "Apple Pay",
      message: "Apple Pay withdrawal completed",
      processingTime: "1-2 business days"
    }
  },

  // Mock wallet balance APIs
  getWalletBalance: async (): Promise<WalletBalance> => {
    await mockApi.delay(300)
    // Get balance from localStorage or return default
    const storedBalance = localStorage.getItem("walletBalance")
    const balance = storedBalance ? parseFloat(storedBalance) : 1247.50
    return { balance }
  },

  addToWallet: async (amount: number): Promise<WalletBalance> => {
    await mockApi.delay(500)
    const currentBalance = await mockApi.getWalletBalance()
    const newBalance = currentBalance.balance + amount
    localStorage.setItem("walletBalance", newBalance.toString())
    return { balance: newBalance }
  },

  withdrawFromWallet: async (amount: number): Promise<WalletBalance> => {
    await mockApi.delay(500)
    const currentBalance = await mockApi.getWalletBalance()
    
    if (currentBalance.balance < amount) {
      throw new Error("Insufficient funds")
    }
    
    const newBalance = currentBalance.balance - amount
    localStorage.setItem("walletBalance", newBalance.toString())
    return { balance: newBalance }
  },

  // Mock payment methods APIs
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
  }
}
