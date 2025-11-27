/**
 * Seed script to import Paper 8 questions into Supabase
 * Run with: npx tsx scripts/seed-paper8.ts
 */

import { PrismaClient } from '@prisma/client'
import { mathsPaper8Questions } from '../lib/data/maths-paper8'
import { vrPaper8Questions } from '../lib/data/vr-paper8'
import { nvrPaper8Questions } from '../lib/data/nvr-paper8'

const prisma = new PrismaClient()

// Map question types to game tags
const GAME_TAG_MAPPING = {
  MATHS: ['QUIZ_MASTER', 'MATHS_QUICK_FIRE'],
  VR: ['QUIZ_MASTER', 'VR_PUZZLE'],
  NVR: ['QUIZ_MASTER', 'NVR_PATTERN_MATCH'],
}

async function seedMathsPaper8() {
  console.log('📊 Seeding Maths Paper 8...')

  // Create source material
  const source = await prisma.sourceMaterial.create({
    data: {
      title: 'GL Assessment Maths Multiple-Choice Familiarisation Test 8',
      subject: 'MATHS',
      origin: 'lib/data/maths-paper8.ts',
    },
  })

  // Import questions
  for (let i = 0; i < mathsPaper8Questions.length; i++) {
    const q = mathsPaper8Questions[i]
    const allOptions = [q.answer, ...q.wrong].sort(() => Math.random() - 0.5)

    await prisma.importedQuestion.create({
      data: {
        sourceId: source.id,
        number: i + 1,
        subject: 'MATHS',
        type: 'MULTIPLE_CHOICE',
        gameTags: JSON.stringify(GAME_TAG_MAPPING.MATHS),
        prompt: q.question,
        optionsJson: JSON.stringify(allOptions),
        answer: q.answer,
      },
    })
  }

  console.log(`✅ Imported ${mathsPaper8Questions.length} Maths questions`)
  return mathsPaper8Questions.length
}

async function seedVRPaper8() {
  console.log('🔤 Seeding VR Paper 8...')

  const source = await prisma.sourceMaterial.create({
    data: {
      title: 'GL Assessment Verbal Reasoning Multiple-Choice Familiarisation Test 8',
      subject: 'VR',
      origin: 'lib/data/vr-paper8.ts',
    },
  })

  let questionNumber = 0
  for (const category of vrPaper8Questions) {
    for (const q of category.questions) {
      questionNumber++

      // Build options from answer and wrong answers
      const allOptions = q.wrong ? [q.answer, ...q.wrong].sort(() => Math.random() - 0.5) : null

      await prisma.importedQuestion.create({
        data: {
          sourceId: source.id,
          number: questionNumber,
          subject: 'VR',
          type: 'MULTIPLE_CHOICE',
          gameTags: JSON.stringify(GAME_TAG_MAPPING.VR),
          prompt: q.question,
          optionsJson: allOptions ? JSON.stringify(allOptions) : null,
          answer: q.answer,
          metadataJson: JSON.stringify({
            category: category.category,
            instruction: category.instruction
          }),
        },
      })
    }
  }

  console.log(`✅ Imported ${questionNumber} VR questions`)
  return questionNumber
}

async function seedNVRPaper8() {
  console.log('🧩 Seeding NVR Paper 8...')

  const source = await prisma.sourceMaterial.create({
    data: {
      title: 'GL Assessment Non-Verbal Reasoning Multiple-Choice Familiarisation Test 8',
      subject: 'NVR',
      origin: 'lib/data/nvr-paper8.ts',
    },
  })

  let questionNumber = 0
  for (const section of nvrPaper8Questions) {
    for (const q of section.questions) {
      questionNumber++

      await prisma.importedQuestion.create({
        data: {
          sourceId: source.id,
          number: questionNumber,
          subject: 'NVR',
          type: 'MULTIPLE_CHOICE',
          gameTags: JSON.stringify(GAME_TAG_MAPPING.NVR),
          prompt: q.description || `NVR ${section.type} question`,
          optionsJson: JSON.stringify(['A', 'B', 'C', 'D', 'E']),
          answer: q.answer,
          metadataJson: JSON.stringify({
            sectionType: section.type,
            instruction: section.instruction,
            svgData: q.svg,
            optionsSvg: q.options,
          }),
        },
      })
    }
  }

  console.log(`✅ Imported ${questionNumber} NVR questions`)
  return questionNumber
}

async function main() {
  console.log('🚀 Starting Paper 8 seed...\n')

  try {
    const mathsCount = await seedMathsPaper8()
    const vrCount = await seedVRPaper8()
    const nvrCount = await seedNVRPaper8()

    console.log('\n📈 Summary:')
    console.log(`   Maths: ${mathsCount} questions`)
    console.log(`   VR: ${vrCount} questions`)
    console.log(`   NVR: ${nvrCount} questions`)
    console.log(`   Total: ${mathsCount + vrCount + nvrCount} questions`)
    console.log('\n✨ Paper 8 seeding complete!')
  } catch (error) {
    console.error('❌ Error seeding Paper 8:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
