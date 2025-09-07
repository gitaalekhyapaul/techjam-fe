// Centralized wallet API service for MongoDB operations
import { apiService } from './api'

export class WalletApiService {
  // User wallet operations
  static async getUserWalletBalance(userId: string) {
    try {
      const response = await fetch(`/api/wallet/user/balance?userId=${userId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user wallet balance:', error)
      throw error
    }
  }

  static async updateUserWalletBalance(userId: string, amount: number, operation: 'add' | 'withdraw') {
    try {
      const response = await fetch('/api/wallet/user/balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          operation
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating user wallet balance:', error)
      throw error
    }
  }

  // Creator wallet operations
  static async getCreatorWalletBalance(creatorId: string) {
    try {
      const response = await fetch(`/api/wallet/creator/balance?creatorId=${creatorId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching creator wallet balance:', error)
      throw error
    }
  }

  static async updateCreatorWalletBalance(creatorId: string, amount: number, operation: 'add' | 'withdraw') {
    try {
      const response = await fetch('/api/wallet/creator/balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId,
          amount,
          operation
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating creator wallet balance:', error)
      throw error
    }
  }

  // User management
  static async getUserByUsername(username: string) {
    try {
      const response = await fetch(`/api/users/by-username?username=${username}`)
      const data = await response.json()
      return data.user
    } catch (error) {
      console.error('Error fetching user by username:', error)
      throw error
    }
  }

  // Token transfer operations
  static async transferTokens(userId: string, videoId: string, amount: number) {
    try {
      const response = await fetch('/api/tokens/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          videoId,
          amount
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error transferring tokens:', error)
      throw error
    }
  }
}

