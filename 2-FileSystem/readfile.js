var fs = require("fs");

// Asynchronous read
fs.readFile('miarchivo.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var dataSync = fs.readFileSync('miarchivo.txt');
console.log("Synchronous read: " + dataSync.toString());

console.log("Program Ended");