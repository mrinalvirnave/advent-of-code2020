const fs = require('fs');
const readline = require('readline');

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
  var filledSeatCount = iterate(table,0);
});

function iterate(tableArray, round) {

  var prevArray = tableArray;
  var newArray = new Array (numrows).fill(new Array(numcolumns).fill(null));

  prevArray.forEach(async function (rowArray, rowNum, seatArray) {
    rowArray.forEach(async function (cell, colNum ) {
      console.log(`RowNum:${rowNum}, ColNum:${colNum}`);
      newArray[rowNum][colNum] = await getNewState (cell, seatArray, rowNum, colNum);
      return;
    });    
  });

 console.log(newArray[1][1]);
}

let getNewState = async function (cell, seatArray, rowNum, colNum) {
  return seatArray[rowNum][colNum];
}