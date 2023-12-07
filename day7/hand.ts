interface CardVals {
  [index: string]: number;
}
export const cardValsNoJoker: CardVals = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

export const cardValsJoker: CardVals = {
  'J': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'Q': 12,
  'K': 13,
  'A': 14
}


enum HandType {
  "five" = 6,
  "four" = 5,
  "fullHouse" = 4,
  "three" = 3,
  "two" = 2,
  "one" = 1,
  "high" = 0
}

class Card {
  card: string;
  matched: boolean = false;
  constructor(card: string) {
    this.card = card;
  }

  setMatched() {
    this.matched = true;
  }
}

export class Hand {
  type: HandType;
  jokerType: HandType;
  hand: string;
  bid: number;
  constructor(hand: string, bid: number) {
    this.hand = hand;
    this.bid = bid;
    this.type = this.figureOutType(hand);
    this.jokerType = this.figureOutJokerType(hand);
  }

  figureOutJokerType(hand: string): HandType {

    const handArray = hand.split('').sort((a, b) => cardValsJoker[b] - cardValsJoker[a]);
    const cards: Map<string, number> = new Map();
    for (const card of Object.keys(cardValsJoker) {
      cards.set(card, 0);
    }
    handArray.forEach(card => {
      const val: number = cards.get(card) as number;
      cards.set(card, val + 1);
    })
    let card = '', count = 0;
    const jokers = cards.get("J");
    cards.forEach((value, key) => {
      if (key === 'J') { }
      else {
        if (value > count) {
          count = value;
          card = key;
        } else if (value === count) {
          card = cardValsJoker[card] > cardValsJoker[key] ? card : key
        }
      }
    })

    // if the count is 1, that means its a high card hand, replace J's with the card
    const replacedJokers = handArray.map(a => {
      if (a === "J") return card;
      return a;
    })
    return this.figureOutType(replacedJokers.join(''));
  }

  figureOutType(hand: string): HandType {
    // sort the hand first?

    const cards: Card[] = [];
    hand.split('').sort().forEach(card => { cards.push(new Card(card)) });

    let pairs = 0;
    let three = 0;
    for (let i = 0; i < cards.length; i++) {
      let matches = 0;
      let card = cards[i].card;
      for (let j = i + 1; j < hand.length; j++) {
        if (cards[j].card === card && !cards[j].matched) {
          cards[j].setMatched();
          matches++;
        }
      }
      if (matches === 4) {
        return HandType.five;
      } else if (matches === 3) {
        return HandType.four;
      } else if (matches === 2) {
        three++;
      }
      else if (matches === 1) {
        pairs++;
      }
    }

    if (three === 1 && pairs === 1) {
      return HandType.fullHouse;
    } else if (three === 1) {
      return HandType.three;
    } else if (pairs === 2) {
      return HandType.two;
    } else if (pairs === 1) {
      return HandType.one;
    }

    return HandType.high;
  }
}