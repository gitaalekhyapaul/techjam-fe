import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DatabaseService } from '@/lib/services/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export async function POST(request: NextRequest) {
  try {
    const { username, password, userType } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Username and password are required' 
          } 
        },
        { status: 400 }
      )
    }

    // Find user by username or email
    let user = await DatabaseService.getUserByUsername(username)
    if (!user) {
      user = await DatabaseService.getUserByEmail(username)
    }

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'INVALID_CREDENTIALS', 
            message: 'Invalid username or password' 
          } 
        },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'INVALID_CREDENTIALS', 
            message: 'Invalid username or password' 
          } 
        },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'ACCOUNT_DISABLED', 
            message: 'Account is disabled' 
          } 
        },
        { status: 403 }
      )
    }

    // Check user type if specified
    if (userType && user.userType !== userType) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'INVALID_USER_TYPE', 
            message: 'Invalid user type for this account' 
          } 
        },
        { status: 403 }
      )
    }

    // Update last login
    await DatabaseService.updateUser(user._id!.toString(), {})

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
    })

  } catch (error) {
    console.error('Login error:', error)
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
