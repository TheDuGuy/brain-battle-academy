'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SwitchToChildButton from '@/components/SwitchToChildButton'

// ============================================================================
// Types
// ============================================================================

type ChildSummary = {
  id: string
  name: string
  avatar: string | null
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
  currentStreakDays: number
  rewardsThisWeekPence: number
  lastPlayedAt: string | null
}

type ParentOverviewResponse = {
  children: ChildSummary[]
  family: {
    totalMinutesThisWeek: number
    totalRewardsThisWeekPence: number
    avgAccuracyThisWeek: number
    childrenOnTrackToday: number
    totalChildren: number
  }
}

type User = {
  id: string
  name: string
  avatar: string
  color: string
  role?: string
}

// ============================================================================
// Component
// ============================================================================

export default function ParentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [overview, setOverview] = useState<ParentOverviewResponse | null>(null)
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
    setUser(parsedUser)

    // For now, we check role on client side
    // In production, you'd validate this server-side
    // TODO: Add proper session management with httpOnly cookies
    if (parsedUser.role && parsedUser.role !== 'PARENT') {
      router.push('/dashboard')
      return
    }

    // Fetch overview data
    fetchOverview(parsedUser.id)
  }, [router])

  const fetchOverview = async (parentId: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/parent/overview?parentId=${parentId}`)

      if (!res.ok) {
        throw new Error('Failed to fetch overview')
      }

      const data = await res.json()
      setOverview(data)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
      console.error('Error fetching parent overview:', err)
    } finally {
      setLoading(false)
    }
  }

  // Format minutes to hours and minutes
  const formatMinutes = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  // Format pence to pounds
  const formatPounds = (pence: number): string => {
    return `£${(pence / 100).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-6xl mb-4 text-center">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h1>
          <p className="text-gray-600 text-center mb-6">{error || 'Failed to load data'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Dashboard
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Parent Dashboard</h1>
              <p className="text-gray-600 text-lg">Overview of your children's 11+ practice</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Family Overview Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Family Overview - This Week</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Practice */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">⏱️</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatMinutes(overview.family.totalMinutesThisWeek)}
              </div>
              <div className="text-gray-600 font-medium">Total Practice</div>
              <div className="text-sm text-gray-500 mt-1">Across all children</div>
            </div>

            {/* Average Accuracy */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {overview.family.avgAccuracyThisWeek}%
              </div>
              <div className="text-gray-600 font-medium">Average Accuracy</div>
              <div className="text-sm text-gray-500 mt-1">Overall performance</div>
            </div>

            {/* Streak Health */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🔥</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {overview.family.childrenOnTrackToday}/{overview.family.totalChildren}
              </div>
              <div className="text-gray-600 font-medium">Streak Health</div>
              <div className="text-sm text-gray-500 mt-1">Children played today</div>
            </div>

            {/* Rewards */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">💰</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatPounds(overview.family.totalRewardsThisWeekPence)}
              </div>
              <div className="text-gray-600 font-medium">Rewards This Week</div>
              <div className="text-sm text-gray-500 mt-1">Total pocket money</div>
            </div>
          </div>
        </div>

        {/* Children Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Children</h2>

          {overview.children.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No children yet</h3>
              <p className="text-gray-600">Add child accounts to see their progress here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {overview.children.map((child) => (
                <div key={child.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  {/* Child Header */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div className="text-5xl">{child.avatar || '👤'}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800">{child.name}</h3>
                      {child.lastPlayedAt && (
                        <p className="text-sm text-gray-500">
                          Last played: {new Date(child.lastPlayedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">This week:</span>
                      <span className="text-gray-800 font-bold">
                        {formatMinutes(child.minutesThisWeek)} · {child.sessionsThisWeek} sessions
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Accuracy:</span>
                      <span className="text-gray-800 font-bold">{child.avgAccuracyThisWeek}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Streak:</span>
                      <span className="text-gray-800 font-bold">{child.currentStreakDays} days 🔥</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Rewards:</span>
                      <span className="text-gray-800 font-bold">{formatPounds(child.rewardsThisWeekPence)}</span>
                    </div>
                  </div>

                  {/* Reward explanation */}
                  <div className="mt-4 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <p className="text-xs text-emerald-700">
                      💡 They can earn a £1 bonus for a perfect 20/20 once per week.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    {/* Switch to Child View */}
                    <SwitchToChildButton child={{ id: child.id, name: child.name, avatar: child.avatar }} />

                    {/* View Details */}
                    <Link href={`/parent/child/${child.id}`}>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
