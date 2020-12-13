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

  const {
    Worker, isMainThread, parentPort, workerData
  } = require('worker_threads');

  if (isMainThread) {

  //build an object with the busids
  var busIdObj = {};

  for (var i = 0; i < busIdsArray.length; i++) {
    if (busIdsArray[i] != 'x') {
      busIdObj[i] = busIdsArray[i];
      if (busIdsArray[i] == maxBusID) maxBusKey = i;
      if (busIdsArray[i] == minBusID) minBusKey = i;
    }
  }
  var ts = maxBusID*Math.round(100000000000000/maxBusID);
  // var ts = 100236594864393;
  while (validts == 0) {
    processing1 (busIdObj, maxBusKey, ts, busIds.length);
    ts += maxBusID;
  }

  console.log(validts);

});
}

let processing1 = async function (busIdObj, maxBusKey, ts, matchLen) {
    var isMatch = 0;
    var BreakException = {};

    try {
      Object.keys(busIdObj).forEach(key => {
        if ((ts + (key - maxBusKey)) % busIdObj[key] == 0) {
          isMatch++;
        }
        else {
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    if (isMatch == matchLen) {
      validts = ts - maxBusKey;
    }
    return;
}
