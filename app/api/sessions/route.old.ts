import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/sessions - Create a new game session
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      gameType,
      subject,
      totalQuestions,
      correctAnswers,
      accuracy,
      duration,
      starsEarned
    } = body

    // Validate required fields
    if (!userId || !gameType || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the session
    const session = await prisma.session.create({
      data: {
        userId,
        gameType,
        subject,
        totalQuestions: totalQuestions || 0,
        correctAnswers: correctAnswers || 0,
        accuracy: accuracy || 0,
        duration: duration || null,
        starsEarned: starsEarned || 0,
        completed: true,
        endTime: new Date()
      }
    })

    // Update or create progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_subject_gameType: {
          userId,
          subject,
          gameType
        }
      },
      update: {
        totalStars: { increment: starsEarned || 0 },
        gamesPlayed: { increment: 1 },
        bestAccuracy: accuracy > 0 ? { set: accuracy } : undefined,
        lastPlayedAt: new Date()
      },
      create: {
        userId,
        subject,
        gameType,
        totalStars: starsEarned || 0,
        gamesPlayed: 1,
        bestAccuracy: accuracy || 0,
        lastPlayedAt: new Date()
      }
    })

    // Check if user earned money (90%+ accuracy)
    let earning = null
    if (accuracy >= 90) {
      const weekStart = getWeekStart(new Date())

      // Check if user already earned this week for 90% accuracy
      const existingEarning = await prisma.earning.findFirst({
        where: {
          userId,
          reason: '90PercentAccuracy',
          weekStart
        }
      })

      if (!existingEarning) {
        earning = await prisma.earning.create({
          data: {
            userId,
            amount: 1,
            reason: '90PercentAccuracy',
            weekStart
          }
        })
      }
    }

    // Update streak
    await updateStreak(userId)

    return NextResponse.json({
      session,
      progress,
      earning,
      message: accuracy >= 90 ? 'Great job! You earned £1!' : 'Session saved successfully'
    })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to save session' },
      { status: 500 }
    )
  }
}

// Helper function to get the start of the current week (Monday)
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

// Helper function to update user's streak
async function updateStreak(userId: string) {
  const weekStart = getWeekStart(new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get or create streak record for this week
  let streak = await prisma.streak.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart
      }
    }
  })

  if (!streak) {
    // Create new streak record for this week
    streak = await prisma.streak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastPlayedDate: today,
        weekStart
      }
    })
  } else {
    const lastPlayed = new Date(streak.lastPlayedDate)
    lastPlayed.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (lastPlayed.getTime() === today.getTime()) {
      // Already played today, no streak update needed
      return streak
    } else if (lastPlayed.getTime() === yesterday.getTime()) {
      // Played yesterday, increment streak
      const newStreak = streak.currentStreak + 1
      streak = await prisma.streak.update({
        where: {
          userId_weekStart: {
            userId,
            weekStart
          }
        },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, streak.longestStreak),
          lastPlayedDate: today
        }
      })

      // Check for 7-day streak reward
      if (newStreak === 7) {
        const existingEarning = await prisma.earning.findFirst({
          where: {
            userId,
            reason: '7DayStreak',
            weekStart
          }
        })

        if (!existingEarning) {
          await prisma.earning.create({
            data: {
              userId,
              amount: 1,
              reason: '7DayStreak',
              weekStart
            }
          })
        }
      }
    } else {
      // Streak broken, reset to 1
      streak = await prisma.streak.update({
        where: {
          userId_weekStart: {
            userId,
            weekStart
          }
        },
        data: {
          currentStreak: 1,
          lastPlayedDate: today
        }
      })
    }
  }

  return streak
}
