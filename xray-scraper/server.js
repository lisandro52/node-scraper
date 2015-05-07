var express = require('express');
var async = require('async');
var gameronScrape = require('./models/scrapers/gameron-scrape');
var categories = require('./models/sites/categories');

var app = express();

app.get('/', function(req, res) {
	/*
	async.series([
		function(callback) {
			gameronScrape.getScrapeFromUrl(
				'http://www.gameron.com.ar/index.php?id_category=33&controller=category',
				callback
			);
		}
	],
	function callback(err, result) {
		res.send(result);
	});
	*/
	
	var asyncCalls = [];
	
	categories.forEach(function(item) {
		asyncCalls.push(function(callback) {
			gameronScrape.getScrapeFromUrl(
				item.link,
				item.category,
				callback
			);
		});
	});
	
	console.log('categories ' + categories);
	console.log('asyncCalls ' + asyncCalls);
	
	async.parallel(
		asyncCalls,
		function callback(err, results) {
			if(err) throw err;
			console.log(results);
			res.send(results);
		}
	);
	
});

app.listen(3000);
console.log('Connect to port 3000');