export type MultipleChoiceQuestion = {
  question: string
  answer: string
  wrong: string[]
}

// GL Variety Pack Test 5 - Maths
// Note: Many questions overlap with Pack 4. This file contains unique questions from Pack 5.
export const glPack5MathsQuestions: MultipleChoiceQuestion[] = [
  // Q2 - Place value
  {
    question: 'Last year, the sales for a shopping centre were sixty-nine million, ninety-two thousand and forty-five pounds.\nWhat is this in figures?',
    answer: '69,092,045',
    wrong: ['69,920,045', '6,992,045', '69,092,450']
  },
  // Q3 - Temperature reading
  {
    question: 'A dial shows the temperature inside a freezer.\nThe pointer is between -30 and -10, closer to -20.\nWhat is the temperature in the freezer?',
    answer: '-20°C',
    wrong: ['-10°C', '-30°C', '20°C']
  },
  // Q5 - Bar chart interpretation
  {
    question: 'Some pupils recorded different sorts of birds at a bird table.\nBlackbird: 8, Pigeon: 3, Finch: 5, Sparrow: 4, Thrush: 3.\nHow many more finches than thrushes did they see?',
    answer: '2',
    wrong: ['3', '5', '8']
  },
  // Q10 - Train timetable
  {
    question: 'London Paddington to Bath Spa timetable:\nPaddington: 0527, 0630, 0645, 0700, 0715\nDidcot Parkway: -, 0712, -, 0742, 0756\nMaya wants to arrive in Didcot Parkway by half past seven in the morning.\nWhat time must she leave London Paddington?',
    answer: '0630',
    wrong: ['0527', '0645', '0700']
  },
  // Q12 - Venn diagram (shapes)
  {
    question: 'A Venn diagram has three circles: Triangle, Right-angled, and Equal sides.\nWhich shape goes in the region that is Triangle AND Equal sides but NOT Right-angled?',
    answer: 'Equilateral triangle',
    wrong: ['Right-angled triangle', 'Isosceles right triangle', 'Scalene triangle']
  },
  // Q14 - Triangle dotty paper angles
  {
    question: 'A shape is drawn on triangle dotty paper.\nIt has vertices at points A, B, C, D, and E.\nOne of the angles is 60°. Which one is it?',
    answer: 'C',
    wrong: ['A', 'B', 'D']
  },
  // Q18 - Shapes on triangle dotty grid
  {
    question: 'Four shapes A, B, C, and D are drawn on a triangle dotty grid.\nWhich two shapes have the same area?',
    answer: 'A and C',
    wrong: ['A and B', 'B and C', 'C and D']
  },
  // Q22 - 3D building views
  {
    question: 'This is the front view of a large building (L-shaped when seen from front).\nWhich is the rear view of the building?',
    answer: 'B',
    wrong: ['A', 'C', 'D']
  },
  // Q24 - Probability with tiles
  {
    question: 'Sarah has black and white square and circle tiles:\nBlack squares: 4, Black circles: 6\nWhite squares: 7, White circles: 5\nShe picks one tile without looking. Which statement is true?',
    answer: 'She is equally likely to pick a square tile as a circular tile',
    wrong: ['She is more likely to pick a black circle than any other type', 'She is less likely to pick a white circle than any other type', 'She is more likely to pick a black tile than a white tile']
  },
  // Q28 - Line graph range
  {
    question: 'Five pupils played a game four times. The graph shows their scores.\nAnnie: 7,8,10,8  Ben: 6,5,7,8  Cal: 6,7,6,6  Donna: 3,5,4,4  Esther: 3,4,3,4\nWhich pupil\'s scores had the greatest range?',
    answer: 'Ben',
    wrong: ['Annie', 'Cal', 'Donna']
  },
  // Q30 - Walking laps perimeter
  {
    question: 'A playing field is a rectangle 150m long by 90m wide.\nC and F are the middle points of the long sides.\nJuniors walk around rectangle ABDE (full field).\nInfants walk around rectangle ABCF (half field).\nHow much further do the juniors walk than infants for each lap?',
    answer: '150m',
    wrong: ['75m', '240m', '300m']
  },
  // Q31 - Number line
  {
    question: 'A number line shows 47 on the left and 48 on the right with 8 equal divisions.\nAn arrow points to the 6th mark from 47.\nWhat number is the arrow pointing to?',
    answer: '47.75',
    wrong: ['47.6', '47.8', '47.5']
  },
  // Q32 - Graph reading (flour conversion)
  {
    question: 'A graph converts cups of flour to grams.\nMelissa and Bradley need 2 cups of flour for every egg.\nIf they use 5 eggs, how many grams of flour do they need?\n(Graph shows: 2 cups = 160g, 5 cups = 400g)',
    answer: '800g',
    wrong: ['400g', '500g', '1000g']
  },
  // Q34 - Triangle inequality
  {
    question: 'Nina has sticks with lengths 2cm, 3cm, 5cm, 6cm, and 8cm.\nShe can lay three sticks end to end to make triangles.\nWhich set of three sticks can Nina use to make a triangle?',
    answer: '3cm, 5cm, 6cm',
    wrong: ['2cm, 3cm, 5cm', '2cm, 3cm, 6cm', '3cm, 5cm, 8cm']
  },
  // Q36 - Pictogram coins
  {
    question: 'Jamie sorted coins by type. Each symbol = 5 coins.\n1p: 7 symbols (35 coins), 2p: 7 symbols (35 coins)\n5p: 4 symbols (20 coins), 10p: 7 symbols + partial (37 coins)\n20p: 3 symbols + partial (17 coins), £1: 1.5 symbols (7-8 coins)\nWhich two groups of coins had the same total value?',
    answer: '10p and 20p',
    wrong: ['1p and 2p', '2p and 5p', '5p and 10p']
  },
  // Q40 - Mean calculation
  {
    question: 'Lee collected seashells on holiday:\nMonday: 4, Tuesday: 5, Wednesday: 3, Thursday: 6, Friday: 6\nWhat is the mean number of seashells he collected?',
    answer: '4.8',
    wrong: ['4', '5', '6']
  },
  // Q42 - Rotation coordinates
  {
    question: 'Rectangle WXYZ has corners at W(4,5), X(8,5), Y(8,7), Z(4,7).\nThe rectangle is rotated 90° anticlockwise about the point (3,3).\nWhat will be the new coordinates of point X?',
    answer: '(5,8)',
    wrong: ['(3,5)', '(7,1)', '(0,3)']
  },
  // Q44 - Misleading graphs
  {
    question: 'An ice cream advertisement shows a bar chart claiming "People eat more Glasso ice creams than any other brand!"\nFlavo: 1 million, Fruto: 4 million, Creamo: 3 million, Glasso: 5 million\nWhy is the chart misleading?',
    answer: 'The values along the vertical axis are unevenly spaced',
    wrong: ['The ice cream cones are unevenly spaced along the horizontal axis', 'The area for Glasso is more than five times the area for Flavo', 'It does not show how many ice lollies people eat']
  },
  // Q48 - Pie chart mode
  {
    question: 'Deepak had a spelling test every week and kept a record of his marks.\nHe drew a pie chart showing: 6 marks (smallest), 7 marks (medium), 8 marks (medium), 9 marks (small), 10 marks (small).\nWhat was the mode of his marks?',
    answer: '7',
    wrong: ['6', '8', '10']
  }
]

// Questions that are identical or nearly identical to Pack 4 (re-exported for completeness)
export const glPack5SharedWithPack4: MultipleChoiceQuestion[] = [
  {
    question: 'Karen, Amrit and Sam are going to share two pizzas equally between them.\nWhat fraction of a whole pizza should each of them have?',
    answer: '⅔',
    wrong: ['½', '¼', '⅓']
  },
  {
    question: 'A robot moves from point (-3, 3) to point (5, -2) along the lines of a square grid.\nWhich describes its route?',
    answer: '8 steps East and 5 steps South',
    wrong: ['2 steps West and 1 step South', '5 steps East and 2 steps South', '8 steps West and 5 steps North']
  },
  {
    question: 'What number should go in the box?\n1680 + 1680 + 1680 + 1680 + 1680 = ? × 10',
    answer: '840',
    wrong: ['84', '336', '420']
  },
  {
    question: 'Which of these digital clocks shows a quarter to four in the afternoon?',
    answer: '15:45',
    wrong: ['03:45', '04:45', '16:45']
  },
  {
    question: 'What is the cost of eight mugs at £1.99 each?',
    answer: '£15.92',
    wrong: ['£15.82', '£16.92', '£14.92']
  },
  {
    question: 'What is 1 - 0.11?',
    answer: '0.89',
    wrong: ['0.99', '0.09', '0.91']
  },
  {
    question: 'A repeating pattern is made of squares, triangles and circles.\nThe pattern repeats after five shapes.\nWhat fraction of all the shapes are squares?',
    answer: '⅖',
    wrong: ['⅓', '½', '⅕']
  },
  {
    question: 'Five friends were all born in 1994. Their birthdays are:\nKieran: 3rd July, Haq: 31st May, Harriet: 16th June, Lisa: 10th May, Jake: 28th July.\nWho is the oldest?',
    answer: 'Lisa',
    wrong: ['Haq', 'Kieran', 'Jake']
  },
  {
    question: 'Akira wants to calculate: two teas (99p), one coffee (99p), two sandwiches (£1.99), three apples (49p).\nWhich calculation is correct?',
    answer: '3 × £1 + 2 × £2 + 3 × 50p - 4p',
    wrong: ['3 × £1 + 2 × £2 + 3 × 50p + 4p', '3 × £1 + 2 × £2 + 3 × 50p + 8p', '3 × £1 + 2 × £2 + 3 × 50p - 8p']
  },
  {
    question: 'Which of these statements is correct?\nA: 4⅓ < 4.5  B: 4½ < 4.5  C: 4⅓ > 4.5  D: 4½ > 4.5',
    answer: 'A: 4⅓ < 4.5',
    wrong: ['B: 4½ < 4.5', 'C: 4⅓ > 4.5', 'D: 4½ > 4.5']
  },
  {
    question: 'Ten pupils picked blackberries. The table shows:\nLess than ½ kilo: 2 pupils\n½ to 1 kilo: 0 pupils\n1 to 1½ kilos: 4 pupils\n1½ to 2 kilos: 3 pupils\n2 to 2½ kilos: 1 pupil\nHow many pupils picked at least 1 kilo?',
    answer: '8',
    wrong: ['4', '6', '10']
  },
  {
    question: '37 × 497 + 63 × 497 = ?',
    answer: '49,700',
    wrong: ['9,443', '44,730', '54,670']
  },
  {
    question: 'Josh started from a number between 1 and 5, and counted on in steps of 6.\nHe reached the number 22. What number did he start from?',
    answer: '4',
    wrong: ['1', '2', '3']
  },
  {
    question: 'There are 816 pupils at Southfields school. There are 28 more girls than boys.\nHow many girls are there in the school?',
    answer: '422',
    wrong: ['394', '450', '408']
  },
  {
    question: 'Work out the name of this 2D shape from the clues:\n1. It has four sides\n2. It has four right angles\n3. The diagonals do NOT cross at right angles',
    answer: 'rectangle',
    wrong: ['square', 'rhombus', 'kite']
  },
  {
    question: 'A serving of pasta weighs 75 grams. 100g contains 14.4g of protein.\nHow many grams of protein are there in a serving?',
    answer: '10.8g',
    wrong: ['9.6g', '11.2g', '14.4g']
  },
  {
    question: 'The sum of the first four square numbers is 30.\nWhat is the sum of the first five square numbers?',
    answer: '55',
    wrong: ['35', '45', '65']
  },
  {
    question: '789 × 36 = 28,404. What is 18 × 789?',
    answer: '14,202',
    wrong: ['7,101', '14,204', '15,774']
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
    question: 'The numbers on opposite faces of a number cube always add up to 7.\nWhich net will fold up to make a valid number cube?',
    answer: 'B',
    wrong: ['A', 'C', 'D']
  },
  {
    question: 'Pat draws a square with corners at (5,5), (7,5), (7,7) and (5,7).\nWhich point is inside Pat\'s square?',
    answer: '(6,6)',
    wrong: ['(4,4)', '(6,8)', '(8,8)']
  },
  {
    question: 'A bicycle wheel has a circumference of 150cm.\nHow many complete revolutions must the wheel make for Fran to travel 1.5km?',
    answer: '1000',
    wrong: ['100', '500', '1500']
  },
  {
    question: 'N → ÷4 → +1 → ×2 → ?\nWhich of these is the number that Nilesh ended up with?',
    answer: 'N/2 + 2',
    wrong: ['N/8 + 2', 'N/4 + 2', 'N/4 + 1']
  },
  {
    question: 'A tin of paint costs £6 and will cover 5 square metres of wall.\nWhat is the cost of paint tins for a wall 4.5m long and 3m high?',
    answer: '£18',
    wrong: ['£12', '£24', '£30']
  }
]
