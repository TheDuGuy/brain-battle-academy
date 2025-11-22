export interface GameTheme {
  id: string
  progressCharacter: string
  progressStyle: 'runner' | 'racer' | 'eater' | 'flyer'
  obstacles: string[]
  lifeIcon: string
  emptyLifeIcon: string
}

export const gameThemes: Record<string, GameTheme> = {
  'quick-fire': {
    id: 'quick-fire',
    progressCharacter: '🏃',
    progressStyle: 'runner',
    obstacles: ['🚧', '🌳', '🏔️', '🏆'],
    lifeIcon: '❤️',
    emptyLifeIcon: '🖤'
  },
  'calculator-detective': {
    id: 'calculator-detective',
    progressCharacter: '🕵️',
    progressStyle: 'runner',
    obstacles: ['🔍', '📊', '🧮', '🏆'],
    lifeIcon: '💚',
    emptyLifeIcon: '🖤'
  },
  'quiz-master': {
    id: 'quiz-master',
    progressCharacter: '👻',
    progressStyle: 'eater',
    obstacles: ['•', '•', '•', '🏆'],
    lifeIcon: '💙',
    emptyLifeIcon: '🖤'
  },
  'fraction-master': {
    id: 'fraction-master',
    progressCharacter: '🚁',
    progressStyle: 'flyer',
    obstacles: ['☁️', '☁️', '☁️', '🏆'],
    lifeIcon: '💗',
    emptyLifeIcon: '🖤'
  },
  'power-numbers': {
    id: 'power-numbers',
    progressCharacter: '🏎️',
    progressStyle: 'racer',
    obstacles: ['🚧', '🌳', '🏔️', '🏆'],
    lifeIcon: '💛',
    emptyLifeIcon: '🖤'
  },
  'problem-solver': {
    id: 'problem-solver',
    progressCharacter: '🚲',
    progressStyle: 'runner',
    obstacles: ['📚', '📝', '🧩', '🏆'],
    lifeIcon: '💜',
    emptyLifeIcon: '🖤'
  },
  'vocabulary-builder': {
    id: 'vocabulary-builder',
    progressCharacter: '📖',
    progressStyle: 'runner',
    obstacles: ['📝', '✏️', '📚', '🏆'],
    lifeIcon: '💙',
    emptyLifeIcon: '🖤'
  },
  'synonym-finder': {
    id: 'synonym-finder',
    progressCharacter: '🔤',
    progressStyle: 'runner',
    obstacles: ['📖', '📝', '✍️', '🏆'],
    lifeIcon: '💚',
    emptyLifeIcon: '🖤'
  },
  'grammar-guardian': {
    id: 'grammar-guardian',
    progressCharacter: '✍️',
    progressStyle: 'runner',
    obstacles: ['📄', '📋', '✅', '🏆'],
    lifeIcon: '❤️',
    emptyLifeIcon: '🖤'
  },
  'spelling-ace': {
    id: 'spelling-ace',
    progressCharacter: '✏️',
    progressStyle: 'runner',
    obstacles: ['🔤', '📝', '✓', '🏆'],
    lifeIcon: '💛',
    emptyLifeIcon: '🖤'
  },
  'comprehension-master': {
    id: 'comprehension-master',
    progressCharacter: '🎓',
    progressStyle: 'runner',
    obstacles: ['📚', '🧠', '💡', '🏆'],
    lifeIcon: '💗',
    emptyLifeIcon: '🖤'
  },
  'word-analogies': {
    id: 'word-analogies',
    progressCharacter: '🧩',
    progressStyle: 'runner',
    obstacles: ['🔗', '💭', '🎯', '🏆'],
    lifeIcon: '💙',
    emptyLifeIcon: '🖤'
  },
  'letter-sequences': {
    id: 'letter-sequences',
    progressCharacter: '🔢',
    progressStyle: 'runner',
    obstacles: ['🔤', '📊', '➡️', '🏆'],
    lifeIcon: '💚',
    emptyLifeIcon: '🖤'
  },
  'word-codes': {
    id: 'word-codes',
    progressCharacter: '🔐',
    progressStyle: 'runner',
    obstacles: ['🔑', '🗝️', '🔓', '🏆'],
    lifeIcon: '💛',
    emptyLifeIcon: '🖤'
  },
  'odd-one-out': {
    id: 'odd-one-out',
    progressCharacter: '🎯',
    progressStyle: 'runner',
    obstacles: ['🔍', '👀', '✓', '🏆'],
    lifeIcon: '❤️',
    emptyLifeIcon: '🖤'
  },
  'logic-puzzles': {
    id: 'logic-puzzles',
    progressCharacter: '🧠',
    progressStyle: 'runner',
    obstacles: ['💡', '🤔', '✨', '🏆'],
    lifeIcon: '💜',
    emptyLifeIcon: '🖤'
  },
  'shape-patterns': {
    id: 'shape-patterns',
    progressCharacter: '🔷',
    progressStyle: 'runner',
    obstacles: ['○', '△', '□', '🏆'],
    lifeIcon: '💙',
    emptyLifeIcon: '🖤'
  },
  'number-sequences': {
    id: 'number-sequences',
    progressCharacter: '🔢',
    progressStyle: 'runner',
    obstacles: ['1️⃣', '2️⃣', '3️⃣', '🏆'],
    lifeIcon: '💚',
    emptyLifeIcon: '🖤'
  },
  'rotation-patterns': {
    id: 'rotation-patterns',
    progressCharacter: '🔄',
    progressStyle: 'runner',
    obstacles: ['↗️', '↘️', '↙️', '🏆'],
    lifeIcon: '💛',
    emptyLifeIcon: '🖤'
  },
  'shape-completion': {
    id: 'shape-completion',
    progressCharacter: '🧩',
    progressStyle: 'runner',
    obstacles: ['✓', '✓', '✓', '🏆'],
    lifeIcon: '❤️',
    emptyLifeIcon: '🖤'
  },
  'mirror-images': {
    id: 'mirror-images',
    progressCharacter: '🪞',
    progressStyle: 'runner',
    obstacles: ['⟷', '⟺', '⇄', '🏆'],
    lifeIcon: '💜',
    emptyLifeIcon: '🖤'
  }
}

export function getGameTheme(gameId: string): GameTheme {
  return gameThemes[gameId] || gameThemes['quick-fire']
}
