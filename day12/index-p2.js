const fs = require('fs');
const readline = require('readline');
const math = require('mathjs');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var location = [0, 0];
var relWaypoint = [10, 1];
var rotations = {
  L90: [[0, 1], [-1, 0]],
  R270: [[0, 1], [-1, 0]],
  R90: [[0, -1], [1, 0]],
  L270: [[0, -1], [1, 0]],
  R180: [[-1, 0], [0, -1]],
  L180: [[-1, 0], [0, -1]]
};
var translate = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
}
var count = 0;

rl.on('line', (line) => {

  var command = line.substr(0, 1);
  if (command == 'R' || command == 'L') {
    relWaypoint = math.multiply(relWaypoint, rotations[line]);
  }
  else if (command == 'F') {
    var val = line.substring(1);
    var move = math.multiply(relWaypoint, +val);
    location = math.add(location, move);
  }
  else {
    var val = line.substring(1);
    var move = math.multiply(translate[command], +val);
    relWaypoint = math.add(relWaypoint, move);
  }
  count++;
  console.log(`${count}- ${line} - ${location}`);
});

rl.on('close', () => {
  console.log(location);
  console.log(Math.abs(location[0])+Math.abs(location[1]));
});