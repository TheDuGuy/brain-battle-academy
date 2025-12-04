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

export const glPack4SynonymPairs: SynonymPair[] = [
  { word: 'dirty', synonym: 'unclean', wrong: ['soap', 'dust', 'bath'] },
  { word: 'hog', synonym: 'pig', wrong: ['sty', 'tractor', 'farm'] },
  { word: 'burn', synonym: 'scorch', wrong: ['flame', 'time', 'dusk'] },
  { word: 'alter', synonym: 'change', wrong: ['error', 'size', 'shape'] },
  { word: 'act', synonym: 'perform', wrong: ['stage', 'music', 'theatre'] },
  { word: 'cost', synonym: 'price', wrong: ['money', 'coin', 'label'] },
  { word: 'dodge', synonym: 'avoid', wrong: ['hit', 'trick', 'secret'] }
]

export const glPack4WordAnalogies: BaseQuestion[] = [
  {
    question: 'May is to Month as Friday is to...',
    answer: 'Day',
    wrong: ['End', 'Thursday', 'Week']
  },
  {
    question: 'Key is to Lock as String is to...',
    answer: 'Violin',
    wrong: ['Ball', 'Wind', 'Piano']
  },
  {
    question: 'Wing is to Bird as Leg is to...',
    answer: 'Walk',
    wrong: ['Arm', 'Fly', 'Black']
  },
  {
    question: 'Restore is to Fix as Break is to...',
    answer: 'Damage',
    wrong: ['Holiday', 'New', 'Shop']
  },
  {
    question: 'Leave is to Go as Arrive is to...',
    answer: 'Come',
    wrong: ['On', 'Off', 'Door']
  },
  {
    question: 'Hard is to Firm as Easy is to...',
    answer: 'Simple',
    wrong: ['Soft', 'Chair', 'Difficult']
  },
  {
    question: 'Danger is to Risk as Safety is to...',
    answer: 'Security',
    wrong: ['Sit', 'Belt', 'Knife']
  },
  {
    question: 'Dirty is to Unclean as Soap is to...',
    answer: 'Bath',
    wrong: ['Dust', 'Drudge', 'Wash']
  },
  {
    question: 'Sty is to Pig as Farm is to...',
    answer: 'Tractor',
    wrong: ['Hog', 'Bacon', 'Animal']
  },
  {
    question: 'Flame is to Burn as Dusk is to...',
    answer: 'Dark',
    wrong: ['Time', 'Scorch', 'Light']
  },
  {
    question: 'Error is to Alter as Change is to...',
    answer: 'Shape',
    wrong: ['Size', 'Dress', 'Same']
  },
  {
    question: 'Stage is to Act as Theatre is to...',
    answer: 'Play',
    wrong: ['Music', 'Perform', 'Watch']
  },
  {
    question: 'Money is to Cost as Coin is to...',
    answer: 'Price',
    wrong: ['Label', 'Buy', 'Spend']
  },
  {
    question: 'Hit is to Dodge as Avoid is to...',
    answer: 'Secret',
    wrong: ['Trick', 'Shy', 'Hide']
  }
]

export const glPack4LetterSequences: ExplainedQuestion[] = [
  {
    question: 'HI is to KL as NO is to ?',
    answer: 'QR',
    wrong: ['PQ', 'RS', 'OP'],
    explanation: 'Add 3 to each letter: H+3=K, I+3=L; so N+3=Q, O+3=R'
  },
  {
    question: 'AB is to DE as GH is to ?',
    answer: 'JK',
    wrong: ['IJ', 'KL', 'HI'],
    explanation: 'Add 3 to each letter: A+3=D, B+3=E; so G+3=J, H+3=K'
  },
  {
    question: 'ZY is to XW as VU is to ?',
    answer: 'TS',
    wrong: ['ST', 'UT', 'RQ'],
    explanation: 'Subtract 2 from each letter: Z-2=X, Y-2=W; so V-2=T, U-2=S'
  },
  {
    question: 'CF is to IL as OR is to ?',
    answer: 'UX',
    wrong: ['TW', 'VY', 'SV'],
    explanation: 'Add 6 to each letter: C+6=I, F+6=L; so O+6=U, R+6=X'
  },
  {
    question: 'ZW is to TQ as NK is to ?',
    answer: 'HE',
    wrong: ['GD', 'IF', 'JG'],
    explanation: 'Subtract 6 from each letter: Z-6=T, W-6=Q; so N-6=H, K-6=E'
  },
  {
    question: 'CD is to GH as KL is to ?',
    answer: 'OP',
    wrong: ['MN', 'NP', 'PQ'],
    explanation: 'Add 4 to each letter: C+4=G, D+4=H; so K+4=O, L+4=P'
  },
  {
    question: 'AD is to GJ as MP is to ?',
    answer: 'SV',
    wrong: ['RU', 'TW', 'QT'],
    explanation: 'Add 6 to each letter: A+6=G, D+6=J; so M+6=S, P+6=V'
  }
]

export const glPack4OddOneOutQuestions: ExplainedQuestion[] = [
  {
    question: 'Which word is the odd one out?',
    answer: 'Sea',
    wrong: ['Country', 'Town', 'Village'],
    explanation: 'Sea is a body of water, the others are types of settlements'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'River',
    wrong: ['Country', 'Town', 'Village'],
    explanation: 'River is a body of water, the others are types of settlements'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Run',
    wrong: ['Coach', 'Bus', 'Train'],
    explanation: 'Run is an action/verb, the others are vehicles'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Swim',
    wrong: ['Coach', 'Bus', 'Train'],
    explanation: 'Swim is an action/verb, the others are vehicles'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Table',
    wrong: ['Chair', 'Sofa', 'Bench'],
    explanation: 'Table is not for sitting, the others are seating furniture'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Bed',
    wrong: ['Chair', 'Sofa', 'Bench'],
    explanation: 'Bed is for lying down, the others are for sitting'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Top',
    wrong: ['Leg', 'Chest', 'Head'],
    explanation: 'Top is a position word, the others are body parts'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Under',
    wrong: ['Leg', 'Chest', 'Head'],
    explanation: 'Under is a position word, the others are body parts'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Red',
    wrong: ['Lemon', 'Melon', 'Banana'],
    explanation: 'Red is a colour, the others are fruits'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Blue',
    wrong: ['Lemon', 'Melon', 'Banana'],
    explanation: 'Blue is a colour, the others are fruits'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Spade',
    wrong: ['Dig', 'Cultivate', 'Grow'],
    explanation: 'Spade is a noun (tool), the others are gardening verbs'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Bulb',
    wrong: ['Dig', 'Cultivate', 'Grow'],
    explanation: 'Bulb is a noun (plant part), the others are gardening verbs'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Angry',
    wrong: ['Triangle', 'Square', 'Cross'],
    explanation: 'Angry is an emotion/feeling, the others are shapes'
  },
  {
    question: 'Which word is the odd one out?',
    answer: 'Feeling',
    wrong: ['Triangle', 'Square', 'Cross'],
    explanation: 'Feeling is an emotion, the others are shapes'
  }
]

export const glPack4LogicPuzzles: BaseQuestion[] = [
  {
    question: 'James, Rajeesh and Callum go to the park every afternoon.\nThere are swings, a slide and a climbing frame.\nJames likes swings best, Callum prefers the climbing frame and slide.\nWhich statement MUST be true?',
    answer: 'Callum likes the swings least',
    wrong: ['Rajeesh likes the slide best', 'James plays on swings in the morning', 'Rajeesh and Callum never go on swings']
  },
  {
    question: 'Malcolm, Mohammed, Lucy, Sally and Robin all have pets.\nMalcolm, Mohammed and Robin each have a dog.\nMalcolm has a cat. Sally has a rabbit and snake.\nMohammed also has a snake. Lucy and Robin have a parrot each.\nWho keeps the least pets?',
    answer: 'Lucy',
    wrong: ['Malcolm', 'Robin', 'Sally']
  },
  {
    question: 'Five children are in a queue. Amy is behind Ben. Charlie is in front of Ben.\nDaniel is behind Amy. Who is at the back of the queue?',
    answer: 'Daniel',
    wrong: ['Amy', 'Ben', 'Charlie']
  },
  {
    question: 'In a race, Tom finished before Sarah. Sarah finished before James.\nMike finished after James but before Lisa. Who came third?',
    answer: 'James',
    wrong: ['Tom', 'Sarah', 'Mike']
  },
  {
    question: 'All the children in Class 5 have a pet. Sam is in Class 5.\nSome children in Class 5 have a dog. What can we definitely say about Sam?',
    answer: 'Sam has a pet',
    wrong: ['Sam has a dog', 'Sam does not have a dog', 'Sam has two pets']
  }
]

export const glPack4HiddenWords: ExplainedQuestion[] = [
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nShe is our team\'s best player.',
    answer: 'sour',
    wrong: ['team', 'best', 'play'],
    explanation: 'iS OUR - SOUR is hidden across "is our"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nI\'ll be home at four o\'clock.',
    answer: 'meat',
    wrong: ['home', 'four', 'beam'],
    explanation: 'hoME AT - MEAT is hidden across "home at"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nThere is some risk in flying.',
    answer: 'skin',
    wrong: ['risk', 'some', 'flew'],
    explanation: 'riSK IN - SKIN is hidden across "risk in"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nCoat the wall with emulsion paint.',
    answer: 'them',
    wrong: ['wall', 'coat', 'pain'],
    explanation: 'wiTH EMulsion - THEM is hidden across "with emulsion"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nCan I pay my fee later?',
    answer: 'feel',
    wrong: ['late', 'pays', 'free'],
    explanation: 'FEE Later - FEEL is hidden across "fee later"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nCan you jump over your gate?',
    answer: 'very',
    wrong: ['jump', 'gate', 'your'],
    explanation: 'oVER Your - VERY is hidden across "over your"'
  },
  {
    question: 'Find a FOUR letter word hidden across TWO words:\nThis carpet is very badly stained.',
    answer: 'scar',
    wrong: ['very', 'carp', 'stai'],
    explanation: 'thiS CARpet - SCAR is hidden across "this carpet"'
  }
]

export const glPack4MissingLetterQuestions: ExplainedQuestion[] = [
  {
    question: 'What THREE letter word completes this sentence?\nThe boy kicked S___ES along the street.',
    answer: 'ton',
    wrong: ['one', 'ide', 'ome'],
    explanation: 'S + TON + ES = STONES'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThe doctor asked how she was F___ING today.',
    answer: 'eel',
    wrong: ['all', 'ail', 'ind'],
    explanation: 'F + EEL + ING = FEELING'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThey will be ___INNING the race soon.',
    answer: 'beg',
    wrong: ['win', 'run', 'fin'],
    explanation: 'BEG + INNING = BEGINNING'
  },
  {
    question: 'What THREE letter word completes this sentence?\nHis hair looked N___R after it was cut.',
    answer: 'eat',
    wrong: ['ice', 'ear', 'eed'],
    explanation: 'N + EAT + R = NEATER'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThey collected for the church A___L.',
    answer: 'pea',
    wrong: ['ppl', 'ble', 'ide'],
    explanation: 'A + PP + EA + L = APPEAL (with PEA removed from the middle)'
  },
  {
    question: 'What THREE letter word completes this sentence?\nThe girl FR___ED when her mother would not let her go.',
    answer: 'own',
    wrong: ['ied', 'oze', 'eak'],
    explanation: 'FR + OWN + ED = FROWNED'
  },
  {
    question: 'What THREE letter word completes this sentence?\nWhen the bees S___MED it was quite frightening.',
    answer: 'war',
    wrong: ['wam', 'torm', 'eem'],
    explanation: 'S + WAR + MED = SWARMED'
  }
]

export const glPack4NumberSequences: ExplainedQuestion[] = [
  {
    question: 'What comes next?\n21, 16, 28, 23, ?',
    answer: '35',
    wrong: ['30', '28', '18'],
    explanation: 'Two interleaved sequences: odd positions (21, 28, 35) add 7; even positions (16, 23, 30) add 7'
  },
  {
    question: 'What comes next?\n47, 41, 36, 32, ?',
    answer: '29',
    wrong: ['28', '30', '27'],
    explanation: 'Subtract decreasing amounts: -6, -5, -4, -3'
  },
  {
    question: 'What comes next?\n18, 23, 21, 26, 24, 29, ?',
    answer: '27',
    wrong: ['34', '31', '25'],
    explanation: 'Alternating pattern: +5, -2, +5, -2, +5, -2'
  },
  {
    question: 'What comes next?\n38, 19, 32, 26, 26, 33, ?',
    answer: '20',
    wrong: ['40', '27', '19'],
    explanation: 'Two interleaved sequences: odd positions (38, 32, 26, 20) subtract 6; even positions (19, 26, 33) add 7'
  },
  {
    question: 'What comes next?\n41, 25, 39, 27, 36, 30, ?',
    answer: '32',
    wrong: ['33', '27', '35'],
    explanation: 'Two interleaved sequences: odd positions (41, 39, 36, 32) decrease; even positions (25, 27, 30) increase'
  },
  {
    question: 'What comes next?\n3, 5, 9, 17, 33, ?',
    answer: '65',
    wrong: ['49', '66', '57'],
    explanation: 'Differences double each time: +2, +4, +8, +16, +32'
  }
]








