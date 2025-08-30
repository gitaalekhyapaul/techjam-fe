"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  CreditCard,
  LogOut,
  X
} from "lucide-react"

interface TikTokSidebarProps {
  isLoggedIn: boolean
  username?: string
  onNavigate: (view: string) => void
  onLogout: () => void
  onLogin: () => void
  isMobileSidebarOpen: boolean
  onToggleMobileSidebar: () => void
}

export function TikTokSidebar({
  isLoggedIn,
  onNavigate,
  onLogout,
  onLogin,
  isMobileSidebarOpen,
  onToggleMobileSidebar
}: TikTokSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const mainNavItems = [
    { icon: Home, label: "For You", isActive: true, action: "main" },
    { icon: Compass, label: "Explore", isActive: false, action: "explore" },
    { icon: Users, label: "Following", isActive: false, action: "following" },
    { icon: Plus, label: "Friends", isActive: false, action: "friends" },
    { icon: Plus, label: "Upload", isActive: false, action: "upload" },
    { icon: Radio, label: "LIVE", isActive: false, action: "live" },
    { icon: User, label: "Profile", isActive: false, action: "profile" },
    { icon: Wallet, label: "Wallet", isActive: false, action: "wallet" },
    { icon: CreditCard, label: "Subscription", isActive: false, action: "subscription" },
    { icon: MoreHorizontal, label: "More", isActive: false, action: "more" },
  ]

  const handleNavItemClick = (action: string) => {
    if (action === "main") {
      onNavigate("main")
    } else if (action === "wallet") {
      onNavigate("wallet")
    } else if (action === "subscription") {
      onNavigate("subscription")
    } else if (action === "more") {
      onNavigate("more")
    } else {
      // Handle other navigation items
      console.log(`Navigating to: ${action}`)
    }
  }

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onToggleMobileSidebar} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end mb-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={onToggleMobileSidebar}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* TikTok Logo */}
        <div className="px-4 mb-6">
          <img
            src="/tiktok-official-logo.png"
            alt="TikTok"
            className="h-8 w-auto"
          />
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="tiru suara anwar ibrahim" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-full text-sm text-gray-500" 
            />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="px-4 space-y-1">
          {mainNavItems.map((item, index) => {
            // Only show certain items when logged in
            if (!isLoggedIn && ["Wallet", "Subscription", "Profile"].includes(item.label)) {
              return null
            }

            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  w-full justify-start gap-3 text-left h-12 px-3
                  ${item.isActive 
                    ? "bg-red-50 text-red-600 hover:bg-red-100" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
                onClick={() => handleNavItemClick(item.action)}
              >
                <item.icon className={`w-6 h-6 ${item.isActive ? "text-red-600" : "text-gray-600"}`} />
                <span className="font-medium">{item.label}</span>
              </Button>
            )
          })}
        </nav>

        {/* Following Accounts Section */}
        <div className="px-4 mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Following accounts</h3>
          <p className="text-sm text-gray-500">Accounts you follow will appear here.</p>
        </div>

        {/* Login/Logout Section */}
        <div className="px-4 mt-8">
          {!isLoggedIn ? (
            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white" 
              onClick={onLogin}
            >
              Log in
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full text-gray-700 border-gray-300 hover:bg-gray-50" 
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>

        {/* Footer Links */}
        <div className="px-4 mt-8 space-y-2 text-xs text-gray-500">
          <div>Company</div>
          <div>Programme</div>
          <div>Terms & Policies</div>
          <div className="mt-4">© 2025 TikTok</div>
        </div>
      </aside>
    </>
  )
}
