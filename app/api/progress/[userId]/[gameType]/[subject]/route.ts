import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/progress/[userId]/[gameType]/[subject] - Get user's progress for a specific game
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string; gameType: string; subject: string }> }
) {
  try {
    const { userId, gameType, subject } = await params

    if (!userId || !gameType || !subject) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Find existing progress record
    const progress = await prisma.progress.findUnique({
      where: {
        userId_subject_gameType: {
          userId,
          subject,
          gameType
        }
      }
    })

    // Return progress or default values
    return NextResponse.json({
      skillLevel: progress?.skillLevel || 1,
      gamesPlayed: progress?.gamesPlayed || 0,
      bestAccuracy: progress?.bestAccuracy || 0,
      totalStars: progress?.totalStars || 0
    })
  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
