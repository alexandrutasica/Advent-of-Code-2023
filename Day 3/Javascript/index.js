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

const directionToCheck = [
  // ^\ ^| /^
  [-1, -1], [-1, 0], [-1, 1],
  // <- ->
  [0, -1], [0, 1],
  // ./ .| \. 
  [1, -1], [1, 0], [1, 1],
];

function isNumber (item) {
  return Number.isInteger(item) || (item >= '0' && item <= 9);
}

function isSymbol (item) {
  return item != '.' && !isNumber(item);
}

// BAD: 519861
// Good: 520019
// Problem: not included the last number because on line end, not checking the number
/* 
The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
*/

function solution(data) {
  let sum = 0;
  data.forEach((row, rowIndex) => {
    row += '.';
    let num = '';
    let isPart = false;
    for(let colIndex=0; colIndex<row.length; colIndex++) {
      const col = row[colIndex];
      // if is number, do the checks
      if (isNumber(col)) {
        // Append number to the previous one
        num += `${col}`;
        // check every position for number
        directionToCheck.forEach(direction => {
          const valToCheck = data?.[ rowIndex + direction[0] ]?.[ colIndex + direction[1] ];
          if (!!valToCheck && isSymbol(valToCheck)) {
            isPart = true;
            symbol = valToCheck;
          }
        });
      } else {
        if (num != '' && isPart) {
          sum += parseInt(num, 10);
        } 
        num = '';
        isPart = false;
      }
    }
  });
  return sum;
}

/* 
The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

Sol: 75519888
*/
function solutionPart2GearRatio(data) {
  const starPosition = {};
  let sum = 0;
  data.forEach((row, rowIndex) => {
    row += '.';
    let num = '';
    let starRowCol = '-1,-1';
    for(let colIndex=0; colIndex<row.length; colIndex++) {
      const col = row[colIndex];
      // if is number, do the checks
      if (isNumber(col)) {
        // Append number to the previous one
        num += `${col}`;
        // check every position for number
        directionToCheck.forEach(direction => {
          const valToCheck = data?.[ rowIndex + direction[0] ]?.[ colIndex + direction[1] ];
          if (!!valToCheck && valToCheck == '*') {
            starRowCol = `${rowIndex + direction[0]},${colIndex + direction[1]}`;
          }
        });
      } else {
        if (num != '' && starRowCol != '-1,-1') {
          if (starPosition[starRowCol]) {
            starPosition[starRowCol].push(parseInt(num, 10));
          } else {
            starPosition[starRowCol] = [parseInt(num, 10)];
          }
        } 
        num = '';
        starRowCol = '-1,-1';
      }
    }
  });
  Object.keys(starPosition)
    .filter(arr => starPosition[arr].length > 1)
    .forEach(arr => {
      sum += starPosition[arr].reduce((acc, val) => acc * val, 1);
    });
  return sum;
}

console.log("part 1 sum: ", solution(linesArray));
console.log("part 2 sum: ", solutionPart2GearRatio(linesArray));