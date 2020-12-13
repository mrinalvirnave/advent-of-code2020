// Day 3

const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const math = require('mathjs');
const { exit } = require('process');
const { forEach } = require('lodash');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var terrain = [];
var moves = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];
var multipliedNumber = 1;

rl.on('line', (line) => {
  terrain.push(line);
});

rl.on('close', () => {
  var terrainRows = terrain.length;
  var terrainCols = terrain[0].length;

  moves.forEach(move => {
    console.log(`Slope: ${move[0]}, ${move[1]}`);
    var currPos = [0, 0];
    var treeCount = 0;

    while (currPos[1] < terrainRows) {
      // Move the Toboggan
      var newpos = moveToboggan(currPos, move, terrainCols);
      // Count
      var treeCountHere = isTree(newpos);
      if (treeCountHere != null ) {
        treeCount += treeCountHere;
      }
      currPos = _.clone(newpos);
    }
    console.log(`Trees Encountered: ${treeCount}`);
    multipliedNumber *= treeCount;
  });
  console.log(`Multiplied Number: ${multipliedNumber}`);
});

let moveToboggan = function (position, move, maxCol) {
  var newPos = math.add(position, move);
  if (newPos[0] > (maxCol - 1)) {
    newPos[0] -= maxCol;
  }
  return newPos;
}

let isTree = function (pos) {
  if (pos[1] >= terrain.length) {
    return null;
  }
  return ((terrain[pos[1]].substr(pos[0], 1) == '#') ? 1 : 0);
}