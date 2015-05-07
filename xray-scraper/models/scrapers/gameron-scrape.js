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

//Function to scrape a Gameron URL asynchronously. Needs a callback function to return execution when it's done.
Scrape.prototype.getScrapeFromUrl = function (url, categoryName, callback) {
	
	xray(url)
		.prepare(prepare)
		.select([{
			$root: '.p-item',
			category: categoryName, //O sea que se puede pasar este texto por parametro? Listo, ya tengo la especificacion de cada pagina
			itemName: '.s_title_block a[title]',
			link: '.s_title_block a[href]',
			description: '.product_desc a[title] | lineBreakClean',
			price: '.price'
		}])
		.run(function(err, json) {
			if (err) callback(err, null);
			callback(null, json);
		}
	);
};

module.exports = new Scrape();