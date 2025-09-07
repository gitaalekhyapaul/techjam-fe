import { ObjectId } from 'mongodb'

export interface VideoInteraction {
  _id?: ObjectId
  videoId: ObjectId // Reference to videos collection
  userId: ObjectId // User who interacted
  interactionType: "view" | "like" | "comment" | "share" | "save" | "gift"
  
  // Interaction details
  timestamp: Date
  duration?: number // For views - how long they watched
  deviceType: "mobile" | "desktop" | "tablet"
  location?: {
    country: string
    city: string
  }
  
  // Gift details (if applicable)
  giftDetails?: {
    giftType: string
    tokenValue: number
    message?: string
  }
  
  // Comment details (if applicable)
  commentDetails?: {
    comment: string
    parentCommentId?: ObjectId // For replies
    isEdited: boolean
  }
  
  createdAt: Date
}

export interface CreateVideoInteractionData {
  videoId: ObjectId
  userId: ObjectId
  interactionType: "view" | "like" | "comment" | "share" | "save" | "gift"
  timestamp: Date
  duration?: number
  deviceType: "mobile" | "desktop" | "tablet"
  location?: {
    country: string
    city: string
  }
  giftDetails?: {
    giftType: string
    tokenValue: number
    message?: string
  }
  commentDetails?: {
    comment: string
    parentCommentId?: ObjectId
    isEdited: boolean
  }
}

export interface UpdateVideoInteractionData {
  duration?: number
  deviceType?: "mobile" | "desktop" | "tablet"
  location?: {
    country: string
    city: string
  }
  giftDetails?: {
    giftType: string
    tokenValue: number
    message?: string
  }
  commentDetails?: {
    comment: string
    parentCommentId?: ObjectId
    isEdited: boolean
  }
}

