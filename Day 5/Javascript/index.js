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
Consider again the example seed-to-soil map:

50 98 2
52 50 48
The first line has a destination range start of 50, a source range start of 98, and a range length of 2. This line means that the source range starts at 98 and contains two values: 98 and 99. The destination range is the same length, but it starts at 50, so its two values are 50 and 51. With this information, you know that seed number 98 corresponds to soil number 50 and that seed number 99 corresponds to soil number 51.

The second line means that the source range starts at 50 and contains 48 values: 50, 51, ..., 96, 97. This corresponds to a destination range starting at 52 and also containing 48 values: 52, 53, ..., 98, 99. So, seed number 53 corresponds to soil number 55.

Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.

So, the entire list of seed numbers and their corresponding soil numbers looks like this:

seed  soil
0     0
1     1
...   ...
48    48
49    49
50    52
51    53
...   ...
96    98
97    99
98    50
99    51


sol on input: 57075758
*/

/* -- How mapping works on solution
Mapping {
  destination: number
  source: number
  offset: number
}
Doing checks: if number >= source && number <= source + (offset - 1)
*/
let seeds = [];
let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemperature = [];
let temperatureToHumidity = [];
let humidityToLocation = [];

function mapToObject({ destination, source, offset }) {
  return {
    destination: parseInt(destination, 10),
    source: parseInt(source, 10),
    offset: parseInt(offset, 10),
  };
}

function mapDataToArrays(data) {
  // Add empty line to be able to match until blank
  data.push("");

  // Get seeds to be checked
  seeds = data[0]?.replace("seeds: ", "").split(" ");

  // Get first non-seeds list
  let fileParseIndex =
    data.findIndex((val, index) => index > 1 && val != "") + 1;

  // Get seed-to-soil map
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    seedToSoil.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get soil-to-fertilizer-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    soilToFertilizer.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get fertilizer-to-water-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    fertilizerToWater.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get water-to-light-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    waterToLight.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get light-to-temperature-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    lightToTemperature.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get temperature-to-humidity-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    temperatureToHumidity.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }

  // Get humidity-to-location-map
  // Skip 2 as the first is blank and the next one is the header of the mapping
  fileParseIndex += 2;
  for (; data[fileParseIndex] != ""; fileParseIndex++) {
    const [destination, source, offset] = data[fileParseIndex].split(" ");
    humidityToLocation.push(
      mapToObject({
        destination,
        source,
        offset,
      })
    );
  }
}

function getSourceToDestination(mapping, needle) {
  for (let mapIndex = 0; mapIndex < mapping.length; mapIndex++) {
    const { destination, source, offset } = mapping[mapIndex];
    if (needle >= source && needle <= source + (offset - 1)) {
      return destination + (needle - source);
    }
  }
  return needle;
}

function solution(data) {
  mapDataToArrays(data);

  let minLocation = Number.POSITIVE_INFINITY;
  for(let seedIndex = 0; seedIndex < seeds.length; seedIndex++ ) {
    const soil = getSourceToDestination(seedToSoil, seeds[seedIndex]);
    const fertilizer = getSourceToDestination(soilToFertilizer, soil);
    const water = getSourceToDestination(fertilizerToWater, fertilizer);
    const light = getSourceToDestination(waterToLight, water);
    const temperature = getSourceToDestination(lightToTemperature, light);
    const humidity = getSourceToDestination(temperatureToHumidity, temperature);
    const location = getSourceToDestination(humidityToLocation, humidity);

    if (location < minLocation) {
      minLocation = location;
    }
  }
  return minLocation;
}

//  solution: 31161857
function solutionPart2(data) {
  mapDataToArrays(data);

  let minLocation = Number.POSITIVE_INFINITY;
  for(let i=0;i<seeds.length;i+=2) {
    for(let seedIndex = parseInt(seeds[i], 10); seedIndex < parseInt(seeds[i], 10) + parseInt(seeds[i+1], 10); seedIndex++ ) {
      const soil = getSourceToDestination(seedToSoil, seedIndex);
      const fertilizer = getSourceToDestination(soilToFertilizer, soil);
      const water = getSourceToDestination(fertilizerToWater, fertilizer);
      const light = getSourceToDestination(waterToLight, water);
      const temperature = getSourceToDestination(lightToTemperature, light);
      const humidity = getSourceToDestination(temperatureToHumidity, temperature);
      const location = getSourceToDestination(humidityToLocation, humidity);
  
      if (location < minLocation) {
        minLocation = location;
      }
    }
  }
  return minLocation;
}

console.log("part 1: ", solution(linesArray));
console.log("part 2: ", solutionPart2(linesArray));
