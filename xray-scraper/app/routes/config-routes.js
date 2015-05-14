var Config = require('../models/config');

module.exports = function (app, express) {

    //get an instance of the express router
    var apiRouter = express.Router();

    //on routes that end in /config
    apiRouter.route('/')

        .post(function (req, res) {           
            var config = new Config();	
            config.parameter = req.body.parameterName;
            config.valueList = [];
            
            config.save(function(err) {
            	if (err) res.send(err);
            	//After inserting the new parameter, return all the configs
            	Config.find()
				.sort({ parameter : 'asc' })
				.exec(function (err, configs) {
                    if (err) res.send(err); 
                    res.json(configs);
                });
            }); 
           
        })
        
        .get(function (req, res) {            
            Config.find()
			.sort({ parameter : 'asc' })
			.exec(function (err, config) {
                if (err) res.send(err);            
                res.json(config);
            });
            
	});

    
    //on routes that end in /config/:config_id
    apiRouter.route('/:config_id')

        .put(function (req, res) {
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
    	})

        .delete(function (req, res) {			
            Config.remove({
        		_id: req.params.config_id
        	}, function(err) {
        		//After removing the config, if there isn't an error, return all the configs again
        		if(err) res.send(err);
        		Config.find()
				.sort({ parameter : 'asc' })
				.exec(function (err, configs) {
        			if(err) res.send(err);
        			res.json(configs);
        		});
        	});
    });
    
    return apiRouter;

};