/**
 * Seed script to import Year 5 Revision questions into Supabase
 * Run with: npx tsx scripts/seed-year5-revision.ts
 *
 * Imports:
 * - Year 5 Spelling Booklet questions (ENGLISH subject)
 * - Year 5 Shapes revision questions (MATHS subject)
 */

import { PrismaClient } from '@prisma/client'
import { allYear5SpellingQuestions, year5SpellingStats } from '../lib/data/year5-spelling'
import { allYear5ShapeQuestions, year5ShapeStats } from '../lib/data/year5-shapes'

const prisma = new PrismaClient()

// Map question types to game tags
const GAME_TAG_MAPPING = {
  SPELLING: ['SPELLING_ACE', 'QUIZ_MASTER'],
  SHAPES: ['QUIZ_MASTER', 'MATHS_QUICK_FIRE'],
}

async function seedSpellingQuestions() {
  console.log('📚 Seeding Year 5 Spelling questions...')
  console.log(`   Categories: ${Object.keys(year5SpellingStats).length - 1}`)
  console.log(`   Total questions: ${year5SpellingStats.total}`)

  // Create source material
  const source = await prisma.sourceMaterial.create({
    data: {
      title: 'GT Year 5 Spelling Booklet - Autumn 2025',
      subject: 'ENGLISH',
      origin: 'GT-Year-5-Spelling-Booklet-Autumn-2025.pdf',
    },
  })

  // Import questions
  let count = 0
  for (const q of allYear5SpellingQuestions) {
    count++

    await prisma.importedQuestion.create({
      data: {
        sourceId: source.id,
        number: count,
        subject: 'ENGLISH',
        type: 'MULTIPLE_CHOICE',
        gameTags: JSON.stringify(GAME_TAG_MAPPING.SPELLING),
        prompt: q.question,
        optionsJson: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation || null,
        metadataJson: JSON.stringify({
          category: q.category,
          questionType: q.type,
          rule: q.rule || null,
        }),
      },
    })
  }

  console.log(`✅ Imported ${count} Spelling questions`)
  return count
}

async function seedShapeQuestions() {
  console.log('\n🔷 Seeding Year 5 Shapes questions...')
  console.log(`   Categories: ${Object.keys(year5ShapeStats).length - 1}`)
  console.log(`   Total questions: ${year5ShapeStats.total}`)

  // Create source material
  const source = await prisma.sourceMaterial.create({
    data: {
      title: 'Quick Winter Revision 2025 - 2D and 3D Shapes',
      subject: 'MATHS',
      origin: 'Quick-Winter-Revision-2025.pdf',
    },
  })

  // Import questions
  let count = 0
  for (const q of allYear5ShapeQuestions) {
    count++

    await prisma.importedQuestion.create({
      data: {
        sourceId: source.id,
        number: count,
        subject: 'MATHS',
        type: 'MULTIPLE_CHOICE',
        gameTags: JSON.stringify(GAME_TAG_MAPPING.SHAPES),
        prompt: q.question,
        optionsJson: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation || null,
        metadataJson: JSON.stringify({
          category: q.category,
          questionType: q.type,
        }),
      },
    })
  }

  console.log(`✅ Imported ${count} Shapes questions`)
  return count
}

async function main() {
  console.log('🚀 Starting Year 5 Revision seed...\n')
  console.log('=' .repeat(50))

  try {
    const spellingCount = await seedSpellingQuestions()
    const shapesCount = await seedShapeQuestions()

    console.log('\n' + '='.repeat(50))
    console.log('\n📈 Summary:')
    console.log(`   Spelling (ENGLISH): ${spellingCount} questions`)
    console.log(`   Shapes (MATHS): ${shapesCount} questions`)
    console.log(`   Total: ${spellingCount + shapesCount} questions`)
    console.log('\n✨ Year 5 Revision seeding complete!')

    // Show breakdown
    console.log('\n📊 Spelling breakdown:')
    Object.entries(year5SpellingStats).forEach(([key, value]) => {
      if (key !== 'total') {
        console.log(`   ${key}: ${value} questions`)
      }
    })

    console.log('\n📊 Shapes breakdown:')
    Object.entries(year5ShapeStats).forEach(([key, value]) => {
      if (key !== 'total') {
        console.log(`   ${key}: ${value} questions`)
      }
    })

  } catch (error) {
    console.error('❌ Error seeding Year 5 Revision:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
