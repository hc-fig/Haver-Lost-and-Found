var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');


var server = http.createServer(function (req, res) {
	
	if (req.method.toLowerCase() == 'get') {
		displayForm(res);
	} else if (req.method.toLowerCase() == 'post') {
		processForm(req, res);
	}
});


function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
			'Content-Length': data.length  // not really sure what this affects, the program runs fine without it
        });
        res.write(data);
    });
}


function processForm(req, res) {
	var form = new formidable.IncomingForm();
	
	form.parse(req, function (err, fields, files) {
        // here we write the info from the form into a file
		fs.appendFile("DATA/user-input-data.json", util.inspect(fields), function(err) {
			if(err) {
				return console.log(err)
			}
		});
		
		// now we prepare to read from the data file and write it on the webpage
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('loaded data from input file:\n\n');
		var content;
		fs.readFile("DATA/user-input-data.json", 'utf8', function read(err, data) {
			if (err) {
				throw err;
			}
			console.log(data);
			res.end(data);
		});
    });
}


server.listen(8080);
console.log('server listening on 8080');