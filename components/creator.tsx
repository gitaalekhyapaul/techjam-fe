"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
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
  MessageCircle
} from "lucide-react"

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
      claps: 15420
    },
    total: {
      dollars: 28450.75,
      claps: 125800
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
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 md:px-6 pb-3">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {["overview", "analytics", "earnings", "subscribers", "boosts"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
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
        {/* Sidebar */}
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 min-h-screen p-4 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        >
          <div className="flex justify-end mb-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search" className="pl-10 bg-gray-100 border-0 rounded-full" />
            </div>
          </div>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <Home className="w-6 h-6" />
              For You
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-left text-blue-500">
              <Compass className="w-6 h-6" />
              Explore
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <Users className="w-6 h-6" />
              Following
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <Plus className="w-6 h-6" />
              Upload
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <Radio className="w-6 h-6" />
              LIVE
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-left hover:bg-blue-50 hover:text-blue-600"
            >
              <Wallet className="w-6 h-6" />
              Wallet
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-left hover:bg-blue-50 hover:text-blue-600"
            >
              <CreditCard className="w-6 h-6" />
              Subscription
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <User className="w-6 h-6" />
              Profile
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3 text-left" onClick={() => {}}>
              <MoreHorizontal className="w-6 h-6" />
              More
            </Button>
          </nav>

          <div className="mt-8">
            <Button 
              variant="outline" 
              className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="mt-8 space-y-2 text-xs text-gray-500">
            <div>Company</div>
            <div>Programme</div>
            <div>Terms & Policies</div>
            <div className="mt-4">© 2025 TikTok</div>
          </div>
        </aside>

        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileSidebar} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Creator Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your earnings, subscribers, and performance</p>
            </div>

            {/* Account Balance Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                             {/* Combined Balance Card - Similar to subscription page */}
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

                                 {/* Additional Balance Info */}
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-white/10 rounded-lg p-3">
                     <p className="text-white/70 text-xs">Total Withdrawn</p>
                     <p className="text-lg font-semibold text-gray-300">{formatCurrency(creatorStats.accountBalance.withdrawn)}</p>
                   </div>
                   <div className="bg-white/10 rounded-lg p-3">
                     <p className="text-white/70 text-xs">Pending Payment</p>
                     <p className="text-lg font-semibold text-green-300">{formatCurrency(creatorStats.accountBalance.unpaid)}</p>
                   </div>
                 </div>

                <div className="flex space-x-3">
                                     <Button className="flex-1 bg-white text-blue-600 hover:bg-white/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </div>
            </div>

            {/* Earnings & Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Earnings */}
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    This Month
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-700">Dollars Earned</span>
                    </div>
                    <span className="text-xl font-bold text-blue-900">
                      {formatCurrency(creatorStats.earnings.monthly.dollars)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-700">Claps Earned</span>
                    </div>
                    <span className="text-xl font-bold text-purple-900">
                      {formatNumber(creatorStats.earnings.monthly.claps)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Subscriber Stats */}
              <Card className="p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Subscriber Stats</h3>
                                     <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                     +{creatorStats.subscribers.growthRate}%
                   </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Subscribers</span>
                    <span className="text-xl font-bold text-gray-900">{formatNumber(creatorStats.subscribers.total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Subscribers</span>
                    <span className="text-lg font-semibold text-gray-900">{formatNumber(creatorStats.subscribers.active)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New This Month</span>
                    <span className="text-lg font-semibold text-green-600">+{formatNumber(creatorStats.subscribers.newThisMonth)}</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <p className="text-sm text-gray-500">95% retention rate</p>
                </div>
              </Card>
            </div>

            {/* Analytics & Marketing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Marketing Analytics */}
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-700">Total Views</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{formatNumber(creatorStats.analytics.views.total)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-700">Engagement Rate</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{creatorStats.analytics.engagement.rate}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-700">Organic Reach</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{creatorStats.analytics.reach.organic}%</span>
                  </div>
                </div>
              </Card>

              {/* Active Boosts */}
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Boosts</h3>
                <div className="space-y-3">
                  {creatorStats.boosts.map((boost) => (
                    <div key={boost.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          boost.status === 'active' ? 'bg-green-500' : 
                          boost.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{boost.name}</p>
                          <p className="text-sm text-gray-500">{boost.duration} • {formatCurrency(boost.cost)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{boost.performance}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Create New Boost
                </Button>
              </Card>
            </div>

                         {/* Top Performing Videos */}
             <Card className="p-6 bg-white mb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Videos</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                   {[
                    {
                      id: 1,
                      title: "Morning Routine Tips",
                      thumbnail: "/tiktok-video-thumbnail-5.png",
                      views: 1250000,
                      gifts: 450,
                      claps: 8900
                    },
                    {
                      id: 2,
                      title: "Quick Recipe Hack",
                      thumbnail: "/tiktok-video-thumbnail-6.png",
                      views: 890000,
                      gifts: 320,
                      claps: 6700
                    },
                    {
                      id: 3,
                      title: "Fitness Challenge",
                      thumbnail: "/tiktok-video-thumbnail-7.png",
                      views: 670000,
                      gifts: 280,
                      claps: 5400
                    },
                    {
                      id: 4,
                      title: "Travel Vlog",
                      thumbnail: "/tiktok-video-thumbnail-8.png",
                      views: 450000,
                      gifts: 190,
                      claps: 3800
                    }
                  ].map((video) => (
                   <div key={video.id} className="bg-gray-50 rounded-lg overflow-hidden">
                     <div className="relative">
                       <img
                         src={video.thumbnail}
                         alt={video.title}
                         className="w-full h-32 object-cover"
                       />
                       <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                         <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                           <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                           </svg>
                         </div>
                       </div>
                     </div>
                     <div className="p-3">
                       <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{video.title}</h4>
                       <div className="space-y-1">
                         <div className="flex items-center justify-between text-xs">
                           <span className="text-gray-500">Views</span>
                           <span className="font-medium text-gray-900">{formatNumber(video.views)}</span>
                         </div>
                         <div className="flex items-center justify-between text-xs">
                           <span className="text-gray-500">Gifts</span>
                           <span className="font-medium text-purple-600">{formatNumber(video.gifts)}</span>
                         </div>
                         <div className="flex items-center justify-between text-xs">
                           <span className="text-gray-500">Claps</span>
                           <span className="font-medium text-red-600">{formatNumber(video.claps)}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </Card>

             {/* Recent Transactions */}
             <Card className="p-6 bg-white">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' ? 'bg-green-100' : 
                        transaction.type === 'withdrawal' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <DollarSign className="w-4 h-4 text-green-600" />
                        ) : transaction.type === 'withdrawal' ? (
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Zap className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TikTokCreatorDashboard
