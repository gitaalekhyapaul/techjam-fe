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

interface CreatorWalletPageProps {
  onBack: () => void
}

export function CreatorWalletPage({ onBack }: CreatorWalletPageProps) {
  const [balance, setBalance] = useState(3000)
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
        const balanceData = await mockApi.getCreatorWalletBalance()
        setBalance(balanceData.balance)
      } catch (error) {
        console.error("Failed to load balance:", error)
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
      const updatedBalance = await mockApi.addToWallet(result.amount)
      setBalance(updatedBalance.balance)
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

  const handleWithdrawalSuccess = async (result: any) => {
    console.log("Withdrawal successful:", result)
    setShowWithdrawalSelection(false)

    try {
      setIsLoadingBalance(true)
      const updatedBalance = await mockApi.withdrawFromCreatorWallet(result.amount)
      setBalance(updatedBalance.balance)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Creator Wallet</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <TikTokSidebar
          isLoggedIn={true}
          isMobileSidebarOpen={false}
          onToggleMobileSidebar={() => {}}
          activeView="creator"
          showMobileOverlay={false}
          variant="default"
          showSearch={true}
          searchPlaceholder="Search"
          showLogo={true}
          showFollowingSection={false}
          showFooter={true}
          customNavItems={[
            { icon: Wallet, label: "Wallet", action: "wallet", isActive: true },
          ]}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 text-sm mb-1">Creator Balance</p>
                  <div className="flex items-center space-x-2">
                    {isLoadingBalance ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-lg">Loading...</span>
                      </div>
                    ) : showBalance ? (
                      <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                    ) : (
                      <p className="text-2xl font-bold">••••••</p>
                    )}
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
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddFundsClick}
                  className="flex-1 bg-white text-blue-600 hover:bg-white/90"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button
                  onClick={handleWithdrawClick}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Boost Content</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Analytics</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Rewards</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Crown className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Creator Plus</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Earnings from Video</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+$125.50</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <ArrowDownLeft className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Withdrawal to Bank</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-orange-600">-$500.00</p>
                    <p className="text-xs text-gray-500">Processing</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Content Boost</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">-$30.00</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
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
          currentBalance={balance}
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
