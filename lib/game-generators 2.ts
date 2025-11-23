export interface GameQuestion {
  id: string
  question: string
  answer: number | string
  options?: string[]
  userAnswer: string
  isCorrect?: boolean
  explanation?: string
}

// Quick Fire - Simple arithmetic with skill-based difficulty
export function generateQuickFireQuestion(skillLevel: number = 1): GameQuestion {
  // Skill-based difficulty progression:
  // Level 1: numbers 1-20, only + and −
  // Level 2: numbers 1-50, +, −, ×
  // Level 3+: numbers 1-100, +, −, ×, ÷

  let operations: string[]
  let maxNumber: number

  if (skillLevel <= 1) {
    operations = ['+', '-']
    maxNumber = 20
  } else if (skillLevel === 2) {
    operations = ['+', '-', '×']
    maxNumber = 50
  } else {
    operations = ['+', '-', '×', '÷']
    maxNumber = 100
  }

  const operation = operations[Math.floor(Math.random() * operations.length)]

  let num1, num2, answer, question

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * maxNumber) + 1
      num2 = Math.floor(Math.random() * maxNumber) + 1
      answer = num1 + num2
      question = `${num1} + ${num2}`
      break
    case '-':
      // Ensure positive result
      num1 = Math.floor(Math.random() * maxNumber) + (maxNumber / 2)
      num2 = Math.floor(Math.random() * (maxNumber / 2)) + 1
      answer = num1 - num2
      question = `${num1} - ${num2}`
      break
    case '×':
      // Keep multiplication manageable even at high levels
      const maxMultiplier = Math.min(12, Math.floor(maxNumber / 5))
      num1 = Math.floor(Math.random() * maxMultiplier) + 1
      num2 = Math.floor(Math.random() * maxMultiplier) + 1
      answer = num1 * num2
      question = `${num1} × ${num2}`
      break
    case '÷':
      // Ensure whole number division
      const maxDivisor = Math.min(12, Math.floor(maxNumber / 5))
      num2 = Math.floor(Math.random() * maxDivisor) + 1
      answer = Math.floor(Math.random() * maxDivisor) + 1
      num1 = num2 * answer
      question = `${num1} ÷ ${num2}`
      break
    default:
      num1 = 1
      num2 = 1
      answer = 2
      question = '1 + 1'
  }

  return {
    id: Math.random().toString(36).substring(7),
    question,
    answer,
    userAnswer: ''
  }
}

// Calculator Detective - Find the error
export function generateCalculatorDetectiveQuestion(): GameQuestion {
  const operations = ['+', '-', '×', '÷']
  const operation = operations[Math.floor(Math.random() * operations.length)]

  let num1, num2, correctAnswer, wrongAnswer, question

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 10
      num2 = Math.floor(Math.random() * 50) + 10
      correctAnswer = num1 + num2
      wrongAnswer = correctAnswer + (Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : -(Math.floor(Math.random() * 10) + 1))
      question = `${num1} + ${num2} = ${wrongAnswer}`
      break
    case '-':
      num1 = Math.floor(Math.random() * 50) + 50
      num2 = Math.floor(Math.random() * 30) + 10
      correctAnswer = num1 - num2
      wrongAnswer = correctAnswer + (Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : -(Math.floor(Math.random() * 10) + 1))
      question = `${num1} - ${num2} = ${wrongAnswer}`
      break
    case '×':
      num1 = Math.floor(Math.random() * 10) + 2
      num2 = Math.floor(Math.random() * 10) + 2
      correctAnswer = num1 * num2
      wrongAnswer = correctAnswer + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -(Math.floor(Math.random() * 5) + 1))
      question = `${num1} × ${num2} = ${wrongAnswer}`
      break
    case '÷':
      num2 = Math.floor(Math.random() * 10) + 2
      correctAnswer = Math.floor(Math.random() * 10) + 2
      num1 = num2 * correctAnswer
      wrongAnswer = correctAnswer + (Math.random() > 0.5 ? 1 : -1)
      question = `${num1} ÷ ${num2} = ${wrongAnswer}`
      break
    default:
      correctAnswer = 2
      wrongAnswer = 3
      question = '1 + 1 = 3'
  }

  return {
    id: Math.random().toString(36).substring(7),
    question: `What is the correct answer?\n${question}`,
    answer: correctAnswer,
    userAnswer: '',
    explanation: `The correct answer is ${correctAnswer}, not ${wrongAnswer}`
  }
}

// Quiz Master - Multiple choice
export function generateQuizMasterQuestion(): GameQuestion {
  const questionTypes = ['area', 'perimeter', 'multiplication', 'division']
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]

  let question, answer, options

  switch (type) {
    case 'area':
      const length = Math.floor(Math.random() * 10) + 5
      const width = Math.floor(Math.random() * 10) + 5
      answer = length * width
      question = `What is the area of a rectangle with length ${length}cm and width ${width}cm?`
      options = [
        `${answer}cm²`,
        `${answer + 10}cm²`,
        `${answer - 5}cm²`,
        `${length + width}cm²`
      ]
      break
    case 'perimeter':
      const side1 = Math.floor(Math.random() * 10) + 5
      const side2 = Math.floor(Math.random() * 10) + 5
      answer = (side1 + side2) * 2
      question = `What is the perimeter of a rectangle with length ${side1}cm and width ${side2}cm?`
      options = [
        `${answer}cm`,
        `${answer + 4}cm`,
        `${answer - 4}cm`,
        `${side1 * side2}cm`
      ]
      break
    case 'multiplication':
      const num1 = Math.floor(Math.random() * 11) + 2
      const num2 = Math.floor(Math.random() * 11) + 2
      answer = num1 * num2
      question = `${num1} × ${num2} = ?`
      options = [
        `${answer}`,
        `${answer + num1}`,
        `${answer - num2}`,
        `${num1 + num2}`
      ]
      break
    case 'division':
      const divisor = Math.floor(Math.random() * 10) + 2
      const quotient = Math.floor(Math.random() * 10) + 2
      const dividend = divisor * quotient
      answer = quotient
      question = `${dividend} ÷ ${divisor} = ?`
      options = [
        `${answer}`,
        `${answer + 1}`,
        `${answer - 1}`,
        `${divisor}`
      ]
      break
    default:
      answer = 2
      question = '1 + 1 = ?'
      options = ['2', '3', '1', '4']
  }

  // Shuffle options
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question,
    answer: answer.toString(),
    options: shuffled,
    userAnswer: ''
  }
}

// Fraction Master
export function generateFractionMasterQuestion(): GameQuestion {
  const questionTypes = ['simplify', 'add', 'compare', 'decimal']
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]

  let question, answer, options

  switch (type) {
    case 'simplify':
      const numerators = [2, 4, 6, 8, 10, 12]
      const num = numerators[Math.floor(Math.random() * numerators.length)]
      const denom = num * 2
      answer = `${num / 2}/${denom / 2}`
      question = `Simplify ${num}/${denom}`
      options = [
        answer,
        `${num / 2}/${denom}`,
        `${num}/${denom / 2}`,
        `${num / 3}/${denom / 3}`
      ]
      break
    case 'add':
      const n1 = Math.floor(Math.random() * 5) + 1
      const n2 = Math.floor(Math.random() * 5) + 1
      const commonDenom = 10
      answer = `${n1 + n2}/${commonDenom}`
      question = `${n1}/${commonDenom} + ${n2}/${commonDenom} = ?`
      options = [
        answer,
        `${n1 + n2}/${commonDenom * 2}`,
        `${n1 - n2}/${commonDenom}`,
        `${n1 * n2}/${commonDenom}`
      ]
      break
    case 'compare':
      answer = '>'
      question = 'Which is greater: 3/4 or 1/2?'
      options = ['3/4', '1/2', 'Equal', 'Cannot compare']
      break
    case 'decimal':
      const fractions = [
        { frac: '1/2', dec: '0.5' },
        { frac: '1/4', dec: '0.25' },
        { frac: '3/4', dec: '0.75' },
        { frac: '1/10', dec: '0.1' }
      ]
      const selected = fractions[Math.floor(Math.random() * fractions.length)]
      answer = selected.dec
      question = `Convert ${selected.frac} to a decimal`
      options = [
        answer,
        `${parseFloat(answer) + 0.1}`,
        `${parseFloat(answer) - 0.1}`,
        `${parseFloat(answer) * 2}`
      ]
      break
    default:
      answer = '1/2'
      question = 'What is 1/4 + 1/4?'
      options = ['1/2', '1/4', '2/4', '1/8']
  }

  return {
    id: Math.random().toString(36).substring(7),
    question,
    answer,
    options,
    userAnswer: ''
  }
}

// Power Numbers
export function generatePowerNumbersQuestion(): GameQuestion {
  const types = ['square', 'cube', 'prime']
  const type = types[Math.floor(Math.random() * types.length)]

  let question, answer, options

  switch (type) {
    case 'square':
      const base = Math.floor(Math.random() * 10) + 2
      answer = base * base
      question = `What is ${base}²?`
      options = [
        `${answer}`,
        `${answer + base}`,
        `${answer - base}`,
        `${base * 2}`
      ]
      break
    case 'cube':
      const cubeBase = Math.floor(Math.random() * 5) + 2
      answer = cubeBase * cubeBase * cubeBase
      question = `What is ${cubeBase}³?`
      options = [
        `${answer}`,
        `${cubeBase * cubeBase}`,
        `${answer + cubeBase}`,
        `${cubeBase * 3}`
      ]
      break
    case 'prime':
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
      const notPrimes = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20]
      const isPrimeQuestion = Math.random() > 0.5
      if (isPrimeQuestion) {
        answer = primes[Math.floor(Math.random() * primes.length)]
        question = 'Which of these is a prime number?'
        options = [
          `${answer}`,
          `${notPrimes[Math.floor(Math.random() * notPrimes.length)]}`,
          `${notPrimes[Math.floor(Math.random() * notPrimes.length)]}`,
          `${notPrimes[Math.floor(Math.random() * notPrimes.length)]}`
        ]
      } else {
        const testNum = Math.floor(Math.random() * 30) + 2
        const isPrime = primes.includes(testNum)
        answer = isPrime ? 'Yes' : 'No'
        question = `Is ${testNum} a prime number?`
        options = ['Yes', 'No']
      }
      break
    default:
      answer = 16
      question = 'What is 4²?'
      options = ['16', '8', '12', '20']
  }

  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question,
    answer: answer.toString(),
    options: shuffled,
    userAnswer: ''
  }
}

// Vocabulary Builder
export function generateVocabularyQuestion(): GameQuestion {
  const words = [
    { word: 'benevolent', definition: 'kind and generous', wrong: ['angry and hostile', 'tired and weary', 'quick and nimble'] },
    { word: 'meticulous', definition: 'extremely careful and precise', wrong: ['careless and sloppy', 'loud and noisy', 'slow and lazy'] },
    { word: 'eloquent', definition: 'fluent and persuasive in speech', wrong: ['quiet and shy', 'confused and unclear', 'angry and loud'] },
    { word: 'resilient', definition: 'able to recover quickly from difficulties', wrong: ['weak and fragile', 'stubborn and rigid', 'happy and cheerful'] },
    { word: 'ambiguous', definition: 'having more than one meaning; unclear', wrong: ['very clear', 'extremely bright', 'very loud'] },
    { word: 'diligent', definition: 'hardworking and persistent', wrong: ['lazy and idle', 'mean and cruel', 'loud and boisterous'] },
    { word: 'ponder', definition: 'to think deeply about something', wrong: ['to run quickly', 'to speak loudly', 'to eat greedily'] },
    { word: 'serene', definition: 'calm and peaceful', wrong: ['loud and chaotic', 'angry and violent', 'quick and rushed'] }
  ]

  const selected = words[Math.floor(Math.random() * words.length)]
  const answer = selected.definition
  const options = [answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: `What does "${selected.word}" mean?`,
    answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Synonym Finder
export function generateSynonymQuestion(): GameQuestion {
  const pairs = [
    { word: 'happy', synonym: 'joyful', wrong: ['sad', 'angry', 'tired'] },
    { word: 'big', synonym: 'large', wrong: ['tiny', 'narrow', 'short'] },
    { word: 'smart', synonym: 'intelligent', wrong: ['foolish', 'slow', 'weak'] },
    { word: 'fast', synonym: 'quick', wrong: ['slow', 'heavy', 'tall'] },
    { word: 'brave', synonym: 'courageous', wrong: ['cowardly', 'weak', 'tired'] },
    { word: 'honest', synonym: 'truthful', wrong: ['dishonest', 'mean', 'lazy'] },
    { word: 'beautiful', synonym: 'lovely', wrong: ['ugly', 'plain', 'dull'] },
    { word: 'difficult', synonym: 'challenging', wrong: ['easy', 'simple', 'basic'] }
  ]

  const selected = pairs[Math.floor(Math.random() * pairs.length)]
  const answer = selected.synonym
  const options = [answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: `Which word is a synonym of "${selected.word}"?`,
    answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Grammar Guardian
export function generateGrammarQuestion(): GameQuestion {
  const questions = [
    {
      question: 'Which sentence uses the correct punctuation?',
      answer: 'The dog, who was very friendly, wagged its tail.',
      wrong: [
        'The dog who was very friendly wagged its tail',
        'The dog, who was very friendly wagged its tail.',
        'The dog who was very friendly, wagged its tail.'
      ]
    },
    {
      question: 'Choose the sentence with the correct verb form:',
      answer: 'She has been studying for three hours.',
      wrong: [
        'She have been studying for three hours.',
        'She has been study for three hours.',
        'She has be studying for three hours.'
      ]
    },
    {
      question: 'Which sentence is written correctly?',
      answer: "They're going to their house over there.",
      wrong: [
        "Their going to they're house over there.",
        "There going to their house over their.",
        "They're going to there house over their."
      ]
    },
    {
      question: 'Select the sentence with proper subject-verb agreement:',
      answer: 'The team of players was excited.',
      wrong: [
        'The team of players were excited.',
        'The team of players be excited.',
        'The team of players is be excited.'
      ]
    }
  ]

  const selected = questions[Math.floor(Math.random() * questions.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Spelling Ace
export function generateSpellingQuestion(): GameQuestion {
  const words = [
    { correct: 'necessary', wrong: ['neccessary', 'neccesary', 'necesary'] },
    { correct: 'definitely', wrong: ['definately', 'definitly', 'definetly'] },
    { correct: 'accommodation', wrong: ['accomodation', 'acommodation', 'accomadation'] },
    { correct: 'separate', wrong: ['seperate', 'separete', 'seprate'] },
    { correct: 'occurred', wrong: ['occured', 'ocurred', 'ocured'] },
    { correct: 'embarrass', wrong: ['embarass', 'embarras', 'embarras'] },
    { correct: 'beginning', wrong: ['begining', 'beggining', 'beginining'] },
    { correct: 'receive', wrong: ['recieve', 'receeve', 'recive'] }
  ]

  const selected = words[Math.floor(Math.random() * words.length)]
  const answer = selected.correct
  const options = [answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: 'Which is the correct spelling?',
    answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Comprehension Master (short passages)
export function generateComprehensionQuestion(): GameQuestion {
  const passages = [
    {
      passage: 'The rainforest is home to millions of species. Many animals have adapted to live in the canopy, high above the forest floor. These animals rarely come down to the ground.',
      question: 'According to the passage, where do many rainforest animals live?',
      answer: 'In the canopy, high above the forest floor',
      wrong: ['On the ground', 'In rivers and streams', 'Underground in burrows']
    },
    {
      passage: 'Ancient civilizations used the stars to navigate. Sailors would identify constellations to determine which direction to travel. This skill was essential for long sea voyages.',
      question: 'What did ancient sailors use stars for?',
      answer: 'To navigate and find direction',
      wrong: ['To tell time', 'To predict weather', 'To communicate with each other']
    },
    {
      passage: 'Photosynthesis is the process by which plants make their own food. They use sunlight, water, and carbon dioxide to create glucose and oxygen. This process is vital for life on Earth.',
      question: 'What do plants produce during photosynthesis?',
      answer: 'Glucose and oxygen',
      wrong: ['Water and carbon dioxide', 'Sunlight and nutrients', 'Soil and minerals']
    }
  ]

  const selected = passages[Math.floor(Math.random() * passages.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: `${selected.passage}\n\n${selected.question}`,
    answer: selected.answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Word Analogies
export function generateAnalogyQuestion(): GameQuestion {
  const analogies = [
    {
      question: 'Hot is to Cold as Day is to...',
      answer: 'Night',
      wrong: ['Morning', 'Sun', 'Light']
    },
    {
      question: 'Bird is to Fly as Fish is to...',
      answer: 'Swim',
      wrong: ['Water', 'Jump', 'Run']
    },
    {
      question: 'Doctor is to Hospital as Teacher is to...',
      answer: 'School',
      wrong: ['Student', 'Book', 'Class']
    },
    {
      question: 'Pen is to Write as Knife is to...',
      answer: 'Cut',
      wrong: ['Sharp', 'Fork', 'Eat']
    },
    {
      question: 'Happy is to Sad as Up is to...',
      answer: 'Down',
      wrong: ['Sky', 'Above', 'High']
    },
    {
      question: 'Book is to Read as Music is to...',
      answer: 'Listen',
      wrong: ['Sound', 'Song', 'Play']
    },
    {
      question: 'Car is to Road as Train is to...',
      answer: 'Track',
      wrong: ['Station', 'Fast', 'Journey']
    },
    {
      question: 'Finger is to Hand as Toe is to...',
      answer: 'Foot',
      wrong: ['Leg', 'Nail', 'Body']
    }
  ]

  const selected = analogies[Math.floor(Math.random() * analogies.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Letter Sequences
export function generateSequenceQuestion(): GameQuestion {
  const sequences = [
    {
      question: 'What comes next in the sequence?\nA, C, E, G, ?',
      answer: 'I',
      wrong: ['H', 'J', 'F'],
      explanation: 'Skip one letter each time'
    },
    {
      question: 'What comes next in the sequence?\nB, D, F, H, ?',
      answer: 'J',
      wrong: ['I', 'K', 'G'],
      explanation: 'Skip one letter each time'
    },
    {
      question: 'What comes next in the sequence?\nZ, Y, X, W, ?',
      answer: 'V',
      wrong: ['U', 'T', 'W'],
      explanation: 'Going backwards through the alphabet'
    },
    {
      question: 'What comes next in the sequence?\nA, B, D, G, ?',
      answer: 'K',
      wrong: ['H', 'I', 'J'],
      explanation: 'Add 1, then 2, then 3, then 4 letters'
    },
    {
      question: 'What comes next in the sequence?\nAC, CE, EG, GI, ?',
      answer: 'IK',
      wrong: ['JK', 'HJ', 'IJ'],
      explanation: 'Two letters jumping by 2 each time'
    }
  ]

  const selected = sequences[Math.floor(Math.random() * sequences.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Word Codes
export function generateCodeQuestion(): GameQuestion {
  const codes = [
    {
      question: 'If CAT = 3120, what does DOG equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '4157',
      wrong: ['4167', '3157', '5147'],
      explanation: 'D=4, O=15, G=7'
    },
    {
      question: 'If BOOK = 2151511, what does LOOK equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '12151511',
      wrong: ['12141511', '11151511', '12151512'],
      explanation: 'L=12, O=15, O=15, K=11'
    },
    {
      question: 'In a code, if PEN = QFO, what does BAG equal?',
      answer: 'CBH',
      wrong: ['CAH', 'DBG', 'BBH'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if SUN = TVO, what does FUN equal?',
      answer: 'GVO',
      wrong: ['FVO', 'GUN', 'FUO'],
      explanation: 'Each letter moves forward by 1'
    }
  ]

  const selected = codes[Math.floor(Math.random() * codes.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Odd One Out
export function generateOddOneOutQuestion(): GameQuestion {
  const questions = [
    {
      question: 'Which word is the odd one out?',
      answer: 'Carrot',
      wrong: ['Apple', 'Orange', 'Banana'],
      explanation: 'Carrot is a vegetable, the others are fruits'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Car',
      wrong: ['Bicycle', 'Scooter', 'Skateboard'],
      explanation: 'Car has an engine, the others are human-powered'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Triangle',
      wrong: ['Circle', 'Sphere', 'Ball'],
      explanation: 'Triangle is 2D, the others are 3D/round'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Summer',
      wrong: ['Monday', 'Tuesday', 'Friday'],
      explanation: 'Summer is a season, the others are days of the week'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Dog',
      wrong: ['Eagle', 'Sparrow', 'Robin'],
      explanation: 'Dog is a mammal, the others are birds'
    }
  ]

  const selected = questions[Math.floor(Math.random() * questions.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Logic Puzzles
export function generateLogicPuzzleQuestion(): GameQuestion {
  const puzzles = [
    {
      question: 'Tom is taller than Sarah. Sarah is taller than Mike. Who is the shortest?',
      answer: 'Mike',
      wrong: ['Tom', 'Sarah', 'Cannot tell']
    },
    {
      question: 'All dogs are animals. Rex is a dog. What can we conclude?',
      answer: 'Rex is an animal',
      wrong: ['Rex is not an animal', 'All animals are dogs', 'Some dogs are not animals']
    },
    {
      question: 'If all apples are red and this fruit is an apple, what color is it?',
      answer: 'Red',
      wrong: ['Green', 'Yellow', 'Cannot tell']
    },
    {
      question: 'Emma sits next to Jack. Jack sits next to Lily. Who sits in the middle?',
      answer: 'Jack',
      wrong: ['Emma', 'Lily', 'Cannot tell']
    },
    {
      question: 'A train leaves at 3:00 PM and arrives at 5:30 PM. How long is the journey?',
      answer: '2 hours 30 minutes',
      wrong: ['2 hours', '3 hours', '2 hours 20 minutes']
    }
  ]

  const selected = puzzles[Math.floor(Math.random() * puzzles.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: ''
  }
}

// Shape Patterns
export function generateShapePatternQuestion(): GameQuestion {
  const patterns = [
    {
      question: 'Pattern: ○ △ □ ○ △ ?\nWhat comes next?',
      answer: '□',
      wrong: ['○', '△', '◇'],
      explanation: 'Repeating pattern: circle, triangle, square'
    },
    {
      question: 'Pattern: ★ ★ ☆ ★ ★ ☆ ★ ★ ?\nWhat comes next?',
      answer: '☆',
      wrong: ['★', '●', '○'],
      explanation: 'Two filled stars, then one empty star'
    },
    {
      question: 'Pattern: ■ ■ □ ■ ■ □ ■ ■ ?\nWhat comes next?',
      answer: '□',
      wrong: ['■', '●', '◇'],
      explanation: 'Two filled squares, then one empty square'
    },
    {
      question: 'Pattern: ◆ ◇ ◆ ◇ ?\nWhat comes next?',
      answer: '◆',
      wrong: ['◇', '○', '△'],
      explanation: 'Alternating filled and empty diamonds'
    }
  ]

  const selected = patterns[Math.floor(Math.random() * patterns.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Number Sequences (Non-Verbal)
export function generateNumberSequenceQuestion(): GameQuestion {
  const sequences = [
    {
      question: 'What comes next?\n2, 4, 6, 8, ?',
      answer: '10',
      wrong: ['9', '12', '7'],
      explanation: 'Add 2 each time'
    },
    {
      question: 'What comes next?\n3, 6, 9, 12, ?',
      answer: '15',
      wrong: ['14', '16', '13'],
      explanation: 'Add 3 each time (multiples of 3)'
    },
    {
      question: 'What comes next?\n1, 4, 9, 16, ?',
      answer: '25',
      wrong: ['20', '21', '24'],
      explanation: 'Square numbers: 1², 2², 3², 4², 5²'
    },
    {
      question: 'What comes next?\n2, 4, 8, 16, ?',
      answer: '32',
      wrong: ['24', '20', '28'],
      explanation: 'Double each time (×2)'
    },
    {
      question: 'What comes next?\n100, 90, 80, 70, ?',
      answer: '60',
      wrong: ['50', '65', '75'],
      explanation: 'Subtract 10 each time'
    }
  ]

  const selected = sequences[Math.floor(Math.random() * sequences.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Rotation Patterns
export function generateRotationQuestion(): GameQuestion {
  const rotations = [
    {
      question: 'If ▶ rotates 90° clockwise, what does it become?',
      answer: '▼',
      wrong: ['◀', '▲', '▶'],
      explanation: 'Right arrow rotates down'
    },
    {
      question: 'If ▲ rotates 180°, what does it become?',
      answer: '▼',
      wrong: ['▶', '◀', '▲'],
      explanation: 'Up arrow rotates to down'
    },
    {
      question: 'If ◀ rotates 90° clockwise, what does it become?',
      answer: '▲',
      wrong: ['▼', '▶', '◀'],
      explanation: 'Left arrow rotates up'
    },
    {
      question: 'If ▼ rotates 90° anti-clockwise, what does it become?',
      answer: '▶',
      wrong: ['◀', '▲', '▼'],
      explanation: 'Down arrow rotates right'
    }
  ]

  const selected = rotations[Math.floor(Math.random() * rotations.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Shape Completion
export function generateShapeCompletionQuestion(): GameQuestion {
  const completions = [
    {
      question: 'Which shape completes the pattern?\n[○ ○ ○]\n[△ △ △]\n[? ? ?]',
      answer: '□ □ □',
      wrong: ['○ ○ ○', '△ △ △', '◇ ◇ ◇'],
      explanation: 'Different shape in each row: circles, triangles, squares'
    },
    {
      question: 'Complete the grid:\n[★ ☆ ★]\n[☆ ★ ☆]\n[★ ? ★]',
      answer: '☆',
      wrong: ['★', '●', '○'],
      explanation: 'Alternating pattern like a checkerboard'
    },
    {
      question: 'What fits in the missing space?\n[■ □ ■]\n[□ ■ □]\n[■ □ ?]',
      answer: '■',
      wrong: ['□', '●', '◆'],
      explanation: 'Checkerboard pattern with filled and empty squares'
    }
  ]

  const selected = completions[Math.floor(Math.random() * completions.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}

// Mirror Images
export function generateMirrorImageQuestion(): GameQuestion {
  const mirrors = [
    {
      question: 'What is the mirror image of:\n123',
      answer: '321',
      wrong: ['123', '213', '132'],
      explanation: 'Numbers flip horizontally'
    },
    {
      question: 'What is the mirror image of:\nABC',
      answer: 'CBA',
      wrong: ['ABC', 'BAC', 'ACB'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ▶?',
      answer: '◀',
      wrong: ['▲', '▼', '▶'],
      explanation: 'Right arrow mirrors to left arrow'
    },
    {
      question: 'Which is the mirror image of L?',
      answer: '⅃',
      wrong: ['L', '⅂', '⊥'],
      explanation: 'L flips to backwards L'
    }
  ]

  const selected = mirrors[Math.floor(Math.random() * mirrors.length)]
  const options = [selected.answer, ...selected.wrong]
  const shuffled = options.sort(() => Math.random() - 0.5)

  return {
    id: Math.random().toString(36).substring(7),
    question: selected.question,
    answer: selected.answer,
    options: shuffled,
    userAnswer: '',
    explanation: selected.explanation
  }
}
