'use client'

import { CSSProperties } from 'react'

interface AnimatedCoinProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-6 h-6 text-lg',
  md: 'w-8 h-8 text-2xl',
  lg: 'w-12 h-12 text-4xl',
  xl: 'w-16 h-16 text-5xl',
}

export default function AnimatedCoin({ size = 'md', className = '' }: AnimatedCoinProps) {
  return (
    <div
      className={`inline-flex items-center justify-center ${sizeMap[size]} ${className}`}
      style={{
        animation: 'spin-slow 3s linear infinite',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative w-full h-full rounded-full"
        style={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffec8b 25%, #ffd700 50%, #daa520 75%, #ffd700 100%)',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)',
          border: '2px solid #daa520',
        }}
      >
        {/* Inner circle detail */}
        <div
          className="absolute inset-1 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ffec8b 0%, #ffd700 50%, #daa520 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Star or B symbol in center */}
          <span
            className="font-bold"
            style={{
              color: '#b8860b',
              textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
              fontSize: '0.5em',
            }}
          >
            B
          </span>
        </div>
      </div>

      {/* Global styles for the animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  )
}
