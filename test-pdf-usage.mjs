import fs from 'fs'
const module = await import('pdf-parse')

console.log('Testing PDFParse class...')
const PDFParse = module.PDFParse

const testFile = '/Users/edoumota/Downloads/11+ papers/Maths 4.pdf'
if (fs.existsSync(testFile)) {
  const dataBuffer = fs.readFileSync(testFile)

  console.log('Attempt 1: new PDFParse()')
  try {
    const parser = new PDFParse()
    console.log('parser:', parser)
    console.log('parser methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)))
  } catch (e) {
    console.log('Error:', e.message)
  }

  console.log('\nAttempt 2: PDFParse as function')
  try {
    const result = await PDFParse(dataBuffer)
    console.log('Success! Result keys:', Object.keys(result))
  } catch (e) {
    console.log('Error:', e.message)
  }
} else {
  console.log('Test file not found')
}
