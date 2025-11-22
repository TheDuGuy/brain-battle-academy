import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    // Get total earnings
    const earnings = await prisma.earning.findMany({
      where: { userId }
    })

    const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0)
    const weekEarnings = earnings
      .filter(e => e.weekStart.getTime() === weekStart.getTime())
      .reduce((sum, e) => sum + e.amount, 0)

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

    // Get recent sessions
    const recentSessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      take: 10
    })

    // Calculate overall stats
    const totalGames = recentSessions.length
    const avgAccuracy = totalGames > 0
      ? recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / totalGames
      : 0

    return NextResponse.json({
      totalStars,
      totalEarnings,
      weekEarnings,
      currentStreak,
      totalGames,
      avgAccuracy,
      recentSessions
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
