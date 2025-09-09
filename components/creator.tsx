"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
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
  EyeOff,
  Share2,
  MessageCircle,
  Bookmark,
  Settings,
  Play,
  Gift,
  Download,
  Clock
} from "lucide-react"

import { TikTokSidebar } from "./tiktok-sidebar"
import { CreatorWithdrawalSelectionModal } from "@/components/shared/creator-withdrawal-selection-modal"
import { CreatorWithdrawalSuccessModal } from "@/components/shared/creator-withdrawal-success-modal"
import { CreatorWalletPage } from "@/wallet/creator/creator-wallet-page"
import { sharingApiService, ShareData, ShareStats } from "@/lib/services/sharingApi"
import { TokenUtils, WalletBalance, TOKEN_DISPLAY } from "@/constants/tokens"

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
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareStats, setShareStats] = useState<ShareStats | null>(null)
  const [shareHistory, setShareHistory] = useState<ShareData[]>([])
  const [isLoadingShares, setIsLoadingShares] = useState(false)
  
  // Real data state
  const [creatorData, setCreatorData] = useState(creatorStats)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch creator data from API
  const fetchCreatorData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch creator wallet balance with token support
      const username = localStorage.getItem("username")
      if (username) {
        // For demo purposes, use a hardcoded creator ID
        // In a real app, you'd get this from the user data
        const creatorId = "68bdb7bc0866e35fb0369f1f" // This matches the user ID in our database
        const response = await fetch(`/api/wallet/creator/balance?creatorId=${creatorId}`)
        const walletData = await response.json()
        
        if (walletData.balance) {
          setWalletBalance(walletData.balance)
          setCreatorBalance(walletData.balance.total)
          setCreatorData(prev => ({
            ...prev,
            accountBalance: {
              current: walletData.balance.total,
              withdrawn: walletData.balance.total - walletData.balance.tk,
              unpaid: 0
            },
            earnings: {
              monthly: {
                dollars: walletData.balance.tk,
                hypes: walletData.balance.tki
              },
              total: {
                dollars: walletData.balance.total,
                hypes: walletData.balance.tki
              }
            }
          }))
        } else {
          // Fallback to mock data if API fails
          const mockBalance = TokenUtils.createBalance(2847.50, 0)
          setWalletBalance(mockBalance)
          setCreatorBalance(mockBalance.total)
        }
      }
      
      // Skip earnings API call for now to avoid errors
      // In a real app, you'd fetch creator earnings here
      
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

  const handleShareClick = () => {
    setShowShareModal(true)
    loadShareData()
  }

  const loadShareData = async () => {
    try {
      setIsLoadingShares(true)
      const [stats, history] = await Promise.all([
        sharingApiService.getShareStats(),
        sharingApiService.getShareHistory()
      ])
      setShareStats(stats)
      setShareHistory(history)
    } catch (error) {
      console.error('Error loading share data:', error)
    } finally {
      setIsLoadingShares(false)
    }
  }

  // Update balance when withdrawal is successful
  const handleWithdrawalSuccess = async (result: any) => {
    console.log("Withdrawal successful:", result)
    setWithdrawalResult(result)
    setShowWithdrawalSuccess(true)
    setShowWithdrawalSelection(false)
    
    // Make the actual withdrawal API call
    const creatorId = "68bdb7bc0866e35fb0369f1f"
    try {
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
        setCreatorBalance(updatedBalance.balance.total)
        console.log("Creator dashboard balance updated after withdrawal:", updatedBalance.balance)
      } else if (updatedBalance.error === 'Insufficient total balance') {
        alert("Insufficient total balance for withdrawal")
        return
      }
    } catch (error) {
      console.error("Failed to process withdrawal:", error)
      alert("Withdrawal failed. Please try again.")
      return
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
      {/* Header - iPhone Optimized */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
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
              className="text-gray-700 hover:text-gray-900 text-xs px-2 py-1 h-8"
              onClick={onLogout}
            >
              <LogOut className="w-3 h-3 mr-1" />
              Logout
            </Button>
          </div>
        </div>

        <div className="px-4 pb-2">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 h-8 ${
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

      {/* Main Content - iPhone Optimized */}
      <main className="max-w-sm mx-auto px-4 py-4 space-y-4">
          {/* Creator Profile Header - iPhone Size */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/diverse-group-smiling.png" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-lg font-bold text-gray-900">Creator Dashboard</h1>
                <p className="text-gray-600 text-xs">Track your earnings, subscribers, and performance</p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm h-10">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Boost Content
                </Button>
                <Button 
                  variant="outline" 
                  className="px-3 py-2 text-sm h-10"
                  onClick={() => setActiveTab("analytics")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  className="px-3 py-2 text-sm h-10"
                  onClick={handleShareClick}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-base">{formatNumber(creatorStats.subscribers.total)}</div>
                  <div className="text-gray-600 text-xs">subscribers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-base">{formatNumber(creatorStats.analytics.views.total)}</div>
                  <div className="text-gray-600 text-xs">total views</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-base">{formatCurrency(creatorStats.earnings.total.dollars)}</div>
                  <div className="text-gray-600 text-xs">earned</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs - iPhone Optimized */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-2 px-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className={`py-2 px-3 border-b-2 font-medium text-xs flex-1 ${
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

            {/* Tab Content - iPhone Size */}
            <div className="p-4">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  {/* Account Balance Card - iPhone Size */}
                  <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white border-0 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-white/80 text-xs font-medium">Wallet Balance</p>
                        <div className="space-y-2">
                          {isLoadingBalance ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm">Loading...</span>
                            </div>
                          ) : showBalance ? (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <p className="text-lg font-bold">{walletBalance?.total?.toFixed(2) || creatorBalance?.toFixed(2) || '0.00'}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowBalance(!showBalance)}
                                  className="p-1 text-white hover:bg-white/20 h-6 w-6"
                                  disabled={isLoadingBalance}
                                >
                                  {showBalance ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                </Button>
                              </div>
                              <div className="flex items-center space-x-4 text-xs">
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
                            <p className="text-lg font-bold">••••••</p>
                          )}
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-white text-blue-600 hover:bg-white/90 text-sm py-2 h-10"
                        onClick={handleWithdrawClick}
                      >
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Withdraw
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent text-sm py-2 h-10"
                        onClick={() => setActiveTab("analytics")}
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid - iPhone Size */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="rounded-2xl">
                      <CardContent className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{formatNumber(creatorStats.subscribers.total)}</div>
                          <div className="text-xs text-gray-600">Subscribers</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardContent className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{formatNumber(creatorStats.analytics.views.monthly)}</div>
                          <div className="text-xs text-gray-600">Monthly Views</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardContent className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{creatorStats.analytics.engagement.rate}%</div>
                          <div className="text-xs text-gray-600">Engagement</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardContent className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{formatCurrency(creatorStats.earnings.monthly.dollars)}</div>
                          <div className="text-xs text-gray-600">Monthly Earnings</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Content to Extend Page */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">New subscriber</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                          <div className="text-sm font-semibold text-green-600">+1</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Video earned tokens</p>
                            <p className="text-xs text-gray-500">4 hours ago</p>
                          </div>
                          <div className="text-sm font-semibold text-blue-600">+5</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Withdrawal processed</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                          <div className="text-sm font-semibold text-orange-600">-$50.00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Overview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Content Performance</p>
                            <p className="text-xs text-gray-500">Last 30 days</p>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">8.7%</div>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '87%'}}></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Growth Rate</p>
                            <p className="text-xs text-gray-500">This month</p>
                          </div>
                          <div className="text-2xl font-bold text-green-600">+12%</div>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Plus className="w-5 h-5 mb-1" />
                        <span className="text-xs">Upload Video</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <BarChart3 className="w-5 h-5 mb-1" />
                        <span className="text-xs">View Analytics</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Users className="w-5 h-5 mb-1" />
                        <span className="text-xs">Manage Fans</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                        <Settings className="w-5 h-5 mb-1" />
                        <span className="text-xs">Settings</span>
                      </Button>
                    </div>
                  </div>

                  {/* Content Calendar */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Content Calendar</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        <div className="text-center text-sm font-medium text-gray-500">Mon</div>
                        <div className="text-center text-sm font-medium text-gray-500">Tue</div>
                        <div className="text-center text-sm font-medium text-gray-500">Wed</div>
                        <div className="text-center text-sm font-medium text-gray-500">Thu</div>
                        <div className="text-center text-sm font-medium text-gray-500">Fri</div>
                        <div className="text-center text-sm font-medium text-gray-500">Sat</div>
                        <div className="text-center text-sm font-medium text-gray-500">Sun</div>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 28 }, (_, i) => (
                          <div key={i} className={`h-8 rounded flex items-center justify-center text-sm ${
                            i === 15 ? 'bg-blue-500 text-white' : 
                            i % 7 === 0 || i % 7 === 6 ? 'bg-gray-200' : 
                            'bg-white border border-gray-200'
                          }`}>
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Earnings Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Video Tokens</p>
                            <p className="text-xs text-gray-500">From user interactions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">$1,250.00</p>
                          <p className="text-xs text-gray-500">+15% this month</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Subscriptions</p>
                            <p className="text-xs text-gray-500">Monthly recurring</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">$450.00</p>
                          <p className="text-xs text-gray-500">+8% this month</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Gift className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Gifts & Tips</p>
                            <p className="text-xs text-gray-500">Direct fan support</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">$320.00</p>
                          <p className="text-xs text-gray-500">+22% this month</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Performing Content */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Dance Challenge Tutorial</p>
                          <p className="text-xs text-gray-500">2.3M views • $125 earned</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">+45%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Cooking Tips & Tricks</p>
                          <p className="text-xs text-gray-500">1.8M views • $98 earned</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">+32%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Lifestyle Vlog</p>
                          <p className="text-xs text-gray-500">1.2M views • $67 earned</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-600">+18%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Spacing */}
                  <div className="h-20"></div>
                </div>
              )}

              {activeTab === "videos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Your Videos</h3>
                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                  
                  {/* Video Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: 1, title: "Dance Challenge Tutorial", views: "2.3M", likes: "145K", tokens: 125, thumbnail: "/tiktok-video-thumbnail-1.png" },
                      { id: 2, title: "Cooking Tips & Tricks", views: "1.8M", likes: "98K", tokens: 98, thumbnail: "/tiktok-video-thumbnail-2.png" },
                      { id: 3, title: "Lifestyle Vlog", views: "1.2M", likes: "67K", tokens: 67, thumbnail: "/tiktok-video-thumbnail-3.png" },
                      { id: 4, title: "Fitness Routine", views: "950K", likes: "54K", tokens: 54, thumbnail: "/tiktok-video-thumbnail-4.png" },
                      { id: 5, title: "Tech Review", views: "800K", likes: "43K", tokens: 43, thumbnail: "/tiktok-video-thumbnail-5.png" },
                      { id: 6, title: "Travel Vlog", views: "650K", likes: "38K", tokens: 38, thumbnail: "/tiktok-video-thumbnail-6.png" }
                    ].map((video) => (
                      <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {video.views}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {video.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {video.views}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 font-medium">
                              <DollarSign className="w-4 h-4" />
                              ${video.tokens}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">7D</Button>
                      <Button variant="outline" size="sm">30D</Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white" size="sm">90D</Button>
                    </div>
                  </div>
                  

                  {/* Analytics Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Total Views</p>
                            <p className="text-2xl font-bold text-gray-900">2.8M</p>
                            <p className="text-xs text-green-600">+12.5% vs last month</p>
                          </div>
                          <Eye className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Engagement Rate</p>
                            <p className="text-2xl font-bold text-gray-900">8.7%</p>
                            <p className="text-xs text-green-600">+2.1% vs last month</p>
                          </div>
                          <Heart className="w-8 h-8 text-red-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">New Followers</p>
                            <p className="text-2xl font-bold text-gray-900">1,240</p>
                            <p className="text-xs text-green-600">+8.3% vs last month</p>
                          </div>
                          <Users className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">$2,450</p>
                            <p className="text-xs text-green-600">+15.2% vs last month</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Views Over Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Chart visualization would go here</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Top Performing Content</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { title: "Dance Challenge Tutorial", views: "2.3M", engagement: "12.5%" },
                            { title: "Cooking Tips & Tricks", views: "1.8M", engagement: "9.8%" },
                            { title: "Lifestyle Vlog", views: "1.2M", engagement: "8.2%" }
                          ].map((video, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{video.title}</p>
                                <p className="text-xs text-gray-500">{video.views} views</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{video.engagement}</p>
                                <p className="text-xs text-gray-500">engagement</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "earnings" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                  

                  {/* Earnings Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-700">This Month</p>
                            <p className="text-2xl font-bold text-green-900">$2,450.00</p>
                            <p className="text-xs text-green-600">+15.2% vs last month</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-700">Total Earned</p>
                            <p className="text-2xl font-bold text-blue-900">$28,450.75</p>
                            <p className="text-xs text-blue-600">All time</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-700">Pending</p>
                            <p className="text-2xl font-bold text-purple-900">$450.00</p>
                            <p className="text-xs text-purple-600">Processing</p>
                          </div>
                          <Clock className="w-8 h-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Earnings Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Earnings Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { source: "Video Tokens", amount: 1250.00, percentage: 51, color: "bg-green-500" },
                          { source: "Subscriptions", amount: 450.00, percentage: 18, color: "bg-blue-500" },
                          { source: "Gifts & Tips", amount: 320.00, percentage: 13, color: "bg-purple-500" },
                          { source: "Brand Partnerships", amount: 430.00, percentage: 18, color: "bg-orange-500" }
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{item.source}</span>
                              <span className="text-sm font-bold text-gray-900">${item.amount.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Transactions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { description: "Video token earnings", amount: 125.00, date: "2 hours ago", type: "credit" },
                          { description: "Subscription payment", amount: 45.00, date: "1 day ago", type: "credit" },
                          { description: "Gift from fan", amount: 25.00, date: "2 days ago", type: "credit" },
                          { description: "Withdrawal to bank", amount: -500.00, date: "3 days ago", type: "debit" }
                        ].map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {transaction.type === 'credit' ? (
                                  <ArrowDownRight className="w-4 h-4 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-xs text-gray-500">{transaction.date}</p>
                              </div>
                            </div>
                            <p className={`text-sm font-bold ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'credit' ? '+' : ''}${transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
      </main>

      {/* Creator Withdrawal Modals */}
      {showWithdrawalSelection && (
        <CreatorWithdrawalSelectionModal
          onClose={() => setShowWithdrawalSelection(false)}
          onSuccess={handleWithdrawalSuccess}
          initialAmount={50}
          currentBalance={walletBalance?.total || creatorBalance}
        />
      )}
      {showWithdrawalSuccess && withdrawalResult && (
        <CreatorWithdrawalSuccessModal
          onClose={() => setShowWithdrawalSuccess(false)}
          result={withdrawalResult}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Share Your Content</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowShareModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {isLoadingShares ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Loading share data...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Share Stats */}
                  {shareStats && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">{shareStats.totalShares.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Shares</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">{shareStats.totalClicks.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Clicks</div>
                      </div>
                    </div>
                  )}

                  {/* Platform Breakdown */}
                  {shareStats && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Performance</h3>
                      <div className="space-y-2">
                        {shareStats.platformBreakdown.map((platform, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                <Share2 className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium text-gray-900">{platform.platform}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">{platform.shares} shares</div>
                              <div className="text-xs text-gray-500">{platform.clicks} clicks</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share History */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Shares</h3>
                    <div className="space-y-2">
                      {shareHistory.slice(0, 5).map((share) => (
                        <div key={share.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Share2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{share.title}</p>
                              <p className="text-xs text-gray-500">{share.platform} • {new Date(share.timestamp).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">{share.shares} shares</div>
                            <div className="text-xs text-gray-500">{share.clicks} clicks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Share Buttons */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Share to Platform</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['TikTok', 'Instagram', 'Twitter', 'Facebook', 'YouTube'].map((platform) => (
                        <Button
                          key={platform}
                          variant="outline"
                          className="h-12 flex items-center justify-center gap-2"
                          onClick={() => {
                            sharingApiService.shareContent(platform, {
                              title: 'My Latest Content',
                              description: 'Check out this amazing content!'
                            })
                            setShowShareModal(false)
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TikTokCreatorDashboard
