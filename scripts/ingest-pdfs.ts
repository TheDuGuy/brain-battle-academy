/**
 * PDF Ingestion Script
 *
 * Reads 11+ exam PDFs and imports questions into the database.
 *
 * Usage:
 *   npx tsx scripts/ingest-pdfs.ts
 */

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Import pdf-parse dynamically
let pdfParse: any
async function loadPdfParse() {
  if (!pdfParse) {
    const module = await import('pdf-parse')
    pdfParse = module.default
  }
  return pdfParse
}

// ============================================================================
// Configuration
// ============================================================================

type SubjectType = 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'
type QuestionType = 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'SYNONYM' | 'COMPREHENSION' | 'NUMERIC'

interface PDFConfig {
  path: string
  subject: SubjectType
  title: string
}

// Real 11+ exam papers from GL Assessment
const PDF_CONFIGS: PDFConfig[] = [
  {
    path: '/Users/edoumota/Downloads/11+ papers/Maths 4.pdf',
    subject: 'MATHS',
    title: 'GL Maths Paper 4'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/Maths Question Paper 8.pdf',
    subject: 'MATHS',
    title: 'GL Maths Question Paper 8'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/GL Variety Pack Test 5 Maths .pdf',
    subject: 'MATHS',
    title: 'GL Variety Pack Test 5 Maths'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/English 4.pdf',
    subject: 'ENGLISH',
    title: 'GL English Paper 4'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/English Question Paper 8.pdf',
    subject: 'ENGLISH',
    title: 'GL English Question Paper 8'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/GL Variety Pack Test 5 English .pdf',
    subject: 'ENGLISH',
    title: 'GL Variety Pack Test 5 English'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/4 VR.pdf',
    subject: 'VR',
    title: 'GL Verbal Reasoning Paper 4'
  },
  {
    path: '/Users/edoumota/Downloads/t-pz-1641387904-verbal-reasoning-ultimate-practice-pack_ver_6.pdf',
    subject: 'VR',
    title: 'Verbal Reasoning Ultimate Practice Pack'
  },
  {
    path: '/Users/edoumota/Downloads/cgp-11plus-gl-vr-free-practice-test.pdf',
    subject: 'VR',
    title: 'CGP 11+ GL VR Free Practice Test'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/NVR Question paper 8.pdf',
    subject: 'NVR',
    title: 'GL NVR Question Paper 8'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/GL Variety Pack Test 5 NVR.pdf',
    subject: 'NVR',
    title: 'GL Variety Pack Test 5 NVR'
  },
  {
    path: '/Users/edoumota/Downloads/11+ papers/GL NVR variety 4-compressed.pdf',
    subject: 'NVR',
    title: 'GL NVR Variety Pack 4'
  }
]

// ============================================================================
// Question Parsing Logic
// ============================================================================

interface ParsedQuestion {
  number: number | null
  prompt: string
  options: string[] | null
  type: QuestionType
  gameTags: string[]
  answer: string | null
  metadata: Record<string, any>
}

/**
 * Split text into question chunks based on numbered patterns
 */
function splitIntoQuestions(text: string): string[] {
  // Split on patterns like:
  // "1.", "2.", "Q1.", "Question 1", etc.
  // This regex looks for line breaks followed by question numbers
  const questionPattern = /(?:\n|^)(?:Q(?:uestion)?\s*)?(\d+)[\.\)]\s+/gi

  const chunks: string[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = questionPattern.exec(text)) !== null) {
    if (lastIndex > 0) {
      // Add the previous question
      chunks.push(text.substring(lastIndex, match.index))
    }
    lastIndex = match.index
  }

  // Add the last question
  if (lastIndex > 0 && lastIndex < text.length) {
    chunks.push(text.substring(lastIndex))
  }

  // If no numbered questions found, return the whole text as one chunk
  if (chunks.length === 0 && text.trim().length > 0) {
    chunks.push(text)
  }

  return chunks.filter(chunk => chunk.trim().length > 50) // Filter out very short chunks
}

/**
 * Extract question number from text
 */
function extractQuestionNumber(text: string): number | null {
  const match = text.match(/^(?:Q(?:uestion)?\s*)?(\d+)[\.\)]\s+/i)
  return match ? parseInt(match[1], 10) : null
}

/**
 * Detect if text contains MCQ options
 */
function extractMCQOptions(text: string): string[] | null {
  // Look for patterns like:
  // A) option text
  // A. option text
  // (A) option text
  const optionPattern = /(?:\n|^)\s*(?:\()?([A-E])[\.\)]\s+(.+?)(?=\n\s*(?:\()?[A-E][\.\)]|\n\n|$)/gis

  const options: string[] = []
  let match: RegExpExecArray | null

  while ((match = optionPattern.exec(text)) !== null) {
    const optionLetter = match[1]
    const optionText = match[2].trim()
    if (optionText.length > 0) {
      options.push(`${optionLetter}) ${optionText}`)
    }
  }

  // Need at least 2 options to be considered MCQ
  return options.length >= 2 ? options : null
}

/**
 * Classify question type based on content
 */
function classifyQuestionType(text: string, options: string[] | null, subject: SubjectType): QuestionType {
  if (options && options.length >= 2) {
    return 'MULTIPLE_CHOICE'
  }

  const lowerText = text.toLowerCase()

  // Check for synonym-style questions
  if (lowerText.includes('closest in meaning') ||
      lowerText.includes('most similar to') ||
      lowerText.includes('synonym') ||
      lowerText.includes('means the same as')) {
    return 'SYNONYM'
  }

  // Check for comprehension passages
  if (lowerText.includes('read the passage') ||
      lowerText.includes('according to the text') ||
      text.length > 500) {
    return 'COMPREHENSION'
  }

  // Check for numeric questions (maths)
  if (subject === 'MATHS' || /[\d\+\-\×\÷\=\(\)]/.test(text)) {
    return 'NUMERIC'
  }

  return 'SHORT_ANSWER'
}

/**
 * Assign game tags based on question type and subject
 */
function assignGameTags(type: QuestionType, subject: SubjectType): string[] {
  const tags: string[] = []

  // All MCQ questions can work in Quiz Master
  if (type === 'MULTIPLE_CHOICE') {
    tags.push('QUIZ_MASTER')
  }

  // Subject-specific tags
  if (subject === 'ENGLISH') {
    if (type === 'SYNONYM' || type === 'MULTIPLE_CHOICE') {
      tags.push('SYNONYM_FINDER')
    }
    if (type === 'COMPREHENSION') {
      tags.push('COMPREHENSION_MASTER')
    }
  }

  if (subject === 'MATHS') {
    if (type === 'NUMERIC' || type === 'MULTIPLE_CHOICE') {
      tags.push('MATHS_QUICK_FIRE')
    }
    tags.push('CALCULATOR_CHALLENGE')
  }

  if (subject === 'VR') {
    tags.push('VR_PUZZLE')
    if (type === 'SYNONYM') {
      tags.push('SYNONYM_FINDER')
    }
  }

  if (subject === 'NVR') {
    tags.push('NVR_PATTERN_MATCH')
  }

  // All questions can be used in weekly paper challenge
  tags.push('WEEKLY_PAPER')

  return tags
}

/**
 * Parse a single question chunk
 */
function parseQuestion(chunk: string, subject: SubjectType): ParsedQuestion | null {
  const trimmed = chunk.trim()
  if (trimmed.length < 20) return null // Too short to be a real question

  const number = extractQuestionNumber(trimmed)
  const options = extractMCQOptions(trimmed)
  const type = classifyQuestionType(trimmed, options, subject)
  const gameTags = assignGameTags(type, subject)

  // Clean up the prompt (remove question number prefix)
  let prompt = trimmed.replace(/^(?:Q(?:uestion)?\s*)?(\d+)[\.\)]\s+/i, '').trim()

  // TODO: Answer extraction is complex and depends on PDF format
  // For now, leave as null. Could be enhanced with:
  // - Separate answer key parsing
  // - OCR for answer sheets
  // - Manual annotation
  const answer = null

  return {
    number,
    prompt,
    options,
    type,
    gameTags,
    answer,
    metadata: {
      chunkLength: chunk.length,
      hasOptions: options !== null,
      optionCount: options?.length || 0
    }
  }
}

// ============================================================================
// PDF Processing
// ============================================================================

async function processPDF(config: PDFConfig): Promise<void> {
  console.log(`\n${'='.repeat(80)}`)
  console.log(`Processing: ${config.title}`)
  console.log(`Subject: ${config.subject}`)
  console.log(`Path: ${config.path}`)
  console.log('='.repeat(80))

  // Check if file exists
  if (!fs.existsSync(config.path)) {
    console.warn(`⚠️  File not found: ${config.path}`)
    console.warn('   Skipping this PDF. Please update PDF_CONFIGS with correct paths.')
    return
  }

  // Read and parse PDF
  const parser = await loadPdfParse()
  const dataBuffer = fs.readFileSync(config.path)
  const pdfData = await parser(dataBuffer)
  const text = pdfData.text

  console.log(`📄 PDF Pages: ${pdfData.numpages}`)
  console.log(`📝 Text Length: ${text.length} characters`)

  // Split into questions
  const questionChunks = splitIntoQuestions(text)
  console.log(`🔍 Detected ${questionChunks.length} question chunks`)

  if (questionChunks.length === 0) {
    console.warn('   No questions detected. PDF might have unusual formatting.')
    return
  }

  // Parse each question
  const parsedQuestions = questionChunks
    .map(chunk => parseQuestion(chunk, config.subject))
    .filter((q): q is ParsedQuestion => q !== null)

  console.log(`✅ Successfully parsed ${parsedQuestions.length} questions`)

  // Log statistics
  const typeCount: Record<string, number> = {}
  const tagCount: Record<string, number> = {}

  parsedQuestions.forEach(q => {
    typeCount[q.type] = (typeCount[q.type] || 0) + 1
    q.gameTags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  console.log('\n📊 Question Types:')
  Object.entries(typeCount).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`)
  })

  console.log('\n🎮 Game Tags:')
  Object.entries(tagCount).forEach(([tag, count]) => {
    console.log(`   ${tag}: ${count}`)
  })

  // Save to database
  console.log('\n💾 Saving to database...')

  const sourceMaterial = await prisma.sourceMaterial.create({
    data: {
      title: config.title,
      subject: config.subject,
      origin: config.path
    }
  })

  let savedCount = 0
  for (const question of parsedQuestions) {
    await prisma.importedQuestion.create({
      data: {
        sourceId: sourceMaterial.id,
        number: question.number,
        subject: config.subject,
        type: question.type,
        gameTags: JSON.stringify(question.gameTags),
        prompt: question.prompt,
        optionsJson: question.options ? JSON.stringify(question.options) : null,
        answer: question.answer,
        explanation: null,
        metadataJson: JSON.stringify(question.metadata)
      }
    })
    savedCount++
  }

  console.log(`✅ Saved ${savedCount} questions to database`)
  console.log(`📦 Source Material ID: ${sourceMaterial.id}`)

  // Show a sample question
  if (parsedQuestions.length > 0) {
    const sample = parsedQuestions[0]
    console.log('\n📝 Sample Question:')
    console.log(`   Number: ${sample.number || 'N/A'}`)
    console.log(`   Type: ${sample.type}`)
    console.log(`   Tags: ${sample.gameTags.join(', ')}`)
    console.log(`   Prompt: ${sample.prompt.substring(0, 150)}${sample.prompt.length > 150 ? '...' : ''}`)
    if (sample.options) {
      console.log(`   Options: ${sample.options.length} choices`)
    }
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('🚀 Starting PDF Ingestion')
  console.log(`📚 Processing ${PDF_CONFIGS.length} PDFs\n`)

  let totalProcessed = 0
  let totalSkipped = 0

  for (const config of PDF_CONFIGS) {
    try {
      await processPDF(config)
      totalProcessed++
    } catch (error) {
      console.error(`\n❌ Error processing ${config.path}:`)
      console.error(error)
      totalSkipped++
    }
  }

  console.log('\n' + '='.repeat(80))
  console.log('🎉 Ingestion Complete')
  console.log(`   Processed: ${totalProcessed} PDFs`)
  console.log(`   Skipped: ${totalSkipped} PDFs`)
  console.log('='.repeat(80))

  // Show total questions in database
  const totalQuestions = await prisma.importedQuestion.count()
  console.log(`\n📊 Total questions in database: ${totalQuestions}`)

  const bySubject = await prisma.importedQuestion.groupBy({
    by: ['subject'],
    _count: true
  })

  console.log('\n📚 Questions by subject:')
  bySubject.forEach(row => {
    console.log(`   ${row.subject}: ${row._count}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (error) => {
    console.error('\n❌ Fatal error:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
