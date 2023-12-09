export class NodeList {
  nodes: Node[] = [];

  constructor(map: string[]) {
    map.forEach(map => {
      const [value, directions] = map.split(" = ");
      const [left, right] = directions.split(", ").map((val, index) => {
        if (index === 0) {
          return val.substring(1);
        } else {
          return val.substring(0, val.length - 1);
        }
      })
      this.nodes.push(new Node(value, left, right));
    })
  }

  findNode(value: string | undefined): Node | undefined {
    if (!value) return undefined;
    return this.nodes.find((node) => node.value === value);
  }
  findLeft(left: string): Node | undefined {
    if (!left) return undefined
    return this.nodes.find(node => node.left === left);
  }
  findRight(right: string): Node | undefined {
    if (!right) return undefined;
    return this.nodes.find(node => node.right === right);
  }

  findNodesThatEndWithA() {
    return this.nodes.filter(node => node.value.charAt(2) === 'A');
  }


}

export class Node {
  value: string;
  left: string
  right: string
  constructor(value: string, left: string, right: string) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  endsWithZ() {
    return this.value.charAt(2) === "Z";
  }
}