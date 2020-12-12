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
  let regexp = /^(?<first>.+)-(?<second>.+) (?<char>.): (?<pass>.+)$/g;
  let match = regexp.exec(line);
  codes.push(match.groups);

  if (isValid(match.groups)) validCount ++;
});

rl.on('close', () => {
  console.log(validCount);
});

let isValid = function (spec) {
  var matches = (spec.char == spec.pass.substr(spec.first-1,1) ? 1 : 0) + (spec.char == spec.pass.substr(spec.second-1,1) ? 1 : 0);
  return (matches == 1);
}