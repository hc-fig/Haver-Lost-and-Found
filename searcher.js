var fs = require('fs'),
    readline = require('readline'),
	exports = module.exports;




exports.search_posts = function(path, query, callback) {
	
	query = query.toLowerCase();
	
	var rd = readline.createInterface({
		input: fs.createReadStream(path),
		//output: process.stdout,
		console: false
	});
	
	
	var matches = [];
	
	rd.on('line', function(line) {
		//console.log("\n");
		var post = JSON.parse(line);
		
		// remove the 'date' and 'uuid' fields from the fields to be searched
		delete post['date'];
		delete post['uuid'];
		
		var inPost = false;
		for (key in post) {
			if (post[key].toLowerCase().search(query) != -1) {
				inPost = true;
			}
		}
		
		if (inPost) {
			matches.push(JSON.parse(line));  // we read the line again here in order to get the 'date'
		}                                    // and 'uuid' fields back since we deleted them earlier
	});

	rd.on('close', function() {
		//console.log("finished");
		
		callback(matches);
	});
}



// 
exports.filter_posts = function(path, key, val, callback) {
	
	var rd = readline.createInterface({
		input: fs.createReadStream(path),
		//output: process.stdout,
		console: false
	});
	
	
	var matches = [];
	
	rd.on('line', function(line) {
		//console.log("reading line\n");
		var post = JSON.parse(line);
		
		if (post[key] == val) {
			matches.push(post);
		}
	});
	

	rd.on('close', function() {
		//console.log("finished");
		callback(matches);
	});
}