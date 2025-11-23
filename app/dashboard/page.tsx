'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  avatar: string
  color: string
}

interface GameCard {
  id: string
  name: string
  description: string
  icon: string
  color: string
  difficulty: number
  subject: string
  topics: string[]
}

interface GameProgress {
  gameType: string
  subject: string
  gamesPlayed: number
  bestAccuracy: number
  totalStars: number
  skillLevel: number
}

const mathsGames: GameCard[] = [
  {
    id: 'quick-fire',
    name: 'Quick Fire',
    description: 'Fast-paced arithmetic practice',
    icon: '⚡',
    color: 'from-red-500 to-orange-500',
    difficulty: 2,
    subject: 'Maths',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division']
  },
  {
    id: 'calculator-detective',
    name: 'Calculator Detective',
    description: 'Find and fix calculation errors',
    icon: '🔍',
    color: 'from-orange-500 to-amber-500',
    difficulty: 3,
    subject: 'Maths',
    topics: ['Error Finding', 'Mental Math', 'Place Value']
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Multiple choice challenges',
    icon: '✓',
    color: 'from-green-500 to-emerald-500',
    difficulty: 3,
    subject: 'Maths',
    topics: ['Area', 'Multiplication', 'Logic']
  },
  {
    id: 'fraction-master',
    name: 'Fraction Master',
    description: 'Fractions, decimals & percentages',
    icon: '🍰',
    color: 'from-pink-500 to-rose-500',
    difficulty: 3,
    subject: 'Maths',
    topics: ['Fractions', 'Decimals', 'Percentages']
  },
  {
    id: 'power-numbers',
    name: 'Power Numbers',
    description: 'Squares, cubes and primes',
    icon: '💪',
    color: 'from-purple-500 to-pink-500',
    difficulty: 3,
    subject: 'Maths',
    topics: ['Squares', 'Cubes', 'Primes']
  },
  {
    id: 'problem-solver',
    name: 'Problem Solver',
    description: 'Real-world word problems',
    icon: '📖',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 4,
    subject: 'Maths',
    topics: ['Word Problems', 'Logic', 'Reasoning']
  }
]

const englishGames: GameCard[] = [
  {
    id: 'vocabulary-builder',
    name: 'Vocabulary Builder',
    description: 'Learn new words and definitions',
    icon: '📚',
    color: 'from-blue-500 to-indigo-500',
    difficulty: 3,
    subject: 'English',
    topics: ['Vocabulary', 'Definitions', 'Word Meaning']
  },
  {
    id: 'synonym-finder',
    name: 'Synonym Finder',
    description: 'Match words with similar meanings',
    icon: '🔤',
    color: 'from-indigo-500 to-purple-500',
    difficulty: 2,
    subject: 'English',
    topics: ['Synonyms', 'Word Relationships', 'Vocabulary']
  },
  {
    id: 'grammar-guardian',
    name: 'Grammar Guardian',
    description: 'Master punctuation and grammar',
    icon: '✍️',
    color: 'from-green-500 to-teal-500',
    difficulty: 3,
    subject: 'English',
    topics: ['Grammar', 'Punctuation', 'Sentence Structure']
  },
  {
    id: 'spelling-ace',
    name: 'Spelling Ace',
    description: 'Choose the correct spellings',
    icon: '✏️',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 2,
    subject: 'English',
    topics: ['Spelling', 'Word Recognition', 'Literacy']
  },
  {
    id: 'comprehension-master',
    name: 'Comprehension Master',
    description: 'Read and understand passages',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    difficulty: 4,
    subject: 'English',
    topics: ['Reading', 'Comprehension', 'Analysis']
  }
]

const verbalReasoningGames: GameCard[] = [
  {
    id: 'word-analogies',
    name: 'Word Analogies',
    description: 'Complete word relationships',
    icon: '🧩',
    color: 'from-emerald-500 to-teal-500',
    difficulty: 3,
    subject: 'Verbal Reasoning',
    topics: ['Analogies', 'Relationships', 'Logic']
  },
  {
    id: 'letter-sequences',
    name: 'Letter Sequences',
    description: 'Find the next letter in patterns',
    icon: '🔢',
    color: 'from-cyan-500 to-blue-500',
    difficulty: 3,
    subject: 'Verbal Reasoning',
    topics: ['Sequences', 'Patterns', 'Alphabet']
  },
  {
    id: 'word-codes',
    name: 'Word Codes',
    description: 'Crack the code and decode words',
    icon: '🔐',
    color: 'from-violet-500 to-purple-500',
    difficulty: 4,
    subject: 'Verbal Reasoning',
    topics: ['Codes', 'Decoding', 'Logic']
  },
  {
    id: 'odd-one-out',
    name: 'Odd One Out',
    description: 'Find the word that doesn\'t belong',
    icon: '🎯',
    color: 'from-rose-500 to-pink-500',
    difficulty: 2,
    subject: 'Verbal Reasoning',
    topics: ['Categories', 'Classification', 'Logic']
  },
  {
    id: 'logic-puzzles',
    name: 'Logic Puzzles',
    description: 'Solve reasoning challenges',
    icon: '🧠',
    color: 'from-amber-500 to-orange-500',
    difficulty: 4,
    subject: 'Verbal Reasoning',
    topics: ['Logic', 'Reasoning', 'Problem Solving']
  }
]

const nonVerbalReasoningGames: GameCard[] = [
  {
    id: 'shape-patterns',
    name: 'Shape Patterns',
    description: 'Find the next shape in the sequence',
    icon: '🔷',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 3,
    subject: 'Non-Verbal Reasoning',
    topics: ['Patterns', 'Shapes', 'Sequences']
  },
  {
    id: 'number-sequences',
    name: 'Number Sequences',
    description: 'Complete number patterns',
    icon: '🔢',
    color: 'from-indigo-500 to-blue-500',
    difficulty: 3,
    subject: 'Non-Verbal Reasoning',
    topics: ['Numbers', 'Sequences', 'Patterns']
  },
  {
    id: 'rotation-patterns',
    name: 'Rotation Patterns',
    description: 'Predict shape rotations',
    icon: '🔄',
    color: 'from-purple-500 to-indigo-500',
    difficulty: 3,
    subject: 'Non-Verbal Reasoning',
    topics: ['Rotation', 'Spatial', 'Transformation']
  },
  {
    id: 'shape-completion',
    name: 'Shape Completion',
    description: 'Complete the missing shapes',
    icon: '🧩',
    color: 'from-green-500 to-emerald-500',
    difficulty: 4,
    subject: 'Non-Verbal Reasoning',
    topics: ['Patterns', 'Grids', 'Completion']
  },
  {
    id: 'mirror-images',
    name: 'Mirror Images',
    description: 'Find mirror reflections',
    icon: '🪞',
    color: 'from-pink-500 to-rose-500',
    difficulty: 2,
    subject: 'Non-Verbal Reasoning',
    topics: ['Reflection', 'Symmetry', 'Spatial']
  }
]

interface PlayerStats {
  name: string
  avatar: string
  totalStars: number
  earnings: number
  gamesPlayed: number
  accuracy: number
}

interface LastPerfectScore {
  gameType: string
  subject: string | null
  correctAnswers: number
  totalQuestions: number
  playedAt: string
}

// Helper to get game progress (level and percentage)
function getGameProgress(
  gameId: string,
  subject: string,
  gameProgressData: GameProgress[]
): { level: number; percentage: number } {
  // Normalize subject for matching
  const normalizedSubject = subject.toUpperCase().replace(/\s/g, '_')

  // Find matching progress record
  const progress = gameProgressData.find(
    p => p.gameType === gameId && p.subject.toUpperCase() === normalizedSubject
  )

  if (!progress || progress.gamesPlayed === 0) {
    return { level: 1, percentage: 0 }
  }

  // Use skillLevel as the base level (clamped 1-5)
  const level = Math.min(Math.max(progress.skillLevel, 1), 5)

  // Calculate percentage based on games played and best accuracy
  // Simple heuristic: weight games played progress with accuracy
  const gamesPlayedProgress = Math.min(progress.gamesPlayed / 10, 1) // Normalize to 0-1
  const accuracyWeight = progress.bestAccuracy / 100 // Convert from percentage (0-100) to decimal (0-1)
  const effectiveProgress = gamesPlayedProgress * accuracyWeight
  const percentage = Math.round(effectiveProgress * 100)

  return { level, percentage }
}

// Helper to get recommended games based on progress
function getRecommendedGames(
  allGames: GameCard[],
  gameProgressData: GameProgress[]
): GameCard[] {
  // Find games with low plays or low accuracy
  const gamesWithProgress = allGames.map(game => {
    const progress = gameProgressData.find(
      p => p.gameType === game.id &&
           p.subject.toUpperCase() === game.subject.toUpperCase().replace(/\s/g, '_')
    )
    return {
      game,
      gamesPlayed: progress?.gamesPlayed || 0,
      bestAccuracy: progress?.bestAccuracy || 0
    }
  })

  // Prioritize games with low plays or low accuracy
  const recommended = gamesWithProgress
    .filter(g => g.gamesPlayed < 5 || g.bestAccuracy < 0.7)
    .sort((a, b) => {
      // Sort by: fewer plays first, then lower accuracy
      if (a.gamesPlayed !== b.gamesPlayed) {
        return a.gamesPlayed - b.gamesPlayed
      }
      return a.bestAccuracy - b.bestAccuracy
    })
    .map(g => g.game)
    .slice(0, 3)

  // Fallback to static list if not enough candidates
  if (recommended.length < 3) {
    const fallbackIds = ['quick-fire', 'synonym-finder', 'word-codes']
    const fallback = allGames.filter(g => fallbackIds.includes(g.id))
    return [...recommended, ...fallback].slice(0, 3)
  }

  return recommended
}

// Helper to format game names
function formatGameName(gameType: string): string {
  const map: Record<string, string> = {
    'quick-fire': 'Maths Quick Fire',
    'synonym-finder': 'Synonym Finder',
    'quiz-master': 'Quiz Master',
    'word-codes': 'Word Codes',
    'calculator-detective': 'Calculator Detective',
    'power-numbers': 'Power Numbers',
    'problem-solver': 'Problem Solver',
    'vocabulary-builder': 'Vocabulary Builder',
    'grammar-guardian': 'Grammar Guardian',
    'spelling-ace': 'Spelling Ace',
    'comprehension-master': 'Comprehension Master',
    'word-analogies': 'Word Analogies',
    'letter-sequences': 'Letter Sequences',
    'odd-one-out': 'Odd One Out',
    'logic-puzzles': 'Logic Puzzles',
    'shape-patterns': 'Shape Patterns',
    'number-sequences': 'Number Sequences',
    'rotation-patterns': 'Rotation Patterns',
    'shape-completion': 'Shape Completion',
    'mirror-images': 'Mirror Images',
    'fraction-master': 'Fraction Master'
  }
  return map[gameType] || gameType
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({ totalStars: 0, earnings: 0, weekEarnings: 0, streak: 0 })
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([])
  const [gameProgress, setGameProgress] = useState<GameProgress[]>([])
  const [lastPerfectScore, setLastPerfectScore] = useState<LastPerfectScore | null>(null)
  const [loading, setLoading] = useState(true)
  const [isViewingAsChild, setIsViewingAsChild] = useState(false)
  const router = useRouter()

  const allGames = [...mathsGames, ...englishGames, ...verbalReasoningGames, ...nonVerbalReasoningGames]
  const recommendedGames = getRecommendedGames(allGames, gameProgress)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Check if this is a parent/admin viewing as child
      const fromParent = sessionStorage.getItem('fromParent')
      const isViewingChild = parsedUser.role === 'PLAYER' && fromParent === '1'
      setIsViewingAsChild(isViewingChild)

      loadDashboardData(parsedUser.id)
    }
  }, [router])

  const loadDashboardData = async (userId: string) => {
    setLoading(true)
    try {
      // Fetch user stats
      const statsRes = await fetch(`/api/stats/${userId}`)
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats({
          totalStars: statsData.totalStars || 0,
          earnings: statsData.totalEarnings || 0,
          weekEarnings: statsData.weekEarnings || 0,
          streak: statsData.currentStreak || 0
        })
        setGameProgress(statsData.gameProgress || [])
        setLastPerfectScore(statsData.lastPerfectScore || null)
      }

      // Fetch leaderboard
      const leaderboardRes = await fetch('/api/leaderboard')
      if (leaderboardRes.ok) {
        const leaderboardData = await leaderboardRes.json()
        setLeaderboard(leaderboardData)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-xl font-semibold text-gray-700">Loading your academy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg">
                <span className="text-4xl">{user.avatar}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}&apos;s Academy</h1>
                <p className="text-gray-600">Master your 11+ skills</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 shadow-lg">
                <span className="text-5xl">🏆</span>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  sessionStorage.removeItem('fromParent')
                  router.push('/login')
                }}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Switch User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* "Viewing as Child" Banner */}
        {isViewingAsChild && (
          <div className="bg-indigo-100 border border-indigo-200 rounded-xl px-4 py-3 mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👀</span>
              <span className="text-indigo-900 text-sm font-medium">
                Viewing as <strong>{user?.name}</strong> (via Parent)
              </span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                sessionStorage.removeItem('fromParent')
                router.push('/login')
              }}
              className="text-indigo-700 hover:text-indigo-900 text-sm font-semibold underline"
            >
              Log out to return to your account
            </button>
          </div>
        )}

        {/* Today's Mission Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-8 shadow-2xl border-2 border-white/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">🎯</span>
                  <h2 className="text-3xl font-bold text-white">Today&apos;s Mission</h2>
                </div>
                <p className="text-white/95 text-lg mb-6">
                  Play 15 minutes today
                </p>

                <div className="space-y-3 mb-6">
                  {/* Daily play status */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stats.streak > 0 ? '✅' : '⭕'}</span>
                    <span className="text-white/90 font-medium">
                      {stats.streak > 0 ? 'Daily play done' : 'Play 15 minutes today'}
                    </span>
                  </div>

                  {/* Accuracy status - TODO: Track daily accuracy */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⭕</span>
                    <span className="text-white/90 font-medium">
                      Aim for one 10/10 perfect score today
                    </span>
                  </div>
                </div>

                <Link href="/game/quick-fire">
                  <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    Continue Today&apos;s Mission →
                  </button>
                </Link>
                {/* TODO: Smart game selection based on user's weaknesses/progress */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Your Earnings</h3>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-4xl font-bold text-amber-500">£{stats.earnings.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">This week: £{stats.weekEarnings.toFixed(2)}</p>
          </div>

          {/* Stars Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Total Stars</h3>
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-4xl font-bold text-yellow-500">{stats.totalStars}</p>
            <p className="text-sm text-gray-500 mt-2">Keep collecting!</p>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Current Streak</h3>
              <span className="text-3xl">🔥</span>
            </div>
            <p className="text-4xl font-bold text-orange-500">{stats.streak} days</p>
            <p className="text-sm text-gray-500 mt-2">Play daily to grow!</p>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              Rewards Summary
            </h3>
            <p className="text-sm text-amber-800 mb-2">
              This week:{" "}
              <span className="font-bold text-lg">
                £{stats.weekEarnings.toFixed(2)}
              </span>
            </p>

            {lastPerfectScore ? (
              <p className="text-xs text-amber-700">
                Last perfect score:{" "}
                <span className="font-semibold">
                  {new Date(lastPerfectScore.playedAt).toLocaleDateString("en-GB")}
                </span>{" "}
                in{" "}
                <span className="font-semibold">
                  {formatGameName(lastPerfectScore.gameType)}
                </span>
              </p>
            ) : (
              <p className="text-xs text-amber-700">
                No perfect 10/10 yet – keep going to earn a £1 bonus!
              </p>
            )}
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 7-Day Streak Challenge */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 rounded-xl p-3">
                <span className="text-3xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900">7-Day Streak Challenge</h3>
                <p className="text-purple-700 text-sm">Play 15 minutes daily</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-purple-800">{stats.streak}/7 days</span>
                <span className="text-sm font-bold text-purple-600">Reward: £1</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${(stats.streak / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Perfect Score Challenge */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 rounded-xl p-3">
                <span className="text-3xl">🎖️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">Perfect Score Challenge</h3>
                <p className="text-green-700 text-sm">Get 10/10 in one game this week to earn a £1 accuracy bonus</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-800">0% today</span>
                <span className="text-sm font-bold text-green-600">Reward: £1</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Paper Challenge - Locked/Unlocked states */}
        <div className="mb-8">
          {stats.streak >= 7 ? (
            // Unlocked state
            <Link href="/game/weekly-paper">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <span className="text-6xl">📝</span>
                    </div>
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-2">🎉 Weekly Paper Challenge UNLOCKED!</h3>
                      <p className="text-white/90 text-lg mb-1">You&apos;ve earned a 7-day streak!</p>
                      <p className="text-white/80">Complete a mini exam paper with 15 real 11+ questions</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 whitespace-nowrap">
                    <p className="text-white text-sm font-semibold">Click to start →</p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            // Locked state
            <div className="relative rounded-2xl p-8 shadow-lg overflow-hidden opacity-80 cursor-not-allowed">
              {/* Gradient background with overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 opacity-60"></div>
              <div className="absolute inset-0 bg-gray-200/40"></div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 relative">
                    <span className="text-6xl opacity-60">📝</span>
                    <div className="absolute top-2 right-2 bg-gray-700 rounded-full p-1">
                      <span className="text-xl">🔒</span>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    <h3 className="text-3xl font-bold mb-2 flex items-center gap-2">
                      Weekly Paper Challenge
                      <span className="text-2xl">🔒</span>
                    </h3>
                    <p className="text-gray-800 text-lg mb-1 font-medium">Get a 7-day streak to unlock this challenge</p>
                    <p className="text-gray-600">Complete a mini exam paper with real 11+ questions</p>
                  </div>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-3">
                  <p className="text-gray-700 font-semibold text-center">
                    {Math.min(stats.streak, 6)}/7 days
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Keep your streak!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 rounded-xl p-3">
                  <span className="text-3xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900">Leaderboard</h3>
                  <p className="text-amber-700 text-sm">See how you rank against other players</p>
                </div>
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-4">🏆</div>
                <h4 className="text-2xl font-bold text-amber-900 mb-2">No players yet</h4>
                <p className="text-amber-700 text-lg">Play some games to be the first on the leaderboard!</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((player, index) => {
                    const isCurrentUser = player.name === user.name
                    const medalEmojis = ['🥇', '🥈', '🥉']
                    const medal = index < 3 ? medalEmojis[index] : `${index + 1}`

                    return (
                      <div
                        key={player.name}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          isCurrentUser
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-md'
                            : 'bg-white border border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-2xl font-bold w-8 text-center">
                            {medal}
                          </div>
                          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-2 shadow-md">
                            <span className="text-2xl">{player.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-bold ${isCurrentUser ? 'text-purple-900 text-lg' : 'text-gray-800'}`}>
                                {player.name}
                              </h4>
                              {isCurrentUser && (
                                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>{player.gamesPlayed} games</span>
                              <span className="text-green-600 font-semibold">{player.accuracy}% accuracy</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-2xl font-bold text-amber-600">
                            <span>{player.totalStars}</span>
                            <span>⭐</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">£{player.earnings.toFixed(2)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {leaderboard.length > 5 && (
                  <div className="text-center mt-4">
                    <p className="text-amber-700 text-sm">
                      And {leaderboard.length - 5} more players...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Recommended for Today Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Recommended for Today</h2>
            <p className="text-gray-600">Start with these to complete your mission faster</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group transform hover:scale-105 transition-all"
              >
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 border-purple-200 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${game.color} w-16 h-16 rounded-xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <div className="bg-purple-100 px-3 py-1 rounded-full">
                      <span className="text-purple-700 text-xs font-bold">RECOMMENDED</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Progress bar */}
                  {(() => {
                    const progress = getGameProgress(game.id, game.subject, gameProgress)
                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-600">Progress</span>
                          <span className="text-xs font-semibold text-purple-600">Level {progress.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2">
                    {game.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Maths Games</h2>
              <p className="text-gray-600">Choose a game to start practicing</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {mathsGames.length} games available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathsGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group transform hover:scale-102 transition-all"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 border border-gray-100 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${game.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <div className="flex">
                      {Array.from({ length: game.difficulty }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Progress indicator */}
                  {(() => {
                    const progress = getGameProgress(game.id, game.subject, gameProgress)
                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-500">Progress</span>
                          <span className="text-xs font-semibold text-blue-600">Level {progress.level}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={`bg-gradient-to-r ${game.color} h-1.5 rounded-full`} style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* English Games Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">English & Comprehension</h2>
              <p className="text-gray-600">Build your vocabulary and language skills</p>
            </div>
            <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              {englishGames.length} games available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group transform hover:scale-102 transition-all"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 border border-gray-100 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${game.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <div className="flex">
                      {Array.from({ length: game.difficulty }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Progress indicator */}
                  {(() => {
                    const progress = getGameProgress(game.id, game.subject, gameProgress)
                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-500">Progress</span>
                          <span className="text-xs font-semibold text-indigo-600">Level {progress.level}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={`bg-gradient-to-r ${game.color} h-1.5 rounded-full`} style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Verbal Reasoning Games Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Verbal Reasoning</h2>
              <p className="text-gray-600">Develop logical thinking and problem solving</p>
            </div>
            <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
              {verbalReasoningGames.length} games available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verbalReasoningGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group transform hover:scale-102 transition-all"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 border border-gray-100 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${game.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <div className="flex">
                      {Array.from({ length: game.difficulty }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Progress indicator */}
                  {(() => {
                    const progress = getGameProgress(game.id, game.subject, gameProgress)
                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-500">Progress</span>
                          <span className="text-xs font-semibold text-teal-600">Level {progress.level}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={`bg-gradient-to-r ${game.color} h-1.5 rounded-full`} style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Non-Verbal Reasoning Games Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Non-Verbal Reasoning</h2>
              <p className="text-gray-600">Master patterns, shapes and spatial skills</p>
            </div>
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
              {nonVerbalReasoningGames.length} games available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonVerbalReasoningGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group transform hover:scale-102 transition-all"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 border border-gray-100 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${game.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {game.icon}
                    </div>
                    <div className="flex">
                      {Array.from({ length: game.difficulty }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">⭐</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Progress indicator */}
                  {(() => {
                    const progress = getGameProgress(game.id, game.subject, gameProgress)
                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-500">Progress</span>
                          <span className="text-xs font-semibold text-orange-600">Level {progress.level}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={`bg-gradient-to-r ${game.color} h-1.5 rounded-full`} style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
