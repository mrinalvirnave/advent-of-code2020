// Day 3

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var preambleLength = 25;
var data = Array();

rl.on('line', (line) => {
  data.push(+line);
});

rl.on('close', () => {
  for (var i = preambleLength; i < data.length; i++) {
    checkValidity(i);
  }
});

function checkValidity (i) {
  var preamble = data.slice(i-preambleLength, i);

  preamble.sort((a,b) => (a-b));
  // Check Preamble validity. if any combo found then this is valid
  var valid = null;
  for(var j = 0; j < preamble.length; j++) {
    if (i != j) {
      var searchfor = preamble.indexOf(data[i]-preamble[j]);
      if (searchfor > -1 && searchfor != j ) {
        valid = i;
      }
    }
  }
  if (valid === null) {
    console.log(`Invalid Value: ${data[i]} at index ${i}`);
    findContigous(data[i]);
  }
}

function findContigous(sum) {
  for (var i = 0; i < data.length-1; i++) {
    var total = 0;
    var contigousSet = [];
    var offset = 0;
    while (total < sum) {
      total += data[i+offset];
      contigousSet.push(data[i+offset]);
      offset++;
    }
    if (total == sum && contigousSet.length > 1) {
      console.log(`Contigous set found. Min = ${Math.min(...contigousSet)}; Max = ${Math.max(...contigousSet)}\n Sum=${Math.min(...contigousSet)+Math.max(...contigousSet)} `)
    }
  }
}
