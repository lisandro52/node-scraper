var express = require('express');
var getter  = require('./app/routes/products-getter');
var async = require('async');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Config = require('./app/models/config');
var path = require('path');


var app = express();

// APP CONFIGURATION
//use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configura our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

//Connect to local mongo database
mongoose.connect('mongodb://localhost/midori');

//log all requests to the console
app.use(morgan('dev'));

//set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

app.get('/config', function(req, res) {
	
	console.log('entering the /config');
	
	/*var tagsConfig = new Config();
	
	tagsConfig.parameter = 'typeTags';
	tagsConfig.valueList = [
		{ value: "Motherboard"}, 
		{ value: "RAM"}, 
		{value:"CPU"}, 
		{value:"VGA"}, 
		{value:"Case"}, 
		{value:"SSD"}, 
		{value:"Optical drive"}
	];
	
	tagsConfig.save();
	*/
	Config.find(function (err, config) {
        if (err) res.send(err);
    
        res.json(config);
    });
	
});

app.put('/config/:config_id', function(req, res) {
	
	console.log('Calling the put method in /config/:config_id');
	
	Config.findById(req.params.config_id, function(err, config) {
		
		if (err) res.send(err);
		
		//update the config info
		config.valueList = req.body.valueList;
		
		config.markModified('valueList');
		config.save(function(err) {
			if (err) res.send(err);
			res.json({ success: true, message: 'Updated config' });
		});
	});
	
});

// Main catch-all route
// Send users to frontend
// has to be registered after API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});


app.listen(3000);
console.log('Connect to port 3000');