var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {
	
	var url = 'http://www.imdb.com/title/tt1229340/';
	
	request(url, function(error, response, html) {
		
		if(!error) {
			
			var $ = cheerio.load(html);
			
			var title, release, rating;
			var json = { title : "", release : "", rating : "" };
			
			//using the unique header to get the title
			
			$('.header').filter(function() {
				
				
				//Lets store the data we filter into a varialbe so we can easily see what's going on
				var data = $(this);
				
				title = data.children().first().text();
				release = data.children().last().children().text();
				
				
				json.title = title;
				json.release = release;
				
			});
			
			$('.star-box-giga-star').filter(function() {
				
				var data = $(this);
				
				rating = data.text();
				
				json.rating = rating;
				
			});
			
		}
		
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
			console.log('File successfully written! Check your project folder for the output.json file');
		});
	
		res.send({ success: true, message: "Check your console" });
		
	});
	
	
	
});

app.listen('8080');
console.log('Magic happens on port 8080');
exports = module.exports = app;