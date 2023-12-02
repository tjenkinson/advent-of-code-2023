import { input } from "./input.mjs";

const lines = input.split("\n");

const games = lines.map((line) => {
  const match = /^Game (\d+): (.*)$/.exec(line);
  const [, idRaw, actionsRaw] = match;
  const stages = actionsRaw.split(";").map((a) => a.trim());
  return {
    id: parseInt(idRaw),
    stages: stages.map((stage) => {
      const rounds = stage.split(",").map((a) => a.trim());
      return Object.fromEntries(
        rounds.map((round) => {
          const [countRaw, colour] = round.split(" ").map((a) => a.trim());
          return [colour, parseInt(countRaw)];
        }),
      );
    }),
  };
});

const powers = games.map(({ stages }) => {
  const mins = stages.reduce(
    (acc, { red = 0, green = 0, blue = 0 }) => {
      return {
        red: Math.max(acc.red, red),
        green: Math.max(acc.green, green),
        blue: Math.max(acc.blue, blue),
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
  return mins.red * mins.green * mins.blue;
});

const res = powers.reduce((acc, power) => acc + power, 0);
console.log(res);
