"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Card, CardContent } from "@/components/shared/ui/card"
import { Badge } from "@/components/shared/ui/badge"
import { Progress } from "@/components/shared/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shared/ui/avatar"
import { 
  Search, 
  Home, 
  Compass, 
  Users, 
  Plus, 
  Radio, 
  User, 
  MoreHorizontal, 
  Wallet, 
  Heart, 
  Menu, 
  X, 
  CreditCard, 
  LogOut,
  TrendingUp,
  DollarSign,
  Users as UsersIcon,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Zap,
  Target,
  Eye,
  Share2,
  MessageCircle,
  Bookmark
} from "lucide-react"

import { TikTokSidebar } from "./tiktok-sidebar"
import { CreatorWithdrawalSelectionModal } from "@/components/shared/creator-withdrawal-selection-modal"
import { CreatorWithdrawalSuccessModal } from "@/components/shared/creator-withdrawal-success-modal"
import { CreatorWalletPage } from "@/wallet/creator/creator-wallet-page"
import { apiService } from "@/lib/services/api"

// Mock data for creator dashboard
const creatorStats = {
  accountBalance: {
    current: 2847.50,
    withdrawn: 12500.00,
    unpaid: 892.30
  },
  earnings: {
    monthly: {
      dollars: 3247.80,
      hypes: 15420
    },
    total: {
      dollars: 28450.75,
      hypes: 125800
    }
  },
  subscribers: {
    total: 12450,
    active: 11890,
    newThisMonth: 560,
    growthRate: 4.7
  },
  analytics: {
    views: {
      total: 2840000,
      monthly: 245000,
      growth: 12.5
    },
    engagement: {
      rate: 8.7,
      likes: 125000,
      comments: 8900,
      shares: 3400
    },
    reach: {
      organic: 78.5,
      boosted: 21.5
    }
  },
  boosts: [
    {
      id: 1,
      name: "Trending Boost",
      status: "active",
      duration: "7 days",
      cost: 50,
      performance: 85
    },
    {
      id: 2,
      name: "Audience Targeting",
      status: "completed",
      duration: "3 days",
      cost: 30,
      performance: 92
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
}

const recentTransactions = [
  {
    id: 1,
    type: "withdrawal",
    amount: 500.00,
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: 2,
    type: "earned",
    amount: 125.50,
    date: "2024-01-14",
    status: "completed"
  },
  {
    id: 3,
    type: "boost",
    amount: -30.00,
    date: "2024-01-13",
    status: "completed"
  },
  {
    id: 4,
    type: "earned",
    amount: 89.75,
    date: "2024-01-12",
    status: "completed"
  }
]

interface TikTokCreatorDashboardProps {
  onLogout?: () => void
}

export function TikTokCreatorDashboard({ onLogout }: TikTokCreatorDashboardProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showWithdrawalSelection, setShowWithdrawalSelection] = useState(false)
  const [showWithdrawalSuccess, setShowWithdrawalSuccess] = useState(false)
  const [withdrawalResult, setWithdrawalResult] = useState<any>(null)
  const [creatorBalance, setCreatorBalance] = useState(creatorStats.accountBalance.current)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  
  // Real data state
  const [creatorData, setCreatorData] = useState(creatorStats)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch creator data from API
  const fetchCreatorData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch creator wallet balance
      const walletResponse = await apiService.getCreatorWalletBalance()
      if (walletResponse.success) {
        setCreatorBalance(walletResponse.balance)
        setCreatorData(prev => ({
          ...prev,
          accountBalance: {
            current: walletResponse.balance,
            withdrawn: walletResponse.totalEarnings - walletResponse.balance,
            unpaid: walletResponse.pendingWithdrawals
          },
          earnings: {
            monthly: {
              dollars: walletResponse.monthlyEarnings,
              hypes: Math.round(walletResponse.monthlyEarnings * 100) // Convert to hypes
            },
            total: {
              dollars: walletResponse.totalEarnings,
              hypes: Math.round(walletResponse.totalEarnings * 100)
            }
          }
        }))
      }
      
      // Fetch creator earnings
      const earningsResponse = await apiService.getCreatorEarnings(1, 10)
      if (earningsResponse.success) {
        setCreatorData(prev => ({
          ...prev,
          recentEarnings: earningsResponse.earnings.map(earning => ({
            source: earning.source,
            amount: earning.amount,
            date: new Date(earning.createdAt).toISOString().split('T')[0]
          }))
        }))
      }
      
    } catch (err) {
      console.error('Error fetching creator data:', err)
      setError('Failed to load creator data')
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchCreatorData()
  }, [])

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const handleWithdrawClick = () => {
    setShowWithdrawalSelection(true)
  }

  // Update balance when withdrawal is successful
  const handleWithdrawalSuccess = async (result: any) => {
    console.log("Withdrawal successful:", result)
    setWithdrawalResult(result)
    setShowWithdrawalSuccess(true)
    setShowWithdrawalSelection(false)
    
    // Update creator balance immediately if newBalance is provided
    if (result.newBalance !== undefined) {
      setCreatorBalance(result.newBalance)
      setCreatorData(prev => ({
        ...prev,
        accountBalance: {
          ...prev.accountBalance,
          current: result.newBalance
        }
      }))
    } else {
      // Fallback: refresh data after successful withdrawal
      await fetchCreatorData()
    }
  }

  const handleWalletClick = () => {
    setShowWallet(true)
  }

  const handleBackFromWallet = () => {
    setShowWallet(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const tabs = ["overview", "videos", "analytics", "earnings"]

  // Show wallet if wallet is selected
  if (showWallet) {
    return <CreatorWalletPage onBack={handleBackFromWallet} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
              <Menu className="w-4 h-4" />
            </Button>

            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%203-jvuVYl6iGXvwtQ2TgRywoy9xheweks.png"
                alt="TikTok Logo"
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-gray-900 text-xs px-2 py-1"
              onClick={onLogout}
            >
              <LogOut className="w-3 h-3 mr-1" />
              Logout
            </Button>
          </div>
        </div>

        <div className="px-3 pb-2">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex relative">
        <TikTokSidebar
          isLoggedIn={true}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={toggleMobileSidebar}
          activeView="creator"
          showMobileOverlay={true}
          variant="default"
          showSearch={true}
          searchPlaceholder="Search"
          showLogo={true}
          showFollowingSection={false}
          showFooter={true}
          customNavItems={[
            { icon: Home, label: "For You", action: "foryou", isActive: false },
            { icon: Compass, label: "Explore", action: "explore", isActive: true },
            { icon: Users, label: "Following", action: "following", isActive: false },
            { icon: Plus, label: "Upload", action: "upload", isActive: false },
            { icon: Radio, label: "LIVE", action: "live", isActive: false },
            { icon: Wallet, label: "Wallet", action: "wallet", isActive: false, onClick: handleWalletClick },
            { icon: CreditCard, label: "Subscription", action: "subscription", isActive: false },
            { icon: User, label: "Profile", action: "profile", isActive: false },
            { icon: MoreHorizontal, label: "More", action: "more", isActive: false },
          ]}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-2 space-y-3">
          {/* Creator Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/diverse-group-smiling.png" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-lg font-bold text-gray-900">Creator Dashboard</h1>
                <p className="text-gray-600 text-xs">Track your earnings, subscribers, and performance</p>
                <p className="text-gray-700 text-xs">Professional content creator with focus on lifestyle and entertainment</p>
              </div>

              <div className="flex flex-col gap-1.5 w-full max-w-xs">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Boost Content
                </Button>
                <Button variant="outline" className="px-3 py-1.5 text-xs">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
                <Button variant="outline" className="px-3 py-1.5 text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>

              <div className="flex justify-center gap-3 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm">{formatNumber(creatorStats.subscribers.total)}</div>
                  <div className="text-gray-600 text-xs">subscribers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm">{formatNumber(creatorStats.analytics.views.total)}</div>
                  <div className="text-gray-600 text-xs">total views</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm">{formatCurrency(creatorStats.earnings.total.dollars)}</div>
                  <div className="text-gray-600 text-xs">earned</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-2 px-3">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className={`py-2 px-1 border-b-2 font-medium text-xs ${
                      activeTab === tab
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-3">
              {activeTab === "overview" && (
                <div className="space-y-3">
                  {/* Account Balance Card */}
                  <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white border-0 rounded-lg p-3 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white/80 text-xs">Current Balance</p>
                            <div className="flex items-center space-x-2">
                              {isLoadingBalance ? (
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-xs">Loading...</span>
                                </div>
                              ) : (
                                <p className="text-lg font-bold">{formatCurrency(creatorBalance)}</p>
                              )}
                            </div>
                          </div>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="flex space-x-1.5">
                      <Button 
                        className="flex-1 bg-white text-blue-600 hover:bg-white/90 text-xs py-1.5"
                        onClick={handleWithdrawClick}
                      >
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        Withdraw
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent text-xs py-1.5"
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <Card>
                      <CardContent className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-600">{formatNumber(creatorStats.subscribers.total)}</div>
                          <div className="text-xs text-gray-600">Subscribers</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600">{formatNumber(creatorStats.analytics.views.monthly)}</div>
                          <div className="text-xs text-gray-600">Monthly Views</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold text-purple-600">{creatorStats.analytics.engagement.rate}%</div>
                          <div className="text-xs text-gray-600">Engagement</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-2">
                        <div className="text-center">
                          <div className="text-sm font-bold text-orange-600">{formatCurrency(creatorStats.earnings.monthly.dollars)}</div>
                          <div className="text-xs text-gray-600">Monthly Earnings</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "videos" && (
                <div className="text-center py-6">
                  <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Video Analytics</h3>
                  <p className="text-gray-500 text-xs">Track your video performance and engagement metrics</p>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="text-center py-6">
                  <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Analytics Dashboard</h3>
                  <p className="text-gray-500 text-xs">Detailed insights into your content performance</p>
                </div>
              )}

              {activeTab === "earnings" && (
                <div className="text-center py-6">
                  <DollarSign className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Earnings Overview</h3>
                  <p className="text-gray-500 text-xs">Track your revenue and payment history</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Creator Withdrawal Modals */}
      {showWithdrawalSelection && (
        <CreatorWithdrawalSelectionModal
          onClose={() => setShowWithdrawalSelection(false)}
          onSuccess={handleWithdrawalSuccess}
          initialAmount={50}
          currentBalance={creatorBalance}
        />
      )}
      {showWithdrawalSuccess && withdrawalResult && (
        <CreatorWithdrawalSuccessModal
          onClose={() => setShowWithdrawalSuccess(false)}
          result={withdrawalResult}
        />
      )}
    </div>
  )
}

export default TikTokCreatorDashboard
