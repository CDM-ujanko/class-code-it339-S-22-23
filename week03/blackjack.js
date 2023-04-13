import { Deck } from "./cards.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

let deck = new Deck();
deck.shuffle();

let dealer = 0;

while(dealer < 15) {
    let card = deck.giveOne();
    console.log(`Dealer got ${card}`);
    dealer += card;
}

console.log(`Dealer is at: ${dealer}`);

if (dealer > 21) {
    console.log(`Congrats, you win!`);
    process.exit(1);
}

let card = deck.giveOne();
console.log(`You got ${card}`);
let user = card.valueOf();

let input = prompt('Type HIT t get a new card. ');
while(input.toLocaleLowerCase() === 'hit') {
    let c = deck.giveOne();
    user += c;
    console.log(`You got ${c}, total: ${user}`);
    input = prompt('HIT/STOP? ');
}

if (user > 21) {
    console.log(`Better luch next time!:(`);
    process.exit(1);
}

if (user > dealer) {
    console.log(`Congrats, you win!`);
} else if (dealer > user) {
    console.log(`Better luck next time!:(`);
} else {
    console.log(`Its a draw!`);
}
