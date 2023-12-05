<?php

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

function processLine(int $acc, string $line) {
  preg_match_all('/\d/', $line, $matches);
  $first = $matches[0][0];
  $last = $matches[0][ count($matches[0]) - 1 ];
  return $acc + (int)($first.$last);
}

echo array_reduce($lines, "processLine", 0);