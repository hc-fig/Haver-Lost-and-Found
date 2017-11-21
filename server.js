/*
Welcome!
This is the main server file for the haver-lost-and-found webpage.
*/


// ############ Dependencies #############
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var searcher = require('./searcher.js');
// #######################################




// Defines the server (either displaying the page or processing user input accordingly)
app.get('/', function (req, res) {
	displayPage(res);
});

app.post('/search', function(req, res) {
	searcher.search_posts("./DATA/user-input-data.json", req.body.search_query, function(matched_posts) {
		res.send({response: JSON.stringify(matched_posts)});
	});
});



// Displays the page as defined in the front-page.html file
function displayPage(res) {
    fs.readFile('front-page.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
			'Content-Length': data.length
        });
        res.write(data);
		res.end();
    });
}



// Processes user input when they submit a form for a new lost and found post
app.post('/', function(req, res) {
	
	var form = new formidable.IncomingForm();
	
	// Parses the user input
	form.parse(req, function (err, fields, files) {
		
		// We only accept posts with non-empty usernames and item names:
		if (fields.username == "" || fields.item_name == "") {
			// ***TODO: TELL USER THEY NEED A USERNAME AND ITEM NAME***
			console.log("No username and/or item name!");
		}
		else {
			// Here we store the info from the form into a file
		    fs.appendFile("DATA/user-input-data.json", "\n" + JSON.stringify(fields), function(err) {
				if(err) {
				    return console.log(err);
				}
		    });
		}
		//displayPage(res); // Displays the main page again
		
		
		// ***TODO: CALL TO JQUERY TO ADD "SUBMISSION ADDED" TEXT TO HTML***
		
		

		
// ############ Old code for reading the data from the file and writing it to the webpage ############
		
		/*
		now we prepare to read from the data file and write it on the webpage
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('loaded data from input file:\n\n');

		fs.readFile("DATA/user-input-data.json", 'utf8', function read(err, data) {
			if (err) {
				throw err;
			}
			console.log(data);
			res.end(data);
		});
		*/
    });
	
	displayPage(res);
});



// Actually start listening for requests!
app.listen(8080);
console.log('server listening on 8080');
