const { readFileSync } = require('fs')

const txt = readFileSync('./3-input.txt', {encoding: 'utf-8'})
const lines = txt.split('\n')
const symbolRegex = /[\-\&\/\*\@\#\%\+\$\=]{1}/
const digitRegex = /\d/
const gearSymbol = '*'
const gearCandidates = {}
const createGearCandidateId = (lineIdx, charIdx) => `${lineIdx}_${charIdx}`
let partNumSum = 0
let gearMultiplicationsSum = 0


// --- Day 3: Gear Ratios ---

for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  const prevLine = lines[lineIdx - 1]
  const currLine = lines[lineIdx]
  const nextLine = lines[lineIdx + 1]
  let currNum = ''
  let isPartNum = false
  let gearSymbolId = null

  for (let charIdx = 0; charIdx < currLine.length; charIdx++) {
    const abveChar = prevLine?.at(charIdx)
    const currChar = currLine[charIdx]
    const belwChar = nextLine?.at(charIdx)
    const isPrevCharNum = digitRegex.test(currLine[charIdx - 1])
    const isCurrCharNum = digitRegex.test(currChar)
    const isNextCharNum = digitRegex.test(currLine[charIdx + 1])
    const isAnySymbolPresentInCol = (indexOffset) => {
      let idx = charIdx + indexOffset
      return (
        symbolRegex.test(prevLine?.at(idx)) ||
        symbolRegex.test(nextLine?.at(idx)) ||
        symbolRegex.test(currLine[idx])
      )
    }
    const getGearSymbolIdInCol = (indexOffset) => {
      let idx = charIdx + indexOffset
      if (prevLine?.at(idx) == gearSymbol) return createGearCandidateId(lineIdx - 1, idx)
      if (nextLine?.at(idx) == gearSymbol) return createGearCandidateId(lineIdx + 1, idx)
      if (currLine[idx] == gearSymbol) return createGearCandidateId(lineIdx, idx)
      return null
    }

    if (isCurrCharNum == false) continue // modular; only around actual num

    currNum += currChar

    if (currNum.length == 1) {
      isPartNum ||= isAnySymbolPresentInCol(-1)
      gearSymbolId ||= getGearSymbolIdInCol(-1)
    }
    if (isNextCharNum == false) {
      isPartNum ||= isAnySymbolPresentInCol(+1)
      gearSymbolId ||= getGearSymbolIdInCol(+1)
    }
    isPartNum ||= isAnySymbolPresentInCol(0)
    gearSymbolId ||= getGearSymbolIdInCol(0)

    if (isNextCharNum == false) {
      // commit and reset
      const num = Number(currNum)
      if (isPartNum) partNumSum += num
      if (gearSymbolId != null) {
        if (gearCandidates[gearSymbolId] == null) gearCandidates[gearSymbolId] = []
        gearCandidates[gearSymbolId].push(num)
      }
      currNum = ''
      isPartNum = false
      gearSymbolId = null
    }
  }
}

console.log(partNumSum)


// --- Part Two ---

for (const gearCandidateId in gearCandidates) {
  const nums = gearCandidates[gearCandidateId]
  if (nums.length != 2) continue

  const [num1, num2] = nums
  const product = num1 * num2
  gearMultiplicationsSum += product
}

console.log(gearMultiplicationsSum)
