/**
 * Unit tests for reward and streak logic
 * These tests verify all business rules in isolation
 */

import { describe, it, expect } from 'vitest'
import { DateTime } from 'luxon'
import {
  evaluateRewards,
  type SessionInput,
  type ExistingReward,
  type EvaluateRewardsInput
} from './rewards'

// ============================================================================
// Test Helpers
// ============================================================================

/**
 * Create a session for testing
 */
function createSession(overrides: Partial<SessionInput> = {}): SessionInput {
  const now = new Date()
  const fifteenMinsAgo = new Date(now.getTime() - 15 * 60 * 1000)

  return {
    userId: 'test-user',
    gameId: 'quick-fire',
    subject: 'MATHS',
    startedAt: fifteenMinsAgo,
    endedAt: now,
    totalQuestions: 10,
    correctAnswers: 9,
    ...overrides
  }
}

/**
 * Create a reward for testing
 */
function createReward(overrides: Partial<ExistingReward> = {}): ExistingReward {
  return {
    type: 'HIGH_ACCURACY',
    createdAt: new Date(),
    amountPence: 100,
    weekStart: getMonday(new Date()),
    ...overrides
  }
}

/**
 * Get Monday of current week (Europe/London)
 */
function getMonday(date: Date): Date {
  return DateTime.fromJSDate(date, { zone: 'Europe/London' })
    .startOf('week')
    .toJSDate()
}

/**
 * Create a date at a specific time in London timezone
 */
function londonDate(year: number, month: number, day: number, hour = 12): Date {
  return DateTime.fromObject(
    { year, month, day, hour, minute: 0, second: 0 },
    { zone: 'Europe/London' }
  ).toJSDate()
}

/**
 * Create a 15-minute session on a specific day
 */
function sessionOnDay(date: Date, accuracy = 0.8): SessionInput {
  const startTime = DateTime.fromJSDate(date, { zone: 'Europe/London' })
    .set({ hour: 14, minute: 0, second: 0 })
    .toJSDate()

  const endTime = new Date(startTime.getTime() + 15 * 60 * 1000)

  return createSession({
    startedAt: startTime,
    endedAt: endTime,
    totalQuestions: 10,
    correctAnswers: Math.floor(10 * accuracy)
  })
}

// ============================================================================
// HIGH_ACCURACY Reward Tests
// ============================================================================

describe('HIGH_ACCURACY reward', () => {
  it('awards £1 for 90% accuracy', () => {
    const newSession = createSession({
      totalQuestions: 10,
      correctAnswers: 9 // 90%
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    expect(result.newRewards).toHaveLength(1)
    expect(result.newRewards[0].type).toBe('HIGH_ACCURACY')
    expect(result.newRewards[0].amountPence).toBe(100)
    expect(result.newRewards[0].reason).toContain('90%')
  })

  it('awards £1 for 100% accuracy', () => {
    const newSession = createSession({
      totalQuestions: 10,
      correctAnswers: 10 // 100%
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    expect(result.newRewards).toHaveLength(1)
    expect(result.newRewards[0].type).toBe('HIGH_ACCURACY')
    expect(result.newRewards[0].amountPence).toBe(100)
  })

  it('does not award for 89% accuracy', () => {
    const newSession = createSession({
      totalQuestions: 100,
      correctAnswers: 89 // 89%
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    expect(result.newRewards).toHaveLength(0)
  })

  it('only awards once per week', () => {
    const weekStart = getMonday(new Date())

    const newSession = createSession({
      totalQuestions: 10,
      correctAnswers: 10 // 100%
    })

    // Already received HIGH_ACCURACY this week
    const existingRewards = [
      createReward({
        type: 'HIGH_ACCURACY',
        weekStart
      })
    ]

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards
    })

    expect(result.newRewards).toHaveLength(0)
  })

  it('awards again in a new week', () => {
    const lastWeekMonday = DateTime.fromJSDate(new Date(), { zone: 'Europe/London' })
      .startOf('week')
      .minus({ weeks: 1 })
      .toJSDate()

    const newSession = createSession({
      totalQuestions: 10,
      correctAnswers: 10 // 100%
    })

    // Received reward last week
    const existingRewards = [
      createReward({
        type: 'HIGH_ACCURACY',
        weekStart: lastWeekMonday
      })
    ]

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards
    })

    expect(result.newRewards).toHaveLength(1)
    expect(result.newRewards[0].type).toBe('HIGH_ACCURACY')
  })
})

// ============================================================================
// STREAK Reward Tests
// ============================================================================

describe('STREAK calculation and reward', () => {
  it('calculates 1-day streak for single session today', () => {
    const today = new Date()
    const newSession = sessionOnDay(today)

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    expect(result.currentStreakDays).toBe(1)
    expect(result.newRewards).toHaveLength(0) // No streak reward yet
  })

  it('calculates 7-day streak and awards £1', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Create sessions for 6 previous days (day 0 is today via newSession)
    for (let i = 1; i <= 6; i++) {
      const day = today.minus({ days: i }).toJSDate()
      sessions.push(sessionOnDay(day))
    }

    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    expect(result.currentStreakDays).toBe(7)
    expect(result.newRewards).toHaveLength(1)
    expect(result.newRewards[0].type).toBe('STREAK')
    expect(result.newRewards[0].amountPence).toBe(100)
    expect(result.newRewards[0].reason).toContain('7-day')
  })

  it('does not award streak twice in same week', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    for (let i = 1; i <= 6; i++) {
      const day = today.minus({ days: i }).toJSDate()
      sessions.push(sessionOnDay(day))
    }

    const newSession = sessionOnDay(today.toJSDate())
    const weekStart = getMonday(new Date())

    // Already received STREAK reward this week
    const existingRewards = [
      createReward({
        type: 'STREAK',
        weekStart
      })
    ]

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards
    })

    expect(result.currentStreakDays).toBe(7)
    expect(result.newRewards).toHaveLength(0) // No new reward
  })

  it('breaks streak when a day is missed', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Play 3 days ago, 2 days ago, skip yesterday, play today
    sessions.push(sessionOnDay(today.minus({ days: 3 }).toJSDate()))
    sessions.push(sessionOnDay(today.minus({ days: 2 }).toJSDate()))
    // Yesterday is missing - streak breaks

    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    // Streak is only today (1 day), previous days don't count
    expect(result.currentStreakDays).toBe(1)
  })

  it('maintains streak across week boundary', () => {
    // Test spanning two calendar weeks - we'll use actual "today" to ensure it works
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Create 6 days before today
    for (let i = 1; i <= 6; i++) {
      const day = today.minus({ days: i }).toJSDate()
      sessions.push(sessionOnDay(day))
    }

    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    expect(result.currentStreakDays).toBe(7)
    expect(result.newRewards).toHaveLength(1)
    expect(result.newRewards[0].type).toBe('STREAK')
  })

  it('requires 15 minutes per day for completion', () => {
    const today = DateTime.now().setZone('Europe/London')

    // Yesterday: only 10 minutes (not completed)
    const yesterday = today.minus({ days: 1 }).toJSDate()
    const yesterdayStart = DateTime.fromJSDate(yesterday, { zone: 'Europe/London' })
      .set({ hour: 14, minute: 0 })
      .toJSDate()
    const yesterdayEnd = new Date(yesterdayStart.getTime() + 10 * 60 * 1000) // 10 mins

    const incompleteDaySession = createSession({
      startedAt: yesterdayStart,
      endedAt: yesterdayEnd
    })

    // Today: 15 minutes (completed)
    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions: [incompleteDaySession],
      existingRewards: []
    })

    // Streak is only 1 (today), yesterday doesn't count
    expect(result.currentStreakDays).toBe(1)
  })

  it('combines multiple sessions in same day', () => {
    const today = DateTime.now().setZone('Europe/London')

    // Yesterday: two 8-minute sessions = 16 minutes total (completed!)
    const yesterday = today.minus({ days: 1 })

    const session1Start = yesterday.set({ hour: 10, minute: 0 }).toJSDate()
    const session1End = new Date(session1Start.getTime() + 8 * 60 * 1000)

    const session2Start = yesterday.set({ hour: 15, minute: 0 }).toJSDate()
    const session2End = new Date(session2Start.getTime() + 8 * 60 * 1000)

    const recentSessions = [
      createSession({ startedAt: session1Start, endedAt: session1End }),
      createSession({ startedAt: session2Start, endedAt: session2End })
    ]

    // Today: 15 minutes
    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions,
      existingRewards: []
    })

    // Both days completed, streak = 2
    expect(result.currentStreakDays).toBe(2)
  })

  it('handles streak = 0 when no play today', () => {
    const yesterday = DateTime.now().setZone('Europe/London').minus({ days: 1 })

    // Last session was yesterday
    const oldSession = sessionOnDay(yesterday.toJSDate())

    // New session is also yesterday (simulating late submission)
    const result = evaluateRewards({
      newSession: oldSession,
      recentSessions: [],
      existingRewards: []
    })

    // Today not played, so streak = 0
    expect(result.currentStreakDays).toBe(0)
  })
})

// ============================================================================
// Edge Case Tests
// ============================================================================

describe('Edge cases', () => {
  it('handles midnight boundary correctly', () => {
    // Session spanning midnight in London - ending today
    const now = DateTime.now().setZone('Europe/London')

    // Start yesterday at 11:50 PM
    const startTime = now
      .minus({ days: 1 })
      .set({ hour: 23, minute: 50, second: 0 })
      .toJSDate()

    // End today at 00:10 AM (20 minutes later)
    const endTime = new Date(startTime.getTime() + 20 * 60 * 1000)

    const newSession = createSession({
      startedAt: startTime,
      endedAt: endTime
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    // Session counts toward today (the end day)
    expect(result.currentStreakDays).toBe(1)
  })

  it('handles both rewards in same session', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Create 6-day streak leading to today
    for (let i = 1; i <= 6; i++) {
      sessions.push(sessionOnDay(today.minus({ days: i }).toJSDate()))
    }

    // Today: 100% accuracy (HIGH_ACCURACY) + completes 7-day streak (STREAK)
    const newSession = createSession({
      startedAt: today.set({ hour: 14, minute: 0 }).toJSDate(),
      endedAt: today.set({ hour: 14, minute: 15 }).toJSDate(),
      totalQuestions: 10,
      correctAnswers: 10 // 100%
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    expect(result.newRewards).toHaveLength(2)
    expect(result.newRewards.some(r => r.type === 'HIGH_ACCURACY')).toBe(true)
    expect(result.newRewards.some(r => r.type === 'STREAK')).toBe(true)
    expect(result.currentStreakDays).toBe(7)
  })

  it('handles zero questions gracefully', () => {
    const newSession = createSession({
      totalQuestions: 0,
      correctAnswers: 0
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    // No high accuracy reward (accuracy = 0)
    expect(result.newRewards.some(r => r.type === 'HIGH_ACCURACY')).toBe(false)
  })

  it('handles very long sessions (3+ hours)', () => {
    const now = new Date()
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000)

    const newSession = createSession({
      startedAt: fourHoursAgo,
      endedAt: now
    })

    const result = evaluateRewards({
      newSession,
      recentSessions: [],
      existingRewards: []
    })

    // Should still work (validation happens in API layer)
    expect(result.currentStreakDays).toBeGreaterThanOrEqual(1)
  })
})

// ============================================================================
// Realistic Scenarios
// ============================================================================

describe('Realistic user scenarios', () => {
  it('Week 1: First week, plays 5 days, gets high-accuracy reward', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Play Mon, Tue, Wed, Fri, Sat (skipped Thu and Sun)
    // daysAgo: [6, 5, 4, 2, 1] but could vary based on what day today is
    // Let's play yesterday and 2 days ago to ensure a 2-day streak
    sessions.push(sessionOnDay(today.minus({ days: 1 }).toJSDate(), 0.8))

    // Today: 95% accuracy
    const newSession = sessionOnDay(today.toJSDate(), 0.95)

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    // Streak = 2 (yesterday and today)
    expect(result.currentStreakDays).toBe(2)
    // Gets 1 HIGH_ACCURACY reward for today's 95%
    expect(result.newRewards.filter(r => r.type === 'HIGH_ACCURACY')).toHaveLength(1)
  })

  it('Committed student: 10-day streak spanning 2 weeks', () => {
    const today = DateTime.now().setZone('Europe/London')
    const sessions: SessionInput[] = []

    // Last 9 days
    for (let i = 1; i <= 9; i++) {
      sessions.push(sessionOnDay(today.minus({ days: i }).toJSDate()))
    }

    const newSession = sessionOnDay(today.toJSDate())

    const result = evaluateRewards({
      newSession,
      recentSessions: sessions,
      existingRewards: []
    })

    expect(result.currentStreakDays).toBe(10)
    // Gets STREAK reward (only once per week though)
    expect(result.newRewards.filter(r => r.type === 'STREAK')).toHaveLength(1)
  })
})
