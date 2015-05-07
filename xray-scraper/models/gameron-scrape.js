var xray = require('x-ray');
var async = require('async');

var Scrape = function () {};

//Javascript object to help prepare the output information
var prepare = {
	lineBreakClean: function (str) {
		return str.replace(/(\r\n|\n|\r)/gm," ");
	}
};

Scrape.prototype.saveScrapeToFile = function (url, outputFile) {
	
	xray(url)
		.prepare(prepare)
		.select([{
			$root: '.p-item',
			itemName: '.s_title_block a[title]',
			link: '.s_title_block a[href]',
			description: '.product_desc a[title] | lineBreakClean',
			price: '.price'
		}])
		.write(outputFile);
};

Scrape.prototype.getScrapeFromUrl = function (url, callback) {
	
	xray(url)
		.prepare(prepare)
		.select([{
			$root: '.p-item',
			itemName: '.s_title_block a[title]',
			link: '.s_title_block a[href]',
			description: '.product_desc a[title] | lineBreakClean',
			price: '.price'
		}])
		.run(function(err, json) {
			if (err) throw err;
			//console.log(json);
			callback(err, json);
		});
};

module.exports = new Scrape();