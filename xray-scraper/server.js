var express = require('express');
var async = require('async');
var gameronScrape = require('./models/gameron-scrape');

var app = express();

app.get('/', function(req, res) {
	
	//var jsonResult = 'defoltExpress';
	//jsonResult = gameronScrape.getAsyncScrapeFromUrl('http://www.gameron.com.ar/index.php?id_category=33&controller=category');
	//console.log(jsonResult);
	
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
	
});

app.listen(3000);
console.log('Connect to port 3000');