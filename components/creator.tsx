"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-4 md:gap-8">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%203-jvuVYl6iGXvwtQ2TgRywoy9xheweks.png"
                alt="TikTok Logo"
                className="h-10 md:h-14 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 hidden md:block">Creator Dashboard</span>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-3">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
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
            { icon: Wallet, label: "Wallet", action: "wallet", isActive: false },
            { icon: CreditCard, label: "Subscription", action: "subscription", isActive: false },
            { icon: User, label: "Profile", action: "profile", isActive: false },
            { icon: MoreHorizontal, label: "More", action: "more", isActive: false },
          ]}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 space-y-6">
          {/* Creator Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarImage src="/diverse-group-smiling.png" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Creator Dashboard</h1>
                    <p className="text-gray-600 text-lg">Track your earnings, subscribers, and performance</p>
                    <p className="text-gray-700 mt-2 max-w-2xl">Professional content creator with focus on lifestyle and entertainment</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Boost Content
                    </Button>
                    <Button variant="outline" className="px-6 py-2">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" className="px-6 py-2">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">{formatNumber(creatorStats.subscribers.total)}</span>
                    <span className="text-gray-600 ml-1">subscribers</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{formatNumber(creatorStats.analytics.views.total)}</span>
                    <span className="text-gray-600 ml-1">total views</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{formatCurrency(creatorStats.earnings.total.dollars)}</span>
                    <span className="text-gray-600 ml-1">earned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Account Balance Card */}
                  <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white border-0 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-white/80 text-sm">Current Balance</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-2xl font-bold">{formatCurrency(creatorStats.accountBalance.current)}</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-white text-blue-600 hover:bg-white/90">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{formatNumber(creatorStats.subscribers.total)}</div>
                          <div className="text-sm text-gray-600">Total Subscribers</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{formatNumber(creatorStats.analytics.views.monthly)}</div>
                          <div className="text-sm text-gray-600">Monthly Views</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{creatorStats.analytics.engagement.rate}%</div>
                          <div className="text-sm text-gray-600">Engagement Rate</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{formatCurrency(creatorStats.earnings.monthly.dollars)}</div>
                          <div className="text-sm text-gray-600">Monthly Earnings</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "videos" && (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Video Analytics</h3>
                  <p className="text-gray-500">Track your video performance and engagement metrics</p>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-500">Detailed insights into your content performance</p>
                </div>
              )}

              {activeTab === "earnings" && (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Earnings Overview</h3>
                  <p className="text-gray-500">Track your revenue and payment history</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TikTokCreatorDashboard
