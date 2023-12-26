<?php
// Code with warnings on getting strings number
/*

Warning: Undefined array key 140 in /Users/alexandrutasica/Desktop/Advent of Code 2023/Day 3/PHP/index.php on line 42

Deprecated: substr(): Passing null to parameter #1 ($string) of type string is deprecated in /Users/alexandrutasica/Desktop/Advent of Code 2023/Day 3/PHP/index.php on line 42
*/

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);


$directionToCheck = [
  // ^\ ^| /^
  [-1, -1], [-1, 0], [-1, 1],
  // <- ->
  [0, -1], [0, 1],
  // ./ .| \. 
  [1, -1], [1, 0], [1, 1],
];

function isNumber ($item) {
  return is_numeric($item) || ($item >= '0' && $item <= 0);
}

function isSymbol ($item) {
  return $item != '.' && !isNumber($item);
}

function solution(array $data) {
  global $directionToCheck;

  $sum = 0;
  for ($rowIndex=0; $rowIndex < count($data); $rowIndex++) { 
    $row = $data[$rowIndex] . ".";
    $num = '';
    $isPart = false;
    for($colIndex=0; $colIndex < strlen($row); $colIndex++) {
      $col = $row[$colIndex];
      if (isNumber($col)) {
        $num = $num . $col;
        for($directionIndex=0; $directionIndex < count($directionToCheck); $directionIndex++) {
          $direction = $directionToCheck[$directionIndex];
          $directionRow = $rowIndex + $direction[0];
          $directionCol = $colIndex + $direction[1];
          if (($directionRow >= 0 || $directionRow < count($data)) && ($directionCol >= 0 || $directionCol < strlen($row))) {
            $valToCheck = substr($data[$directionRow], $directionCol, 1);
            if ($valToCheck && isSymbol($valToCheck)) {
              $isPart = true;
            }
          }
        }
      } else {
        if ($num != '' && $isPart) {
          $sum += (int) $num;
        }
        $num = '';
        $isPart = false;
      }
    }
  }
  return $sum;
}

function solutionPart2GearRatio(array $data) {
  global $directionToCheck;

  $starPosition = [];
  $sum = 0;
  for ($rowIndex=0; $rowIndex < count($data); $rowIndex++) { 
    $row = $data[$rowIndex] . ".";
    $num = '';
    $starPos = '-1,-1';
    for($colIndex=0; $colIndex < strlen($row); $colIndex++) {
      $col = $row[$colIndex];
      if (isNumber($col)) {
        $num = $num . $col;
        for($directionIndex=0; $directionIndex < count($directionToCheck); $directionIndex++) {
          $direction = $directionToCheck[$directionIndex];
          $directionRow = $rowIndex + $direction[0];
          $directionCol = $colIndex + $direction[1];
          if (($directionRow >= 0 || $directionRow < count($data)) && ($directionCol >= 0 || $directionCol < strlen($row))) {
            $valToCheck = substr($data[$directionRow], $directionCol, 1);
            if ($valToCheck && $valToCheck == '*') {
              $starPos = $directionRow.','.$directionCol;
            }
          }
        }
      } else {
        if ($num != '' && $starPos != '-1,-1') {
          if ($starPosition[$starPos]) {
            $starPosition[$starPos][] = (int) $num;
          } else {
            $starPosition[$starPos] = [(int) $num];
          }
        }
        $num = '';
        $starPos = '-1,-1';
      }
    }
  }
  foreach ($starPosition as $key => $value) {
    if (count($value) > 1) {
      $prodInside = 1;
      for ($i=0; $i < count($value); $i++) { 
        $prodInside *= $value[$i];
      }
      $sum += $prodInside;
    }
  }
  return $sum;
}

echo 'part 1 sum: ' . solution($lines) . "\n";
echo 'part 2 sum: ' . solutionPart2GearRatio($lines) . "\n";