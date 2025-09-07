"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiService } from '@/lib/services/api'

interface WalletState {
  balance: number
  currency: string
  lastUpdated: string
  pendingTransactions: number
  isLoading: boolean
  error: string | null
}

interface CreatorWalletState {
  balance: number
  currency: string
  totalEarnings: number
  monthlyEarnings: number
  pendingWithdrawals: number
  lastUpdated: string
  isLoading: boolean
  error: string | null
}

interface WalletContextType {
  // User wallet state
  userWallet: WalletState
  refreshUserWallet: () => Promise<void>
  addUserFunds: (amount: number, paymentMethodId: string, paymentData: any) => Promise<any>
  withdrawUserFunds: (amount: number, paymentMethodId: string, withdrawalData: any) => Promise<any>
  
  // Creator wallet state
  creatorWallet: CreatorWalletState
  refreshCreatorWallet: () => Promise<void>
  withdrawCreatorFunds: (amount: number, paymentMethodId: string, withdrawalData: any) => Promise<any>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  // User wallet state
  const [userWallet, setUserWallet] = useState<WalletState>({
    balance: 0,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
    pendingTransactions: 0,
    isLoading: false,
    error: null
  })

  // Creator wallet state
  const [creatorWallet, setCreatorWallet] = useState<CreatorWalletState>({
    balance: 0,
    currency: 'USD',
    totalEarnings: 0,
    monthlyEarnings: 0,
    pendingWithdrawals: 0,
    lastUpdated: new Date().toISOString(),
    isLoading: false,
    error: null
  })

  // User wallet functions
  const refreshUserWallet = async () => {
    setUserWallet(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await apiService.getUserWalletBalance()
      if (response.success) {
        setUserWallet({
          balance: response.balance,
          currency: response.currency,
          lastUpdated: response.lastUpdated,
          pendingTransactions: response.pendingTransactions,
          isLoading: false,
          error: null
        })
      } else {
        setUserWallet(prev => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to load user wallet'
        }))
      }
    } catch (error) {
      setUserWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load user wallet'
      }))
    }
  }

  const addUserFunds = async (amount: number, paymentMethodId: string, paymentData: any) => {
    setUserWallet(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await apiService.addUserFunds(amount, paymentMethodId, paymentData)
      if (response.success) {
        await refreshUserWallet() // Refresh to get updated balance
        return response
      } else {
        setUserWallet(prev => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to add funds'
        }))
        throw new Error(response.error?.message || 'Failed to add funds')
      }
    } catch (error) {
      setUserWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add funds'
      }))
      throw error
    }
  }

  const withdrawUserFunds = async (amount: number, paymentMethodId: string, withdrawalData: any) => {
    setUserWallet(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await apiService.withdrawUserFunds(amount, paymentMethodId, withdrawalData)
      if (response.success) {
        await refreshUserWallet() // Refresh to get updated balance
        return response
      } else {
        setUserWallet(prev => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to withdraw funds'
        }))
        throw new Error(response.error?.message || 'Failed to withdraw funds')
      }
    } catch (error) {
      setUserWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to withdraw funds'
      }))
      throw error
    }
  }

  // Creator wallet functions
  const refreshCreatorWallet = async () => {
    setCreatorWallet(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await apiService.getCreatorWalletBalance()
      if (response.success) {
        setCreatorWallet({
          balance: response.balance,
          currency: response.currency,
          totalEarnings: response.totalEarnings,
          monthlyEarnings: response.monthlyEarnings,
          pendingWithdrawals: response.pendingWithdrawals,
          lastUpdated: response.lastUpdated,
          isLoading: false,
          error: null
        })
      } else {
        setCreatorWallet(prev => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to load creator wallet'
        }))
      }
    } catch (error) {
      setCreatorWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load creator wallet'
      }))
    }
  }

  const withdrawCreatorFunds = async (amount: number, paymentMethodId: string, withdrawalData: any) => {
    setCreatorWallet(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await apiService.withdrawCreatorFunds(amount, paymentMethodId, withdrawalData)
      if (response.success) {
        await refreshCreatorWallet() // Refresh to get updated balance
        return response
      } else {
        setCreatorWallet(prev => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to withdraw funds'
        }))
        throw new Error(response.error?.message || 'Failed to withdraw funds')
      }
    } catch (error) {
      setCreatorWallet(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to withdraw funds'
      }))
      throw error
    }
  }

  const value: WalletContextType = {
    userWallet,
    refreshUserWallet,
    addUserFunds,
    withdrawUserFunds,
    creatorWallet,
    refreshCreatorWallet,
    withdrawCreatorFunds
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Separate hooks for specific wallet types
export function useUserWallet() {
  const { userWallet, refreshUserWallet, addUserFunds, withdrawUserFunds } = useWallet()
  return {
    userWallet,
    refreshUserWallet,
    addUserFunds,
    withdrawUserFunds
  }
}

export function useCreatorWallet() {
  const { creatorWallet, refreshCreatorWallet, withdrawCreatorFunds } = useWallet()
  return {
    creatorWallet,
    refreshCreatorWallet,
    withdrawCreatorFunds
  }
}
