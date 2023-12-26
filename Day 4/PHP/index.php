<?php

/*
The Elf leads you over to the pile of colorful cards. There, you discover dozens of scratchcards, all with their opaque covering already scratched off. Picking one up, it looks like each card has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have. You organize the information into a table (your puzzle input).

As far as the Elf has been able to figure out, you have to figure out which of the numbers you have appear in the list of winning numbers. The first match makes the card worth one point and each match after the first doubles the point value of that card.
*/

$input = file_get_contents(__DIR__ . "/../input.txt");
$lines = explode("\n", $input);

function solution($data) {
  $total = 0;
  for($lineIndex = 0; $lineIndex < count($data); $lineIndex++) {
    $splittedData = explode(" | ", $data[$lineIndex]);
    $myNumbers = array_filter( explode( " ", $splittedData[1] ), fn($item) => strlen(trim($item)) > 0 );
    $winningNumbers = array_filter( explode( " ", explode( ":", $splittedData[0] )[1] ), fn($item) => strlen(trim($item)) > 0 );
    $winningNumbersTotal = 0;
    for ($numberIndex = 0; $numberIndex < count($myNumbers); $numberIndex++) {
      // To check if which of the numbers are common in the 2 arrays without using in_array
      $winningNumbersTotal = count( array_intersect($myNumbers, $winningNumbers) );
    }
    if ($winningNumbersTotal > 0)  {
      $total += pow( 2, $winningNumbersTotal - 1 );
    }
  }
  return $total;
}

echo 'Part 1: ' . solution($lines) . "\n";