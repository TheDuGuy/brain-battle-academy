/**
 * Year 5 Maths Revision - 2D and 3D Shapes
 * Source: Quick-Winter-Revision-2025.pdf & Quick-Maths-Revision-Winter-answers.pdf
 *
 * Contains questions about 2D shapes (triangles, quadrilaterals, polygons)
 * and 3D shapes (prisms, pyramids, properties)
 */

export type ShapeQuestionType =
  | 'identify_shape'       // Identify a shape from its description
  | 'properties'           // Questions about shape properties
  | 'vocabulary'           // Shape-related vocabulary
  | 'classify'             // Classify shapes into categories
  | 'true_false'           // True/false statements about shapes

export type ShapeQuestion = {
  id: string
  type: ShapeQuestionType
  category: string           // 2D or 3D shapes category
  question: string
  options: string[]
  answer: string             // The correct answer (A, B, C, D)
  explanation?: string
}

// ============================================================================
// SECTION 1: Triangle Types
// ============================================================================

export const triangleQuestions: ShapeQuestion[] = [
  {
    id: 'shape-tri-1',
    type: 'identify_shape',
    category: 'Triangles',
    question: 'What type of triangle has all three sides equal in length?',
    options: ['A. Isosceles', 'B. Scalene', 'C. Equilateral', 'D. Right-angled'],
    answer: 'C',
    explanation: 'An equilateral triangle has all three sides equal and all angles are 60°.'
  },
  {
    id: 'shape-tri-2',
    type: 'identify_shape',
    category: 'Triangles',
    question: 'What type of triangle has exactly two sides equal in length?',
    options: ['A. Equilateral', 'B. Isosceles', 'C. Scalene', 'D. Obtuse'],
    answer: 'B',
    explanation: 'An isosceles triangle has exactly two sides equal and two angles equal.'
  },
  {
    id: 'shape-tri-3',
    type: 'identify_shape',
    category: 'Triangles',
    question: 'What type of triangle has all three sides different lengths?',
    options: ['A. Equilateral', 'B. Isosceles', 'C. Right-angled', 'D. Scalene'],
    answer: 'D',
    explanation: 'A scalene triangle has all three sides of different lengths and all angles are different.'
  },
  {
    id: 'shape-tri-4',
    type: 'properties',
    category: 'Triangles',
    question: 'What is the sum of all angles in any triangle?',
    options: ['A. 90°', 'B. 180°', 'C. 270°', 'D. 360°'],
    answer: 'B',
    explanation: 'The angles in any triangle always add up to 180°.'
  },
  {
    id: 'shape-tri-5',
    type: 'properties',
    category: 'Triangles',
    question: 'In an equilateral triangle, each angle measures:',
    options: ['A. 30°', 'B. 45°', 'C. 60°', 'D. 90°'],
    answer: 'C',
    explanation: 'An equilateral triangle has three equal angles. 180° ÷ 3 = 60°.'
  },
  {
    id: 'shape-tri-6',
    type: 'identify_shape',
    category: 'Triangles',
    question: 'Which triangle has one angle of 90°?',
    options: ['A. Acute triangle', 'B. Obtuse triangle', 'C. Right-angled triangle', 'D. Equilateral triangle'],
    answer: 'C',
    explanation: 'A right-angled triangle has one angle that is exactly 90°.'
  },
  {
    id: 'shape-tri-7',
    type: 'properties',
    category: 'Triangles',
    question: 'Which triangle has one angle greater than 90°?',
    options: ['A. Acute triangle', 'B. Obtuse triangle', 'C. Right-angled triangle', 'D. Equilateral triangle'],
    answer: 'B',
    explanation: 'An obtuse triangle has one angle greater than 90°.'
  },
  {
    id: 'shape-tri-8',
    type: 'properties',
    category: 'Triangles',
    question: 'In an isosceles triangle, if one angle is 40°, and the two equal angles are the base angles, what is each base angle?',
    options: ['A. 40°', 'B. 60°', 'C. 70°', 'D. 80°'],
    answer: 'C',
    explanation: '180° - 40° = 140°. The two base angles share this: 140° ÷ 2 = 70° each.'
  },
  {
    id: 'shape-tri-9',
    type: 'true_false',
    category: 'Triangles',
    question: 'True or False: A triangle can have two right angles.',
    options: ['A. True', 'B. False'],
    answer: 'B',
    explanation: 'False. Two right angles would be 180°, leaving no degrees for the third angle.'
  },
  {
    id: 'shape-tri-10',
    type: 'classify',
    category: 'Triangles',
    question: 'A triangle has sides of 5cm, 5cm, and 8cm. What type is it?',
    options: ['A. Equilateral', 'B. Isosceles', 'C. Scalene', 'D. Right-angled'],
    answer: 'B',
    explanation: 'It has exactly two equal sides (5cm and 5cm), so it is isosceles.'
  }
]

// ============================================================================
// SECTION 2: Quadrilaterals
// ============================================================================

export const quadrilateralQuestions: ShapeQuestion[] = [
  {
    id: 'shape-quad-1',
    type: 'properties',
    category: 'Quadrilaterals',
    question: 'How many sides does a quadrilateral have?',
    options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
    answer: 'B',
    explanation: 'A quadrilateral has 4 sides. "Quad" means four.'
  },
  {
    id: 'shape-quad-2',
    type: 'properties',
    category: 'Quadrilaterals',
    question: 'What is the sum of angles in any quadrilateral?',
    options: ['A. 180°', 'B. 270°', 'C. 360°', 'D. 540°'],
    answer: 'C',
    explanation: 'The angles in any quadrilateral always add up to 360°.'
  },
  {
    id: 'shape-quad-3',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has all four sides equal and all angles 90°?',
    options: ['A. Rectangle', 'B. Rhombus', 'C. Square', 'D. Parallelogram'],
    answer: 'C',
    explanation: 'A square has all sides equal AND all angles are right angles (90°).'
  },
  {
    id: 'shape-quad-4',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has opposite sides equal and parallel, with all angles 90°?',
    options: ['A. Square', 'B. Rectangle', 'C. Rhombus', 'D. Trapezium'],
    answer: 'B',
    explanation: 'A rectangle has opposite sides equal, all angles 90°, but sides are not all equal.'
  },
  {
    id: 'shape-quad-5',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has all four sides equal but angles are NOT all 90°?',
    options: ['A. Square', 'B. Rectangle', 'C. Rhombus', 'D. Trapezium'],
    answer: 'C',
    explanation: 'A rhombus has all sides equal but opposite angles are equal (not all 90°). It looks like a "pushed over" square.'
  },
  {
    id: 'shape-quad-6',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has exactly one pair of parallel sides?',
    options: ['A. Parallelogram', 'B. Rhombus', 'C. Trapezium', 'D. Rectangle'],
    answer: 'C',
    explanation: 'A trapezium has exactly one pair of parallel sides (the other two are not parallel).'
  },
  {
    id: 'shape-quad-7',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has both pairs of opposite sides parallel?',
    options: ['A. Trapezium', 'B. Kite', 'C. Parallelogram', 'D. Irregular quadrilateral'],
    answer: 'C',
    explanation: 'A parallelogram has both pairs of opposite sides parallel and equal.'
  },
  {
    id: 'shape-quad-8',
    type: 'identify_shape',
    category: 'Quadrilaterals',
    question: 'Which quadrilateral has two pairs of adjacent sides equal?',
    options: ['A. Rectangle', 'B. Parallelogram', 'C. Kite', 'D. Rhombus'],
    answer: 'C',
    explanation: 'A kite has two pairs of adjacent (next to each other) sides that are equal.'
  },
  {
    id: 'shape-quad-9',
    type: 'vocabulary',
    category: 'Quadrilaterals',
    question: 'What does "parallel" mean?',
    options: ['A. Lines that cross', 'B. Lines that are always the same distance apart', 'C. Lines of equal length', 'D. Lines that are perpendicular'],
    answer: 'B',
    explanation: 'Parallel lines are always the same distance apart and never meet.'
  },
  {
    id: 'shape-quad-10',
    type: 'classify',
    category: 'Quadrilaterals',
    question: 'Which statement is true about a square?',
    options: ['A. A square is a type of rectangle', 'B. A square is not a rhombus', 'C. A square has no parallel sides', 'D. A square has different length sides'],
    answer: 'A',
    explanation: 'A square is a special type of rectangle (with all sides equal) AND a special rhombus (with all angles 90°).'
  },
  {
    id: 'shape-quad-11',
    type: 'properties',
    category: 'Quadrilaterals',
    question: 'How many pairs of parallel sides does a parallelogram have?',
    options: ['A. 0', 'B. 1', 'C. 2', 'D. 4'],
    answer: 'C',
    explanation: 'A parallelogram has 2 pairs of parallel sides (top-bottom and left-right).'
  },
  {
    id: 'shape-quad-12',
    type: 'true_false',
    category: 'Quadrilaterals',
    question: 'True or False: All rectangles are squares.',
    options: ['A. True', 'B. False'],
    answer: 'B',
    explanation: 'False. All squares are rectangles, but not all rectangles are squares (rectangles can have different length sides).'
  }
]

// ============================================================================
// SECTION 3: Polygons
// ============================================================================

export const polygonQuestions: ShapeQuestion[] = [
  {
    id: 'shape-poly-1',
    type: 'vocabulary',
    category: 'Polygons',
    question: 'What is a polygon?',
    options: ['A. A 3D shape', 'B. A closed 2D shape with straight sides', 'C. A shape with curved sides', 'D. Any shape with 4 sides'],
    answer: 'B',
    explanation: 'A polygon is a closed 2D shape made of straight sides.'
  },
  {
    id: 'shape-poly-2',
    type: 'identify_shape',
    category: 'Polygons',
    question: 'What is a 5-sided polygon called?',
    options: ['A. Hexagon', 'B. Heptagon', 'C. Pentagon', 'D. Octagon'],
    answer: 'C',
    explanation: 'A pentagon has 5 sides. "Penta" means five.'
  },
  {
    id: 'shape-poly-3',
    type: 'identify_shape',
    category: 'Polygons',
    question: 'What is a 6-sided polygon called?',
    options: ['A. Pentagon', 'B. Hexagon', 'C. Heptagon', 'D. Octagon'],
    answer: 'B',
    explanation: 'A hexagon has 6 sides. "Hexa" means six.'
  },
  {
    id: 'shape-poly-4',
    type: 'identify_shape',
    category: 'Polygons',
    question: 'What is a 7-sided polygon called?',
    options: ['A. Hexagon', 'B. Octagon', 'C. Heptagon', 'D. Nonagon'],
    answer: 'C',
    explanation: 'A heptagon has 7 sides. "Hepta" means seven.'
  },
  {
    id: 'shape-poly-5',
    type: 'identify_shape',
    category: 'Polygons',
    question: 'What is an 8-sided polygon called?',
    options: ['A. Hexagon', 'B. Heptagon', 'C. Nonagon', 'D. Octagon'],
    answer: 'D',
    explanation: 'An octagon has 8 sides. "Octa" means eight. Stop signs are octagons!'
  },
  {
    id: 'shape-poly-6',
    type: 'vocabulary',
    category: 'Polygons',
    question: 'What does "regular polygon" mean?',
    options: ['A. A polygon with 4 sides', 'B. A polygon with all sides and angles equal', 'C. A polygon with right angles', 'D. A polygon with parallel sides'],
    answer: 'B',
    explanation: 'A regular polygon has all sides equal length AND all angles equal.'
  },
  {
    id: 'shape-poly-7',
    type: 'properties',
    category: 'Polygons',
    question: 'How many lines of symmetry does a regular hexagon have?',
    options: ['A. 3', 'B. 4', 'C. 6', 'D. 8'],
    answer: 'C',
    explanation: 'A regular hexagon has 6 lines of symmetry (same as the number of sides).'
  },
  {
    id: 'shape-poly-8',
    type: 'properties',
    category: 'Polygons',
    question: 'A regular polygon has 10 sides. What is it called?',
    options: ['A. Nonagon', 'B. Decagon', 'C. Dodecagon', 'D. Hendecagon'],
    answer: 'B',
    explanation: 'A decagon has 10 sides. "Deca" means ten.'
  },
  {
    id: 'shape-poly-9',
    type: 'classify',
    category: 'Polygons',
    question: 'Which of these is NOT a polygon?',
    options: ['A. Triangle', 'B. Circle', 'C. Pentagon', 'D. Quadrilateral'],
    answer: 'B',
    explanation: 'A circle is NOT a polygon because it has a curved side, not straight sides.'
  },
  {
    id: 'shape-poly-10',
    type: 'properties',
    category: 'Polygons',
    question: 'What is the interior angle sum of a pentagon?',
    options: ['A. 360°', 'B. 450°', 'C. 540°', 'D. 720°'],
    answer: 'C',
    explanation: 'Pentagon angle sum = (5-2) × 180° = 3 × 180° = 540°.'
  }
]

// ============================================================================
// SECTION 4: 3D Shapes - Prisms
// ============================================================================

export const prismQuestions: ShapeQuestion[] = [
  {
    id: 'shape-prism-1',
    type: 'vocabulary',
    category: '3D Prisms',
    question: 'What is a prism?',
    options: ['A. A 2D shape', 'B. A 3D shape with identical ends and rectangular sides', 'C. A shape with a point at the top', 'D. A round 3D shape'],
    answer: 'B',
    explanation: 'A prism has two identical ends (bases) connected by rectangular faces.'
  },
  {
    id: 'shape-prism-2',
    type: 'identify_shape',
    category: '3D Prisms',
    question: 'What is a prism with triangular ends called?',
    options: ['A. Triangular pyramid', 'B. Triangular prism', 'C. Cone', 'D. Tetrahedron'],
    answer: 'B',
    explanation: 'A triangular prism has triangular ends and rectangular faces connecting them.'
  },
  {
    id: 'shape-prism-3',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many faces does a triangular prism have?',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 7'],
    answer: 'B',
    explanation: 'A triangular prism has 5 faces: 2 triangular ends + 3 rectangular sides.'
  },
  {
    id: 'shape-prism-4',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many edges does a triangular prism have?',
    options: ['A. 6', 'B. 8', 'C. 9', 'D. 12'],
    answer: 'C',
    explanation: 'A triangular prism has 9 edges: 3 on each triangular end + 3 connecting the ends.'
  },
  {
    id: 'shape-prism-5',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many vertices does a triangular prism have?',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 8'],
    answer: 'C',
    explanation: 'A triangular prism has 6 vertices (corners): 3 on each triangular end.'
  },
  {
    id: 'shape-prism-6',
    type: 'identify_shape',
    category: '3D Prisms',
    question: 'A cube is a special type of what shape?',
    options: ['A. Pyramid', 'B. Prism', 'C. Cone', 'D. Sphere'],
    answer: 'B',
    explanation: 'A cube is a special rectangular prism where all faces are squares.'
  },
  {
    id: 'shape-prism-7',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many faces does a cube have?',
    options: ['A. 4', 'B. 6', 'C. 8', 'D. 12'],
    answer: 'B',
    explanation: 'A cube has 6 faces (all squares).'
  },
  {
    id: 'shape-prism-8',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many edges does a cube have?',
    options: ['A. 6', 'B. 8', 'C. 10', 'D. 12'],
    answer: 'D',
    explanation: 'A cube has 12 edges.'
  },
  {
    id: 'shape-prism-9',
    type: 'properties',
    category: '3D Prisms',
    question: 'How many vertices does a cube have?',
    options: ['A. 4', 'B. 6', 'C. 8', 'D. 10'],
    answer: 'C',
    explanation: 'A cube has 8 vertices (corners).'
  },
  {
    id: 'shape-prism-10',
    type: 'identify_shape',
    category: '3D Prisms',
    question: 'What shape are the faces of a pentagonal prism?',
    options: ['A. All pentagons', 'B. All rectangles', 'C. 2 pentagons and 5 rectangles', 'D. 5 pentagons and 2 rectangles'],
    answer: 'C',
    explanation: 'A pentagonal prism has 2 pentagonal ends and 5 rectangular sides.'
  }
]

// ============================================================================
// SECTION 5: 3D Shapes - Pyramids
// ============================================================================

export const pyramidQuestions: ShapeQuestion[] = [
  {
    id: 'shape-pyr-1',
    type: 'vocabulary',
    category: '3D Pyramids',
    question: 'What is a pyramid?',
    options: ['A. A shape with identical ends', 'B. A shape with a base and triangular faces meeting at a point', 'C. A round 3D shape', 'D. A shape with all rectangular faces'],
    answer: 'B',
    explanation: 'A pyramid has a base (polygon) with triangular faces that meet at a single point (apex).'
  },
  {
    id: 'shape-pyr-2',
    type: 'identify_shape',
    category: '3D Pyramids',
    question: 'What is a pyramid with a square base called?',
    options: ['A. Triangular pyramid', 'B. Square prism', 'C. Square-based pyramid', 'D. Cube'],
    answer: 'C',
    explanation: 'A square-based pyramid has a square base and 4 triangular faces meeting at a point.'
  },
  {
    id: 'shape-pyr-3',
    type: 'properties',
    category: '3D Pyramids',
    question: 'How many faces does a square-based pyramid have?',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 8'],
    answer: 'B',
    explanation: 'A square-based pyramid has 5 faces: 1 square base + 4 triangular sides.'
  },
  {
    id: 'shape-pyr-4',
    type: 'properties',
    category: '3D Pyramids',
    question: 'How many edges does a square-based pyramid have?',
    options: ['A. 5', 'B. 6', 'C. 8', 'D. 10'],
    answer: 'C',
    explanation: 'A square-based pyramid has 8 edges: 4 around the base + 4 going up to the apex.'
  },
  {
    id: 'shape-pyr-5',
    type: 'properties',
    category: '3D Pyramids',
    question: 'How many vertices does a square-based pyramid have?',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 8'],
    answer: 'B',
    explanation: 'A square-based pyramid has 5 vertices: 4 corners of the base + 1 apex at the top.'
  },
  {
    id: 'shape-pyr-6',
    type: 'identify_shape',
    category: '3D Pyramids',
    question: 'What is another name for a triangular-based pyramid?',
    options: ['A. Triangle', 'B. Prism', 'C. Tetrahedron', 'D. Cone'],
    answer: 'C',
    explanation: 'A tetrahedron is a triangular-based pyramid with 4 triangular faces.'
  },
  {
    id: 'shape-pyr-7',
    type: 'properties',
    category: '3D Pyramids',
    question: 'How many faces does a tetrahedron have?',
    options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
    answer: 'B',
    explanation: 'A tetrahedron has 4 triangular faces (including the base).'
  },
  {
    id: 'shape-pyr-8',
    type: 'vocabulary',
    category: '3D Pyramids',
    question: 'What is the top point of a pyramid called?',
    options: ['A. Vertex', 'B. Edge', 'C. Apex', 'D. Face'],
    answer: 'C',
    explanation: 'The apex is the point at the top of a pyramid where all triangular faces meet.'
  },
  {
    id: 'shape-pyr-9',
    type: 'classify',
    category: '3D Pyramids',
    question: 'Which shape is NOT a pyramid?',
    options: ['A. Tetrahedron', 'B. Square-based pyramid', 'C. Triangular prism', 'D. Pentagonal pyramid'],
    answer: 'C',
    explanation: 'A triangular prism is NOT a pyramid - it has two identical ends, not a point.'
  },
  {
    id: 'shape-pyr-10',
    type: 'properties',
    category: '3D Pyramids',
    question: 'How many edges does a tetrahedron have?',
    options: ['A. 4', 'B. 5', 'C. 6', 'D. 8'],
    answer: 'C',
    explanation: 'A tetrahedron has 6 edges.'
  }
]

// ============================================================================
// SECTION 6: Other 3D Shapes
// ============================================================================

export const other3DQuestions: ShapeQuestion[] = [
  {
    id: 'shape-3d-1',
    type: 'identify_shape',
    category: '3D Shapes',
    question: 'What 3D shape has a circular base and comes to a point?',
    options: ['A. Cylinder', 'B. Sphere', 'C. Cone', 'D. Pyramid'],
    answer: 'C',
    explanation: 'A cone has a circular base and comes to a point (apex).'
  },
  {
    id: 'shape-3d-2',
    type: 'identify_shape',
    category: '3D Shapes',
    question: 'What 3D shape has two circular faces connected by a curved surface?',
    options: ['A. Cone', 'B. Cylinder', 'C. Sphere', 'D. Circle'],
    answer: 'B',
    explanation: 'A cylinder has two circular bases connected by a curved rectangular surface.'
  },
  {
    id: 'shape-3d-3',
    type: 'identify_shape',
    category: '3D Shapes',
    question: 'What 3D shape is perfectly round like a ball?',
    options: ['A. Circle', 'B. Cylinder', 'C. Sphere', 'D. Oval'],
    answer: 'C',
    explanation: 'A sphere is a perfectly round 3D shape - every point on its surface is the same distance from the centre.'
  },
  {
    id: 'shape-3d-4',
    type: 'properties',
    category: '3D Shapes',
    question: 'How many faces does a cylinder have?',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
    answer: 'C',
    explanation: 'A cylinder has 3 faces: 2 circular bases + 1 curved rectangular surface.'
  },
  {
    id: 'shape-3d-5',
    type: 'properties',
    category: '3D Shapes',
    question: 'How many edges does a cylinder have?',
    options: ['A. 0', 'B. 1', 'C. 2', 'D. 3'],
    answer: 'C',
    explanation: 'A cylinder has 2 edges (the circular edges where the curved surface meets the flat bases).'
  },
  {
    id: 'shape-3d-6',
    type: 'properties',
    category: '3D Shapes',
    question: 'How many vertices does a sphere have?',
    options: ['A. 0', 'B. 1', 'C. 2', 'D. Infinite'],
    answer: 'A',
    explanation: 'A sphere has 0 vertices (no corners) because it is completely curved.'
  },
  {
    id: 'shape-3d-7',
    type: 'properties',
    category: '3D Shapes',
    question: 'How many faces does a cone have?',
    options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
    answer: 'B',
    explanation: 'A cone has 2 faces: 1 circular base + 1 curved surface.'
  },
  {
    id: 'shape-3d-8',
    type: 'vocabulary',
    category: '3D Shapes',
    question: 'What is the flat surface of a 3D shape called?',
    options: ['A. Edge', 'B. Vertex', 'C. Face', 'D. Corner'],
    answer: 'C',
    explanation: 'A face is a flat surface of a 3D shape.'
  },
  {
    id: 'shape-3d-9',
    type: 'vocabulary',
    category: '3D Shapes',
    question: 'What is the line where two faces of a 3D shape meet?',
    options: ['A. Face', 'B. Vertex', 'C. Edge', 'D. Side'],
    answer: 'C',
    explanation: 'An edge is where two faces meet.'
  },
  {
    id: 'shape-3d-10',
    type: 'vocabulary',
    category: '3D Shapes',
    question: 'What is the point where edges meet on a 3D shape?',
    options: ['A. Face', 'B. Vertex', 'C. Edge', 'D. Apex'],
    answer: 'B',
    explanation: 'A vertex is a corner point where edges meet. (Plural: vertices)'
  }
]

// ============================================================================
// SECTION 7: Mixed Shape Questions
// ============================================================================

export const mixedShapeQuestions: ShapeQuestion[] = [
  {
    id: 'shape-mix-1',
    type: 'classify',
    category: 'Mixed',
    question: 'Which of these is a 2D shape?',
    options: ['A. Cube', 'B. Sphere', 'C. Hexagon', 'D. Cylinder'],
    answer: 'C',
    explanation: 'A hexagon is a 2D shape (flat). The others are all 3D shapes.'
  },
  {
    id: 'shape-mix-2',
    type: 'classify',
    category: 'Mixed',
    question: 'Which of these is a 3D shape?',
    options: ['A. Pentagon', 'B. Triangle', 'C. Circle', 'D. Pyramid'],
    answer: 'D',
    explanation: 'A pyramid is a 3D shape. Pentagon, triangle, and circle are all 2D.'
  },
  {
    id: 'shape-mix-3',
    type: 'properties',
    category: 'Mixed',
    question: 'What is the difference between a prism and a pyramid?',
    options: ['A. Prisms are 2D, pyramids are 3D', 'B. Prisms have two identical ends, pyramids have one base and come to a point', 'C. Prisms are always square, pyramids are always triangular', 'D. There is no difference'],
    answer: 'B',
    explanation: 'Prisms have two identical polygon ends connected by rectangular faces. Pyramids have one polygon base with triangular faces meeting at a point.'
  },
  {
    id: 'shape-mix-4',
    type: 'true_false',
    category: 'Mixed',
    question: 'True or False: A cube has more edges than a triangular prism.',
    options: ['A. True', 'B. False'],
    answer: 'A',
    explanation: 'True. A cube has 12 edges, a triangular prism has 9 edges.'
  },
  {
    id: 'shape-mix-5',
    type: 'properties',
    category: 'Mixed',
    question: 'Which shape has the most faces?',
    options: ['A. Triangular prism (5 faces)', 'B. Square-based pyramid (5 faces)', 'C. Cube (6 faces)', 'D. Tetrahedron (4 faces)'],
    answer: 'C',
    explanation: 'A cube has 6 faces, which is more than the other shapes listed.'
  },
  {
    id: 'shape-mix-6',
    type: 'classify',
    category: 'Mixed',
    question: 'A dice is an example of which shape?',
    options: ['A. Rectangular prism', 'B. Cube', 'C. Square-based pyramid', 'D. Tetrahedron'],
    answer: 'B',
    explanation: 'A standard dice is a cube with 6 square faces.'
  },
  {
    id: 'shape-mix-7',
    type: 'classify',
    category: 'Mixed',
    question: 'The Pyramids of Egypt are examples of which shape?',
    options: ['A. Triangular prisms', 'B. Tetrahedrons', 'C. Square-based pyramids', 'D. Cones'],
    answer: 'C',
    explanation: 'The Egyptian pyramids are square-based pyramids with a square base and 4 triangular faces.'
  },
  {
    id: 'shape-mix-8',
    type: 'classify',
    category: 'Mixed',
    question: 'A Toblerone chocolate box is shaped like a:',
    options: ['A. Rectangular prism', 'B. Triangular prism', 'C. Pyramid', 'D. Cylinder'],
    answer: 'B',
    explanation: 'A Toblerone box is a triangular prism with two triangular ends.'
  },
  {
    id: 'shape-mix-9',
    type: 'vocabulary',
    category: 'Mixed',
    question: 'What is the mathematical word for "corner"?',
    options: ['A. Edge', 'B. Face', 'C. Vertex', 'D. Angle'],
    answer: 'C',
    explanation: 'Vertex is the mathematical term for a corner or point.'
  },
  {
    id: 'shape-mix-10',
    type: 'properties',
    category: 'Mixed',
    question: 'Using the formula F + V - E = 2, if a shape has 6 faces and 8 vertices, how many edges does it have?',
    options: ['A. 10', 'B. 12', 'C. 14', 'D. 16'],
    answer: 'B',
    explanation: 'F + V - E = 2, so 6 + 8 - E = 2, therefore E = 12. This is Euler\'s formula!'
  }
]

// ============================================================================
// Combined exports
// ============================================================================

export const year5ShapeQuestions = {
  triangles: triangleQuestions,
  quadrilaterals: quadrilateralQuestions,
  polygons: polygonQuestions,
  prisms: prismQuestions,
  pyramids: pyramidQuestions,
  other3D: other3DQuestions,
  mixed: mixedShapeQuestions
}

// Flat array of all questions for easy iteration
export const allYear5ShapeQuestions: ShapeQuestion[] = [
  ...triangleQuestions,
  ...quadrilateralQuestions,
  ...polygonQuestions,
  ...prismQuestions,
  ...pyramidQuestions,
  ...other3DQuestions,
  ...mixedShapeQuestions
]

// Question count by category
export const year5ShapeStats = {
  triangles: triangleQuestions.length,
  quadrilaterals: quadrilateralQuestions.length,
  polygons: polygonQuestions.length,
  prisms: prismQuestions.length,
  pyramids: pyramidQuestions.length,
  other3D: other3DQuestions.length,
  mixed: mixedShapeQuestions.length,
  total: allYear5ShapeQuestions.length
}
