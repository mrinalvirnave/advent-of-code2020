// Day 13

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var notes = new Array();
var busIds = new Array();
var starttime;

rl.on('line', (line) => {
  notes.push(line);
});

rl.on('close', () => {
  starttime = +notes[0];
  busIds = notes[1].split(',').filter(z => z != 'x' );

  var selectedBusId = 0;
  var minwait = busIds.reduce((a,b) => {
    var mintime = Math.min(a, b-starttime%b);
    if (mintime != a) selectedBusId = b;
    return mintime;
  } );
  console.log(`Minimum Wait Time: ${minwait}, Answer: ${minwait*selectedBusId}`);
});

