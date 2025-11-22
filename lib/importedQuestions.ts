/**
 * Helper module for fetching imported questions from PDFs
 *
 * This module provides functions to query the database for questions
 * that have been imported from 11+ exam papers.
 */

import { prisma } from './prisma'

// ============================================================================
// Types
// ============================================================================

export type GameTag =
  | 'QUIZ_MASTER'
  | 'SYNONYM_FINDER'
  | 'MATHS_QUICK_FIRE'
  | 'CALCULATOR_CHALLENGE'
  | 'VR_PUZZLE'
  | 'NVR_PATTERN_MATCH'
  | 'COMPREHENSION_MASTER'
  | 'WEEKLY_PAPER'

export type SubjectType = 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'SHORT_ANSWER'
  | 'SYNONYM'
  | 'COMPREHENSION'
  | 'NUMERIC'

export interface ImportedQuestionDTO {
  id: string
  subject: SubjectType
  type: QuestionType
  number: number | null
  prompt: string
  options: string[] | null
  answer: string | null
  explanation: string | null
  sourceId: string
  sourceTitle: string
}

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Get random imported questions for a specific game and subject
 *
 * @param gameTag - The game tag to filter by (e.g. 'QUIZ_MASTER')
 * @param subject - Subject filter (optional)
 * @param limit - Maximum number of questions to return
 * @returns Array of questions suitable for the game
 */
export async function getImportedQuestionsForGame(
  gameTag: GameTag,
  subject: SubjectType | null,
  limit: number
): Promise<ImportedQuestionDTO[]> {
  // Build where clause
  const where: any = {
    gameTags: {
      contains: gameTag // SQLite: check if JSON string contains the tag
    }
  }

  if (subject) {
    where.subject = subject
  }

  // Fetch questions
  const questions = await prisma.importedQuestion.findMany({
    where,
    include: {
      source: {
        select: {
          title: true
        }
      }
    },
    take: limit * 3 // Fetch more than needed for randomization
  })

  // Shuffle and take the requested amount
  const shuffled = shuffleArray(questions)
  const selected = shuffled.slice(0, limit)

  // Map to DTO
  return selected.map(q => ({
    id: q.id,
    subject: q.subject as SubjectType,
    type: q.type as QuestionType,
    number: q.number,
    prompt: q.prompt,
    options: q.optionsJson ? JSON.parse(q.optionsJson) : null,
    answer: q.answer,
    explanation: q.explanation,
    sourceId: q.sourceId,
    sourceTitle: q.source.title
  }))
}

/**
 * Get questions for the Weekly Paper Challenge
 *
 * This selects a contiguous block of questions from a single source
 * to simulate taking a section of a real exam paper.
 *
 * @param userId - User ID (for future personalization/tracking)
 * @param subject - Subject preference (optional)
 * @param length - Number of questions to include in the paper
 * @returns Sequential questions from a single source
 */
export async function getMiniPaperForUser(
  userId: string,
  subject: SubjectType | null,
  length: number
): Promise<ImportedQuestionDTO[]> {
  // Find sources with enough questions
  const sourceWhere: any = {}
  if (subject) {
    sourceWhere.subject = subject
  }

  const sources = await prisma.sourceMaterial.findMany({
    where: sourceWhere,
    include: {
      questions: {
        orderBy: {
          number: 'asc' // Order by question number
        }
      }
    }
  })

  // Filter sources that have enough questions
  const viableSources = sources.filter(s => s.questions.length >= length)

  if (viableSources.length === 0) {
    // Fallback: just get any questions if no single source has enough
    console.warn(`No single source has ${length} questions. Falling back to mixed questions.`)
    return getImportedQuestionsForGame('WEEKLY_PAPER', subject, length)
  }

  // Pick a random source
  const selectedSource = viableSources[Math.floor(Math.random() * viableSources.length)]

  // Pick a random starting point (ensure we can get 'length' questions)
  const maxStart = Math.max(0, selectedSource.questions.length - length)
  const startIndex = Math.floor(Math.random() * (maxStart + 1))

  // Take a contiguous block
  const selectedQuestions = selectedSource.questions.slice(startIndex, startIndex + length)

  // Map to DTO
  return selectedQuestions.map(q => ({
    id: q.id,
    subject: q.subject as SubjectType,
    type: q.type as QuestionType,
    number: q.number,
    prompt: q.prompt,
    options: q.optionsJson ? JSON.parse(q.optionsJson) : null,
    answer: q.answer,
    explanation: q.explanation,
    sourceId: q.sourceId,
    sourceTitle: selectedSource.title
  }))
}

/**
 * Get questions by specific type
 *
 * Useful for games that need specific question formats
 */
export async function getQuestionsByType(
  type: QuestionType,
  subject: SubjectType | null,
  limit: number
): Promise<ImportedQuestionDTO[]> {
  const where: any = { type }
  if (subject) {
    where.subject = subject
  }

  const questions = await prisma.importedQuestion.findMany({
    where,
    include: {
      source: {
        select: {
          title: true
        }
      }
    },
    take: limit * 2 // Fetch extra for randomization
  })

  const shuffled = shuffleArray(questions)
  const selected = shuffled.slice(0, limit)

  return selected.map(q => ({
    id: q.id,
    subject: q.subject as SubjectType,
    type: q.type as QuestionType,
    number: q.number,
    prompt: q.prompt,
    options: q.optionsJson ? JSON.parse(q.optionsJson) : null,
    answer: q.answer,
    explanation: q.explanation,
    sourceId: q.sourceId,
    sourceTitle: q.source.title
  }))
}

/**
 * Get total count of imported questions by criteria
 */
export async function getQuestionCount(
  gameTag?: GameTag,
  subject?: SubjectType | null
): Promise<number> {
  const where: any = {}

  if (gameTag) {
    where.gameTags = { contains: gameTag }
  }

  if (subject) {
    where.subject = subject
  }

  return prisma.importedQuestion.count({ where })
}

/**
 * Check if a user has enough streak to unlock Weekly Paper Challenge
 *
 * @param userId - User ID
 * @returns true if user has 7+ day streak
 */
export async function hasWeeklyPaperUnlocked(userId: string): Promise<boolean> {
  // Get current week's streak
  const now = new Date()
  const weekStart = getWeekStart(now)

  const streak = await prisma.streak.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart
      }
    }
  })

  return (streak?.currentStreak || 0) >= 7
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Get the start of the current week (Monday at midnight)
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}
