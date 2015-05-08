var express = require('express');
var getter  = require('./app/routes/products-getter');
var async = require('async');

var app = express();

app.get('/', function(req, res) {
	
	async.series([
		function(callbackServer){
			getter.getProductsFromSites(callbackServer);
		}],		
		function callbackServer(err, results) {
			res.send(results);
	});
	//res.send(getter.getProductsFromSites());
	
});

app.listen(3000);
console.log('Connect to port 3000');