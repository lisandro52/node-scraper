var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var configSchema = new Schema({
	
	parameter: String,
	valueList: [{
		value: String //Using a wrapper object array instead of a string array because of the angular 2-way binding
	}]
});

var db = mongoose.model('Config', configSchema);

var ConfigRepo = function () {};

ConfigRepo.prototype.getAllConfigs = function(callback) {
	db.find()
	.sort({ parameter: 'asc' })
	.exec(function(err, configs) {
		callback(err, configs);
	});
};


ConfigRepo.prototype.createConfig = function(parameterName, callback) {
	var config = new db();
	config.parameter = parameterName;
	config.valueList = [];
	
	config.save(function(err) {
		callback(err);
	});
	
};

ConfigRepo.prototype.updateConfig = function (config_id, valueList, callback) {
	
	db.findById(config_id, function(err, config) {
		if (err) throw err;
		
		config.valueList = valueList;
		config.markModified('valueList');
		config.save(function(err) {
			callback(err);
		});
	});
};

ConfigRepo.prototype.removeConfig = function(config_id, callback) {
	db.remove({ _id: config_id }, function(err) {
		callback(err);
	});
};

module.exports = new ConfigRepo();

