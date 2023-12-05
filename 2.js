const { readFileSync } = require('fs')

const txt = readFileSync('./2-input.txt', {encoding: 'utf-8'}).slice(0, -1)
const lines = txt.split('\n')
const maxes = {
  red: 12,
  green: 13,
  blue: 14,
}
let gameIdsSum = 0
let powerSum = 0


// --- Day 2: Cube Conundrum ---

for (let line of lines) {
  // add an artificial semicolon at the end to make the following while-loop work
  line += ';'

  let isGamePossible = true
  const fewest = {red: 0, green: 0, blue: 0}

  let cursor = 5
  let colonIndex = line.indexOf(':')

  const gameId = line.slice(cursor, colonIndex)

  cursor = colonIndex + 2

  let semicolonIndex
  while ((semicolonIndex = line.indexOf(';', semicolonIndex + 1)) != -1) {
    let cubeSubsetSt = line.slice(cursor, semicolonIndex)
    cursor = semicolonIndex + 2

    const cubeSubset = cubeSubsetSt.split(', ')
    for (let cubeAmount of cubeSubset) {
      let [amount, cubeColor] = cubeAmount.split(' ')
      amount = Number(amount)

      if (amount > maxes[cubeColor]) isGamePossible = false // le disproving
      if (amount > fewest[cubeColor]) fewest[cubeColor] = amount
    }
  }

  if (isGamePossible) gameIdsSum += Number(gameId)
  let power = fewest.red * fewest.green * fewest.blue
  powerSum += power
}

console.log(gameIdsSum)
console.log(powerSum)
