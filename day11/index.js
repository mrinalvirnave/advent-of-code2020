const fs = require('fs');
const readline = require('readline');
const async = require('async');
const { exit } = require('process');

const rl = readline.createInterface({
  input: fs.createReadStream('./day11/input.txt'),
  output: process.stdout,
  terminal: false
});
let table = [[]];
var i = 0;

rl.on('line', (line) => {
  var row = line.split('');
  table[i] = row;
  i++;
});

var numcolumns, numrows;

rl.on('close', () => {
  numrows = table.length;
  numcolumns = table[0].length;
  result = iterate(table, 0);
});


let iterate = async function (tableArray, round) {

  var prevArray = tableArray;
  var newArray = new Array(numrows).fill(new Array(numcolumns).fill(null));

  async.forEachOf(prevArray, (rowArray, rowNum) => {
    async.forEachOf(rowArray, (cell, colNum) => {
      newArray[rowNum, colNum] = getNewState(prevArray, rowNum, colNum);
    })
  }, function (err) { console.log(err); });

  console.log(newArray);
}


let getNewState = function (seatArray, rowNum, colNum) {
    
  if (seatArray[rowNum][colNum] == "#" && getSurrounding(seatArray, rowNum, colNum) > 3) {
    return "L";
  } 
  if (seatArray[rowNum][colNum] == "L" && getSurrounding(seatArray, rowNum, colNum) == 0) {
    return "#";
  } 
  
  return seatArray[rowNum][colNum];
}

let getSurrounding = function (seatArray, rowNum, colNum) {
  var filledSeatCount = getFilledSeatCount(seatArray, rowNum-1, colNum-1) +
                        getFilledSeatCount(seatArray, rowNum-1, colNum) +
                        getFilledSeatCount(seatArray, rowNum-1, colNum+1) +
                        getFilledSeatCount(seatArray, rowNum, colNum-1) +
                        getFilledSeatCount(seatArray, rowNum, colNum) +
                        getFilledSeatCount(seatArray, rowNum, colNum+1) +
                        getFilledSeatCount(seatArray, rowNum+1, colNum-1) +
                        getFilledSeatCount(seatArray, rowNum+1, colNum) +
                        getFilledSeatCount(seatArray, rowNum+1, colNum+1);
  
  return filledSeatCount;
}

let getFilledSeatCount = function (seatArray, rowNum, colNum) {
  try {
    return (seatArray[rowNum][colNum] == "#" ? 1 : 0)
    
  } catch (error) {
    console.log (`Row: ${rowNum}, Col: ${colNum}`);
    console.log (JSON.stringify(error));
    return 0;
  }
}