export class Point {
  value: number;
  symbol: string;
  rows: number[];
  cols: number[];
  checked: boolean = false;
  gear: boolean = false;
  gearRatio: number = 0;
  constructor(rows: number[], cols: number[], value: number, symbol: string) {
    this.value = value;
    this.symbol = symbol;

    this.rows = rows;
    this.cols = cols;
  }

  setValue(value: number) {
    this.value = value;
  }

  setChecked() {
    this.checked = true;
  }

  setGearAndRatio(one: number, two: number) {
    this.gear = true;
    this.gearRatio = one * two;
  }
}

export class PointContainer {
  points: Point[] = [];
  addPoint(point: Point) {
    this.points.push(point);
  }

  lookupPoint(row: number, col: number) {
    const point = this.points.filter(point => {
      if (point.cols.includes(col) && point.rows.includes(row) && !point.checked) {
        point.setChecked();
        return true;
      }

      return false;
    })
    if (point.length) {
      return point[0].value;
    } else {
      return 0;
    }
  }
}