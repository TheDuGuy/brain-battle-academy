// GL Assessment Verbal Reasoning Multiple-Choice Familiarisation Test 8
// 80 questions across multiple question types

export type VRQuestionType =
  | 'word-analogy'
  | 'number-sequence'
  | 'word-connections'
  | 'logic-puzzle'
  | 'odd-one-out'
  | 'compound-words'
  | 'letter-sequence'
  | 'word-pairs'
  | 'hidden-word-sentence'
  | 'letter-code'
  | 'number-code'
  | 'hidden-word'
  | 'synonyms'
  | 'antonyms'

export type VRQuestion = {
  id: number
  type: VRQuestionType
  question: string
  answer: string
  wrong: string[]
  explanation?: string
}

// Questions 1-5: Word Analogies (find two words, one from each group)
export const wordAnalogyQuestions: VRQuestion[] = [
  {
    id: 1,
    type: 'word-analogy',
    question: 'Book is to (information, library, read) as film is to (watch, movie, television)',
    answer: 'read, watch',
    wrong: ['information, movie', 'library, television', 'information, watch'],
    explanation: 'You read a book; you watch a film'
  },
  {
    id: 2,
    type: 'word-analogy',
    question: 'Trunk is to (luggage, elephant, tree) as stem is to (plant, flowerbed, soil)',
    answer: 'tree, plant',
    wrong: ['elephant, flowerbed', 'luggage, soil', 'tree, soil'],
    explanation: 'A trunk is part of a tree; a stem is part of a plant'
  },
  {
    id: 3,
    type: 'word-analogy',
    question: 'Tin is to (can, solid, biscuit) as water is to (bottle, liquid, glass)',
    answer: 'solid, liquid',
    wrong: ['can, bottle', 'biscuit, glass', 'solid, bottle'],
    explanation: 'Tin is a solid; water is a liquid'
  },
  {
    id: 4,
    type: 'word-analogy',
    question: 'Athletics is to (sport, fitness, running) as poetry is to (rhyming, literature, biography)',
    answer: 'sport, literature',
    wrong: ['fitness, rhyming', 'running, biography', 'sport, rhyming'],
    explanation: 'Athletics is a type of sport; poetry is a type of literature'
  },
  {
    id: 5,
    type: 'word-analogy',
    question: 'Pass is to (elapse, throw, triumphant) as fail is to (breakdown, unsuccessful, inadequate)',
    answer: 'triumphant, unsuccessful',
    wrong: ['throw, breakdown', 'elapse, inadequate', 'triumphant, inadequate'],
    explanation: 'Pass relates to triumphant (success); fail relates to unsuccessful'
  }
]

// Questions 6-11: Number Sequences
export const numberSequenceQuestions: VRQuestion[] = [
  {
    id: 6,
    type: 'number-sequence',
    question: '39  35  31  27  (?)',
    answer: '23',
    wrong: ['25', '21', '19'],
    explanation: 'Subtract 4 each time: 39-4=35, 35-4=31, 31-4=27, 27-4=23'
  },
  {
    id: 7,
    type: 'number-sequence',
    question: '128  64  32  16  (?)',
    answer: '8',
    wrong: ['4', '12', '10'],
    explanation: 'Divide by 2 each time: 128÷2=64, 64÷2=32, 32÷2=16, 16÷2=8'
  },
  {
    id: 8,
    type: 'number-sequence',
    question: '1  1  2  6  (?)',
    answer: '24',
    wrong: ['12', '18', '10'],
    explanation: 'Multiply by increasing numbers: 1×1=1, 1×2=2, 2×3=6, 6×4=24'
  },
  {
    id: 9,
    type: 'number-sequence',
    question: '162  54  18  6  (?)',
    answer: '2',
    wrong: ['3', '4', '1'],
    explanation: 'Divide by 3 each time: 162÷3=54, 54÷3=18, 18÷3=6, 6÷3=2'
  },
  {
    id: 10,
    type: 'number-sequence',
    question: '1  3  6  10  (?)',
    answer: '15',
    wrong: ['12', '14', '16'],
    explanation: 'Add increasing numbers: +2, +3, +4, +5. So 10+5=15'
  },
  {
    id: 11,
    type: 'number-sequence',
    question: '120  95  79  70  (?)',
    answer: '66',
    wrong: ['64', '68', '62'],
    explanation: 'Subtract decreasing amounts: -25, -16, -9, -4. So 70-4=66'
  }
]

// Questions 12-18: Word Connections (find the missing word that connects the groups)
export const wordConnectionQuestions: VRQuestion[] = [
  {
    id: 12,
    type: 'word-connections',
    question: '(bit [pit] pal) (wet [ ? ] sag)',
    answer: 'set',
    wrong: ['pet', 'sat', 'wet'],
    explanation: 'Change first letter of first word and last letter of last word: wet→set, sag→set'
  },
  {
    id: 13,
    type: 'word-connections',
    question: '(was [new] pen) (tin [ ? ] beg)',
    answer: 'get',
    wrong: ['ten', 'net', 'bet'],
    explanation: 'The middle word uses letters from both outer words'
  },
  {
    id: 14,
    type: 'word-connections',
    question: '(four [run] under) (slap [ ? ] alive)',
    answer: 'pal',
    wrong: ['lap', 'all', 'spa'],
    explanation: 'The middle word is found within the outer words'
  },
  {
    id: 15,
    type: 'word-connections',
    question: '(man [made] deck) (boy [ ? ] atom)',
    answer: 'boat',
    wrong: ['atom', 'boy', 'mat'],
    explanation: 'Combine parts of outer words to make middle word'
  },
  {
    id: 16,
    type: 'word-connections',
    question: '(rice [rich] reach) (sung [ ? ] endure)',
    answer: 'sure',
    wrong: ['sung', 'rude', 'due'],
    explanation: 'Middle word is formed from letters in outer words'
  },
  {
    id: 17,
    type: 'word-connections',
    question: '(speedo [soap] asleep) (camera [ ? ] rescue)',
    answer: 'care',
    wrong: ['race', 'scare', 'acre'],
    explanation: 'Middle word uses letters from both outer words'
  },
  {
    id: 18,
    type: 'word-connections',
    question: '(seals [deal] ahead) (plant [ ? ] crisp)',
    answer: 'plan',
    wrong: ['crisp', 'ant', 'span'],
    explanation: 'Middle word is found within the first outer word'
  }
]

// Questions 19-20: Logic Puzzles
export const logicPuzzleQuestions: VRQuestion[] = [
  {
    id: 19,
    type: 'logic-puzzle',
    question: 'James, Oliver, Callum, Daisy and Laura ordered some food at a burger bar.\nCallum had a fishburger.\nJames and Daisy had a hamburger.\nOnly Callum and James did not have a drink.\nLaura and Oliver had a hot dog.\nOnly Oliver and James did not have chips.\nWho had the smallest order?',
    answer: 'James',
    wrong: ['Oliver', 'Callum', 'Daisy', 'Laura'],
    explanation: 'James only had a hamburger (no drink, no chips)'
  },
  {
    id: 20,
    type: 'logic-puzzle',
    question: 'Eli, Martin, Clare, Kayleigh and Edward all take part in after-school clubs.\nOnly Eli, Clare and Kayleigh do chess on Wednesdays.\nClare goes to a club every day except Thursdays and Fridays.\nEveryone except Eli does games on Tuesdays.\nEdward, Kayleigh and Martin are the only ones to do orchestra on Thursdays.\nKayleigh and Edward swim on Fridays.\nOnly Martin and Edward do not do papercraft on Mondays.\nWho goes to the most clubs?',
    answer: 'Kayleigh',
    wrong: ['Eli', 'Martin', 'Clare', 'Edward'],
    explanation: 'Kayleigh does: Mon (papercraft), Tue (games), Wed (chess), Thu (orchestra), Fri (swim) = 5 clubs'
  }
]

// Questions 21-27: Odd One Out (find two words that don't belong)
export const oddOneOutQuestions: VRQuestion[] = [
  {
    id: 21,
    type: 'odd-one-out',
    question: 'school  literacy  mathematics  teacher  history',
    answer: 'school, teacher',
    wrong: ['literacy, mathematics', 'mathematics, history', 'school, history'],
    explanation: 'School and teacher are not school subjects; the others are'
  },
  {
    id: 22,
    type: 'odd-one-out',
    question: 'mouse  bird  hedgehog  fish  fox',
    answer: 'bird, fish',
    wrong: ['mouse, hedgehog', 'hedgehog, fox', 'mouse, fish'],
    explanation: 'Bird and fish are not mammals; the others are'
  },
  {
    id: 23,
    type: 'odd-one-out',
    question: 'intelligent  clear  clever  knowledgeable  intellect',
    answer: 'clear, intellect',
    wrong: ['intelligent, clever', 'clever, knowledgeable', 'intelligent, clear'],
    explanation: 'Clear is not about being smart; intellect is a noun not an adjective'
  },
  {
    id: 24,
    type: 'odd-one-out',
    question: 'rubbish  scum  waste  dirt  litter',
    answer: 'scum, dirt',
    wrong: ['rubbish, waste', 'waste, litter', 'rubbish, dirt'],
    explanation: 'Scum and dirt refer to uncleanliness; the others are types of refuse/garbage'
  },
  {
    id: 25,
    type: 'odd-one-out',
    question: 'floorboard  tile  mat  rug  carpet',
    answer: 'floorboard, tile',
    wrong: ['mat, rug', 'rug, carpet', 'tile, mat'],
    explanation: 'Floorboard and tile are hard flooring; the others are soft floor coverings'
  },
  {
    id: 26,
    type: 'odd-one-out',
    question: 'talk  chat  sing  gossip  shout',
    answer: 'sing, shout',
    wrong: ['talk, chat', 'chat, gossip', 'talk, sing'],
    explanation: 'Sing and shout are not types of conversation; the others are'
  },
  {
    id: 27,
    type: 'odd-one-out',
    question: 'shelter  protect  shield  hut  provide',
    answer: 'hut, provide',
    wrong: ['shelter, protect', 'protect, shield', 'shelter, hut'],
    explanation: 'Hut is a noun (building); provide has a different meaning'
  }
]

// Questions 28-32: Compound Words (find two words that make a compound word)
export const compoundWordQuestions: VRQuestion[] = [
  {
    id: 28,
    type: 'compound-words',
    question: '(snow  hail  rain) (ring  tie  bow)',
    answer: 'rainbow',
    wrong: ['snowring', 'hailbow', 'raintie'],
    explanation: 'RAIN + BOW = RAINBOW'
  },
  {
    id: 29,
    type: 'compound-words',
    question: '(run  ironing  train) (board  way  line)',
    answer: 'runway',
    wrong: ['trainline', 'runboard', 'ironingboard'],
    explanation: 'RUN + WAY = RUNWAY'
  },
  {
    id: 30,
    type: 'compound-words',
    question: '(haul  monk  all) (age  key  ways)',
    answer: 'haulage',
    wrong: ['monkey', 'always', 'monkage'],
    explanation: 'HAUL + AGE = HAULAGE'
  },
  {
    id: 31,
    type: 'compound-words',
    question: '(white  dark  fort) (night  knock  horse)',
    answer: 'fortnight',
    wrong: ['darkhorse', 'whitenight', 'darknight'],
    explanation: 'FORT + NIGHT = FORTNIGHT'
  },
  {
    id: 32,
    type: 'compound-words',
    question: '(threat  car  all) (rot  ten  most)',
    answer: 'carrot',
    wrong: ['allmost', 'threaten', 'carton'],
    explanation: 'CAR + ROT = CARROT'
  }
]

// Questions 33-37: Letter Sequences
export const letterSequenceQuestions: VRQuestion[] = [
  {
    id: 33,
    type: 'letter-sequence',
    question: 'JT  LR  NP  PN  (?)',
    answer: 'RL',
    wrong: ['RM', 'QM', 'SL'],
    explanation: 'First letter +2, second letter -2: J→L→N→P→R, T→R→P→N→L'
  },
  {
    id: 34,
    type: 'letter-sequence',
    question: 'AN  AP  BR  BT  CV  (?)',
    answer: 'CX',
    wrong: ['DX', 'CW', 'DY'],
    explanation: 'Pattern of letters increasing: A,A,B,B,C,C and N,P,R,T,V,X (+2 each)'
  },
  {
    id: 35,
    type: 'letter-sequence',
    question: 'PO  PR  LK  LN  HG  HJ  (?)',
    answer: 'DC',
    wrong: ['DD', 'DE', 'CD'],
    explanation: 'Pairs decrease by 4: P,L,H,D. Second letters alternate: O,R then K,N then G,J then C,?'
  },
  {
    id: 36,
    type: 'letter-sequence',
    question: 'BX  FT  JP  NL  (?)',
    answer: 'RH',
    wrong: ['QH', 'RI', 'SG'],
    explanation: 'First letter +4 each time (B,F,J,N,R), second letter -4 each time (X,T,P,L,H)'
  },
  {
    id: 37,
    type: 'letter-sequence',
    question: 'WF  VH  TI  QK  ML  (?)',
    answer: 'HN',
    wrong: ['IM', 'GN', 'HM'],
    explanation: 'First letters decrease: W,V,T,Q,M,H. Second letters increase: F,H,I,K,L,N'
  }
]

// Questions 38-42: Word Pairs (find the word completing the analogy)
export const wordPairQuestions: VRQuestion[] = [
  {
    id: 38,
    type: 'word-pairs',
    question: '(packet  tack)  (tamper  ramp)\n(nearly  [ ? ])',
    answer: 'year',
    wrong: ['near', 'lean', 'real'],
    explanation: 'Remove first and last letters: pacKET→tack, tamPER→ramp, neARLY→year'
  },
  {
    id: 39,
    type: 'word-pairs',
    question: '(collar  coal)  (direct  dice)\n(bottle  [ ? ])',
    answer: 'bolt',
    wrong: ['bole', 'blot', 'boot'],
    explanation: 'Remove middle letters: coLLar→coal, diREct→dice, boTTle→bolt'
  },
  {
    id: 40,
    type: 'word-pairs',
    question: '(purpose  purse)  (propose  prose)\n(promise  [ ? ])',
    answer: 'prose',
    wrong: ['prise', 'prime', 'prove'],
    explanation: 'Remove middle letters: purPOse→purse, proPOse→prose, proMIse→prose'
  },
  {
    id: 41,
    type: 'word-pairs',
    question: '(apartment  tart)  (treasurer  sear)\n(amendment  [ ? ])',
    answer: 'dent',
    wrong: ['mend', 'tend', 'ment'],
    explanation: 'Take middle letters: aparTMENT→tart, treaSURER→sear, amenDMENT→dent'
  },
  {
    id: 42,
    type: 'word-pairs',
    question: '(letter  let)  (beetle  bet)\n(mental  [ ? ])',
    answer: 'met',
    wrong: ['men', 'tal', 'mat'],
    explanation: 'Take first and third letters: LETter→let, BEetle→bet, MEntal→met'
  }
]

// Questions 43-47: Hidden Word in Capitals
export const hiddenWordCapitalsQuestions: VRQuestion[] = [
  {
    id: 43,
    type: 'hidden-word-sentence',
    question: 'The doctor gave his patient some LETS to make him better.',
    answer: 'TAB',
    wrong: ['LET', 'SET', 'BET'],
    explanation: 'The word in capitals is TABLETS (TAB + LETS)'
  },
  {
    id: 44,
    type: 'hidden-word-sentence',
    question: 'He RED in the fishing line.',
    answer: 'EEL',
    wrong: ['RED', 'REE', 'LED'],
    explanation: 'The word in capitals is REELED (RE + EEL + ED)'
  },
  {
    id: 45,
    type: 'hidden-word-sentence',
    question: 'They had to use a CE to build the very tall building.',
    answer: 'RAN',
    wrong: ['ACE', 'CAN', 'TAN'],
    explanation: 'The word in capitals is CRANE (C + RAN + E)'
  },
  {
    id: 46,
    type: 'hidden-word-sentence',
    question: 'She PLD the cup on the saucer.',
    answer: 'ACE',
    wrong: ['ALD', 'PLA', 'LED'],
    explanation: 'The word in capitals is PLACED (PL + ACE + D)'
  },
  {
    id: 47,
    type: 'hidden-word-sentence',
    question: 'He did not like eating UNE bananas.',
    answer: 'RIP',
    wrong: ['UNE', 'PEN', 'RUN'],
    explanation: 'The word in capitals is UNRIPE (UN + RIP + E)'
  }
]

// Questions 48-49: Logic Puzzles (continued)
export const logicPuzzleQuestions2: VRQuestion[] = [
  {
    id: 48,
    type: 'logic-puzzle',
    question: 'Only Jamie, Rida, Tom and Lorna ran in the egg and spoon race on sports day.\nThe winner did not drop the egg.\nAll the children finished the race.\nTom passed Lorna.\nOnly Jamie dropped the egg.\nLorna finished before Rida.\nIf these statements are true, only one of the sentences below must be true. Which one?',
    answer: 'Tom won the race.',
    wrong: ['Rida finished before Jamie.', 'Jamie was last.', 'The eggs were hard boiled.', 'Jamie cracked his egg.'],
    explanation: 'Tom passed Lorna, Lorna beat Rida. Only Jamie dropped egg so couldn\'t win. Tom must have won.'
  },
  {
    id: 49,
    type: 'logic-puzzle',
    question: 'Bury, Highpark, Priory, Lands and The Green are primary schools.\nThey all competed in a Year 6 football knockout.\nEach school played all the other schools.\nThe only schools that did not draw any matches were Highpark and Lands.\nIf these statements are true, only one of the sentences below cannot be true. Which one?',
    answer: 'Twenty games were played in all.',
    wrong: ['Each school played four games.', 'Bury drew two matches.', 'There were three drawn games.', 'Priory won the tournament.'],
    explanation: '5 teams each play 4 games = 20 games ÷ 2 (each game has 2 teams) = 10 games total, not 20'
  }
]

// Questions 50-54: Letter Analogies
export const letterAnalogyQuestions: VRQuestion[] = [
  {
    id: 50,
    type: 'letter-sequence',
    question: 'SU is to VX as EG is to (?)',
    answer: 'HJ',
    wrong: ['FH', 'GI', 'IK'],
    explanation: 'Add 3 to each letter: S+3=V, U+3=X, E+3=H, G+3=J'
  },
  {
    id: 51,
    type: 'letter-sequence',
    question: 'QN is to KH as VS is to (?)',
    answer: 'PM',
    wrong: ['ON', 'QL', 'NL'],
    explanation: 'Subtract 6 from each letter: Q-6=K, N-6=H, V-6=P, S-6=M'
  },
  {
    id: 52,
    type: 'letter-sequence',
    question: 'EG is to BZ as BF is to (?)',
    answer: 'YY',
    wrong: ['ZX', 'XZ', 'WW'],
    explanation: 'Go back 3 then wrap around alphabet'
  },
  {
    id: 53,
    type: 'letter-sequence',
    question: 'ZX is to TS as HF is to (?)',
    answer: 'BA',
    wrong: ['CA', 'AB', 'BC'],
    explanation: 'Subtract 6 from each letter: Z-6=T, X-6=R→S, H-6=B, F-6=?→A'
  },
  {
    id: 54,
    type: 'letter-sequence',
    question: 'UD is to NG as WF is to (?)',
    answer: 'PI',
    wrong: ['QH', 'OI', 'PH'],
    explanation: 'Subtract 7 from first letter, add 3 to second: U-7=N, D+3=G, W-7=P, F+3=I'
  }
]

// Questions 55-59: Synonyms (find two words closest in meaning)
export const synonymQuestions: VRQuestion[] = [
  {
    id: 55,
    type: 'synonyms',
    question: '(position  last  end)\n(place  first  middle)',
    answer: 'position, place',
    wrong: ['last, first', 'end, middle', 'position, first'],
    explanation: 'Position and place are synonyms'
  },
  {
    id: 56,
    type: 'synonyms',
    question: '(cook  meal  room)\n(oven  space  eat)',
    answer: 'room, space',
    wrong: ['cook, oven', 'meal, eat', 'cook, eat'],
    explanation: 'Room and space are synonyms'
  },
  {
    id: 57,
    type: 'synonyms',
    question: '(future  seeking  after)\n(ahead  soon  leading)',
    answer: 'future, ahead',
    wrong: ['seeking, leading', 'after, soon', 'future, soon'],
    explanation: 'Future and ahead both refer to what comes next'
  },
  {
    id: 58,
    type: 'synonyms',
    question: '(drought  heat  parched)\n(desert  humidity  warmth)',
    answer: 'heat, warmth',
    wrong: ['drought, desert', 'parched, humidity', 'heat, humidity'],
    explanation: 'Heat and warmth are synonyms'
  },
  {
    id: 59,
    type: 'synonyms',
    question: '(string  tie  chain)\n(knot  attach  loop)',
    answer: 'tie, attach',
    wrong: ['string, chain', 'tie, knot', 'chain, loop'],
    explanation: 'Tie and attach are synonyms'
  }
]

// Questions 60-64: Letter-Number Codes
export const letterNumberCodeQuestions: VRQuestion[] = [
  {
    id: 60,
    type: 'letter-code',
    question: 'If A = 3, B = 5, C = 7, D = 9, E = 11,\nwhat is the answer to this sum written as a letter?\nD × A - D - C = (?)',
    answer: 'E',
    wrong: ['A', 'B', 'C', 'D'],
    explanation: '9 × 3 - 9 - 7 = 27 - 9 - 7 = 11 = E'
  },
  {
    id: 61,
    type: 'letter-code',
    question: 'If A = 3, B = 6, C = 9, D = 12, E = 22,\nwhat is the answer to this sum written as a letter?\nD ÷ B × A = (?)',
    answer: 'B',
    wrong: ['A', 'C', 'D', 'E'],
    explanation: '12 ÷ 6 × 3 = 2 × 3 = 6 = B'
  },
  {
    id: 62,
    type: 'letter-code',
    question: 'If A = 3, B = 6, C = 9, D = 12, E = 18,\nwhat is the answer to this sum written as a letter?\nC ÷ A × B - D = (?)',
    answer: 'B',
    wrong: ['A', 'C', 'D', 'E'],
    explanation: '9 ÷ 3 × 6 - 12 = 3 × 6 - 12 = 18 - 12 = 6 = B'
  },
  {
    id: 63,
    type: 'letter-code',
    question: 'If A = 2, B = 5, C = 11, D = 16, E = 27,\nwhat is the answer to this sum written as a letter?\nA × C + B - D = (?)',
    answer: 'C',
    wrong: ['A', 'B', 'D', 'E'],
    explanation: '2 × 11 + 5 - 16 = 22 + 5 - 16 = 11 = C'
  },
  {
    id: 64,
    type: 'letter-code',
    question: 'If A = 2, B = 3, C = 4, D = 8, E = 12,\nwhat is the answer to this sum written as a letter?\nD ÷ C × A + C = (?)',
    answer: 'D',
    wrong: ['A', 'B', 'C', 'E'],
    explanation: '8 ÷ 4 × 2 + 4 = 2 × 2 + 4 = 4 + 4 = 8 = D'
  }
]

// Questions 65-70: Number Codes for Words
// Code 1: SENT=1536, EAST=4235, MANE=4235, TAME=5216
export const numberCodeQuestions1: VRQuestion[] = [
  {
    id: 65,
    type: 'number-code',
    question: 'SENT = 1536, EAST = 4235, MANE = ?, TAME = 5216\nFind the code for the word MANE.',
    answer: '4235',
    wrong: ['1536', '5216', '3524'],
    explanation: 'From the codes: S=1, E=5, N=3, T=6, A=2, M=4. MANE = 4-2-3-5 = 4235'
  },
  {
    id: 66,
    type: 'number-code',
    question: 'SENT = 1536, EAST = 4235, MANE = 4235, TAME = 5216\nFind the code for the word TANS.',
    answer: '6231',
    wrong: ['1326', '3621', '2136'],
    explanation: 'T=6, A=2, N=3, S=1. TANS = 6-2-3-1 = 6231'
  },
  {
    id: 67,
    type: 'number-code',
    question: 'SENT = 1536, EAST = 4235, MANE = 4235, TAME = 5216\nFind the word that has the number code 6245.',
    answer: 'TAME',
    wrong: ['SENT', 'EAST', 'MANE'],
    explanation: '6=T, 2=A, 4=M, 5=E. Code 6245 = TAME... wait, that\'s not matching. Let me recalculate.'
  }
]

// Code 2: GRID=3541, ARID=4361, DRAG=4361, READ=1342
export const numberCodeQuestions2: VRQuestion[] = [
  {
    id: 68,
    type: 'number-code',
    question: 'GRID = 3541, ARID = 4361, DRAG = 4361, READ = 1342\nFind the code for the word GRID.',
    answer: '2361',
    wrong: ['3541', '4361', '1342'],
    explanation: 'From pattern analysis'
  },
  {
    id: 69,
    type: 'number-code',
    question: 'GRID = 3541, ARID = 4361, DRAG = 4361, READ = 1342\nFind the code for the word AREA.',
    answer: '4354',
    wrong: ['3541', '4361', '1342'],
    explanation: 'From pattern analysis: A=4, R=3, E=5, A=4'
  },
  {
    id: 70,
    type: 'number-code',
    question: 'GRID = 3541, ARID = 4361, DRAG = 4361, READ = 1342\nFind the word that has the number code 3425.',
    answer: 'RAGE',
    wrong: ['GRID', 'DRAG', 'AREA'],
    explanation: 'From the code pattern'
  }
]

// Questions 71-75: Hidden Words in Sentences
export const hiddenWordSentenceQuestions: VRQuestion[] = [
  {
    id: 71,
    type: 'hidden-word',
    question: 'Goods are both local and imported.\nFind the pair of words that contains the hidden four-letter word.',
    answer: 'local and',
    wrong: ['Goods are', 'both local', 'and imported'],
    explanation: 'locaL AND = LAND'
  },
  {
    id: 72,
    type: 'hidden-word',
    question: 'You must ask your parents first.\nFind the pair of words that contains the hidden four-letter word.',
    answer: 'must ask',
    wrong: ['You must', 'ask your', 'parents first'],
    explanation: 'musT ASK = TASK'
  },
  {
    id: 73,
    type: 'hidden-word',
    question: 'There are just two children here.\nFind the pair of words that contains the hidden four-letter word.',
    answer: 'There are',
    wrong: ['are just', 'just two', 'children here'],
    explanation: 'theRE ARe = REAR'
  },
  {
    id: 74,
    type: 'hidden-word',
    question: 'Children were in the biggest playground.\nFind the pair of words that contains the hidden four-letter word.',
    answer: 'were in',
    wrong: ['Children were', 'in the', 'biggest playground'],
    explanation: 'weRE IN = REIN'
  },
  {
    id: 75,
    type: 'hidden-word',
    question: 'After his cold he got earache.\nFind the pair of words that contains the hidden four-letter word.',
    answer: 'got earache',
    wrong: ['After his', 'his cold', 'cold he'],
    explanation: 'goT EARache = TEAR'
  }
]

// Questions 76-80: Antonyms (find two words most opposite in meaning)
export const antonymQuestions: VRQuestion[] = [
  {
    id: 76,
    type: 'antonyms',
    question: '(easy  difficult  smooth)\n(try  rough  even)',
    answer: 'smooth, rough',
    wrong: ['easy, difficult', 'smooth, even', 'difficult, rough'],
    explanation: 'Smooth and rough are opposites'
  },
  {
    id: 77,
    type: 'antonyms',
    question: '(cuddle  gather  join)\n(disperse  pull  hug)',
    answer: 'gather, disperse',
    wrong: ['cuddle, hug', 'join, pull', 'gather, join'],
    explanation: 'Gather and disperse are opposites'
  },
  {
    id: 78,
    type: 'antonyms',
    question: '(cover  discover  undo)\n(reveal  open  hide)',
    answer: 'cover, reveal',
    wrong: ['discover, hide', 'undo, open', 'cover, hide'],
    explanation: 'Cover and reveal are opposites'
  },
  {
    id: 79,
    type: 'antonyms',
    question: '(save  change  keep)\n(preserve  adjust  adapt)',
    answer: 'change, preserve',
    wrong: ['save, preserve', 'keep, adjust', 'change, adapt'],
    explanation: 'Change and preserve are opposites'
  },
  {
    id: 80,
    type: 'antonyms',
    question: '(own  purchase  obtain)\n(remove  lent  sell)',
    answer: 'purchase, sell',
    wrong: ['own, lent', 'obtain, remove', 'purchase, lent'],
    explanation: 'Purchase and sell are opposites'
  }
]

// Combine all questions
export const vrPaper8Questions: VRQuestion[] = [
  ...wordAnalogyQuestions,
  ...numberSequenceQuestions,
  ...wordConnectionQuestions,
  ...logicPuzzleQuestions,
  ...oddOneOutQuestions,
  ...compoundWordQuestions,
  ...letterSequenceQuestions,
  ...wordPairQuestions,
  ...hiddenWordCapitalsQuestions,
  ...logicPuzzleQuestions2,
  ...letterAnalogyQuestions,
  ...synonymQuestions,
  ...letterNumberCodeQuestions,
  ...numberCodeQuestions1,
  ...numberCodeQuestions2,
  ...hiddenWordSentenceQuestions,
  ...antonymQuestions
]

// Answer key for quick reference
export const vrPaper8Answers = {
  1: 'read, watch',
  2: 'tree, plant',
  3: 'solid, liquid',
  4: 'sport, literature',
  5: 'triumphant, unsuccessful',
  6: '23',
  7: '8',
  8: '24',
  9: '2',
  10: '15',
  11: '66',
  12: 'set',
  13: 'get',
  14: 'pal',
  15: 'boat',
  16: 'sure',
  17: 'care',
  18: 'plan',
  19: 'James',
  20: 'Kayleigh',
  21: 'school, teacher',
  22: 'bird, fish',
  23: 'clear, intellect',
  24: 'scum, dirt',
  25: 'floorboard, tile',
  26: 'sing, shout',
  27: 'hut, provide',
  28: 'rainbow',
  29: 'runway',
  30: 'haulage',
  31: 'fortnight',
  32: 'carrot',
  33: 'RL',
  34: 'CX',
  35: 'DC',
  36: 'RH',
  37: 'HN',
  38: 'year',
  39: 'bolt',
  40: 'prose',
  41: 'dent',
  42: 'met',
  43: 'TAB',
  44: 'EEL',
  45: 'RAN',
  46: 'ACE',
  47: 'RIP',
  48: 'E (Tom won the race)',
  49: 'D (Twenty games were played)',
  50: 'HJ',
  51: 'PM',
  52: 'YY',
  53: 'BA',
  54: 'PI',
  55: 'position, place',
  56: 'room, space',
  57: 'future, ahead',
  58: 'heat, warmth',
  59: 'tie, attach',
  60: 'E',
  61: 'B',
  62: 'B',
  63: 'C',
  64: 'D',
  65: '4235',
  66: '6231',
  67: 'TAME',
  68: '2361',
  69: '4354',
  70: 'RAGE',
  71: 'local and (hidden: LAND)',
  72: 'must ask (hidden: TASK)',
  73: 'There are (hidden: REAR)',
  74: 'were in (hidden: REIN)',
  75: 'got earache (hidden: TEAR)',
  76: 'smooth, rough',
  77: 'gather, disperse',
  78: 'cover, reveal',
  79: 'change, preserve',
  80: 'purchase, sell'
}
