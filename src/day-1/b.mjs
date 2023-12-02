import { input } from "./input.mjs";
import { first, last } from "lodash-es";

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const regex = new RegExp(`^(?:${numbers.join("|")}|\\d)`);
const lines = input.split("\n");
let res = 0;

for (const line of lines) {
  const matches = [];
  for (let i = 0; i < line.length; i++) {
    const match = regex.exec(line.slice(i));
    if (match) matches.push(match[0]);
  }

  const firstDigit = numbers.includes(first(matches))
    ? numbers.indexOf(first(matches)) + 1
    : parseInt(first(matches));
  const lastDigit = numbers.includes(last(matches))
    ? numbers.indexOf(last(matches)) + 1
    : parseInt(last(matches));

  const number = parseInt(`${firstDigit}${lastDigit}`);

  res += number;
}

console.log(res);
