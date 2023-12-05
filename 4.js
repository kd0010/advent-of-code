const { readFileSync } = require('fs')

const txt = readFileSync('./4-input.txt', {encoding: 'utf-8'}).slice(0, -1)
const lines = txt.split('\n')
const cardsInPossession = {}
let pointsSum = 0


// --- Day 4: Scratchcards ---

for (const line of lines) {
  const cardNr = Number(line.match(/\d+/)[0])
  cardsInPossession[cardNr] ??= 1
  
  let numBeginIdx = line.indexOf(':') + 2
  let [winningNums, myNums] = line.slice(numBeginIdx).replaceAll('  ', ' ').split(' | ')

  winningNums = winningNums.split(' ')
  myNums = myNums.split(' ')

  let cardPoints = 0
  for (const num of myNums) {
    if (winningNums.includes(num)) cardPoints++
  }

  if (cardPoints > 0) pointsSum += 2 ** (cardPoints - 1)

  for (let wonCardNr = cardNr + 1; wonCardNr <= cardNr + cardPoints; wonCardNr++) {
    const currCardAmt = cardsInPossession[cardNr] ?? 1
    cardsInPossession[wonCardNr] = (cardsInPossession[wonCardNr] ?? 1) + 1 * currCardAmt
  }
}

console.log(pointsSum)


// --- Part Two ---

const totalScratchcardsAmount = Object.values(cardsInPossession).reduce((sum, val) => sum += val, 0)
console.log(totalScratchcardsAmount)
