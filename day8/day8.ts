import { maps, instructions } from "./input";
import { NodeList, Node } from "./maps";
const Maps = new NodeList(maps.split("\n"));
let node: Node | undefined = Maps.nodes[0];

let count = 0;
console.log(Maps.findRight("ZZZ"))
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
  // console.log(node);
}

console.log("Part 1:", count);