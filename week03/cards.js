class Card {
    value;
    suite;

    constructor(value, suite) {
        this.value = value;
        this.suite = suite;
    }

    valueOf() {
        return this.value;
    }
}

class Deck {
    deck = [];
    #suits = ['C', 'D', 'H', 'S'];

    constructor() {
        for (let i = 1; i < 15; i++) {
            if (i === 11) {
                continue;
            }
            for( let s in this.#suits) {
                this.deck.push(new Card(i, s))
            }
        }
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }

    giveOne() {
        return this.deck.pop();
    }
}

let deck = new Deck();
deck.shuffle();

let p1 = deck.giveOne();
let p2 = deck.giveOne();
console.log(deck, p1, p2);

if (p1 > p2) {
    console.log('Player one wins!');
} else if (p2 > p1) {
    console.log('Player two wins!');
} else {
    console.log('Its a draw!')
}
