// GL Assessment Non-Verbal Reasoning Multiple-Choice Familiarisation Test 8
// 6 sections with 12 questions each (72 questions total)

export type NVRQuestionType =
  | 'odd-one-out'
  | 'complete-pair'
  | 'complete-series'
  | 'horizontal-code'
  | 'complete-grid'
  | 'vertical-code'

export type NVRQuestion = {
  id: string
  type: NVRQuestionType
  description: string
  answer: 'a' | 'b' | 'c' | 'd' | 'e'
  explanation?: string
}

// Section 1: Find the Odd One Out
// Find one figure that is most unlike the other four
export const section1OddOneOut: NVRQuestion[] = [
  {
    id: 's1q1',
    type: 'odd-one-out',
    description: 'Five figures with black rectangles and triangles in different arrangements',
    answer: 'e',
    explanation: 'Figure e has triangles pointing in different direction pattern'
  },
  {
    id: 's1q2',
    type: 'odd-one-out',
    description: 'Five diamond shapes with different line patterns inside',
    answer: 'e',
    explanation: 'Figure e has different internal line orientation'
  },
  {
    id: 's1q3',
    type: 'odd-one-out',
    description: 'Five shapes - diamonds with circles and rectangles, different arrangements',
    answer: 'd',
    explanation: 'Figure d has different positioning of the black rectangle relative to diamond'
  },
  {
    id: 's1q4',
    type: 'odd-one-out',
    description: 'Five arrow shapes pointing in different directions with varying thickness',
    answer: 'd',
    explanation: 'Figure d points right with double arrow head unlike others'
  },
  {
    id: 's1q5',
    type: 'odd-one-out',
    description: 'Five shapes with striped patterns and dots - ovals, circles, triangles',
    answer: 'c',
    explanation: 'Figure c is a circle, others are not circular'
  },
  {
    id: 's1q6',
    type: 'odd-one-out',
    description: 'Five pentagon shapes with small triangles attached at different positions',
    answer: 'a',
    explanation: 'Figure a has the triangle inside the pentagon, others have it outside'
  },
  {
    id: 's1q7',
    type: 'odd-one-out',
    description: 'Five grid squares divided into 4 with different shapes in each section',
    answer: 'b',
    explanation: 'Figure b has an arrow pointing left, others have different direction arrows'
  },
  {
    id: 's1q8',
    type: 'odd-one-out',
    description: 'Five abstract figures with curves and shapes',
    answer: 'b',
    explanation: 'Figure b has rectangular elements, others are more curved/organic'
  },
  {
    id: 's1q9',
    type: 'odd-one-out',
    description: 'Five figures with shapes (hexagon, pentagon, rectangle) and small elements',
    answer: 'a',
    explanation: 'Figure a has a different shape arrangement'
  },
  {
    id: 's1q10',
    type: 'odd-one-out',
    description: 'Five circles with triangles and shapes inside/outside',
    answer: 'c',
    explanation: 'Figure c has different arrangement of internal shapes'
  },
  {
    id: 's1q11',
    type: 'odd-one-out',
    description: 'Five diamond shapes with internal line patterns',
    answer: 'd',
    explanation: 'Figure d has different internal division pattern'
  },
  {
    id: 's1q12',
    type: 'odd-one-out',
    description: 'Five figures with crosses and small shapes attached',
    answer: 'b',
    explanation: 'Figure b has dots arranged differently'
  }
]

// Section 2: Complete the Pair (Analogy)
// First pair shows relationship, find the figure that completes second pair
export const section2CompletePair: NVRQuestion[] = [
  {
    id: 's2q1',
    type: 'complete-pair',
    description: 'Striped oval with small circle → plain oval : striped diamond with diamonds → ?',
    answer: 'e',
    explanation: 'Pattern: remove stripes from shape, keep small elements outside'
  },
  {
    id: 's2q2',
    type: 'complete-pair',
    description: 'Grid with symbols → simplified grid : arrow figure with shapes → ?',
    answer: 'd',
    explanation: 'Elements are rearranged and simplified'
  },
  {
    id: 's2q3',
    type: 'complete-pair',
    description: 'Pentagon → hexagon outline : trapezoid → ?',
    answer: 'c',
    explanation: 'Shape becomes outline and rotated'
  },
  {
    id: 's2q4',
    type: 'complete-pair',
    description: 'Star shape → simplified star : cross shape → ?',
    answer: 'c',
    explanation: 'Shape simplified, lines reduced'
  },
  {
    id: 's2q5',
    type: 'complete-pair',
    description: 'Circle with quarters → half circle : circle with arrow → ?',
    answer: 'e',
    explanation: 'Shape reduced by half'
  },
  {
    id: 's2q6',
    type: 'complete-pair',
    description: 'Circle with internal shapes → separated shapes : rectangle with shapes → ?',
    answer: 'a',
    explanation: 'Internal elements separated outside'
  },
  {
    id: 's2q7',
    type: 'complete-pair',
    description: 'Overlapping circles → single circle : overlapping shapes → ?',
    answer: 'b',
    explanation: 'Overlapping becomes single with combined shading'
  },
  {
    id: 's2q8',
    type: 'complete-pair',
    description: 'Shield with pattern → filled shield : pentagon with pattern → ?',
    answer: 'b',
    explanation: 'Outline shape becomes filled'
  },
  {
    id: 's2q9',
    type: 'complete-pair',
    description: 'Diamond grid → rotated grid : dot pattern → ?',
    answer: 'a',
    explanation: 'Pattern rotates 45 degrees'
  },
  {
    id: 's2q10',
    type: 'complete-pair',
    description: 'Triangle with elements → modified triangle : shield with elements → ?',
    answer: 'd',
    explanation: 'Elements rearranged within shape'
  },
  {
    id: 's2q11',
    type: 'complete-pair',
    description: 'Solid shape → outline with stripe : solid parallelogram → ?',
    answer: 'a',
    explanation: 'Solid becomes outline with internal pattern'
  },
  {
    id: 's2q12',
    type: 'complete-pair',
    description: 'Triangle with symbols → inverted symbols : shape with symbols → ?',
    answer: 'a',
    explanation: 'Internal symbols are inverted/rearranged'
  }
]

// Section 3: Complete the Series
// Find the figure that continues the sequence pattern
export const section3CompleteSeries: NVRQuestion[] = [
  {
    id: 's3q1',
    type: 'complete-series',
    description: 'Series of rectangles with black sections moving/changing',
    answer: 'd',
    explanation: 'Black sections follow a progression pattern'
  },
  {
    id: 's3q2',
    type: 'complete-series',
    description: 'Series of circles with internal line patterns',
    answer: 'b',
    explanation: 'Line pattern rotates and changes'
  },
  {
    id: 's3q3',
    type: 'complete-series',
    description: 'Series of dots in squares, decreasing count',
    answer: 'd',
    explanation: 'Number of dots decreases by 1 each time'
  },
  {
    id: 's3q4',
    type: 'complete-series',
    description: 'Series of shapes with lines, shapes change',
    answer: 'e',
    explanation: 'Shape rotates and line position changes'
  },
  {
    id: 's3q5',
    type: 'complete-series',
    description: 'Series of rounded rectangles with internal shapes',
    answer: 'a',
    explanation: 'Internal shapes rotate through positions'
  },
  {
    id: 's3q6',
    type: 'complete-series',
    description: 'Series of circles divided into sections with shading',
    answer: 'c',
    explanation: 'Shaded sections follow rotation pattern'
  },
  {
    id: 's3q7',
    type: 'complete-series',
    description: 'Series of triangles with lines and small triangles',
    answer: 'c',
    explanation: 'Elements alternate and change position'
  },
  {
    id: 's3q8',
    type: 'complete-series',
    description: 'Series of shapes (triangle, arrow, etc.) changing',
    answer: 'b',
    explanation: 'Shape type follows sequence'
  },
  {
    id: 's3q9',
    type: 'complete-series',
    description: 'Series of hexagons with patterns inside',
    answer: 'e',
    explanation: 'Internal pattern follows progression'
  },
  {
    id: 's3q10',
    type: 'complete-series',
    description: 'Series of shapes with flag-like element, rotation',
    answer: 'd',
    explanation: 'Shape and flag rotate through positions'
  },
  {
    id: 's3q11',
    type: 'complete-series',
    description: 'Series of X patterns with dots',
    answer: 'a',
    explanation: 'Dot positions follow specific pattern'
  },
  {
    id: 's3q12',
    type: 'complete-series',
    description: 'Series of arrow/eye shapes with internal patterns',
    answer: 'a',
    explanation: 'Internal shading follows sequence'
  }
]

// Section 4: Crack the Horizontal Code
// Decode the two-letter code based on shape properties
export const section4HorizontalCode: NVRQuestion[] = [
  {
    id: 's4q1',
    type: 'horizontal-code',
    description: 'Shapes with codes: square+circles=RX, circles=SY, circle+square=SX. Test: two squares with dots',
    answer: 'b',
    explanation: 'First letter = shape outline, Second letter = fill pattern'
  },
  {
    id: 's4q2',
    type: 'horizontal-code',
    description: 'Moon shapes with codes based on direction and fill',
    answer: 'b',
    explanation: 'Code based on moon direction and shading'
  },
  {
    id: 's4q3',
    type: 'horizontal-code',
    description: 'Pattern shapes (lines, waves, dots) with codes',
    answer: 'd',
    explanation: 'First letter = pattern type, Second letter = orientation'
  },
  {
    id: 's4q4',
    type: 'horizontal-code',
    description: 'Geometric shapes (square, chevron, triangle) with codes',
    answer: 'e',
    explanation: 'Code based on shape type and size'
  },
  {
    id: 's4q5',
    type: 'horizontal-code',
    description: 'Squares with different internal patterns and shading',
    answer: 'a',
    explanation: 'First letter = internal shape, Second letter = position'
  },
  {
    id: 's4q6',
    type: 'horizontal-code',
    description: 'Dot patterns in different arrangements with codes',
    answer: 'c',
    explanation: 'Code based on dot arrangement and count'
  },
  {
    id: 's4q7',
    type: 'horizontal-code',
    description: 'Hexagon/octagon shapes with internal divisions',
    answer: 'c',
    explanation: 'First letter = shape, Second letter = division pattern'
  },
  {
    id: 's4q8',
    type: 'horizontal-code',
    description: 'Semi-circles and shapes with patterns',
    answer: 'e',
    explanation: 'Code based on shape orientation and pattern'
  },
  {
    id: 's4q9',
    type: 'horizontal-code',
    description: 'Spiral/curved shapes with arrows',
    answer: 'c',
    explanation: 'First letter = spiral direction, Second letter = arrow type'
  },
  {
    id: 's4q10',
    type: 'horizontal-code',
    description: 'Triangle, square, circle with size/fill variations',
    answer: 'd',
    explanation: 'Code based on shape type and fill'
  },
  {
    id: 's4q11',
    type: 'horizontal-code',
    description: 'Triangle with different patterns (solid, lines, empty)',
    answer: 'c',
    explanation: 'First letter = shape type, Second letter = fill pattern'
  },
  {
    id: 's4q12',
    type: 'horizontal-code',
    description: 'Arrow shapes with different patterns and directions',
    answer: 'e',
    explanation: 'Code based on arrow shape and pattern'
  }
]

// Section 5: Complete the Grid
// Find the missing figure in a 3x3 or 2x2 grid
export const section5CompleteGrid: NVRQuestion[] = [
  {
    id: 's5q1',
    type: 'complete-grid',
    description: '2x2 grid with X patterns and dots, find missing corner',
    answer: 'e',
    explanation: 'Each row/column has specific combination of elements'
  },
  {
    id: 's5q2',
    type: 'complete-grid',
    description: '3x3 grid with shapes (square, diamond, semicircle, triangle)',
    answer: 'a',
    explanation: 'Each shape appears once in each row and column'
  },
  {
    id: 's5q3',
    type: 'complete-grid',
    description: '3x3 grid with arrows and shapes in different orientations',
    answer: 'c',
    explanation: 'Arrows follow directional pattern in rows'
  },
  {
    id: 's5q4',
    type: 'complete-grid',
    description: '3x3 grid with L-shapes and brackets',
    answer: 'd',
    explanation: 'Each row has shapes in different orientations'
  },
  {
    id: 's5q5',
    type: 'complete-grid',
    description: '3x3 grid with circles containing arrows and triangles',
    answer: 'b',
    explanation: 'Elements combine according to row/column rules'
  },
  {
    id: 's5q6',
    type: 'complete-grid',
    description: '3x3 grid with shapes having different patterns',
    answer: 'a',
    explanation: 'Pattern and shape follow Latin square rules'
  },
  {
    id: 's5q7',
    type: 'complete-grid',
    description: '3x3 grid with triangles and arrows in different orientations',
    answer: 'd',
    explanation: 'Each row has all three orientations'
  },
  {
    id: 's5q8',
    type: 'complete-grid',
    description: '3x3 grid with lines, arrows, and dots',
    answer: 'c',
    explanation: 'Elements progress through positions'
  },
  {
    id: 's5q9',
    type: 'complete-grid',
    description: '3x3 grid with pentagons/arrows in black and white',
    answer: 'b',
    explanation: 'Color and direction follow pattern'
  },
  {
    id: 's5q10',
    type: 'complete-grid',
    description: '2x2 grid with pac-man and bow-tie shapes',
    answer: 'e',
    explanation: 'Shapes reflect and rotate'
  },
  {
    id: 's5q11',
    type: 'complete-grid',
    description: '3x3 grid with squares, triangles, circles and patterns',
    answer: 'c',
    explanation: 'Each shape appears with each pattern once'
  },
  {
    id: 's5q12',
    type: 'complete-grid',
    description: '2x2 grid with complex robot-like figures',
    answer: 'b',
    explanation: 'Figure elements combine from row and column'
  }
]

// Section 6: Crack the Vertical Code
// Decode the two or three letter code based on shape properties (vertical arrangement)
export const section6VerticalCode: NVRQuestion[] = [
  {
    id: 's6q1',
    type: 'vertical-code',
    description: 'Shapes with bracket and dot combinations, codes RX, SY, RZ',
    answer: 'd',
    explanation: 'First letter = bracket position, Second letter = dot position'
  },
  {
    id: 's6q2',
    type: 'vertical-code',
    description: 'Triangles with different fills (outline, solid, striped) - codes RL, SM, TN, RM',
    answer: 'c',
    explanation: 'First letter = fill type, Second letter = orientation'
  },
  {
    id: 's6q3',
    type: 'vertical-code',
    description: 'Dot patterns with varying filled/empty dots - codes RX, SY, RY, TZ',
    answer: 'd',
    explanation: 'First letter = filled dot count, Second letter = empty dot count'
  },
  {
    id: 's6q4',
    type: 'vertical-code',
    description: '3-letter codes for shapes with fill - YBM, ZBN, XDN for circle, filled circle, triangle',
    answer: 'b',
    explanation: 'First letter = shape, Second letter = size, Third letter = fill'
  },
  {
    id: 's6q5',
    type: 'vertical-code',
    description: 'Circles with different internal patterns - codes SG, TH, SJ, VG',
    answer: 'a',
    explanation: 'First letter = circle type, Second letter = internal pattern'
  },
  {
    id: 's6q6',
    type: 'vertical-code',
    description: 'Dot patterns in rows - codes XP, YQ, ZP',
    answer: 'a',
    explanation: 'First letter = filled dots position, Second letter = pattern type'
  },
  {
    id: 's6q7',
    type: 'vertical-code',
    description: 'Shapes (semicircle, diamond, circle) - codes SX, TY, SZ',
    answer: 'e',
    explanation: 'First letter = shape outline, Second letter = shape type'
  },
  {
    id: 's6q8',
    type: 'vertical-code',
    description: 'Different shapes with fill patterns - codes LR, MS, NT, MR',
    answer: 'e',
    explanation: 'First letter = shape, Second letter = fill pattern'
  },
  {
    id: 's6q9',
    type: 'vertical-code',
    description: '3-letter codes: 3D cube shapes with dots and arrows - WRL, XRM, WSM',
    answer: 'b',
    explanation: 'First letter = dot position, Second letter = pattern, Third letter = arrow'
  },
  {
    id: 's6q10',
    type: 'vertical-code',
    description: 'Triangle shapes with patterns - codes PV, PW, QX, RW',
    answer: 'e',
    explanation: 'First letter = shape fill, Second letter = pattern type'
  },
  {
    id: 's6q11',
    type: 'vertical-code',
    description: '3-letter codes for shield shapes with patterns - RWL, SXM, TYL, SWN',
    answer: 'c',
    explanation: 'First = fill, Second = pattern, Third = outline type'
  },
  {
    id: 's6q12',
    type: 'vertical-code',
    description: '3-letter codes for arrow shapes with patterns - SYX, UYT, KPX',
    answer: 'd',
    explanation: 'First = pattern, Second = arrow direction, Third = shape detail'
  }
]

// Combine all questions
export const nvrPaper8Questions = {
  section1: section1OddOneOut,
  section2: section2CompletePair,
  section3: section3CompleteSeries,
  section4: section4HorizontalCode,
  section5: section5CompleteGrid,
  section6: section6VerticalCode
}

// Answer key for quick reference
export const nvrPaper8Answers = {
  section1: {
    practice: ['c', 'd'] as const,
    questions: ['e', 'e', 'd', 'd', 'c', 'a', 'b', 'b', 'a', 'c', 'd', 'b'] as const
  },
  section2: {
    practice: ['c', 'a'] as const,
    questions: ['e', 'd', 'c', 'c', 'e', 'a', 'b', 'b', 'a', 'd', 'a', 'a'] as const
  },
  section3: {
    practice: ['c', 'a'] as const,
    questions: ['d', 'b', 'd', 'e', 'a', 'c', 'c', 'b', 'e', 'd', 'a', 'a'] as const
  },
  section4: {
    practice: ['d', 'e'] as const,
    questions: ['b', 'b', 'd', 'e', 'a', 'c', 'c', 'e', 'c', 'd', 'c', 'e'] as const
  },
  section5: {
    practice: ['a', 'b', 'e', 'c'] as const,
    questions: ['e', 'a', 'c', 'd', 'b', 'a', 'd', 'c', 'b', 'e', 'c', 'b'] as const
  },
  section6: {
    practice: ['c', 'd'] as const,
    questions: ['d', 'c', 'd', 'b', 'a', 'a', 'e', 'e', 'b', 'e', 'c', 'd'] as const
  }
}

// Solution rules for each section
export const nvrPaper8SolutionRules = {
  section1: 'Find the Odd One Out - Identify the figure that is most unlike the other four based on shape, pattern, orientation, or composition.',
  section2: 'Complete the Pair - The first pair shows a relationship (e.g., shape changes, pattern added). Apply the same relationship to the third shape to find its pair.',
  section3: 'Complete the Series - Identify the pattern across the sequence (rotation, size change, element addition/removal) and find what comes next.',
  section4: 'Crack the Horizontal Code - The top code letter represents one attribute (e.g., shape), the bottom represents another (e.g., shading). Decode and apply.',
  section5: 'Complete the Grid - Each row and column follows a rule. Find the missing element that completes the pattern without repetition.',
  section6: 'Crack the Vertical Code - Similar to horizontal codes but arranged vertically. May have 2 or 3 letters representing different attributes.'
}
