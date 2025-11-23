import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pdfParseModule = require('pdf-parse')

console.log('typeof pdfParseModule:', typeof pdfParseModule)
console.log('pdfParseModule keys:', Object.keys(pdfParseModule))
console.log('pdfParseModule.default:', typeof pdfParseModule.default)
console.log('pdfParseModule itself callable?:', typeof pdfParseModule === 'function')
