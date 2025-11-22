'use client'

import { useRouter } from 'next/navigation'

type ChildInfo = {
  id: string
  name: string
  avatar: string | null
}

type SwitchToChildButtonProps = {
  child: ChildInfo
}

export default function SwitchToChildButton({ child }: SwitchToChildButtonProps) {
  const router = useRouter()

  const handleSwitchToChild = () => {
    // Create a user object matching what /api/auth/login returns for a PLAYER
    const childUser = {
      id: child.id,
      name: child.name,
      avatar: child.avatar ?? '🎮',
      color: '#9333EA', // Default color
      role: 'PLAYER',
    }

    // Store in localStorage (same as login flow)
    localStorage.setItem('user', JSON.stringify(childUser))

    // Optional: Set flag to indicate viewing as child via parent
    sessionStorage.setItem('fromParent', '1')

    // Redirect to child dashboard
    router.push('/dashboard')
  }

  return (
    <button
      onClick={handleSwitchToChild}
      className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
    >
      View as {child.name} →
    </button>
  )
}
