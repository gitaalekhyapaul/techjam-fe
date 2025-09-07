"use client"

import { useState } from "react"
import { X, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Banknote, History, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent } from "@/components/shared/ui/card"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "history">("overview")

  if (!isOpen) return null

  const recentTransactions = [
    { id: 1, type: "received", amount: 25.0, description: "Gift from @username", time: "2 hours ago" },
    { id: 2, type: "sent", amount: 10.0, description: "Tip to creator", time: "1 day ago" },
    { id: 3, type: "received", amount: 50.0, description: "Added funds", time: "3 days ago" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">TikTok Wallet</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Balance Card */}
          <div className="p-4">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-primary-foreground/80 text-sm">Available Balance</p>
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
                        className="p-1 text-primary-foreground hover:bg-primary-foreground/20"
                      >
                        {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Banknote className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="px-4 mb-4">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                History
              </button>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="px-4 space-y-4">
              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Add Card</p>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ArrowDownLeft className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Withdraw</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "received" ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.time}</p>
                        </div>
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          transaction.type === "received" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "received" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="px-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Transaction History</h3>
                <Button variant="ghost" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-2">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "received" ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        transaction.type === "received" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "received" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4">
            <p className="text-xs text-muted-foreground text-center">
              Your wallet is secured with industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
