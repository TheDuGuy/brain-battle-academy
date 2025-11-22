/**
 * Debug API - User Verification (DEV ONLY)
 *
 * GET /api/debug/users
 *
 * Returns a list of all users in the database (without sensitive data)
 * for debugging and verification purposes.
 *
 * SECURITY: Only available in development mode.
 * In production, returns 404.
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // Block in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    )
  }

  try {
    // Fetch users without sensitive data
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        color: true,
        role: true,
        createdAt: true,
        // Explicitly exclude password
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      count: users.length,
      users
    })
  } catch (error) {
    console.error('Debug users API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
