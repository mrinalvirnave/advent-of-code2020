// Day 14

const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  output: process.stdout,
  terminal: false
});

var data = Array();

rl.on('line', (line) => {
  data.push(line);
});

var mask;
var mem = {};

rl.on('close', () => {
  data.forEach(line => {
    if (line.substr(0,4) == "mask") {
      mask = line.substr(7);
    }
    else {
      // read the mem line
      var instruction = line.match(/mem\[(?<memLoc>.*)\] = (?<num>.*)/);
      // console.log(`${instruction.groups.memLoc} = ${instruction.groups.num}`);
      mem[instruction.groups.memLoc] = applyMask(+instruction.groups.num, mask);
    }
  });
  // console.log(JSON.stringify(mem));
  var sum = 0;
  Object.keys(mem).forEach(key => {
    sum += mem[key];
  });

  console.log(sum);
});

function applyMask(num, mask) {
  var binValue = dec2bin(num);
  var postMask = "";
  for (i=0; i < binValue.length; i++) {
    postMask += (mask.substr(i,1) == "X" ? binValue.substr(i,1) : mask.substr(i,1));
  }
  return bin2dec(postMask);
}

function dec2bin(dec){
  return (dec >>> 0).toString(2).padStart(36, "0");
}

function bin2dec(binVal){
  return parseInt(binVal, 2);
}



