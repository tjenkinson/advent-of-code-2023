import { input } from "./input.mjs";

const lines = input.split("\n");

const numbers = [];
const gears = [];

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

      if (char === "*") {
        gears.push({ x, y });
      }
    }
  }
  flush(chars.length);
}

const gearsMap = new Map(gears.map((gear) => [`${gear.x}:${gear.y}`, gear]));
const getGear = ({ x, y }) => {
  return gearsMap.get(`${x}:${y}`);
};

const getNearGear = ({ x: inX, y: inY, digitCount }) => {
  for (let x = inX - 1; x <= inX + digitCount; x++) {
    for (let y = inY - 1; y <= inY + 1; y++) {
      if (x >= inX && x < inX + digitCount && y === inY) continue;

      const gear = getGear({ x, y });
      if (gear) return gear;
    }
  }
  return null;
};

const gearToNumbers = new Map();

for (const number of numbers) {
  const gear = getNearGear(number);
  if (gear) {
    const gearNumbers = gearToNumbers.get(gear) || [];
    gearToNumbers.set(gear, [...gearNumbers, number]);
  }
}

let res = 0;
for (const [gear, numbers] of gearToNumbers) {
  if (numbers.length === 2) {
    res += numbers[0].value * numbers[1].value;
  }
}

console.log(res);
