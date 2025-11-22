'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// ============================================================================
// Types
// ============================================================================

type User = {
  id: string
  name: string
  avatar: string
  color: string
  role?: string
}

type SubjectStats = {
  subject: 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
}

type RecentSession = {
  id: string
  gameType: string
  subject: string
  accuracy: number
  duration: number
  playedAt: string
  starsEarned: number
}

type ChildDetailResponse = {
  id: string
  name: string
  avatar: string | null
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
  currentStreakDays: number
  rewardsThisWeekPence: number
  subjectStats: SubjectStats[]
  recentSessions: RecentSession[]
}

// ============================================================================
// Component
// ============================================================================

export default function ChildDetailPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.userId as string

  const [parent, setParent] = useState<User | null>(null)
  const [childDetail, setChildDetail] = useState<ChildDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in and is a PARENT
    const userData = localStorage.getItem('user')

    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData) as User
    setParent(parsedUser)

    if (parsedUser.role && parsedUser.role !== 'PARENT') {
      router.push('/dashboard')
      return
    }

    // Fetch child details
    fetchChildDetails(parsedUser.id)
  }, [router, userId])

  const fetchChildDetails = async (parentId: string) => {
    try {
      setLoading(true)

      const res = await fetch(`/api/parent/child/${userId}?parentId=${parentId}`)
      if (!res.ok) {
        throw new Error('Failed to fetch child details')
      }

      const data = await res.json()
      setChildDetail(data)
    } catch (err) {
      setError('Failed to load child details.')
      console.error('Error fetching child details:', err)
    } finally {
      setLoading(false)
    }
  }

  // Format helpers
  const formatMinutes = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const formatPounds = (pence: number): string => {
    return `£${(pence / 100).toFixed(2)}`
  }

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSubjectIcon = (subject: string): string => {
    switch (subject) {
      case 'MATHS': return '🔢'
      case 'ENGLISH': return '📚'
      case 'VR': return '💭'
      case 'NVR': return '🧩'
      default: return '📝'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error || !childDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-6xl mb-4 text-center">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Access Denied</h1>
          <p className="text-gray-600 text-center mb-6">{error || 'Unable to load child details'}</p>
          <button
            onClick={() => router.push('/parent')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Parent Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/parent')}
            className="mb-4 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700"
          >
            ← Back to Parent Dashboard
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-6">
              <div className="text-7xl">{childDetail.avatar || '👤'}</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{childDetail.name}</h1>
                <p className="text-gray-600 text-lg">Detailed performance statistics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">This Week</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-gray-800">{formatMinutes(childDetail.minutesThisWeek)}</div>
              <div className="text-sm text-gray-600">Practice Time</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-gray-800">{childDetail.sessionsThisWeek}</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-800">{childDetail.avgAccuracyThisWeek}%</div>
              <div className="text-sm text-gray-600">Avg Accuracy</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-gray-800">{childDetail.currentStreakDays}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-gray-800">{formatPounds(childDetail.rewardsThisWeekPence)}</div>
              <div className="text-sm text-gray-600">Rewards</div>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">By Subject This Week</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {childDetail.subjectStats.map((subjectStat) => (
              <div key={subjectStat.subject} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{getSubjectIcon(subjectStat.subject)}</div>
                  <h3 className="text-xl font-bold text-gray-800">{subjectStat.subject}</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="text-sm font-bold text-gray-800">{formatMinutes(subjectStat.minutesThisWeek)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sessions:</span>
                    <span className="text-sm font-bold text-gray-800">{subjectStat.sessionsThisWeek}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy:</span>
                    <span className="text-sm font-bold text-gray-800">{subjectStat.avgAccuracyThisWeek}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Sessions</h2>

          {childDetail.recentSessions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No sessions yet</h3>
              <p className="text-gray-600">Sessions will appear here once {childDetail.name} starts playing.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Game</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Accuracy</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stars</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {childDetail.recentSessions.map((session, idx) => (
                      <tr key={session.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm text-gray-700">{formatDate(session.playedAt)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{session.gameType}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <span className="inline-flex items-center gap-1">
                            {getSubjectIcon(session.subject)} {session.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{formatMinutes(Math.round(session.duration / 60))}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-bold ${session.accuracy >= 90 ? 'text-green-600' : session.accuracy >= 70 ? 'text-blue-600' : 'text-gray-600'}`}>
                            {session.accuracy}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <span className="inline-flex items-center gap-1">
                            ⭐ {session.starsEarned}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
