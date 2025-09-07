import { ObjectId } from 'mongodb'

export interface Video {
  _id?: ObjectId
  videoId: number // Original ID from JSON
  creatorId: ObjectId // Reference to users collection
  creatorUsername: string
  
  // Video metadata
  title: string
  description: string
  thumbnail: string // URL to thumbnail image
  videoUrl: string // URL to actual video file
  duration: number // Duration in seconds
  
  // Engagement metrics
  views: {
    count: number
    display: string // "2.8M", "1.2K", etc.
  }
  likes: {
    count: number
    display: string
  }
  comments: {
    count: number
    display: string
  }
  shares: {
    count: number
    display: string
  }
  saves: {
    count: number
    display: string
  }
  
  // Audio/Content
  sound: {
    name: string
    original: boolean
    audioUrl?: string
  }
  
  // Tokens system
  tokens: {
    earned: number // Tokens earned from this video
    spent: number // Tokens spent on this video
    total: number // Total tokens for this video
    rate: number // Token earning rate per view
  }
  
  // Content classification
  category: string // "dance", "comedy", "cooking", etc.
  tags: string[] // Hashtags
  isVerified: boolean // Creator verification status
  
  // Status and visibility
  status: "draft" | "published" | "archived" | "deleted"
  visibility: "public" | "private" | "unlisted"
  isMonetized: boolean
  
  // Timestamps
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
  lastViewedAt?: Date
}

export interface CreateVideoData {
  videoId: number
  creatorId: ObjectId
  creatorUsername: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  views: {
    count: number
    display: string
  }
  likes: {
    count: number
    display: string
  }
  comments: {
    count: number
    display: string
  }
  shares: {
    count: number
    display: string
  }
  saves: {
    count: number
    display: string
  }
  sound: {
    name: string
    original: boolean
    audioUrl?: string
  }
  tokens: {
    earned: number
    spent: number
    total: number
    rate: number
  }
  category: string
  tags: string[]
  isVerified: boolean
  status: "draft" | "published" | "archived" | "deleted"
  visibility: "public" | "private" | "unlisted"
  isMonetized: boolean
  publishedAt: Date
}

export interface UpdateVideoData {
  title?: string
  description?: string
  thumbnail?: string
  videoUrl?: string
  duration?: number
  views?: {
    count: number
    display: string
  }
  likes?: {
    count: number
    display: string
  }
  comments?: {
    count: number
    display: string
  }
  shares?: {
    count: number
    display: string
  }
  saves?: {
    count: number
    display: string
  }
  sound?: {
    name: string
    original: boolean
    audioUrl?: string
  }
  tokens?: {
    earned: number
    spent: number
    total: number
    rate: number
  }
  category?: string
  tags?: string[]
  isVerified?: boolean
  status?: "draft" | "published" | "archived" | "deleted"
  visibility?: "public" | "private" | "unlisted"
  isMonetized?: boolean
  lastViewedAt?: Date
  updatedAt: Date
}

