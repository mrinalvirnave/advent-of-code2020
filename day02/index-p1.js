const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var codes = Array();
var validCount = 0;


rl.on('line', (line) => {
  let regexp = /^(?<min>.+)-(?<max>.+) (?<char>.): (?<pass>.+)$/g;
  let match = regexp.exec(line);
  codes.push(match.groups);

  if (isValid(match.groups)) validCount ++;
});

rl.on('close', () => {
  console.log(validCount);
});

let isValid = function (spec) {
  var charcount = (spec.pass.split(spec.char).length)-1
  if (charcount >= spec.min && charcount <= spec.max) {
    return true;
  }
  return false;
}