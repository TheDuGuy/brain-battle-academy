'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { prisma } from '@/lib/prisma'

type User = {
  id: string
  name: string
  avatar: string
  color: string
  role?: string
}

type ChildInfo = {
  id: string
  name: string
  avatar: string | null
  parentId: string | null
}

export default function ChildDetailPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.userId as string

  const [parent, setParent] = useState<User | null>(null)
  const [child, setChild] = useState<ChildInfo | null>(null)
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

    // Fetch child info and verify ownership
    fetchChildInfo(parsedUser.id)
  }, [router, userId])

  const fetchChildInfo = async (parentId: string) => {
    try {
      setLoading(true)

      // Fetch child info
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) {
        throw new Error('Child not found')
      }

      const childData = await res.json()

      // Verify this child belongs to the logged-in parent
      if (childData.parentId !== parentId) {
        setError('You do not have permission to view this child\'s details.')
        return
      }

      setChild(childData)
    } catch (err) {
      setError('Failed to load child details.')
      console.error('Error fetching child info:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error || !child) {
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
      <div className="max-w-4xl mx-auto">
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
              <div className="text-7xl">{child.avatar || '👤'}</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{child.name}</h1>
                <p className="text-gray-600 text-lg">Detailed performance statistics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-12 text-center shadow-lg">
          <div className="text-8xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
          <p className="text-gray-700 text-lg mb-6">
            Detailed stats for {child.name} are on the way.
          </p>
          <div className="text-left max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">Future features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>📊 Subject-by-subject breakdown</li>
              <li>📈 Progress graphs over time</li>
              <li>🎯 Strengths and areas for improvement</li>
              <li>🏆 Achievement timeline</li>
              <li>📅 Weekly/monthly comparisons</li>
              <li>💡 Personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
