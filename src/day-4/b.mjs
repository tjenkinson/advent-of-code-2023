import { input } from "./input.mjs";

const lines = input.split("\n");

const cards = lines.map((line, index) => {
  const [_, a] = line.split(":");
  const [b, c] = a.split("|");

  const winningNumbers = b
    .split(" ")
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a) => parseInt(a));

  const myNumbers = c
    .split(" ")
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a) => parseInt(a));

  return { winningNumbers, myNumbers, index };
});

const remainingCards = [...cards];

for (const card of remainingCards) {
  const { winningNumbers, myNumbers, index } = card;
  const myWinningNumbers = myNumbers.filter((a) => winningNumbers.includes(a));
  for (let i = 0; i < myWinningNumbers.length; i++) {
    remainingCards.push(cards[index + i + 1]);
  }
}

console.log(remainingCards.length);
