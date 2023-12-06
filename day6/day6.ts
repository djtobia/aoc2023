import { multipleRaces, singleRace } from "./input";
let totalMultRaces = 1;
let totalSingleRace = 0;
multipleRaces.forEach(race => {
  const [time, highScore] = race;
  let count = 0;

  for (let i = 0; i < time; i++) {
    const steps = time - i;
    if (steps * i > highScore) count++;
  }
  totalMultRaces *= count;
})
const [time, highScore] = singleRace[0];
for (let i = 0; i < time; i++) {
  const steps = time - i;
  if (steps * i > highScore) totalSingleRace++;
}

console.log("Part 1", totalMultRaces);
console.log("Part 2", totalSingleRace);

