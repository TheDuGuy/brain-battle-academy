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
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <Image
            src="/brand/brain-battle-infinity.jpg"
            alt="Brain Battle"
            width={64}
            height={96}
            className="mx-auto mb-4 rounded-xl"
          />
          <h1 className="text-3xl font-bold text-brand-navy mb-2">
            Brain Battle <span className="text-brand-purple">Academy</span>
          </h1>
          <p className="text-gray-500">Master your 11+ skills</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-2">
              Username
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-purple focus:ring-2 focus:ring-brand-purple-light transition-all outline-none text-base text-brand-navy bg-white placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-navy mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-purple focus:ring-2 focus:ring-brand-purple-light transition-all outline-none text-base text-brand-navy bg-white placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !password.trim() || isLoading}
            className="w-full bg-brand-purple text-white py-3.5 rounded-full font-semibold text-base hover:bg-brand-purple-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Start Learning!'}
          </button>
        </form>
      </div>
    </div>
  )
}
