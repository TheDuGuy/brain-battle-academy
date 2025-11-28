'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
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
              <a href="#parents" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">For parents</a>
              <a href="#tutors" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">For tutors</a>
              <a href="#faq" className="text-gray-600 hover:text-brand-navy font-medium transition-colors">FAQ</a>
              <Link href="/login">
                <button className="px-5 py-2.5 bg-brand-pink text-white rounded-full font-semibold hover:bg-brand-pink-dark transition-all">
                  Log in
                </button>
              </Link>
            </div>

            {/* Mobile Login Button */}
            <div className="md:hidden">
              <Link href="/login">
                <button className="px-4 py-2 bg-brand-pink text-white rounded-full font-semibold text-sm">
                  Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy and CTAs */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-navy mb-6 leading-[1.1]">
                <span className="text-brand-purple">11+ practice</span> that feels like a game
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Short, targeted games for Maths, English, Verbal and Non-Verbal Reasoning – with stars, streaks and rewards that keep kids motivated and clear progress tracking for adults.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5 text-lg">✓</span>
                  <span className="text-gray-600">Covers Maths, English, Verbal & Non-Verbal Reasoning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5 text-lg">✓</span>
                  <span className="text-gray-600">Short, game-style sessions kids actually want to play</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5 text-lg">✓</span>
                  <span className="text-gray-600">Missions, stars and streaks to build daily habits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5 text-lg">✓</span>
                  <span className="text-gray-600">Parent & tutor dashboards to track progress and rewards</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <button className="px-8 py-3.5 bg-brand-purple text-white rounded-full font-semibold hover:bg-brand-purple-dark transition-all text-base">
                    Log in / Start practicing
                  </button>
                </Link>
                <a href="mailto:edou.mota@me.com">
                  <button className="px-8 py-3.5 bg-white text-brand-purple border border-gray-200 rounded-full font-semibold hover:border-brand-purple transition-all text-base">
                    Talk to us
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="relative">
              {/* Clean white card matching Club kit card style */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                {/* Today's Mission header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple-light flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">Today&apos;s Mission</h3>
                    <p className="text-gray-500 text-sm">Play 15 minutes today</p>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✅</span>
                    <span className="text-gray-600 text-sm">Daily play done</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⭕</span>
                    <span className="text-gray-600 text-sm">Get 20/20 for £1</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-brand-purple text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-brand-purple-dark transition-all mb-6">
                  Continue Today&apos;s Mission →
                </button>

                {/* Game tiles */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FDFCFB] rounded-xl p-3 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange-light flex items-center justify-center mb-2">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Quick Fire</div>
                    <div className="text-xs text-gray-500">Maths</div>
                  </div>
                  <div className="bg-[#FDFCFB] rounded-xl p-3 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center mb-2">
                      <span className="text-xl">📚</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Vocabulary</div>
                    <div className="text-xs text-gray-500">English</div>
                  </div>
                  <div className="bg-[#FDFCFB] rounded-xl p-3 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center mb-2">
                      <span className="text-xl">🧩</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Analogies</div>
                    <div className="text-xs text-gray-500">VR</div>
                  </div>
                  <div className="bg-[#FDFCFB] rounded-xl p-3 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center mb-2">
                      <span className="text-xl">🔷</span>
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">Patterns</div>
                    <div className="text-xs text-gray-500">NVR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for parents & tutors */}
      <section className="py-20" id="parents">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-4">
            Designed for <span className="text-brand-purple">parents & tutors</span>
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Clear dashboards and simple reward systems to keep you in control
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Parents */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy">For parents</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">Set simple reward rules (like £1 for a perfect game)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">See weekly earnings and streaks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">Spot weaker areas at a glance</span>
                </li>
              </ul>
            </div>

            {/* For Tutors */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100" id="tutors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-purple-light flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy">For tutors</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">Target practice by topic (fractions, vocabulary, VR, NVR)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">Use game results as a quick warm-up or homework</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-purple mt-0.5">✓</span>
                  <span className="text-gray-600">Track which question types need extra teaching</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-4">
            Covers the full <span className="text-brand-purple">11+ skill set</span>
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Over 20 different game types covering all the key areas tested in 11+ exams
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Maths */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-brand-orange-light flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Maths</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Quick calculations, problem solving and numerical reasoning
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Arithmetic & mental maths</li>
                <li>• Fractions & decimals</li>
                <li>• Word problems</li>
                <li>• Powers & calculations</li>
              </ul>
            </div>

            {/* English */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">English</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Vocabulary, grammar and reading comprehension skills
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Vocabulary building</li>
                <li>• Synonyms & antonyms</li>
                <li>• Grammar & punctuation</li>
                <li>• Reading comprehension</li>
              </ul>
            </div>

            {/* Verbal Reasoning */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center mb-4">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Verbal Reasoning</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Logic puzzles and word-based reasoning challenges
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Word analogies</li>
                <li>• Letter sequences</li>
                <li>• Word codes</li>
                <li>• Odd one out & logic</li>
              </ul>
            </div>

            {/* Non-Verbal Reasoning */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                <span className="text-2xl">🔷</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Non-Verbal</h3>
              <p className="text-gray-500 mb-4 text-sm">
                Visual patterns and spatial reasoning puzzles
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
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
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-4">
            How it works
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            A complete system designed by parents, for parents
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-purple-light flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">Kids log in and play</h3>
              <p className="text-gray-500 text-sm">
                Short game rounds of about 5–10 minutes. They can follow Today&apos;s Mission or choose from 20+ different game types.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-orange-light flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">We track progress automatically</h3>
              <p className="text-gray-500 text-sm">
                Every answer is recorded behind the scenes – accuracy, stars, streaks, perfect scores and time spent are all logged for you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-blue-light flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">You choose how to reward effort</h3>
              <p className="text-gray-500 text-sm">
                Parents and tutors get dashboards showing progress for each child and can decide what their achievements are worth – from pocket money to screen time or simple praise.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-brand-navy text-center">
              <span className="font-bold">You decide the reward rules</span> – for example, kids can earn £1 for a perfect 20/20 game once per week.
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Brain Battle Academy just tracks the scores – you choose the rewards.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-6">
            Built by a parent for <span className="text-brand-purple">11+ prep</span>
          </h2>
          <p className="text-gray-500 text-center mb-12 leading-relaxed max-w-2xl mx-auto">
            Brain Battle Academy started as an app I built for my son&apos;s 11+ preparation. What began as a way to make practice more engaging has grown into a platform now being tested with other children.
          </p>

          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple-light flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💬</span>
              </div>
              <div>
                <p className="text-gray-600 italic mb-2">
                  &quot;It turns 11+ drilling into something my child actually wants to do.&quot;
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  – Parent tester
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Contact */}
      <section className="py-20 bg-[#FAFAFA]" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-12">
            Questions from <span className="text-brand-purple">parents & tutors</span>
          </h2>

          <div className="space-y-4 mb-12">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">Is this a replacement for a tutor?</span>
                <span className="text-brand-purple font-bold">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-4 text-text-secondary">
                  No – it&apos;s a practice companion. Brain Battle Academy helps with consistent, structured practice and makes drilling more engaging. It works best alongside tutoring or as part of a balanced prep plan.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-navy">How much does it cost?</span>
                <span className="text-brand-purple font-bold">{openFaq === 4 ? '−' : '+'}</span>
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-4 text-text-secondary">
                  We&apos;re currently in a small pilot phase with select families. If you&apos;re interested, get in touch and we can discuss access.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">
              Have more questions?
            </h3>
            <p className="text-gray-500 mb-6">
              We&apos;d love to hear from you. Get in touch to learn more or discuss access.
            </p>
            <a href="mailto:edou.mota@me.com">
              <button className="px-8 py-3 bg-brand-purple text-white rounded-full font-semibold hover:bg-brand-purple-dark transition-all">
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
