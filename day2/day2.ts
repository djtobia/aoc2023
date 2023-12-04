import { input } from "./input";
// only allowed 12 red, 13 green, 14 blue
interface Colors {
  red: number;
  green: number;
  blue: number;
  [index: string]: number;
}
const colors: Colors = {
  red: 12,
  green: 13,
  blue: 14,
}
let total = 0;
for (const [game, value] of Object.entries(input)) {
  const values = value.split(";")
  let possible = true;
  for (let i = 0; i < values.length; i++) {
    const handfull = values[i].split(',').map(item => item.trim());
    for (let j = 0; j < handfull.length; j++) {
      const [num, color] = handfull[j].split(' ');
      const count = parseInt(num);
      if (count > colors[color]) {
        possible = false;
        break;
      }
      if (!possible) break;
    }
  }
  if (possible) total += parseInt(game);
}
console.log('Part 1', total)
total = 0;
for (const values of Object.values(input)) {
  const counts = new Map<string, number>([['red', 0], ['green', 0], ['blue', 0]]);
  const handfulls = values.split(';');
  for (let i = 0; i < handfulls.length; i++) {
    const handfull = handfulls[i].split(',').map(item => item.trim());
    for (let j = 0; j < handfull.length; j++) {
      const [count, color] = handfull[j].split(' ');
      let amount = parseInt(count);
      if (amount > counts.get(color)) {
        counts.set(color, amount);
      }
    }
  }
  let power = 1;
  for (const count of counts.values()) {
    power *= count;
  }
  total += power;
}
console.log("Part 2", total);
