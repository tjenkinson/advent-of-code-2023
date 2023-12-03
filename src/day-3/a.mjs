import { input } from "./input.mjs";

const lines = input.split("\n");

const numbers = [];
const symbols = [];

for (const [y, line] of lines.entries()) {
  const chars = line.split("");
  let buffer = [];
  const flush = (x) => {
    if (buffer.length > 0) {
      numbers.push({
        x: x - buffer.length,
        y,
        value: parseInt(buffer.join("")),
        digitCount: buffer.length,
      });
      buffer = [];
    }
  };

  for (const [x, char] of chars.entries()) {
    if (/^\d$/.test(char)) {
      buffer.push(char);
    } else {
      flush(x);

      if (char !== ".") {
        symbols.push({ x, y });
      }
    }
  }
  flush(chars.length);
}

const symbolsSet = new Set(symbols.map(({ x, y }) => `${x}:${y}`));
const isSymbol = ({ x, y }) => {
  return symbolsSet.has(`${x}:${y}`);
};

const isNumberNearSymbol = ({ x: inX, y: inY, digitCount }) => {
  for (let x = inX - 1; x <= inX + digitCount; x++) {
    for (let y = inY - 1; y <= inY + 1; y++) {
      if (x >= inX && x < inX + digitCount && y === inY) continue;

      if (isSymbol({ x, y })) return true;
    }
  }
  return false;
};

let res = 0;
for (const number of numbers) {
  if (isNumberNearSymbol(number)) {
    res += number.value;
  }
}

console.log(res);
