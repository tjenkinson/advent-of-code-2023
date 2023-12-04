import { input } from "./input.mjs";

const lines = input.split("\n");

const cards = lines.map((line) => {
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

  return { winningNumbers, myNumbers };
});

let res = 0;
for (const { winningNumbers, myNumbers } of cards) {
  const myWinningNumbers = myNumbers.filter((a) => winningNumbers.includes(a));
  res +=
    myWinningNumbers.length === 0
      ? 0
      : Math.pow(2, myWinningNumbers.length - 1);
}

console.log(res);
