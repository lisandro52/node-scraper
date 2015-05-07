var xray = require('x-ray');

//Javascript object to help prepare the output information
var prepare = {
	lineBreakClean: function (str) {
		return str.replace(/(\r\n|\n|\r)/gm,"");
	}
};



xray('http://www.gameron.com.ar/index.php?id_category=33&controller=category')
	.prepare(prepare)
	.select([{
		$root: '.p-item',
		itemName: '.s_title_block a[title]',
		link: '.s_title_block a[href]',
		description: '.product_desc a[title] | lineBreakClean',
		price: '.price'
	}])
	.write('mech_keyboards.json')
	.on('close', function() {
		console.log('all done');
	});
	
xray('http://www.gameron.com.ar/index.php?id_category=46&controller=category&n=20')
	.prepare(prepare)
	.select([{
		$root: '.p-item',
		itemName: '.s_title_block a[title]',
		link: '.s_title_block a[href]',
		description: '.product_desc a[title] | lineBreakClean',
		price: '.price'
	}])
	.write('nvidia_stuff.json')
	.on('close', function() {
		console.log('all done');
	});