import input from "./input";

// for each array, build a new array of the values differences till you make a row of all zeroes
let total = 0;
// forward
input.forEach(history => {
  //make array copy
  const historyCopy: number[][] = [[...history]];
  let diff = Infinity;
  while (diff !== 0) {
    const [newRow, newDiff] = buildSubArrays(diff, historyCopy.at(-1));
    historyCopy.push(newRow);
    diff = newDiff;
  }
  // now go backwards, adding the sum of the last item in the last array, to the last item to the array before it, and then adding that number to the array before it
  for (let i = historyCopy.length - 2; i >= 0; i--) {
    const num1: number = historyCopy[i].at(-1), num2: number = historyCopy[i + 1].at(-1);
    historyCopy[i].push(num1 + num2);
  }
  total += historyCopy[0].at(-1);
})

console.log("Part 1", total);
total = 0;
//backwards
input.forEach(history => {
  //make array copy
  const historyCopy: number[][] = [[...history]];
  let diff = Infinity;
  while (diff !== 0) {
    const [newRow, newDiff] = buildSubArrays(diff, historyCopy.at(-1));
    historyCopy.push(newRow);
    diff = newDiff;
  }
  // now go backwards, adding the sum of the last item in the last array, to the last item to the array before it, and then adding that number to the array before it
  for (let i = historyCopy.length - 2; i >= 0; i--) {
    const num1: number = historyCopy[i][0], num2: number = historyCopy[i + 1][0];
    historyCopy[i].unshift(num1 - num2);
  }
  total += historyCopy[0][0];
})


console.log("Part 2", total);


function buildSubArrays(diff: number, historyRow: number[]): [number[], number] {
  let newRow: number[];
  newRow = []
  for (let i = 1; i < historyRow.length; i++) {
    const num1 = historyRow[i], num2 = historyRow[i - 1];
    diff = num1 - num2
    newRow.push(diff);
  }

  return [newRow, diff];
}
