/**
 * Pure domain logic for rewards and streak calculation
 * All business rules for coins and streaks are contained here
 * This module has zero dependencies on database or HTTP layers
 *
 * NOTE: The database field is still called "amountPence" for backwards compatibility,
 * but we now treat it as "coins" (not real currency). Parents decide what coins are worth.
 */

import { DateTime } from 'luxon'

// ============================================================================
// Types
// ============================================================================

export type SubjectType = 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'

export type SessionInput = {
  userId: string
  gameId: string
  subject: SubjectType
  startedAt: Date
  endedAt: Date
  totalQuestions: number
  correctAnswers: number
}

export type RewardType = 'HIGH_ACCURACY' | 'STREAK'

export type ExistingReward = {
  type: RewardType
  createdAt: Date
  amountPence: number // NOTE: This is now "coins" (kept as amountPence for DB compatibility)
  weekStart: Date
}

export type DaySummary = {
  date: Date // calendar day (midnight in Europe/London)
  totalDurationSec: number
}

export type EvaluateRewardsInput = {
  newSession: SessionInput
  recentSessions: SessionInput[] // last ~30 days
  existingRewards: ExistingReward[]
}

export type EvaluateRewardsOutput = {
  newRewards: {
    type: RewardType
    amountPence: number // NOTE: This is now "coins" (kept as amountPence for DB compatibility)
    reason: string
    weekStart: Date
  }[]
  currentStreakDays: number
}

// ============================================================================
// Constants
// ============================================================================

const TIMEZONE = 'Europe/London'
const DAILY_COMPLETION_SECONDS = 900 // 15 minutes

// Daily reward requirements: 15/15 perfect score + all 4 subjects played today
export const MIN_QUESTIONS_FOR_ACCURACY_REWARD = 15
export const REQUIRED_ACCURACY_FOR_REWARD = 1.0 // 100%
const ALL_SUBJECTS: SubjectType[] = ['MATHS', 'ENGLISH', 'VR', 'NVR']

const STREAK_TARGET_DAYS = 7

// Coin rewards (parents decide what coins are worth)
export const PERFECT_SESSION_COINS = 50 // Coins for daily challenge (15/15 perfect + all subjects)
export const STREAK_REWARD_COINS = 50 // Coins for 7-day streak

// Legacy names kept for DB compatibility (these map to coins now)
const DAILY_CHALLENGE_REWARD_PENCE = PERFECT_SESSION_COINS
const STREAK_REWARD_PENCE = STREAK_REWARD_COINS

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert a Date to London timezone DateTime
 */
function toLondonTime(date: Date): DateTime {
  return DateTime.fromJSDate(date, { zone: TIMEZONE })
}

/**
 * Get the start of the calendar day in London timezone
 */
function getCalendarDay(date: Date): Date {
  return toLondonTime(date).startOf('day').toJSDate()
}

/**
 * Get the Monday of the week containing the given date (Europe/London)
 */
function getWeekStart(date: Date): Date {
  const dt = toLondonTime(date)
  // luxon's startOf('week') gives Monday by default
  return dt.startOf('week').toJSDate()
}

/**
 * Calculate duration in seconds between two dates
 */
function calculateDurationSeconds(startedAt: Date, endedAt: Date): number {
  return Math.max(0, (endedAt.getTime() - startedAt.getTime()) / 1000)
}

/**
 * Group sessions by calendar day and sum their durations
 */
function groupSessionsByDay(sessions: SessionInput[]): Map<string, DaySummary> {
  const dayMap = new Map<string, DaySummary>()

  for (const session of sessions) {
    const dayDate = getCalendarDay(session.endedAt) // use end time for day attribution
    const dayKey = dayDate.toISOString()

    const duration = calculateDurationSeconds(session.startedAt, session.endedAt)

    if (dayMap.has(dayKey)) {
      const existing = dayMap.get(dayKey)!
      existing.totalDurationSec += duration
    } else {
      dayMap.set(dayKey, {
        date: dayDate,
        totalDurationSec: duration
      })
    }
  }

  return dayMap
}

/**
 * Check if a day is "completed" (>= 15 minutes of play)
 */
function isDayCompleted(daySummary: DaySummary): boolean {
  return daySummary.totalDurationSec >= DAILY_COMPLETION_SECONDS
}

/**
 * Calculate current streak: consecutive completed days
 *
 * Streak rules:
 * - If today is completed, count backwards from today
 * - If today is NOT completed but yesterday was, count backwards from yesterday
 *   (player still has until end of today to continue their streak)
 * - If neither today nor yesterday are completed, streak is 0 (streak broken)
 */
function calculateStreak(allSessions: SessionInput[], newSession: SessionInput): number {
  // Combine all sessions including the new one
  const allSessionsWithNew = [...allSessions, newSession]
  const dayMap = groupSessionsByDay(allSessionsWithNew)

  // Get completed days sorted descending (most recent first)
  const completedDays = Array.from(dayMap.values())
    .filter(isDayCompleted)
    .map(d => d.date)
    .sort((a, b) => b.getTime() - a.getTime())

  if (completedDays.length === 0) {
    return 0
  }

  const today = getCalendarDay(new Date())
  const yesterday = toLondonTime(today).minus({ days: 1 }).startOf('day').toJSDate()
  const mostRecentCompletedDay = getCalendarDay(completedDays[0])

  // Determine the starting point for streak calculation
  let streakStartDay: Date
  let initialStreak: number

  if (mostRecentCompletedDay.getTime() === today.getTime()) {
    // Today is completed - count from today
    streakStartDay = today
    initialStreak = 1
  } else if (mostRecentCompletedDay.getTime() === yesterday.getTime()) {
    // Yesterday was completed, today not yet - streak still valid, count from yesterday
    streakStartDay = yesterday
    initialStreak = 1
  } else {
    // Neither today nor yesterday completed - streak is broken
    return 0
  }

  // Count consecutive days backwards from the starting point
  let streak = initialStreak
  let expectedPrevDay = toLondonTime(streakStartDay).minus({ days: 1 }).startOf('day')

  for (let i = 1; i < completedDays.length; i++) {
    const dayDate = getCalendarDay(completedDays[i])

    if (dayDate.getTime() === expectedPrevDay.toJSDate().getTime()) {
      streak++
      expectedPrevDay = expectedPrevDay.minus({ days: 1 })
    } else {
      // Gap found, streak ends
      break
    }
  }

  return streak
}

/**
 * Check if all 4 subjects have been played today (including the new session)
 */
function hasPlayedAllSubjectsToday(
  allSessions: SessionInput[],
  newSession: SessionInput
): boolean {
  const today = getCalendarDay(new Date())
  const todayKey = today.toISOString()

  // Get all sessions from today (including the new one)
  const allSessionsWithNew = [...allSessions, newSession]
  const todaySessions = allSessionsWithNew.filter(session => {
    const sessionDay = getCalendarDay(session.endedAt)
    return sessionDay.toISOString() === todayKey
  })

  // Get unique subjects played today
  const subjectsPlayedToday = new Set(todaySessions.map(s => s.subject))

  // Check if all 4 subjects have been played
  return ALL_SUBJECTS.every(subject => subjectsPlayedToday.has(subject))
}

/**
 * Check if there's a 15/15 perfect score today (including the new session)
 */
function hasPerfectScoreToday(
  allSessions: SessionInput[],
  newSession: SessionInput
): boolean {
  const today = getCalendarDay(new Date())
  const todayKey = today.toISOString()

  // Get all sessions from today (including the new one)
  const allSessionsWithNew = [...allSessions, newSession]
  const todaySessions = allSessionsWithNew.filter(session => {
    const sessionDay = getCalendarDay(session.endedAt)
    return sessionDay.toISOString() === todayKey
  })

  // Check if any session has 15/15 perfect score
  return todaySessions.some(session =>
    session.totalQuestions >= MIN_QUESTIONS_FOR_ACCURACY_REWARD &&
    session.correctAnswers === session.totalQuestions
  )
}

/**
 * Check if a DAILY_CHALLENGE reward already exists for today
 */
function hasDailyChallengeRewardToday(
  existingRewards: ExistingReward[]
): boolean {
  const today = getCalendarDay(new Date())
  const todayKey = today.toISOString()

  return existingRewards.some(reward => {
    const rewardDay = getCalendarDay(reward.createdAt)
    return reward.type === 'HIGH_ACCURACY' &&
           rewardDay.toISOString() === todayKey
  })
}

/**
 * Check if a STREAK reward already exists for the current week
 */
function hasStreakRewardThisWeek(
  existingRewards: ExistingReward[],
  weekStart: Date
): boolean {
  const weekStartKey = weekStart.toISOString()

  return existingRewards.some(
    reward =>
      reward.type === 'STREAK' &&
      reward.weekStart.toISOString() === weekStartKey
  )
}

// ============================================================================
// Main Function
// ============================================================================

/**
 * Evaluate rewards for a new session
 *
 * This is a pure function that implements all reward business logic:
 * - DAILY_CHALLENGE (HIGH_ACCURACY): 50 coins for completing all 4 subjects + 15/15 perfect score (once per day)
 * - STREAK: 50 coins for 7 consecutive completed days (once per week)
 *
 * Parents decide what coins are worth (pocket money, screen time, treats, or just progress tracking).
 *
 * @param input - The new session and context (recent sessions, existing rewards)
 * @returns New rewards to grant and updated streak count
 */
export function evaluateRewards(input: EvaluateRewardsInput): EvaluateRewardsOutput {
  const { newSession, recentSessions, existingRewards } = input
  const newRewards: EvaluateRewardsOutput['newRewards'] = []

  // Get current week start for streak reward tracking
  const currentWeekStart = getWeekStart(newSession.endedAt)

  // -------------------------------------------------------------------------
  // 1. Check DAILY CHALLENGE reward
  //    Requirements: All 4 subjects played today + at least one 15/15 perfect score
  // -------------------------------------------------------------------------
  const playedAllSubjects = hasPlayedAllSubjectsToday(recentSessions, newSession)
  const hasPerfectScore = hasPerfectScoreToday(recentSessions, newSession)
  const alreadyEarnedToday = hasDailyChallengeRewardToday(existingRewards)

  if (playedAllSubjects && hasPerfectScore && !alreadyEarnedToday) {
    newRewards.push({
      type: 'HIGH_ACCURACY',
      amountPence: DAILY_CHALLENGE_REWARD_PENCE,
      reason: `Daily Challenge Complete! +${PERFECT_SESSION_COINS} coins`,
      weekStart: currentWeekStart
    })
  }

  // -------------------------------------------------------------------------
  // 2. Calculate streak and check STREAK reward
  // -------------------------------------------------------------------------
  const currentStreakDays = calculateStreak(recentSessions, newSession)

  if (currentStreakDays >= STREAK_TARGET_DAYS) {
    // Check if reward already granted this week
    if (!hasStreakRewardThisWeek(existingRewards, currentWeekStart)) {
      newRewards.push({
        type: 'STREAK',
        amountPence: STREAK_REWARD_PENCE,
        reason: `${currentStreakDays}-day streak! +${STREAK_REWARD_COINS} coins`,
        weekStart: currentWeekStart
      })
    }
  }

  return {
    newRewards,
    currentStreakDays
  }
}

// ============================================================================
// Utility Functions (for use by other modules)
// ============================================================================

/**
 * Calculate total coins from reward records
 * (Field is called amountPence for DB compatibility, but represents coins)
 */
export function calculateTotalEarnings(rewards: ExistingReward[]): number {
  return rewards.reduce((sum, reward) => sum + reward.amountPence, 0)
}

/**
 * Alias for calculateTotalEarnings - clearer name for coin system
 */
export function calculateTotalCoins(rewards: ExistingReward[]): number {
  return calculateTotalEarnings(rewards)
}

/**
 * Get the week start date for a given date (exported for consistency)
 */
export function getWeekStartDate(date: Date): Date {
  return getWeekStart(date)
}

/**
 * Get calendar day start for a given date (exported for consistency)
 */
export function getCalendarDayStart(date: Date): Date {
  return getCalendarDay(date)
}

/**
 * Calculate streak from existing sessions only (for dashboard display)
 * This is similar to calculateStreak but doesn't require a new session
 */
export function calculateCurrentStreak(sessions: SessionInput[]): number {
  if (sessions.length === 0) {
    return 0
  }

  const dayMap = groupSessionsByDay(sessions)

  // Get completed days sorted descending (most recent first)
  const completedDays = Array.from(dayMap.values())
    .filter(isDayCompleted)
    .map(d => d.date)
    .sort((a, b) => b.getTime() - a.getTime())

  if (completedDays.length === 0) {
    return 0
  }

  const today = getCalendarDay(new Date())
  const yesterday = toLondonTime(today).minus({ days: 1 }).startOf('day').toJSDate()
  const mostRecentCompletedDay = getCalendarDay(completedDays[0])

  // Determine the starting point for streak calculation
  let streakStartDay: Date
  let initialStreak: number

  if (mostRecentCompletedDay.getTime() === today.getTime()) {
    // Today is completed - count from today
    streakStartDay = today
    initialStreak = 1
  } else if (mostRecentCompletedDay.getTime() === yesterday.getTime()) {
    // Yesterday was completed, today not yet - streak still valid, count from yesterday
    streakStartDay = yesterday
    initialStreak = 1
  } else {
    // Neither today nor yesterday completed - streak is broken
    return 0
  }

  // Count consecutive days backwards from the starting point
  let streak = initialStreak
  let expectedPrevDay = toLondonTime(streakStartDay).minus({ days: 1 }).startOf('day')

  for (let i = 1; i < completedDays.length; i++) {
    const dayDate = getCalendarDay(completedDays[i])

    if (dayDate.getTime() === expectedPrevDay.toJSDate().getTime()) {
      streak++
      expectedPrevDay = expectedPrevDay.minus({ days: 1 })
    } else {
      // Gap found, streak ends
      break
    }
  }

  return streak
}
