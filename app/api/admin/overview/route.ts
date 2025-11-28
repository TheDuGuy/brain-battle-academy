/**
 * Admin Overview API
 *
 * GET /api/admin/overview
 *
 * Returns global overview of all children and families.
 * Only accessible to ADMIN users.
 *
 * TODO: Derive adminId from authenticated session instead of query param.
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
  parentName: string | null
  parentId: string | null

  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
  currentStreakDays: number
  rewardsThisWeekPence: number
  lastPlayedAt: string | null
}

type AdminOverviewResponse = {
  global: {
    totalChildren: number
    totalParents: number
    totalMinutesThisWeek: number
    totalRewardsThisWeekPence: number
    avgAccuracyThisWeek: number
  }
  children: ChildSummary[]
}

// ============================================================================
// Helper Functions
// ============================================================================

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
    // TODO: Get authenticated admin from session/cookie
    // For now, we'll accept adminId as a query param
    const { searchParams } = new URL(request.url)
    const adminId = searchParams.get('adminId')

    if (!adminId) {
      return NextResponse.json(
        { error: 'Admin ID required' },
        { status: 400 }
      )
    }

    // Verify the user is an ADMIN
    const admin = await prisma.user.findUnique({
      where: { id: adminId }
    })

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: ADMIN role required' },
        { status: 403 }
      )
    }

    // Get all PLAYER users (across all families)
    const allPlayers = await prisma.user.findMany({
      where: {
        role: 'PLAYER'
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        parentId: true
      }
    })

    // Get all PARENT users for counting
    const allParents = await prisma.user.findMany({
      where: {
        role: 'PARENT'
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

    for (const player of allPlayers) {
      // Get parent info
      let parentName: string | null = null
      if (player.parentId) {
        const parent = await prisma.user.findUnique({
          where: { id: player.parentId },
          select: { name: true }
        })
        parentName = parent?.name || null
      }

      // Get sessions this week
      const sessions = await prisma.session.findMany({
        where: {
          userId: player.id,
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
          userId: player.id,
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

      // Get streak
      const streak = await prisma.streak.findUnique({
        where: {
          userId_weekStart: {
            userId: player.id,
            weekStart
          }
        }
      })
      const currentStreakDays = streak?.currentStreak || 0

      // Get rewards this week
      const rewards = await prisma.reward.findMany({
        where: {
          userId: player.id,
          weekStart: weekStart
        },
        select: {
          amountPence: true
        }
      })
      const rewardsThisWeekPence = rewards.reduce((sum, r) => sum + r.amountPence, 0)

      // Add to global totals
      totalMinutes += minutesThisWeek
      totalRewards += rewardsThisWeekPence
      if (sessionsThisWeek > 0) {
        totalAccuracy += avgAccuracyThisWeek * sessionsThisWeek
        totalSessionsForAvg += sessionsThisWeek
      }

      childSummaries.push({
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        parentName,
        parentId: player.parentId,
        minutesThisWeek: Math.round(minutesThisWeek),
        sessionsThisWeek,
        avgAccuracyThisWeek: Math.round(avgAccuracyThisWeek),
        currentStreakDays,
        rewardsThisWeekPence,
        lastPlayedAt: lastPlayedAt?.toISOString() || null
      })
    }

    // Calculate global avg accuracy (weighted by sessions)
    const globalAvgAccuracy = totalSessionsForAvg > 0
      ? Math.round(totalAccuracy / totalSessionsForAvg)
      : 0

    const response: AdminOverviewResponse = {
      global: {
        totalChildren: allPlayers.length,
        totalParents: allParents.length,
        totalMinutesThisWeek: Math.round(totalMinutes),
        totalRewardsThisWeekPence: totalRewards,
        avgAccuracyThisWeek: globalAvgAccuracy
      },
      children: childSummaries
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Admin overview API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin overview' },
      { status: 500 }
    )
  }
}
