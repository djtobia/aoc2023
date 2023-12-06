import { maps, seedRanges } from "./input";
export function findLocationPart1(seed: number): number {
  let val = seed;

  for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < maps[i].length; j++) {
      const [destination, source, range] = maps[i][j];
      if (val >= source && val <= source + range) {
        const diff = val - source;
        val = destination + diff;
        break;
      }
    }
  }

  return val;
}


/*
  Following functions unused, but might come back to this problem in the
  future to optimize
*/
export function findLocationPart2(): number {
  //start with locations, and work backwards
  // lets start with locations to humidity
  let val = recurseBackwards(0, maps.length - 1);
  return val;
}

function recurseBackwards(val: number, mapIndex: number): number {
  if (mapIndex < 0) {
    return inSeedRange(val);
  }
  let found = false;
  for (let k = 0; k < maps[mapIndex].length; k++) {
    console.log("val passed up", val);
    console.log(maps[mapIndex][k]);
    let min = maps[mapIndex][k][0], max = maps[mapIndex][k][0] + maps[mapIndex][k][2], start = maps[mapIndex][k][1];
    console.log("min", min);
    console.log("max", max);


    if (val >= min && val <= max) {
      let diff = val - min - 1;
      diff < 0 ? diff = 0 : diff = diff;
      val = start + diff;
      found = true;
      break;
    }
  }
  return recurseBackwards(val, mapIndex - 1);
}


function inSeedRange(val: number): number {
  console.log(val);

  for (let i = 0; i < seedRanges.length; i++) {
    const min = seedRanges[i][0], max = seedRanges[i][0] + seedRanges[i][1];

    if (val >= min && val <= max) {
      console.log("seed range min", min, "seed range max", max);
      return val;
    }
  }
  return -1;
}