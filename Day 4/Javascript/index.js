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
*/

function solution(data) {
  let total = 0;
  for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
    const splittedData = data[lineIndex].split(" | ");
    const myNumbers = splittedData[1].split(" ").filter(item => item.trim().length > 0);
    const winningNumber = splittedData[0].split(": ")[1].split(" ").filter(item => item.trim().length > 0);
    let winningNumbersTotal = 0;
    let list = [];
    for (let numberIndex = 0; numberIndex < myNumbers.length; numberIndex++) {
      if (winningNumber.includes(myNumbers[numberIndex])) {
        list.push(myNumbers[numberIndex]);
        winningNumbersTotal += 1;
      }
    }
    if (winningNumbersTotal > 0) {
      total += Math.pow(2, winningNumbersTotal - 1);
    }
  }
  return total;
}

console.log("part 1: ", solution(linesArray));
