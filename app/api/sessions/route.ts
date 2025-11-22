/**
 * POST /api/sessions - Create a new game session with reward evaluation
 *
 * This endpoint:
 * 1. Validates incoming session data with Zod
 * 2. Loads recent sessions and existing rewards
 * 3. Calls the pure domain logic (evaluateRewards)
 * 4. Persists everything in a transaction
 * 5. Returns comprehensive session + reward data
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import {
  evaluateRewards,
  calculateTotalEarnings,
  getWeekStartDate,
  type SessionInput,
  type ExistingReward,
  type SubjectType
} from '@/lib/rewards'

// ============================================================================
// Validation Schema
// ============================================================================

const sessionSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  gameId: z.string().min(1, 'Game ID is required'),
  subject: z.enum(['MATHS', 'ENGLISH', 'VR', 'NVR']),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime(),
  totalQuestions: z.number().int().min(1, 'Must have at least 1 question'),
  correctAnswers: z.number().int().min(0, 'Correct answers cannot be negative'),
}).refine(
  (data) => data.correctAnswers <= data.totalQuestions,
  {
    message: 'Correct answers cannot exceed total questions',
    path: ['correctAnswers']
  }
).refine(
  (data) => {
    const start = new Date(data.startedAt)
    const end = new Date(data.endedAt)
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return durationHours >= 0 && durationHours <= 3
  },
  {
    message: 'Session duration must be between 0 and 3 hours',
    path: ['endedAt']
  }
)

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Load recent sessions for rewards calculation (last 30 days)
 */
async function loadRecentSessions(userId: string): Promise<SessionInput[]> {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const sessions = await prisma.session.findMany({
    where: {
      userId,
      completed: true,
      endTime: {
        gte: thirtyDaysAgo
      }
    },
    orderBy: {
      endTime: 'desc'
    }
  })

  return sessions.map(s => ({
    userId: s.userId,
    gameId: s.gameType,
    subject: s.subject as SubjectType,
    startedAt: s.startTime,
    endedAt: s.endTime || s.startTime,
    totalQuestions: s.totalQuestions,
    correctAnswers: s.correctAnswers
  }))
}

/**
 * Load existing rewards for the user
 */
async function loadExistingRewards(userId: string): Promise<ExistingReward[]> {
  const rewards = await prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })

  return rewards.map(r => ({
    type: r.type as 'HIGH_ACCURACY' | 'STREAK',
    createdAt: r.createdAt,
    amountPence: r.amountPence,
    weekStart: r.weekStart
  }))
}

// ============================================================================
// Main Handler
// ============================================================================

export async function POST(request: Request) {
  try {
    // -------------------------------------------
    // 1. Parse and validate request body
    // -------------------------------------------
    const body = await request.json()
    const validationResult = sessionSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.format()
        },
        { status: 400 }
      )
    }

    const validated = validationResult.data

    // -------------------------------------------
    // 2. Verify user exists
    // -------------------------------------------
    const user = await prisma.user.findUnique({
      where: { id: validated.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // -------------------------------------------
    // 3. Load context for reward evaluation
    // -------------------------------------------
    const [recentSessions, existingRewards] = await Promise.all([
      loadRecentSessions(validated.userId),
      loadExistingRewards(validated.userId)
    ])

    // -------------------------------------------
    // 4. Prepare new session input
    // -------------------------------------------
    const newSessionInput: SessionInput = {
      userId: validated.userId,
      gameId: validated.gameId,
      subject: validated.subject,
      startedAt: new Date(validated.startedAt),
      endedAt: new Date(validated.endedAt),
      totalQuestions: validated.totalQuestions,
      correctAnswers: validated.correctAnswers
    }

    // -------------------------------------------
    // 5. Evaluate rewards (pure domain logic)
    // -------------------------------------------
    const rewardsResult = evaluateRewards({
      newSession: newSessionInput,
      recentSessions,
      existingRewards
    })

    // -------------------------------------------
    // 6. Calculate derived values
    // -------------------------------------------
    const accuracy = validated.totalQuestions > 0
      ? (validated.correctAnswers / validated.totalQuestions) * 100
      : 0

    const duration = Math.floor(
      (new Date(validated.endedAt).getTime() - new Date(validated.startedAt).getTime()) / 1000
    )

    const starsEarned = Math.floor((accuracy / 100) * 3)

    // -------------------------------------------
    // 7. Persist everything in a transaction
    // -------------------------------------------
    const result = await prisma.$transaction(async (tx) => {
      // Create the session
      const session = await tx.session.create({
        data: {
          userId: validated.userId,
          gameType: validated.gameId,
          subject: validated.subject,
          startTime: new Date(validated.startedAt),
          endTime: new Date(validated.endedAt),
          duration,
          totalQuestions: validated.totalQuestions,
          correctAnswers: validated.correctAnswers,
          accuracy,
          starsEarned,
          completed: true
        }
      })

      // Create reward records
      const createdRewards = []
      for (const reward of rewardsResult.newRewards) {
        const createdReward = await tx.reward.create({
          data: {
            userId: validated.userId,
            type: reward.type,
            amountPence: reward.amountPence,
            reason: reward.reason,
            weekStart: reward.weekStart
          }
        })
        createdRewards.push(createdReward)
      }

      // Update or create progress
      await tx.progress.upsert({
        where: {
          userId_subject_gameType: {
            userId: validated.userId,
            subject: validated.subject,
            gameType: validated.gameId
          }
        },
        update: {
          totalStars: { increment: starsEarned },
          gamesPlayed: { increment: 1 },
          bestAccuracy: accuracy,
          lastPlayedAt: new Date()
        },
        create: {
          userId: validated.userId,
          subject: validated.subject,
          gameType: validated.gameId,
          totalStars: starsEarned,
          gamesPlayed: 1,
          bestAccuracy: accuracy,
          lastPlayedAt: new Date()
        }
      })

      // Update or create streak record for this week
      const weekStart = getWeekStartDate(new Date())
      await tx.streak.upsert({
        where: {
          userId_weekStart: {
            userId: validated.userId,
            weekStart
          }
        },
        update: {
          currentStreak: rewardsResult.currentStreakDays,
          longestStreak: { set: Math.max(rewardsResult.currentStreakDays, 0) },
          lastPlayedDate: new Date()
        },
        create: {
          userId: validated.userId,
          weekStart,
          currentStreak: rewardsResult.currentStreakDays,
          longestStreak: rewardsResult.currentStreakDays,
          lastPlayedDate: new Date()
        }
      })

      return { session, createdRewards }
    })

    // -------------------------------------------
    // 8. Calculate total earnings
    // -------------------------------------------
    const allRewards = await loadExistingRewards(validated.userId)
    const totalEarningsPence = calculateTotalEarnings(allRewards)

    // -------------------------------------------
    // 9. Return success response
    // -------------------------------------------
    return NextResponse.json({
      sessionId: result.session.id,
      accuracy,
      currentStreakDays: rewardsResult.currentStreakDays,
      newRewards: rewardsResult.newRewards,
      totalEarningsPence,
      message: rewardsResult.newRewards.length > 0
        ? 'Session saved with rewards!'
        : 'Session saved successfully'
    })

  } catch (error) {
    console.error('Session creation error:', error)

    // Return appropriate error response
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.format()
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to save session',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
