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

function processData(data) {
  const validNeedle = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return data.reduce(function (agg, element) {
    // One start pointer
    // One end pointer
    // Move them together until they find first and last number
    // Add them together
    // Add all of them
    let start = null;
    let end = null;
    for (let i = 0; i < element.length && start == null; i++) {
      if (Number.isInteger(parseInt(element[i], 10))) {
        start = element[i];
      }
    }
    for (let i = element.length - 1; i > -1 && end == null; i--) {
      if (Number.isInteger(parseInt(element[i], 10))) {
        end = element[i];
      }
    }
    return agg + parseInt(start + end, 10);
  }, 0);
}

console.log("result", processData(linesArray));
