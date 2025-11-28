'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
import { getGameTheme } from '@/lib/game-themes'
import {
  generateQuickFireQuestion,
  generateCalculatorDetectiveQuestion,
  generateQuizMasterQuestion,
  generateFractionMasterQuestion,
  generatePowerNumbersQuestion,
  generateVocabularyQuestion,
  generateSynonymQuestion,
  generateGrammarQuestion,
  generateSpellingQuestion,
  generateComprehensionQuestion,
  generateAnalogyQuestion,
  generateSequenceQuestion,
  generateCodeQuestion,
  generateOddOneOutQuestion,
  generateLogicPuzzleQuestion,
  generateHiddenWordQuestion,
  generateShapePatternQuestion,
  generateNumberSequenceQuestion,
  generateRotationQuestion,
  generateShapeCompletionQuestion,
  generateMirrorImageQuestion,
  type GameQuestion
} from '@/lib/game-generators'

interface User {
  id: string
  name: string
  avatar: string
  color: string
}

const cheatSheetData = [
  {
    title: 'Square Numbers',
    symbol: '2²',
    icon: '📦',
    description: 'Multiply a number by itself (up to 12×12)',
    color: 'from-blue-400 to-cyan-500',
    numbers: '1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144'
  },
  {
    title: 'Cube Numbers',
    symbol: '2³',
    icon: '🧊',
    description: 'Multiply a number by itself twice (2×2×2 = 8)',
    color: 'from-purple-400 to-pink-500',
    numbers: '1, 8, 27, 64, 125, 216'
  },
  {
    title: 'Prime Numbers',
    symbol: 'P',
    icon: '🔢',
    description: 'Numbers that divide only by themselves and 1',
    color: 'from-green-400 to-emerald-500',
    numbers: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97'
  },
  {
    title: 'Factors',
    symbol: '÷',
    icon: '🔨',
    description: 'Whole numbers that divide into a number exactly',
    color: 'from-orange-400 to-red-500',
    numbers: 'Example: Factors of 12 are 1, 2, 3, 4, 6, 12'
  },
  {
    title: 'Multiples',
    symbol: '×',
    icon: '✖️',
    description: 'Numbers you get when you multiply',
    color: 'from-pink-400 to-rose-500',
    numbers: 'Example: Multiples of 3 are 3, 6, 9, 12, 15, 18...'
  }
]

const gameConfig: Record<string, { name: string; description: string; icon: string }> = {
  'quick-fire': {
    name: 'Quick Fire',
    description: 'Fast-paced arithmetic practice',
    icon: '⚡'
  },
  'calculator-detective': {
    name: 'Calculator Detective',
    description: 'Find and fix calculation errors',
    icon: '🔍'
  },
  'quiz-master': {
    name: 'Quiz Master',
    description: 'Multiple choice challenges',
    icon: '✓'
  },
  'fraction-master': {
    name: 'Fraction Master',
    description: 'Fractions, decimals & percentages',
    icon: '🍰'
  },
  'power-numbers': {
    name: 'Power Numbers',
    description: 'Squares, cubes and primes',
    icon: '💪'
  },
  'problem-solver': {
    name: 'Problem Solver',
    description: 'Real-world word problems',
    icon: '📖'
  },
  'vocabulary-builder': {
    name: 'Vocabulary Builder',
    description: 'Learn new words and definitions',
    icon: '📚'
  },
  'synonym-finder': {
    name: 'Synonym Finder',
    description: 'Match words with similar meanings',
    icon: '🔤'
  },
  'grammar-guardian': {
    name: 'Grammar Guardian',
    description: 'Master punctuation and grammar',
    icon: '✍️'
  },
  'spelling-ace': {
    name: 'Spelling Ace',
    description: 'Choose the correct spellings',
    icon: '✏️'
  },
  'comprehension-master': {
    name: 'Comprehension Master',
    description: 'Read and understand passages',
    icon: '🎓'
  },
  'word-analogies': {
    name: 'Word Analogies',
    description: 'Complete word relationships',
    icon: '🧩'
  },
  'letter-sequences': {
    name: 'Letter Sequences',
    description: 'Find the next letter in patterns',
    icon: '🔢'
  },
  'word-codes': {
    name: 'Word Codes',
    description: 'Crack the code and decode words',
    icon: '🔐'
  },
  'odd-one-out': {
    name: 'Odd One Out',
    description: 'Find the word that doesn\'t belong',
    icon: '🎯'
  },
  'logic-puzzles': {
    name: 'Logic Puzzles',
    description: 'Solve reasoning challenges',
    icon: '🧠'
  },
  'hidden-words': {
    name: 'Hidden Words',
    description: 'Find words hidden across sentences',
    icon: '🔍'
  },
  'shape-patterns': {
    name: 'Shape Patterns',
    description: 'Find the next shape in the sequence',
    icon: '🔷'
  },
  'number-sequences': {
    name: 'Number Sequences',
    description: 'Complete number patterns',
    icon: '🔢'
  },
  'rotation-patterns': {
    name: 'Rotation Patterns',
    description: 'Predict shape rotations',
    icon: '🔄'
  },
  'shape-completion': {
    name: 'Shape Completion',
    description: 'Complete the missing shapes',
    icon: '🧩'
  },
  'mirror-images': {
    name: 'Mirror Images',
    description: 'Find mirror reflections',
    icon: '🪞'
  }
}

export default function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const resolvedParams = use(params)
  const gameId = resolvedParams.gameId
  const gameTheme = getGameTheme(gameId)
  const config = gameConfig[gameId] || gameConfig['quick-fire']

  const [user, setUser] = useState<User | null>(null)
  const [skillLevel, setSkillLevel] = useState<number>(1)
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, accuracy: 0 })
  const [showCheatSheet, setShowCheatSheet] = useState(false)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null)
  const [earnedRewards, setEarnedRewards] = useState<any[]>([])
  const router = useRouter()

  const hasTimer = gameId === 'quick-fire'

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  // Fetch skill level when user is set
  useEffect(() => {
    if (user && gameId) {
      fetchSkillLevel()
    }
  }, [user, gameId])

  const fetchSkillLevel = async () => {
    if (!user) return

    try {
      // Determine subject based on gameId
      const subject = gameId.includes('quick-fire') || gameId.includes('calculator') ||
                     gameId.includes('quiz') || gameId.includes('fraction') ||
                     gameId.includes('power') || gameId.includes('problem')
                     ? 'MATHS'
                     : gameId.includes('vocabulary') || gameId.includes('synonym') ||
                       gameId.includes('grammar') || gameId.includes('spelling') ||
                       gameId.includes('comprehension')
                     ? 'ENGLISH'
                     : gameId.includes('word') || gameId.includes('letter') ||
                       gameId.includes('code') || gameId.includes('odd') ||
                       gameId.includes('logic')
                     ? 'VR'
                     : 'NVR'

      const res = await fetch(`/api/progress/${user.id}/${gameId}/${subject}`)
      if (res.ok) {
        const data = await res.json()
        setSkillLevel(data.skillLevel || 1)
      }
    } catch (error) {
      console.error('Failed to fetch skill level:', error)
      setSkillLevel(1) // Default to level 1 on error
    }
  }

  // Load saved progress when user is set
  useEffect(() => {
    if (user && gameId) {
      const savedProgress = localStorage.getItem(`game_progress_${user.id}_${gameId}`)
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        setQuestions(progress.questions || [])
        setCurrentIndex(progress.currentIndex || 0)
        setScore(progress.score || 0)
        setLives(progress.lives || 3)
        setTimeLeft(progress.timeLeft || 60)
        setGameStarted(progress.gameStarted || false)
      }
    }
  }, [user, gameId])

  // Save progress whenever key states change
  useEffect(() => {
    if (user && gameId && gameStarted && !gameEnded) {
      const progress = {
        questions,
        currentIndex,
        score,
        lives,
        timeLeft,
        gameStarted
      }
      localStorage.setItem(`game_progress_${user.id}_${gameId}`, JSON.stringify(progress))
    }
  }, [user, gameId, questions, currentIndex, score, lives, timeLeft, gameStarted, gameEnded])

  useEffect(() => {
    if (hasTimer && gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [hasTimer, gameStarted, timeLeft, gameEnded])

  const generateQuestion = (): GameQuestion => {
    switch (gameId) {
      case 'calculator-detective':
        return generateCalculatorDetectiveQuestion()
      case 'quiz-master':
        return generateQuizMasterQuestion()
      case 'fraction-master':
        return generateFractionMasterQuestion()
      case 'power-numbers':
        return generatePowerNumbersQuestion()
      case 'problem-solver':
        return generateQuizMasterQuestion() // Reuse for now
      case 'vocabulary-builder':
        return generateVocabularyQuestion()
      case 'synonym-finder':
        // Use skill-based difficulty for Synonym Finder
        return generateSynonymQuestion(skillLevel)
      case 'grammar-guardian':
        return generateGrammarQuestion()
      case 'spelling-ace':
        return generateSpellingQuestion()
      case 'comprehension-master':
        return generateComprehensionQuestion()
      case 'word-analogies':
        // Use skill-based difficulty for Word Analogies (VR)
        return generateAnalogyQuestion(skillLevel)
      case 'letter-sequences':
        return generateSequenceQuestion()
      case 'word-codes':
        return generateCodeQuestion()
      case 'odd-one-out':
        return generateOddOneOutQuestion()
      case 'logic-puzzles':
        return generateLogicPuzzleQuestion()
      case 'hidden-words':
        return generateHiddenWordQuestion()
      case 'shape-patterns':
        // Use skill-based difficulty for Shape Patterns (NVR)
        return generateShapePatternQuestion(skillLevel)
      case 'number-sequences':
        return generateNumberSequenceQuestion()
      case 'rotation-patterns':
        return generateRotationQuestion()
      case 'shape-completion':
        return generateShapeCompletionQuestion()
      case 'mirror-images':
        return generateMirrorImageQuestion()
      case 'quick-fire':
        // Use skill-based difficulty for Maths Quick Fire
        return generateQuickFireQuestion(skillLevel)
      default:
        return generateQuickFireQuestion(skillLevel)
    }
  }

  const startGame = () => {
    const initialQuestions = Array.from({ length: 15 }, generateQuestion)
    setQuestions(initialQuestions)
    setGameStarted(true)
    setGameStartTime(new Date())
    setTimeLeft(60)
    setScore(0)
    setLives(3)
    setCurrentIndex(0)
    setUserAnswer('')
    setShowAnswer(false)
    setIsWrong(false)
    setGameEnded(false)
    setEarnedRewards([]) // Reset rewards for new game

    // Clear any saved progress when starting new game
    if (user) {
      localStorage.removeItem(`game_progress_${user.id}_${gameId}`)
    }
  }

  const continueGame = () => {
    // Game state already loaded from localStorage
    // Just need to ensure we're not showing answer or wrong state
    setUserAnswer('')
    setShowAnswer(false)
    setIsWrong(false)
  }

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return

    const currentQuestion = questions[currentIndex]
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toString().toLowerCase()

    const updatedQuestions = [...questions]
    updatedQuestions[currentIndex] = {
      ...currentQuestion,
      userAnswer,
      isCorrect
    }
    setQuestions(updatedQuestions)

    if (isCorrect) {
      setScore(score + 1)
      setShowAnswer(false)
      setIsWrong(false)
      setUserAnswer('')

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          endGame()
        }
      }, 500)
    } else {
      setIsWrong(true)
      setShowAnswer(true)
      setLives(lives - 1)

      if (lives - 1 <= 0) {
        setTimeout(() => {
          endGame()
        }, 2000)
      }
    }
  }

  const handleMultipleChoiceAnswer = (option: string) => {
    const currentQuestion = questions[currentIndex]
    const isCorrect = option === currentQuestion.answer.toString()

    const updatedQuestions = [...questions]
    updatedQuestions[currentIndex] = {
      ...currentQuestion,
      userAnswer: option,
      isCorrect
    }
    setQuestions(updatedQuestions)

    if (isCorrect) {
      setScore(score + 1)
      setShowAnswer(false)
      setIsWrong(false)

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          endGame()
        }
      }, 800)
    } else {
      setIsWrong(true)
      setShowAnswer(true)
      setUserAnswer(option)
      setLives(lives - 1)

      if (lives - 1 <= 0) {
        setTimeout(() => {
          endGame()
        }, 2000)
      }
    }
  }

  const handleNextQuestion = () => {
    setUserAnswer('')
    setShowAnswer(false)
    setIsWrong(false)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      endGame()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (showAnswer) {
        handleNextQuestion()
      } else {
        handleSubmitAnswer()
      }
    }
  }

  const endGame = async () => {
    setGameEnded(true)
    const gameEndTime = new Date()

    // FIX: Use questions.length (total in game) not just answered questions
    const total = questions.length
    const correct = questions.filter(q => q.isCorrect).length
    const accuracy = total > 0 ? (correct / total) * 100 : 0
    const stars = Math.floor((accuracy / 100) * 3)
    setSessionStats({ correct, total, accuracy })

    // Save session to database
    if (user && gameStartTime) {
      try {
        const subject = gameId.includes('quick-fire') || gameId.includes('calculator') ||
                       gameId.includes('quiz') || gameId.includes('fraction') ||
                       gameId.includes('power') || gameId.includes('problem')
                       ? 'MATHS'
                       : gameId.includes('vocabulary') || gameId.includes('synonym') ||
                         gameId.includes('grammar') || gameId.includes('spelling') ||
                         gameId.includes('comprehension')
                       ? 'ENGLISH'
                       : gameId.includes('word') || gameId.includes('letter') ||
                         gameId.includes('code') || gameId.includes('odd') ||
                         gameId.includes('logic')
                       ? 'VR'
                       : 'NVR'

        // Debug logging (dev only)
        if (process.env.NODE_ENV === 'development') {
          console.log('🎮 Session Debug:', {
            gameId,
            totalQuestions: total,
            correctAnswers: correct,
            accuracy: accuracy.toFixed(1) + '%',
            meetsRewardCriteria: total >= 10 && correct === total
          })
        }

        const res = await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            gameId,
            subject,
            startedAt: gameStartTime.toISOString(),
            endedAt: gameEndTime.toISOString(),
            totalQuestions: total,
            correctAnswers: correct
          })
        })

        if (res.ok) {
          const data = await res.json()
          console.log('Session saved:', data)

          // Capture rewards from API response
          if (data.newRewards && data.newRewards.length > 0) {
            setEarnedRewards(data.newRewards)
          }

          // Debug: Log reward info
          if (process.env.NODE_ENV === 'development' && data.newRewards) {
            console.log('💰 Rewards earned:', data.newRewards)
          }
        } else {
          const error = await res.json()
          console.error('Failed to save session:', error)
        }
      } catch (error) {
        console.error('Failed to save session:', error)
      }

      // Clear saved progress when game ends
      localStorage.removeItem(`game_progress_${user.id}_${gameId}`)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!user) return null

  const hasSavedProgress = user && localStorage.getItem(`game_progress_${user.id}_${gameId}`)

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full border border-gray-100">
          <div className="text-center">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
              {config.icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {config.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {config.description}
            </p>

            {hasSavedProgress && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
                <p className="text-lg font-semibold text-purple-800 mb-2">
                  🎮 You have a game in progress!
                </p>
                <p className="text-purple-600 text-sm">
                  Continue where you left off or start a new game
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200 text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                How to Play
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <span>Answer 15 questions as fast as you can</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <span>You have 3 lives - wrong answers cost a life</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <span>Wrong answers show the correct solution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                  <span>Use the cheat sheet anytime for help</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">£</span>
                  <span className="font-semibold">Complete all 4 subjects with 15/15 to earn £1 daily!</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              {hasSavedProgress && (
                <button
                  onClick={continueGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                >
                  Continue Game
                </button>
              )}
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                {hasSavedProgress ? 'New Game' : 'Start Game'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameEnded) {
    const stars = Math.floor((sessionStats.accuracy / 100) * 3)
    const perfectScore = sessionStats.correct === sessionStats.total && sessionStats.total === 15
    const wrongAnswers = questions.filter(q => q.isCorrect === false)
    const showConfetti = sessionStats.accuracy >= 80 // Show confetti for 80%+ accuracy

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        {showConfetti && (
          <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 1200}
            height={typeof window !== 'undefined' ? window.innerHeight : 800}
            recycle={false}
            numberOfPieces={perfectScore ? 500 : 200}
            gravity={0.3}
          />
        )}
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full border border-gray-100 max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="text-7xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Great Job, {user.name}!
            </h1>
            <p className="text-gray-600 mb-8">You completed the challenge</p>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Summary</h2>
              <div className="text-5xl font-black text-amber-600 mb-2">
                {sessionStats.correct}/{sessionStats.total}
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-4">
                {sessionStats.accuracy.toFixed(1)}% Accuracy
              </div>
              <div className="flex justify-center gap-1 text-3xl">
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
                {Array.from({ length: 3 - stars }).map((_, i) => (
                  <span key={i} className="opacity-30">⭐</span>
                ))}
              </div>
            </div>

            {earnedRewards.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                <div className="text-5xl mb-3">💰</div>
                <h3 className="text-2xl font-bold text-green-700 mb-1">
                  You earned £{((earnedRewards[0]?.amountPence || 0) / 100).toFixed(2)}!
                </h3>
                <p className="text-green-600">{earnedRewards[0]?.reason || 'Perfect score!'}</p>
              </div>
            )}

            {perfectScore && earnedRewards.length === 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-300">
                <div className="text-5xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold text-blue-700 mb-1">
                  Perfect Score!
                </h3>
                <p className="text-blue-600">Complete all 4 subjects today to earn £1!</p>
              </div>
            )}

            {/* Wrong Answers Summary */}
            {wrongAnswers.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-red-200 text-left">
                <h3 className="text-xl font-bold text-red-700 mb-4 text-center">
                  📚 Questions to Review ({wrongAnswers.length})
                </h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {wrongAnswers.map((q, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-red-100">
                      <p className="text-gray-800 font-medium mb-2">{q.question}</p>
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-red-600">
                          <span className="font-semibold">Your answer:</span> {q.userAnswer || 'No answer'}
                        </p>
                        <p className="text-green-600">
                          <span className="font-semibold">Correct answer:</span> {q.answer}
                        </p>
                        {q.explanation && (
                          <p className="text-gray-500 mt-1 text-xs">{q.explanation}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
              >
                Play Again
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const progressPosition = (score / questions.length) * 100
  const isMultipleChoice = currentQuestion?.options && currentQuestion.options.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      {/* Cheat Sheet Modal */}
      {showCheatSheet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    📖 Special Numbers Cheat Sheet
                  </h2>
                  <p className="text-purple-100 text-sm">Quick reference guide for {user.name}</p>
                </div>
                <button
                  onClick={() => setShowCheatSheet(false)}
                  className="text-3xl hover:scale-110 transition-transform w-10 h-10 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {cheatSheetData.map((section, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    className={`w-full bg-gradient-to-r ${section.color} p-4 flex items-center justify-between hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{section.icon}</div>
                      <div className="text-left">
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          <span className="text-lg opacity-80">{section.symbol}</span>
                          {section.title}
                        </div>
                        <p className="text-white text-xs opacity-90">{section.description}</p>
                      </div>
                    </div>
                    <div className="text-2xl text-white">
                      {expandedSection === index ? '▼' : '▶'}
                    </div>
                  </button>
                  {expandedSection === index && (
                    <div className="bg-white p-4">
                      <p className="text-lg text-gray-800 font-mono">
                        {section.numbers}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header with Back Button and Cheat Sheet */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
        >
          ← Back
        </button>
        <button
          onClick={() => setShowCheatSheet(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 shadow-md"
        >
          📖 Cheat Sheet
        </button>
      </div>

      {/* Progress Track */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          {/* Lives */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-2xl">
                {i < lives ? gameTheme.lifeIcon : gameTheme.emptyLifeIcon}
              </span>
            ))}
            <span className="text-sm text-gray-600 ml-2 font-medium">{lives} lives left</span>
          </div>

          {/* Progress Track */}
          <div className="relative bg-gray-100 rounded-full h-10 mb-4">
            {/* Obstacles/Waypoints */}
            {gameTheme.obstacles.map((obstacle, i) => (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${(i + 1) * 25}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {obstacle}
              </div>
            ))}
            {/* Progress Character */}
            <div
              className="absolute text-3xl transition-all duration-500 ease-out"
              style={{
                left: `${progressPosition}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {gameTheme.progressCharacter}
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {15 - score} more to reach the trophy!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className={`grid ${hasTimer ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
          {hasTimer && (
            <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-200">
              <div className="text-3xl mb-2">⏰</div>
              <div className="text-2xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
              <div className="text-xs text-gray-600 mt-1 font-medium">Time Left</div>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-200">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-xs text-gray-600 mt-1 font-medium">Score</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-200">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-xs text-gray-600 mt-1 font-medium">Streak</div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <p className="text-gray-600 font-medium mb-2">Question {currentIndex + 1} of {questions.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center whitespace-pre-line">
            {currentQuestion?.question}
          </h2>

          {!isMultipleChoice ? (
            <>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your answer"
                autoFocus
                disabled={showAnswer}
                className={`w-full text-3xl text-center border-2 rounded-xl py-5 px-4 mb-4 outline-none transition-all font-bold ${
                  isWrong
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-gray-900 bg-white placeholder:text-gray-400'
                }`}
              />

              {showAnswer && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 mb-4">
                  <p className="text-xl font-bold text-green-700 text-center mb-2">
                    ✓ Correct Answer: {currentQuestion.answer}
                  </p>
                  {currentQuestion.explanation && (
                    <p className="text-gray-700 text-center text-sm">
                      {currentQuestion.explanation}
                    </p>
                  )}
                </div>
              )}

              {showAnswer ? (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl text-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              )}
            </>
          ) : (
            <>
              {showAnswer && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 mb-6">
                  <p className="text-xl font-bold text-green-700 text-center">
                    ✓ Correct Answer: {currentQuestion.answer}
                  </p>
                </div>
              )}

              {!showAnswer ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleMultipleChoiceAnswer(option)}
                      className="bg-gray-50 hover:bg-purple-50 border-2 border-gray-300 hover:border-purple-500 text-gray-800 py-4 px-6 rounded-xl text-lg font-semibold transition-all text-left"
                    >
                      <span className="text-purple-600 font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md"
                >
                  Next Question →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
