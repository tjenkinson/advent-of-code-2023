import { input } from "./input.mjs";

const lines = input.split("\n");
let res = 0;

for (const line of lines) {
  const firstDigit = /\d/.exec(line)[0];
  const lastDigit = /\d/.exec(line.split("").reverse().join())[0];
  const number = parseInt(firstDigit + lastDigit);
  res += number;
}

console.log(res);
