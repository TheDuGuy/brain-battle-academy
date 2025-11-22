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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({ totalStars: 0, earnings: 0, weekEarnings: 0, streak: 0 })
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
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

          {/* 90% Accuracy Challenge */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 rounded-xl p-3">
                <span className="text-3xl">🎖️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">90% Accuracy Challenge</h3>
                <p className="text-green-700 text-sm">Get 90%+ correct today</p>
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
              <div className="text-center py-8">
                <p className="text-amber-700 text-lg font-medium">No players yet!</p>
                <p className="text-amber-600 text-sm mt-2">Play some games to get on the leaderboard</p>
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
                className="group"
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

                  <div className="flex flex-wrap gap-2">
                    {game.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-purple-600 font-semibold text-sm group-hover:text-purple-700">
                      Start Game →
                    </span>
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
                className="group"
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

                  <div className="flex flex-wrap gap-2">
                    {game.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-purple-600 font-semibold text-sm group-hover:text-purple-700">
                      Start Game →
                    </span>
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
                className="group"
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

                  <div className="flex flex-wrap gap-2">
                    {game.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-purple-600 font-semibold text-sm group-hover:text-purple-700">
                      Start Game →
                    </span>
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
                className="group"
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

                  <div className="flex flex-wrap gap-2">
                    {game.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-purple-600 font-semibold text-sm group-hover:text-purple-700">
                      Start Game →
                    </span>
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
