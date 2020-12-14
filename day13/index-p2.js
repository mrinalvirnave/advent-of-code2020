// Day 13 Part 2

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var notes = new Array();
var busIds = new Array();
var validts = 0;

rl.on('line', (line) => {
  notes.push(line);
});

rl.on('close', () => {
  var busIdsArray = notes[1].split(',');
  var busIds = busIdsArray.filter(z => z != 'x');
  var maxBusID = Math.max(...busIds);
  var minBusID = Math.min(...busIds);
  var maxBusKey, minBusKey;

  //build an object with the busids
  var busIdObj = {};

  for (var i = 0; i < busIdsArray.length; i++) {
    if (busIdsArray[i] != 'x') {
      busIdObj[i] = busIdsArray[i];
      if (busIdsArray[i] == maxBusID) maxBusKey = i;
      if (busIdsArray[i] == minBusID) minBusKey = i;
    }
  }

  // console.log(JSON.stringify(busIdObj));

  // Find first multiplier that satisfies pairs
  var timeInc = +busIdObj[0];
  var timeStart = BigInt(0);
  Object.keys(busIdObj).forEach(key => {
    if (key > 0) {
      timeStart = findFirstMultiple(busIdObj[0], busIdObj[key], timeStart, timeInc, key);
      timeInc = timeInc * busIdObj[key];
    }
  });
  console.log(timeStart);
});

let findFirstMultiple = function(num1, num2, timeStart, timeInc, modulo) {
  timeSt = BigInt(timeStart);
  while ((timeSt+BigInt(modulo))%BigInt(num2) != 0) {
    timeSt += BigInt(timeInc);
  }
  return timeSt;
}