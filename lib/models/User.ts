import { ObjectId } from 'mongodb'

export interface UserProfile {
  displayName: string
  bio?: string
  avatar?: string
  verified: boolean
  followers: number
  following: number
  totalLikes: number
}

export interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private'
    showEarnings: boolean
  }
  language: string
  timezone: string
}

export interface User {
  _id?: ObjectId
  username: string
  email: string
  password: string // hashed
  userType: 'user' | 'creator'
  profile: UserProfile
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
  isActive: boolean
}

export interface CreateUserData {
  username: string
  email: string
  password: string
  userType: 'user' | 'creator'
  profile: {
    displayName: string
    bio?: string
    avatar?: string
  }
}

export interface UpdateUserData {
  displayName?: string
  bio?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}
