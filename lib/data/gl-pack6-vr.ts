type BaseQuestion = {
  question: string
  answer: string
  wrong: string[]
}

type ExplainedQuestion = BaseQuestion & {
  explanation: string
}

export type SynonymPair = {
  word: string
  synonym: string
  wrong: string[]
}

export const glPack6SynonymPairs: SynonymPair[] = [
  { word: 'fragile', synonym: 'delicate', wrong: ['strong', 'heavy', 'rough'] },
  { word: 'brisk', synonym: 'rapid', wrong: ['slow', 'gentle', 'lazy'] },
  { word: 'mournful', synonym: 'sad', wrong: ['angry', 'calm', 'bright'] },
  { word: 'dwell', synonym: 'live', wrong: ['fly', 'dig', 'lift'] },
  { word: 'glimmer', synonym: 'shine', wrong: ['snap', 'shake', 'freeze'] },
  { word: 'harvest', synonym: 'gather', wrong: ['scatter', 'hide', 'skip'] },
  { word: 'vigilant', synonym: 'watchful', wrong: ['sleepy', 'silent', 'clumsy'] },
  { word: 'amiable', synonym: 'friendly', wrong: ['cruel', 'timid', 'careless'] }
]

export const glPack6WordAnalogies: BaseQuestion[] = [
  {
    question: 'Compass is to Direction as Thermometer is to...',
    answer: 'Temperature',
    wrong: ['Weather', 'Time', 'Pressure']
  },
  {
    question: 'Feather is to Bird as Scale is to...',
    answer: 'Fish',
    wrong: ['Frog', 'Shell', 'Tree']
  },
  {
    question: 'Author is to Book as Composer is to...',
    answer: 'Symphony',
    wrong: ['Singer', 'Violin', 'Studio']
  },
  {
    question: 'Seed is to Plant as Egg is to...',
    answer: 'Bird',
    wrong: ['Nest', 'Sky', 'Wing']
  },
  {
    question: 'Lens is to Camera as Key is to...',
    answer: 'Piano',
    wrong: ['Window', 'Door', 'Drum']
  },
  {
    question: 'Oar is to Boat as Pedal is to...',
    answer: 'Bicycle',
    wrong: ['Train', 'Helmet', 'Wheel']
  },
  {
    question: 'Whisker is to Cat as Tusk is to...',
    answer: 'Elephant',
    wrong: ['Bear', 'Snake', 'Sparrow']
  },
  {
    question: 'Shovel is to Dig as Sieve is to...',
    answer: 'Strain',
    wrong: ['Cut', 'Stir', 'Pour']
  },
  {
    question: 'Poet is to Poem as Sculptor is to...',
    answer: 'Statue',
    wrong: ['Play', 'Song', 'Story']
  },
  {
    question: 'Cause is to Effect as Question is to...',
    answer: 'Answer',
    wrong: ['Problem', 'Guess', 'Choice']
  },
  {
    question: 'Galaxy is to Star as Orchard is to...',
    answer: 'Tree',
    wrong: ['Farm', 'Seed', 'Field']
  },
  {
    question: 'Herb is to Garden as Coral is to...',
    answer: 'Reef',
    wrong: ['River', 'Jungle', 'Plain']
  }
]

export const glPack6LetterSequences: ExplainedQuestion[] = [
  {
    question: 'BJ is to CK as DL is to ?',
    answer: 'EM',
    wrong: ['FO', 'DN', 'EN'],
    explanation: 'Each letter moves forward by 1: B→C, J→K, so D→E and L→M'
  },
  {
    question: 'MP is to NL as QR is to ?',
    answer: 'PS',
    wrong: ['QS', 'RT', 'PR'],
    explanation: 'First letter moves back 1, second moves forward 1'
  },
  {
    question: 'AE is to CG as IK is to ?',
    answer: 'KM',
    wrong: ['JL', 'HN', 'KO'],
    explanation: 'Add 2 to both letters'
  },
  {
    question: 'TR is to PN as MJ is to ?',
    answer: 'IF',
    wrong: ['HG', 'LG', 'KE'],
    explanation: 'Subtract 4 from each letter'
  },
  {
    question: 'AZ is to BY as CX is to ?',
    answer: 'DW',
    wrong: ['EV', 'DU', 'BW'],
    explanation: 'First letter moves forward, second backward by 1'
  },
  {
    question: 'CFI is to DHL as MPS is to ?',
    answer: 'NQT',
    wrong: ['LOR', 'MQS', 'ORT'],
    explanation: 'Each letter advances by 1'
  },
  {
    question: 'KU is to LS as PM is to ?',
    answer: 'QN',
    wrong: ['RL', 'PO', 'RS'],
    explanation: 'First letter +1, second letter -2'
  },
  {
    question: 'ADG is to BEH as CFI is to ?',
    answer: 'DGK',
    wrong: ['DEH', 'CGJ', 'DHJ'],
    explanation: 'Each position moves forward by 1'
  }
]

export const glPack6OddOneOutQuestions: ExplainedQuestion[] = [
  {
    question: 'Which word is the odd one out?\nQuartz, Granite, Marble, Willow',
    answer: 'Willow',
    wrong: ['Quartz', 'Granite', 'Marble'],
    explanation: 'Willow is a tree, the others are rocks or minerals'
  },
  {
    question: 'Which word is the odd one out?\nClarinet, Violin, Flute, Trumpet',
    answer: 'Violin',
    wrong: ['Clarinet', 'Flute', 'Trumpet'],
    explanation: 'Violin is a string instrument, the others are wind/brass'
  },
  {
    question: 'Which word is the odd one out?\nMercury, Venus, Mars, Titan',
    answer: 'Titan',
    wrong: ['Mercury', 'Venus', 'Mars'],
    explanation: 'Titan is a moon, the others are planets'
  },
  {
    question: 'Which word is the odd one out?\nSquare, Rhombus, Rectangle, Pentagon',
    answer: 'Pentagon',
    wrong: ['Square', 'Rhombus', 'Rectangle'],
    explanation: 'Pentagon has five sides, the others have four'
  },
  {
    question: 'Which word is the odd one out?\nWalnut, Almond, Peanut, Cashew',
    answer: 'Peanut',
    wrong: ['Walnut', 'Almond', 'Cashew'],
    explanation: 'Peanut is a legume, the others are tree nuts'
  },
  {
    question: 'Which word is the odd one out?\nLatitude, Longitude, Altitude, Equator',
    answer: 'Equator',
    wrong: ['Latitude', 'Longitude', 'Altitude'],
    explanation: 'Equator is a specific line, the others are measurements'
  },
  {
    question: 'Which word is the odd one out?\nPetal, Stem, Bark, Leaf',
    answer: 'Bark',
    wrong: ['Petal', 'Stem', 'Leaf'],
    explanation: 'Bark belongs to trees, the others refer to flowering plants'
  },
  {
    question: 'Which word is the odd one out?\nQuartz, Jade, Opal, Copper',
    answer: 'Copper',
    wrong: ['Quartz', 'Jade', 'Opal'],
    explanation: 'Copper is a metal, the others are gemstones'
  },
  {
    question: 'Which word is the odd one out?\nOrbit, Axis, Eclipse, Magnet',
    answer: 'Magnet',
    wrong: ['Orbit', 'Axis', 'Eclipse'],
    explanation: 'Magnet relates to forces, the others relate to astronomy'
  },
  {
    question: 'Which word is the odd one out?\nYolk, Shell, Albumen, Kernel',
    answer: 'Kernel',
    wrong: ['Yolk', 'Shell', 'Albumen'],
    explanation: 'Kernel belongs to seeds/nuts, the others are egg parts'
  }
]

export const glPack6LogicPuzzles: BaseQuestion[] = [
  {
    question: 'In the library, Mia sits to the left of Noor. Oscar sits to the right of Mia.\nIf Noor swaps seats with Oscar, who will be in the middle?',
    answer: 'Mia',
    wrong: ['Noor', 'Oscar', 'Impossible to know']
  },
  {
    question: 'Four houses stand in a row. The red house is left of the blue house.\nThe green house is right of the blue house. What colour is the third house from the left?',
    answer: 'Green',
    wrong: ['Red', 'Blue', 'Yellow']
  },
  {
    question: 'Holly has more stickers than Isaac. Isaac has fewer stickers than Jamie.\nWho definitely does NOT have the most stickers?',
    answer: 'Isaac',
    wrong: ['Holly', 'Jamie', 'Cannot tell']
  },
  {
    question: 'Every pupil who joined chess club received a badge.\nLara has a badge. What can we conclude?',
    answer: 'She might be in the chess club',
    wrong: ['She is definitely in the chess club', 'She is not in the chess club', 'She started the club']
  },
  {
    question: 'Three buses leave the station. Bus A leaves before Bus B.\nBus C leaves after Bus B. Which bus leaves last?',
    answer: 'Bus C',
    wrong: ['Bus A', 'Bus B', 'Bus A and Bus C together']
  },
  {
    question: 'If all beetles have six legs and some garden creatures are beetles,\nwhat can we say about those garden creatures?',
    answer: 'They have six legs',
    wrong: ['They can fly', 'They are red', 'They live underground']
  }
]

export const glPack6HiddenWords: ExplainedQuestion[] = [
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nThey moved to a neW AVEnue last year.',
    answer: 'wave',
    wrong: ['move', 'year', 'road'],
    explanation: 'neW AVEnue hides the word WAVE'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nThe swan fleW OVER the lake at dawn.',
    answer: 'wove',
    wrong: ['swan', 'lake', 'dawn'],
    explanation: 'fleW OVER hides the word WOVE'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nPlease plaY EARly in the hall.',
    answer: 'year',
    wrong: ['play', 'hall', 'ease'],
    explanation: 'plaY EARly hides the word YEAR'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nHer lasT IDEA worked well.',
    answer: 'tide',
    wrong: ['idea', 'well', 'last'],
    explanation: 'lasT IDEA hides the word TIDE'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nThe firST ARrival rang the bell.',
    answer: 'star',
    wrong: ['bell', 'ring', 'first'],
    explanation: 'firST ARrival hides the word STAR'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nHanD IN Every worksheet on time.',
    answer: 'dine',
    wrong: ['hand', 'time', 'task'],
    explanation: 'hanD IN Every hides the word DINE'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nReST AT the inn before sunset.',
    answer: 'stat',
    wrong: ['rest', 'inn', 'gate'],
    explanation: 'reST AT hides the word STAT'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nBrinG MORE snacks for the trip.',
    answer: 'gore',
    wrong: ['bring', 'more', 'snack'],
    explanation: 'brinG MORE hides the word GORE'
  }
]

export const glPack6MissingLetterQuestions: ExplainedQuestion[] = [
  {
    question: 'What THREE letter word completes this sentence?\nThe children ma___ED across the hall.',
    answer: 'rch',
    wrong: ['rsh', 'rce', 'rck'],
    explanation: 'ma + RCH + ED = MARCHED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nShe stu___ED carefully for the test.',
    answer: 'die',
    wrong: ['dye', 'dle', 'dae'],
    explanation: 'stu + DIE + D = STUDIED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nHe gla___ED happily at the score.',
    answer: 'anc',
    wrong: ['ang', 'ane', 'onc'],
    explanation: 'gla + ANC + ED = GLANCED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThey pol___ED the silver cups.',
    answer: 'ish',
    wrong: ['osh', 'esh', 'ash'],
    explanation: 'pol + ISH + ED = POLISHED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nWe wor___ED through the puzzle.',
    answer: 'ked',
    wrong: ['ker', 'ket', 'kid'],
    explanation: 'wor + KED + ED = WORKED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThe scouts cli___ED the steep hill.',
    answer: 'imb',
    wrong: ['omb', 'umb', 'amb'],
    explanation: 'cli + IMB + ED = CLIMBED'
  }
]

export const glPack6NumberSequences: ExplainedQuestion[] = [
  {
    question: 'What comes next?\n4, 9, 15, 22, ?',
    answer: '30',
    wrong: ['28', '31', '27'],
    explanation: 'Add 5, then 6, then 7, then 8'
  },
  {
    question: 'What comes next?\n2, 6, 18, 54, ?',
    answer: '162',
    wrong: ['156', '108', '216'],
    explanation: 'Multiply by 3 each time'
  },
  {
    question: 'What comes next?\n120, 60, 30, 15, ?',
    answer: '7.5',
    wrong: ['5', '10', '12'],
    explanation: 'Divide by 2 each time'
  },
  {
    question: 'What comes next?\n5, 11, 23, 47, ?',
    answer: '95',
    wrong: ['83', '90', '99'],
    explanation: 'Double then add 1: (5×2)+1=11, (11×2)+1=23...'
  },
  {
    question: 'What comes next?\n8, 11, 17, 26, ?',
    answer: '38',
    wrong: ['33', '40', '35'],
    explanation: 'Add 3, then 6, then 9, then 12 (+3 each time)'
  },
  {
    question: 'What comes next?\n100, 97, 91, 82, ?',
    answer: '70',
    wrong: ['73', '75', '66'],
    explanation: 'Subtract 3, 6, 9, 12 (increase subtraction by 3)'
  },
  {
    question: 'What comes next?\n1, 2, 4, 7, 11, ?',
    answer: '16',
    wrong: ['14', '17', '12'],
    explanation: 'Add 1, then 2, 3, 4, 5'
  },
  {
    question: 'What comes next?\n64, 32, 16, 8, ?',
    answer: '4',
    wrong: ['2', '6', '0'],
    explanation: 'Divide by 2 each time'
  },
  {
    question: 'What comes next?\n13, 18, 24, 31, ?',
    answer: '39',
    wrong: ['36', '38', '41'],
    explanation: 'Add 5,6,7,8...'
  },
  {
    question: 'What comes next?\n7, 10, 16, 25, 37, ?',
    answer: '52',
    wrong: ['50', '48', '56'],
    explanation: 'Differences are +3, +6, +9, +12, so next is +15'
  }
]

