'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SwitchToChildButton from '@/components/SwitchToChildButton'

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

type ChildSummary = {
  id: string
  name: string
  avatar: string | null
  parentName: string | null
  parentId: string | null
  minutesThisWeek: number
  sessionsThisWeek: number
  avgAccuracyThisWeek: number
  currentStreakDays: number
  rewardsThisWeekPence: number
  lastPlayedAt: string | null
}

type AdminOverviewResponse = {
  global: {
    totalChildren: number
    totalParents: number
    totalMinutesThisWeek: number
    totalRewardsThisWeekPence: number
    avgAccuracyThisWeek: number
  }
  children: ChildSummary[]
}

// ============================================================================
// Component
// ============================================================================

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [overview, setOverview] = useState<AdminOverviewResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in and is an ADMIN
    const userData = localStorage.getItem('user')

    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData) as User
    setUser(parsedUser)

    // Role-based redirect
    if (parsedUser.role) {
      if (parsedUser.role === 'PARENT') {
        router.push('/parent')
        return
      } else if (parsedUser.role === 'PLAYER') {
        router.push('/dashboard')
        return
      } else if (parsedUser.role !== 'ADMIN') {
        router.push('/login')
        return
      }
    }

    // Fetch admin overview data
    fetchOverview(parsedUser.id)
  }, [router])

  const fetchOverview = async (adminId: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/overview?adminId=${adminId}`)

      if (!res.ok) {
        throw new Error('Failed to fetch admin overview')
      }

      const data = await res.json()
      setOverview(data)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
      console.error('Error fetching admin overview:', err)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-6xl mb-4 text-center">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h1>
          <p className="text-gray-600 text-center mb-6">{error || 'Failed to load data'}</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">Overview of all children and families</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{user?.avatar}</div>
              <div>
                <div className="font-bold text-gray-800">{user?.name}</div>
                <div className="text-sm text-gray-600">Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Overview Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Global Overview - This Week</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Total Children */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {overview.global.totalChildren}
              </div>
              <div className="text-gray-600 font-medium">Total Children</div>
            </div>

            {/* Total Parents */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">👪</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {overview.global.totalParents}
              </div>
              <div className="text-gray-600 font-medium">Total Parents</div>
            </div>

            {/* Total Practice */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">⏱️</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatMinutes(overview.global.totalMinutesThisWeek)}
              </div>
              <div className="text-gray-600 font-medium">Total Practice</div>
            </div>

            {/* Average Accuracy */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {overview.global.avgAccuracyThisWeek}%
              </div>
              <div className="text-gray-600 font-medium">Avg Accuracy</div>
            </div>

            {/* Total Rewards */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">💰</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatPounds(overview.global.totalRewardsThisWeekPence)}
              </div>
              <div className="text-gray-600 font-medium">Total Rewards</div>
            </div>
          </div>
        </div>

        {/* All Children Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Children</h2>

          {overview.children.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No children yet</h3>
              <p className="text-gray-600">Children will appear here once families are created.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Child</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Parent</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Minutes</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Sessions</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Accuracy</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Streak</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Rewards</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {overview.children.map((child, idx) => (
                      <tr key={child.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {/* Child */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{child.avatar || '👤'}</div>
                            <div className="font-medium text-gray-800">{child.name}</div>
                          </div>
                        </td>

                        {/* Parent */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {child.parentName || <span className="text-gray-400 italic">No parent</span>}
                        </td>

                        {/* Minutes */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatMinutes(child.minutesThisWeek)}
                        </td>

                        {/* Sessions */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {child.sessionsThisWeek}
                        </td>

                        {/* Accuracy */}
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-bold ${child.avgAccuracyThisWeek >= 90 ? 'text-green-600' : child.avgAccuracyThisWeek >= 70 ? 'text-blue-600' : 'text-gray-600'}`}>
                            {child.avgAccuracyThisWeek}%
                          </span>
                        </td>

                        {/* Streak */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {child.currentStreakDays} days 🔥
                        </td>

                        {/* Rewards */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatPounds(child.rewardsThisWeekPence)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            {/* View Stats */}
                            <Link href={`/parent/child/${child.id}`}>
                              <button className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-lg font-semibold hover:shadow-md transition-all">
                                View Stats
                              </button>
                            </Link>

                            {/* Switch to Child View */}
                            <div className="w-full">
                              <SwitchToChildButton child={{ id: child.id, name: child.name, avatar: child.avatar }} />
                            </div>
                          </div>
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
