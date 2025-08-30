"use client"

import React, { useState } from "react"

// Lucide React Icons
import {
  Home,
  Compass,
  Users,
  UserPlus,
  Upload,
  Bell,
  MessageCircle,
  Radio,
  User,
  MoreHorizontal,
  Wallet,
  CreditCard,
  Search,
  MessageSquare,
  Gift,
  Crown,
  Sparkles,
  Calendar,
  Users2,
  Lock,
  Menu,
  X,
  Banknote,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"

// Simple UI Components (to avoid external dependencies)
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  onClick,
  ...props 
}: {
  children: React.ReactNode
  variant?: "default" | "ghost" | "outline" | "secondary"
  size?: "default" | "sm" | "icon"
  className?: string
  onClick?: () => void
  [key: string]: any
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  }
  
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10"
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const Badge = ({ 
  children, 
  variant = "default", 
  className = "", 
  ...props 
}: {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
  [key: string]: any
}) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground"
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

const Avatar = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
)

const AvatarImage = ({ src, alt, className = "", ...props }: { src?: string, alt?: string, className?: string, [key: string]: any }) => (
  <img className={`aspect-square h-full w-full ${className}`} src={src} alt={alt} {...props} />
)

const AvatarFallback = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
    {children}
  </div>
)

const Input = ({ className = "", ...props }: { className?: string, [key: string]: any }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

// Data
const sidebarItems = [
  { icon: Home, label: "For You", active: false },
  { icon: Compass, label: "Explore", active: false },
  { icon: Users, label: "Following", active: false },
  { icon: UserPlus, label: "Friends", active: false },
  { icon: Upload, label: "Upload", active: false },
  { icon: Bell, label: "Notifications", active: false, hasNotification: true },
  { icon: MessageCircle, label: "Messages", active: false },
  { icon: Radio, label: "LIVE", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Wallet, label: "Wallet", active: false },
  { icon: CreditCard, label: "Subscription", active: true },
  { icon: MoreHorizontal, label: "More", active: false },
]

const subscribedCreators = [
  {
    id: 1,
    name: "@charlidamelio",
    avatar: "/charli.png",
    supportLevel: "Top Supporter",
    videos: [
      { id: 1, thumbnail: "/dance1.png", title: "New Dance" },
      { id: 2, thumbnail: "/dance2.png", title: "Behind Scenes" },
      { id: 3, thumbnail: "/dance3.png", title: "Exclusive" },
    ],
    hasGifts: true,
    unreadMessages: 2,
  },
  {
    id: 2,
    name: "@addisonre",
    avatar: "/addison.png",
    supportLevel: "Supporter",
    videos: [
      { id: 4, thumbnail: "/makeup1.png", title: "Makeup Tutorial" },
      { id: 5, thumbnail: "/makeup2.png", title: "Get Ready" },
      { id: 6, thumbnail: "/makeup3.png", title: "Q&A" },
    ],
    hasGifts: false,
    unreadMessages: 0,
  },
  {
    id: 3,
    name: "@zachking",
    avatar: "/zach.png",
    supportLevel: "VIP",
    videos: [
      { id: 7, thumbnail: "/magic1.png", title: "Magic Trick" },
      { id: 8, thumbnail: "/magic2.png", title: "How I Did It" },
      { id: 9, thumbnail: "/magic3.png", title: "Bloopers" },
    ],
    hasGifts: true,
    unreadMessages: 5,
  },
]

const newUpdates = [
  {
    id: 1,
    creator: "@charlidamelio",
    avatar: "/charli.png",
    content: "Just dropped exclusive behind-the-scenes content!",
    time: "2h ago",
    type: "exclusive",
  },
  {
    id: 2,
    creator: "@zachking",
    avatar: "/zach.png",
    content: "New magic tutorial available for VIP subscribers",
    time: "4h ago",
    type: "tutorial",
  },
  {
    id: 3,
    creator: "@addisonre",
    avatar: "/addison.png",
    content: "Live Q&A session starting in 30 minutes!",
    time: "6h ago",
    type: "live",
  },
]

const benefits = [
  { icon: Sparkles, text: "Bonus content" },
  { icon: Gift, text: "Gifts for top supporters" },
  { icon: Calendar, text: "Entry for private TikTok events" },
  { icon: Users2, text: "Access to Discord or private chats" },
]

import { TikTokSidebar } from "../components/tiktok-sidebar"

// Main Component
export function TikTokSubscriptionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const recentTransactions = [
    { id: 1, type: "received", description: "Payment from @charlidamelio", amount: 50.00, time: "1 hour ago" },
    { id: 2, type: "sent", description: "Transfer to @addisonre", amount: 20.00, time: "2 hours ago" },
    { id: 3, type: "received", description: "Payment from @zachking", amount: 100.00, time: "3 hours ago" },
    { id: 4, type: "sent", description: "Transfer to @charlidamelio", amount: 10.00, time: "4 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="text-xl font-bold text-foreground">TikTok</div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/abstract-geometric-shapes.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border hidden lg:block">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-foreground">TikTok</div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/abstract-geometric-shapes.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex pt-16 lg:pt-16">
        <TikTokSidebar
          isLoggedIn={true}
          isMobileSidebarOpen={isMobileMenuOpen}
          onToggleMobileSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          activeView="subscription"
          showMobileOverlay={true}
          variant="default"
          showSearch={false}
          showLogo={false}
          showFollowingSection={false}
          showFooter={false}
          customNavItems={sidebarItems.map(item => ({
            icon: item.icon,
            label: item.label,
            action: item.label.toLowerCase().replace(/\s+/g, ''),
            isActive: item.active,
            hasNotification: item.hasNotification
          }))}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-80 p-4 lg:p-6 space-y-6 lg:space-y-8">
          {/* Mobile Benefits Toggle */}
          <div className="xl:hidden">
            <Button
              variant="outline"
              className="w-full justify-between border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={() => setIsBenefitsOpen(!isBenefitsOpen)}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                Subscription Benefits
              </span>
              <span>{isBenefitsOpen ? "Hide" : "Show"}</span>
            </Button>
            
            {isBenefitsOpen && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-md">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <benefit.icon className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-gray-800">{benefit.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-br from-red-400 to-red-600 text-white border-0 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm font-medium">Available Balance</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">$127.50</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Banknote className="w-6 h-6" />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1 bg-white text-red-600 hover:bg-white/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-red-900 shadow-sm border border-red-200"
                  : "text-gray-600 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-white text-red-900 shadow-sm border border-red-200"
                  : "text-gray-600 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              History
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" ? (
            <>
              {/* Creators Section */}
              <section>
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-800">Creators (subscribed to)</h2>
                <div className="space-y-4 lg:space-y-6">
                  {subscribedCreators.map((creator) => (
                    <div key={creator.id} className="bg-white border border-gray-200 rounded-lg shadow-md">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={creator.avatar} />
                              <AvatarFallback>{creator.name[1]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{creator.name}</h3>
                              <Badge
                                variant={creator.supportLevel === "VIP" ? "default" : "secondary"}
                                className={creator.supportLevel === "VIP" ? "bg-red-500" : ""}
                              >
                                {creator.supportLevel === "VIP" && <Crown className="w-3 h-3 mr-1" />}
                                {creator.supportLevel}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {creator.hasGifts && (
                              <Button size="sm" variant="outline" className="gap-2 bg-transparent border-red-300 hover:bg-red-50 hover:border-red-400">
                                <Gift className="w-4 h-4 text-red-500" />
                                <span className="hidden sm:inline">Claim Gift</span>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="gap-2 relative bg-transparent border-red-300 hover:bg-red-50 hover:border-red-400">
                              <MessageSquare className="w-4 h-4 text-red-500" />
                              <span className="hidden sm:inline">Chat</span>
                              {creator.unreadMessages > 0 && (
                                <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-red-500">
                                  {creator.unreadMessages}
                                </Badge>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {creator.videos.map((video) => (
                            <div key={video.id} className="flex-shrink-0 group cursor-pointer">
                              <div className="relative">
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-20 h-32 lg:w-24 lg:h-36 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <Lock className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 w-20 lg:w-24 truncate">{video.title}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  ))}
                </div>
              </section>

              {/* New Section */}
              <section>
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-800">New</h2>
                <div className="space-y-4">
                  {newUpdates.map((update) => (
                    <div key={update.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={update.avatar} />
                          <AvatarFallback>{update.creator[1]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold">{update.creator}</span>
                            <span className="text-xs text-gray-500">{update.time}</span>
                          </div>
                          <p className="text-sm">{update.content}</p>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0 border-gray-300">
                          {update.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            /* History Tab */
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.type === "received" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === "received" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "received" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Desktop Benefits Panel */}
        <aside className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 p-6 hidden xl:block">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">Subscription Benefits</h3>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <benefit.icon className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-800">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6 text-center">
            <Crown className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-gray-800">Upgrade to VIP</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get exclusive access to premium content and direct creator interactions
            </p>
            <Button className="w-full bg-red-500 hover:bg-red-600">Upgrade Now</Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TikTokSubscriptionPage
