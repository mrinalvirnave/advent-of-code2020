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
      if (amounts[i] + amounts[j] == 2020) {
        answer = amounts[i] * amounts[j];
        break;
      }
    }
    if (answer)
      break;
  }
  console.log(answer);
});