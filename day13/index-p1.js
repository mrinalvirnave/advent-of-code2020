// Day 3

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

  console.log(adapterJolts);

  var diffs = new Array();
  for (var i = 1; i < adapterJolts.length; i++) {
    diffs.push(adapterJolts[i]-adapterJolts[i-1]);
  }
  done (diffs);
});

let done = function (diffs) {
  console.log(diffs);

  var diff1 = diffs.filter(diff3 => diff3 == 1).length;
  var diff3 = diffs.filter(diff3 => diff3 == 3).length;

  console.log(`Diff-1: ${diff1}, Diff-3: ${diff3}, Multple: ${diff1*diff3} `);
  return;
}