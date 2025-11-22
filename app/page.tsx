'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LandingPage from './landing/page'

type Role = 'ADMIN' | 'PARENT' | 'PLAYER'

interface StoredUser {
  id: string
  name: string
  role: Role
}

export default function RootPage() {
  const router = useRouter()
  const [checkedAuth, setCheckedAuth] = useState(false)

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined'
        ? localStorage.getItem('user')
        : null

      if (!raw) {
        setCheckedAuth(true)
        return
      }

      const user = JSON.parse(raw) as StoredUser | null

      if (!user || !user.role) {
        localStorage.removeItem('user')
        setCheckedAuth(true)
        return
      }

      if (user.role === 'ADMIN') {
        router.replace('/admin')
      } else if (user.role === 'PARENT') {
        router.replace('/parent')
      } else {
        router.replace('/dashboard')
      }
    } catch (e) {
      console.error('Error reading stored user:', e)
      localStorage.removeItem('user')
      setCheckedAuth(true)
    }
  }, [router])

  if (!checkedAuth) {
    return null
  }

  return <LandingPage />
}
