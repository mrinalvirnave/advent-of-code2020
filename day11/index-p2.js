const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});
let table = [[]];
var i = 0;
var numcolumns, numrows;

rl.on('line', (line) => {
  table[i] = line.split('');
  i++;
});

rl.on('close', () => {
  numrows = table.length;
  numcolumns = table[0].length;
  result = iterate(table, 0);
  console.log(result);
});


let iterate = function (tableArray, round) {
  console.log(`Round: ${round}`);
  var prevArray = _.cloneDeep(tableArray);
  var newArray = [];

  for (var r = 0; r < numrows; r++) {
    var rowItems = [];
    for (var c = 0; c < numcolumns; c++) {
      rowItems.push(getNewState(prevArray, r, c));
    }
    newArray.push(rowItems);
  }

  if (_.isEqual(prevArray, newArray)) {
    // Count the number of filled seats in the new array
    var Seats = newArray.flat();
    var seatCount = Seats.filter(function (x) { return x == "#"; }).length;
    return seatCount;
  }
  return iterate(newArray, round + 1);
}


let getNewState = function (seatArray, rowNum, colNum) {
  if (seatArray[rowNum][colNum] == "#" && getSurrounding(seatArray, rowNum, colNum) > 4) {
    return "L";
  }
  if (seatArray[rowNum][colNum] == "L" && getSurrounding(seatArray, rowNum, colNum) == 0) {
    return "#";
  }

  return seatArray[rowNum][colNum];
}

let getSurrounding = function (seatArray, rowNum, colNum) {
  var filledSeatCount = getFilledSeatCount(seatArray, rowNum, colNum, -1, -1) +
    getFilledSeatCount(seatArray, rowNum, colNum, -1, 0) +
    getFilledSeatCount(seatArray, rowNum, colNum, -1, +1) +
    getFilledSeatCount(seatArray, rowNum, colNum, 0, -1) +
    getFilledSeatCount(seatArray, rowNum, colNum, 0, +1) +
    getFilledSeatCount(seatArray, rowNum, colNum, +1, -1) +
    getFilledSeatCount(seatArray, rowNum, colNum, +1, 0) +
    getFilledSeatCount(seatArray, rowNum, colNum, +1, +1);
  //console.log(`processing ROW: ${rowNum}  COL: ${colNum}, filledseat: ${filledSeatCount}`);
  return filledSeatCount;
}

let getFilledSeatCount = function (seatArray, rowNum, colNum, rowInc, colInc) {

  var seatval = -1;
  var currRow = rowNum;
  var currCol = colNum;
  var maxCol = seatArray[0].length;
  var maxRow = seatArray.length;

  while (seatval == -1) {
    currRow += rowInc;
    currCol += colInc;
    try {
      if (currCol < 0 || currCol >= maxCol || currRow < 0 || currRow >= maxRow || seatArray[currRow][currCol] == "L") {
        seatval = 0;
      } else if (seatArray[currRow][currCol] == "#") {
        seatval = 1;
      }
    } catch (error) {
      seatval = 0;
    }
  }
  return seatval;

}