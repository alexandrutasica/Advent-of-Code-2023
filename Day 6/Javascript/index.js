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

let time = [];
let distance = [];
function processData(data) {
  time = data[0].replace("Time:", "").trim().split(" ").filter(item => item.trim().length > 0);
  distance = data[1].replace("Distance:", "").trim().split(" ").filter(item => item.trim().length > 0);
}

function solution() {
  const times = Array(time.length).fill(0);
  for(let index = 0; index < time.length; index++) {
    for (let left = Math.ceil(time[index] / 2); (time[index] - left) * left > distance[index] && left > 0; left--) {
      if ((time[index] - left) * left > distance[index] ) {
        times[index]++;
      }
    }
    for (let right = Math.ceil(time[index] / 2) + 1; (time[index] - right) * right > distance[index] && right <= time[index]; right++) {
      if ((time[index] - right) * right > distance[index] ) {
        times[index]++;
      }
    }
  }
  return times.reduce((acc, val) => acc * val, 1);
}

processData(linesArray);
console.log("part 1: ", solution());