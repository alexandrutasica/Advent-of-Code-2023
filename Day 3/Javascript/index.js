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

function solution(data) {
  let sum = 0;
  data.forEach((row, rowIndex) => {
    row += '.';
    let num = '';
    let isPart = false;
    let symbol = '';
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
          console.log("num", num, 'symbol', symbol);
          symbol = '';
        } 
        if(num != '' && !isPart) {
          // symbol = '';
        }
        num = '';
        isPart = false;
      }
    }
  });
  return sum;
}

console.log("part 1 sum: ", solution(linesArray));