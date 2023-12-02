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

const possible = games.filter(({ id, stages }) => {
  return stages.every(({ red = 0, green = 0, blue = 0 }) => {
    return red <= 12 && green <= 13 && blue <= 14;
  });
});

const res = possible.reduce((acc, { id }) => acc + id, 0);
console.log(res);
