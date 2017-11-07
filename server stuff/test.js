var http = require('http');
var doubler = require('./myfirstmodule');
var url = require('url');

http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
	var n = 5;
	res.write('I\'m saying Hello World first!\n');
	res.write('I\'m saying Hello World first again (second?)!\n');
    res.write('Hello World! In case you were wondering, double ' + n + ' is: ' + doubler.myDoubler(n) + '\n');
	res.write('You requested: ' + req.url);
	res.end()
}).listen(8080);