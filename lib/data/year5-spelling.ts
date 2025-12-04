/**
 * Year 5 Spelling Booklet - Autumn 2025
 * Source: GT-Year-5-Spelling-Booklet-Autumn-2025.pdf
 *
 * Contains spelling patterns, rules, and exercises for Year 5 students
 * Organized by spelling patterns with multiple choice questions
 */

export type SpellingQuestionType =
  | 'correct_spelling'     // Choose the correctly spelled word
  | 'find_mistake'         // Find the spelling mistake in a sentence
  | 'fill_blank'           // Fill in the blank with correct spelling
  | 'rule_application'     // Apply spelling rule to complete word

export type SpellingQuestion = {
  id: string
  type: SpellingQuestionType
  category: string           // Spelling pattern category
  question: string
  options: string[]
  answer: string             // The correct answer (A, B, C, D or the word)
  explanation?: string
  rule?: string              // The spelling rule being tested
}

// ============================================================================
// SECTION 1: Words ending in -cious and -tious
// ============================================================================

export const ciousTiousQuestions: SpellingQuestion[] = [
  {
    id: 'spell-cious-1',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. ambicious', 'B. ambitous', 'C. ambitious', 'D. ambitios'],
    answer: 'C',
    explanation: 'Ambitious ends in -tious. The root word is ambition.',
    rule: 'Words from nouns ending in -tion usually take -tious'
  },
  {
    id: 'spell-cious-2',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. cautious', 'B. caushious', 'C. cautiuos', 'D. cautous'],
    answer: 'A',
    explanation: 'Cautious ends in -tious. The root word is caution.',
    rule: 'Words from nouns ending in -tion usually take -tious'
  },
  {
    id: 'spell-cious-3',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. malishious', 'B. malitious', 'C. malicous', 'D. malicious'],
    answer: 'D',
    explanation: 'Malicious ends in -cious. The root word is malice.',
    rule: 'Words from nouns ending in -ce usually take -cious'
  },
  {
    id: 'spell-cious-4',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. suspitious', 'B. suspicious', 'C. suspicous', 'D. suspisious'],
    answer: 'B',
    explanation: 'Suspicious ends in -cious. The root word is suspicion.',
    rule: 'Words from nouns ending in -cion take -cious'
  },
  {
    id: 'spell-cious-5',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. conscientious', 'B. consciencious', 'C. conscientous', 'D. conshientious'],
    answer: 'A',
    explanation: 'Conscientious ends in -tious. The root word is conscience.',
    rule: 'Exception: conscientious takes -tious despite conscience'
  },
  {
    id: 'spell-cious-6',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. pretentous', 'B. pretenshious', 'C. pretentious', 'D. pretenscious'],
    answer: 'C',
    explanation: 'Pretentious ends in -tious. The root word is pretense/pretention.',
    rule: 'Words from nouns ending in -tion usually take -tious'
  },
  {
    id: 'spell-cious-7',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. infectious', 'B. infectous', 'C. infectious', 'D. infecshious'],
    answer: 'A',
    explanation: 'Infectious ends in -tious. The root word is infection.',
    rule: 'Words from nouns ending in -tion usually take -tious'
  },
  {
    id: 'spell-cious-8',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. nutrishious', 'B. nutritous', 'C. nutricous', 'D. nutritious'],
    answer: 'D',
    explanation: 'Nutritious ends in -tious. The root word is nutrition.',
    rule: 'Words from nouns ending in -tion usually take -tious'
  },
  {
    id: 'spell-cious-9',
    type: 'find_mistake',
    category: '-cious/-tious endings',
    question: 'Find the spelling mistake: "The spacous room was filled with delicious food."',
    options: ['A. spacous', 'B. filled', 'C. delicious', 'D. No mistake'],
    answer: 'A',
    explanation: 'Spacious is spelled with -cious. The root word is space.',
    rule: 'Words from nouns ending in -ce usually take -cious'
  },
  {
    id: 'spell-cious-10',
    type: 'find_mistake',
    category: '-cious/-tious endings',
    question: 'Find the spelling mistake: "Her vicious dog was very ferotious."',
    options: ['A. vicious', 'B. ferotious', 'C. very', 'D. No mistake'],
    answer: 'B',
    explanation: 'Ferocious is spelled with -cious. The root word is ferocity.',
    rule: 'Words from nouns ending in -city take -cious'
  },
  {
    id: 'spell-cious-11',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. gracous', 'B. gratious', 'C. gracious', 'D. graceous'],
    answer: 'C',
    explanation: 'Gracious ends in -cious. The root word is grace.',
    rule: 'Words from nouns ending in -ce usually take -cious'
  },
  {
    id: 'spell-cious-12',
    type: 'correct_spelling',
    category: '-cious/-tious endings',
    question: 'Which spelling is correct?',
    options: ['A. precious', 'B. pretious', 'C. preshious', 'D. precous'],
    answer: 'A',
    explanation: 'Precious ends in -cious.',
    rule: 'Words from nouns ending in -ce usually take -cious'
  }
]

// ============================================================================
// SECTION 2: Words ending in -cial and -tial
// ============================================================================

export const cialTialQuestions: SpellingQuestion[] = [
  {
    id: 'spell-cial-1',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. offitial', 'B. official', 'C. offical', 'D. ofishial'],
    answer: 'B',
    explanation: 'Official has a -cial ending.',
    rule: '-cial is common after a vowel'
  },
  {
    id: 'spell-cial-2',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. essential', 'B. essencial', 'C. essenshial', 'D. essentail'],
    answer: 'A',
    explanation: 'Essential has a -tial ending.',
    rule: '-tial is common after a consonant'
  },
  {
    id: 'spell-cial-3',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. spacial', 'B. spaitial', 'C. spatial', 'D. spashial'],
    answer: 'C',
    explanation: 'Spatial has a -tial ending (related to space).',
    rule: '-tial is common after a consonant'
  },
  {
    id: 'spell-cial-4',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. finantial', 'B. financial', 'C. financal', 'D. finanshial'],
    answer: 'B',
    explanation: 'Financial has a -cial ending (related to finance).',
    rule: '-cial is common after a vowel'
  },
  {
    id: 'spell-cial-5',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. parshial', 'B. parcial', 'C. partial', 'D. partail'],
    answer: 'C',
    explanation: 'Partial has a -tial ending (related to part).',
    rule: '-tial is common after a consonant'
  },
  {
    id: 'spell-cial-6',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. comercial', 'B. commertial', 'C. comershial', 'D. commercial'],
    answer: 'D',
    explanation: 'Commercial has a -cial ending (related to commerce).',
    rule: '-cial is common after a vowel'
  },
  {
    id: 'spell-cial-7',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. artificial', 'B. artifitial', 'C. artifical', 'D. artifishial'],
    answer: 'A',
    explanation: 'Artificial has a -cial ending.',
    rule: '-cial is common after a vowel'
  },
  {
    id: 'spell-cial-8',
    type: 'correct_spelling',
    category: '-cial/-tial endings',
    question: 'Which spelling is correct?',
    options: ['A. potencial', 'B. potenshial', 'C. potential', 'D. potentail'],
    answer: 'C',
    explanation: 'Potential has a -tial ending.',
    rule: '-tial is common after a consonant'
  },
  {
    id: 'spell-cial-9',
    type: 'find_mistake',
    category: '-cial/-tial endings',
    question: 'Find the spelling mistake: "The social event was a substancial success."',
    options: ['A. social', 'B. event', 'C. substancial', 'D. success'],
    answer: 'C',
    explanation: 'Substantial is spelled with -tial.',
    rule: '-tial is common after a consonant'
  },
  {
    id: 'spell-cial-10',
    type: 'find_mistake',
    category: '-cial/-tial endings',
    question: 'Find the spelling mistake: "The special confidentail report was leaked."',
    options: ['A. special', 'B. confidentail', 'C. report', 'D. leaked'],
    answer: 'B',
    explanation: 'Confidential is spelled with -tial.',
    rule: '-tial is common after a consonant'
  }
]

// ============================================================================
// SECTION 3: Words ending in -ant/-ance/-ancy and -ent/-ence/-ency
// ============================================================================

export const antEntQuestions: SpellingQuestion[] = [
  {
    id: 'spell-ant-1',
    type: 'correct_spelling',
    category: '-ant/-ent endings',
    question: 'Which spelling is correct?',
    options: ['A. observent', 'B. observant', 'C. observunt', 'D. observint'],
    answer: 'B',
    explanation: 'Observant ends in -ant.',
    rule: 'Use -ant if there is a related word ending in -ation'
  },
  {
    id: 'spell-ant-2',
    type: 'correct_spelling',
    category: '-ant/-ent endings',
    question: 'Which spelling is correct?',
    options: ['A. tollerant', 'B. tolerent', 'C. tolerant', 'D. tollerent'],
    answer: 'C',
    explanation: 'Tolerant ends in -ant (related to toleration).',
    rule: 'Use -ant if there is a related word ending in -ation'
  },
  {
    id: 'spell-ant-3',
    type: 'correct_spelling',
    category: '-ant/-ent endings',
    question: 'Which spelling is correct?',
    options: ['A. innocant', 'B. innocent', 'C. innocint', 'D. innoscent'],
    answer: 'B',
    explanation: 'Innocent ends in -ent.',
    rule: 'Use -ent after a soft c or g sound'
  },
  {
    id: 'spell-ant-4',
    type: 'correct_spelling',
    category: '-ant/-ent endings',
    question: 'Which spelling is correct?',
    options: ['A. decant', 'B. decent', 'C. decint', 'D. desent'],
    answer: 'B',
    explanation: 'Decent ends in -ent.',
    rule: 'Use -ent after a soft c sound'
  },
  {
    id: 'spell-ant-5',
    type: 'correct_spelling',
    category: '-ance/-ence endings',
    question: 'Which spelling is correct?',
    options: ['A. substanse', 'B. substance', 'C. substence', 'D. substunce'],
    answer: 'B',
    explanation: 'Substance ends in -ance.',
    rule: 'Use -ance/-ancy if the related adjective ends in -ant'
  },
  {
    id: 'spell-ant-6',
    type: 'correct_spelling',
    category: '-ance/-ence endings',
    question: 'Which spelling is correct?',
    options: ['A. frequancy', 'B. frequincy', 'C. frequency', 'D. frequensy'],
    answer: 'C',
    explanation: 'Frequency ends in -ency (related to frequent).',
    rule: 'Use -ence/-ency if the related adjective ends in -ent'
  },
  {
    id: 'spell-ant-7',
    type: 'correct_spelling',
    category: '-ance/-ence endings',
    question: 'Which spelling is correct?',
    options: ['A. independance', 'B. independince', 'C. independence', 'D. independense'],
    answer: 'C',
    explanation: 'Independence ends in -ence (related to independent).',
    rule: 'Use -ence/-ency if the related adjective ends in -ent'
  },
  {
    id: 'spell-ant-8',
    type: 'correct_spelling',
    category: '-ance/-ence endings',
    question: 'Which spelling is correct?',
    options: ['A. hesitency', 'B. hesitancy', 'C. hesitansy', 'D. hesitense'],
    answer: 'B',
    explanation: 'Hesitancy ends in -ancy (related to hesitant).',
    rule: 'Use -ance/-ancy if the related adjective ends in -ant'
  },
  {
    id: 'spell-ant-9',
    type: 'find_mistake',
    category: '-ant/-ent endings',
    question: 'Find the spelling mistake: "The confidant student showed great persistance."',
    options: ['A. confidant', 'B. student', 'C. persistance', 'D. No mistake'],
    answer: 'C',
    explanation: 'Persistence is spelled with -ence (related to persistent).',
    rule: 'Use -ence/-ency if the related adjective ends in -ent'
  },
  {
    id: 'spell-ant-10',
    type: 'find_mistake',
    category: '-ant/-ent endings',
    question: 'Find the spelling mistake: "His elegent appearance showed great elegance."',
    options: ['A. elegent', 'B. appearance', 'C. elegance', 'D. No mistake'],
    answer: 'A',
    explanation: 'Elegant is spelled with -ant (not -ent).',
    rule: 'Elegant/elegance is an exception to remember'
  }
]

// ============================================================================
// SECTION 4: Words ending in -able and -ible
// ============================================================================

export const ableIbleQuestions: SpellingQuestion[] = [
  {
    id: 'spell-able-1',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. adorible', 'B. adorable', 'C. adoreable', 'D. adoreible'],
    answer: 'B',
    explanation: 'Adorable ends in -able (adore + able).',
    rule: '-able is used when there is a related root word'
  },
  {
    id: 'spell-able-2',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. aplicable', 'B. applycable', 'C. applicable', 'D. applicible'],
    answer: 'C',
    explanation: 'Applicable ends in -able (apply + able, y changes to ic).',
    rule: '-able is used when there is a related root word'
  },
  {
    id: 'spell-able-3',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. considerible', 'B. considerable', 'C. considarable', 'D. considrable'],
    answer: 'B',
    explanation: 'Considerable ends in -able (consider + able).',
    rule: '-able is used when there is a related root word'
  },
  {
    id: 'spell-able-4',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. possable', 'B. possibile', 'C. possible', 'D. posible'],
    answer: 'C',
    explanation: 'Possible ends in -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-5',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. horrible', 'B. horrable', 'C. horreable', 'D. horibile'],
    answer: 'A',
    explanation: 'Horrible ends in -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-6',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. incrediable', 'B. incredable', 'C. incredible', 'D. incredeable'],
    answer: 'C',
    explanation: 'Incredible ends in -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-7',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. sensable', 'B. sensible', 'C. senseible', 'D. sencible'],
    answer: 'B',
    explanation: 'Sensible ends in -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-8',
    type: 'correct_spelling',
    category: '-able/-ible endings',
    question: 'Which spelling is correct?',
    options: ['A. visable', 'B. viseable', 'C. visible', 'D. vissible'],
    answer: 'C',
    explanation: 'Visible ends in -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-9',
    type: 'find_mistake',
    category: '-able/-ible endings',
    question: 'Find the spelling mistake: "The responsable teacher was very knowledgeable."',
    options: ['A. responsable', 'B. teacher', 'C. knowledgeable', 'D. No mistake'],
    answer: 'A',
    explanation: 'Responsible is spelled with -ible.',
    rule: '-ible is used when there is no obvious root word'
  },
  {
    id: 'spell-able-10',
    type: 'find_mistake',
    category: '-able/-ible endings',
    question: 'Find the spelling mistake: "The terrible storm caused unavoidible damage."',
    options: ['A. terrible', 'B. storm', 'C. unavoidible', 'D. damage'],
    answer: 'C',
    explanation: 'Unavoidable is spelled with -able (avoid + able).',
    rule: '-able is used when there is a related root word'
  }
]

// ============================================================================
// SECTION 5: Adding suffixes to words ending in -fer
// ============================================================================

export const ferSuffixQuestions: SpellingQuestion[] = [
  {
    id: 'spell-fer-1',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct for the past tense of "refer"?',
    options: ['A. refered', 'B. referred', 'C. refferred', 'D. referrd'],
    answer: 'B',
    explanation: 'Referred doubles the r because the stress is on the -fer syllable.',
    rule: 'Double the r if the stress is on -fer when adding a suffix beginning with a vowel'
  },
  {
    id: 'spell-fer-2',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct?',
    options: ['A. transfered', 'B. transferred', 'C. transferrd', 'D. tranferred'],
    answer: 'B',
    explanation: 'Transferred doubles the r because the stress is on the -fer syllable.',
    rule: 'Double the r if the stress is on -fer when adding a suffix beginning with a vowel'
  },
  {
    id: 'spell-fer-3',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct?',
    options: ['A. preferring', 'B. prefering', 'C. preffering', 'D. prefereing'],
    answer: 'A',
    explanation: 'Preferring doubles the r because the stress is on the -fer syllable.',
    rule: 'Double the r if the stress is on -fer when adding a suffix beginning with a vowel'
  },
  {
    id: 'spell-fer-4',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct?',
    options: ['A. referrence', 'B. refference', 'C. reference', 'D. refrence'],
    answer: 'C',
    explanation: 'Reference does NOT double the r because the stress moves away from -fer.',
    rule: 'Do NOT double the r if the stress moves away from -fer'
  },
  {
    id: 'spell-fer-5',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct?',
    options: ['A. preferrence', 'B. preference', 'C. prefference', 'D. prefrence'],
    answer: 'B',
    explanation: 'Preference does NOT double the r because the stress moves to the first syllable.',
    rule: 'Do NOT double the r if the stress moves away from -fer'
  },
  {
    id: 'spell-fer-6',
    type: 'correct_spelling',
    category: '-fer suffixes',
    question: 'Which spelling is correct?',
    options: ['A. diferent', 'B. differrent', 'C. different', 'D. diffrent'],
    answer: 'C',
    explanation: 'Different has the stress on the first syllable, not on -fer.',
    rule: 'Do NOT double the r if the stress moves away from -fer'
  },
  {
    id: 'spell-fer-7',
    type: 'find_mistake',
    category: '-fer suffixes',
    question: 'Find the spelling mistake: "He refered to the reference book."',
    options: ['A. refered', 'B. reference', 'C. book', 'D. No mistake'],
    answer: 'A',
    explanation: 'Referred should have a double r (stress on -fer).',
    rule: 'Double the r if the stress is on -fer when adding a suffix beginning with a vowel'
  },
  {
    id: 'spell-fer-8',
    type: 'find_mistake',
    category: '-fer suffixes',
    question: 'Find the spelling mistake: "She was transferring her preferrence to a new school."',
    options: ['A. transferring', 'B. preferrence', 'C. new', 'D. school'],
    answer: 'B',
    explanation: 'Preference should NOT have a double r (stress moves to first syllable).',
    rule: 'Do NOT double the r if the stress moves away from -fer'
  }
]

// ============================================================================
// SECTION 6: The i before e except after c rule
// ============================================================================

export const ieEiQuestions: SpellingQuestion[] = [
  {
    id: 'spell-ie-1',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. beleive', 'B. believe', 'C. beleave', 'D. belive'],
    answer: 'B',
    explanation: 'Believe follows "i before e" rule (not after c).',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-2',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. recieve', 'B. receave', 'C. receive', 'D. recive'],
    answer: 'C',
    explanation: 'Receive has "ei" because it comes after "c".',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-3',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. decieve', 'B. deceive', 'C. deceave', 'D. decive'],
    answer: 'B',
    explanation: 'Deceive has "ei" because it comes after "c".',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-4',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. achieve', 'B. acheive', 'C. acheave', 'D. achive'],
    answer: 'A',
    explanation: 'Achieve follows "i before e" rule (not after c).',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-5',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. cieling', 'B. ceeling', 'C. ceiling', 'D. cealing'],
    answer: 'C',
    explanation: 'Ceiling has "ei" because it comes after "c".',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-6',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct? (Exception to the rule)',
    options: ['A. wierd', 'B. weird', 'C. weard', 'D. wird'],
    answer: 'B',
    explanation: 'Weird is an exception - it has "ei" but not after "c".',
    rule: 'Exception: weird, seize, either, neither, protein'
  },
  {
    id: 'spell-ie-7',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. theif', 'B. theef', 'C. thief', 'D. theaf'],
    answer: 'C',
    explanation: 'Thief follows "i before e" rule (not after c).',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-8',
    type: 'correct_spelling',
    category: 'i before e rule',
    question: 'Which spelling is correct?',
    options: ['A. nieghbour', 'B. neighbor', 'C. neighbour', 'D. neihgbour'],
    answer: 'C',
    explanation: 'Neighbour has "ei" because it sounds like "ay" not "ee".',
    rule: 'The rule only applies when the sound is "ee"'
  },
  {
    id: 'spell-ie-9',
    type: 'find_mistake',
    category: 'i before e rule',
    question: 'Find the spelling mistake: "I beleive the ceiling needs painting."',
    options: ['A. beleive', 'B. ceiling', 'C. needs', 'D. painting'],
    answer: 'A',
    explanation: 'Believe should be spelled with "ie" (i before e, not after c).',
    rule: 'i before e except after c (when it sounds like "ee")'
  },
  {
    id: 'spell-ie-10',
    type: 'find_mistake',
    category: 'i before e rule',
    question: 'Find the spelling mistake: "The thief tried to decieve the police."',
    options: ['A. thief', 'B. tried', 'C. decieve', 'D. police'],
    answer: 'C',
    explanation: 'Deceive should have "ei" after "c".',
    rule: 'i before e except after c (when it sounds like "ee")'
  }
]

// ============================================================================
// SECTION 7: Words containing the letter string "ough"
// ============================================================================

export const oughQuestions: SpellingQuestion[] = [
  {
    id: 'spell-ough-1',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "completely"?',
    options: ['A. thoroghly', 'B. thuroughly', 'C. thoroughly', 'D. thorowly'],
    answer: 'C',
    explanation: 'Thoroughly contains "ough" (from thorough).',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-2',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "past tense of think"?',
    options: ['A. thort', 'B. thought', 'C. thawt', 'D. thougt'],
    answer: 'B',
    explanation: 'Thought contains "ough" making an "aw" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-3',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "despite the fact that"?',
    options: ['A. althogh', 'B. although', 'C. alltough', 'D. althow'],
    answer: 'B',
    explanation: 'Although contains "ough" making an "oh" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-4',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "adequate"?',
    options: ['A. enugh', 'B. enuf', 'C. enough', 'D. enogh'],
    answer: 'C',
    explanation: 'Enough contains "ough" making an "uff" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-5',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "not smooth"?',
    options: ['A. ruff', 'B. rough', 'C. rogh', 'D. rought'],
    answer: 'B',
    explanation: 'Rough contains "ough" making an "uff" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-6',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "difficult"?',
    options: ['A. tuff', 'B. togh', 'C. tough', 'D. tought'],
    answer: 'C',
    explanation: 'Tough contains "ough" making an "uff" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-7',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "expelling air from lungs"?',
    options: ['A. coff', 'B. cough', 'C. cogh', 'D. cawf'],
    answer: 'B',
    explanation: 'Cough contains "ough" making an "off" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-8',
    type: 'correct_spelling',
    category: 'ough words',
    question: 'Which spelling is correct for "to plow"?',
    options: ['A. plow', 'B. plough', 'C. plouw', 'D. plogh'],
    answer: 'B',
    explanation: 'Plough (British spelling) contains "ough" making an "ow" sound.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-9',
    type: 'find_mistake',
    category: 'ough words',
    question: 'Find the spelling mistake: "I thouroughly enjoyed the tough challenge."',
    options: ['A. thouroughly', 'B. enjoyed', 'C. tough', 'D. challenge'],
    answer: 'A',
    explanation: 'Thoroughly is the correct spelling.',
    rule: '"ough" can make different sounds in different words'
  },
  {
    id: 'spell-ough-10',
    type: 'find_mistake',
    category: 'ough words',
    question: 'Find the spelling mistake: "Althogh it was ruff, I thought it was enugh."',
    options: ['A. Althogh', 'B. ruff', 'C. thought', 'D. enugh'],
    answer: 'A',
    explanation: 'Although is the correct spelling. Note: ruff and enugh are also wrong, but Althogh is the first mistake.',
    rule: '"ough" can make different sounds in different words'
  }
]

// ============================================================================
// SECTION 8: Words with silent letters
// ============================================================================

export const silentLetterQuestions: SpellingQuestion[] = [
  {
    id: 'spell-silent-1',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. nife', 'B. knife', 'C. knive', 'D. knyfe'],
    answer: 'B',
    explanation: 'Knife has a silent "k" at the beginning.',
    rule: 'Silent k before n (knife, knight, know, knee)'
  },
  {
    id: 'spell-silent-2',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. rong', 'B. wronge', 'C. wrong', 'D. whrong'],
    answer: 'C',
    explanation: 'Wrong has a silent "w" at the beginning.',
    rule: 'Silent w before r (wrong, write, wrap, wrist)'
  },
  {
    id: 'spell-silent-3',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. dout', 'B. doubt', 'C. dowt', 'D. doupt'],
    answer: 'B',
    explanation: 'Doubt has a silent "b" after "ou".',
    rule: 'Silent b after ou or before t (doubt, debt, subtle)'
  },
  {
    id: 'spell-silent-4',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. solem', 'B. solumn', 'C. solemn', 'D. sollum'],
    answer: 'C',
    explanation: 'Solemn has a silent "n" at the end.',
    rule: 'Silent n after m (solemn, autumn, column, hymn)'
  },
  {
    id: 'spell-silent-5',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. gost', 'B. goast', 'C. ghost', 'D. ghowst'],
    answer: 'C',
    explanation: 'Ghost has a silent "h" after "g".',
    rule: 'Silent gh in ghost, ghastly, gherkin'
  },
  {
    id: 'spell-silent-6',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. nee', 'B. knee', 'C. kne', 'D. neigh'],
    answer: 'B',
    explanation: 'Knee has a silent "k" at the beginning.',
    rule: 'Silent k before n (knife, knight, know, knee)'
  },
  {
    id: 'spell-silent-7',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. sissors', 'B. scissors', 'C. scisors', 'D. sizors'],
    answer: 'B',
    explanation: 'Scissors has a silent "c" in the middle.',
    rule: 'Silent c in scissors, scene, muscle, fascinate'
  },
  {
    id: 'spell-silent-8',
    type: 'correct_spelling',
    category: 'silent letters',
    question: 'Which spelling is correct?',
    options: ['A. casm', 'B. chasm', 'C. kazm', 'D. chasem'],
    answer: 'B',
    explanation: 'Chasm has a silent "h" after "c".',
    rule: 'Silent ch- sounds like "k" in some words'
  },
  {
    id: 'spell-silent-9',
    type: 'find_mistake',
    category: 'silent letters',
    question: 'Find the spelling mistake: "The nite was very solem and quiet."',
    options: ['A. nite', 'B. solem', 'C. quiet', 'D. No mistake'],
    answer: 'A',
    explanation: 'Night should have a silent "gh" - solem should also be solemn.',
    rule: 'Silent gh in night, light, might, right'
  },
  {
    id: 'spell-silent-10',
    type: 'find_mistake',
    category: 'silent letters',
    question: 'Find the spelling mistake: "I have no dout that you are rong."',
    options: ['A. dout', 'B. rong', 'C. Both A and B', 'D. No mistake'],
    answer: 'C',
    explanation: 'Doubt needs a silent "b" and wrong needs a silent "w".',
    rule: 'Multiple silent letter patterns'
  }
]

// ============================================================================
// SECTION 9: Homophones
// ============================================================================

export const homophoneQuestions: SpellingQuestion[] = [
  {
    id: 'spell-homo-1',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "The weather should be fine for the next ___ days."',
    options: ['A. for', 'B. four', 'C. fore', 'D. faur'],
    answer: 'B',
    explanation: 'Four (the number 4) is correct here.',
    rule: 'Homophones sound the same but have different meanings and spellings'
  },
  {
    id: 'spell-homo-2',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "___ going to the shops later."',
    options: ['A. Their', 'B. There', 'C. They\'re', 'D. Theyr'],
    answer: 'C',
    explanation: 'They\'re (they are) is correct here.',
    rule: 'They\'re = they are, Their = belonging to them, There = a place'
  },
  {
    id: 'spell-homo-3',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "Can you ___ me the time please?"',
    options: ['A. tell', 'B. tale', 'C. teil', 'D. tael'],
    answer: 'A',
    explanation: 'Tell (to speak) is correct. Tale means a story.',
    rule: 'Tell = to speak, Tale = a story'
  },
  {
    id: 'spell-homo-4',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "The ___ of the story was very exciting."',
    options: ['A. tail', 'B. tale', 'C. tael', 'D. teil'],
    answer: 'B',
    explanation: 'Tale (a story) is correct. Tail is what animals have.',
    rule: 'Tale = a story, Tail = animal appendage'
  },
  {
    id: 'spell-homo-5',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "We need to ___ a new car."',
    options: ['A. by', 'B. bye', 'C. buy', 'D. bigh'],
    answer: 'C',
    explanation: 'Buy (to purchase) is correct.',
    rule: 'Buy = purchase, By = near, Bye = goodbye'
  },
  {
    id: 'spell-homo-6',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "The knight wore heavy ___."',
    options: ['A. armor', 'B. armour', 'C. Both are correct', 'D. Neither'],
    answer: 'C',
    explanation: 'Both armor (American) and armour (British) are correct.',
    rule: 'British and American spellings both accepted'
  },
  {
    id: 'spell-homo-7',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "I can ___ the finish line!"',
    options: ['A. sea', 'B. see', 'C. sie', 'D. cee'],
    answer: 'B',
    explanation: 'See (to view) is correct. Sea is a body of water.',
    rule: 'See = to view, Sea = ocean'
  },
  {
    id: 'spell-homo-8',
    type: 'correct_spelling',
    category: 'homophones',
    question: 'Choose the correct word: "The sun was too ___ to look at."',
    options: ['A. bright', 'B. brite', 'C. brihgt', 'D. brighte'],
    answer: 'A',
    explanation: 'Bright is the correct spelling.',
    rule: 'Bright = shining with light'
  },
  {
    id: 'spell-homo-9',
    type: 'find_mistake',
    category: 'homophones',
    question: 'Find the mistake: "I went too the shop to by some food."',
    options: ['A. too', 'B. by', 'C. Both A and B', 'D. No mistake'],
    answer: 'C',
    explanation: 'Should be "to the shop" and "buy some food".',
    rule: 'To = direction, Too = also/excessive, Two = 2'
  },
  {
    id: 'spell-homo-10',
    type: 'find_mistake',
    category: 'homophones',
    question: 'Find the mistake: "Their going to put there bags over they\'re."',
    options: ['A. Their', 'B. there', 'C. they\'re', 'D. All three'],
    answer: 'D',
    explanation: 'Should be "They\'re going to put their bags over there."',
    rule: 'They\'re = they are, Their = belonging to them, There = a place'
  }
]

// ============================================================================
// Combined exports
// ============================================================================

export const year5SpellingQuestions = {
  ciousTious: ciousTiousQuestions,      // -cious/-tious endings
  cialTial: cialTialQuestions,          // -cial/-tial endings
  antEnt: antEntQuestions,              // -ant/-ent/-ance/-ence endings
  ableIble: ableIbleQuestions,          // -able/-ible endings
  ferSuffix: ferSuffixQuestions,        // -fer suffixes
  ieEi: ieEiQuestions,                  // i before e rule
  ough: oughQuestions,                  // ough words
  silentLetters: silentLetterQuestions, // silent letters
  homophones: homophoneQuestions        // homophones
}

// Flat array of all questions for easy iteration
export const allYear5SpellingQuestions: SpellingQuestion[] = [
  ...ciousTiousQuestions,
  ...cialTialQuestions,
  ...antEntQuestions,
  ...ableIbleQuestions,
  ...ferSuffixQuestions,
  ...ieEiQuestions,
  ...oughQuestions,
  ...silentLetterQuestions,
  ...homophoneQuestions
]

// Question count by category
export const year5SpellingStats = {
  ciousTious: ciousTiousQuestions.length,
  cialTial: cialTialQuestions.length,
  antEnt: antEntQuestions.length,
  ableIble: ableIbleQuestions.length,
  ferSuffix: ferSuffixQuestions.length,
  ieEi: ieEiQuestions.length,
  ough: oughQuestions.length,
  silentLetters: silentLetterQuestions.length,
  homophones: homophoneQuestions.length,
  total: allYear5SpellingQuestions.length
}
