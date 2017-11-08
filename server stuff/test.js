var http = require('http');
var doubler = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
	displayTestForm(res);
	// var n = 5;
	// res.write('I\'m saying Hello World first!\n');
	// res.write('I\'m saying Hello World first again (second?)!\n');
    // res.write('Hello World! In case you were wondering, double ' + n + ' is: ' + doubler.myDoubler(n) + '\n');
	// res.write('You requested: ' + req.url);
	// res.end();
});

function displayTestForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
			'Content-Length': data.length  // not really sure what this affects, the program runs fine without it
        });
        res.write(data);
    });
}

server.listen(8080);
console.log('server listening on 8080');