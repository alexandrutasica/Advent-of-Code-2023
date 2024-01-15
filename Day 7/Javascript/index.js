const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../input.txt");

let input = fs.readFileSync(filePath, "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	input = data;
});
const linesArray = input.split("\n");

/**
In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456

Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.
*/

class HandWithPoints {
	hand = "";
	points = 0;

	constructor(hand, points) {
		this.hand = hand;
		this.points = points;
	}
}

const PAIRS = {
	FIVE_OF_KIND: 6,
	FOUR_OF_KIND: 5,
	FULL_HOUSE: 4,
	THREE_OF_KIND: 3,
	TWO_PAIR: 2,
	ONE_PAIR: 1,
	HIGH_CARD: 0,
};
const CARDS_LIST = [
	"A",
	"K",
	"Q",
	"J",
	"T",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
];

const handsWithPoints = [];
function processData(data) {
	for (let i = 0; i < data.length; i++) {
		const line = data[i].split(" ");
		handsWithPoints.push(new HandWithPoints(line[0], line[1]));
	}
}

function parseStrength(hand) {
	const keys = {};
	for (let i = 0; i < hand.length; i++) {
		if (!keys[hand[i]]) {
			keys[hand[i]] = 0;
		}
		keys[hand[i]] += 1;
	}
	// getting an array like
	const valuesArr = Object.values(keys).sort((a, b) => b - a);
	const values = {};
	for (let i = 0; i < valuesArr.length; i++) {
		if (!values[valuesArr[i]]) {
			values[valuesArr[i]] = 0;
		}
		values[valuesArr[i]] += 1;
	}

	// Five of a kind
	if (values["5"] === 1) {
		return PAIRS.FIVE_OF_KIND;
	}
	// Four of a kind
	if (values["4"] === 1 && values["1"] === 1) {
		return PAIRS.FOUR_OF_KIND;
	}
	// Full house
	if (values["3"] === 1 && values["2"] === 1) {
		return PAIRS.FULL_HOUSE;
	}
	// Three of a kind
	if (values["3"] === 1 && values["1"] === 2) {
		return PAIRS.THREE_OF_KIND;
	}
	// Two pair
	if (values["2"] === 2 && values["1"] === 1) {
		return PAIRS.TWO_PAIR;
	}
	// One part
	if (values["2"] === 1 && values["1"] === 3) {
		return PAIRS.ONE_PAIR;
	}
	// All different
	if (values["1"] === 5) {
		return PAIRS.HIGH_CARD;
	}
}

function checkStrength(hand1, hand2) {
	const hand1Strength = parseStrength(hand1);
	const hand2Strength = parseStrength(hand2);
	if (hand1Strength < hand2Strength) {
		return -1;
	}
	if (hand1Strength > hand2Strength) {
		return 1;
	}
	for (let i = 0; i < hand1.length; i++) {
		if (hand1[i] !== hand2[i]) {
			if (CARDS_LIST.indexOf(hand1[i]) < CARDS_LIST.indexOf(hand2[i])) {
				return 1;
			}
			return -1;
		}
	}
}

/**
 * Solution: 249748283
 *
 * BAD: 250242366, 250242366 <- problem was the cards were int and not strings
 */
function solution() {
	let sum = 0;
	const handsSorted = handsWithPoints.sort((h1, h2) =>
		checkStrength(h1.hand, h2.hand),
	);
	const ranks = [];
	for (let i = 0; i < handsSorted.length; i++) {
		sum += handsSorted[i].points * (i + 1);
		ranks.push([handsSorted[i].hand, i + 1]);
	}
	console.log("sorted", ranks);
	return sum;
}

processData(linesArray);
console.log("part 1: ", solution());
// console.log("part 2: ", solutionPart2());
