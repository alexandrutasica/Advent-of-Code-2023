<?php
// error_reporting(0);
set_time_limit(0); // Let the script run for how many years it needs



$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

/*
Holding down the button charges the boat, and releasing the button allows the boat to move. Boats move faster if their button was held longer, but time spent holding the button counts against the total race time. You can only hold the button at the start of the race, and boats don't move until the button is released.
Don't hold the button at all (that is, hold it for 0 milliseconds) at the start of the race. The boat won't move; it will have traveled 0 millimeters by the end of the race.
Hold the button for 1 millisecond at the start of the race. Then, the boat will travel at a speed of 1 millimeter per millisecond for 6 milliseconds, reaching a total distance traveled of 6 millimeters.
Hold the button for 2 milliseconds, giving the boat a speed of 2 millimeters per millisecond. It will then get 5 milliseconds to move, reaching a total distance of 10 millimeters.
Hold the button for 3 milliseconds. After its remaining 4 milliseconds of travel time, the boat will have gone 12 millimeters.
Hold the button for 4 milliseconds. After its remaining 3 milliseconds of travel time, the boat will have gone 12 millimeters.
Hold the button for 5 milliseconds, causing the boat to travel a total of 10 millimeters.
Since the current record for this race is 9 millimeters, there are actually 4 different ways you could win: you could hold the button for 2, 3, 4, or 5 milliseconds at the start of the race.
In the second race, you could hold the button for at least 4 milliseconds and at most 11 milliseconds and beat the record, a total of 8 different ways to win.
In the third race, you could hold the button for at least 11 milliseconds and no more than 19 milliseconds and still beat the record, a total of 9 ways you could win.
To see how much margin of error you have, determine the number of ways you can beat the record in each race; in this example, if you multiply these values together, you get 288 (4 * 8 * 9).
Determine the number of ways you could beat the record in each race. What do you get if you multiply these numbers together?

solution: 293046
*/

$time = [];
$distance = [];
function processData(array $data) {
  global $time, $distance;

  $time = array_values(
    array_filter(
      explode(
        " ",
        trim(
          str_replace("Time:", "", $data[0])
        )
      ),
      fn($item) => strlen(trim($item)) > 0
    )
  );
  $distance = array_values(
    array_filter(
      explode(
        " ",
        trim(
          str_replace("Distance:", "", $data[1])
        )
      ), 
      fn($item) => strlen(trim($item)) > 0
    )
  );
}


function solution() {
  global $time, $distance;

  $times = array_fill(0, count($time), 0);
  for($index = 0; $index < count($time); $index++) {
    for($left = ceil($time[$index] / 2); ($time[$index] - $left) * $left > $distance[$index]; $left--) {
      if (($time[$index] - $left) * $left > $distance[$index]) {
        $times[$index]++;
      }
    }
    for($right = ceil($time[$index] / 2)+1; ($time[$index] - $right) * $right > $distance[$index]; $right++) {
      if (($time[$index] - $right) * $right > $distance[$index]) {
        $times[$index]++;
      }
    }
  }
  return array_reduce($times, fn($acc, $val) => $acc * $val, 1);
}

/*
There's really only one race - ignore the spaces between the numbers on each line.
Time:      71530
Distance:  940200
Now, you have to figure out how many ways there are to win this single race.

solution: 35150181
*/
function solutionPart2() {
  global $time, $distance;

  $times = 0;
  $timeVal = array_reduce($time, fn($acc, $val) => $acc . $val, "");
  $distanceVal = array_reduce($distance, fn($acc, $val) => $acc . $val, "");
  for($left = ceil($timeVal / 2); ($timeVal - $left) * $left > $distanceVal; $left--) {
    if (($timeVal - $left) * $left > $distanceVal) {
      $times++;
    }
  }
  for($right = ceil($timeVal / 2)+1; ($timeVal - $right) * $right > $distanceVal; $right++) {
    if (($timeVal - $right) * $right > $distanceVal) {
      $times++;
    }
  }
  return $times;
}

processData($lines);
echo 'Part 1: ' . solution($lines) . "\n";
echo 'Part 2: ' . solutionPart2($lines) . "\n";