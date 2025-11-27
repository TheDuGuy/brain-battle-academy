/**
 * NVR SVG Components
 * Reusable SVG shapes for Non-Verbal Reasoning questions
 */

// Basic shape types
export type ShapeType =
  | 'square' | 'rectangle' | 'circle' | 'triangle' | 'diamond'
  | 'pentagon' | 'hexagon' | 'arrow' | 'star' | 'cross'
  | 'semicircle' | 'quarter-circle' | 'oval' | 'parallelogram'

export type FillType = 'solid' | 'empty' | 'striped' | 'dotted' | 'crosshatch' | 'gradient'

export type ShapeSize = 'small' | 'medium' | 'large'

// SVG viewBox is typically 100x100 for consistent sizing

// Basic shapes as SVG path/element generators
export const shapes = {
  square: (size: number = 60, fill: string = 'black') =>
    `<rect x="${(100-size)/2}" y="${(100-size)/2}" width="${size}" height="${size}" fill="${fill}" stroke="black" stroke-width="2"/>`,

  circle: (size: number = 60, fill: string = 'black') =>
    `<circle cx="50" cy="50" r="${size/2}" fill="${fill}" stroke="black" stroke-width="2"/>`,

  triangle: (size: number = 60, fill: string = 'black', direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
    const half = size / 2
    const paths = {
      up: `M50,${50-half} L${50+half},${50+half} L${50-half},${50+half} Z`,
      down: `M50,${50+half} L${50+half},${50-half} L${50-half},${50-half} Z`,
      left: `M${50-half},50 L${50+half},${50-half} L${50+half},${50+half} Z`,
      right: `M${50+half},50 L${50-half},${50-half} L${50-half},${50+half} Z`
    }
    return `<path d="${paths[direction]}" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  diamond: (size: number = 60, fill: string = 'black') =>
    `<path d="M50,${50-size/2} L${50+size/2},50 L50,${50+size/2} L${50-size/2},50 Z" fill="${fill}" stroke="black" stroke-width="2"/>`,

  pentagon: (size: number = 60, fill: string = 'black') => {
    const r = size / 2
    const points = Array.from({ length: 5 }, (_, i) => {
      const angle = (i * 72 - 90) * Math.PI / 180
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`
    }).join(' ')
    return `<polygon points="${points}" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  hexagon: (size: number = 60, fill: string = 'black') => {
    const r = size / 2
    const points = Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 90) * Math.PI / 180
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`
    }).join(' ')
    return `<polygon points="${points}" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  arrow: (size: number = 60, fill: string = 'black', direction: 'up' | 'down' | 'left' | 'right' = 'right') => {
    const rotations = { right: 0, down: 90, left: 180, up: 270 }
    return `<g transform="rotate(${rotations[direction]}, 50, 50)">
      <path d="M20,40 L60,40 L60,30 L80,50 L60,70 L60,60 L20,60 Z" fill="${fill}" stroke="black" stroke-width="2"/>
    </g>`
  },

  star: (size: number = 60, fill: string = 'black', points: number = 5) => {
    const outerR = size / 2
    const innerR = outerR * 0.4
    const starPoints = Array.from({ length: points * 2 }, (_, i) => {
      const angle = (i * 180 / points - 90) * Math.PI / 180
      const r = i % 2 === 0 ? outerR : innerR
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`
    }).join(' ')
    return `<polygon points="${starPoints}" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  cross: (size: number = 60, fill: string = 'black') => {
    const third = size / 3
    const start = (100 - size) / 2
    return `<path d="M${start+third},${start} L${start+2*third},${start} L${start+2*third},${start+third} L${start+size},${start+third} L${start+size},${start+2*third} L${start+2*third},${start+2*third} L${start+2*third},${start+size} L${start+third},${start+size} L${start+third},${start+2*third} L${start},${start+2*third} L${start},${start+third} L${start+third},${start+third} Z" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  semicircle: (size: number = 60, fill: string = 'black', direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
    const r = size / 2
    const rotations = { up: 0, right: 90, down: 180, left: 270 }
    return `<g transform="rotate(${rotations[direction]}, 50, 50)">
      <path d="M${50-r},50 A${r},${r} 0 0,1 ${50+r},50 Z" fill="${fill}" stroke="black" stroke-width="2"/>
    </g>`
  },

  oval: (size: number = 60, fill: string = 'black') =>
    `<ellipse cx="50" cy="50" rx="${size/2}" ry="${size/3}" fill="${fill}" stroke="black" stroke-width="2"/>`,

  parallelogram: (size: number = 60, fill: string = 'black') => {
    const offset = size / 4
    return `<path d="M${50-size/2+offset},${50-size/3} L${50+size/2+offset},${50-size/3} L${50+size/2-offset},${50+size/3} L${50-size/2-offset},${50+size/3} Z" fill="${fill}" stroke="black" stroke-width="2"/>`
  },

  // L-shape
  lShape: (size: number = 60, fill: string = 'black') => {
    const half = size / 2
    const third = size / 3
    return `<path d="M${50-half},${50-half} L${50-half+third},${50-half} L${50-half+third},${50+half-third} L${50+half},${50+half-third} L${50+half},${50+half} L${50-half},${50+half} Z" fill="${fill}" stroke="black" stroke-width="2"/>`
  }
}

// Fill patterns
export const patterns = {
  striped: (id: string, color: string = 'black') => `
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="8">
        <line x1="0" y1="0" x2="8" y2="8" stroke="${color}" stroke-width="1"/>
      </pattern>
    </defs>`,

  dotted: (id: string, color: string = 'black') => `
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="10" height="10">
        <circle cx="5" cy="5" r="2" fill="${color}"/>
      </pattern>
    </defs>`,

  crosshatch: (id: string, color: string = 'black') => `
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="8">
        <line x1="0" y1="0" x2="8" y2="8" stroke="${color}" stroke-width="1"/>
        <line x1="8" y1="0" x2="0" y2="8" stroke="${color}" stroke-width="1"/>
      </pattern>
    </defs>`,

  horizontalLines: (id: string, color: string = 'black') => `
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="10" height="6">
        <line x1="0" y1="3" x2="10" y2="3" stroke="${color}" stroke-width="2"/>
      </pattern>
    </defs>`,

  verticalLines: (id: string, color: string = 'black') => `
    <defs>
      <pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="10">
        <line x1="3" y1="0" x2="3" y2="10" stroke="${color}" stroke-width="2"/>
      </pattern>
    </defs>`
}

// Helper to create an SVG wrapper
export function createSVG(content: string, size: number = 100): string {
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`
}

// Helper to combine multiple shapes
export function combineShapes(...shapes: string[]): string {
  return shapes.join('')
}

// Transform helpers
export function rotate(content: string, degrees: number, cx: number = 50, cy: number = 50): string {
  return `<g transform="rotate(${degrees}, ${cx}, ${cy})">${content}</g>`
}

export function translate(content: string, dx: number, dy: number): string {
  return `<g transform="translate(${dx}, ${dy})">${content}</g>`
}

export function scale(content: string, sx: number, sy: number = sx): string {
  return `<g transform="scale(${sx}, ${sy})">${content}</g>`
}

export function flip(content: string, axis: 'horizontal' | 'vertical'): string {
  if (axis === 'horizontal') {
    return `<g transform="scale(-1, 1) translate(-100, 0)">${content}</g>`
  }
  return `<g transform="scale(1, -1) translate(0, -100)">${content}</g>`
}

// Small shape positioned at specific location
export function positionedShape(
  shapeFn: () => string,
  x: number,
  y: number,
  scale: number = 0.3
): string {
  return `<g transform="translate(${x - 50 * scale}, ${y - 50 * scale}) scale(${scale})">${shapeFn()}</g>`
}

// Common compound shapes for NVR
export const compoundShapes = {
  // Circle with dot in center
  circleWithDot: (size: number = 60, fill: string = 'none') =>
    shapes.circle(size, fill) + shapes.circle(8, 'black'),

  // Triangle with small shape inside
  triangleWithShape: (innerShape: string, size: number = 60) =>
    shapes.triangle(size, 'none') + `<g transform="translate(0, 8) scale(0.4)">${innerShape}</g>`,

  // Square divided diagonally
  squareDiagonal: (size: number = 60, topFill: string = 'black', bottomFill: string = 'white') => {
    const half = size / 2
    const start = (100 - size) / 2
    return `
      <path d="M${start},${start} L${start+size},${start} L${start},${start+size} Z" fill="${topFill}" stroke="black" stroke-width="2"/>
      <path d="M${start+size},${start} L${start+size},${start+size} L${start},${start+size} Z" fill="${bottomFill}" stroke="black" stroke-width="2"/>
    `
  },

  // Concentric circles
  concentricCircles: (count: number = 3, outerSize: number = 60) => {
    const step = outerSize / (count * 2)
    return Array.from({ length: count }, (_, i) =>
      shapes.circle(outerSize - i * step * 2, i % 2 === 0 ? 'black' : 'white')
    ).join('')
  }
}
