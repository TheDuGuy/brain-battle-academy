'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎓</div>
              <h1 className="text-2xl font-bold text-gray-800">Brain Battle Academy</h1>
            </div>
            <Link href="/login">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Sign In
              </button>
            </Link>
          </header>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Your 11+ Exam
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Through Play
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Transform 11+ preparation into an engaging game. Track progress, earn rewards,
              and build confidence with adaptive learning designed for success.
            </p>
            <Link href="/login">
              <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20">⭐</div>
        <div className="absolute top-40 right-20 text-6xl opacity-20">🎯</div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-20">🏆</div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Everything Your Child Needs to Succeed
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">📚</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Complete 11+ Coverage</h4>
            <p className="text-gray-600">
              Maths, English, Verbal Reasoning, and Non-Verbal Reasoning - all subjects in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">🎮</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Gamified Learning</h4>
            <p className="text-gray-600">
              Turn practice into play with engaging games, streaks, and achievement tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Smart Progress Tracking</h4>
            <p className="text-gray-600">
              Adaptive difficulty that grows with your child, ensuring optimal challenge.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">💰</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Reward System</h4>
            <p className="text-gray-600">
              Motivate consistent practice with pocket money rewards for achievements and streaks.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white font-bold">1</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Sign Up & Start</h4>
              <p className="text-gray-600">
                Create your family account in seconds. Add your children and set their goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white font-bold">2</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Play & Learn Daily</h4>
              <p className="text-gray-600">
                Just 15 minutes a day. Choose from 20+ games covering all 11+ subjects.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white font-bold">3</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Track & Celebrate</h4>
              <p className="text-gray-600">
                Monitor progress, earn rewards, and build exam confidence day by day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Types */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
          20+ Engaging Games
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-xl font-bold mb-2">Maths</h4>
            <p className="text-sm opacity-90">Quick Fire, Fractions, Problem Solving & more</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-3">📚</div>
            <h4 className="text-xl font-bold mb-2">English</h4>
            <p className="text-sm opacity-90">Vocabulary, Grammar, Comprehension & more</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-3">🧩</div>
            <h4 className="text-xl font-bold mb-2">Verbal Reasoning</h4>
            <p className="text-sm opacity-90">Analogies, Codes, Logic Puzzles & more</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="text-4xl mb-3">🔷</div>
            <h4 className="text-xl font-bold mb-2">Non-Verbal Reasoning</h4>
            <p className="text-sm opacity-90">Patterns, Sequences, Rotations & more</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform 11+ Preparation?
          </h3>
          <p className="text-xl text-white opacity-90 mb-10">
            Join families who are making exam prep enjoyable and effective.
          </p>
          <Link href="/login">
            <button className="px-12 py-5 bg-white text-purple-600 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-3xl">🎓</div>
            <span className="text-xl font-bold text-white">Brain Battle Academy</span>
          </div>
          <p className="text-sm">
            © 2024 Brain Battle Academy. Making 11+ preparation enjoyable.
          </p>
        </div>
      </footer>
    </div>
  )
}
