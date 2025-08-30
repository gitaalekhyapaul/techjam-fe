"use client"

import { useState } from "react"
import {
  X,
  ChevronRight,
  Coins,
  Wand2,
  ShoppingBag,
  Users,
  Globe,
  Moon,
  Settings,
  MessageSquare,
  LogOut,
  Search,
  Home,
  Compass,
  Plus,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletModal } from "@/components/wallet-modal"

interface TikTokMoreMenuProps {
  onClose?: () => void
  onLogout?: () => void
  isLoggedIn?: boolean
}

export function TikTokMoreMenu({ onClose, onLogout, isLoggedIn }: TikTokMoreMenuProps) {
  const [isWalletOpen, setIsWalletOpen] = useState(false)

  const menuItems = [
    { icon: Coins, label: "Get Coins", hasArrow: false },
    { icon: Wand2, label: "Create TikTok effects", hasArrow: false },
    { icon: ShoppingBag, label: "Sell on TikTok Shop", hasArrow: false },
    { icon: Users, label: "Creator tools", hasArrow: true },
    { icon: Globe, label: "English (UK)", hasArrow: true },
    { icon: Moon, label: "Dark mode", hasArrow: true },
    { icon: Settings, label: "Settings", hasArrow: false },
    { icon: MessageSquare, label: "Feedback and help", hasArrow: false },
    ...(isLoggedIn ? [{ icon: LogOut, label: "Log out", hasArrow: false }] : []),
  ]

  const sidebarItems = [
    { icon: Search, isActive: false },
    { icon: Home, isActive: false },
    { icon: Compass, isActive: false },
    { icon: Users, isActive: false },
    { icon: Plus, isActive: false },
    { icon: Video, isActive: false },
  ]

  return (
    <>
      <div className="flex bg-white shadow-2xl rounded-lg overflow-hidden max-w-md w-full">
        {/* Left Sidebar */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
          {/* TikTok Logo */}
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="text-black text-xs font-bold">♪</div>
            </div>
          </div>

          {/* Sidebar Icons */}
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5 text-gray-600" />
            </button>
          ))}

          {/* Profile Avatar */}
          <div className="mt-auto">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">J</span>
            </div>
          </div>

          {/* More Button (Active) */}
          <div className="w-10 h-10 border-2 border-red-500 rounded-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full mx-1"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Menu Content */}
        <div className="flex-1 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">More</h2>
            <Button variant="ghost" size="sm" className="p-1" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                onClick={() => {
                  if (item.label === "Log out" && onLogout) {
                    onLogout()
                    if (onClose) onClose()
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-black" />
                  <span className="text-black font-medium">{item.label}</span>
                </div>
                {item.hasArrow && (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </>
  )
}
