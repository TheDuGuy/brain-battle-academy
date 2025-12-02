/**
 * Child Detail API
 *
 * GET /api/parent/child/[userId]
 *
 * Returns detailed stats for a specific child, including:
 * - Weekly summary
 * - Subject breakdown
 * - Recent sessions history
 *
 * Only accessible to the parent who owns this child.
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getWeekStartDate } from '@/lib/rewards'

// ============================================================================
// Types
// ============================================================================

type SubjectStats = {
  subject: 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
}

type RecentSession = {
  id: string
  gameType: string
  subject: string
  accuracy: number
  duration: number // in seconds
  playedAt: string // ISO
  starsEarned: number
}

type ChildDetailResponse = {
  id: string
  name: string
  avatar: string | null

  // Weekly summary
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
  currentStreakDays: number
  rewardsThisWeekPence: number

  // By subject
  subjectStats: SubjectStats[]

  // Recent history
  recentSessions: RecentSession[]
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Map subject string to canonical type
 */
function normalizeSubject(subject: string): 'MATHS' | 'ENGLISH' | 'VR' | 'NVR' {
  const normalized = subject.toUpperCase()
  if (normalized.includes('MATH')) return 'MATHS'
  if (normalized.includes('ENGLISH')) return 'ENGLISH'
  if (normalized.includes('VERBAL') || normalized === 'VR') return 'VR'
  if (normalized.includes('NON') || normalized === 'NVR') return 'NVR'
  return 'MATHS' // default fallback
}

/**
 * Compute per-subject stats from sessions
 */
function computeSubjectStats(sessions: { subject: string; duration?: number | null; accuracy?: number | null }[]): SubjectStats[] {
  const subjectMap = new Map<string, { minutes: number; count: number; totalAccuracy: number }>()

  for (const session of sessions) {
    const subject = normalizeSubject(session.subject)
    const minutes = (session.duration || 0) / 60
    const accuracy = session.accuracy || 0

    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, { minutes: 0, count: 0, totalAccuracy: 0 })
    }

    const stats = subjectMap.get(subject)!
    stats.minutes += minutes
    stats.count += 1
    stats.totalAccuracy += accuracy
  }

  // Convert to array and calculate averages
  const result: SubjectStats[] = []
  const subjects: ('MATHS' | 'ENGLISH' | 'VR' | 'NVR')[] = ['MATHS', 'ENGLISH', 'VR', 'NVR']

  for (const subject of subjects) {
    const stats = subjectMap.get(subject)
    if (stats && stats.count > 0) {
      result.push({
        subject,
        minutesThisWeek: Math.round(stats.minutes),
        sessionsThisWeek: stats.count,
        avgAccuracyThisWeek: Math.round((stats.totalAccuracy / stats.count) * 100)
      })
    } else {
      // Include all subjects even if 0
      result.push({
        subject,
        minutesThisWeek: 0,
        sessionsThisWeek: 0,
        avgAccuracyThisWeek: 0
      })
    }
  }

  return result
}

// ============================================================================
// Main Handler
// ============================================================================

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get('parentId')

    if (!parentId) {
      return NextResponse.json(
        { error: 'Parent ID required' },
        { status: 400 }
      )
    }

    // Verify parent
    const parent = await prisma.user.findUnique({
      where: { id: parentId }
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json(
        { error: 'Unauthorized: PARENT role required' },
        { status: 403 }
      )
    }

    // Verify child belongs to this parent
    const child = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!child || child.parentId !== parentId) {
      return NextResponse.json(
        { error: 'Child not found or not owned by this parent' },
        { status: 404 }
      )
    }

    // Get week start
    const weekStart = getWeekStartDate(new Date())

    // -------------------------------------------------------------------------
    // 1. Weekly Summary
    // -------------------------------------------------------------------------

    // Get all sessions this week
    const weeklySessions = await prisma.session.findMany({
      where: {
        userId,
        startTime: { gte: weekStart },
        completed: true
      },
      select: {
        duration: true,
        accuracy: true,
        subject: true
      }
    })

    const minutesThisWeek = Math.round(
      weeklySessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60
    )
    const sessionsThisWeek = weeklySessions.length
    const avgAccuracyThisWeek = sessionsThisWeek > 0
      ? Math.round(weeklySessions.reduce((sum, s) => sum + s.accuracy, 0) / sessionsThisWeek * 100)
      : 0

    // Get streak
    const streak = await prisma.streak.findUnique({
      where: {
        userId_weekStart: {
          userId,
          weekStart
        }
      }
    })
    const currentStreakDays = streak?.currentStreak || 0

    // Get rewards
    const rewards = await prisma.reward.findMany({
      where: {
        userId,
        weekStart
      }
    })
    const rewardsThisWeekPence = rewards.reduce((sum, r) => sum + r.amountPence, 0)

    // -------------------------------------------------------------------------
    // 2. Subject Breakdown
    // -------------------------------------------------------------------------

    const subjectStats = computeSubjectStats(weeklySessions)

    // -------------------------------------------------------------------------
    // 3. Recent Sessions
    // -------------------------------------------------------------------------

    const recentSessionsRaw = await prisma.session.findMany({
      where: {
        userId,
        completed: true
      },
      orderBy: {
        startTime: 'desc'
      },
      take: 10,
      select: {
        id: true,
        gameType: true,
        subject: true,
        accuracy: true,
        duration: true,
        startTime: true,
        starsEarned: true
      }
    })

    const recentSessions: RecentSession[] = recentSessionsRaw.map(session => ({
      id: session.id,
      gameType: session.gameType,
      subject: session.subject,
      accuracy: Math.round(session.accuracy * 100),
      duration: session.duration || 0,
      playedAt: session.startTime.toISOString(),
      starsEarned: session.starsEarned
    }))

    // -------------------------------------------------------------------------
    // 4. Build Response
    // -------------------------------------------------------------------------

    const response: ChildDetailResponse = {
      id: child.id,
      name: child.name,
      avatar: child.avatar,
      minutesThisWeek,
      sessionsThisWeek,
      avgAccuracyThisWeek,
      currentStreakDays,
      rewardsThisWeekPence,
      subjectStats,
      recentSessions
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Child detail API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch child details' },
      { status: 500 }
    )
  }
}
