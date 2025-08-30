"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TikTokMoreMenu } from "@/components/tiktok-more-menu"
import { TikTokWalletPage } from "@/components/tiktok-wallet-page"
import { TikTokVideoPlayer } from "@/components/tiktok-video-player"
import { TikTokLoginPage } from "@/components/tiktok-login-page"
import { TikTokSubscriptionPage } from "@/components/subs"
import { Search, Home, Compass, Users, Plus, Radio, User, MoreHorizontal, Wallet, Heart, Menu, X, CreditCard } from "lucide-react"

const mockVideos = [
  {
    id: 1,
    thumbnail: "/tiktok-video-thumbnail-1.png",
    views: "2.8M",
    username: "lexidpratt",
    verified: false,
  },
  {
    id: 2,
    thumbnail: "/tiktok-video-thumbnail-2.png",
    views: "3.8M",
    username: "mustsharenews",
    verified: true,
  },
  {
    id: 3,
    thumbnail: "/tiktok-video-thumbnail-3.png",
    views: "630.1K",
    username: "kdarshen",
    verified: true,
  },
  {
    id: 4,
    thumbnail: "/tiktok-video-thumbnail-4.png",
    views: "5.2M",
    username: "megsdeangells",
    verified: true,
  },
  {
    id: 5,
    thumbnail: "/tiktok-video-thumbnail-5.png",
    views: "712.7K",
    username: "thisntfeb",
    verified: false,
  },
  {
    id: 6,
    thumbnail: "/tiktok-video-thumbnail-6.png",
    views: "56.4K",
    username: "yungkaiverse",
    verified: false,
  },
  {
    id: 7,
    thumbnail: "/cooking-content.png",
    views: "1.2M",
    username: "chefmaria_",
    verified: true,
  },
  {
    id: 8,
    thumbnail: "/pet-content.png",
    views: "890K",
    username: "fluffypaws",
    verified: false,
  },
  {
    id: 9,
    thumbnail: "/fashion-content.png",
    views: "2.1M",
    username: "stylebyava",
    verified: true,
  },
  {
    id: 10,
    thumbnail: "/tech-content.png",
    views: "445K",
    username: "techguru2024",
    verified: false,
  },
  {
    id: 11,
    thumbnail: "/fitness-content.png",
    views: "1.8M",
    username: "fitnessjake",
    verified: true,
  },
  {
    id: 12,
    thumbnail: "/art-content.png",
    views: "320K",
    username: "artbyluna",
    verified: false,
  },
  {
    id: 13,
    thumbnail: "/travel-content.png",
    views: "3.5M",
    username: "wanderlust_sam",
    verified: true,
  },
  {
    id: 14,
    thumbnail: "/music-content.png",
    views: "670K",
    username: "beatmaker_pro",
    verified: false,
  },
  {
    id: 15,
    thumbnail: "/comedy-content.png",
    views: "4.2M",
    username: "funnyguy_mike",
    verified: true,
  },
  {
    id: 16,
    thumbnail: "/beauty-content.png",
    views: "1.5M",
    username: "glowup_queen",
    verified: true,
  },
  {
    id: 17,
    thumbnail: "/gaming-content.png",
    views: "2.8M",
    username: "progamer_alex",
    verified: false,
  },
  {
    id: 18,
    thumbnail: "/dance-content.png",
    views: "5.1M",
    username: "dancemoves_lily",
    verified: true,
  },
  {
    id: 19,
    thumbnail: "/diy-content.png",
    views: "780K",
    username: "crafty_hands",
    verified: false,
  },
  {
    id: 20,
    thumbnail: "/nature-content.png",
    views: "1.1M",
    username: "wildlifephoto",
    verified: true,
  },
  {
    id: 21,
    thumbnail: "/sports-content.png",
    views: "2.3M",
    username: "athlete_zone",
    verified: false,
  },
  {
    id: 22,
    thumbnail: "/lifestyle-content.png",
    views: "950K",
    username: "dailyvibes_",
    verified: true,
  },
  {
    id: 23,
    thumbnail: "/education-content.png",
    views: "1.7M",
    username: "learnwithme",
    verified: true,
  },
  {
    id: 24,
    thumbnail: "/food-review.png",
    views: "3.9M",
    username: "foodie_reviews",
    verified: true,
  },
]

const categories = [
  "All",
  "Singing & dancing",
  "Comedy",
  "Sports",
  "Anime & comics",
  "Relationship",
  "Shows",
  "Lipsync",
  "Daily life",
  "Cooking",
  "Pet",
  "Fashion",
  "Tech",
  "Fitness",
  "Art",
  "Travel",
  "Music",
  "Beauty",
  "Gaming",
  "Dance",
  "DIY",
  "Nature",
  "Education",
  "Food Review",
]

export function TikTokMainInterface() {
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentView, setCurrentView] = useState<"main" | "more" | "wallet" | "login" | "subscription">("main")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<(typeof mockVideos)[0] | null>(null)

  const handleMoreClick = () => {
    setCurrentView("more")
  }

  const handleBackToMain = () => {
    setCurrentView("main")
  }

  const handleWalletClick = () => {
    setCurrentView("wallet")
  }

  const handleSubscriptionClick = () => {
    setCurrentView("subscription")
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const handleVideoClick = (video: (typeof mockVideos)[0]) => {
    setSelectedVideo(video)
  }

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null)
  }

  const handleLoginClick = () => {
    setCurrentView("login")
  }

  if (selectedVideo) {
    return <TikTokVideoPlayer video={selectedVideo} onBack={handleCloseVideoPlayer} />
  }

  if (currentView === "more") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <TikTokMoreMenu onClose={handleBackToMain} />
      </div>
    )
  }

  if (currentView === "wallet") {
    return <TikTokWalletPage onBack={handleBackToMain} />
  }

  if (currentView === "login") {
    return <TikTokLoginPage onBack={handleBackToMain} />
  }

  if (currentView === "subscription") {
    return (
      <TikTokSubscriptionPage 
        onBack={handleBackToMain}
        onNavigateToMain={handleBackToMain}
        onNavigateToWallet={handleWalletClick}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white">
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
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-6 py-2 rounded text-sm"
              onClick={handleLoginClick}
            >
              Log in
            </Button>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-3">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex relative">
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
            <Button variant="ghost" className="w-full justify-start gap-3 text-left text-red-500">
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
              className="w-full justify-start gap-3 text-left hover:bg-purple-50 hover:text-purple-600"
              onClick={handleWalletClick}
            >
              <Wallet className="w-6 h-6" />
              Wallet
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-left hover:bg-red-50 hover:text-red-600"
              onClick={handleSubscriptionClick}
            >
              <CreditCard className="w-6 h-6" />
              Subscription
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3 text-left">
              <User className="w-6 h-6" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-left" onClick={handleMoreClick}>
              <MoreHorizontal className="w-6 h-6" />
              More
            </Button>
          </nav>

          <div className="mt-8">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={handleLoginClick}>
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

        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileSidebar} />
        )}

        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {mockVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer" onClick={() => handleVideoClick(video)}>
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-2 md:mb-3">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt="TikTok video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs md:text-sm font-semibold">
                    <Heart className="w-3 h-3 md:w-4 md:h-4 fill-white" />
                    <span>{video.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">
                    {video.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs md:text-sm font-medium truncate">{video.username}</span>
                  {video.verified && (
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
