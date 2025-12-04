/**
 * Cheat Sheet Configuration
 * Subject-aware content for the in-game cheat sheet
 */

export type CheatSheetSubject = 'MATHS' | 'ENGLISH' | 'VR' | 'NVR'

export interface CheatSection {
  title: string
  symbol?: string
  icon: string
  description: string
  color: string
  items: string[]
}

export interface CheatSheetDefinition {
  title: string
  general: CheatSection[]
  subjectSpecific: CheatSection[]
}

// ============================================================================
// General Sections (shown for all subjects)
// ============================================================================

const generalSections: CheatSection[] = [
  {
    title: 'Alphabet Helper',
    symbol: 'A-Z',
    icon: '🔤',
    description: 'Letter positions and common jumps',
    color: 'from-indigo-400 to-blue-500',
    items: [
      'A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10',
      'K=11, L=12, M=13, N=14, O=15, P=16, Q=17, R=18, S=19, T=20',
      'U=21, V=22, W=23, X=24, Y=25, Z=26',
      'Next letter = +1, previous = -1',
      'Common jumps: +2 (skip one), +3, -2, -3'
    ]
  },
  {
    title: 'Exam Brain',
    symbol: '🧠',
    icon: '💡',
    description: 'Smart test-taking tips',
    color: 'from-amber-400 to-yellow-500',
    items: [
      'Take one deep breath before you start.',
      'Look for patterns, not random numbers or letters.',
      'Cross out answers that are obviously wrong.',
      'If you get stuck, guess and move on – don\'t waste time.'
    ]
  }
]

// ============================================================================
// Maths Sections
// ============================================================================

const mathsSections: CheatSection[] = [
  {
    title: 'Square Numbers',
    symbol: '2²',
    icon: '📦',
    description: 'Multiply a number by itself (up to 12×12)',
    color: 'from-blue-400 to-cyan-500',
    items: ['1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144']
  },
  {
    title: 'Cube Numbers',
    symbol: '2³',
    icon: '🧊',
    description: 'Multiply a number by itself twice (2×2×2 = 8)',
    color: 'from-purple-400 to-pink-500',
    items: ['1, 8, 27, 64, 125, 216']
  },
  {
    title: 'Prime Numbers',
    symbol: 'P',
    icon: '🔢',
    description: 'Numbers that divide only by themselves and 1',
    color: 'from-green-400 to-emerald-500',
    items: ['2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97']
  },
  {
    title: 'Factors & Multiples',
    symbol: '÷×',
    icon: '🔨',
    description: 'Numbers that divide in or multiply out',
    color: 'from-orange-400 to-red-500',
    items: [
      'Factors: Whole numbers that divide into a number exactly',
      'Example: Factors of 12 are 1, 2, 3, 4, 6, 12',
      'Multiples: Numbers you get when you multiply',
      'Example: Multiples of 3 are 3, 6, 9, 12, 15, 18...'
    ]
  },
  {
    title: 'Quick Facts',
    symbol: '⚡',
    icon: '🧮',
    description: 'Handy calculation tips',
    color: 'from-pink-400 to-rose-500',
    items: [
      'Add/subtract: line up digits by place value.',
      'Times: know 6, 7, 8, 9, 12 tables well.',
      'Divide: use chunks you know (10×, 5×, 2×).',
      'Percentages: 10% = divide by 10, 50% = half'
    ]
  },
  {
    title: 'Area & Perimeter',
    symbol: '📐',
    icon: '📏',
    description: 'Shape calculations',
    color: 'from-teal-400 to-cyan-500',
    items: [
      'Rectangle area = length × width',
      'Perimeter = add all the sides',
      'Triangle area = (base × height) ÷ 2',
      'Circle area = π × r² (π ≈ 3.14)'
    ]
  }
]

// ============================================================================
// English Sections
// ============================================================================

const englishSections: CheatSection[] = [
  {
    title: 'Synonyms Strategy',
    symbol: '≈',
    icon: '🔤',
    description: 'Finding words with similar meanings',
    color: 'from-blue-400 to-indigo-500',
    items: [
      'Cover the options and think of your own word first.',
      'Match the feeling: positive, negative or neutral.',
      'Check if both words could replace each other in a sentence.',
      'Watch for traps: similar spelling ≠ similar meaning'
    ]
  },
  {
    title: 'Prefixes & Suffixes',
    symbol: 'un-',
    icon: '🧩',
    description: 'Word parts that change meaning',
    color: 'from-purple-400 to-pink-500',
    items: [
      'un- (not): unhappy, unable, unfair',
      're- (again): redo, return, rebuild',
      'mis- (wrong): mistake, misread, misunderstand',
      'pre- (before): preview, prepare, prefix',
      '-ful (full of): helpful, careful, beautiful',
      '-less (without): careless, hopeless, fearless'
    ]
  },
  {
    title: 'Comprehension',
    symbol: '📖',
    icon: '🎓',
    description: 'Reading and understanding passages',
    color: 'from-green-400 to-emerald-500',
    items: [
      '1) Read the question first',
      '2) Scan the text for key words',
      '3) Read around those words carefully',
      '4) Answer in your own words if needed',
      'Underline key words as you read.',
      'Look for clues near the question\'s key word.'
    ]
  },
  {
    title: 'Spelling Tips',
    symbol: '✏️',
    icon: '📝',
    description: 'Tricky spelling patterns',
    color: 'from-orange-400 to-amber-500',
    items: [
      'i before e except after c (receive, believe)',
      'Double the consonant after short vowels (running, hopping)',
      'Drop the e when adding -ing (make → making)',
      'Change y to i before -es or -ed (carry → carries)'
    ]
  }
]

// ============================================================================
// Verbal Reasoning Sections
// ============================================================================

const vrSections: CheatSection[] = [
  {
    title: 'Letter & Code Questions',
    symbol: 'ABC',
    icon: '🔐',
    description: 'Cracking letter patterns and codes',
    color: 'from-violet-400 to-purple-500',
    items: [
      'Use A=1...Z=26 to spot number jumps.',
      'Check if both letters move by the same amount.',
      'Watch for patterns like +2, +3, -1, -2.',
      'Look for mirror patterns (A↔Z, B↔Y, etc.)'
    ]
  },
  {
    title: 'Hidden Words',
    symbol: '🔍',
    icon: '👀',
    description: 'Finding words hidden across sentences',
    color: 'from-cyan-400 to-blue-500',
    items: [
      'Look across the END of one word and START of the next.',
      'The hidden word spans two or more words.',
      'Read letter by letter, not word by word.',
      'Example: "The CAT ate" hides "cat" but also check joins!'
    ]
  },
  {
    title: 'Odd One Out',
    symbol: '🎯',
    icon: '❓',
    description: 'Finding the word that doesn\'t belong',
    color: 'from-rose-400 to-pink-500',
    items: [
      'Ask: "What are most of these – places, jobs, vehicles, feelings?"',
      'Pick the one that doesn\'t fit that group.',
      'Check for: category, size, colour, meaning, part of speech.',
      '4 things have something in common, 1 doesn\'t.'
    ]
  },
  {
    title: 'Word Analogies',
    symbol: '→',
    icon: '🧩',
    description: 'Completing word relationships',
    color: 'from-emerald-400 to-teal-500',
    items: [
      'Find the relationship: opposite? part of? type of?',
      'Apply the SAME relationship to the second pair.',
      'Common types: synonyms, antonyms, category, degree.',
      'Example: hot → cold, so big → small (opposites)'
    ]
  }
]

// ============================================================================
// Non-Verbal Reasoning Sections
// ============================================================================

const nvrSections: CheatSection[] = [
  {
    title: 'Things to Check',
    symbol: '👁️',
    icon: '🔍',
    description: 'What to look for in every question',
    color: 'from-blue-400 to-indigo-500',
    items: [
      'Number of shapes or symbols – does it increase/decrease?',
      'Rotation – turned a little each step?',
      'Shading – which parts are dark, light, or striped?',
      'Size – getting bigger or smaller?',
      'Position – moving around the box?'
    ]
  },
  {
    title: 'Rotation Patterns',
    symbol: '🔄',
    icon: '↻',
    description: 'Spotting how shapes turn',
    color: 'from-purple-400 to-pink-500',
    items: [
      '90° = quarter turn (like a clock hand moving 3 hours)',
      '180° = half turn (upside down)',
      '270° = three-quarter turn',
      'Clockwise vs anticlockwise – check the direction!'
    ]
  },
  {
    title: 'Mirror Images',
    symbol: '🪞',
    icon: '↔️',
    description: 'Finding reflections',
    color: 'from-cyan-400 to-teal-500',
    items: [
      'Imagine a mirror line between the shapes.',
      'Left becomes right, right becomes left.',
      'Up and down stay the same (for vertical mirror).',
      'Check small details – they flip too!'
    ]
  },
  {
    title: 'Shape Completion',
    symbol: '🧩',
    icon: '✨',
    description: 'Filling in the missing piece',
    color: 'from-orange-400 to-amber-500',
    items: [
      'Look at what\'s already there.',
      'Find the pattern in rows and columns.',
      'Each row/column often has the same elements.',
      'Check: does each row have one of each shape/shade?'
    ]
  }
]

// ============================================================================
// Main Export Function
// ============================================================================

/**
 * Get the cheat sheet definition for a given subject
 */
export function getCheatSheetDefinition(subject: CheatSheetSubject): CheatSheetDefinition {
  const subjectTitles: Record<CheatSheetSubject, string> = {
    'MATHS': 'Maths Cheat Sheet',
    'ENGLISH': 'English Cheat Sheet',
    'VR': 'Verbal Reasoning Cheat Sheet',
    'NVR': 'Non-Verbal Reasoning Cheat Sheet'
  }

  const subjectSections: Record<CheatSheetSubject, CheatSection[]> = {
    'MATHS': mathsSections,
    'ENGLISH': englishSections,
    'VR': vrSections,
    'NVR': nvrSections
  }

  return {
    title: subjectTitles[subject],
    general: generalSections,
    subjectSpecific: subjectSections[subject]
  }
}

/**
 * Helper to determine subject from gameId
 */
export function getSubjectFromGameId(gameId: string): CheatSheetSubject {
  if (
    gameId.includes('quick-fire') ||
    gameId.includes('calculator') ||
    gameId.includes('quiz') ||
    gameId.includes('fraction') ||
    gameId.includes('power') ||
    gameId.includes('problem') ||
    gameId.includes('number-sequences')
  ) {
    return 'MATHS'
  }

  if (
    gameId.includes('vocabulary') ||
    gameId.includes('synonym') ||
    gameId.includes('grammar') ||
    gameId.includes('spelling') ||
    gameId.includes('comprehension')
  ) {
    return 'ENGLISH'
  }

  if (
    gameId.includes('word-analogies') ||
    gameId.includes('letter-sequences') ||
    gameId.includes('word-codes') ||
    gameId.includes('odd-one-out') ||
    gameId.includes('logic-puzzles') ||
    gameId.includes('hidden-words')
  ) {
    return 'VR'
  }

  // Default to NVR for shape/pattern games
  return 'NVR'
}
