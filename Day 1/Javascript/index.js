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
  const mappingText = {
    zero: "zero0zero",
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
  };
  return data.reduce(function (agg, element) {
    // Get regex data
    // Add them together
    // Add all of them
    let line = element;
    Object.keys(mappingText).forEach((key) => {
      line = line.replaceAll(key, mappingText[key]);
    });
    const regExParse = line.match(/\d/g);
    const start = mappingText[regExParse[0]] || regExParse[0];
    const end =
      mappingText[regExParse[regExParse.length - 1]] ||
      regExParse[regExParse.length - 1];
    console.log(line, start, end, parseInt(start + end, 10));
    return agg + parseInt(start + end, 10);
  }, 0);
}

console.log("result", processData(linesArray));
