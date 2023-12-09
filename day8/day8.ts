import { maps, instructions } from "./input";
import { NodeList, Node } from "./maps";
const Maps = new NodeList(maps.split("\n"));
let node: Node | undefined = Maps.findNode("AAA");

let count = 0;
while (node && node.value !== "ZZZ") {
  for (let i = 0; i < instructions.length; i++) {
    count++;
    const dir = instructions.charAt(i);
    switch (dir) {
      case 'L':
        node = Maps.findNode(node?.left);
        break;
      case 'R':
        node = Maps.findNode(node?.right);
        break;
    }
    if (node?.value === "ZZZ") break;
  }
}

console.log("Part 1:", count);
// Not gonna lie, I definitely cheated on this half a little bit
const nodesThatEndWithA = [...Maps.findNodesThatEndWithA()];

let pathLengths = [];
for (let i = 0; i < nodesThatEndWithA.length; i++) {
  let path = calculatePathsToGoal(nodesThatEndWithA[i]);
  pathLengths.push(path.length - 1);
}

function lcm(pathLengths: number[]) {
  const gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  return pathLengths.reduce((a, b) => a * b / gcd(a, b));
}

function calculatePathsToGoal(node: Node) {
  let found = false;
  let instruction = 0;
  let moves = [node]
  while (!found) {
    if (node.endsWithZ()) {
      found = true;
      break;
    }
    const dir = instructions.charAt(instruction);
    switch (dir) {
      case 'L':
        node = Maps.findNode(node?.left) as Node;
        moves.push(node);
        break;
      case 'R':
        node = Maps.findNode(node?.right) as Node
        moves.push(node);
        break;
    }

    if (instruction < instructions.length - 1) {
      instruction++;
    } else {
      instruction = 0;
    }
  }
  return moves;
}
console.log("Part 2", lcm(pathLengths));
