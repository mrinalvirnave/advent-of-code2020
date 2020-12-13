// Day 3

const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const math = require('mathjs');
const { exit } = require('process');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var terrain = [];
var move = [3, 1];
var treeCount = 0;

rl.on('line', (line) => {
  terrain.push(line);
});

rl.on('close', () => {
  var terrainRows = terrain.length;
  var terrainCols = terrain[0].length;
  var currPos = [0, 0];

  while (currPos[1] < terrainRows) {
    // Move the Toboggan
    var newpos = moveToboggan(currPos, move, terrainCols);
    // Count
    if (isTree(newpos)) treeCount++;
    currPos = _.clone(newpos);
  }

});

let moveToboggan = function (position, move, maxCol) {
  var newPos = math.add(position, move);
  if (newPos[0] > (maxCol - 1)) {
    newPos[0] -= maxCol;
  }
  return newPos;
}

let isTree = function (pos) {
  if (pos[1] >= terrain.length ) {
    console.log(treeCount);
    process.exit();
  }
  return (terrain[pos[1]].substr(pos[0], 1) == '#');
}