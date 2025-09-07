import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DatabaseService } from '@/lib/services/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, userType, profile } = await request.json()

    // Validation
    if (!username || !email || !password || !userType || !profile?.displayName) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'All required fields must be provided' 
          } 
        },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingUser = await DatabaseService.getUserByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'USERNAME_EXISTS', 
            message: 'Username already exists' 
          } 
        },
        { status: 409 }
      )
    }

    // Check if email already exists
    const existingEmail = await DatabaseService.getUserByEmail(email)
    if (existingEmail) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'EMAIL_EXISTS', 
            message: 'Email already exists' 
          } 
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const userData = {
      username,
      email,
      password: hashedPassword,
      userType,
      profile: {
        displayName: profile.displayName,
        bio: profile.bio,
        avatar: profile.avatar
      }
    }

    const user = await DatabaseService.createUser(userData)

    // Create wallet for the user
    await DatabaseService.createWallet({
      userId: user._id!,
      initialBalance: 0
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id!.toString(), 
        username: user.username, 
        userType: user.userType 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id!.toString(),
        username: user.username,
        email: user.email,
        userType: user.userType,
        profile: user.profile
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Internal server error' 
        } 
      },
      { status: 500 }
    )
  }
}
