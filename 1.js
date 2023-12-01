const { readFileSync } = require('fs')

const txt = readFileSync('./1-input.txt', {encoding: 'utf-8'})
const lines = txt.split('\n')
const digitRegex = new RegExp(/\d/)
const digitWordRegex = new RegExp(/(one|two|three|four|five|six|seven|eight|nine)/)
const digitAllRegex = new RegExp(/(one|two|three|four|five|six|seven|eight|nine|\d)/)
const globalDigitAllRegex = new RegExp(digitAllRegex, 'g')
const wordToDigit = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}
const extractAllDigits = (st) => {
  const digits = []
  const regex = new RegExp(globalDigitAllRegex)
  let match
  while ((match = regex.exec(st)) != null) {
    const digitSt = match[1]
    regex.lastIndex -= digitSt.length - 1
    digits.push(digitSt)
  }
  return digits
}
let sum = 0


// --- Day 1: Trebuchet?! ---

sum = 0
for (let line of lines) {
  let firstDigit = null
  let lastDigit = null
  let finalValue = null
  for (const char of line) {
    if (!digitRegex.test(char)) continue
    firstDigit ??= char
    lastDigit = char
  }

  finalValue = Number(firstDigit + lastDigit)
  sum += finalValue
}

console.log(sum)


// --- Part Two ---

sum = 0
for (let line of lines) {
  let firstDigit = null
  let lastDigit = null
  let finalValue = null

  const digits = extractAllDigits(line)

  firstDigit = digits.at(0)
  lastDigit = digits.at(-1)

  if (!digitRegex.test(firstDigit)) firstDigit = wordToDigit[firstDigit]
  if (!digitRegex.test(lastDigit)) lastDigit = wordToDigit[lastDigit]

  finalValue = Number(firstDigit + lastDigit)
  sum += finalValue
}

console.log(sum)
