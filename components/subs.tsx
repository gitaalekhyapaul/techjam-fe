"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Search, 
  Home, 
  Compass, 
  Users, 
  Plus, 
  Radio, 
  User, 
  Wallet, 
  CreditCard,
  MoreHorizontal,
  X,
  Menu,
  Bell,
  Heart,
  MessageCircle,
  Gift,
  Crown,
  Star,
  TrendingUp,
  Users2,
  Zap,
  Calendar,
  Clock,
  Eye,
  Play,
  Share2,
  Bookmark,
  Filter,
  SortAsc
} from "lucide-react"
import { TikTokSidebar } from "./tiktok-sidebar"



const subscribedCreators = [
  {
    id: 1,
    name: "@charlidamelio",
    avatar: "/placeholder-user.jpg",
    supportLevel: "Top Supporter",
    videos: [
      { id: 1, thumbnail: "/dance-content.png", title: "New Dance" },
      { id: 2, thumbnail: "/dance-content.png", title: "Behind Scenes" },
      { id: 3, thumbnail: "/dance-content.png", title: "Exclusive" },
    ],
    hasGifts: true,
    unreadMessages: 2,
  },
  {
    id: 2,
    name: "@addisonre",
    avatar: "/placeholder-user.jpg",
    supportLevel: "Supporter",
    videos: [
      { id: 4, thumbnail: "/beauty-content.png", title: "Makeup Tutorial" },
      { id: 5, thumbnail: "/beauty-content.png", title: "Get Ready" },
      { id: 6, thumbnail: "/beauty-content.png", title: "Q&A" },
    ],
    hasGifts: false,
    unreadMessages: 0,
  },
  {
    id: 3,
    name: "@zachking",
    avatar: "/placeholder-user.jpg",
    supportLevel: "VIP",
    videos: [
      { id: 7, thumbnail: "/comedy-content.png", title: "Magic Trick" },
      { id: 8, thumbnail: "/comedy-content.png", title: "How I Did It" },
      { id: 9, thumbnail: "/comedy-content.png", title: "Bloopers" },
    ],
    hasGifts: true,
    unreadMessages: 5,
  },
]

const newUpdates = [
  {
    id: 1,
    creator: "@charlidamelio",
    avatar: "/placeholder-user.jpg",
    content: "Just dropped exclusive behind-the-scenes content!",
    time: "2h ago",
    type: "exclusive",
  },
  {
    id: 2,
    creator: "@zachking",
    avatar: "/placeholder-user.jpg",
    content: "New magic tutorial available for VIP subscribers",
    time: "4h ago",
    type: "tutorial",
  },
  {
    id: 3,
    creator: "@addisonre",
    avatar: "/placeholder-user.jpg",
    content: "Live Q&A session starting in 30 minutes!",
    time: "6h ago",
    type: "live",
  },
]

const benefits = [
  { icon: TrendingUp, text: "Bonus content" },
  { icon: Gift, text: "Gifts for top supporters" },
  { icon: Calendar, text: "Entry for private TikTok events" },
  { icon: Users2, text: "Access to Discord or private chats" },
]

const recentTransactions = [
  { id: 1, type: "received", amount: 25.0, description: "Gift from @charlidamelio", time: "2 hours ago" },
  { id: 2, type: "sent", amount: 10.0, description: "Tip to creator", time: "1 day ago" },
  { id: 3, type: "received", amount: 50.0, description: "Added funds", time: "3 days ago" },
]

export function TikTokSubscriptionPage({ 
  onBack, 
  onNavigateToMain, 
  onNavigateToWallet 
}: { 
  onBack?: () => void
  onNavigateToMain?: () => void
  onNavigateToWallet?: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigate = (view: string) => {
    if (view === "main" && onNavigateToMain) {
      onNavigateToMain()
    } else if (view === "wallet" && onNavigateToWallet) {
      onNavigateToWallet()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
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
            <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-700">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-700">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-6 py-2 rounded text-sm">
              Log in
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        <TikTokSidebar
          isLoggedIn={false}
          isMobileSidebarOpen={isMobileMenuOpen}
          onToggleMobileSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeView="subscription"
          onNavigate={handleNavigate}
          onBack={onBack}
          showMobileOverlay={true}
          variant="default"
          showSearch={true}
          searchPlaceholder="Search creators and content"
          showLogo={true}
          showFollowingSection={false}
          showFooter={false}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Creator Subscriptions</h1>
                <p className="text-gray-600">Support your favorite creators and get exclusive content</p>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Subscribe to Creator
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600">Active Subscriptions</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">$89.99</div>
                <div className="text-sm text-gray-600">Monthly Spending</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-600">Exclusive Videos</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">24</div>
                <div className="text-sm text-gray-600">Live Streams</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search creators..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          </div>

          {/* Subscribed Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Creator Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="/dance-content.png" 
                  alt="Creator" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="destructive" className="bg-red-500 text-white">
                    $9.99/month
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/diverse-group-smiling.png" />
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">@charlidamelio</CardTitle>
                    <CardDescription>Dance & Lifestyle Creator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">148.2M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Exclusive Videos</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Live</span>
                  <span className="font-semibold text-red-500">Tomorrow 8PM</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Gift
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="/beauty-content.png" 
                  alt="Creator" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    <Star className="w-3 h-3 mr-1" />
                    Standard
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-gray-500 text-white">
                    $4.99/month
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/portrait-young-woman.png" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">@addisonre</CardTitle>
                    <CardDescription>Beauty & Fashion Creator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">89.7M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Exclusive Videos</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Live</span>
                  <span className="font-semibold text-gray-500">Friday 7PM</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Gift
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src="/comedy-content.png" 
                  alt="Creator" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="destructive" className="bg-red-500 text-white">
                    $19.99/month
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/diverse-group-meeting.png" />
                    <AvatarFallback>ZK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">@zachking</CardTitle>
                    <CardDescription>Magic & Comedy Creator</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">67.3M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Exclusive Videos</span>
                  <span className="font-semibold">31</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Live</span>
                  <span className="font-semibold text-red-500">Tonight 9PM</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Gift
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Gift sent to @charlidamelio</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Badge variant="outline">$5.00</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Watched exclusive video from @addisonre</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Subscription renewed for @zachking</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <Badge variant="outline">$19.99</Badge>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TikTokSubscriptionPage
