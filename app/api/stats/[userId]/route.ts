import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MIN_QUESTIONS_FOR_ACCURACY_REWARD } from '@/lib/rewards'

// GET /api/stats/[userId] - Get user stats for dashboard
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get current week start
    const weekStart = getWeekStart(new Date())

    // Get total stars from all progress records
    const progressRecords = await prisma.progress.findMany({
      where: { userId }
    })

    const totalStars = progressRecords.reduce((sum, p) => sum + p.totalStars, 0)

    // Get total earnings from rewards (stored in pence)
    const rewards = await prisma.reward.findMany({
      where: { userId }
    })

    const totalEarningsPence = rewards.reduce((sum, r) => sum + r.amountPence, 0)
    const totalEarnings = totalEarningsPence / 100 // Convert to pounds

    const weekEarningsPence = rewards
      .filter(r => r.weekStart.getTime() === weekStart.getTime())
      .reduce((sum, r) => sum + r.amountPence, 0)
    const weekEarnings = weekEarningsPence / 100 // Convert to pounds

    // Get current streak
    const streakRecord = await prisma.streak.findUnique({
      where: {
        userId_weekStart: {
          userId,
          weekStart
        }
      }
    })

    const currentStreak = streakRecord?.currentStreak || 0

    // Get today's play time (in minutes)
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todaySessions = await prisma.session.findMany({
      where: {
        userId,
        startTime: {
          gte: todayStart
        }
      }
    })

    // Calculate total play time in minutes
    const todayPlayTimeMs = todaySessions.reduce((total, session) => {
      if (session.endTime) {
        return total + (session.endTime.getTime() - session.startTime.getTime())
      }
      return total
    }, 0)
    const todayPlayTimeMinutes = Math.round(todayPlayTimeMs / 60000)

    // Get recent sessions (last 30 for better recommendation data)
    const recentSessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      take: 30
    })

    // Calculate overall stats
    const totalGames = recentSessions.length
    const avgAccuracy = totalGames > 0
      ? recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / totalGames
      : 0

    // Format game progress for dashboard
    const gameProgress = progressRecords.map(p => ({
      gameType: p.gameType,
      subject: p.subject,
      gamesPlayed: p.gamesPlayed,
      bestAccuracy: p.bestAccuracy,
      totalStars: p.totalStars,
      skillLevel: p.skillLevel
    }))

    // Get last perfect score (10/10 or better)
    // Look at recent sessions (last 90 days) for the most recent perfect score
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const recentCompletedSessions = await prisma.session.findMany({
      where: {
        userId,
        completed: true,
        totalQuestions: {
          gte: MIN_QUESTIONS_FOR_ACCURACY_REWARD
        },
        startTime: {
          gte: ninetyDaysAgo
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    // Filter for perfect scores (correctAnswers === totalQuestions) and get the most recent
    const perfectScoreSession = recentCompletedSessions.find(
      session => session.correctAnswers === session.totalQuestions
    )

    const lastPerfectScore = perfectScoreSession ? {
      gameType: perfectScoreSession.gameType,
      subject: perfectScoreSession.subject,
      correctAnswers: perfectScoreSession.correctAnswers,
      totalQuestions: perfectScoreSession.totalQuestions,
      playedAt: perfectScoreSession.startTime.toISOString()
    } : null

    return NextResponse.json({
      totalStars,
      totalEarnings,
      weekEarnings,
      currentStreak,
      todayPlayTimeMinutes,
      totalGames,
      avgAccuracy,
      recentSessions,
      gameProgress,
      lastPerfectScore
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

// Helper function to get the start of the current week (Monday)
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}
