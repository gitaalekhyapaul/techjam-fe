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
  Wallet, 
  CreditCard,
  LogOut,
  X,
  Menu,
  Bell,
  MoreHorizontal,
  Upload
} from "lucide-react"

interface TikTokSidebarProps {
  isLoggedIn?: boolean
  username?: string
  onNavigate?: (view: string) => void
  onLogout?: () => void
  onLogin?: () => void
  isMobileSidebarOpen?: boolean
  onToggleMobileSidebar?: () => void
  activeView?: string
  showMobileOverlay?: boolean
  variant?: "default" | "compact" | "full"
  onBack?: () => void
  showSearch?: boolean
  searchPlaceholder?: string
  showLogo?: boolean
  showFollowingSection?: boolean
  showFooter?: boolean
  customNavItems?: Array<{
    icon: any
    label: string
    action: string
    isActive?: boolean
    hasNotification?: boolean
  }>
}

export function TikTokSidebar({
  isLoggedIn = false,
  username,
  onNavigate,
  onLogout,
  onLogin,
  isMobileSidebarOpen = false,
  onToggleMobileSidebar,
  activeView = "main",
  showMobileOverlay = true,
  variant = "default",
  onBack,
  showSearch = true,
  searchPlaceholder = "Search",
  showLogo = true,
  showFollowingSection = true,
  showFooter = true,
  customNavItems
}: TikTokSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const defaultNavItems = [
    { icon: Home, label: "For You", action: "main", isActive: activeView === "main", hasNotification: false },
    { icon: Compass, label: "Explore", action: "explore", isActive: activeView === "explore", hasNotification: false },
    { icon: Users, label: "Following", action: "following", isActive: activeView === "following", hasNotification: false },
    { icon: Plus, label: "Friends", action: "friends", isActive: activeView === "friends", hasNotification: false },
    { icon: Upload, label: "Upload", action: "upload", isActive: activeView === "upload", hasNotification: false },
    { icon: Radio, label: "LIVE", action: "live", isActive: activeView === "live", hasNotification: false },
    { icon: User, label: "Profile", action: "profile", isActive: activeView === "profile", hasNotification: false },
    { icon: Wallet, label: "Wallet", action: "wallet", isActive: activeView === "wallet", hasNotification: false },
    { icon: CreditCard, label: "Subscription", action: "subscription", isActive: activeView === "subscription", hasNotification: false },
  ]

  const navItems = customNavItems || defaultNavItems

  const handleNavItemClick = (action: string) => {
    if (onNavigate) {
      onNavigate(action)
    } else {
      console.log(`Navigating to: ${action}`)
    }
    
    // Close mobile sidebar after navigation
    if (onToggleMobileSidebar) {
      onToggleMobileSidebar()
    }
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    }
  }

  const isCompact = variant === "compact"
  const isFull = variant === "full"

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {showMobileOverlay && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onToggleMobileSidebar} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 min-h-screen bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isCompact ? "w-16" : "w-64"}
          ${isFull ? "w-80" : ""}
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end mb-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={onToggleMobileSidebar}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Back Button (if provided) */}
        {onBack && (
          <div className="px-4 mb-4">
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <X className="w-5 h-5 rotate-45" />
            </Button>
          </div>
        )}

        {/* TikTok Logo */}
        {showLogo && (
          <div className="px-4 mb-6">
            <img
              src="/tiktok-official-logo.png"
              alt="TikTok"
              className="h-8 w-auto"
            />
          </div>
        )}

        {/* Search Bar */}
        {showSearch && (
          <div className="px-3 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input 
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 bg-gray-100 border-0 rounded-full text-xs text-gray-500" 
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="px-3 space-y-0.5">
          {navItems.map((item, index) => {
            // Only show certain items when logged in
            if (!isLoggedIn && ["Wallet", "Subscription", "Profile"].includes(item.label)) {
              return null
            }

            return (
              <Button
                key={index}
                variant="ghost"
                className={`
                  w-full justify-start gap-3 text-left h-12 px-3 py-2
                  ${item.isActive 
                    ? "bg-red-50 text-red-600 hover:bg-red-100" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
                onClick={() => handleNavItemClick(item.action)}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${item.isActive ? "text-red-600" : "text-gray-600"}`} />
                {!isCompact && <span className="font-medium text-xs whitespace-nowrap">{item.label}</span>}
                {item.hasNotification === true && !isCompact && (
                  <div className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Following Accounts Section */}
        {showFollowingSection && !isCompact && (
          <div className="px-3 mt-6">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">Following accounts</h3>
            <p className="text-xs text-gray-500 leading-tight">Accounts you follow will appear here.</p>
          </div>
        )}

        {/* Login/Logout Section */}
        {!isCompact && (
          <div className="px-3 mt-6">
            {!isLoggedIn ? (
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white h-10 text-xs font-medium" 
                onClick={onLogin}
              >
                Log in
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 h-10 text-xs font-medium" 
                onClick={onLogout}
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Logout
              </Button>
            )}
          </div>
        )}

        {/* Footer Links */}
        {showFooter && !isCompact && (
          <div className="px-3 mt-6 space-y-1 text-xs text-gray-500">
            <div className="hover:text-gray-700 cursor-pointer">Company</div>
            <div className="hover:text-gray-700 cursor-pointer">Programme</div>
            <div className="hover:text-gray-700 cursor-pointer">Terms & Policies</div>
            <div className="mt-3 text-xs">© 2025 TikTok</div>
          </div>
        )}
      </aside>
    </>
  )
}
