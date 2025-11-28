/**
 * Parent Overview API
 *
 * GET /api/parent/overview
 *
 * Returns aggregate stats for all children of the authenticated parent user.
 * Includes per-child summaries and family-wide metrics for the current week.
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getWeekStartDate } from '@/lib/rewards'

// ============================================================================
// Types
// ============================================================================

type ChildSummary = {
  id: string
  name: string
  avatar: string | null
  // This week:
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number // across all subjects
  currentStreakDays: number
  rewardsThisWeekPence: number
  lastPlayedAt: string | null // ISO
}

type ParentOverviewResponse = {
  children: ChildSummary[]
  family: {
    totalMinutesThisWeek: number
    totalRewardsThisWeekPence: number
    avgAccuracyThisWeek: number
    childrenOnTrackToday: number
    totalChildren: number
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the current streak for a user by checking their Streak table record
 */
async function getCurrentStreak(userId: string): Promise<number> {
  const weekStart = getWeekStartDate(new Date())

  const streak = await prisma.streak.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart
      }
    }
  })

  return streak?.currentStreak || 0
}

/**
 * Check if a user played today
 */
function hasPlayedToday(lastPlayedAt: Date | null): boolean {
  if (!lastPlayedAt) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastPlayed = new Date(lastPlayedAt)
  lastPlayed.setHours(0, 0, 0, 0)

  return lastPlayed.getTime() === today.getTime()
}

// ============================================================================
// Main Handler
// ============================================================================

export async function GET(request: Request) {
  try {
    // TODO: Get authenticated user from session/cookie
    // For now, we'll accept parentId as a query param for testing
    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get('parentId')

    if (!parentId) {
      return NextResponse.json(
        { error: 'Parent ID required' },
        { status: 400 }
      )
    }

    // Verify the user is a PARENT
    const parent = await prisma.user.findUnique({
      where: { id: parentId }
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json(
        { error: 'Unauthorized: PARENT role required' },
        { status: 403 }
      )
    }

    // Get all children of this parent
    const children = await prisma.user.findMany({
      where: {
        parentId: parentId,
        role: 'PLAYER'
      },
      select: {
        id: true,
        name: true,
        avatar: true
      }
    })

    // Get week start for filtering
    const weekStart = getWeekStartDate(new Date())

    // Build child summaries
    const childSummaries: ChildSummary[] = []
    let totalMinutes = 0
    let totalRewards = 0
    let totalAccuracy = 0
    let totalSessionsForAvg = 0
    let childrenOnTrackToday = 0

    for (const child of children) {
      // Get sessions this week
      const sessions = await prisma.session.findMany({
        where: {
          userId: child.id,
          startTime: {
            gte: weekStart
          },
          completed: true
        },
        select: {
          duration: true,
          accuracy: true,
          startTime: true
        }
      })

      // Calculate minutes and avg accuracy
      const minutesThisWeek = sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60
      const sessionsThisWeek = sessions.length
      const avgAccuracyThisWeek = sessionsThisWeek > 0
        ? sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessionsThisWeek
        : 0

      // Get last played time
      const lastSession = await prisma.session.findFirst({
        where: {
          userId: child.id,
          completed: true
        },
        orderBy: {
          startTime: 'desc'
        },
        select: {
          startTime: true
        }
      })
      const lastPlayedAt = lastSession?.startTime || null

      // Check if played today
      if (hasPlayedToday(lastPlayedAt)) {
        childrenOnTrackToday++
      }

      // Get streak
      const currentStreakDays = await getCurrentStreak(child.id)

      // Get rewards this week
      const rewards = await prisma.reward.findMany({
        where: {
          userId: child.id,
          weekStart: weekStart
        },
        select: {
          amountPence: true
        }
      })
      const rewardsThisWeekPence = rewards.reduce((sum, r) => sum + r.amountPence, 0)

      // Add to family totals
      totalMinutes += minutesThisWeek
      totalRewards += rewardsThisWeekPence
      if (sessionsThisWeek > 0) {
        totalAccuracy += avgAccuracyThisWeek * sessionsThisWeek
        totalSessionsForAvg += sessionsThisWeek
      }

      childSummaries.push({
        id: child.id,
        name: child.name,
        avatar: child.avatar,
        minutesThisWeek: Math.round(minutesThisWeek),
        sessionsThisWeek,
        avgAccuracyThisWeek: Math.round(avgAccuracyThisWeek),
        currentStreakDays,
        rewardsThisWeekPence,
        lastPlayedAt: lastPlayedAt?.toISOString() || null
      })
    }

    // Calculate family avg accuracy (weighted by sessions)
    const familyAvgAccuracy = totalSessionsForAvg > 0
      ? Math.round(totalAccuracy / totalSessionsForAvg)
      : 0

    const response: ParentOverviewResponse = {
      children: childSummaries,
      family: {
        totalMinutesThisWeek: Math.round(totalMinutes),
        totalRewardsThisWeekPence: totalRewards,
        avgAccuracyThisWeek: familyAvgAccuracy,
        childrenOnTrackToday,
        totalChildren: children.length
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Parent overview API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch parent overview' },
      { status: 500 }
    )
  }
}
