var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var storeSchema = new Schema({
	code: String,
	name: String,
	associatedTags: [String]	
});


module.exports = mongoose.model('Store', storeSchema);