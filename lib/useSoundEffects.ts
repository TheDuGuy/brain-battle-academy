/**
 * Sound Effects Hook for Brain Battle Academy
 *
 * Uses Web Audio API to generate sounds programmatically
 * No external audio files needed - all sounds are synthesized
 */

import { useCallback, useRef, useEffect } from 'react'

type SoundType = 'correct' | 'wrong' | 'coins' | 'milestone' | 'gameStart' | 'gameEnd'

interface UseSoundEffectsOptions {
  enabled?: boolean
  volume?: number // 0 to 1
}

export function useSoundEffects(options: UseSoundEffectsOptions = {}) {
  const { enabled = true, volume = 0.5 } = options
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize AudioContext on first user interaction (required by browsers)
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  /**
   * Play a short, pleasant "ding" sound for correct answers
   */
  const playCorrect = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, ctx.currentTime) // A5
    oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.1) // C#6

    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }, [enabled, volume, getAudioContext])

  /**
   * Play a short "buzz" sound for wrong answers
   */
  const playWrong = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1)

    gainNode.gain.setValueAtTime(volume * 0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  }, [enabled, volume, getAudioContext])

  /**
   * Play a "coin collect" chime sound for earning coins
   */
  const playCoins = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()

    // Play a sequence of rising notes like Mario coins
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)

      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
      gainNode.gain.linearRampToValueAtTime(volume * 0.25, ctx.currentTime + i * 0.08 + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.15)

      oscillator.start(ctx.currentTime + i * 0.08)
      oscillator.stop(ctx.currentTime + i * 0.08 + 0.15)
    })
  }, [enabled, volume, getAudioContext])

  /**
   * Play a celebration fanfare for milestones (perfect score, streak)
   */
  const playMilestone = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()

    // Play a victory fanfare
    const notes = [
      { freq: 523.25, time: 0, duration: 0.15 },      // C5
      { freq: 523.25, time: 0.15, duration: 0.15 },   // C5
      { freq: 523.25, time: 0.3, duration: 0.15 },    // C5
      { freq: 659.25, time: 0.45, duration: 0.15 },   // E5
      { freq: 783.99, time: 0.6, duration: 0.15 },    // G5
      { freq: 1046.5, time: 0.75, duration: 0.4 },    // C6 (held)
    ]

    notes.forEach(({ freq, time, duration }) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time)

      gainNode.gain.setValueAtTime(0, ctx.currentTime + time)
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + time + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration)

      oscillator.start(ctx.currentTime + time)
      oscillator.stop(ctx.currentTime + time + duration)
    })
  }, [enabled, volume, getAudioContext])

  /**
   * Play a quick "start" sound when game begins
   */
  const playGameStart = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime) // A4
    oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2) // A5

    gainNode.gain.setValueAtTime(volume * 0.25, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }, [enabled, volume, getAudioContext])

  /**
   * Play a sound when game ends
   */
  const playGameEnd = useCallback(() => {
    if (!enabled) return

    const ctx = getAudioContext()

    // Descending notes to indicate game over
    const notes = [783.99, 659.25, 523.25] // G5, E5, C5

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)

      gainNode.gain.setValueAtTime(volume * 0.25, ctx.currentTime + i * 0.15)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.2)

      oscillator.start(ctx.currentTime + i * 0.15)
      oscillator.stop(ctx.currentTime + i * 0.15 + 0.2)
    })
  }, [enabled, volume, getAudioContext])

  /**
   * Generic play function that takes a sound type
   */
  const play = useCallback((type: SoundType) => {
    switch (type) {
      case 'correct':
        playCorrect()
        break
      case 'wrong':
        playWrong()
        break
      case 'coins':
        playCoins()
        break
      case 'milestone':
        playMilestone()
        break
      case 'gameStart':
        playGameStart()
        break
      case 'gameEnd':
        playGameEnd()
        break
    }
  }, [playCorrect, playWrong, playCoins, playMilestone, playGameStart, playGameEnd])

  return {
    play,
    playCorrect,
    playWrong,
    playCoins,
    playMilestone,
    playGameStart,
    playGameEnd,
  }
}
