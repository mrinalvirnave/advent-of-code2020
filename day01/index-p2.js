const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var amounts = [];
var answer;

rl.on('line', (line) => {
  amounts.push(+line);
});

rl.on('close', () => {
  var len = amounts.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      for (var k = 0; k < len; k++) {
        if (amounts[i] + amounts[j] + amounts[k] == 2020) {
          answer = amounts[i] * amounts[j] * amounts[k];
          break;
        }
      }
      if (answer)
        break;
    }
    if (answer)
      break;
  }
  console.log(answer);
});