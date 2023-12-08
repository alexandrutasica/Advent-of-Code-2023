var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../input.txt");

const input = fs.readFileSync(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  input = data;
});
const linesArray = input.split("\n");

const maxCubesPerColor = {
  red: 12,
  green: 13,
  blue: 14,
};

function mapValidGames(lines) {
  const validGames = [];
  lines.forEach((element) => {
    const lineSplitted = element.split(":");
    const gameNumber = lineSplitted[0].replace("Game ", "");
    const rounds = lineSplitted[1].trim().split("; ");
    let gameValid = true;
    for (let i = 0; i < rounds.length && gameValid; i++) {
      const roundMoves = rounds[i].split(", ");
      for (
        let moveIndex = 0;
        moveIndex < roundMoves.length && gameValid;
        moveIndex++
      ) {
        const move = roundMoves[moveIndex].split(" ");
        if (maxCubesPerColor[move[1]] < move[0]) {
          gameValid = false;
        }
      }
    }
    if (gameValid) {
      validGames.push(parseInt(gameNumber, 10));
    }
  });
  return validGames;
}

function getFewerCubes(lines) {
  const result = [];
  lines.forEach((element) => {
    const lineSplitted = element.split(":");
    const rounds = lineSplitted[1].trim().split("; ");
    let maxOfEachGame = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let i = 0; i < rounds.length; i++) {
      const roundMoves = rounds[i].split(", ");
      for (let moveIndex = 0; moveIndex < roundMoves.length; moveIndex++) {
        const move = roundMoves[moveIndex].split(" ");
        if (move[0] > maxOfEachGame[move[1]]) {
          maxOfEachGame[move[1]] = parseInt(move[0], 10);
        }
      }
    }

    result.push(
      maxOfEachGame["red"] * maxOfEachGame["green"] * maxOfEachGame["blue"]
    );
  });
  return result;
}

console.log(
  "Sum of valid games: ",
  mapValidGames(linesArray).reduce((acc, item) => acc + item, 0)
);
console.log(
  "Games Sum: ",
  getFewerCubes(linesArray).reduce((acc, item) => acc + item, 0)
);
