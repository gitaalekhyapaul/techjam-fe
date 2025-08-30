"use client"

import type React from "react"

import { useState } from "react"
import { TikTokSubscriptionPage } from "@/components/subs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

interface Transaction {
  id: string
  type: "gift" | "subscription" | "boost" | "purchase" | "received"
  amount: number
  description: string
  date: string
  icon: React.ReactNode
}

interface GiftTransaction {
  id: string
  recipient: string
  amount: number
  date: string
  type: "sent" | "received"
}

interface Creator {
  id: string
  username: string
  displayName: string
  followers: string
  avatar: string
  verified: boolean
}

export function TikTokWalletPage({ onBack }: { onBack: () => void }) {
  const [balance] = useState(1247.5)
  const [subscriptionLevel] = useState("Premium")
  const [clapsReceived] = useState(15420)
  const [coinsUsed] = useState(8750)
  const [currentBoost] = useState(2.5)
  const [nextBoostAt] = useState(1500)

  const [showAddFundsPopup, setShowAddFundsPopup] = useState(false)
  const [showCreatorSearch, setShowCreatorSearch] = useState(false)
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false)
  const [showEditConfirmation, setShowEditConfirmation] = useState(false)
  const [showAddPaymentMethodPopup, setShowAddPaymentMethodPopup] = useState(false)
  const [editingMethod, setEditingMethod] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState<"wallet" | "subscription">("wallet")

  const creators: Creator[] = [
    {
      id: "1",
      username: "@sarah_dance",
      displayName: "Sarah Martinez",
      followers: "2.3M",
      avatar: "/diverse-group-smiling.png",
      verified: true,
    },
    {
      id: "2",
      username: "@mike_creator",
      displayName: "Mike Johnson",
      followers: "1.8M",
      avatar: "/person-named-mike.png",
      verified: true,
    },
    {
      id: "3",
      username: "@dance_queen",
      displayName: "Emma Wilson",
      followers: "950K",
      avatar: "/portrait-young-woman.png",
      verified: false,
    },
    {
      id: "4",
      username: "@comedy_king",
      displayName: "Alex Chen",
      followers: "3.1M",
      avatar: "/diverse-group-meeting.png",
      verified: true,
    },
  ]

  const filteredCreators = creators.filter(
    (creator) =>
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "gift",
      amount: -25.0,
      description: "Sent virtual gift to @sarah_dance",
      date: "2 hours ago",
      icon: <Gift className="w-4 h-4" />,
    },
    {
      id: "2",
      type: "subscription",
      amount: -9.99,
      description: "Premium subscription renewal",
      date: "1 day ago",
      icon: <Crown className="w-4 h-4" />,
    },
    {
      id: "3",
      type: "boost",
      amount: -50.0,
      description: "Video boost package",
      date: "3 days ago",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "4",
      type: "received",
      amount: +15.0,
      description: "Gift from @mike_creator",
      date: "5 days ago",
      icon: <Heart className="w-4 h-4 text-red-500" />,
    },
  ]

  const giftHistory: GiftTransaction[] = [
    { id: "1", recipient: "@sarah_dance", amount: 25.0, date: "2 hours ago", type: "sent" },
    { id: "2", recipient: "@mike_creator", amount: 15.0, date: "5 days ago", type: "received" },
    { id: "3", recipient: "@dance_queen", amount: 10.0, date: "1 week ago", type: "sent" },
  ]

  const paymentMethods = [
    { id: "1", type: "Credit Card", name: "•••• 4242", icon: <CreditCard className="w-5 h-5" /> },
    { id: "2", type: "Google Pay", name: "john@gmail.com", icon: <Smartphone className="w-5 h-5" /> },
    { id: "3", type: "PayPal", name: "john@paypal.com", icon: <Building2 className="w-5 h-5" /> },
  ]

  const boostProgress = (balance / nextBoostAt) * 100

  const handleSubscriptionClick = () => {
    setCurrentView("subscription")
  }

  const handleBackToWallet = () => {
    setCurrentView("wallet")
  }

  const EditConfirmationDialog = ({ methodName, onConfirm, onCancel }: { methodName: string; onConfirm: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
      <div className="w-full max-w-sm">
        <Card className="w-full bg-white border-0 shadow-2xl rounded-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-bold text-gray-900">Edit Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-6">
            <p className="text-center text-gray-600">
              Are you sure you want to edit <span className="font-semibold">{methodName}</span>?
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="flex-1 border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={onConfirm}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const PaymentMethodsPopup = ({ title, onClose }: { title: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 overflow-y-auto">
      <div className="w-full max-w-md my-8">
        <Card className="w-full bg-white border-0 shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-600" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-6 pb-8">
            <Button className="w-full justify-start h-14 text-left bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-800 rounded-xl transition-all duration-200 shadow-sm" variant="outline">
              <CreditCard className="w-6 h-6 mr-4 flex-shrink-0 text-gray-600" />
              <span className="text-base font-medium">Credit or Debit Card</span>
            </Button>
            <Button className="w-full justify-start h-14 text-left bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-800 rounded-xl transition-all duration-200 shadow-sm" variant="outline">
              <Building2 className="w-6 h-6 mr-4 flex-shrink-0 text-gray-600" />
              <span className="text-base font-medium">PayPal</span>
            </Button>
            <Button className="w-full justify-start h-14 text-left bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-800 rounded-xl transition-all duration-200 shadow-sm" variant="outline">
              <Smartphone className="w-6 h-6 mr-4 flex-shrink-0 text-gray-600" />
              <span className="text-base font-medium">Google Pay</span>
            </Button>
            <Button className="w-full justify-start h-14 text-left bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-800 rounded-xl transition-all duration-200 shadow-sm" variant="outline">
              <Smartphone className="w-6 h-6 mr-4 flex-shrink-0 text-gray-600" />
              <span className="text-base font-medium">Apple Pay</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  if (currentView === "subscription") {
    return (
      <TikTokSubscriptionPage 
        onBack={handleBackToWallet}
        onNavigateToMain={onBack}
        onNavigateToWallet={handleBackToWallet}
      />
    )
  }

  const CreatorSearchInterface = () => (
    <div className="fixed inset-0 bg-gray-100 z-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={() => setShowCreatorSearch(false)} className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-800">Send TikTok to Creators</h1>
        </div>
      </header>

      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-pink-300 rounded-xl shadow-sm"
          />
        </div>

        <div className="space-y-4">
          {filteredCreators.map((creator) => (
            <Card key={creator.id} className="p-6 hover:shadow-md cursor-pointer transition-all duration-200 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.displayName}
                    className="w-14 h-14 rounded-full border-2 border-gray-100"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-lg text-gray-900">{creator.displayName}</p>
                      {creator.verified && <Check className="w-5 h-5 text-blue-500" />}
                    </div>
                    <p className="text-base text-gray-600 mb-1">{creator.username}</p>
                    <p className="text-sm text-gray-500">{creator.followers} followers</p>
                  </div>
                </div>
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-sm">
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">TikTok Wallet</h1>
              <p className="text-sm text-gray-600">Manage your digital currency</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Balance Section */}
        <Card className="bg-gradient-to-br from-pink-400 to-pink-600 text-white border-0 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
          <CardContent className="p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Balance</p>
                <p className="text-4xl sm:text-5xl font-bold">${balance.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 bg-pink-300/30 rounded-full px-3 py-1.5">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Premium</span>
              </div>
            </div>
            
            {/* Add Funds Button - Large white button */}
            <div className="mb-6">
              <Button
                className="bg-white text-gray-900 hover:bg-white/90 w-full h-14 text-lg font-semibold rounded-xl shadow-md"
                onClick={() => setShowAddFundsPopup(true)}
              >
                <Plus className="w-5 h-5 mr-3 text-red-500" />
                Add Funds
              </Button>
            </div>
            
            {/* Action Buttons - Two pink buttons below */}
            <div className="space-y-3">
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white w-full h-12 rounded-xl shadow-md"
                onClick={() => setShowCreatorSearch(true)}
              >
                <Send className="w-4 h-4 mr-3" />
                Send TikTok to creators
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white w-full h-12 rounded-xl shadow-md"
                onClick={() => setShowWithdrawPopup(true)}
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
            {/* Payment Methods */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <div>
                        <p className="font-medium">{method.type}</p>
                        <p className="text-sm text-gray-600">{method.name}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingMethod(method.type)
                        setShowEditConfirmation(true)
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-3 bg-white border-gray-200 hover:bg-gray-50"
                  onClick={() => setShowAddPaymentMethodPopup(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors bg-white border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.icon}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gifting History */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Gifting History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {giftHistory.map((gift) => (
                    <div
                      key={gift.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors bg-white border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            gift.type === "received" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Gift className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {gift.type === "sent" ? `Sent to ${gift.recipient}` : `Received from ${gift.recipient}`}
                          </p>
                          <p className="text-sm text-gray-600">{gift.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${gift.type === "received" ? "text-green-600" : "text-blue-600"}`}>
                        {gift.type === "received" ? "+" : "-"}${gift.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Subscription Level */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{subscriptionLevel}</h3>
                    <p className="text-sm text-gray-600">Active until Dec 30, 2025</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Priority video processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span>Advanced analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-pink-500" />
                      <span>Exclusive stickers & effects</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleSubscriptionClick}>Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>

            {/* Boosts */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Spending Boosts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{currentBoost}x</p>
                  <p className="text-sm text-gray-600">Current multiplier</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next boost</span>
                    <span>
                      ${balance.toFixed(0)} / ${nextBoostAt}
                    </span>
                  </div>
                  <Progress value={boostProgress} className="h-2" />
                </div>
                <p className="text-xs text-gray-600 text-center">
                  Spend ${(nextBoostAt - balance).toFixed(0)} more to unlock 3x boost!
                </p>
              </CardContent>
            </Card>

            {/* Gamified Elements */}
            <Card className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{coinsUsed.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Coins Used</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <HandHeart className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{clapsReceived.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Claps Supported</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center py-2 bg-gray-100 text-gray-800 border-gray-200">
                    🎉 Lucky Draw Available!
                  </Badge>
                  <Button variant="outline" className="w-full bg-white border-gray-200 hover:bg-gray-50">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Spin for Rewards
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showAddFundsPopup && <PaymentMethodsPopup title="Add Funds" onClose={() => setShowAddFundsPopup(false)} />}

      {showWithdrawPopup && <PaymentMethodsPopup title="Withdraw Funds" onClose={() => setShowWithdrawPopup(false)} />}

      {showAddPaymentMethodPopup && <PaymentMethodsPopup title="Add Payment Method" onClose={() => setShowAddPaymentMethodPopup(false)} />}

      {showCreatorSearch && <CreatorSearchInterface />}

      {showEditConfirmation && editingMethod && (
        <EditConfirmationDialog
          methodName={editingMethod}
          onConfirm={() => {
            // Handle the edit confirmation here
            console.log(`Editing ${editingMethod}`)
            setShowEditConfirmation(false)
            setEditingMethod(null)
          }}
          onCancel={() => {
            setShowEditConfirmation(false)
            setEditingMethod(null)
          }}
        />
      )}
    </div>
  )
}
