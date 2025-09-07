"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Heart, MessageCircle, Share, Bookmark, ArrowLeft, MoreHorizontal, Volume2, VolumeX } from "lucide-react"
import { WalletApiService } from "@/lib/services/walletApi"

interface VideoPlayerProps {
  video: {
    id: number
    thumbnail: string
    views: string
    username: string
    verified: boolean
    _id?: string // MongoDB ObjectId for database operations
  }
  onBack: () => void
}

export function TikTokVideoPlayer({ video, onBack }: VideoPlayerProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100000))
  const [commentCount] = useState(Math.floor(Math.random() * 5000))
  const [shareCount] = useState(Math.floor(Math.random() * 2000))
  const [clapCount, setClapCount] = useState(Math.floor(Math.random() * 10000))
  const [coinCount, setCoinCount] = useState(Math.floor(Math.random() * 500))
  const [isTransferring, setIsTransferring] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleClap = () => {
    setClapCount((prev) => prev + 1)
  }

  const handleCoin = async () => {
    if (isTransferring) return
    
    try {
      setIsTransferring(true)
      
      // Get current user from localStorage
      const username = localStorage.getItem("username")
      if (!username) {
        alert("Please log in to send tokens")
        return
      }

      // Get user from database
      const user = await WalletApiService.getUserByUsername(username)
      if (!user) {
        alert("User not found")
        return
      }

      // Check if video has MongoDB ID
      if (!video._id) {
        alert("Video not found in database")
        return
      }

      // Transfer token
      const result = await WalletApiService.transferTokens(user.id, video._id, 1)
      
      if (result.success) {
        setCoinCount((prev) => prev + 1)
        // Show success message
        console.log("Token transferred successfully!")
      } else {
        alert("Failed to transfer token: " + result.error)
      }
    } catch (error) {
      console.error("Token transfer error:", error)
      if (error.message === "Insufficient tokens") {
        alert("You don't have enough tokens!")
      } else {
        alert("Failed to transfer token. Please try again.")
      }
    } finally {
      setIsTransferring(false)
    }
  }

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      {/* Video Player Area */}
      <div className="flex-1 relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10 text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>

        {/* Video Content */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt="TikTok video"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-20 p-4 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-lg font-bold">
              {video.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">@{video.username}</span>
                {video.verified && (
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
                <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-sm rounded-md">Follow</Button>
              </div>
            </div>
          </div>

          <p className="text-white mb-2 text-sm">Amazing content! Check this out 🔥 #trending #viral #fyp</p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>Original Sound - {video.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar with Actions */}
      <div className="w-20 flex flex-col items-center justify-end pb-20 gap-6">
        {/* Love Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isLiked ? "bg-red-500 text-white" : "bg-gray-800/50 text-white hover:bg-gray-700/50"
            }`}
            onClick={handleLike}
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <span className="text-white text-xs mt-1">{formatCount(likeCount)}</span>
        </div>

        {/* Clap Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50"
            onClick={handleClap}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.5 2C13.43 2 15 3.57 15 5.5V8H16.5C18.43 8 20 9.57 20 11.5S18.43 15 16.5 15H15V16.5C15 18.43 13.43 20 11.5 20S8 18.43 8 16.5V15H6.5C4.57 15 3 13.43 3 11.5S4.57 8 6.5 8H8V5.5C8 3.57 9.57 2 11.5 2Z" />
            </svg>
          </Button>
          <span className="text-white text-xs mt-1">{formatCount(clapCount)}</span>
        </div>

        {/* Coin Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full text-white hover:bg-yellow-400/80 ${
              isTransferring ? 'bg-yellow-600/80' : 'bg-yellow-500/80'
            }`}
            onClick={handleCoin}
            disabled={isTransferring}
          >
            {isTransferring ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </Button>
          <span className="text-white text-xs mt-1">{formatCount(coinCount)}</span>
        </div>

        {/* Comments Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs mt-1">{formatCount(commentCount)}</span>
        </div>

        {/* Bookmark Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              isBookmarked ? "bg-yellow-500 text-white" : "bg-gray-800/50 text-white hover:bg-gray-700/50"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50"
          >
            <Share className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs mt-1">{formatCount(shareCount)}</span>
        </div>

        {/* More Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Profile Picture */}
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
          {video.username.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Comments Overlay */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 max-h-96 overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-semibold text-lg mb-4">{formatCount(commentCount)} comments</h3>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                  U{i}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">user{i}</span>
                    <span className="text-gray-500 text-xs">2h</span>
                  </div>
                  <p className="text-sm">This is amazing! Love this content 🔥</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="text-gray-500 text-xs">Reply</button>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
