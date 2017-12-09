/*
Welcome!
This is the web server file for the haver-lost-and-found website.
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
var uuid = require('uuid/v4');
// #######################################



// Displays the main page of the site
app.get('/', function (req, res) {
	displayHTML(res, './pages/front-page.html');
});



// Displays page for browsing lost posts
app.get('/browseLost', function(req, res) {


	displayHTML(res, './pages/browse-lost-posts.html');

	/*
	searcher.filter_posts("./DB/user-input-data.json", "postType", "Lost", function(matches) {
		//console.log("working");
		
		
		
		for (var i = 0; i < matches.length; i++) {
			res.write(JSON.stringify(matches[i]) + "\n");
		}
		res.end();
	});
	*/
});


// Displays page for submitting a new post
app.get('/submitNewPost', function(req, res) {
	displayHTML(res, './pages/submit-a-new-post.html');
});




// Displays page for browsing found posts
app.get('/browseFound', function(req, res) {
	
	displayHTML(res, './pages/browse-found-posts.html');
	/*
	// The "filter_posts" function can be found in the searcher.js file located in the main folder
	searcher.filter_posts("./DB/user-input-data.json", "postType", "Found", function(matches) {
		for (var i = 0; i < matches.length; i++) {
			res.write(JSON.stringify(matches[i]) + "\n");
		}
		res.end();
	});
	*/
});


// Allows use of css files place in the public folder
app.use(express.static('public'))


// Displays the HTML file found at the given path
function displayHTML(res, path) {
    fs.readFile(path, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
			'Content-Length': data.length
        });
        res.write(data);
		res.end();
    });
}



// Handles requests made when using the item search bar
app.post('/search', function(req, res) {
	
	// The "search_posts" function can be found in the searcher.js file located int he main folder
	searcher.search_posts("./DB/user-input-data.json", req.body.search_query, function(matched_posts) {
		matched_posts.sort(function(a, b) { return (a.date < b.date)});
		res.send({posts: matched_posts});
	});
});



// Processes user input when they submit a form for a new lost and found post
app.post('/new post', function(req, res) {
	
	var form = new formidable.IncomingForm();
	
	// Parses the user input
	form.parse(req, function (err, fields, files) {
		
		// We only accept posts with non-empty usernames and item names:
		if (fields.username == "" || fields.item_name == "") {
			console.log("No username and/or item name!");
		}
		else {
			fields.date = new Date();  // store the date
			fields.uuid = uuid();      // give the new post a unique identifier
			
			// Here we store the info from the form into a file
		    fs.appendFile("DB/user-input-data.json", "\n" + JSON.stringify(fields), function(err) {
				if(err) {
				    return console.log(err);
				}
		    });
		}
    });
	
	displayHTML(res, './pages/front-page.html');
});



// Actually start listening for requests!
app.listen(8080);
console.log('server listening on 8080');
