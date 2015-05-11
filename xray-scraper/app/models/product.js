var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Store = require('./store');

var productSchema = new Schema({
	
	partNumber: String,
	link: String,
	name: String,
	mainType: { type: String, index: true},
	compatibilityTags: { type: [String], index: true},
	stores: [{
		id: { type: Schema.Types.ObjectId, ref: 'Store'},
		price: Number,
		stock: Number,
		lastUpdated: {type: Date, default: Date.now }
	}]
});

module.exports = mongoose.model('Product', productSchema);

