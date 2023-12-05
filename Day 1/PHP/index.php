<?php

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

$needle = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
$replace = ["one1one", "two2two", "three3three", "four4four", "five5five", "six6six", "seven7seven", "eight8eight", "nine9nine"];

function processLine(int $acc, string $line) {
  global $needle, $replace;
  $line = str_replace($needle, $replace, $line);
  preg_match_all('/\d/', $line, $matches);
  $first = $matches[0][0];
  $last = $matches[0][ count($matches[0]) - 1 ];
  return $acc + (int)($first.$last);
}

echo array_reduce($lines, "processLine", 0);