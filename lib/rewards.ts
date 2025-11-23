/**
 * Pure domain logic for rewards and streak calculation
 * All business rules for money and streaks are contained here
 * This module has zero dependencies on database or HTTP layers
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
  amountPence: number
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
    amountPence: number
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

// Accuracy reward requirements (10/10 perfect score earns £1)
export const MIN_QUESTIONS_FOR_ACCURACY_REWARD = 10
export const REQUIRED_ACCURACY_FOR_REWARD = 1.0 // 100%

const STREAK_TARGET_DAYS = 7
const HIGH_ACCURACY_REWARD_PENCE = 100 // £1
const STREAK_REWARD_PENCE = 100 // £1

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
 * Calculate current streak: consecutive completed days ending today
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

  // Today must be completed for a streak to exist
  const today = getCalendarDay(new Date())
  const todayKey = today.toISOString()
  const mostRecentCompletedDay = getCalendarDay(completedDays[0])

  // If most recent completed day is not today, streak is 0
  if (mostRecentCompletedDay.getTime() !== today.getTime()) {
    return 0
  }

  // Count consecutive days backwards from today
  let streak = 1
  let expectedPrevDay = toLondonTime(today).minus({ days: 1 }).startOf('day')

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
 * Check if a HIGH_ACCURACY reward already exists for the current week
 */
function hasHighAccuracyRewardThisWeek(
  existingRewards: ExistingReward[],
  weekStart: Date
): boolean {
  const weekStartKey = weekStart.toISOString()

  return existingRewards.some(
    reward =>
      reward.type === 'HIGH_ACCURACY' &&
      reward.weekStart.toISOString() === weekStartKey
  )
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
 * - HIGH_ACCURACY: £1 for 10/10 questions (100% accuracy, once per week)
 * - STREAK: £1 for 7 consecutive completed days (once per week)
 *
 * @param input - The new session and context (recent sessions, existing rewards)
 * @returns New rewards to grant and updated streak count
 */
export function evaluateRewards(input: EvaluateRewardsInput): EvaluateRewardsOutput {
  const { newSession, recentSessions, existingRewards } = input
  const newRewards: EvaluateRewardsOutput['newRewards'] = []

  // Get current week start for reward tracking
  const currentWeekStart = getWeekStart(newSession.endedAt)

  // -------------------------------------------------------------------------
  // 1. Check HIGH_ACCURACY reward (stricter: requires 20+ questions and 100%)
  // -------------------------------------------------------------------------
  const accuracy = newSession.totalQuestions > 0
    ? newSession.correctAnswers / newSession.totalQuestions
    : 0

  const meetsAccuracyRequirements =
    newSession.totalQuestions >= MIN_QUESTIONS_FOR_ACCURACY_REWARD &&
    accuracy >= REQUIRED_ACCURACY_FOR_REWARD

  if (meetsAccuracyRequirements) {
    // Check if reward already granted this week
    if (!hasHighAccuracyRewardThisWeek(existingRewards, currentWeekStart)) {
      newRewards.push({
        type: 'HIGH_ACCURACY',
        amountPence: HIGH_ACCURACY_REWARD_PENCE,
        reason: `Perfect score: ${newSession.correctAnswers}/${newSession.totalQuestions}`,
        weekStart: currentWeekStart
      })
    }
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
        reason: `Completed ${currentStreakDays}-day learning streak`,
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
 * Calculate total earnings from reward records
 */
export function calculateTotalEarnings(rewards: ExistingReward[]): number {
  return rewards.reduce((sum, reward) => sum + reward.amountPence, 0)
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
