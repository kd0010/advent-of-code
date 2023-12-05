const { readFileSync } = require('fs')

const txt = readFileSync('./5-input.txt', {encoding: 'utf-8'}).slice(0, -1)
const blocks = txt.split('\n\n')
const seedsText = blocks[0]
const maps = blocks.slice(1)
const seedNums = seedsText.slice(seedsText.indexOf(':') + 2).split(' ').map(Number)
let lowestLocationNum = null


// --- Day 5: If You Give A Seed A Fertilizer ---

for (const seedPos of seedNums) {
  let nextPassageNum = null
  for (const map of maps) {
    const lines = map.split('\n').slice(1)
    const currPassageNum = nextPassageNum ?? seedPos
  
    for (const line of lines) {
      let [beginPosDest, beginPosSrc, range] = line.split(' ').map(Number)

      if (
        currPassageNum < beginPosSrc ||
        currPassageNum >= beginPosSrc + range
      ) {
        nextPassageNum = currPassageNum
      } else {
        nextPassageNum = beginPosDest + (currPassageNum - beginPosSrc)
        break // found the instruction that fits
      }
    }
  }

  const location = nextPassageNum
  lowestLocationNum ??= location
  lowestLocationNum = Math.min(lowestLocationNum, location)
}

console.log(lowestLocationNum)
