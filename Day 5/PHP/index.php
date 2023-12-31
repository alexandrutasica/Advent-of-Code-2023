<?php
// error_reporting(0);

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

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

$seeds = [];
$seedToSoil = [];
$soilToFertilizer = [];
$fertilizerToWater = [];
$waterToLight = [];
$lightToTemperature = [];
$temperatureToHumidity = [];
$humidityToLocation = [];

class Mapping {
  public function __construct(
      public int $destination,
      public int $source,
      public int $offset
  ){}
}

function mapToArray(array $data) {
  global $seeds, $seedToSoil, $soilToFertilizer, $fertilizerToWater, $waterToLight, $lightToTemperature, $temperatureToHumidity, $humidityToLocation;

  // Add empty line to be able to match until blank
  $data[] = "";

  $seeds = explode(" ", str_replace("seeds: ", "", $data[0]));

  $fileParseIndex = 1;
  for($i = 1; $i < count($data); $i++) {
    if ($data[$i] != "") {
      $fileParseIndex = $i + 1;
      break;
    }
  }
  
  // seed-to-soil
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $seedToSoil[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // soil-to-fertilizer
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $soilToFertilizer[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // fertilizer-to-water
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $fertilizerToWater[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // water-to-light
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $waterToLight[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // light-to-temperature
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $lightToTemperature[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // temperature-to-humidity
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $temperatureToHumidity[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
  
  // humidity-to-location
  // Skip 2 as the first is blank and the next one is the header of the mapping
  $fileParseIndex += 1;
  for(; $data[$fileParseIndex] != ""; $fileParseIndex++) {
    [$destination, $source, $offset] = explode(" ", $data[$fileParseIndex]);
    $humidityToLocation[] = new Mapping((int) $destination, (int) $source, (int) $offset);
  }
}

function getSourceToDestination(array $mapping, int $needle) {
  for($mapIndex = 0; $mapIndex < count($mapping); $mapIndex++) {
    $map = $mapping[$mapIndex];
    if ($needle >= $map->source && $needle <= $map->source + ($map->offset - 1)) {
      return $map->destination + ($needle - $map->source);
    }
  }
  return $needle;
}

function solution($data) {
  global $seeds, $seedToSoil, $soilToFertilizer, $fertilizerToWater, $waterToLight, $lightToTemperature, $temperatureToHumidity, $humidityToLocation;

  mapToArray($data);

  $minLocation = INF;
  for($seedIndex = 0; $seedIndex < count($seeds); $seedIndex++) {
    $soil = getSourceToDestination($seedToSoil, $seeds[$seedIndex]);
    $fertilizer = getSourceToDestination($soilToFertilizer, $soil);
    $water = getSourceToDestination($fertilizerToWater, $fertilizer);
    $light = getSourceToDestination($waterToLight, $water);
    $temperature = getSourceToDestination($lightToTemperature, $light);
    $humidity = getSourceToDestination($temperatureToHumidity, $temperature);
    $location = getSourceToDestination($humidityToLocation, $humidity);

    if ($location < $minLocation) {
      $minLocation = $location;
    }
  }
  return $minLocation;
}

echo 'Part 1: ' . solution($lines) . "\n";