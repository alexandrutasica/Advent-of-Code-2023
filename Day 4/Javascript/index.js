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

/*
The Elf leads you over to the pile of colorful cards. There, you discover dozens of scratchcards, all with their opaque covering already scratched off. Picking one up, it looks like each card has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have. You organize the information into a table (your puzzle input).

As far as the Elf has been able to figure out, you have to figure out which of the numbers you have appear in the list of winning numbers. The first match makes the card worth one point and each match after the first doubles the point value of that card.

resp: 27059
*/

function solution(data) {
  let total = 0;
  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const splittedData = data[lineIndex].split(" | ");
    const myNumbers = splittedData[1]
      .split(" ")
      .filter((item) => item.trim().length > 0);
    const winningNumber = splittedData[0]
      .split(": ")[1]
      .split(" ")
      .filter((item) => item.trim().length > 0);
    let winningNumbersTotal = 0;
    for (let numberIndex = 0; numberIndex < myNumbers.length; numberIndex++) {
      if (winningNumber.includes(myNumbers[numberIndex])) {
        winningNumbersTotal += 1;
      }
    }
    if (winningNumbersTotal > 0) {
      total += Math.pow(2, winningNumbersTotal - 1);
    }
  }
  return total;
}

/*
There's no such thing as "points". Instead, scratchcards only cause you to win more scratchcards equal to the number of winning numbers you have.

Specifically, you win copies of the scratchcards below the winning card equal to the number of matches. So, if card 10 were to have 5 matching numbers, you would win one copy each of cards 11, 12, 13, 14, and 15.

Copies of scratchcards are scored like normal scratchcards and have the same card number as the card they copied. So, if you win a copy of card 10 and it has 5 matching numbers, it would then win a copy of the same cards that the original card 10 won: cards 11, 12, 13, 14, and 15. This process repeats until none of the copies cause you to win any more cards. (Cards will never make you copy a card past the end of the table.)

Resp: 5744979
*/
const originalData = linesArray;
const originalDataLength = originalData.length;
function solutionPart2(data) {
  let total = data.length;
  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const splittedData = data[lineIndex].split(" | ");
    const myNumbers = splittedData[1]
      .split(" ")
      .filter((item) => item.trim().length > 0);
    const winningNumber = splittedData[0]
      .split(": ")[1]
      .split(" ")
      .filter((item) => item.trim().length > 0);
    const currGame = parseInt(
      splittedData[0].split(":")[0].replace("Card ", "").trim(),
      10
    );
    const wonCards = [];
    let currentWonIndex = currGame; // Number of the current game + 1. The currGame index starts from 1, even if the first arr line number is 0
    for (
      let numberIndex = 0;
      numberIndex < myNumbers.length && currentWonIndex < originalDataLength;
      numberIndex++
    ) {
      if (winningNumber.includes(myNumbers[numberIndex])) {
        wonCards.push(originalData[currentWonIndex]);
        currentWonIndex += 1;
      }
    }
    if (wonCards.length > 0) {
      total += solutionPart2(wonCards);
    }
  }
  return total;
}

console.log("part 1: ", solution(linesArray));
console.log("part 2: ", solutionPart2(linesArray));
