// Day 3

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input-test.txt'),
  output: process.stdout,
  terminal: false
});

var preambleLength = 5;
var data = Array();

rl.on('line', (line) => {
  data.push(line);
});

rl.on('close', () => {
  for (var i = preambleLength; i < data.length; i++) {
    checkValidity(i, (invalidValue) => {
      if (!(invalidValue === null)) {
        console.log(`Invalid Value: ${data[invalidValue]} at index ${invalidValue}`);
      }
    });
  }
});

function checkValidity (i, callback) {
  var preamble = data.slice(i-preambleLength, i);

  preamble.sort((a,b) => (a-b));
  // Check Preamble validity
  for(var j = 0; j < preamble.length; j++) {
    if (i != j) {
      var searchfor = data[i]-data[j];
      if (preamble.indexOf(searchfor) > -1 || preamble.indexOf(searchfor) != i ) {
        callback(null);
      }
    }
  }
  callback(i);
}
