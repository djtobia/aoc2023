import input from "./input";
import { Point, PointContainer } from "../helpers/2d";
const formattedInput = input.map(line => line[0].split(''));
const valueContainer = new PointContainer();
const symbolContainer = new PointContainer();

formattedInput.forEach((line, index) => {
  for (let i = 0; i < line.length; i++) {
    // if it is a symbol that is not a dot, add to symbol container
    // if it is a number, slide that window, baby
    if (line[i] === '.')
      continue;
    if (Number.isNaN(parseInt(line[i]))) {
      symbolContainer.addPoint(new Point([index], [i], 0, line[i]));
    } else {
      // get the full value by sliding the window until you hit a . or end of line
      const cols: number[] = [i];
      let value = line[i];
      for (let j = i + 1; j <= line.length; j++) {
        if (j === line.length || Number.isNaN(parseInt(line[j]))) {
          valueContainer.addPoint(new Point([index], cols, parseInt(value), ''));
          i = j - 1;
          break;
        } else {
          cols.push(j);
          value += line[j];
        }
      }
    }
  }
})

// for each symbol, check in the points container for all values that are next to it, and add them up
let total = 0;
symbolContainer.points.forEach(point => {
  // all directions
  // top left
  const symbol = point.symbol;
  const partNumbers: number[] = [];
  let row = point.rows[0] - 1;
  let col = point.cols[0] - 1;

  let val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  col++;

  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  col++;
  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  row++;
  col = point.cols[0] - 1;
  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  col += 2;
  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  row++;
  col = point.cols[0] - 1;
  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  col++;
  val = valueContainer.lookupPoint(row, col);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  col++;
  val = valueContainer.lookupPoint(row, col);

  // console.log(row, col, val);
  if (val) {
    total += val;
    partNumbers.push(val);
  }
  if (symbol === '*' && partNumbers.length === 2) {
    point.setGearAndRatio(partNumbers[0], partNumbers[1]);
  }
})


console.log("Part 1", total)
total = 0;
symbolContainer.points.forEach(point => {
  if (point.gear) {
    total += point.gearRatio;
  }
})
console.log("Part 2", total);
