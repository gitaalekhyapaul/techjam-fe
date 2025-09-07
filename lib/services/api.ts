// API service for frontend components
// This replaces the mockApi functions in constants.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      if (token) {
        defaultHeaders.Authorization = `Bearer ${token}`
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'API request failed')
    }

    return response.json()
  }

  // Authentication
  async login(username: string, password: string, userType?: 'user' | 'creator') {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, userType }),
    })
  }

  async register(userData: {
    username: string
    email: string
    password: string
    userType: 'user' | 'creator'
    profile: {
      displayName: string
      bio?: string
      avatar?: string
    }
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // User wallet operations
  async getUserWalletBalance() {
    return this.request('/user/wallet/balance')
  }

  async addUserFunds(amount: number, paymentMethodId: string, paymentData: any) {
    return this.request('/user/wallet/add-funds', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethodId, paymentData }),
    })
  }

  async withdrawUserFunds(amount: number, paymentMethodId: string, withdrawalData: any) {
    return this.request('/user/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethodId, withdrawalData }),
    })
  }

  // Creator wallet operations
  async getCreatorWalletBalance() {
    return this.request('/creators/wallet/balance')
  }

  async withdrawCreatorFunds(amount: number, paymentMethodId: string, withdrawalData: any) {
    return this.request('/creator/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, paymentMethodId, withdrawalData }),
    })
  }

  // Legacy wallet operations (for backward compatibility)
  async getWalletBalance() {
    return this.getUserWalletBalance()
  }

  async addFunds(amount: number, paymentMethodId: string, paymentData: any) {
    return this.addUserFunds(amount, paymentMethodId, paymentData)
  }

  async withdrawFunds(amount: number, paymentMethodId: string, withdrawalData: any) {
    return this.withdrawUserFunds(amount, paymentMethodId, withdrawalData)
  }

  async getTransactions(page: number = 1, limit: number = 20, type?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && { type }),
    })
    return this.request(`/transactions?${params}`)
  }

  // Payment methods
  async getPaymentMethods() {
    return this.request('/payments/methods')
  }

  async addPaymentMethod(paymentData: any) {
    return this.request('/payments/methods', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  async updatePaymentMethod(id: string, updateData: any) {
    return this.request(`/payments/methods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  async deletePaymentMethod(id: string) {
    return this.request(`/payments/methods/${id}`, {
      method: 'DELETE',
    })
  }

  // Subscriptions
  async getSubscriptions() {
    return this.request('/subscriptions')
  }

  async createSubscription(creatorId: string, tier: string, paymentMethodId: string) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ creatorId, tier, paymentMethodId }),
    })
  }

  async updateSubscription(id: string, updateData: any) {
    return this.request(`/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  async cancelSubscription(id: string) {
    return this.request(`/subscriptions/${id}`, {
      method: 'DELETE',
    })
  }

  // User profile
  async getUserProfile() {
    return this.request('/users/profile')
  }

  async updateUserProfile(updateData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  // Creators
  async getCreators(page: number = 1, limit: number = 20, category?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
    })
    return this.request(`/creators?${params}`)
  }

  async getCreator(id: string) {
    return this.request(`/creators/${id}`)
  }

  // Analytics
  async getCreatorAnalytics(creatorId: string, period: string = '30d') {
    return this.request(`/analytics/creator/${creatorId}?period=${period}`)
  }

  async getUserAnalytics(userId: string) {
    return this.request(`/analytics/user/${userId}`)
  }

  // Creator-specific endpoints
  async getCreatorWalletBalance() {
    return this.request('/creators/wallet/balance')
  }

  async getCreatorEarnings(page: number = 1, limit: number = 20) {
    return this.request(`/creators/earnings?page=${page}&limit=${limit}`)
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Legacy compatibility - keep some mock functions for static data
export const mockApi = {
  // Simulate API delay for development
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Static data functions (these don't need API calls)
  getVideos: async () => {
    // Import static videos from constants
    const { videos } = await import('@/constants/constants')
    return videos
  },

  getVideo: async (id: string) => {
    const { videos } = await import('@/constants/constants')
    return videos.find(video => video.id === id) || null
  },

  getCreators: async () => {
    const { creators } = await import('@/constants/constants')
    return creators
  },

  getCreator: async (id: string) => {
    const { creators } = await import('@/constants/constants')
    return creators.find(creator => creator.id === id) || null
  },

  // Dynamic data functions now use API service
  getWalletBalance: () => apiService.getUserWalletBalance(),
  addToWallet: (amount: number) => apiService.addUserFunds(amount, '', {}),
  withdrawFromWallet: (amount: number) => apiService.withdrawUserFunds(amount, '', {}),
  
  // Creator-specific functions
  getCreatorWalletBalance: () => apiService.getCreatorWalletBalance(),
  withdrawFromCreatorWallet: (amount: number) => apiService.withdrawCreatorFunds(amount, '', {}),
  getPaymentMethods: () => apiService.getPaymentMethods(),
  savePaymentMethod: (paymentData: any) => apiService.addPaymentMethod(paymentData),
  getTransactions: () => apiService.getTransactions(),
  getSubscriptions: () => apiService.getSubscriptions(),

  // Payment processing (these will be implemented in API routes)
  processCreditCardPayment: async (data: any, amount: number) => {
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

  processPayPalPayment: async (data: any, amount: number) => {
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

  processGooglePayPayment: async (data: any) => {
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

  processApplePayPayment: async (data: any) => {
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

  // Withdrawal processing
  processCreditCardWithdrawal: async (data: any, amount: number) => {
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

  processPayPalWithdrawal: async (data: any, amount: number) => {
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

  processGooglePayWithdrawal: async (data: any) => {
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

  processApplePayWithdrawal: async (data: any) => {
    await mockApi.delay(1000)
    return {
      success: true,
      message: "Apple Pay withdrawal successful!",
      transactionId: `wth_${Date.now()}`,
      amount: data.amount,
      method: "Apple Pay",
      processingTime: "1-2 business days"
    }
  }
}
