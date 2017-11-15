var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');


var server = http.createServer(function (req, res) {
	
	if (req.method.toLowerCase() == 'get') {
		displayPage(res);
	} else if (req.method.toLowerCase() == 'post') {
		processForm(req, res);
	}
});


function displayPage(res) {
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
		if (util.inspect(fields).username == "" || util.inspect(fields).item_name == "") {  // ***MAKE THIS LINE WORK! MAYBE UTIL.INSPECT RETURNS A STRING?***
			// ***TELL THE USER THEY NEED A USERNAME AND ITEM NAME***
		}
		else {
			// here we write the info from the form into a file
			fs.appendFile("DATA/user-input-data.json", util.inspect(fields), function(err) {
				if(err) {
					return console.log(err)
				}
			});
		}
		displayPage(res); // display the main page again
		
		// ***CALL TO JQUERY TO ADD "SUBMISSION ADDED" TEXT TO HTML***
		
		
		
		// now we prepare to read from the data file and write it on the webpage
        // res.writeHead(200, {
            // 'content-type': 'text/plain'
        // });
        // res.write('loaded data from input file:\n\n');

		// fs.readFile("DATA/user-input-data.json", 'utf8', function read(err, data) {
			// if (err) {
				// throw err;
			// }
			// console.log(data);
			// res.end(data);
		// });
    });
}


server.listen(8080);
console.log('server listening on 8080');