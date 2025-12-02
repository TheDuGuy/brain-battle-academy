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

// Quiz Master - Multiple choice (GL Assessment Style Questions)
export function generateQuizMasterQuestion(): GameQuestion {
  // 50% chance to use static GL Assessment style questions, 50% dynamic
  if (Math.random() < 0.5) {
    const glQuestions = [
      // From GL Assessment Test 5 - Maths
      {
        question: 'Karen, Amrit and Sam are going to share two pizzas equally between them.\nWhat fraction of a whole pizza should each of them have?',
        answer: '⅔',
        wrong: ['½', '¼', '⅓']
      },
      {
        question: 'What number should go in the box?\n1680 + 1680 + 1680 + 1680 + 1680 = ? × 10',
        answer: '840',
        wrong: ['84', '336', '420']
      },
      {
        question: '37 × 497 + 63 × 497 = ?',
        answer: '49,700',
        wrong: ['9,443', '44,730', '54,670']
      },
      {
        question: 'The sum of the first four square numbers is 30.\nWhat is the sum of the first five square numbers?',
        answer: '55',
        wrong: ['35', '45', '65']
      },
      {
        question: 'What is 1 - 0.11?',
        answer: '0.89',
        wrong: ['0.99', '0.09', '0.91']
      },
      {
        question: 'What is the cost of eight mugs at £1.99 each?',
        answer: '£15.92',
        wrong: ['£15.82', '£16.92', '£14.92']
      },
      {
        question: 'A repeating pattern is made of squares, triangles and circles.\nThe pattern repeats after five shapes. What fraction of all the shapes are squares?',
        answer: '⅖',
        wrong: ['⅓', '½', '⅕']
      },
      {
        question: 'There are 816 pupils at Southfields school. There are 28 more girls than boys.\nHow many girls are there in the school?',
        answer: '422',
        wrong: ['394', '450', '408']
      },
      {
        question: 'Josh started from a number between 1 and 5, and counted on in steps of 6.\nHe reached the number 22. What number did he start from?',
        answer: '4',
        wrong: ['1', '2', '3']
      },
      {
        question: '789 × 36 = 28,404. What is 18 × 789?',
        answer: '14,202',
        wrong: ['7,101', '14,204', '15,774']
      },
      {
        question: 'A serving of pasta weighs 75 grams. 100g contains 14.4g of protein.\nHow many grams of protein are there in a serving?',
        answer: '10.8g',
        wrong: ['9.6g', '11.2g', '14.4g']
      },
      {
        question: 'What is the mean of these numbers: 4, 5, 3, 6, 6?',
        answer: '4.8',
        wrong: ['4', '5', '6']
      },
      {
        question: 'A bicycle wheel has a circumference of 150cm.\nHow many complete revolutions must the wheel make for Fran to travel 1.5km?',
        answer: '1000',
        wrong: ['100', '500', '1500']
      },
      {
        question: 'An electric light uses 1½ pence worth of electricity every 2 hours.\nThe light is left on from 6pm Friday until 6pm Sunday. How much does the electricity cost?',
        answer: '36p',
        wrong: ['24p', '30p', '48p']
      },
      {
        question: 'A 2-litre bottle of fruit squash is mixed with 4 times as much water.\nHow many 125-millilitre cups can be filled with the diluted squash?',
        answer: '80',
        wrong: ['16', '40', '64']
      },
      {
        question: 'A tin of paint costs £6 and will cover 5 square metres of wall.\nWhat is the cost of paint tins for a wall 4.5m long and 3m high?',
        answer: '£18',
        wrong: ['£12', '£24', '£30']
      },
      {
        question: 'Which digital clock shows a quarter to four in the afternoon?',
        answer: '15:45',
        wrong: ['03:45', '04:45', '16:45']
      },
      {
        question: 'How many pupils picked at least 1 kilo of blackberries if:\n- 2 pupils picked less than ½ kilo\n- 4 pupils picked 1 to 1½ kilos\n- 3 pupils picked 1½ to 2 kilos\n- 1 pupil picked 2 to 2½ kilos',
        answer: '8',
        wrong: ['4', '6', '10']
      },
      {
        question: 'Five friends were all born in 1994. Their birthdays are:\nKieran: 3rd July, Haq: 31st May, Harriet: 16th June, Lisa: 10th May, Jake: 28th July.\nWho is the oldest?',
        answer: 'Lisa',
        wrong: ['Haq', 'Kieran', 'Jake']
      },
      {
        question: 'Which of these statements is correct?\nA: 4⅓ < 4.5  B: 4½ < 4.5  C: 4⅓ > 4.5  D: 4½ > 4.5',
        answer: 'A: 4⅓ < 4.5',
        wrong: ['B: 4½ < 4.5', 'C: 4⅓ > 4.5', 'D: 4½ > 4.5']
      },
      {
        question: 'A robot moves from point (-3, 3) to point (5, -2) along the lines of a square grid.\nWhich describes its route?',
        answer: '8 steps East and 5 steps South',
        wrong: ['2 steps West and 1 step South', '5 steps East and 2 steps South', '8 steps West and 5 steps North']
      },
      {
        question: 'Work out the name of this 2D shape from the clues:\n1. It has four sides\n2. It has four right angles\n3. The diagonals do NOT cross at right angles',
        answer: 'rectangle',
        wrong: ['square', 'rhombus', 'kite']
      },
      {
        question: 'All of Bulu\'s 2D shape\'s sides are the same length.\nWhich of these CANNOT be Bulu\'s shape?',
        answer: 'a rectangle',
        wrong: ['an equilateral triangle', 'a square', 'a rhombus']
      },
      {
        question: 'Which of these is equal to one million?',
        answer: 'Number of millimetres in a kilometre',
        wrong: ['Number of centimetres in a kilometre', 'Number of grams in a kilogram', 'Number of millilitres in a litre']
      },
      {
        question: 'Akira wants to calculate the cost of: two teas (99p each), one coffee (99p), two sandwiches (£1.99 each), and three apples (49p each).\nWhich calculation is correct?',
        answer: '3 × £1 + 2 × £2 + 3 × 50p - 4p',
        wrong: ['3 × £1 + 2 × £2 + 3 × 50p + 4p', '3 × £1 + 2 × £2 + 3 × 50p + 8p', '3 × £1 + 2 × £2 + 3 × 50p - 8p']
      },
      {
        question: 'The numbers on opposite faces of a number cube always add up to 7.\nWhich net will fold up to make a valid number cube? (Top row: 5, then 3,6,5,1 below, then 2,4 at bottom)',
        answer: 'B',
        wrong: ['A', 'C', 'D']
      },
      {
        question: 'Mrs Rai buys 5 metres of ribbon and cuts off 3 pieces.\nEach piece is t cm long. She has n cm left.\nWhich expression equals n?',
        answer: '500 - 3t',
        wrong: ['5 - 3t', '3t - 500', '2t']
      },
      {
        question: 'Cinema tickets for adults cost £A. Children\'s tickets are half price.\nIn pounds, how much do the tickets cost for x adults and y children?',
        answer: 'xA + ½yA',
        wrong: ['x + yA', 'xA + ½y', '½x + yA']
      },
      {
        question: 'N → ÷4 → +1 → ×2 → ?\nWhich of these is the number that Nilesh ended up with?',
        answer: 'N/2 + 2',
        wrong: ['N/8 + 2', 'N/4 + 2', 'N/4 + 1']
      },
      {
        question: 'Pat draws a square with corners at (5,5), (7,5), (7,7) and (5,7).\nWhich point is inside Pat\'s square?',
        answer: '(6,6)',
        wrong: ['(4,4)', '(6,8)', '(8,8)']
      },
      // From GL Assessment Test 4 (Pack 11D) - Maths
      {
        question: '3209\nWhat is this number in words?',
        answer: 'Three thousand two hundred and nine',
        wrong: ['Three thousand two hundred and ninety', 'Thirty-two thousand and nine', 'Three thousand and twenty-nine']
      },
      {
        question: 'Which of these words does NOT have a horizontal line of symmetry?\nBOB, HOD, TOT, KID, COOK',
        answer: 'KID',
        wrong: ['BOB', 'HOD', 'TOT']
      },
      {
        question: 'How should the time of 6.30 in the evening be written in 24-hour format?',
        answer: '18:30',
        wrong: ['16:30', '20:30', '06:30']
      },
      {
        question: 'Carmel draws a plan of her school using a scale of 1 cm to 5 m.\nOn the plan the playground is 6 cm long. What is the real length?',
        answer: '30 m',
        wrong: ['6 m', '11 m', '45 m']
      },
      {
        question: 'One display cabinet holds 38 DVDs.\nHow many cabinets will be needed to hold 646 DVDs?',
        answer: '17',
        wrong: ['16', '18', '19']
      },
      {
        question: 'Which answer is NOT a square number?\n16, 9, 25, 12, 36',
        answer: '12',
        wrong: ['16', '25', '36']
      },
      {
        question: '525 raffle tickets were sold by 25 pupils.\nOn average, how many tickets did each pupil sell?',
        answer: '21',
        wrong: ['19', '20', '31']
      },
      {
        question: 'In the school chess club, there are 22 boys and 33 girls.\nWhat fraction of the club is made up of girls?',
        answer: '⅗',
        wrong: ['⅖', '½', '⅔']
      },
      {
        question: 'Lucy\'s activities cost: Gymnastics £1.65, Brownies £1, Piano £2.10, Flute £1.50, German £3.50.\nWhat is the total cost each week?',
        answer: '£9.75',
        wrong: ['£9.15', '£9.65', '£10.75']
      },
      {
        question: 'In a parallelogram, angle y measures 110°.\nWhat is the size of angle x (adjacent to y)?',
        answer: '70°',
        wrong: ['60°', '80°', '110°']
      },
      {
        question: 'In a survey of 85 people, every fifth person had a pierced ear.\nWhich calculation shows how many people had a pierced ear?',
        answer: '85 × ⅕',
        wrong: ['0.5 × 85', '5 ÷ 85', '85 × 0.25']
      },
      {
        question: 'Rucksacks are being packed into trunks. Each trunk holds 9 rucksacks.\nHow many trunks are needed for 79 rucksacks?',
        answer: '9',
        wrong: ['8', '7', '10']
      },
      {
        question: 'Jonathan gets £2.50 pocket money each week. His brother David gets half as much.\nIf David saves all his pocket money for a whole year, how much will he have?',
        answer: '£65',
        wrong: ['£52', '£130', '£1.25']
      },
      {
        question: 'Ian is now twice his sister\'s age. In 4 years\' time Ian will be 16.\nHow old will his sister be then?',
        answer: '10',
        wrong: ['8', '12', '6']
      },
      {
        question: 'Which one of these is the smallest?\n3.6%, 1/25, 0.05, 3.49%, 1/15',
        answer: '1/25',
        wrong: ['3.6%', '0.05', '3.49%']
      },
      {
        question: 'Leon is going on a school holiday which costs £180.\nHe pays £15 each week and has paid £75 so far. How many more weekly payments?',
        answer: '7',
        wrong: ['5', '6', '12']
      },
      {
        question: 'The ratio of cars to vans in a car park is 14:3.\nIf there are 15 vans, how many cars are there?',
        answer: '70',
        wrong: ['56', '42', '29']
      },
      {
        question: 'How many of these shapes have at least one pair of parallel sides?\nRegular hexagon, regular pentagon, rhombus, isosceles triangle, trapezium',
        answer: '4',
        wrong: ['2', '3', '5']
      },
      {
        question: 'There are 66 seats on a bus. At stops: +12, +15, +19 and -4, +23 and -8 people.\nHow many empty seats are there now?',
        answer: '9',
        wrong: ['5', '10', '11']
      },
      {
        question: 'A spinner has numbers 1, 4, 9, 18, 22, 30.\nWhat is the probability it lands on an even number?',
        answer: '⅔',
        wrong: ['½', '⅓', '⅚']
      },
      {
        question: 'The perimeter of a rectangle is 18 cm.\nWhat could be the area of the rectangle?',
        answer: '18 cm²',
        wrong: ['24 cm²', '81 cm²', '36 cm²']
      },
      {
        question: 'Which answer is different to the others?\n0.25 of 100, 25% of 100, ⅖ of 100, 0.4 of 100, ¼ of 100',
        answer: '0.4 of 100',
        wrong: ['0.25 of 100', '25% of 100', '¼ of 100']
      },
      {
        question: 'A map of Germany is drawn to a scale of 1:750,000.\nWhat real distance is represented by 1 cm on the map?',
        answer: '7.5 km',
        wrong: ['700 km', '750 km', '75 km']
      },
      {
        question: 'Two sisters eat Weetbisks. A box has 24 biscuits. Georgina eats m per day, Jennifer eats n.\nAfter 4 days, 4 are left. Which is correct?',
        answer: 'm = 3 and n = 2',
        wrong: ['m = 2 and n = 3', 'm = 4 and n = 2', 'm = 1 and n = 4']
      },
      {
        question: 'Large cans hold 330 ml, small cans hold 150 ml.\nKerry drank: 1 large, 2 small, 1 small. Sam drank half of Kerry\'s total. How much did Sam drink?',
        answer: '390 ml',
        wrong: ['450 ml', '480 ml', '630 ml']
      },
      {
        question: 'St Gregory\'s School Book Fair sold 250 books at £2.99 each.\nWhat was the total amount spent?',
        answer: '£747.50',
        wrong: ['£74.75', '£209.30', '£2093.00']
      },
      {
        question: 'Patrick is 4 feet 11 inches tall.\nWhich is closest to his height in metres?',
        answer: '1.5 m',
        wrong: ['1.3 m', '1.4 m', '1.7 m']
      },
      {
        question: 'Sam gets x pounds each month from parents and y pounds each week from paper round.\nHow much does Sam get in one year, in pounds?',
        answer: '12x + 52y',
        wrong: ['64(x + y)', '52x + 12y', '12(x + y)']
      },
      {
        question: 'Daily fruit bill: 4kg apples (50p/kg), 6kg oranges (75p/kg), 5kg bananas (45p/kg), 3kg grapes (£1.20/kg), 2kg strawberries (90p/kg).\nTotal daily bill?',
        answer: '£14.15',
        wrong: ['£3.80', '£20.00', '£38.00']
      },
      {
        question: 'Which answer has the greatest value?\n20% of 220, ½ of 220, ²⁄₁₀ of 220, 10², 0.2 of 220',
        answer: '½ of 220',
        wrong: ['20% of 220', '10²', '0.2 of 220']
      }
    ]

    const selected = glQuestions[Math.floor(Math.random() * glQuestions.length)]
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

  // Original dynamic question generation
  const questionTypes = ['area', 'perimeter', 'multiplication', 'division']
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]

  let question, answer, options

  switch (type) {
    case 'area':
      const length = Math.floor(Math.random() * 10) + 5
      const width = Math.floor(Math.random() * 10) + 5
      const areaValue = length * width
      answer = `${areaValue}cm²`
      question = `What is the area of a rectangle with length ${length}cm and width ${width}cm?`
      options = [
        `${areaValue}cm²`,
        `${areaValue + 10}cm²`,
        `${areaValue - 5}cm²`,
        `${length + width}cm²`
      ]
      break
    case 'perimeter':
      const side1 = Math.floor(Math.random() * 10) + 5
      const side2 = Math.floor(Math.random() * 10) + 5
      const perimeterValue = (side1 + side2) * 2
      answer = `${perimeterValue}cm`
      question = `What is the perimeter of a rectangle with length ${side1}cm and width ${side2}cm?`
      options = [
        `${perimeterValue}cm`,
        `${perimeterValue + 4}cm`,
        `${perimeterValue - 4}cm`,
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
    { word: 'serene', definition: 'calm and peaceful', wrong: ['loud and chaotic', 'angry and violent', 'quick and rushed'] },
    { word: 'persevere', definition: 'to continue despite difficulties', wrong: ['to give up easily', 'to rest quietly', 'to complain loudly'] },
    { word: 'abundant', definition: 'existing in large quantities', wrong: ['scarce and rare', 'small and tiny', 'empty and hollow'] },
    { word: 'peculiar', definition: 'strange or unusual', wrong: ['normal and ordinary', 'large and massive', 'fast and quick'] },
    { word: 'vivid', definition: 'bright and intense', wrong: ['dull and faded', 'small and weak', 'slow and lazy'] },
    { word: 'triumph', definition: 'a great victory or achievement', wrong: ['a terrible failure', 'a small mistake', 'a quick rest'] },
    { word: 'reluctant', definition: 'unwilling or hesitant', wrong: ['eager and excited', 'happy and cheerful', 'loud and noisy'] },
    { word: 'gracious', definition: 'polite and kind', wrong: ['rude and mean', 'fast and quick', 'cold and frozen'] },
    { word: 'absurd', definition: 'ridiculous or unreasonable', wrong: ['sensible and logical', 'beautiful and pretty', 'slow and careful'] },
    { word: 'meager', definition: 'small in quantity; inadequate', wrong: ['large and plentiful', 'bright and shiny', 'fast and quick'] },
    { word: 'arduous', definition: 'difficult and tiring', wrong: ['easy and simple', 'happy and fun', 'quiet and calm'] },
    { word: 'tranquil', definition: 'free from disturbance; calm', wrong: ['noisy and chaotic', 'angry and hostile', 'fast and rushed'] },
    { word: 'immense', definition: 'extremely large', wrong: ['tiny and small', 'weak and fragile', 'slow and steady'] },
    { word: 'astute', definition: 'clever and quick to understand', wrong: ['foolish and slow', 'sad and depressed', 'loud and noisy'] },
    { word: 'audacious', definition: 'bold and daring', wrong: ['timid and fearful', 'boring and dull', 'small and weak'] },
    { word: 'candid', definition: 'truthful and straightforward', wrong: ['dishonest and lying', 'quiet and shy', 'fast and quick'] },
    { word: 'contemplate', definition: 'to think carefully about', wrong: ['to ignore completely', 'to run fast', 'to eat quickly'] },
    { word: 'diminish', definition: 'to make or become less', wrong: ['to increase greatly', 'to stay the same', 'to paint brightly'] },
    { word: 'elaborate', definition: 'detailed and complicated', wrong: ['simple and plain', 'fast and quick', 'loud and noisy'] },
    { word: 'formidable', definition: 'inspiring fear or respect', wrong: ['weak and pathetic', 'small and cute', 'quiet and gentle'] },
    { word: 'impeccable', definition: 'perfect; without fault', wrong: ['flawed and broken', 'slow and lazy', 'cold and frozen'] },
    { word: 'pristine', definition: 'in perfect condition', wrong: ['damaged and broken', 'loud and noisy', 'fast and quick'] },
    { word: 'tenacious', definition: 'persistent and determined', wrong: ['lazy and quitting', 'sad and crying', 'small and weak'] },
    { word: 'vigorous', definition: 'strong and energetic', wrong: ['weak and tired', 'quiet and calm', 'sad and depressed'] },
    { word: 'zealous', definition: 'enthusiastic and passionate', wrong: ['bored and uninterested', 'slow and lazy', 'cold and unfriendly'] },
    { word: 'amiable', definition: 'friendly and pleasant', wrong: ['hostile and mean', 'fast and quick', 'loud and aggressive'] },
    { word: 'cautious', definition: 'careful to avoid danger', wrong: ['reckless and careless', 'happy and cheerful', 'bright and shiny'] },
    { word: 'frivolous', definition: 'not serious; silly', wrong: ['serious and important', 'heavy and large', 'slow and careful'] },
    { word: 'mundane', definition: 'ordinary and boring', wrong: ['exciting and thrilling', 'beautiful and pretty', 'loud and noisy'] },
    { word: 'obsolete', definition: 'no longer used; outdated', wrong: ['modern and new', 'bright and shiny', 'fast and quick'] },
    { word: 'proficient', definition: 'skilled and competent', wrong: ['unskilled and incompetent', 'sad and crying', 'cold and frozen'] },
    { word: 'scrupulous', definition: 'very careful and thorough', wrong: ['careless and sloppy', 'fast and rushed', 'loud and messy'] },
    { word: 'tedious', definition: 'boring and repetitive', wrong: ['exciting and fun', 'beautiful and lovely', 'quick and easy'] },
    { word: 'versatile', definition: 'able to adapt to many uses', wrong: ['limited and narrow', 'slow and clumsy', 'sad and lonely'] },
    { word: 'whimsical', definition: 'playful and fanciful', wrong: ['serious and stern', 'heavy and dull', 'loud and aggressive'] },
    { word: 'adamant', definition: 'refusing to change opinion', wrong: ['flexible and open-minded', 'quiet and shy', 'fast and quick'] },
    { word: 'brevity', definition: 'shortness of time or expression', wrong: ['length and wordiness', 'brightness and color', 'speed and quickness'] },
    { word: 'clemency', definition: 'mercy and leniency', wrong: ['harshness and cruelty', 'speed and quickness', 'loudness and noise'] },
    { word: 'dubious', definition: 'doubtful or uncertain', wrong: ['certain and sure', 'happy and cheerful', 'bright and clear'] },
    { word: 'elusive', definition: 'difficult to find or catch', wrong: ['easy to find', 'loud and obvious', 'slow and steady'] },
    { word: 'frugal', definition: 'economical and thrifty', wrong: ['wasteful and extravagant', 'fast and quick', 'loud and flashy'] }
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

// Synonym Finder with skill-based difficulty
export function generateSynonymQuestion(skillLevel: number = 1): GameQuestion {
  // Level 1: Short, high-frequency words
  const level1Pairs = [
    { word: 'happy', synonym: 'joyful', wrong: ['sad', 'angry', 'tired'] },
    { word: 'big', synonym: 'large', wrong: ['tiny', 'narrow', 'short'] },
    { word: 'fast', synonym: 'quick', wrong: ['slow', 'heavy', 'tall'] },
    { word: 'good', synonym: 'great', wrong: ['bad', 'poor', 'weak'] },
    { word: 'small', synonym: 'tiny', wrong: ['huge', 'tall', 'wide'] },
    { word: 'cold', synonym: 'chilly', wrong: ['hot', 'warm', 'burning'] },
    { word: 'old', synonym: 'ancient', wrong: ['new', 'young', 'fresh'] },
    { word: 'sad', synonym: 'unhappy', wrong: ['glad', 'cheerful', 'merry'] },
    { word: 'start', synonym: 'begin', wrong: ['end', 'finish', 'stop'] },
    { word: 'stop', synonym: 'halt', wrong: ['start', 'continue', 'go'] },
    { word: 'loud', synonym: 'noisy', wrong: ['quiet', 'silent', 'soft'] },
    { word: 'hard', synonym: 'difficult', wrong: ['easy', 'simple', 'soft'] },
    { word: 'nice', synonym: 'kind', wrong: ['mean', 'cruel', 'harsh'] },
    { word: 'dark', synonym: 'dim', wrong: ['bright', 'light', 'sunny'] },
    { word: 'wet', synonym: 'damp', wrong: ['dry', 'arid', 'parched'] },
    { word: 'hot', synonym: 'warm', wrong: ['cold', 'cool', 'freezing'] },
    { word: 'new', synonym: 'fresh', wrong: ['old', 'ancient', 'stale'] },
    { word: 'clean', synonym: 'tidy', wrong: ['dirty', 'messy', 'filthy'] },
    { word: 'strong', synonym: 'powerful', wrong: ['weak', 'feeble', 'frail'] },
    { word: 'tall', synonym: 'high', wrong: ['short', 'low', 'small'] },
    { word: 'funny', synonym: 'amusing', wrong: ['boring', 'dull', 'serious'] },
    { word: 'brave', synonym: 'bold', wrong: ['scared', 'afraid', 'timid'] },
    { word: 'pretty', synonym: 'beautiful', wrong: ['ugly', 'plain', 'homely'] },
    { word: 'shy', synonym: 'timid', wrong: ['bold', 'brave', 'confident'] },
    { word: 'smart', synonym: 'clever', wrong: ['dumb', 'stupid', 'foolish'] },
    { word: 'rich', synonym: 'wealthy', wrong: ['poor', 'broke', 'needy'] },
    { word: 'angry', synonym: 'mad', wrong: ['happy', 'calm', 'pleased'] },
    { word: 'tired', synonym: 'sleepy', wrong: ['awake', 'alert', 'energetic'] },
    { word: 'close', synonym: 'near', wrong: ['far', 'distant', 'remote'] },
    { word: 'real', synonym: 'true', wrong: ['fake', 'false', 'pretend'] },
    { word: 'find', synonym: 'discover', wrong: ['lose', 'miss', 'hide'] },
    { word: 'help', synonym: 'assist', wrong: ['hurt', 'harm', 'hinder'] },
    { word: 'like', synonym: 'enjoy', wrong: ['hate', 'dislike', 'loathe'] },
    { word: 'look', synonym: 'see', wrong: ['ignore', 'miss', 'overlook'] },
    { word: 'make', synonym: 'create', wrong: ['destroy', 'break', 'ruin'] },
    { word: 'take', synonym: 'grab', wrong: ['give', 'offer', 'donate'] },
    { word: 'run', synonym: 'sprint', wrong: ['walk', 'crawl', 'stroll'] },
    { word: 'jump', synonym: 'leap', wrong: ['fall', 'sit', 'crouch'] },
    { word: 'talk', synonym: 'speak', wrong: ['listen', 'hear', 'silence'] },
    { word: 'yell', synonym: 'shout', wrong: ['whisper', 'murmur', 'mumble'] },
    { word: 'sleep', synonym: 'rest', wrong: ['wake', 'rise', 'work'] },
    { word: 'eat', synonym: 'consume', wrong: ['starve', 'fast', 'diet'] },
    { word: 'love', synonym: 'adore', wrong: ['hate', 'despise', 'detest'] },
    { word: 'sick', synonym: 'ill', wrong: ['healthy', 'well', 'fine'] },
    { word: 'wrong', synonym: 'incorrect', wrong: ['right', 'correct', 'accurate'] },
    { word: 'glad', synonym: 'pleased', wrong: ['upset', 'angry', 'sad'] },
    { word: 'scary', synonym: 'frightening', wrong: ['safe', 'comforting', 'calm'] },
    { word: 'break', synonym: 'shatter', wrong: ['fix', 'mend', 'repair'] },
    { word: 'pull', synonym: 'drag', wrong: ['push', 'shove', 'press'] },
    { word: 'hide', synonym: 'conceal', wrong: ['show', 'reveal', 'display'] },
    // GL Assessment Pack 4 VR - Synonyms (Q66-72)
    { word: 'dirty', synonym: 'unclean', wrong: ['soap', 'dust', 'bath'] },
    { word: 'hog', synonym: 'pig', wrong: ['sty', 'tractor', 'farm'] },
    { word: 'burn', synonym: 'scorch', wrong: ['flame', 'time', 'dusk'] },
    { word: 'alter', synonym: 'change', wrong: ['error', 'size', 'shape'] },
    { word: 'act', synonym: 'perform', wrong: ['stage', 'music', 'theatre'] },
    { word: 'cost', synonym: 'price', wrong: ['money', 'coin', 'label'] },
    { word: 'dodge', synonym: 'avoid', wrong: ['hit', 'trick', 'secret'] }
  ]

  // Level 2: Slightly less common / longer words
  const level2Pairs = [
    { word: 'smart', synonym: 'intelligent', wrong: ['foolish', 'slow', 'weak'] },
    { word: 'brave', synonym: 'courageous', wrong: ['cowardly', 'weak', 'timid'] },
    { word: 'honest', synonym: 'truthful', wrong: ['dishonest', 'deceitful', 'false'] },
    { word: 'beautiful', synonym: 'lovely', wrong: ['ugly', 'plain', 'unattractive'] },
    { word: 'difficult', synonym: 'challenging', wrong: ['easy', 'simple', 'basic'] },
    { word: 'ancient', synonym: 'old', wrong: ['modern', 'new', 'recent'] },
    { word: 'enormous', synonym: 'huge', wrong: ['tiny', 'small', 'minute'] },
    { word: 'fortunate', synonym: 'lucky', wrong: ['unlucky', 'cursed', 'unfortunate'] },
    { word: 'frightened', synonym: 'scared', wrong: ['brave', 'fearless', 'bold'] },
    { word: 'gentle', synonym: 'mild', wrong: ['harsh', 'rough', 'violent'] },
    { word: 'grateful', synonym: 'thankful', wrong: ['ungrateful', 'resentful', 'bitter'] },
    { word: 'humble', synonym: 'modest', wrong: ['arrogant', 'proud', 'boastful'] },
    { word: 'important', synonym: 'significant', wrong: ['trivial', 'minor', 'insignificant'] },
    { word: 'improve', synonym: 'enhance', wrong: ['worsen', 'damage', 'ruin'] },
    { word: 'incredible', synonym: 'amazing', wrong: ['ordinary', 'boring', 'dull'] },
    { word: 'journey', synonym: 'trip', wrong: ['stay', 'halt', 'stop'] },
    { word: 'joyful', synonym: 'cheerful', wrong: ['gloomy', 'miserable', 'sad'] },
    { word: 'keen', synonym: 'eager', wrong: ['reluctant', 'unwilling', 'hesitant'] },
    { word: 'loyal', synonym: 'faithful', wrong: ['disloyal', 'treacherous', 'unfaithful'] },
    { word: 'miserable', synonym: 'unhappy', wrong: ['joyful', 'cheerful', 'content'] },
    { word: 'nervous', synonym: 'anxious', wrong: ['calm', 'relaxed', 'peaceful'] },
    { word: 'obvious', synonym: 'clear', wrong: ['hidden', 'obscure', 'unclear'] },
    { word: 'peculiar', synonym: 'strange', wrong: ['normal', 'ordinary', 'typical'] },
    { word: 'polite', synonym: 'courteous', wrong: ['rude', 'impolite', 'discourteous'] },
    { word: 'precious', synonym: 'valuable', wrong: ['worthless', 'cheap', 'common'] },
    { word: 'primary', synonym: 'main', wrong: ['secondary', 'minor', 'lesser'] },
    { word: 'proper', synonym: 'correct', wrong: ['improper', 'wrong', 'incorrect'] },
    { word: 'rapid', synonym: 'swift', wrong: ['slow', 'sluggish', 'gradual'] },
    { word: 'rarely', synonym: 'seldom', wrong: ['often', 'frequently', 'usually'] },
    { word: 'recent', synonym: 'new', wrong: ['old', 'ancient', 'past'] },
    { word: 'reliable', synonym: 'dependable', wrong: ['unreliable', 'undependable', 'faulty'] },
    { word: 'remote', synonym: 'distant', wrong: ['near', 'close', 'nearby'] },
    { word: 'require', synonym: 'need', wrong: ['offer', 'provide', 'give'] },
    { word: 'rigid', synonym: 'stiff', wrong: ['flexible', 'soft', 'bendable'] },
    { word: 'rough', synonym: 'coarse', wrong: ['smooth', 'soft', 'gentle'] },
    { word: 'scatter', synonym: 'spread', wrong: ['gather', 'collect', 'assemble'] },
    { word: 'section', synonym: 'part', wrong: ['whole', 'entirety', 'total'] },
    { word: 'select', synonym: 'choose', wrong: ['reject', 'refuse', 'decline'] },
    { word: 'sincere', synonym: 'genuine', wrong: ['fake', 'false', 'insincere'] },
    { word: 'slender', synonym: 'thin', wrong: ['thick', 'fat', 'wide'] },
    { word: 'smooth', synonym: 'even', wrong: ['rough', 'bumpy', 'uneven'] },
    { word: 'solid', synonym: 'firm', wrong: ['liquid', 'soft', 'weak'] },
    { word: 'solemn', synonym: 'serious', wrong: ['cheerful', 'funny', 'playful'] },
    { word: 'summit', synonym: 'peak', wrong: ['bottom', 'base', 'valley'] },
    { word: 'supply', synonym: 'provide', wrong: ['demand', 'take', 'remove'] },
    { word: 'swift', synonym: 'fast', wrong: ['slow', 'sluggish', 'lazy'] },
    { word: 'timid', synonym: 'shy', wrong: ['bold', 'confident', 'brave'] },
    { word: 'transparent', synonym: 'clear', wrong: ['opaque', 'cloudy', 'murky'] },
    { word: 'vacant', synonym: 'empty', wrong: ['full', 'occupied', 'crowded'] },
    { word: 'vast', synonym: 'immense', wrong: ['small', 'tiny', 'limited'] }
  ]

  // Level 3+: Advanced vocabulary
  const level3Pairs = [
    { word: 'diligent', synonym: 'industrious', wrong: ['lazy', 'careless', 'idle'] },
    { word: 'resilient', synonym: 'tenacious', wrong: ['fragile', 'weak', 'brittle'] },
    { word: 'eloquent', synonym: 'articulate', wrong: ['inarticulate', 'unclear', 'confused'] },
    { word: 'benevolent', synonym: 'compassionate', wrong: ['cruel', 'malicious', 'hostile'] },
    { word: 'meticulous', synonym: 'precise', wrong: ['careless', 'sloppy', 'inaccurate'] },
    { word: 'ambiguous', synonym: 'unclear', wrong: ['obvious', 'definite', 'certain'] },
    { word: 'abundant', synonym: 'plentiful', wrong: ['scarce', 'rare', 'limited'] },
    { word: 'absurd', synonym: 'ridiculous', wrong: ['reasonable', 'sensible', 'logical'] },
    { word: 'adjacent', synonym: 'neighboring', wrong: ['distant', 'remote', 'separate'] },
    { word: 'adversary', synonym: 'opponent', wrong: ['ally', 'friend', 'supporter'] },
    { word: 'advocate', synonym: 'supporter', wrong: ['opponent', 'critic', 'enemy'] },
    { word: 'ample', synonym: 'sufficient', wrong: ['inadequate', 'insufficient', 'lacking'] },
    { word: 'arduous', synonym: 'difficult', wrong: ['easy', 'simple', 'effortless'] },
    { word: 'arrogant', synonym: 'conceited', wrong: ['humble', 'modest', 'meek'] },
    { word: 'authentic', synonym: 'genuine', wrong: ['fake', 'counterfeit', 'false'] },
    { word: 'bizarre', synonym: 'peculiar', wrong: ['normal', 'ordinary', 'typical'] },
    { word: 'candid', synonym: 'frank', wrong: ['dishonest', 'deceitful', 'evasive'] },
    { word: 'cautious', synonym: 'careful', wrong: ['reckless', 'careless', 'hasty'] },
    { word: 'compassion', synonym: 'sympathy', wrong: ['cruelty', 'harshness', 'indifference'] },
    { word: 'competent', synonym: 'capable', wrong: ['incompetent', 'unable', 'inept'] },
    { word: 'complex', synonym: 'complicated', wrong: ['simple', 'easy', 'basic'] },
    { word: 'conceal', synonym: 'hide', wrong: ['reveal', 'expose', 'show'] },
    { word: 'condemn', synonym: 'criticize', wrong: ['praise', 'commend', 'applaud'] },
    { word: 'confirm', synonym: 'verify', wrong: ['deny', 'refute', 'contradict'] },
    { word: 'consecutive', synonym: 'successive', wrong: ['alternate', 'random', 'scattered'] },
    { word: 'conspicuous', synonym: 'obvious', wrong: ['hidden', 'inconspicuous', 'subtle'] },
    { word: 'contemplate', synonym: 'ponder', wrong: ['ignore', 'dismiss', 'overlook'] },
    { word: 'contemporary', synonym: 'modern', wrong: ['ancient', 'old', 'archaic'] },
    { word: 'contrary', synonym: 'opposite', wrong: ['similar', 'same', 'identical'] },
    { word: 'convene', synonym: 'assemble', wrong: ['disperse', 'scatter', 'separate'] },
    { word: 'cordial', synonym: 'friendly', wrong: ['hostile', 'unfriendly', 'cold'] },
    { word: 'corrupt', synonym: 'dishonest', wrong: ['honest', 'ethical', 'moral'] },
    { word: 'courageous', synonym: 'brave', wrong: ['cowardly', 'fearful', 'timid'] },
    { word: 'credible', synonym: 'believable', wrong: ['unbelievable', 'doubtful', 'dubious'] },
    { word: 'crucial', synonym: 'critical', wrong: ['unimportant', 'trivial', 'minor'] },
    { word: 'cunning', synonym: 'crafty', wrong: ['honest', 'straightforward', 'naive'] },
    { word: 'daunting', synonym: 'intimidating', wrong: ['encouraging', 'reassuring', 'easy'] },
    { word: 'deceive', synonym: 'mislead', wrong: ['enlighten', 'inform', 'clarify'] },
    { word: 'defiant', synonym: 'rebellious', wrong: ['obedient', 'compliant', 'submissive'] },
    { word: 'delicate', synonym: 'fragile', wrong: ['sturdy', 'strong', 'robust'] },
    { word: 'desolate', synonym: 'barren', wrong: ['lush', 'fertile', 'abundant'] },
    { word: 'deteriorate', synonym: 'decline', wrong: ['improve', 'enhance', 'strengthen'] },
    { word: 'determine', synonym: 'decide', wrong: ['hesitate', 'waver', 'doubt'] },
    { word: 'devour', synonym: 'consume', wrong: ['reject', 'refuse', 'abstain'] },
    { word: 'diligent', synonym: 'hardworking', wrong: ['lazy', 'idle', 'sluggish'] },
    { word: 'diminish', synonym: 'decrease', wrong: ['increase', 'expand', 'grow'] },
    { word: 'dismal', synonym: 'gloomy', wrong: ['cheerful', 'bright', 'optimistic'] },
    { word: 'dismay', synonym: 'distress', wrong: ['comfort', 'reassure', 'encourage'] },
    { word: 'display', synonym: 'exhibit', wrong: ['conceal', 'hide', 'cover'] },
    { word: 'dispute', synonym: 'argument', wrong: ['agreement', 'harmony', 'consensus'] }
  ]

  // Select word bank based on skill level
  let pairs
  if (skillLevel <= 1) {
    pairs = level1Pairs
  } else if (skillLevel === 2) {
    pairs = level2Pairs
  } else {
    pairs = level3Pairs
  }

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
      wrong: ['The dog who was very friendly wagged its tail', 'The dog, who was very friendly wagged its tail.', 'The dog who was very friendly, wagged its tail.']
    },
    {
      question: 'Choose the sentence with the correct verb form:',
      answer: 'She has been studying for three hours.',
      wrong: ['She have been studying for three hours.', 'She has been study for three hours.', 'She has be studying for three hours.']
    },
    {
      question: 'Which sentence is written correctly?',
      answer: "They're going to their house over there.",
      wrong: ["Their going to they're house over there.", "There going to their house over their.", "They're going to there house over their."]
    },
    {
      question: 'Select the sentence with proper subject-verb agreement:',
      answer: 'The team of players was excited.',
      wrong: ['The team of players were excited.', 'The team of players be excited.', 'The team of players is be excited.']
    },
    {
      question: 'Which sentence has correct capitalization?',
      answer: 'My family visited the Tower of London last summer.',
      wrong: ['My Family visited the tower of london last Summer.', 'my family visited the Tower Of London last summer.', 'My family visited the Tower Of london Last Summer.']
    },
    {
      question: 'Choose the correct use of apostrophes:',
      answer: "The children's toys were scattered everywhere.",
      wrong: ["The childrens toys were scattered everywhere.", "The childrens' toys were scattered everywhere.", "The children's toy's were scattered everywhere."]
    },
    {
      question: 'Select the correct sentence:',
      answer: 'I should have gone to the party.',
      wrong: ['I should of gone to the party.', 'I should have went to the party.', 'I should of went to the party.']
    },
    {
      question: 'Which sentence uses commas correctly?',
      answer: 'We bought apples, oranges, bananas, and grapes.',
      wrong: ['We bought apples oranges, bananas and grapes.', 'We bought apples, oranges bananas, and grapes.', 'We bought, apples, oranges, bananas, and, grapes.']
    },
    {
      question: 'Choose the sentence with correct verb tense:',
      answer: 'Yesterday, I walked to the park.',
      wrong: ['Yesterday, I walk to the park.', 'Yesterday, I am walking to the park.', 'Yesterday, I walks to the park.']
    },
    {
      question: 'Which sentence is grammatically correct?',
      answer: 'Between you and me, this is a secret.',
      wrong: ['Between you and I, this is a secret.', 'Between me and you, this is a secret.', 'Between I and you, this is a secret.']
    },
    {
      question: 'Select the correct pronoun usage:',
      answer: 'The teacher gave the books to my friend and me.',
      wrong: ['The teacher gave the books to my friend and I.', 'The teacher gave the books to me and my friend.', 'The teacher gave the books to I and my friend.']
    },
    {
      question: 'Which sentence uses quotation marks correctly?',
      answer: 'She said, "I will be there soon."',
      wrong: ['She said, "I will be there soon".', 'She said "I will be there soon."', 'She said, "I will be there soon.']
    },
    {
      question: 'Choose the sentence with correct word order:',
      answer: 'The tall, dark-haired man walked slowly.',
      wrong: ['The dark-haired, tall man slowly walked.', 'The man tall, dark-haired walked slowly.', 'Slowly walked the tall, dark-haired man.']
    },
    {
      question: 'Which sentence has the correct article?',
      answer: 'I saw an elephant at the zoo.',
      wrong: ['I saw a elephant at the zoo.', 'I saw an elephants at the zoo.', 'I saw the elephant at a zoo.']
    },
    {
      question: 'Select the sentence with proper plural form:',
      answer: 'The children played with their toys.',
      wrong: ['The childs played with their toys.', 'The childrens played with their toys.', 'The children played with there toys.']
    },
    {
      question: 'Which uses the comparative form correctly?',
      answer: 'This book is more interesting than that one.',
      wrong: ['This book is more interestinger than that one.', 'This book is most interesting than that one.', 'This book is interestinger than that one.']
    },
    {
      question: 'Choose the correct negative form:',
      answer: "I don't have any money.",
      wrong: ["I don't have no money.", "I doesn't have any money.", "I don't has any money."]
    },
    {
      question: 'Which sentence uses "who" or "whom" correctly?',
      answer: 'The person whom I met was very kind.',
      wrong: ['The person who I met was very kind.', 'The person whom was very kind met me.', 'The person which I met was very kind.']
    },
    {
      question: 'Select the sentence with correct preposition use:',
      answer: 'I am good at mathematics.',
      wrong: ['I am good in mathematics.', 'I am good on mathematics.', 'I am good for mathematics.']
    },
    {
      question: 'Which sentence has correct parallel structure?',
      answer: 'I like swimming, reading, and playing football.',
      wrong: ['I like swimming, to read, and playing football.', 'I like to swim, reading, and play football.', 'I like swim, read, and playing football.']
    },
    {
      question: 'Choose the correct use of "its" or "it\'s":',
      answer: "The cat licked its paw.",
      wrong: ["The cat licked it's paw.", "The cat licked its' paw.", "The cat licked it paw."]
    },
    {
      question: 'Which sentence has correct subject-verb agreement?',
      answer: 'Everyone has their own opinion.',
      wrong: ['Everyone have their own opinion.', 'Everyone has they own opinion.', 'Everyone have they own opinion.']
    },
    {
      question: 'Select the sentence with correct past tense:',
      answer: 'I ate breakfast this morning.',
      wrong: ['I eated breakfast this morning.', 'I eat breakfast this morning.', 'I eating breakfast this morning.']
    },
    {
      question: 'Which sentence uses adjectives correctly?',
      answer: 'The beautiful, old house stood on the hill.',
      wrong: ['The old, beautifuly house stood on the hill.', 'The beauty, old house stood on the hill.', 'The beautiful, older house stood on the hill.']
    },
    {
      question: 'Choose the correct reflexive pronoun:',
      answer: 'She taught herself to play the piano.',
      wrong: ['She taught her to play the piano.', 'She taught sheself to play the piano.', 'She taught her own to play the piano.']
    },
    {
      question: 'Which sentence has correct adverb placement?',
      answer: 'She quickly ran to the door.',
      wrong: ['She ran quickly to the door.', 'Quickly she ran to the door.', 'She ran to the door quickly.']
    },
    {
      question: 'Select the sentence with correct conjunction use:',
      answer: 'I wanted to go, but I was too tired.',
      wrong: ['I wanted to go but, I was too tired.', 'I wanted to go, but, I was too tired.', 'I wanted to go but I was too tired.']
    },
    {
      question: 'Which sentence uses the superlative correctly?',
      answer: 'She is the tallest girl in the class.',
      wrong: ['She is the most tall girl in the class.', 'She is the taller girl in the class.', 'She is the more tall girl in the class.']
    },
    {
      question: 'Choose the correct conditional sentence:',
      answer: 'If I had known, I would have come.',
      wrong: ['If I have known, I would have come.', 'If I had known, I will have come.', 'If I know, I would have come.']
    },
    {
      question: 'Which sentence has correct word choice?',
      answer: 'The effect of the medicine was immediate.',
      wrong: ['The affect of the medicine was immediate.', 'The efect of the medicine was immediate.', 'The effects of the medicine was immediate.']
    },
    {
      question: 'Select the sentence with correct modal verb:',
      answer: 'You must finish your homework.',
      wrong: ['You must to finish your homework.', 'You must finishing your homework.', 'You musted finish your homework.']
    },
    {
      question: 'Which sentence uses the possessive correctly?',
      answer: "James's book is on the table.",
      wrong: ["James book is on the table.", "James' book is on the table.", "Jame's book is on the table."]
    },
    {
      question: 'Choose the correct relative pronoun:',
      answer: 'The girl who lives next door is my friend.',
      wrong: ['The girl which lives next door is my friend.', 'The girl whom lives next door is my friend.', 'The girl that lives next door is my friend.']
    },
    {
      question: 'Which sentence has correct passive voice?',
      answer: 'The letter was written by my sister.',
      wrong: ['The letter was wrote by my sister.', 'The letter is written by my sister.', 'The letter has written by my sister.']
    },
    {
      question: 'Select the correct sentence with question tag:',
      answer: "You like pizza, don't you?",
      wrong: ["You like pizza, doesn't you?", "You like pizza, do you?", "You like pizza, don't it?"]
    },
    {
      question: 'Which sentence uses "fewer" or "less" correctly?',
      answer: 'There are fewer students today than yesterday.',
      wrong: ['There are less students today than yesterday.', 'There is fewer students today than yesterday.', 'There are lesser students today than yesterday.']
    },
    {
      question: 'Choose the correct gerund form:',
      answer: 'Swimming is my favourite activity.',
      wrong: ['To swim is my favourite activity.', 'Swim is my favourite activity.', 'Swam is my favourite activity.']
    },
    {
      question: 'Which sentence has correct reported speech?',
      answer: 'She said that she was tired.',
      wrong: ['She said that she is tired.', 'She said that she will be tired.', 'She said she tired.']
    },
    {
      question: 'Select the sentence with correct quantifier:',
      answer: 'There are many books on the shelf.',
      wrong: ['There are much books on the shelf.', 'There is many books on the shelf.', 'There are a lot books on the shelf.']
    },
    {
      question: 'Which sentence uses "than" or "then" correctly?',
      answer: 'I would rather read than watch TV.',
      wrong: ['I would rather read then watch TV.', 'I would rather to read than watch TV.', 'I would rather reading than watch TV.']
    },
    {
      question: 'Choose the correct infinitive form:',
      answer: 'I want to learn French.',
      wrong: ['I want learning French.', 'I want learn French.', 'I want for to learn French.']
    },
    {
      question: 'Which sentence has correct double negative avoidance?',
      answer: 'I hardly ever see him.',
      wrong: ["I don't hardly ever see him.", "I hardly don't ever see him.", "I don't see him hardly ever."]
    },
    {
      question: 'Select the sentence with correct linking words:',
      answer: 'Although it was raining, we went out.',
      wrong: ['Despite it was raining, we went out.', 'Although it was raining but we went out.', 'However it was raining, we went out.']
    },
    {
      question: 'Which sentence uses "who\'s" or "whose" correctly?',
      answer: 'Whose book is this?',
      wrong: ["Who's book is this?", "Whos book is this?", "Who book is this?"]
    },
    {
      question: 'Choose the correct phrasal verb:',
      answer: 'Please turn off the lights.',
      wrong: ['Please turn of the lights.', 'Please turn of the lights.', 'Please turn out the lights.']
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
    { correct: 'embarrass', wrong: ['embarass', 'embarras', 'embearass'] },
    { correct: 'beginning', wrong: ['begining', 'beggining', 'beginining'] },
    { correct: 'receive', wrong: ['recieve', 'receeve', 'recive'] },
    { correct: 'believe', wrong: ['beleive', 'belive', 'beleave'] },
    { correct: 'achieve', wrong: ['acheive', 'acheeve', 'achievve'] },
    { correct: 'friend', wrong: ['freind', 'frend', 'freand'] },
    { correct: 'beautiful', wrong: ['beautifull', 'beutiful', 'beatiful'] },
    { correct: 'because', wrong: ['becuase', 'beacuse', 'becaus'] },
    { correct: 'calendar', wrong: ['calender', 'calandar', 'calander'] },
    { correct: 'parliament', wrong: ['parliment', 'parliment', 'parlimant'] },
    { correct: 'government', wrong: ['goverment', 'govenment', 'govermnent'] },
    { correct: 'environment', wrong: ['enviroment', 'enviornment', 'envirement'] },
    { correct: 'restaurant', wrong: ['restarant', 'resturant', 'resteraunt'] },
    { correct: 'business', wrong: ['buisness', 'bussiness', 'busness'] },
    { correct: 'familiar', wrong: ['familar', 'familliar', 'familier'] },
    { correct: 'guarantee', wrong: ['guarentee', 'garantee', 'guaruntee'] },
    { correct: 'immediate', wrong: ['immeadiate', 'immediete', 'imediate'] },
    { correct: 'independent', wrong: ['independant', 'independet', 'indipendent'] },
    { correct: 'interest', wrong: ['intrest', 'interst', 'intreast'] },
    { correct: 'knowledge', wrong: ['knowlege', 'knowledg', 'knowladge'] },
    { correct: 'library', wrong: ['libary', 'librery', 'libarary'] },
    { correct: 'medicine', wrong: ['medecine', 'medicin', 'medisine'] },
    { correct: 'opinion', wrong: ['oppinion', 'opinon', 'opinnion'] },
    { correct: 'opportunity', wrong: ['oportunity', 'oppertunity', 'opportunety'] },
    { correct: 'original', wrong: ['orignal', 'originel', 'originl'] },
    { correct: 'particular', wrong: ['perticular', 'particuler', 'particullar'] },
    { correct: 'physical', wrong: ['phisical', 'physica', 'physicle'] },
    { correct: 'privilege', wrong: ['priviledge', 'privilage', 'privilige'] },
    { correct: 'probably', wrong: ['probly', 'probally', 'probabley'] },
    { correct: 'profession', wrong: ['proffession', 'profesion', 'profeshion'] },
    { correct: 'pronunciation', wrong: ['pronounciation', 'pronuciation', 'pronuncietion'] },
    { correct: 'recommend', wrong: ['recomend', 'reccomend', 'recomand'] },
    { correct: 'remember', wrong: ['rememeber', 'remeber', 'remembor'] },
    { correct: 'restaurant', wrong: ['restaraunt', 'resaurant', 'restraunt'] },
    { correct: 'rhythm', wrong: ['rythm', 'rhithm', 'rythym'] },
    { correct: 'scissors', wrong: ['scisors', 'scissers', 'scizers'] },
    { correct: 'similar', wrong: ['similer', 'similiar', 'simular'] },
    { correct: 'sincere', wrong: ['sincear', 'sincer', 'sinsere'] },
    { correct: 'surprise', wrong: ['suprise', 'surprize', 'serprise'] },
    { correct: 'temperature', wrong: ['temprature', 'temperture', 'tempature'] },
    { correct: 'thorough', wrong: ['thourough', 'thorogh', 'throrough'] },
    { correct: 'tomorrow', wrong: ['tommorow', 'tommorrow', 'tomorow'] },
    { correct: 'Tuesday', wrong: ['Teusday', 'Tuesdy', 'Tusday'] },
    { correct: 'until', wrong: ['untill', 'untl', 'untile'] },
    { correct: 'vegetable', wrong: ['vegatable', 'vegetible', 'vegtable'] },
    { correct: 'Wednesday', wrong: ['Wensday', 'Wednsday', 'Wendsday'] },
    { correct: 'weird', wrong: ['wierd', 'weerd', 'wiered'] },
    { correct: 'whether', wrong: ['wether', 'wheather', 'wheter'] }
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
    // GL Assessment - "The Day Alfie Learned to Fly" comprehension questions
    {
      passage: 'Alfie wasn\'t really a model pupil. He never received glowing school reports, despite his best intentions, and his clumsiness had often got him into trouble. On Tuesday, he had been sent to the headteacher for dropping his pet lizard into Mr Manley\'s yogurt. On Wednesday, he had been thrown out of the technology room for trying to balance frying pans on his head.',
      question: 'Why was Alfie often in trouble?',
      answer: 'He was clumsy',
      wrong: ['He arrived late for school', 'He could fly', 'He got poor school reports']
    },
    {
      passage: 'As he waited for the rest of the class to drip in, Alfie started humming a tune to himself. He then started flapping his arms up and down, casually, just as a way of keeping rhythm with his own tune. And that\'s how Alfie discovered he could fly!',
      question: 'At the start of the story, why did Alfie flap his arms?',
      answer: 'To keep in rhythm',
      wrong: ['To help him fly', 'He was hot', 'To be an aeroplane']
    },
    {
      passage: 'The next day, however, he decided that he was going to impress his teachers by coming to school early. OK, it was only two minutes early (he didn\'t want to overdo it), but he thought it was a fair effort nonetheless.',
      question: 'On which day did Alfie learn to fly?',
      answer: 'Thursday',
      wrong: ['Monday', 'Tuesday', 'Wednesday']
    },
    {
      passage: 'His head bumped into the light with such force that he plummeted down and crashed into a display of African flags and maps. He spent the rest of the half-hour putting everything back into place.',
      question: 'When Alfie first flew, why did he fall back down into the chair?',
      answer: 'He stopped flapping his arms',
      wrong: ['He hit his head on the light', 'He wasn\'t very good at flying', 'He tripped over']
    },
    {
      passage: 'When Mrs Buckley came in and asked how he had got that bruise on his forehead, Alfie told her that he had banged his head against the light. Predictably, he was thrown out of the class.',
      question: 'Why did Mrs Buckley send Alfie out of the classroom?',
      answer: 'She thought he was lying',
      wrong: ['He banged his head on the light', 'He knocked over the flags and maps', 'She thought he had a headache']
    },
    {
      passage: 'For the rest of term, Alfie always went into his classroom as early as he could. Within a couple of weeks, he had developed enough control to hover around the classroom without banging his head into the ceiling and walls.',
      question: 'Why did Alfie keep coming to school early?',
      answer: 'To practise aeronautics',
      wrong: ['To impress his teachers', 'To practise humming', 'To keep out of trouble']
    },
    {
      passage: 'At the end of the month, he opened the window and, with his heart in his mouth, took the great leap. He found that flying outside was even easier than it was in the classroom and he quickly reached his house, bouncing from one icy rooftop to another.',
      question: 'How long did Alfie practise before taking his first flight outside?',
      answer: 'A couple of weeks',
      wrong: ['A few minutes', '3 or 4 hours', '3 or 4 weeks']
    },
    {
      passage: 'Unfortunately, one day he stayed out of school too long and as he stepped back onto the ledge of the window, he found his entire class staring at him. Mr Smart, Alfie\'s teacher, had eyes as wide as dinner plates. "Alfie Armstrong!" he exclaimed. "You can fly!"',
      question: 'Who is Mrs Armstrong?',
      answer: 'Nobody mentioned in the story',
      wrong: ['Alfie\'s class teacher', 'The cookery teacher', 'The headteacher']
    },
    {
      passage: 'He found that flying outside was even easier than it was in the classroom and he quickly reached his house, bouncing from one icy rooftop to another.',
      question: 'What was the weather like on Alfie\'s first flying trip?',
      answer: 'Snowy',
      wrong: ['Sunny', 'Rainy', 'Cloudy']
    },
    {
      passage: 'The weeks passed, and every time he flew, Alfie became more daring in his explorations. He soared out and over the city, side by side with the crows and the sparrows. He floated over gushing rivers and dodged stormy rain clouds. He reached the English Channel and crossed over into France, and he saw the great capitals of Europe – Paris, Rome and Berlin.',
      question: 'Which of these two things did Alfie see on his flying trips?\n1. His house\n2. Blackbirds\n3. Cows\n4. London\n5. Paris',
      answer: '1 and 5 only',
      wrong: ['1 and 2 only', '1 and 3 only', '4 and 5 only']
    },
    {
      passage: 'When Alfie\'s school discovered that he could fly, Immediately he assigned Alfie an extra essay on the history of flight. Word spread as fast as lightning, and soon Alfie was given lots of extra homework. He was asked to solve mathematical equations on flying and write poems about birds and the sky.',
      question: 'When Alfie\'s school discovered that he could fly, which of the following is true?',
      answer: 'Alfie became very busy',
      wrong: ['Alfie became world famous', 'Alfie became rich', 'Alfie got into trouble with his teachers']
    },
    {
      passage: 'Immediately he assigned Alfie an extra essay on the history of flight. Word spread as fast as lightning, and soon Alfie was given lots of extra homework. He was asked to solve mathematical equations on flying and write poems about birds and the sky. His classmates also started using him for their little tasks.',
      question: 'Which of these tasks was Alfie NOT given?',
      answer: 'Extra history homework',
      wrong: ['Extra maths homework', 'Extra English homework', 'Fetching the ball from the tree']
    },
    {
      passage: '"But I don\'t want to go on TV," protested Alfie. It was to no avail. The big day finally came. Alfie stood on a trampoline in the playground and stared at the TV cameras, pupils and teachers, who were watching in anticipation.',
      question: 'How did Alfie feel about being filmed?',
      answer: 'Unwilling',
      wrong: ['Excited', 'Proud', 'Ecstatic']
    },
    {
      passage: 'Alfie took a deep breath, flapped his arms and leapt into the air. It didn\'t work; he could no longer fly! Alfie fell, spraining his ankle. He grimaced in pain. The TV crew were furious and a great row erupted with the headteacher.',
      question: 'Why did Alfie take a \'deep breath\' (line 102)?',
      answer: 'To help him fly',
      wrong: ['To help him concentrate', 'To give him more energy', 'He was out of breath']
    },
    {
      passage: 'Alfie took a deep breath, flapped his arms and leapt into the air. It didn\'t work; he could no longer fly! Alfie fell, spraining his ankle. He grimaced in pain.',
      question: 'How do you think Alfie feels when he is about to fly in front of the TV crew?',
      answer: 'Apprehensive',
      wrong: ['Apathetic', 'Arrogant', 'Relaxed']
    },
    {
      passage: 'Alfie took a deep breath, flapped his arms and leapt into the air. It didn\'t work; he could no longer fly! Alfie fell, spraining his ankle. He grimaced in pain. The TV crew were furious and a great row erupted with the headteacher.',
      question: 'Why were the TV crew furious?',
      answer: 'Because they missed Alfie flying',
      wrong: ['Because the headteacher shouted at them', 'Because Alfie fell on the cameras', 'Because they had wasted their time']
    },
    {
      passage: 'But things soon settled down, as they always do. Alfie\'s routine quickly returned to normal and he stopped going to school early. Once, however, he was slow clearing up his books and he found that he had been left alone in the classroom. He looked all around and then spread his arms and flapped them softly. He felt his body rising gently from the tiles on the floor. Alfie hugged the discovery tightly and smiled inwardly as he left class.',
      question: 'Why do you think Alfie smiles at the end of the story?',
      answer: 'He has a secret',
      wrong: ['He is going to be famous', 'He will be on television', 'He heard a joke']
    },
    {
      passage: 'Alfie thought it best to postpone the experiment.',
      question: 'Which of these is closest in meaning to \'postpone\' (line 32)?',
      answer: 'Delay',
      wrong: ['Start', 'Finish', 'Continue']
    },
    {
      passage: 'Mr Smart, Alfie\'s teacher, had eyes as wide as dinner plates.',
      question: 'What is meant by the expression "Mr Smart had eyes as wide as dinner plates"?',
      answer: 'Mr Smart\'s eyes were very big',
      wrong: ['Mr Smart\'s eyes looked like dinner plates', 'Mr Smart\'s eyes were shiny', 'Mr Smart\'s eyes were bigger than saucers']
    },
    {
      passage: 'The idea was to show the world how Alfie could fly and bring prestige to the school.',
      question: 'Which of these is closest in meaning to \'prestige\' (line 95)?',
      answer: 'Fame',
      wrong: ['Celebrities', 'Scorn', 'Disgrace']
    },
    {
      passage: 'Alfie stood on a trampoline in the playground and stared at the TV cameras, pupils and teachers, who were watching in anticipation.',
      question: 'Which of these is closest to the description \'watching in anticipation\'?',
      answer: 'Eagerly waiting to see what will happen',
      wrong: ['Enthusiastically looking at what has happened', 'Impatiently waiting to see what will happen', 'Patiently waiting to see what happens']
    },
    {
      passage: 'Alfie, Rome, Mrs Beavers, Thursday are all examples of...',
      question: 'What type of words are these: Alfie, Rome, Mrs Beavers, Thursday?',
      answer: 'Proper nouns',
      wrong: ['Verbs', 'Pronouns', 'Common nouns']
    },
    {
      passage: 'Word spread as fast as lightning',
      question: '"Word spread as fast as lightning" is an example of...',
      answer: 'A simile',
      wrong: ['A phrase', 'A description', 'A proverb']
    },
    {
      passage: 'He soared out and over the city, side by side with the crows and the sparrows.',
      question: 'Which of these words is a verb: He soared out and over the city, side by side with the crows and the sparrows.',
      answer: 'Soared',
      wrong: ['He', 'Out', 'Sparrows']
    },
    {
      passage: 'His head bumped into the light with such force that he plummeted down. THWACK!',
      question: 'What type of word is \'THWACK\'?',
      answer: 'Onomatopoeia',
      wrong: ['Homonym', 'Metaphor', 'Acronym']
    },
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
    },
    {
      passage: 'The Roman Empire was one of the largest empires in history. At its peak, it controlled territories across Europe, North Africa, and the Middle East. The empire lasted for over 500 years.',
      question: 'How long did the Roman Empire last?',
      answer: 'Over 500 years',
      wrong: ['Over 100 years', 'Over 1000 years', 'Over 200 years']
    },
    {
      passage: 'Bees play a crucial role in our ecosystem. They pollinate flowers, helping plants to reproduce. Without bees, many of our favourite fruits and vegetables would not exist.',
      question: 'Why are bees important to our ecosystem?',
      answer: 'They pollinate flowers',
      wrong: ['They make honey', 'They eat pests', 'They fertilize soil']
    },
    {
      passage: 'The water cycle is a continuous process. Water evaporates from oceans and lakes, forms clouds, falls as rain, and returns to bodies of water. This cycle is essential for life on Earth.',
      question: 'What happens first in the water cycle?',
      answer: 'Water evaporates',
      wrong: ['Clouds form', 'Rain falls', 'Water returns to lakes']
    },
    {
      passage: 'Mount Everest is the highest mountain on Earth. It is located in the Himalayas between Nepal and Tibet. Many climbers attempt to reach its summit each year, but it is extremely dangerous.',
      question: 'Where is Mount Everest located?',
      answer: 'In the Himalayas',
      wrong: ['In the Alps', 'In the Andes', 'In the Rockies']
    },
    {
      passage: 'The digestive system breaks down food into nutrients that our body can use. It starts in the mouth where food is chewed, then moves through the stomach and intestines where nutrients are absorbed.',
      question: 'Where does digestion begin?',
      answer: 'In the mouth',
      wrong: ['In the stomach', 'In the intestines', 'In the throat']
    },
    {
      passage: 'Fossils are the preserved remains of ancient organisms. They form when an organism dies and is quickly buried by sediment. Over millions of years, the remains turn to stone.',
      question: 'How do fossils form?',
      answer: 'Organisms are buried and turn to stone',
      wrong: ['Organisms freeze in ice', 'Organisms dry out completely', 'Organisms are preserved in amber']
    },
    {
      passage: 'The moon orbits around Earth approximately once every 27 days. It does not produce its own light but reflects sunlight. The different phases of the moon depend on its position relative to the sun and Earth.',
      question: 'Why does the moon appear to shine?',
      answer: 'It reflects sunlight',
      wrong: ['It produces its own light', 'It reflects starlight', 'It glows from heat']
    },
    {
      passage: 'Penguins are flightless birds that live in the Southern Hemisphere. They are excellent swimmers and can dive deep underwater to catch fish. Their black and white coloring helps protect them from predators.',
      question: 'What do penguins eat?',
      answer: 'Fish',
      wrong: ['Plants', 'Insects', 'Seeds']
    },
    {
      passage: 'The Industrial Revolution began in Britain in the late 1700s. It marked a shift from hand-made goods to machine-made products. Factories were built, and many people moved from farms to cities to work.',
      question: 'When did the Industrial Revolution begin?',
      answer: 'In the late 1700s',
      wrong: ['In the early 1600s', 'In the mid 1800s', 'In the early 1900s']
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

// Word Analogies with skill-based difficulty
export function generateAnalogyQuestion(skillLevel: number = 1): GameQuestion {
  // Level 1: Simple, concrete relationships
  const level1Analogies = [
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
      question: 'Happy is to Sad as Up is to...',
      answer: 'Down',
      wrong: ['Sky', 'Above', 'High']
    },
    {
      question: 'Finger is to Hand as Toe is to...',
      answer: 'Foot',
      wrong: ['Leg', 'Nail', 'Body']
    },
    {
      question: 'Cat is to Kitten as Dog is to...',
      answer: 'Puppy',
      wrong: ['Bark', 'Pet', 'Animal']
    },
    {
      question: 'Wheel is to Car as Blade is to...',
      answer: 'Knife',
      wrong: ['Cut', 'Sharp', 'Metal']
    },
    {
      question: 'White is to Black as Left is to...',
      answer: 'Right',
      wrong: ['Up', 'Down', 'North']
    },
    {
      question: 'Eye is to See as Ear is to...',
      answer: 'Hear',
      wrong: ['Sound', 'Listen', 'Noise']
    },
    {
      question: 'Teacher is to Student as Parent is to...',
      answer: 'Child',
      wrong: ['Family', 'School', 'Baby']
    },
    {
      question: 'Cow is to Milk as Chicken is to...',
      answer: 'Egg',
      wrong: ['Feather', 'Nest', 'Farm']
    },
    {
      question: 'Slow is to Fast as Quiet is to...',
      answer: 'Loud',
      wrong: ['Sound', 'Noise', 'Volume']
    },
    {
      question: 'Beginning is to End as Start is to...',
      answer: 'Finish',
      wrong: ['Begin', 'Go', 'Come']
    },
    {
      question: 'Apple is to Fruit as Carrot is to...',
      answer: 'Vegetable',
      wrong: ['Orange', 'Food', 'Garden']
    },
    // From GL Assessment Pack 4 (Test 11D) - VR
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

  // Level 2: Common relationships, slightly more abstract
  const level2Analogies = [
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
      question: 'Painter is to Canvas as Sculptor is to...',
      answer: 'Stone',
      wrong: ['Chisel', 'Art', 'Clay']
    },
    {
      question: 'Hunger is to Food as Thirst is to...',
      answer: 'Water',
      wrong: ['Drink', 'Cup', 'Cold']
    },
    {
      question: 'Hammer is to Nail as Shovel is to...',
      answer: 'Soil',
      wrong: ['Dig', 'Earth', 'Ground']
    },
    {
      question: 'Athlete is to Stadium as Actor is to...',
      answer: 'Theatre',
      wrong: ['Stage', 'Play', 'Audience']
    },
    {
      question: 'Microscope is to Small as Telescope is to...',
      answer: 'Far',
      wrong: ['Big', 'Stars', 'Space']
    },
    {
      question: 'Thermometer is to Temperature as Scale is to...',
      answer: 'Weight',
      wrong: ['Heavy', 'Balance', 'Measure']
    },
    {
      question: 'Police is to Crime as Doctor is to...',
      answer: 'Disease',
      wrong: ['Medicine', 'Hospital', 'Illness']
    },
    {
      question: 'Seed is to Plant as Egg is to...',
      answer: 'Bird',
      wrong: ['Nest', 'Hatch', 'Feather']
    },
    {
      question: 'Photographer is to Camera as Writer is to...',
      answer: 'Pen',
      wrong: ['Paper', 'Notebook', 'Ink']
    },
    {
      question: 'Judge is to Courtroom as Principal is to...',
      answer: 'School',
      wrong: ['Student', 'Classroom', 'Office']
    },
    {
      question: 'Memory is to Forget as Health is to...',
      answer: 'Illness',
      wrong: ['Sick', 'Doctor', 'Medicine']
    }
  ]

  // Level 3+: More abstract or multi-step relationships
  const level3Analogies = [
    {
      question: 'Author is to Book as Composer is to...',
      answer: 'Symphony',
      wrong: ['Orchestra', 'Piano', 'Concert']
    },
    {
      question: 'Flour is to Bread as Grapes are to...',
      answer: 'Wine',
      wrong: ['Fruit', 'Vineyard', 'Juice']
    },
    {
      question: 'Acorn is to Oak as Seed is to...',
      answer: 'Plant',
      wrong: ['Garden', 'Soil', 'Root']
    },
    {
      question: 'Chapter is to Book as Scene is to...',
      answer: 'Play',
      wrong: ['Theatre', 'Actor', 'Stage']
    },
    {
      question: 'Architect is to Building as Engineer is to...',
      answer: 'Bridge',
      wrong: ['Metal', 'Construction', 'Road']
    },
    {
      question: 'Melody is to Song as Plot is to...',
      answer: 'Story',
      wrong: ['Book', 'Character', 'Novel']
    },
    {
      question: 'Extinction is to Species as Amnesia is to...',
      answer: 'Memory',
      wrong: ['Brain', 'Forget', 'Loss']
    },
    {
      question: 'Pedal is to Bicycle as Paddle is to...',
      answer: 'Canoe',
      wrong: ['Water', 'Row', 'Boat']
    },
    {
      question: 'Hypothesis is to Theory as Draft is to...',
      answer: 'Novel',
      wrong: ['Book', 'Final', 'Manuscript']
    },
    {
      question: 'Apprentice is to Master as Student is to...',
      answer: 'Scholar',
      wrong: ['Teacher', 'Learning', 'School']
    },
    {
      question: 'Catalyst is to Reaction as Spark is to...',
      answer: 'Fire',
      wrong: ['Flame', 'Heat', 'Light']
    },
    {
      question: 'Chrysalis is to Butterfly as Tadpole is to...',
      answer: 'Frog',
      wrong: ['Lily', 'Metamorphosis', 'Water']
    },
    {
      question: 'Fossil is to Dinosaur as Artifact is to...',
      answer: 'Civilization',
      wrong: ['History', 'Museum', 'Ancient']
    },
    {
      question: 'Manuscript is to Publication as Draft is to...',
      answer: 'Finished Work',
      wrong: ['Complete', 'Written', 'Final']
    },
    {
      question: 'Syntax is to Language as Grammar is to...',
      answer: 'Communication',
      wrong: ['Writing', 'Rules', 'Speech']
    }
  ]

  // Combine all levels for better variety, weighted by skill level
  // At lower levels, favor easier questions but still include harder ones occasionally
  const allAnalogies = [...level1Analogies, ...level2Analogies, ...level3Analogies]

  let selected
  if (skillLevel <= 1) {
    // 70% level 1, 25% level 2, 5% level 3
    const rand = Math.random()
    if (rand < 0.70) {
      selected = level1Analogies[Math.floor(Math.random() * level1Analogies.length)]
    } else if (rand < 0.95) {
      selected = level2Analogies[Math.floor(Math.random() * level2Analogies.length)]
    } else {
      selected = level3Analogies[Math.floor(Math.random() * level3Analogies.length)]
    }
  } else if (skillLevel === 2) {
    // 30% level 1, 50% level 2, 20% level 3
    const rand = Math.random()
    if (rand < 0.30) {
      selected = level1Analogies[Math.floor(Math.random() * level1Analogies.length)]
    } else if (rand < 0.80) {
      selected = level2Analogies[Math.floor(Math.random() * level2Analogies.length)]
    } else {
      selected = level3Analogies[Math.floor(Math.random() * level3Analogies.length)]
    }
  } else {
    // 10% level 1, 30% level 2, 60% level 3
    const rand = Math.random()
    if (rand < 0.10) {
      selected = level1Analogies[Math.floor(Math.random() * level1Analogies.length)]
    } else if (rand < 0.40) {
      selected = level2Analogies[Math.floor(Math.random() * level2Analogies.length)]
    } else {
      selected = level3Analogies[Math.floor(Math.random() * level3Analogies.length)]
    }
  }
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
    },
    {
      question: 'What comes next in the sequence?\nC, F, I, L, ?',
      answer: 'O',
      wrong: ['M', 'N', 'P'],
      explanation: 'Skip two letters each time (+3)'
    },
    {
      question: 'What comes next in the sequence?\nA, D, G, J, ?',
      answer: 'M',
      wrong: ['K', 'L', 'N'],
      explanation: 'Skip two letters each time (+3)'
    },
    {
      question: 'What comes next in the sequence?\nE, J, O, T, ?',
      answer: 'Y',
      wrong: ['X', 'U', 'Z'],
      explanation: 'Skip four letters each time (+5)'
    },
    {
      question: 'What comes next in the sequence?\nB, E, H, K, ?',
      answer: 'N',
      wrong: ['L', 'M', 'O'],
      explanation: 'Skip two letters each time (+3)'
    },
    {
      question: 'What comes next in the sequence?\nM, L, K, J, ?',
      answer: 'I',
      wrong: ['H', 'G', 'K'],
      explanation: 'Going backwards by 1 each time'
    },
    {
      question: 'What comes next in the sequence?\nP, N, L, J, ?',
      answer: 'H',
      wrong: ['I', 'G', 'K'],
      explanation: 'Going backwards by 2 each time (-2)'
    },
    {
      question: 'What comes next in the sequence?\nA, A, B, B, C, C, ?',
      answer: 'D',
      wrong: ['C', 'E', 'B'],
      explanation: 'Each letter appears twice'
    },
    {
      question: 'What comes next in the sequence?\nAB, BC, CD, DE, ?',
      answer: 'EF',
      wrong: ['DF', 'EG', 'FG'],
      explanation: 'Consecutive letter pairs moving forward'
    },
    {
      question: 'What comes next in the sequence?\nAZ, BY, CX, DW, ?',
      answer: 'EV',
      wrong: ['EW', 'DV', 'FV'],
      explanation: 'First letter goes forward, second backwards'
    },
    {
      question: 'What comes next in the sequence?\nB, C, E, H, ?',
      answer: 'L',
      wrong: ['I', 'K', 'J'],
      explanation: 'Add 1, then 2, then 3, then 4 (+1, +2, +3, +4)'
    },
    {
      question: 'What comes next in the sequence?\nA, C, F, J, ?',
      answer: 'O',
      wrong: ['K', 'M', 'N'],
      explanation: 'Add 2, then 3, then 4, then 5 (+2, +3, +4, +5)'
    },
    {
      question: 'What comes next in the sequence?\nZ, X, V, T, ?',
      answer: 'R',
      wrong: ['S', 'Q', 'U'],
      explanation: 'Backwards by 2 each time (-2)'
    },
    {
      question: 'What comes next in the sequence?\nF, H, J, L, ?',
      answer: 'N',
      wrong: ['M', 'O', 'K'],
      explanation: 'Skip one letter each time (+2)'
    },
    {
      question: 'What comes next in the sequence?\nA, E, I, M, ?',
      answer: 'Q',
      wrong: ['N', 'O', 'P'],
      explanation: 'Skip three letters each time (+4)'
    },
    {
      question: 'What comes next in the sequence?\nC, E, G, I, ?',
      answer: 'K',
      wrong: ['J', 'H', 'L'],
      explanation: 'Skip one letter each time (+2)'
    },
    {
      question: 'What comes next in the sequence?\nABC, BCD, CDE, DEF, ?',
      answer: 'EFG',
      wrong: ['DFG', 'EFH', 'FGH'],
      explanation: 'Three consecutive letters moving forward'
    },
    {
      question: 'What comes next in the sequence?\nBA, DC, FE, HG, ?',
      answer: 'JI',
      wrong: ['IJ', 'KJ', 'JK'],
      explanation: 'Pairs with first letter forward (+2), second backward (-1)'
    },
    {
      question: 'What comes next in the sequence?\nAC, BD, CE, DF, ?',
      answer: 'EG',
      wrong: ['EF', 'DG', 'FG'],
      explanation: 'Both letters move forward by 1'
    },
    {
      question: 'What comes next in the sequence?\nA, Z, B, Y, C, ?',
      answer: 'X',
      wrong: ['D', 'W', 'Z'],
      explanation: 'Alternating: forward from start, backward from end'
    },
    {
      question: 'What comes next in the sequence?\nD, G, J, M, ?',
      answer: 'P',
      wrong: ['N', 'O', 'Q'],
      explanation: 'Skip two letters each time (+3)'
    },
    {
      question: 'What comes next in the sequence?\nW, U, S, Q, ?',
      answer: 'O',
      wrong: ['P', 'R', 'N'],
      explanation: 'Backwards by 2 each time (-2)'
    },
    {
      question: 'What comes next in the sequence?\nB, B, D, D, F, F, ?',
      answer: 'H',
      wrong: ['G', 'F', 'I'],
      explanation: 'Each letter appears twice, skip one each time'
    },
    {
      question: 'What comes next in the sequence?\nA, D, B, E, C, F, ?',
      answer: 'D',
      wrong: ['G', 'E', 'C'],
      explanation: 'Two patterns: A,B,C... and D,E,F...'
    },
    {
      question: 'What comes next in the sequence?\nM, N, P, Q, S, T, ?',
      answer: 'V',
      wrong: ['U', 'W', 'T'],
      explanation: 'Add 1, then skip 1, alternating pattern'
    },
    {
      question: 'What comes next in the sequence?\nAC, DF, GI, JL, ?',
      answer: 'MO',
      wrong: ['MN', 'NO', 'LN'],
      explanation: 'Both letters jump forward by 3'
    },
    {
      question: 'What comes next in the sequence?\nH, I, K, N, ?',
      answer: 'R',
      wrong: ['O', 'P', 'Q'],
      explanation: 'Add 1, then 2, then 3, then 4'
    },
    {
      question: 'What comes next in the sequence?\nP, Q, S, V, ?',
      answer: 'Z',
      wrong: ['W', 'X', 'Y'],
      explanation: 'Add 1, then 2, then 3, then 4'
    },
    {
      question: 'What comes next in the sequence?\nE, F, H, K, O, ?',
      answer: 'T',
      wrong: ['P', 'S', 'R'],
      explanation: 'Add 1, 2, 3, 4, 5'
    },
    {
      question: 'What comes next in the sequence?\nAB, DE, GH, JK, ?',
      answer: 'MN',
      wrong: ['LM', 'NO', 'KL'],
      explanation: 'Pairs jumping forward by 3 letters'
    },
    {
      question: 'What comes next in the sequence?\nZ, W, T, Q, ?',
      answer: 'N',
      wrong: ['O', 'P', 'M'],
      explanation: 'Backwards by 3 each time (-3)'
    },
    {
      question: 'What comes next in the sequence?\nA, C, G, M, ?',
      answer: 'U',
      wrong: ['S', 'T', 'N'],
      explanation: 'Add 2, then 4, then 6, then 8'
    },
    {
      question: 'What comes next in the sequence?\nBDF, CEG, DFH, EGI, ?',
      answer: 'FHJ',
      wrong: ['FGJ', 'GHJ', 'EHJ'],
      explanation: 'Three letters each moving forward by 1'
    },
    {
      question: 'What comes next in the sequence?\nAE, BF, CG, DH, ?',
      answer: 'EI',
      wrong: ['EH', 'DI', 'FI'],
      explanation: 'Both letters move forward by 1'
    },
    {
      question: 'What comes next in the sequence?\nN, L, J, H, ?',
      answer: 'F',
      wrong: ['G', 'I', 'E'],
      explanation: 'Backwards by 2 each time (-2)'
    },
    {
      question: 'What comes next in the sequence?\nA, B, C, E, F, G, I, ?',
      answer: 'J',
      wrong: ['H', 'K', 'L'],
      explanation: 'Groups of 3, skip one letter between groups'
    },
    {
      question: 'What comes next in the sequence?\nY, W, U, S, ?',
      answer: 'Q',
      wrong: ['R', 'T', 'P'],
      explanation: 'Backwards by 2 each time (-2)'
    },
    // GL Assessment Pack 4 VR - Letter Sequence Analogies (Q37-43)
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
    },
    {
      question: 'If BIG = 297, what does TOP equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '201516',
      wrong: ['201615', '191516', '211516'],
      explanation: 'T=20, O=15, P=16'
    },
    {
      question: 'In a code, if DOG = EPH, what does CAT equal?',
      answer: 'DBU',
      wrong: ['CBT', 'DAU', 'CAU'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If RAT = SAU, what does PIG equal?',
      answer: 'QJH',
      wrong: ['QIH', 'PIH', 'QIG'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if BAD = CDE, what does MAD equal?',
      answer: 'NDE',
      wrong: ['MDE', 'NCE', 'NBE'],
      explanation: 'Each letter moves forward by 2'
    },
    {
      question: 'If RED = UFG, what does BED equal?',
      answer: 'EHG',
      wrong: ['DGF', 'EGF', 'DHG'],
      explanation: 'Each letter moves forward by 3'
    },
    {
      question: 'In a code, if HAT = GZS, what does BAT equal?',
      answer: 'AZS',
      wrong: ['BZS', 'AYS', 'BYS'],
      explanation: 'Each letter moves backward by 1'
    },
    {
      question: 'If FOX = ENW, what does BOX equal?',
      answer: 'ANW',
      wrong: ['BNW', 'AOW', 'BMW'],
      explanation: 'Each letter moves backward by 1'
    },
    {
      question: 'If ARM = 1185, what does LEG equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '12513',
      wrong: ['12514', '11513', '12512'],
      explanation: 'L=12, E=5, G=13'
    },
    {
      question: 'If FISH = 6919 8, what does BIRD equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '291894',
      wrong: ['291895', '281894', '291884'],
      explanation: 'B=2, I=9, R=18, D=4'
    },
    {
      question: 'In a code, if RUN = SVO, what does FAN equal?',
      answer: 'GBO',
      wrong: ['FBO', 'GBN', 'GAN'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If TIN = UJO, what does WIN equal?',
      answer: 'XJO',
      wrong: ['WJO', 'XIO', 'YJO'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if MAP = OCP, what does TAP equal?',
      answer: 'VCP',
      wrong: ['TCP', 'UCP', 'VBP'],
      explanation: 'Each letter moves forward by 2'
    },
    {
      question: 'If CAR = DBT, what does VAN equal?',
      answer: 'WBO',
      wrong: ['VBO', 'WBN', 'VAN'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If MAN = 131114, what does PAN equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '161114',
      wrong: ['151114', '161115', '171114'],
      explanation: 'P=16, A=1, N=14'
    },
    {
      question: 'In a code, if BUS = CVT, what does CUT equal?',
      answer: 'DVU',
      wrong: ['CUT', 'CVU', 'DUT'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If JAM = KBN, what does HAM equal?',
      answer: 'IBN',
      wrong: ['HBN', 'ICN', 'JBN'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If HOT = IPU, what does POT equal?',
      answer: 'QPU',
      wrong: ['PPU', 'QPT', 'PPT'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if TEA = WEB, what does PEA equal?',
      answer: 'SEB',
      wrong: ['PEB', 'REB', 'TEB'],
      explanation: 'Each letter moves forward by 3'
    },
    {
      question: 'If COW = DPX, what does NOW equal?',
      answer: 'OPX',
      wrong: ['NPX', 'OOX', 'NPW'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If EGG = 577, what does BEE equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '255',
      wrong: ['256', '265', '245'],
      explanation: 'B=2, E=5, E=5'
    },
    {
      question: 'In a code, if NET = OFU, what does JET equal?',
      answer: 'KFU',
      wrong: ['JFU', 'KGU', 'JET'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If BOW = CPX, what does ROW equal?',
      answer: 'SPX',
      wrong: ['RPX', 'SOX', 'RQX'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If MAT = NCU, what does BAT equal?',
      answer: 'CBU',
      wrong: ['BBU', 'CAU', 'BCU'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if GUN = HVO, what does RUN equal?',
      answer: 'SVO',
      wrong: ['RVO', 'SUO', 'TVO'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If PIE = QJF, what does TIE equal?',
      answer: 'UJF',
      wrong: ['TJF', 'UIF', 'VJF'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If SKY = 192511, what does FLY equal?\n(A=1, B=2, C=3... Z=26)',
      answer: '612 25',
      wrong: ['71225', '61225', '51225'],
      explanation: 'F=6, L=12, Y=25'
    },
    {
      question: 'In a code, if LAD = MBE, what does SAD equal?',
      answer: 'TBE',
      wrong: ['SBE', 'TCE', 'UAE'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If CUP = DVQ, what does MUG equal?',
      answer: 'NVH',
      wrong: ['MVH', 'NUH', 'OVH'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If OWL = PXM, what does BAT equal?',
      answer: 'CBU',
      wrong: ['BBU', 'CAU', 'BAU'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if FIG = GJH, what does BIG equal?',
      answer: 'CJH',
      wrong: ['BJH', 'CIH', 'DIH'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If SIT = TJU, what does HIT equal?',
      answer: 'IJU',
      wrong: ['HJU', 'IIU', 'JJU'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If COT = DPU, what does POT equal?',
      answer: 'QPU',
      wrong: ['PPU', 'QOU', 'QPT'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If RAG = SBH, what does BAG equal?',
      answer: 'CBH',
      wrong: ['BBH', 'CAH', 'BCH'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'In a code, if PIG = RKI, what does FIG equal?',
      answer: 'HKI',
      wrong: ['GKI', 'HJI', 'IKI'],
      explanation: 'Each letter moves forward by 2'
    },
    {
      question: 'If BIN = CJO, what does PIN equal?',
      answer: 'QJO',
      wrong: ['PJO', 'QIO', 'RJO'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If NUT = OVU, what does CUT equal?',
      answer: 'DVU',
      wrong: ['CVU', 'DUU', 'EVU'],
      explanation: 'Each letter moves forward by 1'
    },
    {
      question: 'If PAW = QBX, what does SAW equal?',
      answer: 'TBX',
      wrong: ['SBX', 'TAX', 'UBX'],
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
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Spain',
      wrong: ['Paris', 'London', 'Berlin'],
      explanation: 'Spain is a country, the others are capital cities'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Piano',
      wrong: ['Violin', 'Guitar', 'Cello'],
      explanation: 'Piano uses keys, the others use strings'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Square',
      wrong: ['Pentagon', 'Hexagon', 'Octagon'],
      explanation: 'Square has 4 sides, the others have 5 or more'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Mercury',
      wrong: ['Venus', 'Mars', 'Saturn'],
      explanation: 'Mercury is closest to the sun, others are outer planets'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Whale',
      wrong: ['Shark', 'Dolphin', 'Seal'],
      explanation: 'Whale is a mammal, shark is a fish'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Gold',
      wrong: ['Wood', 'Paper', 'Cotton'],
      explanation: 'Gold is a metal, the others are organic materials'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Soccer',
      wrong: ['Tennis', 'Badminton', 'Squash'],
      explanation: 'Soccer uses a ball kicked with feet, others use rackets'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'River',
      wrong: ['Lake', 'Pond', 'Pool'],
      explanation: 'River has flowing water, the others are still water bodies'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Butterfly',
      wrong: ['Ant', 'Bee', 'Wasp'],
      explanation: 'Butterfly undergoes complete metamorphosis differently'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Hammer',
      wrong: ['Screwdriver', 'Wrench', 'Pliers'],
      explanation: 'Hammer is for striking, others are for gripping/turning'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Novel',
      wrong: ['Magazine', 'Newspaper', 'Journal'],
      explanation: 'Novel is fiction, the others are periodicals'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Penguin',
      wrong: ['Ostrich', 'Emu', 'Kiwi'],
      explanation: 'Penguin lives in Antarctica, others are found in warmer climates'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Broccoli',
      wrong: ['Rose', 'Tulip', 'Daisy'],
      explanation: 'Broccoli is a vegetable, the others are flowers'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Copper',
      wrong: ['Plastic', 'Rubber', 'Glass'],
      explanation: 'Copper is a metal and conducts electricity, others are insulators'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Dictionary',
      wrong: ['Novel', 'Story', 'Biography'],
      explanation: 'Dictionary is reference, others are narrative books'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Jupiter',
      wrong: ['Earth', 'Mars', 'Venus'],
      explanation: 'Jupiter is a gas giant, the others are rocky planets'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Bread',
      wrong: ['Butter', 'Cheese', 'Yogurt'],
      explanation: 'Bread is made from grain, the others are dairy products'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Ice',
      wrong: ['Steam', 'Water', 'Rain'],
      explanation: 'Ice is solid, the others are liquid or gas forms of water'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Spider',
      wrong: ['Ant', 'Butterfly', 'Beetle'],
      explanation: 'Spider has 8 legs (arachnid), the others have 6 legs (insects)'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Trumpet',
      wrong: ['Flute', 'Clarinet', 'Saxophone'],
      explanation: 'Trumpet is brass, the others are woodwind instruments'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Lake',
      wrong: ['Ocean', 'Sea', 'Bay'],
      explanation: 'Lake is freshwater and landlocked, others are saltwater'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Snake',
      wrong: ['Frog', 'Toad', 'Salamander'],
      explanation: 'Snake is a reptile, the others are amphibians'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Oak',
      wrong: ['Pine', 'Fir', 'Spruce'],
      explanation: 'Oak is deciduous (loses leaves), others are evergreen'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Equator',
      wrong: ['Continent', 'Country', 'City'],
      explanation: 'Equator is an imaginary line, the others are physical places'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Microscope',
      wrong: ['Telescope', 'Binoculars', 'Periscope'],
      explanation: 'Microscope magnifies small objects, others magnify distant objects'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Rectangle',
      wrong: ['Square', 'Rhombus', 'Diamond'],
      explanation: 'Rectangle has only opposite sides equal, others have all sides equal'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Oxygen',
      wrong: ['Iron', 'Copper', 'Silver'],
      explanation: 'Oxygen is a gas, the others are solid metals'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Subway',
      wrong: ['Bus', 'Taxi', 'Truck'],
      explanation: 'Subway runs on tracks underground, others run on roads'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Cone',
      wrong: ['Cube', 'Pyramid', 'Prism'],
      explanation: 'Cone has a curved surface, the others have flat faces only'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Potato',
      wrong: ['Onion', 'Garlic', 'Ginger'],
      explanation: 'Potato is a tuber, the others are bulbs or rhizomes'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Moon',
      wrong: ['Sun', 'Star', 'Comet'],
      explanation: 'Moon is a satellite, the others produce their own light'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Tornado',
      wrong: ['Hurricane', 'Typhoon', 'Cyclone'],
      explanation: 'Tornado forms over land, the others form over ocean'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Cactus',
      wrong: ['Fern', 'Moss', 'Algae'],
      explanation: 'Cactus is a flowering plant, the others reproduce by spores'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Leather',
      wrong: ['Cotton', 'Wool', 'Silk'],
      explanation: 'Leather comes from animal skin, others are natural fibers'
    },
    {
      question: 'Which word is the odd one out?',
      answer: 'Volcano',
      wrong: ['Mountain', 'Hill', 'Valley'],
      explanation: 'Volcano can erupt, the others are passive landforms'
    },
    // GL Assessment Pack 4 VR - Odd One Out (Q44-50)
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
    },
    {
      question: 'Lucy is younger than Mark. Mark is younger than Nina. Who is the oldest?',
      answer: 'Nina',
      wrong: ['Lucy', 'Mark', 'Cannot tell']
    },
    {
      question: 'If it rains, the ground gets wet. The ground is wet. What can we conclude?',
      answer: 'It might have rained',
      wrong: ['It definitely rained', 'It did not rain', 'The ground is dry']
    },
    {
      question: 'All cats have whiskers. Fluffy has whiskers. What can we conclude?',
      answer: 'Fluffy might be a cat',
      wrong: ['Fluffy is definitely a cat', 'Fluffy is not a cat', 'All whiskers belong to cats']
    },
    {
      question: 'Ben runs faster than Amy. Amy runs faster than Carl. Who is the slowest?',
      answer: 'Carl',
      wrong: ['Ben', 'Amy', 'Cannot tell']
    },
    {
      question: 'A bus leaves at 9:15 AM and the journey takes 45 minutes. What time does it arrive?',
      answer: '10:00 AM',
      wrong: ['9:45 AM', '10:15 AM', '9:60 AM']
    },
    {
      question: 'If all birds can fly and penguins are birds, can penguins fly?',
      answer: 'The statement is false',
      wrong: ['Yes, they can fly', 'No, but they are not birds', 'Only some penguins fly']
    },
    {
      question: 'Red is darker than pink. Pink is darker than white. Which is the lightest?',
      answer: 'White',
      wrong: ['Red', 'Pink', 'Cannot tell']
    },
    {
      question: 'If A is larger than B and B is larger than C, which is the smallest?',
      answer: 'C',
      wrong: ['A', 'B', 'Cannot tell']
    },
    {
      question: 'Sam is heavier than Lisa. Lisa is heavier than Paul. Who weighs the most?',
      answer: 'Sam',
      wrong: ['Lisa', 'Paul', 'Cannot tell']
    },
    {
      question: 'If today is Monday, what day was it 3 days ago?',
      answer: 'Friday',
      wrong: ['Thursday', 'Saturday', 'Sunday']
    },
    {
      question: 'All roses are flowers. This is a flower. What can we conclude?',
      answer: 'It might be a rose',
      wrong: ['It is definitely a rose', 'It is not a rose', 'All flowers are roses']
    },
    {
      question: 'Jane sits to the left of Tim. Tim sits to the left of Sarah. Who is on the far right?',
      answer: 'Sarah',
      wrong: ['Jane', 'Tim', 'Cannot tell']
    },
    {
      question: 'A movie starts at 7:30 PM and lasts 2 hours 15 minutes. When does it end?',
      answer: '9:45 PM',
      wrong: ['9:30 PM', '10:00 PM', '9:15 PM']
    },
    {
      question: 'If all squares are rectangles, and this is a square, what can we conclude?',
      answer: 'It is a rectangle',
      wrong: ['It is not a rectangle', 'All rectangles are squares', 'It might be a rectangle']
    },
    {
      question: 'Book A is thicker than Book B. Book C is thinner than Book B. Which is the thinnest?',
      answer: 'Book C',
      wrong: ['Book A', 'Book B', 'Cannot tell']
    },
    {
      question: 'If no cats are dogs, and Rex is a cat, what can we conclude?',
      answer: 'Rex is not a dog',
      wrong: ['Rex is a dog', 'Some cats are dogs', 'Rex might be a dog']
    },
    {
      question: 'Anna finished before Beth. Beth finished before Carol. Who finished first?',
      answer: 'Anna',
      wrong: ['Beth', 'Carol', 'Cannot tell']
    },
    {
      question: 'A clock shows 2:45. What time will it show in 3 hours and 30 minutes?',
      answer: '6:15',
      wrong: ['5:45', '6:45', '5:15']
    },
    {
      question: 'If all mammals breathe air and whales are mammals, do whales breathe air?',
      answer: 'Yes',
      wrong: ['No', 'Only some whales', 'Cannot tell']
    },
    {
      question: 'Tree X is taller than Tree Y. Tree Z is shorter than Tree Y. Which is the tallest?',
      answer: 'Tree X',
      wrong: ['Tree Y', 'Tree Z', 'Cannot tell']
    },
    {
      question: 'If March comes before April, and today is April 5th, was March 20th in the past or future?',
      answer: 'Past',
      wrong: ['Future', 'Present', 'Cannot tell']
    },
    {
      question: 'Box 1 is lighter than Box 2. Box 3 is heavier than Box 2. Which is the heaviest?',
      answer: 'Box 3',
      wrong: ['Box 1', 'Box 2', 'Cannot tell']
    },
    {
      question: 'All students in the class passed. Maria is in the class. Did Maria pass?',
      answer: 'Yes',
      wrong: ['No', 'Maybe', 'Cannot tell']
    },
    {
      question: 'A train journey takes 1 hour 45 minutes. If it leaves at 11:30 AM, when does it arrive?',
      answer: '1:15 PM',
      wrong: ['12:15 PM', '1:45 PM', '12:45 PM']
    },
    {
      question: 'If some birds migrate and sparrows are birds, do all sparrows migrate?',
      answer: 'Cannot tell',
      wrong: ['Yes, all sparrows migrate', 'No sparrows migrate', 'Only some birds are sparrows']
    },
    {
      question: 'Dan scored higher than Emma. Finn scored lower than Emma. Who scored the lowest?',
      answer: 'Finn',
      wrong: ['Dan', 'Emma', 'Cannot tell']
    },
    {
      question: 'If all even numbers are divisible by 2, and 8 is even, is 8 divisible by 2?',
      answer: 'Yes',
      wrong: ['No', 'Sometimes', 'Cannot tell']
    },
    {
      question: 'Building A is older than Building B. Building C is newer than Building B. Which is the newest?',
      answer: 'Building C',
      wrong: ['Building A', 'Building B', 'Cannot tell']
    },
    {
      question: 'If we leave at 4:20 PM and arrive 2 hours 40 minutes later, what time do we arrive?',
      answer: '7:00 PM',
      wrong: ['6:40 PM', '6:00 PM', '7:20 PM']
    },
    {
      question: 'Rachel is behind Tom in the queue. Sarah is behind Rachel. Who is at the front?',
      answer: 'Tom',
      wrong: ['Rachel', 'Sarah', 'Cannot tell']
    },
    {
      question: 'If all prime numbers greater than 2 are odd, and 7 is prime and greater than 2, is 7 odd?',
      answer: 'Yes',
      wrong: ['No', 'Sometimes', 'Cannot tell']
    },
    {
      question: 'Car A costs more than Car B. Car C costs less than Car B. Which is the cheapest?',
      answer: 'Car C',
      wrong: ['Car A', 'Car B', 'Cannot tell']
    },
    {
      question: 'All triangles have 3 sides. This shape has 3 sides. What can we conclude?',
      answer: 'It might be a triangle',
      wrong: ['It is definitely a triangle', 'It is not a triangle', 'All 3-sided shapes are triangles']
    },
    {
      question: 'If breakfast is at 8:00 AM and lunch is 4 hours later, what time is lunch?',
      answer: '12:00 PM',
      wrong: ['11:00 AM', '1:00 PM', '12:30 PM']
    },
    {
      question: 'Peter lives further from school than Quinn. Quinn lives further than Ruby. Who lives closest?',
      answer: 'Ruby',
      wrong: ['Peter', 'Quinn', 'Cannot tell']
    },
    // From GL Assessment Pack 4 (Test 11D) - VR Logic Puzzles
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

// Hidden Words (GL Assessment Style) - Find a word hidden across adjacent words
export function generateHiddenWordQuestion(): GameQuestion {
  const questions = [
    // GL Assessment Style Hidden Words - 3 letter words
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe dog ATE his dinner.',
      answer: 'ate',
      wrong: ['dog', 'his', 'the'],
      explanation: 'ATE is clearly visible as a word'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nPlease wash every dish.',
      answer: 'her',
      wrong: ['was', 'eve', 'dis'],
      explanation: 'wasH EVeRy - HER is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe new hat was red.',
      answer: 'hat',
      wrong: ['new', 'red', 'was'],
      explanation: 'HAT is visible as a word'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nShe came late today.',
      answer: 'ame',
      wrong: ['cam', 'lat', 'ate'],
      explanation: 'cAME Late - CAMEL could work but AME is across two words'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe car pet was soft.',
      answer: 'pet',
      wrong: ['car', 'was', 'oft'],
      explanation: 'caR PET - PET is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nMy brother owns three cats.',
      answer: 'row',
      wrong: ['own', 'cat', 'the'],
      explanation: 'bROtHer OWns - ROW is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe camp ended early.',
      answer: 'pen',
      wrong: ['cam', 'end', 'ear'],
      explanation: 'camP ENded - PEN is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nShe ran towards the goal.',
      answer: 'ant',
      wrong: ['ran', 'the', 'oal'],
      explanation: 'rAN Towards - ANT is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe stamp included postage.',
      answer: 'pin',
      wrong: ['sta', 'inc', 'pos'],
      explanation: 'stamP INcluded - PIN is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nI need to listen carefully.',
      answer: 'ten',
      wrong: ['nee', 'lis', 'car'],
      explanation: 'lisTEN Carefully - TEN is hidden'
    },
    // GL Assessment Style Hidden Words - 4 letter words
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe trumpet player was good.',
      answer: 'play',
      wrong: ['trum', 'good', 'ayer'],
      explanation: 'trumpET PLAYer - PLAY is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nShe came late and missed it.',
      answer: 'late',
      wrong: ['came', 'miss', 'andi'],
      explanation: 'LATE is visible as a word'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe toast and jam was nice.',
      answer: 'sand',
      wrong: ['toas', 'jams', 'nice'],
      explanation: 'toaST AND - STAND has S T A N D'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nWe saw them eating lunch.',
      answer: 'them',
      wrong: ['saws', 'eati', 'unch'],
      explanation: 'THEM is visible as a word'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe match ended early.',
      answer: 'ache',
      wrong: ['matc', 'ende', 'arly'],
      explanation: 'matCH Ended - ACHE is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nI never use pencils.',
      answer: 'ruse',
      wrong: ['neve', 'penc', 'cils'],
      explanation: 'neveR USE - RUSE is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe program ended at nine.',
      answer: 'game',
      wrong: ['prog', 'ende', 'nine'],
      explanation: 'proGrAM Ended - GAME is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nShe felt awfully tired.',
      answer: 'tawf',
      wrong: ['felt', 'tire', 'awfu'],
      explanation: 'felT AWFully - This one is tricky!'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nWe kept raining clothes inside.',
      answer: 'rain',
      wrong: ['kept', 'clot', 'insi'],
      explanation: 'kePT RAINing - RAIN is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nShe made a nice cake.',
      answer: 'dean',
      wrong: ['made', 'nice', 'cake'],
      explanation: 'maDe A Nice - DEAN is hidden'
    },
    // GL Assessment Style - Find word hidden in sentence
    {
      question: 'Find a FOUR letter word hidden in this sentence:\nThe actor helped young actors.',
      answer: 'help',
      wrong: ['acto', 'youn', 'tors'],
      explanation: 'actOR HELPed - HELP is part of helped'
    },
    {
      question: 'Find a FOUR letter word hidden in this sentence:\nShe ran with extra energy.',
      answer: 'anew',
      wrong: ['rans', 'with', 'extr'],
      explanation: 'rAN WIth Extra - Actually ANEW from rAN WIth'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe school opened on Monday.',
      answer: 'loo',
      wrong: ['sch', 'ope', 'mon'],
      explanation: 'schOOL Opened - Actually schoOL Opened has OLO'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nHe went outside after dinner.',
      answer: 'idea',
      wrong: ['went', 'outs', 'dinn'],
      explanation: 'outsIDe After - IDEA'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe fast orange cat ran.',
      answer: 'tor',
      wrong: ['fas', 'ora', 'ran'],
      explanation: 'fasT ORAnge - TOR is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nPut the stamp on the letter.',
      answer: 'upon',
      wrong: ['stam', 'lett', 'thes'],
      explanation: 'stamP ON - UPON is not quite right, stamP ON gives PON'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nHe was so happy today.',
      answer: 'soh',
      wrong: ['was', 'hap', 'day'],
      explanation: 'waS O Happy - SOH (or note SO HAP has OHA)'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe cream in coffee is nice.',
      answer: 'mice',
      wrong: ['crea', 'coff', 'nice'],
      explanation: 'creaM IN CoffEe - Actually creAM IN has AMIN'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nPlease grab an apple.',
      answer: 'ban',
      wrong: ['gra', 'app', 'ple'],
      explanation: 'graB AN - BAN is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nShe had a map in her bag.',
      answer: 'pin',
      wrong: ['had', 'map', 'her'],
      explanation: 'maP IN - PIN is hidden'
    },
    // More GL style hidden words
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe farm stood on the hill.',
      answer: 'arms',
      wrong: ['farm', 'hill', 'stoo'],
      explanation: 'fARMS tood - ARMS is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nMy sister ran every day.',
      answer: 'tern',
      wrong: ['sist', 'ever', 'days'],
      explanation: 'sisTER raN - TERN is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe dish only needed washing.',
      answer: 'one',
      wrong: ['dis', 'nee', 'was'],
      explanation: 'dishONE - Actually dish ONLY has SHON, Only NEeded has ONE!'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nWe rode past him quickly.',
      answer: 'him',
      wrong: ['rod', 'pas', 'qui'],
      explanation: 'HIM is visible as a word'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe team often wins games.',
      answer: 'moft',
      wrong: ['team', 'wins', 'game'],
      explanation: 'teaM OFTen - MOFT'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nPut the cap on the bottle.',
      answer: 'pon',
      wrong: ['put', 'cap', 'bot'],
      explanation: 'caP ON - PON'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe pilot asked to land.',
      answer: 'task',
      wrong: ['pilo', 'land', 'aske'],
      explanation: 'piloT ASKed - TASK is hidden'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nI saw her open the door.',
      answer: 'rope',
      wrong: ['saw', 'her', 'ope'],
      explanation: 'heR OPEn - ROPE is hidden'
    },
    {
      question: 'Find a FOUR letter word hidden across TWO words:\nThe ship sailed at dawn.',
      answer: 'sail',
      wrong: ['ship', 'dawn', 'leda'],
      explanation: 'SAIL is visible in SAILED'
    },
    {
      question: 'Find a THREE letter word hidden across TWO words:\nThe drum makes loud sounds.',
      answer: 'umm',
      wrong: ['dru', 'mak', 'lou'],
      explanation: 'drUM Makes - UMM'
    },
    // GL Assessment Pack 4 VR - Hidden Words (Q58-64)
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
    },
    // GL Assessment Pack 4 VR - Missing Letters in Words (Q51-57)
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

// Shape Patterns with skill-based difficulty
export function generateShapePatternQuestion(skillLevel: number = 1): GameQuestion {
  // Level 1: Simple repeating patterns (2-3 elements)
  const level1Patterns = [
    {
      question: 'Pattern: ○ △ □ ○ △ ?\nWhat comes next?',
      answer: '□',
      wrong: ['○', '△', '◇'],
      explanation: 'Repeating pattern: circle, triangle, square'
    },
    {
      question: 'Pattern: ◆ ◇ ◆ ◇ ?\nWhat comes next?',
      answer: '◆',
      wrong: ['◇', '○', '△'],
      explanation: 'Alternating filled and empty diamonds'
    },
    {
      question: 'Pattern: ★ ☆ ★ ☆ ★ ?\nWhat comes next?',
      answer: '☆',
      wrong: ['★', '●', '◇'],
      explanation: 'Alternating filled and empty stars'
    },
    {
      question: 'Pattern: ■ □ ■ □ ?\nWhat comes next?',
      answer: '■',
      wrong: ['□', '●', '○'],
      explanation: 'Alternating filled and empty squares'
    },
    {
      question: 'Pattern: ● ○ ● ○ ● ?\nWhat comes next?',
      answer: '○',
      wrong: ['●', '△', '□'],
      explanation: 'Alternating filled and empty circles'
    },
    {
      question: 'Pattern: △ ○ △ ○ ?\nWhat comes next?',
      answer: '△',
      wrong: ['○', '□', '◇'],
      explanation: 'Alternating triangle and circle'
    },
    {
      question: 'Pattern: □ △ ○ □ △ ?\nWhat comes next?',
      answer: '○',
      wrong: ['□', '△', '●'],
      explanation: 'Repeating pattern: square, triangle, circle'
    },
    {
      question: 'Pattern: ◇ ◇ ● ◇ ◇ ?\nWhat comes next?',
      answer: '●',
      wrong: ['◇', '○', '□'],
      explanation: 'Two diamonds, then one circle'
    },
    {
      question: 'Pattern: ▲ ▼ ▲ ▼ ?\nWhat comes next?',
      answer: '▲',
      wrong: ['▼', '△', '●'],
      explanation: 'Alternating up and down triangles'
    },
    {
      question: 'Pattern: ○ ○ △ ○ ○ ?\nWhat comes next?',
      answer: '△',
      wrong: ['○', '●', '□'],
      explanation: 'Two circles, then one triangle'
    },
    {
      question: 'Pattern: ■ ● ■ ● ?\nWhat comes next?',
      answer: '■',
      wrong: ['●', '□', '○'],
      explanation: 'Alternating square and circle'
    },
    {
      question: 'Pattern: ☆ △ □ ☆ △ ?\nWhat comes next?',
      answer: '□',
      wrong: ['☆', '△', '○'],
      explanation: 'Repeating pattern: star, triangle, square'
    },
    {
      question: 'Pattern: ◆ ○ ◆ ○ ?\nWhat comes next?',
      answer: '◆',
      wrong: ['○', '●', '△'],
      explanation: 'Alternating diamond and circle'
    },
    {
      question: 'Pattern: ▲ □ ○ ▲ □ ?\nWhat comes next?',
      answer: '○',
      wrong: ['▲', '□', '△'],
      explanation: 'Repeating pattern: triangle, square, circle'
    },
    {
      question: 'Pattern: ● △ ● △ ● ?\nWhat comes next?',
      answer: '△',
      wrong: ['●', '○', '□'],
      explanation: 'Alternating filled circle and triangle'
    }
  ]

  // Level 2: Two-step patterns
  const level2Patterns = [
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
      question: 'Pattern: ○ △ △ ○ △ △ ○ ?\nWhat comes next?',
      answer: '△',
      wrong: ['○', '□', '●'],
      explanation: 'One circle, then two triangles'
    },
    {
      question: 'Pattern: ● ● ● ○ ● ● ● ?\nWhat comes next?',
      answer: '○',
      wrong: ['●', '△', '□'],
      explanation: 'Three filled circles, then one empty circle'
    },
    {
      question: 'Pattern: □ ■ ■ □ ■ ■ ?\nWhat comes next?',
      answer: '□',
      wrong: ['■', '○', '●'],
      explanation: 'One empty square, then two filled squares'
    },
    {
      question: 'Pattern: △ ○ ○ △ ○ ○ △ ?\nWhat comes next?',
      answer: '○',
      wrong: ['△', '●', '□'],
      explanation: 'One triangle, then two circles'
    },
    {
      question: 'Pattern: ◆ ◇ ◇ ◆ ◇ ◇ ?\nWhat comes next?',
      answer: '◆',
      wrong: ['◇', '●', '○'],
      explanation: 'One filled diamond, then two empty diamonds'
    },
    {
      question: 'Pattern: ☆ ☆ ★ ☆ ☆ ★ ?\nWhat comes next?',
      answer: '☆',
      wrong: ['★', '●', '○'],
      explanation: 'Two empty stars, then one filled star'
    },
    {
      question: 'Pattern: ▲ ▲ ▼ ▲ ▲ ▼ ▲ ▲ ?\nWhat comes next?',
      answer: '▼',
      wrong: ['▲', '△', '●'],
      explanation: 'Two up triangles, then one down triangle'
    },
    {
      question: 'Pattern: ● ○ ○ ○ ● ○ ○ ○ ?\nWhat comes next?',
      answer: '●',
      wrong: ['○', '△', '□'],
      explanation: 'One filled circle, then three empty circles'
    },
    {
      question: 'Pattern: □ □ △ □ □ △ ?\nWhat comes next?',
      answer: '□',
      wrong: ['△', '○', '●'],
      explanation: 'Two squares, then one triangle'
    },
    {
      question: 'Pattern: ◇ ● ● ◇ ● ● ?\nWhat comes next?',
      answer: '◇',
      wrong: ['●', '○', '△'],
      explanation: 'One diamond, then two circles'
    },
    {
      question: 'Pattern: ■ ○ ○ ■ ○ ○ ■ ?\nWhat comes next?',
      answer: '○',
      wrong: ['■', '●', '△'],
      explanation: 'One square, then two circles'
    },
    {
      question: 'Pattern: ★ △ △ △ ★ △ △ △ ?\nWhat comes next?',
      answer: '★',
      wrong: ['△', '☆', '○'],
      explanation: 'One star, then three triangles'
    },
    {
      question: 'Pattern: ▲ ● ● ▲ ● ● ▲ ?\nWhat comes next?',
      answer: '●',
      wrong: ['▲', '○', '△'],
      explanation: 'One triangle, then two circles'
    }
  ]

  // Level 3+: Complex patterns with rotation or multiple attributes
  const level3Patterns = [
    {
      question: 'Pattern: ◐ ◑ ◒ ◓ ?\nWhat comes next?',
      answer: '◐',
      wrong: ['◑', '◒', '○'],
      explanation: 'Rotating shaded circle pattern'
    },
    {
      question: 'Pattern: △ ▲ □ ■ ○ ?\nWhat comes next?',
      answer: '●',
      wrong: ['○', '◇', '△'],
      explanation: 'Alternating empty and filled shapes: triangle, square, circle'
    },
    {
      question: 'Pattern: ● ●● ●●● ?\nWhat comes next?',
      answer: '●●●●',
      wrong: ['●●', '●', '●●●●●'],
      explanation: 'Adding one circle each time'
    },
    {
      question: 'Pattern: ○ ●● ○○○ ●●●● ?\nWhat comes next?',
      answer: '○○○○○',
      wrong: ['●●●●●', '○○○○', '●●●'],
      explanation: 'Alternating filled/empty, adding one each time'
    },
    {
      question: 'Pattern: △ △△ □ □□ ○ ?\nWhat comes next?',
      answer: '○○',
      wrong: ['○', '△△△', '□□□'],
      explanation: 'Different shapes, doubling count each time'
    },
    {
      question: 'Pattern: ■ □□ ■■■ □□□□ ?\nWhat comes next?',
      answer: '■■■■■',
      wrong: ['□□□□□', '■■■■', '□□□'],
      explanation: 'Alternating filled/empty squares, increasing count'
    },
    {
      question: 'Pattern: ▶ ▼ ◀ ▲ ▶ ?\nWhat comes next?',
      answer: '▼',
      wrong: ['◀', '▲', '▶'],
      explanation: 'Rotating arrows clockwise: right, down, left, up'
    },
    {
      question: 'Pattern: ★ ☆☆ ★★★ ☆☆☆☆ ?\nWhat comes next?',
      answer: '★★★★★',
      wrong: ['☆☆☆☆☆', '★★★★', '☆☆☆'],
      explanation: 'Alternating filled/empty stars, increasing count'
    },
    {
      question: 'Pattern: ◆ ◆◇ ◆◇◇ ?\nWhat comes next?',
      answer: '◆◇◇◇',
      wrong: ['◆◆◇◇', '◇◇◇◇', '◆◆◆◇'],
      explanation: 'One filled diamond, then adding empty diamonds'
    },
    {
      question: 'Pattern: ○ △△ ○○○ △△△△ ?\nWhat comes next?',
      answer: '○○○○○',
      wrong: ['△△△△△', '○○○○', '△△△'],
      explanation: 'Alternating shapes, increasing count each time'
    },
    {
      question: 'Pattern: ● □ ●● □□ ●●● ?\nWhat comes next?',
      answer: '□□□',
      wrong: ['●●●●', '□□', '●●'],
      explanation: 'Alternating circle and square, increasing count'
    },
    {
      question: 'Pattern: ▲ ▼ ▼ ▲ ▲ ▲ ▼ ▼ ▼ ▼ ?\nWhat comes next?',
      answer: '▲',
      wrong: ['▼', '△', '●'],
      explanation: 'Alternating up/down triangles with increasing count'
    },
    {
      question: 'Pattern: ■ ◆ ● ■ ◆ ● ?\nWhat comes next?',
      answer: '■',
      wrong: ['◆', '●', '○'],
      explanation: 'Three different shapes repeating: square, diamond, circle'
    },
    {
      question: 'Pattern: ☆ ★★ ☆☆☆ ★★★★ ?\nWhat comes next?',
      answer: '☆☆☆☆☆',
      wrong: ['★★★★★', '☆☆☆☆', '★★★'],
      explanation: 'Alternating empty/filled stars, increasing count'
    },
    {
      question: 'Pattern: ○ △ □ ◇ ○ △ □ ?\nWhat comes next?',
      answer: '◇',
      wrong: ['○', '△', '□'],
      explanation: 'Four different shapes repeating: circle, triangle, square, diamond'
    }
  ]

  // Select based on skill level
  let patterns
  if (skillLevel <= 1) {
    patterns = level1Patterns
  } else if (skillLevel === 2) {
    patterns = level2Patterns
  } else {
    patterns = level3Patterns
  }

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
    },
    {
      question: 'What comes next?\n5, 10, 15, 20, ?',
      answer: '25',
      wrong: ['22', '30', '24'],
      explanation: 'Add 5 each time (multiples of 5)'
    },
    {
      question: 'What comes next?\n1, 3, 5, 7, ?',
      answer: '9',
      wrong: ['8', '10', '11'],
      explanation: 'Odd numbers, add 2 each time'
    },
    {
      question: 'What comes next?\n10, 20, 30, 40, ?',
      answer: '50',
      wrong: ['45', '60', '55'],
      explanation: 'Add 10 each time (multiples of 10)'
    },
    {
      question: 'What comes next?\n1, 2, 4, 8, ?',
      answer: '16',
      wrong: ['12', '10', '14'],
      explanation: 'Double each time (×2)'
    },
    {
      question: 'What comes next?\n50, 45, 40, 35, ?',
      answer: '30',
      wrong: ['25', '32', '28'],
      explanation: 'Subtract 5 each time'
    },
    {
      question: 'What comes next?\n4, 8, 12, 16, ?',
      answer: '20',
      wrong: ['18', '24', '19'],
      explanation: 'Add 4 each time (multiples of 4)'
    },
    {
      question: 'What comes next?\n1, 1, 2, 3, 5, ?',
      answer: '8',
      wrong: ['6', '7', '9'],
      explanation: 'Fibonacci: add previous two numbers (1+1=2, 1+2=3, 2+3=5, 3+5=8)'
    },
    {
      question: 'What comes next?\n64, 32, 16, 8, ?',
      answer: '4',
      wrong: ['2', '6', '0'],
      explanation: 'Halve each time (÷2)'
    },
    {
      question: 'What comes next?\n7, 14, 21, 28, ?',
      answer: '35',
      wrong: ['32', '42', '30'],
      explanation: 'Add 7 each time (multiples of 7)'
    },
    {
      question: 'What comes next?\n1, 8, 27, 64, ?',
      answer: '125',
      wrong: ['100', '81', '216'],
      explanation: 'Cube numbers: 1³, 2³, 3³, 4³, 5³'
    },
    {
      question: 'What comes next?\n11, 22, 33, 44, ?',
      answer: '55',
      wrong: ['50', '66', '45'],
      explanation: 'Add 11 each time (multiples of 11)'
    },
    {
      question: 'What comes next?\n3, 9, 27, 81, ?',
      answer: '243',
      wrong: ['162', '216', '180'],
      explanation: 'Multiply by 3 each time (×3)'
    },
    {
      question: 'What comes next?\n2, 6, 12, 20, ?',
      answer: '30',
      wrong: ['24', '28', '26'],
      explanation: 'Add increasing even numbers: +4, +6, +8, +10'
    },
    {
      question: 'What comes next?\n1, 3, 6, 10, ?',
      answer: '15',
      wrong: ['13', '14', '12'],
      explanation: 'Triangular numbers: add 2, then 3, then 4, then 5'
    },
    {
      question: 'What comes next?\n80, 70, 61, 53, ?',
      answer: '46',
      wrong: ['45', '44', '48'],
      explanation: 'Subtract decreasing numbers: -10, -9, -8, -7'
    },
    {
      question: 'What comes next?\n6, 12, 18, 24, ?',
      answer: '30',
      wrong: ['28', '32', '26'],
      explanation: 'Add 6 each time (multiples of 6)'
    },
    {
      question: 'What comes next?\n1, 4, 7, 10, ?',
      answer: '13',
      wrong: ['12', '14', '11'],
      explanation: 'Add 3 each time'
    },
    {
      question: 'What comes next?\n5, 25, 125, 625, ?',
      answer: '3125',
      wrong: ['2500', '1250', '5000'],
      explanation: 'Multiply by 5 each time (×5)'
    },
    {
      question: 'What comes next?\n9, 18, 27, 36, ?',
      answer: '45',
      wrong: ['40', '54', '42'],
      explanation: 'Add 9 each time (multiples of 9)'
    },
    {
      question: 'What comes next?\n100, 50, 25, 12.5, ?',
      answer: '6.25',
      wrong: ['6', '5', '12'],
      explanation: 'Halve each time (÷2)'
    },
    {
      question: 'What comes next?\n2, 5, 11, 23, ?',
      answer: '47',
      wrong: ['35', '46', '48'],
      explanation: 'Double and add 1: (2×2)+1=5, (5×2)+1=11, (11×2)+1=23, (23×2)+1=47'
    },
    {
      question: 'What comes next?\n15, 12, 9, 6, ?',
      answer: '3',
      wrong: ['0', '4', '5'],
      explanation: 'Subtract 3 each time'
    },
    {
      question: 'What comes next?\n8, 16, 24, 32, ?',
      answer: '40',
      wrong: ['36', '48', '38'],
      explanation: 'Add 8 each time (multiples of 8)'
    },
    {
      question: 'What comes next?\n1, 5, 9, 13, ?',
      answer: '17',
      wrong: ['15', '16', '18'],
      explanation: 'Add 4 each time'
    },
    {
      question: 'What comes next?\n36, 30, 24, 18, ?',
      answer: '12',
      wrong: ['10', '14', '6'],
      explanation: 'Subtract 6 each time'
    },
    {
      question: 'What comes next?\n2, 3, 5, 7, ?',
      answer: '11',
      wrong: ['9', '10', '8'],
      explanation: 'Prime numbers in sequence'
    },
    {
      question: 'What comes next?\n144, 121, 100, 81, ?',
      answer: '64',
      wrong: ['49', '72', '60'],
      explanation: 'Square numbers decreasing: 12², 11², 10², 9², 8²'
    },
    {
      question: 'What comes next?\n3, 7, 11, 15, ?',
      answer: '19',
      wrong: ['17', '18', '20'],
      explanation: 'Add 4 each time'
    },
    {
      question: 'What comes next?\n20, 17, 14, 11, ?',
      answer: '8',
      wrong: ['7', '9', '10'],
      explanation: 'Subtract 3 each time'
    },
    {
      question: 'What comes next?\n4, 9, 16, 25, ?',
      answer: '36',
      wrong: ['30', '49', '32'],
      explanation: 'Square numbers: 2², 3², 4², 5², 6²'
    },
    {
      question: 'What comes next?\n12, 24, 36, 48, ?',
      answer: '60',
      wrong: ['50', '72', '54'],
      explanation: 'Add 12 each time (multiples of 12)'
    },
    {
      question: 'What comes next?\n0, 1, 1, 2, 3, 5, 8, ?',
      answer: '13',
      wrong: ['11', '10', '12'],
      explanation: 'Fibonacci sequence: each number is sum of previous two'
    },
    {
      question: 'What comes next?\n90, 81, 72, 63, ?',
      answer: '54',
      wrong: ['45', '55', '50'],
      explanation: 'Subtract 9 each time'
    },
    {
      question: 'What comes next?\n5, 11, 17, 23, ?',
      answer: '29',
      wrong: ['27', '28', '30'],
      explanation: 'Add 6 each time'
    },
    {
      question: 'What comes next?\n1000, 100, 10, 1, ?',
      answer: '0.1',
      wrong: ['0', '0.5', '10'],
      explanation: 'Divide by 10 each time (÷10)'
    },
    // GL Assessment Pack 4 VR - Number Sequences (Q73-78)
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
    },
    {
      question: 'If ▲ rotates 90° clockwise, what does it become?',
      answer: '▶',
      wrong: ['◀', '▼', '▲'],
      explanation: 'Up arrow rotates right'
    },
    {
      question: 'If ▼ rotates 180°, what does it become?',
      answer: '▲',
      wrong: ['▶', '◀', '▼'],
      explanation: 'Down arrow rotates to up'
    },
    {
      question: 'If ◀ rotates 180°, what does it become?',
      answer: '▶',
      wrong: ['◀', '▲', '▼'],
      explanation: 'Left arrow rotates to right'
    },
    {
      question: 'If ▶ rotates 90° anti-clockwise, what does it become?',
      answer: '▲',
      wrong: ['▼', '◀', '▶'],
      explanation: 'Right arrow rotates up'
    },
    {
      question: 'If ▲ rotates 90° anti-clockwise, what does it become?',
      answer: '◀',
      wrong: ['▶', '▼', '▲'],
      explanation: 'Up arrow rotates left'
    },
    {
      question: 'If ▼ rotates 90° clockwise, what does it become?',
      answer: '◀',
      wrong: ['▶', '▲', '▼'],
      explanation: 'Down arrow rotates left'
    },
    {
      question: 'If ◀ rotates 90° anti-clockwise, what does it become?',
      answer: '▼',
      wrong: ['▲', '▶', '◀'],
      explanation: 'Left arrow rotates down'
    },
    {
      question: 'If ▶ rotates 180°, what does it become?',
      answer: '◀',
      wrong: ['▶', '▲', '▼'],
      explanation: 'Right arrow rotates to left'
    },
    {
      question: 'If ▲ rotates 270° clockwise, what does it become?',
      answer: '◀',
      wrong: ['▶', '▼', '▲'],
      explanation: 'Up arrow rotates 270° clockwise to left'
    },
    {
      question: 'If ▼ rotates 270° clockwise, what does it become?',
      answer: '▶',
      wrong: ['◀', '▲', '▼'],
      explanation: 'Down arrow rotates 270° clockwise to right'
    },
    {
      question: 'If ◀ rotates 270° clockwise, what does it become?',
      answer: '▼',
      wrong: ['▲', '▶', '◀'],
      explanation: 'Left arrow rotates 270° clockwise to down'
    },
    {
      question: 'If ▶ rotates 270° clockwise, what does it become?',
      answer: '▲',
      wrong: ['▼', '◀', '▶'],
      explanation: 'Right arrow rotates 270° clockwise to up'
    },
    {
      question: 'If ▲ rotates 270° anti-clockwise, what does it become?',
      answer: '▶',
      wrong: ['◀', '▼', '▲'],
      explanation: 'Up arrow rotates 270° anti-clockwise to right'
    },
    {
      question: 'If ▼ rotates 270° anti-clockwise, what does it become?',
      answer: '◀',
      wrong: ['▶', '▲', '▼'],
      explanation: 'Down arrow rotates 270° anti-clockwise to left'
    },
    {
      question: 'If ◀ rotates 270° anti-clockwise, what does it become?',
      answer: '▲',
      wrong: ['▼', '▶', '◀'],
      explanation: 'Left arrow rotates 270° anti-clockwise to up'
    },
    {
      question: 'If ▶ rotates 270° anti-clockwise, what does it become?',
      answer: '▼',
      wrong: ['▲', '◀', '▶'],
      explanation: 'Right arrow rotates 270° anti-clockwise to down'
    },
    {
      question: 'If △ rotates 180°, what does it become?',
      answer: '▽',
      wrong: ['△', '◁', '▷'],
      explanation: 'Upward triangle rotates to downward triangle'
    },
    {
      question: 'If ▷ rotates 90° clockwise, what does it become?',
      answer: '▽',
      wrong: ['△', '◁', '▷'],
      explanation: 'Right-pointing triangle rotates down'
    },
    {
      question: 'If ◁ rotates 90° clockwise, what does it become?',
      answer: '△',
      wrong: ['▽', '▷', '◁'],
      explanation: 'Left-pointing triangle rotates up'
    },
    {
      question: 'If ▽ rotates 90° clockwise, what does it become?',
      answer: '◁',
      wrong: ['▷', '△', '▽'],
      explanation: 'Downward triangle rotates left'
    },
    {
      question: 'If △ rotates 90° clockwise, what does it become?',
      answer: '▷',
      wrong: ['◁', '▽', '△'],
      explanation: 'Upward triangle rotates right'
    },
    {
      question: 'If ▷ rotates 180°, what does it become?',
      answer: '◁',
      wrong: ['▷', '△', '▽'],
      explanation: 'Right-pointing triangle rotates to left-pointing'
    },
    {
      question: 'If ◁ rotates 180°, what does it become?',
      answer: '▷',
      wrong: ['◁', '△', '▽'],
      explanation: 'Left-pointing triangle rotates to right-pointing'
    },
    {
      question: 'If ▽ rotates 180°, what does it become?',
      answer: '△',
      wrong: ['▽', '◁', '▷'],
      explanation: 'Downward triangle rotates to upward'
    },
    {
      question: 'If △ rotates 90° anti-clockwise, what does it become?',
      answer: '◁',
      wrong: ['▷', '▽', '△'],
      explanation: 'Upward triangle rotates left'
    },
    {
      question: 'If ▽ rotates 90° anti-clockwise, what does it become?',
      answer: '▷',
      wrong: ['◁', '△', '▽'],
      explanation: 'Downward triangle rotates right'
    },
    {
      question: 'If ◁ rotates 90° anti-clockwise, what does it become?',
      answer: '▽',
      wrong: ['△', '▷', '◁'],
      explanation: 'Left-pointing triangle rotates down'
    },
    {
      question: 'If ▷ rotates 90° anti-clockwise, what does it become?',
      answer: '△',
      wrong: ['▽', '◁', '▷'],
      explanation: 'Right-pointing triangle rotates up'
    },
    {
      question: 'If ▲ rotates twice by 90° clockwise each time, what does it become?',
      answer: '▼',
      wrong: ['▶', '◀', '▲'],
      explanation: 'Two 90° rotations = 180°, up becomes down'
    },
    {
      question: 'If ▶ rotates twice by 90° clockwise each time, what does it become?',
      answer: '◀',
      wrong: ['▶', '▲', '▼'],
      explanation: 'Two 90° rotations = 180°, right becomes left'
    },
    {
      question: 'If ◀ rotates three times by 90° clockwise each time, what does it become?',
      answer: '▼',
      wrong: ['▲', '▶', '◀'],
      explanation: 'Three 90° rotations = 270°, left becomes down'
    },
    {
      question: 'If ▼ rotates three times by 90° anti-clockwise each time, what does it become?',
      answer: '◀',
      wrong: ['▶', '▲', '▼'],
      explanation: 'Three 90° anti-clockwise rotations = 270°, down becomes left'
    },
    {
      question: 'If ▲ rotates four times by 90° clockwise each time, what does it become?',
      answer: '▲',
      wrong: ['▼', '▶', '◀'],
      explanation: 'Four 90° rotations = 360°, returns to original position'
    },
    {
      question: 'If ▶ rotates 360°, what does it become?',
      answer: '▶',
      wrong: ['◀', '▲', '▼'],
      explanation: 'Full rotation returns to original position'
    },
    {
      question: 'If △ rotates 270° clockwise, what does it become?',
      answer: '◁',
      wrong: ['▷', '▽', '△'],
      explanation: 'Upward triangle rotates 270° clockwise to left'
    },
    {
      question: 'If ▽ rotates 270° anti-clockwise, what does it become?',
      answer: '◁',
      wrong: ['▷', '△', '▽'],
      explanation: 'Downward triangle rotates 270° anti-clockwise to left'
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
    },
    {
      question: 'Complete the pattern:\n[● ○ ●]\n[○ ● ○]\n[● ○ ?]',
      answer: '●',
      wrong: ['○', '□', '■'],
      explanation: 'Alternating checkerboard pattern with circles'
    },
    {
      question: 'Which shape completes the pattern?\n[△ □ ○]\n[□ ○ △]\n[○ △ ?]',
      answer: '□',
      wrong: ['△', '○', '●'],
      explanation: 'Each row has the three shapes in rotating order'
    },
    {
      question: 'Complete the grid:\n[■ ■ □]\n[■ □ □]\n[□ □ ?]',
      answer: '□',
      wrong: ['■', '●', '○'],
      explanation: 'Pattern moves from filled to empty diagonally'
    },
    {
      question: 'What fits in the missing space?\n[○ △ □]\n[△ □ ○]\n[? ○ △]',
      answer: '□',
      wrong: ['○', '△', '●'],
      explanation: 'Each row contains all three shapes in different order'
    },
    {
      question: 'Complete the pattern:\n[★ ★ ★]\n[☆ ☆ ☆]\n[★ ★ ?]',
      answer: '★',
      wrong: ['☆', '●', '○'],
      explanation: 'Pattern alternates filled stars and empty stars by row'
    },
    {
      question: 'Which shape completes?\n[● ● ●]\n[● ○ ●]\n[● ● ?]',
      answer: '●',
      wrong: ['○', '□', '△'],
      explanation: 'All filled circles except center of middle row'
    },
    {
      question: 'Complete the grid:\n[△ △ ▽]\n[△ ▽ ▽]\n[▽ ▽ ?]',
      answer: '▽',
      wrong: ['△', '○', '□'],
      explanation: 'Upward triangles decrease, downward triangles increase'
    },
    {
      question: 'What fits in the missing space?\n[■ □ □]\n[□ ■ □]\n[□ □ ?]',
      answer: '■',
      wrong: ['□', '●', '○'],
      explanation: 'Diagonal line of filled squares from top-left to bottom-right'
    },
    {
      question: 'Complete the pattern:\n[○ ● ○]\n[● ○ ●]\n[○ ? ○]',
      answer: '●',
      wrong: ['○', '□', '■'],
      explanation: 'Alternating checkerboard of filled and empty circles'
    },
    {
      question: 'Which shape completes?\n[▲ ▲ ▲]\n[▶ ▶ ▶]\n[▼ ▼ ?]',
      answer: '▼',
      wrong: ['▲', '▶', '◀'],
      explanation: 'Each row contains the same arrow direction'
    },
    {
      question: 'Complete the grid:\n[★ ○ △]\n[○ △ ★]\n[△ ★ ?]',
      answer: '○',
      wrong: ['★', '△', '□'],
      explanation: 'Each row and column contains all three shapes once'
    },
    {
      question: 'What fits in the missing space?\n[◆ ◇ ◆]\n[◇ ◆ ◇]\n[◆ ◇ ?]',
      answer: '◆',
      wrong: ['◇', '●', '○'],
      explanation: 'Checkerboard pattern with filled and empty diamonds'
    },
    {
      question: 'Complete the pattern:\n[□ □ □]\n[■ □ □]\n[■ ■ ?]',
      answer: '□',
      wrong: ['■', '○', '●'],
      explanation: 'Filled squares increase diagonally from bottom-left'
    },
    {
      question: 'Which shape completes?\n[● ○]\n[○ ●]\n[● ?]',
      answer: '○',
      wrong: ['●', '□', '■'],
      explanation: 'Alternating diagonal pattern'
    },
    {
      question: 'Complete the grid:\n[▲ ▶]\n[◀ ▼]\n[▲ ?]',
      answer: '▶',
      wrong: ['▲', '▼', '◀'],
      explanation: 'Arrows rotate clockwise, pattern repeats'
    },
    {
      question: 'What fits in the missing space?\n[○ ○ ●]\n[○ ● ●]\n[● ● ?]',
      answer: '●',
      wrong: ['○', '□', '■'],
      explanation: 'Pattern transitions from empty to filled circles diagonally'
    },
    {
      question: 'Complete the pattern:\n[■ ○ △]\n[△ ■ ○]\n[○ △ ?]',
      answer: '■',
      wrong: ['○', '△', '□'],
      explanation: 'Latin square: each symbol appears once per row and column'
    },
    {
      question: 'Which shape completes?\n[★ ☆]\n[☆ ★]\n[★ ?]',
      answer: '☆',
      wrong: ['★', '●', '○'],
      explanation: 'Alternating diagonal pattern with stars'
    },
    {
      question: 'Complete the grid:\n[● ● ●]\n[○ ● ○]\n[○ ○ ?]',
      answer: '○',
      wrong: ['●', '□', '△'],
      explanation: 'Triangle shape of filled circles at top'
    },
    {
      question: 'What fits in the missing space?\n[△ △ △]\n[○ ○ ○]\n[□ □ ?]',
      answer: '□',
      wrong: ['△', '○', '●'],
      explanation: 'Three different shapes, one per row'
    },
    {
      question: 'Complete the pattern:\n[■ □ ■ □]\n[□ ■ □ ■]\n[■ □ ■ ?]',
      answer: '□',
      wrong: ['■', '●', '○'],
      explanation: 'Extended checkerboard pattern'
    },
    {
      question: 'Which shape completes?\n[▶ ▶ ▶]\n[▼ ▼ ▼]\n[◀ ◀ ?]',
      answer: '◀',
      wrong: ['▶', '▼', '▲'],
      explanation: 'Each row contains same arrow direction'
    },
    {
      question: 'Complete the grid:\n[○ △]\n[△ □]\n[□ ?]',
      answer: '○',
      wrong: ['△', '□', '●'],
      explanation: 'Diagonal pattern cycles through three shapes'
    },
    {
      question: 'What fits in the missing space?\n[● ○ ○]\n[○ ○ ○]\n[○ ○ ?]',
      answer: '○',
      wrong: ['●', '□', '■'],
      explanation: 'Only top-left is filled, all others empty'
    },
    {
      question: 'Complete the pattern:\n[★ ★ ☆]\n[★ ☆ ☆]\n[☆ ☆ ?]',
      answer: '☆',
      wrong: ['★', '●', '○'],
      explanation: 'Filled stars decrease diagonally, empty stars increase'
    },
    {
      question: 'Which shape completes?\n[■ ○ △ □]\n[○ △ □ ■]\n[△ □ ■ ?]',
      answer: '○',
      wrong: ['■', '△', '□'],
      explanation: 'Each row shifts pattern one position to the left'
    },
    {
      question: 'Complete the grid:\n[▲ ▼ ▲]\n[▼ ▲ ▼]\n[▲ ▼ ?]',
      answer: '▲',
      wrong: ['▼', '▶', '◀'],
      explanation: 'Checkerboard pattern with up and down triangles'
    },
    {
      question: 'What fits in the missing space?\n[◆ ◇ ◆ ◇]\n[◇ ◆ ◇ ◆]\n[◆ ◇ ◆ ?]',
      answer: '◇',
      wrong: ['◆', '●', '○'],
      explanation: 'Extended checkerboard with diamonds'
    },
    {
      question: 'Complete the pattern:\n[● ● ○]\n[● ○ ○]\n[○ ○ ?]',
      answer: '○',
      wrong: ['●', '□', '■'],
      explanation: 'Filled circles decrease diagonally from top-left'
    },
    {
      question: 'Which shape completes?\n[□ ○ □]\n[○ □ ○]\n[□ ○ ?]',
      answer: '□',
      wrong: ['○', '●', '■'],
      explanation: 'Alternating checkerboard pattern'
    },
    {
      question: 'Complete the grid:\n[★ △ ○]\n[△ ○ ★]\n[○ ★ ?]',
      answer: '△',
      wrong: ['★', '○', '□'],
      explanation: 'Latin square: each shape once per row and column'
    },
    {
      question: 'What fits in the missing space?\n[■ ■ ■]\n[■ □ ■]\n[■ ■ ?]',
      answer: '■',
      wrong: ['□', '●', '○'],
      explanation: 'All filled except center of middle row'
    },
    {
      question: 'Complete the pattern:\n[▶ ▼ ◀]\n[▼ ◀ ▲]\n[◀ ▲ ?]',
      answer: '▶',
      wrong: ['▼', '◀', '▲'],
      explanation: 'Arrows rotate clockwise in each position'
    },
    {
      question: 'Which shape completes?\n[○ ● ○ ●]\n[● ○ ● ○]\n[○ ● ○ ?]',
      answer: '●',
      wrong: ['○', '□', '■'],
      explanation: 'Extended checkerboard pattern with circles'
    },
    {
      question: 'Complete the grid:\n[△ △ △ △]\n[○ ○ ○ ○]\n[□ □ □ ?]',
      answer: '□',
      wrong: ['△', '○', '●'],
      explanation: 'Each row contains same shape repeated'
    },
    {
      question: 'What fits in the missing space?\n[■ □ □ □]\n[□ ■ □ □]\n[□ □ ■ ?]',
      answer: '□',
      wrong: ['■', '●', '○'],
      explanation: 'Diagonal line of filled squares from top-left'
    },
    {
      question: 'Complete the pattern:\n[● ○ ● ○]\n[○ ● ○ ●]\n[● ○ ● ?]',
      answer: '○',
      wrong: ['●', '□', '■'],
      explanation: 'Extended checkerboard with circles'
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
    },
    {
      question: 'What is the mirror image of:\n456',
      answer: '654',
      wrong: ['456', '546', '465'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nXYZ',
      answer: 'ZYX',
      wrong: ['XYZ', 'YZX', 'XZY'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ◀?',
      answer: '▶',
      wrong: ['▲', '▼', '◀'],
      explanation: 'Left arrow mirrors to right arrow'
    },
    {
      question: 'What is the mirror image of:\n789',
      answer: '987',
      wrong: ['789', '879', '798'],
      explanation: 'Numbers flip horizontally'
    },
    {
      question: 'What is the mirror image of:\nDOG',
      answer: 'GOD',
      wrong: ['DOG', 'ODG', 'DGO'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ▲?',
      answer: '▲',
      wrong: ['▼', '◀', '▶'],
      explanation: 'Up arrow is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n12',
      answer: '21',
      wrong: ['12', '11', '22'],
      explanation: 'Two digits reverse order'
    },
    {
      question: 'What is the mirror image of:\nCAT',
      answer: 'TAC',
      wrong: ['CAT', 'ACT', 'CTA'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ▼?',
      answer: '▼',
      wrong: ['▲', '◀', '▶'],
      explanation: 'Down arrow is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n2468',
      answer: '8642',
      wrong: ['2468', '4682', '6428'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nSTAR',
      answer: 'RATS',
      wrong: ['STAR', 'TARS', 'STRA'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ◁?',
      answer: '▷',
      wrong: ['△', '▽', '◁'],
      explanation: 'Left-pointing triangle mirrors to right-pointing'
    },
    {
      question: 'What is the mirror image of:\n135',
      answer: '531',
      wrong: ['135', '315', '153'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nBOOK',
      answer: 'KOOB',
      wrong: ['BOOK', 'OBKO', 'BOKO'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ▷?',
      answer: '◁',
      wrong: ['△', '▽', '▷'],
      explanation: 'Right-pointing triangle mirrors to left-pointing'
    },
    {
      question: 'What is the mirror image of:\n987',
      answer: '789',
      wrong: ['987', '879', '798'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nTREE',
      answer: 'EERT',
      wrong: ['TREE', 'ETRE', 'TERE'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ○?',
      answer: '○',
      wrong: ['●', '◯', '◌'],
      explanation: 'Circle is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n1357',
      answer: '7531',
      wrong: ['1357', '3571', '5731'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nHOME',
      answer: 'EMOH',
      wrong: ['HOME', 'OMEH', 'MEHO'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of □?',
      answer: '□',
      wrong: ['■', '▢', '▣'],
      explanation: 'Square is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n2468',
      answer: '8642',
      wrong: ['2468', '6842', '4862'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nSUNNY',
      answer: 'YNNUS',
      wrong: ['SUNNY', 'NSUNY', 'UNSNY'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of △?',
      answer: '△',
      wrong: ['▽', '◁', '▷'],
      explanation: 'Up triangle is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n951',
      answer: '159',
      wrong: ['951', '591', '195'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nFISH',
      answer: 'HSIF',
      wrong: ['FISH', 'ISHF', 'SFIH'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ▽?',
      answer: '▽',
      wrong: ['△', '◁', '▷'],
      explanation: 'Down triangle is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n7531',
      answer: '1357',
      wrong: ['7531', '3157', '5371'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nMOON',
      answer: 'NOOM',
      wrong: ['MOON', 'OMNO', 'MNOO'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ●?',
      answer: '●',
      wrong: ['○', '◉', '◯'],
      explanation: 'Filled circle is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n369',
      answer: '963',
      wrong: ['369', '639', '396'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nBIRD',
      answer: 'DRIB',
      wrong: ['BIRD', 'IRBD', 'RBID'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ★?',
      answer: '★',
      wrong: ['☆', '✦', '✧'],
      explanation: 'Star is symmetrical, mirrors to itself'
    },
    {
      question: 'What is the mirror image of:\n8642',
      answer: '2468',
      wrong: ['8642', '4628', '6482'],
      explanation: 'Numbers reverse order horizontally'
    },
    {
      question: 'What is the mirror image of:\nRAIN',
      answer: 'NIAR',
      wrong: ['RAIN', 'AIRN', 'RIAN'],
      explanation: 'Letters reverse order horizontally'
    },
    {
      question: 'Which is the mirror image of ■?',
      answer: '■',
      wrong: ['□', '▪', '▫'],
      explanation: 'Filled square is symmetrical, mirrors to itself'
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
