var xray = require('x-ray');

/*
xray('http://github.com/stars/matthewmueller')
	.select([{
		$root: '.repo-list-item',
		title: '.repo-list-name',
		link: '.repo-list-name a[href]',
		description: '.repo-list-description',
		meta: {
			$root: '.repo-list-meta',
			starredOn: 'time'
		}
	}])
	.paginate('.pagination a:last-child[href]')
	.limit(2)
	.write('output.json');
*/

xray('http://www.gameron.com.ar/index.php?id_category=33&controller=category')
	.select([{
		$root: '.p-item',
		itemName: '.s_title_block a[title]',
		link: '.s_title_block a[href]',
		description: '.product_desc a[title]',
		price: '.price'
	}])
	//.paginate('.pagination a:last-child[href]')
	//.limit(2)
	.write('mech_keyboards.json')
	.on('close', function() {
		console.log('all done');
	});
	
xray('http://www.gameron.com.ar/index.php?id_category=46&controller=category&n=20')
	.select([{
		$root: '.p-item',
		itemName: '.s_title_block a[title]',
		link: '.s_title_block a[href]',
		description: '.product_desc a[title]',
		price: '.price'
	}])
	//.paginate('.pagination a:last-child[href]')
	//.limit(2)
	.write('nvidia_stuff.json')
	.on('close', function() {
		console.log('all done');
	});