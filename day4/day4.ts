import input from "./input";
let total = 0;
// for each card, count matches, total += 2^matches-1
const totalCards: number[] = new Array(Object.values(input).length + 1);
totalCards.fill(1);
totalCards[0] = 0;

for (const [index, game] of Object.entries(input)) {
  let count = 0;
  const [winningAsString, numbersAsString] = game.split("|");
  const winningNumbers = winningAsString.split(' ').filter(val => val !== '').map(num => parseInt(num.trim()));
  const numbers = numbersAsString.split(' ').filter(val => val !== '').map(num => parseInt(num));
  numbers.forEach(num => {
    if (winningNumbers.includes(num)) {
      count++;
    }
  })
  if (count !== 0) {
    const start = parseInt(index) + 1
    const amountToAdd = totalCards[parseInt(index)];
    for (let i = start; i < start + count; i++) {
      totalCards[i] += amountToAdd;
      total += Math.pow(2, count - 1);
    }
  }
}
console.log("Part 1", total);
console.log("Part 2", totalCards.reduce((a, b) => a + b, 0));