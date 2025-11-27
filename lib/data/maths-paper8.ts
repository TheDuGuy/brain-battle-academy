export type MultipleChoiceQuestion = {
  question: string
  answer: string
  wrong: string[]
}

// GL Assessment Maths Multiple-Choice Familiarisation Test 8
export const mathsPaper8Questions: MultipleChoiceQuestion[] = [
  // Q1 - Reflection/quadrilateral
  {
    question: 'Tom has drawn a triangle. He reflects it in the mirror line.\nHe ends up with a quadrilateral.\nWhat type of quadrilateral is it?',
    answer: 'kite',
    wrong: ['parallelogram', 'trapezium', 'rhombus', 'rectangle']
  },
  // Q2 - Money counting
  {
    question: 'Amrit has this money: two £10 notes, two 10p coins, one 2p coin, and two 1p coins.\nWhat is the total value of the money?',
    answer: '£20.04',
    wrong: ['£2.4', '£2.04', '£2.40', '£20.4']
  },
  // Q3 - Microwave cooking time
  {
    question: 'A packet of sprouts has microwave instructions:\n650 watt (B): 8 mins cook, 1 min stand\n750 watt (D): 6 mins cook, 1 min stand\n850 watt (E): 4 mins cook, 1 min stand\nAlex has a Category D microwave oven.\nHow long will it take him to cook the sprouts and leave them to stand?',
    answer: '7 minutes',
    wrong: ['5 minutes', '8 minutes', '9 minutes', '6 minutes']
  },
  // Q4 - Fractions
  {
    question: 'How many twelfths are there in 3?',
    answer: '36',
    wrong: ['3', '4', '9', '12']
  },
  // Q5 - Pattern with missing tiles
  {
    question: 'This pattern is made with black and white tiles.\nThere is a gap where some of the tiles are missing.\nWhich of these is the missing set of tiles?',
    answer: 'C',
    wrong: ['A', 'B', 'D', 'E']
  },
  // Q6 - Menu calculation
  {
    question: 'Menu:\nJacket potato + filling: £1.50\nSoup + roll & butter: £1.25\nQuiche + chips: £4.00\nDrinks: 50p\nA family chooses from the menu: 2 jacket potatoes, 3 soups and 3 drinks.\nThey pay with a £20 note.\nHow much change should they receive?',
    answer: '£11.75',
    wrong: ['£8.25', '£10.75', '£12.25', '£11.25']
  },
  // Q7 - Shape sorting diagram
  {
    question: 'Look at this sorting diagram:\n| | Sides equal | Sides not equal |\n| At least one right angle | square | rectangle |\n| No right angles | [shaded] | ? |\nWhich of these shapes should go in the shaded cell on the sorting diagram?',
    answer: 'parallelogram',
    wrong: ['square', 'rectangle', 'equilateral triangle', 'right-angled triangle']
  },
  // Q8 - Factors
  {
    question: '36  12  48  24  60\nWhich factor below does not go exactly into all of the numbers above?',
    answer: '8',
    wrong: ['6', '4', '3', '2']
  },
  // Q9 - Mass reading
  {
    question: 'A scale shows potatoes weighing 2.005 KG.\nHow much do the potatoes weigh?',
    answer: 'two kilograms and five grams',
    wrong: ['two thousand and five kilograms', 'two and a half kilograms', 'two kilograms and five hundred grams', 'two kilograms and fifty grams']
  },
  // Q10 - Rounding
  {
    question: 'Which of these is 1200?',
    answer: '1196 rounded to the nearest 10',
    wrong: ['1149 rounded to the nearest 100', '1207 rounded to the nearest 10', '1274 rounded to the nearest 100', '12327 rounded to the nearest 100']
  },
  // Q11 - Plant catalogue
  {
    question: 'A plant catalogue offers:\nAster: 1.5 metres, 1 for £4.99 or 3 for £12\nFoxglove: 1 metre, 1 for £4.99 or 3 for £12\nGeranium: 30 centimetres, 1 for £5.99 or 3 for £15\nHelenium: 1 metre, 1 for £4.99 or 3 for £12\nIris: 1 metre, 1 for £5.99 or 3 for £15\nWhich two kinds of plant have the same price and will grow to the same height?',
    answer: 'foxglove and helenium',
    wrong: ['aster and geranium', 'aster and helenium', 'foxglove and iris', 'geranium and iris']
  },
  // Q12 - Proportion/weight
  {
    question: 'Duncan has 20 biscuits.\nThey weigh 300 grams.\nDuncan eats three of the biscuits.\nHow many grams of biscuits does Duncan eat?',
    answer: '45',
    wrong: ['15', '30', '60', '100']
  },
  // Q13 - Perimeter of star pattern
  {
    question: 'Ben has a lot of regular six-pointed stars.\nThe edges of the stars are 3 centimetres long.\nHe fits six of the stars together to make a pattern.\nWhat is the perimeter of the hole in the middle of Ben\'s pattern?',
    answer: '54 centimetres',
    wrong: ['18 centimetres', '36 centimetres', '72 centimetres', '108 centimetres']
  },
  // Q14 - Division with money
  {
    question: 'Sandwiches cost £1.75p each.\nAlisha has £5.\nWhat is the greatest number of sandwiches that Alisha can buy with £5?',
    answer: '2',
    wrong: ['1', '3', '4', '5']
  },
  // Q15 - Bar chart interpretation
  {
    question: 'There are 32 pupils in Class 6M.\nOne week Mrs Moore was looking at attendance in the class.\nThe bar chart shows the number of pupils who were absent each day.\nMon: 1, Tue: 4, Wed: 3, Thu: 5, Fri: 3\nWhat was the greatest number of pupils present on any one day?',
    answer: '31',
    wrong: ['27', '28', '29', '32']
  },
  // Q16 - Pattern with cans
  {
    question: 'There are ten cans in this stack.\nThe stack is four cans high (pyramid arrangement: 1+2+3+4).\nHow many cans would there be in a stack like this that was eight cans high?',
    answer: '36',
    wrong: ['16', '20', '28', '64']
  },
  // Q17 - Pentagon comparison
  {
    question: 'Look at the six pentagons (numbered 1-6, each with different orientations and angles).\nWhich two of the pentagons are exactly the same shape?',
    answer: '1 and 6',
    wrong: ['2 and 1', '2 and 5', '4 and 3', '6 and 5']
  },
  // Q18 - Price reduction
  {
    question: 'The original price of a backpack was £81.\nDuring a sale, the price of the backpack was reduced by £9 each week.\nAfter how many weeks was the price of the backpack less than half of the original price?',
    answer: '5',
    wrong: ['3', '4', '6', '9']
  },
  // Q19 - Pie chart interpretation
  {
    question: 'Each pupil in a reading club read one of four books.\nThe pie chart shows the proportion of pupils who read each book:\nThe Jungle Book, The Secret Garden, Treasure Island, Bill\'s New Frock.\n24 pupils read Bill\'s New Frock (shown as half the pie chart).\nHow many pupils were there in the reading club?',
    answer: '48',
    wrong: ['24', '36', '72', '96']
  },
  // Q20 - Equivalent calculations
  {
    question: 'Marcus multiplies a number by 96, then divides the answer by 4.\nSanjit does a different calculation which has the same result.\nWhich of these could be Sanjit\'s calculation?',
    answer: 'Multiply the number by 8, then multiply the answer by 3.',
    wrong: ['Multiply the number by 4, then multiply the answer by 8.', 'Multiply the number by 52, then divide the answer by 2.', 'Multiply the number by 155, then divide the answer by 5.', 'Multiply the number by 21, then multiply the answer by 3.']
  },
  // Q21 - Coordinates of square
  {
    question: 'The diagram shows three corners of a square at (2,5), (5,2) and (7,5).\nWhat are the co-ordinates of the fourth corner?',
    answer: '(5, 7)',
    wrong: ['(4, 7)', '(7, 4)', '(5, 5)', '(7, 5)']
  },
  // Q22 - Number sequence backwards
  {
    question: 'Karen counts backwards from 24 in steps of 7.\nWhich of these numbers will she reach?',
    answer: '3',
    wrong: ['1', '2', '4', '5']
  },
  // Q23 - Frequency table interpretation
  {
    question: 'This table shows the results of a science test:\nTest result | Frequency\n0-10 | 3\n11-20 | 6\n21-30 | 15\n31-40 | 9\n41-50 | 12\nWhich one of these statements is true?',
    answer: 'A third of the children scored between 21 and 30.',
    wrong: ['43 children were tested altogether.', '10 children scored less than 21.', 'Less than half of the children scored more than 20.', '24 children scored between 11 and 40.']
  },
  // Q24 - Algebraic expression
  {
    question: 'Leatown is holding its annual fun run.\nMedals are given to all the finishers.\nThe cost, in pence, of n medals is given by the expression\n300 + 20n\nHow much will 150 medals cost?',
    answer: '£33.00',
    wrong: ['£23.00', '£30.20', '£35.00', '£3300']
  },
  // Q25 - Symmetry of words
  {
    question: 'Which one of these words looks the same if you reflect it and rotate it?',
    answer: 'OXO',
    wrong: ['NOON', 'NUN', 'MUM', 'WOW']
  },
  // Q26 - Swimming pool length
  {
    question: 'Gemma swims 9 lengths of a swimming pool.\nShe swims 160 metres altogether.\nWhat is the length of the pool, to the nearest whole metre?',
    answer: '18m',
    wrong: ['16m', '17m', '19m', '20m']
  },
  // Q27 - Temperature graph matching
  {
    question: 'Lily recorded the temperature at different times of the day for five days.\nThe table shows her results:\n| | Mon | Tue | Wed | Thu | Fri |\n| 7am | 11° | 14° | 12° | 9° | 8° |\n| 10am | 13° | 16° | 14° | 10° | 10° |\n| 1pm | 14° | 17° | 17° | 11° | 13° |\n| 4pm | 15° | 19° | 18° | 14° | 12° |\n| 7pm | 14° | 16° | 16° | 12° | 10° |\nLily plotted the results for one day on a graph. She forgot to label the vertical axis.\nWhich day\'s results did Lily plot?',
    answer: 'Friday',
    wrong: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  },
  // Q28 - Divisibility
  {
    question: 'Nazir is thinking of a number.\nHe divides his number by 15, and the answer is a whole number.\nWhich of these could have been Nazir\'s number?',
    answer: '510',
    wrong: ['500', '505', '515', '520']
  },
  // Q29 - Angle in tessellation
  {
    question: 'Pat made this shape with squares and equilateral triangles.\nWhat is angle a in Pat\'s shape?',
    answer: '150°',
    wrong: ['120°', '90°', '135°', '165°']
  },
  // Q30 - Profit calculation
  {
    question: 'Some pupils sold cups of tea at the school fair.\nEach cup of tea cost 20p to make.\nThe pupils sold the cups of tea for 80p each.\nThe pupils sold 298 cups of tea.\nHow much profit did the pupils make, after they had paid for the cost of making the cups of tea?',
    answer: '£178.80',
    wrong: ['£59.60', '£119.20', '£238.40', '£297.80']
  },
  // Q31 - Fraction from percentage
  {
    question: 'A pot of Peach Yoghurt contains 125 grams and is 25% fruit.\nWhat fraction of the yoghurt is fruit?',
    answer: '¼',
    wrong: ['⅓', '⅕', '⅙', '⅛']
  },
  // Q32 - Order of operations
  {
    question: 'What is 270 ÷ (50 × 1.8)?',
    answer: '3',
    wrong: ['1.5', '2', '9', '9.72']
  },
  // Q33 - Capacity estimation
  {
    question: 'Mrs Shaw has 175 ml of liquid.\nShe needs a container for it.\nWhich one suits her needs best?',
    answer: 'mug',
    wrong: ['egg cup', 'large saucepan', 'bucket', 'bath']
  },
  // Q34 - Right-angled triangle coordinates
  {
    question: 'The point P at (1, 1) is one corner of a right-angled triangle.\nWhich of these pairs of points could be the other two corners of the right-angled triangle?',
    answer: '(-1, -2) and (4, -1)',
    wrong: ['(4, -1) and (5, 2)', '(5, 2) and (2, 5)', '(2, 5) and (-3, 2)', '(-3, 2) and (-1, -2)']
  },
  // Q35 - Venn diagram factors
  {
    question: 'Look at the numbers sorted on this Venn diagram.\nFactors of ? | Factors of 24\nThe intersection contains: 2, 3, 6\nOnly in left circle: 5, 10\nOnly in right circle: 4, 8\nOutside both: 7, 9\nWhat is the missing number in the first label?',
    answer: '30',
    wrong: ['12', '18', '20', '60']
  },
  // Q36 - Equivalent expressions
  {
    question: 'Which one of these expressions is equivalent to 2(n + 1)?',
    answer: '2n + 2',
    wrong: ['2(n + 2) - 1', '2n + 1', '2(n - 1) + 2', '2(n + 3) - 2']
  },
  // Q37 - Clock angles
  {
    question: 'It is 4 o\'clock on the kitchen clock.\nWhat is the obtuse angle between the clock hands?',
    answer: '120°',
    wrong: ['90°', '100°', '150°', '240°']
  },
  // Q38 - Rounding to nearest 10 metres
  {
    question: 'Round 32.476 kilometres to the nearest 10 metres.',
    answer: '32.48 kilometres',
    wrong: ['30 kilometres', '32 kilometres', '32.5 kilometres', '32.47 kilometres']
  },
  // Q39 - Mean calculation
  {
    question: 'The mean of these five numbers is 6.\n2  4  6  8  10\nPavel removes one number. The mean of the remaining four numbers is 7.\nWhich number did Pavel remove?',
    answer: '2',
    wrong: ['4', '6', '8', '10']
  },
  // Q40 - Comparing fractions and percentages
  {
    question: 'Which one of these is the greatest?',
    answer: '⅓ of 40',
    wrong: ['25% of 30', '⅔ of 15', '75% of 10', '½ of 25']
  },
  // Q41 - Surface area of hexagonal prism
  {
    question: 'The diagram shows a glass tank.\nThe base is a regular hexagon.\nThe sides are rectangles with dimensions 40 cm height and 25 cm width.\nWhat area of glass is needed to make all six sides?',
    answer: '6000 cm²',
    wrong: ['540 cm²', '780 cm²', '3000 cm²', '12,000 cm²']
  },
  // Q42 - Proportion problem
  {
    question: 'Zonia\'s rabbit weighs 3 kilograms.\nShe buys a bag of rabbit food pellets weighing 2½ kilograms.\nThe information on the bag of rabbit food says:\n"Every day you should give your rabbit about 30 grams of pellets for each 500 grams that it weighs."\nAbout how many weeks should the bag of rabbit food last?',
    answer: 'about two weeks',
    wrong: ['about one week', 'about three weeks', 'about four weeks', 'about six weeks']
  },
  // Q43 - Probability
  {
    question: 'Joshua picks a three-course meal at random from this menu:\nStarter: Melon, Prawn cocktail\nMain: Steak, Chicken, Salmon, Vegetarian option\nPudding: Fruit cocktail, Chocolate cake\nWhat is the probability that he picks a meal with chicken in it?',
    answer: '¼',
    wrong: ['⅛', '⅓', '½', '⅘']
  },
  // Q44 - Sharing money
  {
    question: 'Anna and Ben won some money. They shared it equally. They each got £12.\nCarla, David, Ella and Fran won three times as much money as Anna and Ben.\nThey shared it equally. How much did each person get?',
    answer: '£18',
    wrong: ['£9', '£12', '£24', '£36']
  },
  // Q45 - Net folding
  {
    question: 'Charlie is making a model of a solid.\nHe has cut out the net with corners labelled X, A, B, C, D, E.\nHe folds up the net.\nWhich corner does he join X to?',
    answer: 'E',
    wrong: ['A', 'B', 'C', 'D']
  },
  // Q46 - LCM problem
  {
    question: 'John and Ali start counting on from 0.\nThey each count on in steps of a different size.\nThe first number that both John and Ali reach is 120.\nWhat size steps could they have been counting in?',
    answer: '8 and 15',
    wrong: ['10 and 12', '11 and 13', '9 and 14', '6 and 20']
  },
  // Q47 - Data interpretation - wrong conclusion
  {
    question: 'Some pupils recorded the number of people in a swimming pool at different times one day.\nThey drew some conclusions from their data.\nWhich conclusion must be wrong?',
    answer: 'The modal number of people in the swimming pool was 7.5.',
    wrong: ['The smallest number of people in the swimming pool was 0.', 'The mean number of people in the swimming pool was 7.5.', 'The range in the number of people in the swimming pool was 10.', 'The greatest number of people in the swimming pool was 10.']
  },
  // Q48 - Fence posts and panels
  {
    question: 'Mr Firat needs to buy posts and panels for a new fence of length 8.5m.\nThe panels are 2m wide. The posts are 10cm wide.\nThere are posts between all the panels, and one at each end of the fence.\nHow many posts and how many panels should Mr Firat buy?',
    answer: '4 panels and 5 posts',
    wrong: ['4 panels and 4 posts', '5 panels and 5 posts', '5 panels and 6 posts', '6 panels and 6 posts']
  },
  // Q49 - Proportion/ratio
  {
    question: 'A flea has a height of 2mm.\nIt can jump to a height 80 times its own height.\nTo what height, in centimetres, can the flea jump?',
    answer: '16 cm',
    wrong: ['1.6 cm', '0.16 cm', '160 cm', '0.016 cm']
  },
  // Q50 - Algebraic expression
  {
    question: 'Mr Phillips buys an empty hanging basket for £4.00.\nPlants for the hanging basket cost £1.00 each.\nWhat expression would give the total cost in pounds if Mr Phillips buys n plants?',
    answer: '4 + n',
    wrong: ['4n + 1', '5n', '400n + 100', '4 + 100n']
  }
]

// Answer key for quick reference
export const mathsPaper8Answers = {
  1: 'kite',
  2: '£20.04',
  3: '7 minutes',
  4: '36',
  5: 'C',
  6: '£11.75',
  7: 'parallelogram',
  8: '8',
  9: 'E (two kilograms and five grams)',
  10: 'B (1196 rounded to nearest 10)',
  11: 'foxglove and helenium',
  12: '45',
  13: '54 centimetres',
  14: '2',
  15: '31',
  16: '36',
  17: '1 and 6',
  18: '5',
  19: '48',
  20: 'C',
  21: '(5, 7)',
  22: '3',
  23: 'E',
  24: '£33.00',
  25: 'OXO',
  26: '18m',
  27: 'Friday',
  28: '510',
  29: '150°',
  30: '£178.80',
  31: 'B (¼)',
  32: '3',
  33: 'mug',
  34: '(-1, -2) and (4, -1)',
  35: '30',
  36: '2n + 2',
  37: '120°',
  38: '32.48 kilometres',
  39: '2',
  40: 'A (⅓ of 40)',
  41: '6000 cm²',
  42: 'about two weeks',
  43: 'C (¼)',
  44: '£18',
  45: 'E',
  46: '8 and 15',
  47: 'B',
  48: 'B (4 panels and 5 posts)',
  49: '16 cm',
  50: '4 + n'
}
