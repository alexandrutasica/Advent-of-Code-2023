<?php

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

$maxCubesPerColor = [
    "red" => 12,
    "green" => 13,
    "blue" => 14,
];

function mapValidGames(array $lines) {
  global $maxCubesPerColor;

  $validGames = [];
  foreach($lines as $line) {
    $lineSplitted = explode(":", $line);
    $gameNumber = str_replace("Game ", "", $lineSplitted[0]);
    $rounds = explode("; ", trim($lineSplitted[1]));
    $gameValid = true;
    for($i=0; $i < count($rounds) && $gameValid; $i++) {
      $roundMoves = explode(",", $rounds[$i]);
      for($moveIndex = 0; $moveIndex < count($roundMoves) && $gameValid; $moveIndex++) {
        $move = explode(" ", trim($roundMoves[$moveIndex]));
        if ($maxCubesPerColor[$move[1]] < $move[0]) {
          $gameValid = false;
        }
      }
    }

    if ($gameValid) {
      $validGames[] = (int) $gameNumber;
    }
  }
  return $validGames;
}

$validGames = mapValidGames($lines);
echo "Sum of valid games: ".array_sum($validGames);