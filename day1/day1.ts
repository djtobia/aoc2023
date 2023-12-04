import { input } from "./input";

let total = 0;
input.forEach(line => {
  let first = -1, last = -1;
  let num = 0;
  for (let i = 0; i < line.length; i++) {
    let isNum = parseInt(line[i]);
    if (isNum) {
      if (first === -1) {
        first = i;
        last = i;
      } else {
        last = i;
      }
    }
  }
  num = (parseInt(line[first]) * 10) + parseInt(line[last]);
  total += num;
})

console.log("Part 1:", total);

total = 0;
enum Nums {
  'one' = 'one',
  'two' = 'two',
  'three' = 'three',
  'four' = 'four',
  'five' = 'five',
  'six' = 'six',
  'seven' = 'seven',
  'eight' = 'eight',
  'nine' = 'nine'
}

// for each letter we have to check if it is one of the ones in the enum

input.forEach(line => {
  let first = -1, last = -1;

  for (let i = 0; i < line.length; i++) {
    if (parseInt(line[i])) {
      const num = parseInt(line[i]);
      if (first === -1) {
        first = num
        last = num;
      } else {
        last = num;
      }
    } else {
      const val = checkInDict(line, i);
      if (val !== -1) {
        if (first === -1) {
          first = val;
          last = val;
        } else {
          last = val;
        }
      }
    }
  }
  total += (first * 10) + last;
})

console.log("Part 2", total);

function checkInDict(line: string, startIndex: number): number {
  // using the start index, search for one of the symbols in the enum
  // check first char, then get substr(s) of that length based on first letter
  if (line[startIndex] === 'o') {
    if (line.substring(startIndex, startIndex + 3) === Nums.one) {
      return 1;
    }
  } else if (line[startIndex] === 't') {
    if (line.substring(startIndex, startIndex + 3) === Nums.two) {
      return 2;
    } else if (line.substring(startIndex, startIndex + 5) === Nums.three) {
      return 3;
    }
  } else if (line[startIndex] === 'f') {
    if (line.substring(startIndex, startIndex + 4) === Nums.four) {
      return 4;
    } else if (line.substring(startIndex, startIndex + 4) === Nums.five) {
      return 5;
    }
  } else if (line[startIndex] === 's') {
    if (line.substring(startIndex, startIndex + 3) === Nums.six) {
      return 6;
    } else if (line.substring(startIndex, startIndex + 5) === Nums.seven) {
      return 7;
    }
  } else if (line[startIndex] === 'e') {
    if (line.substring(startIndex, startIndex + 5) === Nums.eight) {
      return 8;
    }
  } else if (line[startIndex] === 'n') {
    if (line.substring(startIndex, startIndex + 4) === Nums.nine) {
      return 9;
    }
  }
  return -1;
}