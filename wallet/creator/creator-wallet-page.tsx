"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Badge } from "@/components/shared/ui/badge"
import { Progress } from "@/components/shared/ui/progress"
import { Input } from "@/components/shared/ui/input"
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Smartphone,
  Building2,
  Gift,
  Crown,
  Zap,
  Trophy,
  Star,
  Heart,
  TrendingUp,
  Plus,
  Send,
  Download,
  Sparkles,
  Search,
  X,
  Coins,
  HandHeart,
  Check,
  Menu,
  Bell,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  Edit,
  SparkleIcon,
  DollarSign,
  BarChart3
} from "lucide-react"
import { TikTokSidebar } from "@/components/tiktok-sidebar"
import { PaymentSelectionModal } from "@/components/shared/payment-selection-modal"
import { CreatorWithdrawalSelectionModal } from "@/components/shared/creator-withdrawal-selection-modal"
import { CreatorWithdrawalSuccessModal } from "@/components/shared/creator-withdrawal-success-modal"
import { PaymentSuccessModal } from "@/components/shared/payment-success-modal"
import { mockApi } from "@/constants/constants"
import { TokenUtils, WalletBalance, TOKEN_DISPLAY } from "@/constants/tokens"

interface CreatorWalletPageProps {
  onBack: () => void
}

export function CreatorWalletPage({ onBack }: CreatorWalletPageProps) {
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null)
  const [creatorId, setCreatorId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [showPaymentSelection, setShowPaymentSelection] = useState(false)
  const [showWithdrawalSelection, setShowWithdrawalSelection] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [showWithdrawalSuccess, setShowWithdrawalSuccess] = useState(false)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  const [withdrawalResult, setWithdrawalResult] = useState<any>(null)

  // Load balance on component mount
  useEffect(() => {
    const loadBalance = async () => {
      try {
        setLoading(true)
        
        // For demo purposes, use a hardcoded creator ID
        // In a real app, this would come from authentication
        const demoCreatorId = "68bdb7bc0866e35fb0369f1f"
        setCreatorId(demoCreatorId)

        // Get creator wallet balance
        const response = await fetch(`/api/wallet/creator/balance?creatorId=${demoCreatorId}`)
        const walletData = await response.json()
        
        if (walletData.balance) {
          setWalletBalance(walletData.balance)
        } else {
          console.error("Invalid balance data received:", walletData)
          setWalletBalance(TokenUtils.createBalance(0, 0))
        }
      } catch (error) {
        console.error("Failed to load creator balance:", error)
        setWalletBalance(TokenUtils.createBalance(0, 0))
      } finally {
        setLoading(false)
      }
    }
    loadBalance()
  }, [])

  const handleAddFundsClick = () => {
    setShowPaymentSelection(true)
  }

  const handleWithdrawClick = () => {
    setShowWithdrawalSelection(true)
  }

  const handlePaymentSuccess = async (result: any) => {
    console.log("Payment successful:", result)
    setShowPaymentSelection(false)

    try {
      setIsLoadingBalance(true)
      if (!creatorId) {
        console.error("No creator ID available")
        setPaymentResult(result)
        setShowPaymentSuccess(true)
        return
      }

      // Add funds to creator wallet using direct API call
      const response = await fetch('/api/wallet/creator/balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId,
          amount: result.amount,
          operation: 'add_earnings'
        })
      })
      
      const updatedBalance = await response.json()
      if (updatedBalance.balance) {
        setWalletBalance(updatedBalance.balance)
      }
      
      setPaymentResult(result)
      setShowPaymentSuccess(true)
    } catch (error) {
      console.error("Failed to update balance:", error)
      setPaymentResult(result)
      setShowPaymentSuccess(true)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const refreshBalance = async () => {
    try {
      if (!creatorId) return
      
      const response = await fetch(`/api/wallet/creator/balance?creatorId=${creatorId}`)
      const walletData = await response.json()
      
      if (walletData.balance) {
        setWalletBalance(walletData.balance)
      }
    } catch (error) {
      console.error("Failed to refresh balance:", error)
    }
  }

  const handleWithdrawalSuccess = async (result: any) => {
    console.log("Withdrawal successful:", result)
    setShowWithdrawalSelection(false)

    try {
      setIsLoadingBalance(true)
      if (!creatorId) {
        console.error("No creator ID available")
        setWithdrawalResult(result)
        setShowWithdrawalSuccess(true)
        return
      }

      // Deduct the withdrawal amount from the creator wallet balance using direct API call
      const response = await fetch('/api/wallet/creator/balance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId,
          amount: result.amount,
          operation: 'withdraw'
        })
      })
      
      const updatedBalance = await response.json()
      if (updatedBalance.balance) {
        setWalletBalance(updatedBalance.balance)
        console.log("Creator balance updated after withdrawal:", updatedBalance.balance)
      } else if (updatedBalance.error === 'Insufficient total balance') {
        alert("Insufficient total balance for withdrawal")
        return
      }
      
      setWithdrawalResult(result)
      setShowWithdrawalSuccess(true)
    } catch (error) {
      console.error("Failed to update balance:", error)
      if (error.message === "Insufficient funds") {
        alert("Insufficient funds for withdrawal")
        return
      }
      setWithdrawalResult(result)
      setShowWithdrawalSuccess(true)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Creator Wallet</h1>
              <p className="text-sm text-gray-600">Manage your creator earnings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Balance Section */}
        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
          <CardContent className="p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <p className="text-white/80 text-sm font-medium">Wallet Balance</p>
                <div className="space-y-2">
                  {isLoadingBalance ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Loading...</span>
                    </div>
                  ) : showBalance ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold">{walletBalance?.total?.toFixed(2) || '0.00'}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowBalance(!showBalance)}
                          className="p-1 text-white hover:bg-white/20"
                          disabled={isLoadingBalance}
                        >
                          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${TOKEN_DISPLAY.TK.bgColor.replace('bg-', 'bg-')}`}></div>
                          <span className="text-white/80">{TOKEN_DISPLAY.TK.symbol}: {walletBalance?.tk?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${TOKEN_DISPLAY.TKI.bgColor.replace('bg-', 'bg-')}`}></div>
                          <span className="text-white/80">{TOKEN_DISPLAY.TKI.symbol}: {walletBalance?.tki?.toFixed(2) || '0.00'}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold">••••••</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-blue-300/30 rounded-full px-3 py-1.5">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Premium</span>
              </div>
            </div>
            
            {/* Add Funds Button - Large white button */}
            <div className="mb-6">
              <Button
                className="bg-white text-gray-900 hover:bg-white/90 w-full h-14 text-lg font-semibold rounded-xl shadow-md"
                onClick={handleAddFundsClick}
              >
                <Plus className="w-5 h-5 mr-3 text-blue-500" />
                Add Funds
              </Button>
            </div>
            
            {/* Action Buttons - Two blue buttons below */}
            <div className="space-y-3">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white w-full h-12 rounded-xl shadow-md"
                onClick={handleWithdrawClick}
              >
                <Download className="w-4 h-4 mr-3" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creator Stats */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Creator Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Total Earnings</p>
                      <p className="text-sm text-gray-600">This month</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">+$2,450.00</p>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Video Views</p>
                      <p className="text-sm text-gray-600">Total this month</p>
                    </div>
                  </div>
                  <p className="font-bold text-blue-600">2.8M</p>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Subscribers</p>
                      <p className="text-sm text-gray-600">Active followers</p>
                    </div>
                  </div>
                  <p className="font-bold text-purple-600">12.4K</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors bg-white border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Earnings from Video</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">+$125.50</p>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors bg-white border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 text-orange-600">
                        <ArrowDownLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Withdrawal to Bank</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    <p className="font-bold text-orange-600">-$500.00</p>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors bg-white border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Content Boost</p>
                        <p className="text-sm text-gray-600">3 days ago</p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600">-$30.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Creator Level */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Creator Level
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pro Creator</h3>
                  <p className="text-sm text-gray-600">Level 5 • 2,450 points</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-pink-500" />
                    <span>Exclusive features</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Goal */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Monthly Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">$2,450</p>
                  <p className="text-sm text-gray-600">of $5,000 goal</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>49%</span>
                  </div>
                  <Progress value={49} className="h-2" />
                </div>
                <p className="text-xs text-gray-600 text-center">
                  $2,550 more to reach your goal!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPaymentSelection && (
        <PaymentSelectionModal
          onClose={() => setShowPaymentSelection(false)}
          onSuccess={handlePaymentSuccess}
          initialAmount={100}
        />
      )}
      {showWithdrawalSelection && (
        <CreatorWithdrawalSelectionModal
          onClose={() => setShowWithdrawalSelection(false)}
          onSuccess={handleWithdrawalSuccess}
          initialAmount={50}
          currentBalance={walletBalance?.total}
        />
      )}
      {showWithdrawalSuccess && withdrawalResult && (
        <CreatorWithdrawalSuccessModal
          onClose={() => setShowWithdrawalSuccess(false)}
          result={withdrawalResult}
        />
      )}
      {showPaymentSuccess && paymentResult && (
        <PaymentSuccessModal
          onClose={() => setShowPaymentSuccess(false)}
          result={paymentResult}
        />
      )}
    </div>
  )
}

export default CreatorWalletPage
