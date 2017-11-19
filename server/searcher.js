module.exports = searcher;

var fs = require('fs'),
    readline = require('readline');




var searcher = function(path, query, callback) {
	
	var rd = readline.createInterface({
		input: fs.createReadStream(path),
		//output: process.stdout,
		console: false
	});
	
	
	var matches = [];
	
	rd.on('line', function(line) {
		//console.log("\n");
		var post = JSON.parse(line);
		
		var inPost = false;
		for (key in post) {
			if (post[key].search(query) != -1) {
				inPost = true;
			}
		}
		
		if (inPost) {
			matches.push(post);
		}
	});

	rd.on('close', function() {
		//console.log("finished");
		
		callback(matches);
	});
}


searcher("./DATA/user-input-data.json", "again", function(matches) {
	console.log(matches);
});