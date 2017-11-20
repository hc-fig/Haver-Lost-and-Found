// from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./user-input-data.json'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    console.log(line);
    console.log("\n");
});


rd.on('close', function() {
    console.log("finished");
});
