import inputs from "./input";
import { Hand, cardValsJoker, cardValsNoJoker } from "./hand";


const hands: Hand[] = [];
inputs.forEach(input => {
  const [hand, bid] = input.split(' ');
  hands.push(new Hand(hand, parseInt(bid)));
})

hands.sort((a, b) => {
  if (a.type > b.type) {
    return 1;
  } else if (b.type > a.type) {
    return -1;
  } else {
    // compare cards
    for (let i = 0; i < 5; i++) {
      const aVal = cardValsNoJoker[a.hand.charAt(i)];
      const bVal = cardValsNoJoker[b.hand.charAt(i)];
      if (aVal > bVal) {
        return 1;
      } else if (bVal > aVal) {
        return -1
      }
      continue;
    }
    return 0;
  }
})

let total = 0;

for (let i = 0; i < hands.length; i++) {
  total += hands[i].bid * (i + 1)
}
console.log("Part 1", total);

hands.sort((a, b) => {
  if (a.jokerType > b.jokerType) {
    return 1;
  } else if (b.jokerType > a.jokerType) {
    return -1;
  } else {
    // compare cards
    for (let i = 0; i < 5; i++) {
      const aVal = cardValsJoker[a.hand.charAt(i)];
      const bVal = cardValsJoker[b.hand.charAt(i)];
      if (aVal > bVal) {
        return 1;
      } else if (bVal > aVal) {
        return -1
      }
      continue;
    }
    return 0;
  }
})
total = 0
for (let i = 0; i < hands.length; i++) {
  total += hands[i].bid * (i + 1)
}
console.log("Part 2", total);
