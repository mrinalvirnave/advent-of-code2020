// Day 3 PArt 2

const { doesNotMatch } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var adapterJolts = new Array();

rl.on('line', (line) => {
  adapterJolts.push(+line);
});

rl.on('close', () => {
  adapterJolts.sort((a, b) => a - b);
  // Add the socket
  adapterJolts.unshift(0);
  // Add the buil-in
  adapterJolts.push(adapterJolts[adapterJolts.length-1]+3);

  var validPathsFound = validPaths(0);
  console.log(validPathsFound);
});

let storedPathCounts = {};

let validPaths = function (index) {

  if (index == adapterJolts.length-1) return 1;
  if (storedPathCounts[`${index}`]) return storedPathCounts[`${index}`];

  var compareIndex = index+1;
  currentValid = 0;

  while (compareIndex < adapterJolts.length && (compareIndex - index) < 4) {
    if (adapterJolts[compareIndex] - adapterJolts[index] < 4) {
      currentValid += validPaths(compareIndex);
      storedPathCounts[`${index}`] = currentValid;
    }
    compareIndex++;
  }
  if (currentValid > 100000) console.log(`Index: ${index}, Combos: ${currentValid}`);
  return currentValid;
}