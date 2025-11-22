'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const avatars = ['🚀', '⚡', '🎮', '🦸', '🧙', '🐉', '🦄', '🎯', '🏆', '⭐']

export default function LoginPage() {
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('🚀')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const user = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      avatar: selectedAvatar,
      color: '#9333EA'
    }

    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
            🎓
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Brain Battle Academy
          </h1>
          <p className="text-gray-600">Master your 11+ skills</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              What&apos;s your name?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-lg text-gray-900 font-semibold bg-white placeholder:text-gray-400"
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Choose your avatar
            </label>
            <div className="grid grid-cols-5 gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-4xl p-3 rounded-xl transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Learning!
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>No password needed - just enter your name</p>
        </div>
      </div>
    </div>
  )
}
