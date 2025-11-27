'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/brand/brain-battle-infinity.jpg"
                alt="Brain Battle"
                width={32}
                height={48}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-brand-navy">Brain Battle Academy</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#parents" className="text-text-secondary hover:text-brand-navy font-medium transition-colors">For parents</a>
              <a href="#tutors" className="text-text-secondary hover:text-brand-navy font-medium transition-colors">For tutors</a>
              <a href="#faq" className="text-text-secondary hover:text-brand-navy font-medium transition-colors">FAQ</a>
              <Link href="/login">
                <button className="px-5 py-2 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink-dark hover:shadow-[0_0_20px_rgba(232,74,138,0.3)] transition-all">
                  Log in
                </button>
              </Link>
            </div>

            {/* Mobile Login Button */}
            <div className="md:hidden">
              <Link href="/login">
                <button className="px-4 py-2 bg-brand-pink text-white rounded-xl font-semibold text-sm">
                  Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy and CTAs */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
                11+ practice that feels like a game
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Short, targeted games for Maths, English, Verbal and Non-Verbal Reasoning – with clear rewards for kids and real progress tracking for adults.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-brand-green mt-1 font-bold">✓</span>
                  <span className="text-text-secondary">Covers Maths, English, Verbal & Non-Verbal Reasoning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-green mt-1 font-bold">✓</span>
                  <span className="text-text-secondary">Short, game-style sessions kids actually want to play</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-green mt-1 font-bold">✓</span>
                  <span className="text-text-secondary">Parent & tutor dashboards to track progress and rewards</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <button className="px-6 py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink-dark hover:shadow-[0_0_20px_rgba(232,74,138,0.3)] transition-all text-lg">
                    Log in / Start practicing
                  </button>
                </Link>
                <a href="mailto:edou.mota@me.com">
                  <button className="px-6 py-3 bg-white text-brand-navy border-2 border-gray-200 rounded-xl font-semibold hover:border-brand-purple hover:text-brand-purple transition-all text-lg">
                    Talk to us
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Fake Screenshot */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-purple-light to-brand-pink-light rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">
                {/* Mini "Today's Mission" card */}
                <div className="bg-white rounded-xl p-4 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <span className="font-bold text-brand-navy">Today's Mission</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Complete 3 games</span>
                    <span className="text-xs bg-brand-green-light text-brand-green-dark px-2 py-1 rounded-full font-semibold">2/3</span>
                  </div>
                </div>

                {/* Game tiles */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange-light flex items-center justify-center mb-2">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Quick Fire</div>
                    <div className="text-xs text-brand-orange">Maths</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center mb-2">
                      <span className="text-xl">📚</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Vocabulary</div>
                    <div className="text-xs text-brand-blue-dark">English</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-purple-light flex items-center justify-center mb-2">
                      <span className="text-xl">🧩</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Analogies</div>
                    <div className="text-xs text-brand-purple">VR</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-green-light flex items-center justify-center mb-2">
                      <span className="text-xl">🔷</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Patterns</div>
                    <div className="text-xs text-brand-green-dark">NVR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for parents & tutors */}
      <section className="py-16 bg-gray-50" id="parents">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            Designed for parents & tutors
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Parents */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">For parents</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1 font-bold">•</span>
                  <span className="text-text-secondary">Set simple reward rules (like £1 for a perfect game)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1 font-bold">•</span>
                  <span className="text-text-secondary">See weekly earnings and streaks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1 font-bold">•</span>
                  <span className="text-text-secondary">Spot weaker areas at a glance</span>
                </li>
              </ul>
            </div>

            {/* For Tutors */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100" id="tutors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-purple-light flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">For tutors</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-1 font-bold">•</span>
                  <span className="text-text-secondary">Target practice by topic (fractions, vocabulary, VR, NVR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-1 font-bold">•</span>
                  <span className="text-text-secondary">Use game results as a quick warm-up or homework</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-1 font-bold">•</span>
                  <span className="text-text-secondary">Track which question types need extra teaching</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-4">
            Covers the full 11+ skill set
          </h2>
          <p className="text-xl text-text-secondary text-center mb-12 max-w-3xl mx-auto">
            Over 20 different game types covering all the key areas tested in 11+ exams
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Maths */}
            <div className="bg-brand-orange-light/30 rounded-2xl p-6 border border-brand-orange-light hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center mb-3">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Maths</h3>
              <p className="text-text-secondary mb-4 text-sm">
                Quick calculations, problem solving and numerical reasoning
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Arithmetic & mental maths</li>
                <li>• Fractions & decimals</li>
                <li>• Word problems</li>
                <li>• Powers & calculations</li>
              </ul>
            </div>

            {/* English */}
            <div className="bg-brand-blue-light/30 rounded-2xl p-6 border border-brand-blue-light hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mb-3">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">English</h3>
              <p className="text-text-secondary mb-4 text-sm">
                Vocabulary, grammar and reading comprehension skills
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Vocabulary building</li>
                <li>• Synonyms & antonyms</li>
                <li>• Grammar & punctuation</li>
                <li>• Reading comprehension</li>
              </ul>
            </div>

            {/* Verbal Reasoning */}
            <div className="bg-brand-purple-light/30 rounded-2xl p-6 border border-brand-purple-light hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-purple flex items-center justify-center mb-3">
                <span className="text-2xl text-white">🧩</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Verbal Reasoning</h3>
              <p className="text-text-secondary mb-4 text-sm">
                Logic puzzles and word-based reasoning challenges
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Word analogies</li>
                <li>• Letter sequences</li>
                <li>• Word codes</li>
                <li>• Odd one out & logic</li>
              </ul>
            </div>

            {/* Non-Verbal Reasoning */}
            <div className="bg-brand-green-light/30 rounded-2xl p-6 border border-brand-green-light hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center mb-3">
                <span className="text-2xl text-white">🔷</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Non-Verbal</h3>
              <p className="text-text-secondary mb-4 text-sm">
                Visual patterns and spatial reasoning puzzles
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Shape patterns</li>
                <li>• Number sequences</li>
                <li>• Rotations & reflections</li>
                <li>• Shape completion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-brand-pink text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Kids log in and play</h3>
              <p className="text-text-secondary">
                Short game rounds of about 5–10 minutes. Choose from 20+ different game types.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-brand-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">We track progress</h3>
              <p className="text-text-secondary">
                Accuracy, streaks and perfect scores are tracked automatically in the background.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-brand-green text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">You see clear stats</h3>
              <p className="text-text-secondary">
                Parents and tutors get dashboards showing progress and can offer rewards for effort.
              </p>
            </div>
          </div>

          <div className="bg-brand-blue-light border border-brand-blue rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-sm text-brand-navy text-center">
              <span className="font-semibold">You decide the reward rules</span> – for example, kids can earn £1 for a perfect 10/10 once per week.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-6">
            Built by a parent for 11+ prep
          </h2>
          <p className="text-xl text-text-secondary text-center mb-12 leading-relaxed">
            Brain Battle Academy started as an app I built for my son's 11+ preparation. What began as a way to make practice more engaging has grown into a platform now being tested with other children.
          </p>

          <div className="bg-brand-purple-light/30 border border-brand-purple-light rounded-2xl p-8">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">💬</span>
              </div>
              <div>
                <p className="text-lg text-brand-navy italic mb-3">
                  "It turns 11+ drilling into something my child actually wants to do."
                </p>
                <p className="text-sm text-text-secondary font-medium">
                  – Parent tester
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Contact */}
      <section className="py-16 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            Questions from parents & tutors
          </h2>

          <div className="space-y-4 mb-12">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">Is this a replacement for a tutor?</span>
                <span className="text-brand-purple font-bold">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-4 text-text-secondary">
                  No – it's a practice companion. Brain Battle Academy helps with consistent, structured practice and makes drilling more engaging. It works best alongside tutoring or as part of a balanced prep plan.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">What ages is it for?</span>
                <span className="text-brand-purple font-bold">{openFaq === 2 ? '−' : '+'}</span>
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-4 text-text-secondary">
                  Brain Battle Academy is designed for Year 4–6 students (ages 8-11) preparing for 11+ exams. The adaptive difficulty means it works whether your child is just starting or already well into their prep.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">How do rewards work?</span>
                <span className="text-brand-purple font-bold">{openFaq === 3 ? '−' : '+'}</span>
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-4 text-text-secondary">
                  Kids can earn £1 for a perfect 10/10 game (once per week). The system tracks it automatically, but you control whether and how to implement rewards. Some parents give pocket money, others use it for motivation tracking only.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">How much does it cost?</span>
                <span className="text-brand-purple font-bold">{openFaq === 4 ? '−' : '+'}</span>
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-4 text-text-secondary">
                  We're currently in a small pilot phase with select families. If you're interested, get in touch and we can discuss access.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">Can I use this as a tutor?</span>
                <span className="text-brand-purple font-bold">{openFaq === 5 ? '−' : '+'}</span>
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-4 text-text-secondary">
                  Absolutely! Tutors can use Brain Battle Academy to set targeted practice between sessions, warm up at the start of lessons, or assign as homework. The dashboards help you quickly see which topics need more attention.
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-brand-navy rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Have more questions?
            </h3>
            <p className="text-gray-300 mb-6">
              We'd love to hear from you. Get in touch to learn more or discuss access.
            </p>
            <a href="mailto:edou.mota@me.com">
              <button className="px-6 py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink-dark hover:shadow-[0_0_20px_rgba(232,74,138,0.3)] transition-all">
                Contact us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/brain-battle-infinity.jpg"
                alt="Brain Battle"
                width={32}
                height={48}
                className="rounded-lg"
              />
              <span className="text-white font-semibold">Brain Battle Academy</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="text-center md:text-left mt-6 text-sm">
            © {currentYear} Brain Battle Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
