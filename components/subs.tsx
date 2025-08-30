"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  Banknote,
  History,
} from "lucide-react"

// Data from subscription files
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
  { icon: Sparkles, text: "Bonus content" },
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
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview")

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-4 md:gap-8">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 min-h-screen p-4 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        >
          <div className="flex justify-end mb-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search" 
                className="pl-10 bg-gray-100 border-0 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

                     <nav className="space-y-2">
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <Home className="w-6 h-6" />
               For You
             </Button>
             <Button 
               variant="ghost" 
               className="w-full justify-start gap-3 text-left text-purple-500"
               onClick={onNavigateToMain}
             >
               <Compass className="w-6 h-6" />
               Explore
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <Users className="w-6 h-6" />
               Following
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <Plus className="w-6 h-6" />
               Upload
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <Radio className="w-6 h-6" />
               LIVE
             </Button>
             <Button 
               variant="ghost" 
               className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600"
               onClick={onNavigateToWallet}
             >
               <Wallet className="w-6 h-6" />
               Wallet
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left bg-purple-50 text-purple-500">
               <CreditCard className="w-6 h-6" />
               Subscription
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <User className="w-6 h-6" />
               Profile
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600">
               <MoreHorizontal className="w-6 h-6" />
               More
             </Button>
           </nav>

                     <div className="mt-8">
             <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
               Log in
             </Button>
           </div>

          <div className="mt-8 space-y-2 text-xs text-gray-500">
            <div>Company</div>
            <div>Programme</div>
            <div>Terms & Policies</div>
            <div className="mt-4">© 2025 TikTok</div>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6 lg:space-y-8 xl:pr-80">
          {/* Mobile Benefits Toggle */}
          <div className="xl:hidden">
                         <Button
               variant="outline"
               className="w-full justify-between border-purple-200 hover:border-purple-300 hover:bg-purple-50"
               onClick={() => setIsBenefitsOpen(!isBenefitsOpen)}
             >
               <span className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-purple-500" />
                 Subscription Benefits
               </span>
               <span>{isBenefitsOpen ? "Hide" : "Show"}</span>
             </Button>
            
                         {isBenefitsOpen && (
               <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-md">
                 {benefits.map((benefit, index) => (
                   <div key={index} className="flex items-center gap-3">
                     <benefit.icon className="w-5 h-5 text-purple-500" />
                     <span className="text-sm text-gray-800">{benefit.text}</span>
                   </div>
                 ))}
               </div>
             )}
          </div>

                     {/* Wallet Balance Card */}
           <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-0 rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm">Available Balance</p>
                  <div className="flex items-center space-x-2">
                    {showBalance ? (
                      <p className="text-2xl font-bold">$127.50</p>
                    ) : (
                      <p className="text-2xl font-bold">••••••</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 text-white hover:bg-white/20"
                    >
                      {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Banknote className="w-6 h-6" />
                </div>
              </div>

              <div className="flex space-x-3">
                                 <Button className="flex-1 bg-white text-purple-600 hover:bg-white/90">
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
                     ? "bg-white text-purple-900 shadow-sm border border-purple-200"
                     : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                 }`}
             >
               Overview
             </button>
             <button
               onClick={() => setActiveTab("history")}
                               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                   activeTab === "history"
                     ? "bg-white text-purple-900 shadow-sm border border-purple-200"
                     : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
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
                                 className={creator.supportLevel === "VIP" ? "bg-purple-500" : ""}
                               >
                                {creator.supportLevel === "VIP" && <Crown className="w-3 h-3 mr-1" />}
                                {creator.supportLevel}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                                                         {creator.hasGifts && (
                               <Button size="sm" variant="outline" className="gap-2 bg-transparent border-purple-300 hover:bg-purple-50 hover:border-purple-400">
                                 <Gift className="w-4 h-4 text-purple-500" />
                                 <span className="hidden sm:inline">Claim Gift</span>
                               </Button>
                             )}
                             <Button size="sm" variant="outline" className="gap-2 relative bg-transparent border-purple-300 hover:bg-purple-50 hover:border-purple-400">
                               <MessageSquare className="w-4 h-4 text-purple-500" />
                               <span className="hidden sm:inline">Chat</span>
                                                               {creator.unreadMessages > 0 && (
                                   <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-purple-500">
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
               <Sparkles className="w-5 h-5 text-purple-500" />
               <h3 className="text-lg font-semibold text-gray-800">Subscription Benefits</h3>
             </div>
             <div className="space-y-4">
               {benefits.map((benefit, index) => (
                 <div key={index} className="flex items-center gap-3">
                   <benefit.icon className="w-5 h-5 text-purple-500" />
                   <span className="text-sm text-gray-800">{benefit.text}</span>
                 </div>
               ))}
             </div>
           </div>

                     <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 text-center">
             <Crown className="w-8 h-8 text-purple-500 mx-auto mb-3" />
             <h3 className="font-semibold mb-2 text-gray-800">Upgrade to VIP</h3>
             <p className="text-sm text-gray-600 mb-4">
               Get exclusive access to premium content and direct creator interactions
             </p>
             <Button className="w-full bg-purple-500 hover:bg-purple-600">Upgrade Now</Button>
           </div>
        </aside>
      </div>


    </div>
  )
}

export default TikTokSubscriptionPage
