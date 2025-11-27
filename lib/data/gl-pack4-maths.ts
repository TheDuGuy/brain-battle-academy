export type MultipleChoiceQuestion = {
  question: string
  answer: string
  wrong: string[]
}

export const glPack4MathsQuestions: MultipleChoiceQuestion[] = [
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

