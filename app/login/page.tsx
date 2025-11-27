'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !password.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), password })
      })

      const data = await res.json()

      if (!res.ok) {
        // Differentiate between credential errors and server errors
        if (res.status === 401) {
          setError('Invalid username or password. Please try again.')
        } else if (res.status >= 500) {
          setError('Server error. Please try again later.')
        } else {
          setError(data.error || 'Login failed. Please try again.')
        }
        setIsLoading(false)
        return
      }

      // Store minimal user info in localStorage for client-side access
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect based on user role
      if (data.user.role === 'ADMIN') {
        router.push('/admin')
      } else if (data.user.role === 'PARENT') {
        router.push('/parent')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-light via-brand-pink-light to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <Image
            src="/brand/brain-battle-infinity.jpg"
            alt="Brain Battle"
            width={80}
            height={120}
            className="mx-auto mb-6 rounded-2xl shadow-lg"
          />
          <h1 className="text-4xl font-bold text-brand-navy mb-2">
            Brain Battle Academy
          </h1>
          <p className="text-text-secondary">Master your 11+ skills</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-brand-navy mb-2">
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-brand-purple focus:ring-2 focus:ring-brand-purple-light transition-all outline-none text-lg text-brand-navy font-semibold bg-white placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-navy mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-brand-purple focus:ring-2 focus:ring-brand-purple-light transition-all outline-none text-lg text-brand-navy font-semibold bg-white placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !password.trim() || isLoading}
            className="w-full bg-brand-pink text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-pink-dark hover:shadow-[0_0_20px_rgba(232,74,138,0.3)] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Start Learning!'}
          </button>
        </form>
      </div>
    </div>
  )
}
