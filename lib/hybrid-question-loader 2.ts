/**
 * Hybrid Question Loader
 *
 * Loads questions from the database (imported from PDFs) with fallback to
 * generated questions when DB doesn't have enough content.
 */

import { prisma } from './prisma'
import {
  getImportedQuestionsForGame,
  type GameTag,
  type SubjectType,
  type ImportedQuestionDTO
} from './importedQuestions'
import {
  generateQuickFireQuestion,
  generateQuizMasterQuestion,
  generateSynonymQuestion,
  type GameQuestion
} from './game-generators'

// ============================================================================
// Skill Level Helper
// ============================================================================

/**
 * Get the user's skill level for a specific subject
 * Returns 1 (default) if no progress record exists yet
 */
export async function getSkillLevelForSubject(
  userId: string,
  subject: SubjectType,
  gameType: string
): Promise<number> {
  try {
    const progress = await prisma.progress.findUnique({
      where: {
        userId_subject_gameType: {
          userId,
          subject,
          gameType
        }
      },
      select: {
        skillLevel: true
      }
    })

    return progress?.skillLevel ?? 1
  } catch (error) {
    console.error('Error fetching skill level:', error)
    return 1 // Default to level 1 on error
  }
}

// ============================================================================
// Conversion Functions
// ============================================================================

/**
 * Convert imported question DTO to GameQuestion format
 */
function convertImportedToGameQuestion(imported: ImportedQuestionDTO): GameQuestion {
  return {
    id: imported.id,
    question: imported.prompt,
    answer: imported.answer || '', // If answer is unknown, use empty string
    options: imported.options || undefined,
    userAnswer: '',
    explanation: imported.explanation || undefined
  }
}

// ============================================================================
// Hybrid Loaders by Game Type
// ============================================================================

/**
 * Load questions for Quiz Master (MCQ-focused game)
 * Tries DB first, falls back to generated questions
 *
 * TODO: Add userId parameter and skill-based difficulty for MATHS questions
 */
export async function loadQuizMasterQuestions(
  count: number,
  subject?: 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'
): Promise<GameQuestion[]> {
  try {
    // Try to get from database
    const dbQuestions = await getImportedQuestionsForGame(
      'QUIZ_MASTER',
      subject || null,
      count
    )

    const convertedQuestions = dbQuestions.map(convertImportedToGameQuestion)

    // If we got enough, return them
    if (convertedQuestions.length >= count) {
      return convertedQuestions.slice(0, count)
    }

    // Otherwise, fill remaining with generated questions
    const remaining = count - convertedQuestions.length
    const generatedQuestions = Array.from({ length: remaining }, () =>
      generateQuizMasterQuestion()
    )

    return [...convertedQuestions, ...generatedQuestions]
  } catch (error) {
    console.error('Error loading Quiz Master questions from DB, using generated:', error)
    // Full fallback to generated
    return Array.from({ length: count }, () => generateQuizMasterQuestion())
  }
}

/**
 * Load questions for Synonym Finder
 * Tries DB first (synonym questions), falls back to generated
 *
 * TODO: Add userId parameter and skill-based difficulty for ENGLISH questions
 * (e.g., simple common words at level 1, more complex vocabulary at higher levels)
 */
export async function loadSynonymFinderQuestions(count: number): Promise<GameQuestion[]> {
  try {
    const dbQuestions = await getImportedQuestionsForGame(
      'SYNONYM_FINDER',
      'ENGLISH',
      count
    )

    const convertedQuestions = dbQuestions.map(convertImportedToGameQuestion)

    if (convertedQuestions.length >= count) {
      return convertedQuestions.slice(0, count)
    }

    const remaining = count - convertedQuestions.length
    const generatedQuestions = Array.from({ length: remaining }, () =>
      generateSynonymQuestion()
    )

    return [...convertedQuestions, ...generatedQuestions]
  } catch (error) {
    console.error('Error loading Synonym questions from DB, using generated:', error)
    return Array.from({ length: count }, () => generateSynonymQuestion())
  }
}

/**
 * Load questions for Maths Quick Fire
 * Tries DB first (numeric/MCQ maths), falls back to generated
 * Uses user's skill level to adjust difficulty
 */
export async function loadMathsQuickFireQuestions(
  count: number,
  userId?: string
): Promise<GameQuestion[]> {
  // Get skill level if userId provided
  let skillLevel = 1
  if (userId) {
    skillLevel = await getSkillLevelForSubject(userId, 'MATHS', 'quick-fire')
  }

  try {
    const dbQuestions = await getImportedQuestionsForGame(
      'MATHS_QUICK_FIRE',
      'MATHS',
      count
    )

    const convertedQuestions = dbQuestions.map(convertImportedToGameQuestion)

    if (convertedQuestions.length >= count) {
      return convertedQuestions.slice(0, count)
    }

    const remaining = count - convertedQuestions.length
    const generatedQuestions = Array.from({ length: remaining }, () =>
      generateQuickFireQuestion(skillLevel)
    )

    return [...convertedQuestions, ...generatedQuestions]
  } catch (error) {
    console.error('Error loading Maths Quick Fire questions from DB, using generated:', error)
    return Array.from({ length: count }, () => generateQuickFireQuestion(skillLevel))
  }
}

/**
 * Load questions for Comprehension Master
 */
export async function loadComprehensionQuestions(count: number): Promise<GameQuestion[]> {
  try {
    const dbQuestions = await getImportedQuestionsForGame(
      'COMPREHENSION_MASTER',
      'ENGLISH',
      count
    )

    return dbQuestions.map(convertImportedToGameQuestion)
  } catch (error) {
    console.error('Error loading Comprehension questions from DB:', error)
    return []
  }
}

/**
 * Load questions for VR Puzzles
 *
 * TODO: Add userId parameter and skill-based difficulty for VR questions
 * (e.g., simpler logic puzzles and analogies at level 1, more complex reasoning at higher levels)
 */
export async function loadVRPuzzleQuestions(count: number): Promise<GameQuestion[]> {
  try {
    const dbQuestions = await getImportedQuestionsForGame(
      'VR_PUZZLE',
      'VR',
      count
    )

    return dbQuestions.map(convertImportedToGameQuestion)
  } catch (error) {
    console.error('Error loading VR Puzzle questions from DB:', error)
    return []
  }
}

/**
 * Load questions for NVR Pattern Matching
 *
 * TODO: Add userId parameter and skill-based difficulty for NVR questions
 * (e.g., simpler patterns at level 1, more complex sequences and rotations at higher levels)
 */
export async function loadNVRPatternQuestions(count: number): Promise<GameQuestion[]> {
  try {
    const dbQuestions = await getImportedQuestionsForGame(
      'NVR_PATTERN_MATCH',
      'NVR',
      count
    )

    return dbQuestions.map(convertImportedToGameQuestion)
  } catch (error) {
    console.error('Error loading NVR Pattern questions from DB:', error)
    return []
  }
}

// ============================================================================
// Generic Loader
// ============================================================================

/**
 * Generic question loader that routes to appropriate hybrid loader
 * based on game type
 */
export async function loadQuestionsForGame(
  gameId: string,
  count: number
): Promise<GameQuestion[]> {
  switch (gameId) {
    case 'quiz-master':
    case 'problem-solver':
      return loadQuizMasterQuestions(count)

    case 'synonym-finder':
      return loadSynonymFinderQuestions(count)

    case 'quick-fire':
    case 'calculator-detective':
    case 'power-numbers':
      return loadMathsQuickFireQuestions(count)

    case 'comprehension-master':
      return loadComprehensionQuestions(count)

    case 'word-analogies':
    case 'letter-sequences':
    case 'word-codes':
    case 'odd-one-out':
    case 'logic-puzzles':
      return loadVRPuzzleQuestions(count)

    case 'shape-patterns':
    case 'number-sequences':
    case 'rotation-patterns':
    case 'shape-completion':
    case 'mirror-images':
      return loadNVRPatternQuestions(count)

    default:
      // For games not yet mapped, return empty array
      // The game page will use its own generator as fallback
      return []
  }
}
