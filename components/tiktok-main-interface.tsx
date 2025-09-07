"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/shared/ui/button"

import { TikTokWalletPage } from "@/wallet/user/tiktok-wallet-page"
import { TikTokVideoPlayer } from "@/components/tiktok-video-player"
import { TikTokVideoFeed } from "@/components/tiktok-video-feed"
import { TikTokLoginPage } from "@/components/tiktok-login-page"
import { TikTokSubscriptionPage } from "@/components/subs"
import { TikTokCreatorDashboard } from "@/components/creator"
import { Search, Home, Compass, Users, Plus, Radio, User, MoreHorizontal, Wallet, Heart, Menu, X, CreditCard, LogOut } from "lucide-react"
import { TikTokSidebar } from "@/components/tiktok-sidebar"

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
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentView, setCurrentView] = useState<"main" | "more" | "wallet" | "login" | "subscription" | "creator">("main")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<(typeof mockVideos)[0] | null>(null)
  const [showVideoFeed, setShowVideoFeed] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  // Check login state on component mount
  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn")
    const storedUsername = localStorage.getItem("username")
    if (loginState === "true") {
      setIsLoggedIn(true)
      setUsername(storedUsername || "")
    }
  }, [])

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

  const handleVideoClick = () => {
    setShowVideoFeed(true)
  }

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null)
  }

  const handleLoginClick = () => {
    setCurrentView("login")
  }

  const handleLoginSuccess = (userType?: 'user' | 'creator') => {
    setIsLoggedIn(true)
    setUsername(localStorage.getItem("username") || "")
    
    // Redirect to creator dashboard if user is a creator
    if (userType === 'creator') {
      setCurrentView("creator")
    } else {
      setCurrentView("main")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userType")
    setIsLoggedIn(false)
    setUsername("")
    setCurrentView("main")
  }

  if (showVideoFeed) {
    return (
      <TikTokVideoFeed
        onBack={() => setShowVideoFeed(false)}
        onNavigateToMain={handleBackToMain}
        onNavigateToWallet={handleWalletClick}
        onNavigateToSubscription={handleSubscriptionClick}
        isLoggedIn={isLoggedIn}
        username={username}
      />
    )
  }

  if (selectedVideo) {
    return <TikTokVideoPlayer video={selectedVideo} onBack={handleCloseVideoPlayer} />
  }



  if (currentView === "wallet") {
    return <TikTokWalletPage onBack={handleBackToMain} />
  }

  if (currentView === "login") {
    return <TikTokLoginPage onBack={handleBackToMain} onLoginSuccess={handleLoginSuccess} />
  }

  if (currentView === "subscription") {
    return (
      <TikTokSubscriptionPage 
        onBack={handleBackToMain}
        onNavigateToMain={handleBackToMain}
        onNavigateToWallet={handleWalletClick}
        onLogout={handleLogout}
      />
    )
  }

  if (currentView === "creator") {
    return <TikTokCreatorDashboard onLogout={handleLogout} />
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
                src="/tiktok-official-logo.png"
                alt="TikTok Logo"
                className="h-10 md:h-14 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>

            {!isLoggedIn ? (
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-6 py-2 rounded text-sm"
                onClick={handleLoginClick}
              >
                Log in
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 hidden md:block">Welcome, {username}</span>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
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
        <TikTokSidebar
          isLoggedIn={isLoggedIn}
          username={username}
          onNavigate={(view) => {
            if (view === "main") {
              setCurrentView("main")
            } else if (view === "wallet") {
              setCurrentView("wallet")
            } else if (view === "subscription") {
              setCurrentView("subscription")
            } else if (view === "explore") {
              setShowVideoFeed(true)
            }
          }}
          onLogout={handleLogout}
          onLogin={handleLoginClick}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={toggleMobileSidebar}
        />



        <main className="flex-1 p-4 md:p-6">
          {/* Watch Videos Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TikTok</h1>
            <p className="text-gray-600 mb-6">Discover amazing content from creators around the world</p>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg rounded-full"
              onClick={() => setShowVideoFeed(true)}
            >
              <Home className="w-5 h-5 mr-2" />
              Watch Videos
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trending Videos</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {mockVideos.map((video) => (
                              <div key={video.id} className="group cursor-pointer" onClick={() => handleVideoClick()}>
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
