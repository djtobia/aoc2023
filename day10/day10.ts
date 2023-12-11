// build input array of nodes, then search for the S
// after the whole map is made, and we have the S, breadth first traversal
import input from "./input";

class Node {
  char: string;
  value: number = 0;
  visited: boolean = false;
  isStart: boolean;
  row: number;
  col: number;
  constructor(char: string, row: number, col: number, start: boolean = false) {
    this.char = char;
    this.row = row;
    this.col = col;
    this.isStart = start;
  }
  setValue(val: number) {
    this.value = val;
  }

  setVisited() { this.visited = true; }
}
const map: Node[][] = [];
let startRow: number = -1, startColumn: number = -1;
input.split('\n').forEach((line, row) => {
  const rowArray: Node[] = [];
  line.split('').forEach((char, col) => {
    let node: Node;
    if (char === "S") {
      startRow = row;
      startColumn = col;
      node = new Node(char, row, col, true)
    } else {
      node = new Node(char, row, col);
    }
    rowArray.push(node);
  })
  map.push(rowArray)
})


const bfsQueue: Node[] = checkAround(map[startRow][startColumn].char, startRow, startColumn);
// first, find two connect pipes, and add them to the bfs queue
// check left, those chars can be -,L, F

let val = 1;
let count = 0;
while (bfsQueue.length) {
  const node = bfsQueue.shift() as Node;
  node.setValue(val);
  node.setVisited();
  // check around it for nodes attached
  const row = node.row;
  const col = node.col;
  const newNodes = checkAround(node.char, row, col);
  bfsQueue.push(...newNodes);
  count++;
  if (count == 2) {
    val++;
    count = 0
  }
}

console.log("Part 1", count === 0 ? val - 1 : val)

function checkAround(char: string, row: number, col: number): Node[] {
  const nodes: Node[] = [];
  const left = col - 1;
  if (left >= 0 && canGo("l", char)) {
    const node = map[row][left];
    switch (node.char) {
      case "-":
      case "L":
      case "F":
        if (!node.visited) {
          nodes.push(node);
        }
        break;
    }
  }
  // check up, those chars can be F,|,7
  const up = row - 1;
  if (up >= 0 && canGo("u", char)) {
    const node = map[up][col];
    switch (node.char) {
      case "7":
      case "|":
      case "F":
        if (!node.visited) {
          nodes.push(node);
        }
        break;
    }
  }
  // check right, those chars can be 7,-,J
  const right = col + 1;
  if (right < map[0].length && canGo("r", char)) {
    const node = map[row][right];
    switch (node.char) {
      case "7":
      case "-":
      case "J":
        if (!node.visited) {
          nodes.push(node);
        }
        break;
    }
  }
  // check down, those chars can be L,|,J
  const down = row + 1;
  if (down < map[0].length && canGo("d", char)) {
    const node = map[down][col];
    switch (node.char) {
      case "L":
      case "|":
      case "J":
        if (!node.visited) {
          nodes.push(node);
        }
        break;
    }
  }

  return nodes;
}

function canGo(dir: string, char: string): boolean {
  if (char === "S") return true;
  switch (dir) {
    case "l":
      if (char === "7" || char === "-" || char === "J")
        return true;
      break;
    case "r":
      if (char === "-" || char === "L" || char === "F")
        return true;
      break;
    case "u":
      if (char === "|" || char === "J" || char === "L")
        return true;
      break;
    case "d":
      if (char === "|" || char === "F" || char == "7")
        return true;
      break;
  }
  return false;
}

// map.forEach(line => {
//   line.forEach(node => {
//     console.log(node)
//   })
//   console.log("\n");
// })