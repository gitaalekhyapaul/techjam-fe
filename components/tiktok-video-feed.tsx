"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share, 
  Volume2, 
  VolumeX,
  CreditCard
} from "lucide-react"

interface Video {
  id: number
  thumbnail: string
  views: string
  username: string
  verified: boolean
  description: string
  likes: string
  comments: string
  shares: string
  saves: string
  sound: string
  creator: string
}

const mockVideos: Video[] = [
  {
    id: 1,
    thumbnail: "/tiktok-video-thumbnail-1.png",
    views: "2.8M",
    username: "lexidpratt",
    verified: false,
    description: "Amazing content! Check this out 🔥 #trending #viral #fyp",
    likes: "56.8K",
    comments: "4211",
    shares: "6451",
    saves: "4456",
    sound: "Original Sound",
    creator: "lexidpratt"
  },
  {
    id: 2,
    thumbnail: "/tiktok-video-thumbnail-2.png",
    views: "3.8M",
    username: "mustsharenews",
    verified: true,
    description: "Breaking news that you need to see! 📰 #news #breaking #viral",
    likes: "89.2K",
    comments: "5678",
    shares: "8234",
    saves: "6789",
    sound: "Original Sound",
    creator: "mustsharenews"
  },
  {
    id: 3,
    thumbnail: "/tiktok-video-thumbnail-3.png",
    views: "630.1K",
    username: "kdarshen",
    verified: true,
    description: "Incredible transformation! You won't believe this 😱 #transformation #amazing #viral",
    likes: "23.4K",
    comments: "1234",
    shares: "2345",
    saves: "3456",
    sound: "Original Sound",
    creator: "kdarshen"
  },
  {
    id: 4,
    thumbnail: "/tiktok-video-thumbnail-4.png",
    views: "5.2M",
    username: "megsdeangells",
    verified: true,
    description: "This is absolutely mind-blowing! 🤯 #mindblowing #viral #trending",
    likes: "156.7K",
    comments: "9876",
    shares: "12345",
    saves: "8765",
    sound: "Original Sound",
    creator: "megsdeangells"
  },
  {
    id: 5,
    thumbnail: "/tiktok-video-thumbnail-5.png",
    views: "712.7K",
    username: "thisntfeb",
    verified: false,
    description: "You have to see this to believe it! 😍 #amazing #viral #trending",
    likes: "34.2K",
    comments: "2345",
    shares: "3456",
    saves: "4567",
    sound: "Original Sound",
    creator: "thisntfeb"
  },
  {
    id: 6,
    thumbnail: "/tiktok-video-thumbnail-6.png",
    views: "56.4K",
    username: "yungkaiverse",
    verified: false,
    description: "Check out this amazing content! 🚀 #viral #trending #fyp",
    likes: "12.3K",
    comments: "890",
    shares: "1234",
    saves: "567",
    sound: "Original Sound",
    creator: "yungkaiverse"
  },
  {
    id: 7,
    thumbnail: "/cooking-content.png",
    views: "1.2M",
    username: "chefmaria_",
    verified: true,
    description: "Delicious recipe you have to try! 👨‍🍳 #cooking #food #recipe",
    likes: "45.6K",
    comments: "2345",
    shares: "3456",
    saves: "2345",
    sound: "Original Sound",
    creator: "chefmaria_"
  },
  {
    id: 8,
    thumbnail: "/pet-content.png",
    views: "890K",
    username: "fluffypaws",
    verified: false,
    description: "Cutest pet moments! 🐾 #pets #cute #animals",
    likes: "34.2K",
    comments: "1234",
    shares: "2345",
    saves: "1234",
    sound: "Original Sound",
    creator: "fluffypaws"
  },
  {
    id: 9,
    thumbnail: "/fashion-content.png",
    views: "2.1M",
    username: "stylebyava",
    verified: true,
    description: "Latest fashion trends! 👗 #fashion #style #trending",
    likes: "67.8K",
    comments: "3456",
    shares: "4567",
    saves: "3456",
    sound: "Original Sound",
    creator: "stylebyava"
  },
  {
    id: 10,
    thumbnail: "/tech-content.png",
    views: "445K",
    username: "techguru2024",
    verified: false,
    description: "Amazing tech innovations! 💻 #tech #innovation #future",
    likes: "23.4K",
    comments: "1234",
    shares: "2345",
    saves: "1234",
    sound: "Original Sound",
    creator: "techguru2024"
  },
  {
    id: 11,
    thumbnail: "/fitness-content.png",
    views: "1.8M",
    username: "fitnessjake",
    verified: true,
    description: "Get fit with these amazing workouts! 💪 #fitness #workout #health",
    likes: "56.7K",
    comments: "2345",
    shares: "3456",
    saves: "2345",
    sound: "Original Sound",
    creator: "fitnessjake"
  },
  {
    id: 12,
    thumbnail: "/art-content.png",
    views: "320K",
    username: "artbyluna",
    verified: false,
    description: "Beautiful artwork that will inspire you! 🎨 #art #creative #inspiration",
    likes: "18.9K",
    comments: "890",
    shares: "1234",
    saves: "890",
    sound: "Original Sound",
    creator: "artbyluna"
  },
  {
    id: 13,
    thumbnail: "/travel-content.png",
    views: "3.5M",
    username: "wanderlust_sam",
    verified: true,
    description: "Amazing travel destinations! ✈️ #travel #adventure #explore",
    likes: "89.1K",
    comments: "4567",
    shares: "5678",
    saves: "4567",
    sound: "Original Sound",
    creator: "wanderlust_sam"
  },
  {
    id: 14,
    thumbnail: "/music-content.png",
    views: "670K",
    username: "beatmaker_pro",
    verified: false,
    description: "Incredible music production! 🎵 #music #production #beats",
    likes: "34.5K",
    comments: "1234",
    shares: "2345",
    saves: "1234",
    sound: "Original Sound",
    creator: "beatmaker_pro"
  },
  {
    id: 15,
    thumbnail: "/comedy-content.png",
    views: "4.2M",
    username: "funnyguy_mike",
    verified: true,
    description: "Hilarious comedy that will make you laugh! 😂 #comedy #funny #humor",
    likes: "123.4K",
    comments: "6789",
    shares: "8901",
    saves: "6789",
    sound: "Original Sound",
    creator: "funnyguy_mike"
  },
  {
    id: 16,
    thumbnail: "/beauty-content.png",
    views: "1.5M",
    username: "glowup_queen",
    verified: true,
    description: "Beauty tips and tricks! 💄 #beauty #makeup #tips",
    likes: "45.6K",
    comments: "2345",
    shares: "3456",
    saves: "2345",
    sound: "Original Sound",
    creator: "glowup_queen"
  },
  {
    id: 17,
    thumbnail: "/gaming-content.png",
    views: "2.8M",
    username: "progamer_alex",
    verified: false,
    description: "Epic gaming moments! 🎮 #gaming #esports #gamer",
    likes: "78.9K",
    comments: "3456",
    shares: "4567",
    saves: "3456",
    sound: "Original Sound",
    creator: "progamer_alex"
  },
  {
    id: 18,
    thumbnail: "/dance-content.png",
    views: "5.1M",
    username: "dancemoves_lily",
    verified: true,
    description: "Amazing dance moves! 💃 #dance #moves #performance",
    likes: "145.6K",
    comments: "7890",
    shares: "9012",
    saves: "7890",
    sound: "Original Sound",
    creator: "dancemoves_lily"
  },
  {
    id: 19,
    thumbnail: "/diy-content.png",
    views: "780K",
    username: "crafty_hands",
    verified: false,
    description: "Creative DIY projects! 🛠️ #diy #crafts #creative",
    likes: "34.2K",
    comments: "1234",
    shares: "2345",
    saves: "1234",
    sound: "Original Sound",
    creator: "crafty_hands"
  },
  {
    id: 20,
    thumbnail: "/nature-content.png",
    views: "1.1M",
    username: "wildlifephoto",
    verified: true,
    description: "Stunning nature photography! 🌿 #nature #photography #wildlife",
    likes: "45.6K",
    comments: "2345",
    shares: "3456",
    saves: "2345",
    sound: "Original Sound",
    creator: "wildlifephoto"
  },
  {
    id: 21,
    thumbnail: "/sports-content.png",
    views: "2.3M",
    username: "athlete_zone",
    verified: false,
    description: "Incredible sports moments! 🏃‍♂️ #sports #athlete #motivation",
    likes: "67.8K",
    comments: "3456",
    shares: "4567",
    saves: "3456",
    sound: "Original Sound",
    creator: "athlete_zone"
  },
  {
    id: 22,
    thumbnail: "/lifestyle-content.png",
    views: "950K",
    username: "dailyvibes_",
    verified: true,
    description: "Daily lifestyle inspiration! ✨ #lifestyle #inspiration #daily",
    likes: "34.5K",
    comments: "1234",
    shares: "2345",
    saves: "1234",
    sound: "Original Sound",
    creator: "dailyvibes_"
  },
  {
    id: 23,
    thumbnail: "/education-content.png",
    views: "1.7M",
    username: "learnwithme",
    verified: true,
    description: "Learn something new today! 📚 #education #learning #knowledge",
    likes: "56.7K",
    comments: "2345",
    shares: "3456",
    saves: "2345",
    sound: "Original Sound",
    creator: "learnwithme"
  },
  {
    id: 24,
    thumbnail: "/food-review.png",
    views: "3.9M",
    username: "foodie_reviews",
    verified: true,
    description: "Amazing food reviews! 🍕 #food #review #delicious",
    likes: "98.7K",
    comments: "5678",
    shares: "6789",
    saves: "5678",
    sound: "Original Sound",
    creator: "foodie_reviews"
  }
]

interface TikTokVideoFeedProps {
  onBack: () => void
  onNavigateToMain: () => void
  onNavigateToWallet: () => void
  onNavigateToSubscription: () => void
}

export function TikTokVideoFeed({ 
  onBack, 
  onNavigateToMain, 
  onNavigateToWallet, 
  onNavigateToSubscription 
}: TikTokVideoFeedProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({})
  const [isBookmarked, setIsBookmarked] = useState<{ [key: number]: boolean }>({})
  const [isMuted, setIsMuted] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [coinCount, setCoinCount] = useState<{ [key: number]: number }>({})
  const [showCoinAnimation, setShowCoinAnimation] = useState<{ [key: number]: boolean }>({})
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const currentVideo = mockVideos[currentVideoIndex]

  const handleLike = (videoId: number) => {
    setIsLiked(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const handleBookmark = (videoId: number) => {
    setIsBookmarked(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const handleCoin = (videoId: number) => {
    // Add coin animation
    setShowCoinAnimation(prev => ({
      ...prev,
      [videoId]: true
    }))
    
    // Increment coin count
    setCoinCount(prev => ({
      ...prev,
      [videoId]: (prev[videoId] || 0) + 1
    }))
    
    // Reset animation after 1 second
    setTimeout(() => {
      setShowCoinAnimation(prev => ({
        ...prev,
        [videoId]: false
      }))
    }, 1000)
  }

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentVideoIndex < mockVideos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1)
    } else if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      handleScroll('down')
    } else {
      handleScroll('up')
    }
  }

  const formatCount = (count: string) => {
    return count
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Sidebar - Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block">
        <div className="mb-6">
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%203-jvuVYl6iGXvwtQ2TgRywoy9xheweks.png"
              alt="TikTok Logo"
              className="h-8 w-auto"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="tiru suara anwar ibrahim" 
              className="pl-10 bg-gray-100 border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

                                                                                                                                               <nav className="space-y-2">
             <Button variant="ghost" className="w-full justify-start gap-3 text-left bg-red-50 text-red-500">
               <Home className="w-6 h-6" />
               For You
             </Button>
             <Button 
               variant="ghost" 
               className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500"
               onClick={onNavigateToMain}
             >
               <Compass className="w-6 h-6" />
               Explore
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <Users className="w-6 h-6" />
               Following
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <Plus className="w-6 h-6" />
               Friends
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <Plus className="w-6 h-6" />
               Upload
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <Radio className="w-6 h-6" />
               LIVE
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <User className="w-6 h-6" />
               Profile
             </Button>
             <Button 
               variant="ghost" 
               className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500"
               onClick={onNavigateToWallet}
             >
               <Wallet className="w-6 h-6" />
               Wallet
             </Button>
             <Button 
               variant="ghost" 
               className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500"
               onClick={onNavigateToSubscription}
             >
               <CreditCard className="w-6 h-6" />
               Subscription
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-500">
               <MoreHorizontal className="w-6 h-6" />
               More
             </Button>
           </nav>

        <div className="mt-8">
          <div className="text-sm text-gray-500 mb-4">Following accounts</div>
          <div className="text-xs text-gray-400">Accounts you follow will appear here</div>
        </div>

        <div className="mt-8 space-y-2 text-xs text-gray-500">
          <div>Company</div>
          <div>Programme</div>
          <div>Terms & Policies</div>
          <div className="mt-4">© 2025 TikTok</div>
        </div>
      </aside>

      {/* Main Video Player Area */}
      <main className="flex-1 relative bg-black" onWheel={handleWheel} ref={videoContainerRef}>
        {/* Top Header */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%203-jvuVYl6iGXvwtQ2TgRywoy1.png"
              alt="TikTok Logo"
              className="h-8 w-auto"
            />
          </div>

                     <div className="flex items-center gap-4">
             <Button variant="ghost" className="text-white hover:bg-white/20">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
                 Get Coins
               </div>
             </Button>
             <Button variant="ghost" className="text-white hover:bg-white/20">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                 Get App
               </div>
             </Button>
                                         <div className="flex items-center gap-2 text-white">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium">0</span>
              </div>
             <Avatar className="w-8 h-8">
               <AvatarFallback className="bg-green-500 text-white text-sm">J</AvatarFallback>
             </Avatar>
           </div>
        </header>

        {/* Video Content */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-md mx-auto">
            {/* Video Container with 9:16 aspect ratio */}
            <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={currentVideo.thumbnail || "/placeholder.svg"}
                alt="TikTok video"
                className="w-full h-full object-cover"
              />
              
              {/* Video Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                <div className="h-full bg-red-500 w-1/3"></div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold">
                      {currentVideo.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">@{currentVideo.username}</span>
                      {currentVideo.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-sm rounded-md">
                        Follow
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-white mb-2 text-sm">{currentVideo.description}</p>

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span>{currentVideo.sound} - {currentVideo.creator}</span>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>

                 {/* Right Sidebar - Video Interactions */}
         <aside className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
                                   {/* Creator Profile */}
             <div className="flex flex-col items-center">
               <Avatar className="w-13 h-13 border-2 border-white mb-2">
                 <AvatarFallback className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold">
                   {currentVideo.username.charAt(0).toUpperCase()}
                 </AvatarFallback>
               </Avatar>
               <div className="text-center text-white text-xs mb-2">
                 <div className="font-semibold">{currentVideo.username}</div>
                 <div className="text-gray-300">UPDATES</div>
               </div>
               <Button className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white p-0">
                 <Plus className="w-4 h-4" />
               </Button>
             </div>

                                                                                                   {/* Coin Button */}
               <div className="flex flex-col items-center relative">
                                   <Button
                    variant="ghost"
                    size="icon"
                    className={`w-13 h-13 rounded-full transition-all duration-300 ${
                      showCoinAnimation[currentVideo.id] 
                        ? "scale-110 shadow-lg shadow-yellow-400/50" 
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleCoin(currentVideo.id)}
                  >
                   <div className="relative w-13 h-13">
                                         {/* Coin Background */}
                      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        showCoinAnimation[currentVideo.id] 
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-500" 
                          : (coinCount[currentVideo.id] || 0) > 0
                          ? "bg-gradient-to-br from-yellow-300 to-yellow-400"
                          : "bg-transparent"
                      }`}></div>
                      
                      {/* Coin Rim */}
                      <div className={`absolute inset-1 rounded-full transition-all duration-300 ${
                        showCoinAnimation[currentVideo.id] 
                          ? "bg-gradient-to-br from-yellow-300 to-yellow-400" 
                          : (coinCount[currentVideo.id] || 0) > 0
                          ? "bg-gradient-to-br from-yellow-200 to-yellow-300"
                          : "bg-transparent"
                      }`}></div>
                     
                                           {/* Musical Note */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className={`w-6 h-6 transition-all duration-300 ${
                          (coinCount[currentVideo.id] || 0) > 0 ? "text-white" : "text-gray-400"
                        }`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                   </div>
                 </Button>
                 
                 {/* Simple Pop Animation */}
                 {showCoinAnimation[currentVideo.id] && (
                   <div className="absolute inset-0 animate-ping">
                     <div className="w-13 h-13 rounded-full bg-yellow-400 opacity-75"></div>
                   </div>
                 )}
                 
                                   <span className="text-white text-xs mt-1">
                    {coinCount[currentVideo.id] || 0}
                  </span>
               </div>

                                                 {/* Like Button */}
              <div className="flex flex-col items-center">
               <Button
                 variant="ghost"
                 size="icon"
                 className={`w-13 h-13 rounded-full ${
                   isLiked[currentVideo.id] ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
                 }`}
                 onClick={() => handleLike(currentVideo.id)}
               >
                 <Heart className={`w-6 h-6 ${isLiked[currentVideo.id] ? "fill-current" : ""}`} />
               </Button>
               <span className="text-white text-xs mt-1">{formatCount(currentVideo.likes)}</span>
             </div>

             {/* Comments Button */}
             <div className="flex flex-col items-center">
               <Button
                 variant="ghost"
                 size="icon"
                 className="w-13 h-13 rounded-full bg-black/50 text-white hover:bg-black/70"
                 onClick={() => setShowComments(!showComments)}
               >
                 <MessageCircle className="w-6 h-6" />
               </Button>
               <span className="text-white text-xs mt-1">{formatCount(currentVideo.comments)}</span>
             </div>

             {/* Bookmark Button */}
             <div className="flex flex-col items-center">
               <Button
                 variant="ghost"
                 size="icon"
                 className={`w-13 h-13 rounded-full ${
                   isBookmarked[currentVideo.id] ? "bg-yellow-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
                 }`}
                 onClick={() => handleBookmark(currentVideo.id)}
               >
                 <Bookmark className={`w-6 h-6 ${isBookmarked[currentVideo.id] ? "fill-current" : ""}`} />
               </Button>
               <span className="text-white text-xs mt-1">{formatCount(currentVideo.saves)}</span>
             </div>

             {/* Share Button */}
             <div className="flex flex-col items-center">
               <Button
                 variant="ghost"
                 size="icon"
                 className="w-13 h-13 rounded-full bg-black/50 text-white hover:bg-black/70"
               >
                 <Share className="w-6 h-6" />
               </Button>
               <span className="text-white text-xs mt-1">{formatCount(currentVideo.shares)}</span>
             </div>
        </aside>

                 {/* Back Button */}
         <Button
           variant="ghost"
           size="icon"
           className="absolute top-20 left-4 z-10 text-white hover:bg-white/20"
           onClick={onBack}
         >
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
             <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
         </Button>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-20 right-20 z-10 text-white hover:bg-white/20"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>
      </main>
    </div>
  )
}

export default TikTokVideoFeed
