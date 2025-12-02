'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMiniPaperForUser, type ImportedQuestionDTO, type SubjectType } from '@/lib/importedQuestions'

interface User {
  id: string
  name: string
  avatar: string
  color: string
}

export default function WeeklyPaperChallenge() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [questions, setQuestions] = useState<ImportedQuestionDTO[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState<SubjectType>('MATHS')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const startPaper = async () => {
    if (!user) return

    setLoading(true)
    try {
      const paperQuestions = await getMiniPaperForUser(user.id, subject, 15)

      if (paperQuestions.length === 0) {
        alert('No questions available for Weekly Paper Challenge yet. Please check back after PDFs are imported.')
        setLoading(false)
        return
      }

      setQuestions(paperQuestions)
      setGameStarted(true)
      setCurrentIndex(0)
      setUserAnswers({})
    } catch (error) {
      console.error('Error loading paper questions:', error)
      alert('Failed to load paper. Please try again.')
    }
    setLoading(false)
  }

  const handleAnswerChange = (value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: value
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmitPaper = async () => {
    if (!user) return

    // Calculate score
    let correct = 0
    questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx]?.trim().toLowerCase()
      const correctAnswer = q.answer?.trim().toLowerCase()
      if (userAnswer && correctAnswer && userAnswer === correctAnswer) {
        correct++
      }
    })

    const accuracy = questions.length > 0 ? (correct / questions.length) * 100 : 0

    // TODO: Save to /api/sessions with gameType: 'weekly-paper'
    // For now, just show results
    setGameEnded(true)

    try {
      // Calculate session duration (assume 30 minutes)
      const startTime = new Date()
      startTime.setMinutes(startTime.getMinutes() - 30)

      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          gameId: 'weekly-paper',
          subject: subject,
          startedAt: startTime.toISOString(),
          endedAt: new Date().toISOString(),
          totalQuestions: questions.length,
          correctAnswers: correct
        })
      })
    } catch (error) {
      console.error('Error saving session:', error)
    }
  }

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  }

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-white text-2xl">Loading your paper...</div>
    </div>
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dashboard')}
            className="mb-8 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📝</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Weekly Paper Challenge
              </h1>
              <p className="text-gray-600 text-lg">
                Complete a mini exam paper with real 11+ questions
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-bold text-purple-900 mb-4">🎯 Challenge Details</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📋</span>
                  <span><strong>15 questions</strong> from a real 11+ exam paper</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">⏱️</span>
                  <span><strong>No time limit</strong> - take your time and do your best</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🔒</span>
                  <span><strong>Unlocked by 7-day streak</strong> - you&apos;ve earned this!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">⭐</span>
                  <span><strong>Counts toward rewards</strong> - just like other games</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-3">Choose your subject:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['MATHS', 'ENGLISH', 'VR', 'NVR'].map(subj => (
                  <button
                    key={subj}
                    onClick={() => setSubject(subj as SubjectType)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      subject === subj
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startPaper}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Paper Challenge
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (gameEnded) {
    const correct = Object.values(userAnswers).filter((ans, idx) =>
      ans?.trim().toLowerCase() === questions[idx]?.answer?.trim().toLowerCase()
    ).length
    const accuracy = (correct / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Paper Complete!</h1>
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              {accuracy.toFixed(1)}%
            </div>
            <p className="text-gray-600 text-lg mb-8">
              You got {correct} out of {questions.length} questions correct
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main paper interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Weekly Paper Challenge</h2>
              <p className="text-white/80">{questions[0]?.sourceTitle || 'Exam Paper'}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{currentIndex + 1}/{questions.length}</div>
              <div className="text-white/80 text-sm">Questions</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestion?.number || currentIndex + 1}
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-6">
              {currentQuestion?.prompt}
            </div>

            {currentQuestion?.options && currentQuestion.options.length > 0 ? (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerChange(option.charAt(0))}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      userAnswers[currentIndex] === option.charAt(0)
                        ? 'bg-purple-100 border-2 border-purple-600'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your answer:</label>
                <input
                  type="text"
                  value={userAnswers[currentIndex] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none text-lg"
                  placeholder="Type your answer here..."
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-all"
          >
            ← Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitPaper}
              className="flex-1 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Submit Paper ✓
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
