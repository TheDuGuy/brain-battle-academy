import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/leaderboard - Get leaderboard with all players
export async function GET() {
  try {
    // Get all users with their progress and rewards
    const users = await prisma.user.findMany({
      include: {
        progress: true,
        rewards: true,
        sessions: {
          where: { completed: true },
          select: {
            accuracy: true
          }
        }
      }
    })

    // Calculate leaderboard data for each user
    const leaderboard = users.map(user => {
      const totalStars = user.progress.reduce((sum, p) => sum + p.totalStars, 0)

      // Calculate total earnings from rewards (stored in pence)
      const totalEarningsPence = user.rewards.reduce((sum, r) => sum + r.amountPence, 0)
      const totalEarnings = totalEarningsPence / 100 // Convert pence to pounds

      const gamesPlayed = user.sessions.length
      const avgAccuracy = gamesPlayed > 0
        ? user.sessions.reduce((sum, s) => sum + s.accuracy, 0) / gamesPlayed
        : 0

      return {
        name: user.name,
        avatar: user.avatar || '🎮',
        totalStars,
        earnings: totalEarnings,
        gamesPlayed,
        accuracy: Math.round(avgAccuracy)
      }
    })

    // Sort by total stars (descending)
    leaderboard.sort((a, b) => b.totalStars - a.totalStars)

    // Filter out players with no games played
    const activeLeaderboard = leaderboard.filter(player => player.gamesPlayed > 0)

    return NextResponse.json(activeLeaderboard)
  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
