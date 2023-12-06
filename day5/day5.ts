import { seeds, seedRanges } from "./input";
import { findLocationPart1 } from "./day5helpers";
let smallestLocation = Infinity;

seeds.forEach(seed => {
  const location = findLocationPart1(seed);
  if (location < smallestLocation) {
    smallestLocation = location;
  }
});
console.log("Part 1", smallestLocation);

smallestLocation = Infinity;
seedRanges.forEach((seedRange) => {
  const [start, range] = seedRange;
  for (let i = start; i < start + range; i++) {
    const location = findLocationPart1(i);
    if (location < smallestLocation) {
      smallestLocation = location;
    }
  }
})
console.log("Part 2", smallestLocation);
