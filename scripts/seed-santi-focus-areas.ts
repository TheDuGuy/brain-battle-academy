/**
 * Seed Santi's focus areas from Griffin Teaching Report - Autumn 2025
 * Run with: npx tsx scripts/seed-santi-focus-areas.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Focus areas from tutor report with game mappings
const focusAreas = [
  // ENGLISH - Critical areas (low test scores)
  {
    subject: 'ENGLISH',
    topic: 'comprehension',
    status: 'DEVELOPING', // 30% score - needs most support
    priority: 1,
    targetGames: ['comprehension-master', 'quiz-master'],
  },
  {
    subject: 'ENGLISH',
    topic: 'spelling',
    status: 'DEVELOPING', // 58% score - needs significant support
    priority: 1,
    targetGames: ['spelling-ace'],
  },
  {
    subject: 'ENGLISH',
    topic: 'punctuation',
    status: 'IMPROVING', // 83% score - almost there
    priority: 2,
    targetGames: ['grammar-guardian'],
  },

  // MATHS - Areas needing work
  {
    subject: 'MATHS',
    topic: 'long multiplication',
    status: 'DEVELOPING', // explicitly marked as developing
    priority: 1,
    targetGames: ['quick-fire', 'calculator-detective', 'quiz-master'],
  },
  {
    subject: 'MATHS',
    topic: 'division with remainder',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['quick-fire', 'calculator-detective'],
  },
  {
    subject: 'MATHS',
    topic: 'decimal multiplication',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['quick-fire', 'fraction-master'],
  },
  {
    subject: 'MATHS',
    topic: 'factors multiples primes',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['power-numbers', 'quick-fire'],
  },
  {
    subject: 'MATHS',
    topic: 'inverse operations',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['calculator-detective', 'quick-fire'],
  },
  {
    subject: 'MATHS',
    topic: 'ordering decimals',
    status: 'IMPROVING',
    priority: 3,
    targetGames: ['fraction-master'],
  },

  // VERBAL REASONING - Areas needing work
  {
    subject: 'VR',
    topic: 'synonyms',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['synonym-finder', 'vocabulary-builder'],
  },
  {
    subject: 'VR',
    topic: 'antonyms',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['synonym-finder', 'vocabulary-builder'],
  },
  {
    subject: 'VR',
    topic: 'word relationships',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['word-analogies', 'odd-one-out'],
  },
  {
    subject: 'VR',
    topic: '2 words from 5',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['word-codes', 'logic-puzzles'],
  },

  // NON-VERBAL REASONING
  {
    subject: 'NVR',
    topic: 'most unlike',
    status: 'IMPROVING',
    priority: 2,
    targetGames: ['pattern-sequences', 'shape-explorer'],
  },
]

async function main() {
  console.log('🎯 Seeding Santi\'s focus areas from tutor report...\n')

  // Find Santi's user ID
  const santi = await prisma.user.findFirst({
    where: { name: 'Santi' }
  })

  if (!santi) {
    console.error('❌ Santi not found in database!')
    return
  }

  console.log(`Found Santi (ID: ${santi.id})\n`)

  // Clear existing focus areas for Santi
  await prisma.focusArea.deleteMany({
    where: { userId: santi.id }
  })
  console.log('Cleared existing focus areas\n')

  // Insert new focus areas
  for (const area of focusAreas) {
    await prisma.focusArea.create({
      data: {
        userId: santi.id,
        subject: area.subject,
        topic: area.topic,
        status: area.status,
        priority: area.priority,
        targetGames: JSON.stringify(area.targetGames),
        source: 'Griffin Teaching Report - Autumn 2025',
      }
    })
    console.log(`  ✅ ${area.subject}: ${area.topic} (${area.status})`)
  }

  console.log(`\n📊 Summary:`)
  console.log(`  Total focus areas: ${focusAreas.length}`)
  console.log(`  DEVELOPING (priority): ${focusAreas.filter(a => a.status === 'DEVELOPING').length}`)
  console.log(`  IMPROVING: ${focusAreas.filter(a => a.status === 'IMPROVING').length}`)

  console.log('\n✨ Focus areas seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
