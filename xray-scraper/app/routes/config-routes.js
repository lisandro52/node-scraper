var Config = require('../models/config');

module.exports = function (app, express) {

    //get an instance of the express router
    var apiRouter = express.Router();


    //on routes that end in /users
    apiRouter.route('/config')

        .post(function (req, res) {
            
            /*//create a new instance of the Config model
            var config = new Config();
        
            //set the users information (comes from the request)
        
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            user.save(function (err) {
                if (err) {
                    //duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already existe' });
                    else
                        return res.send(err);
                }
    
                res.json({ message: 'User created!' });
            });
            */
        })
        
        .get(function (req, res) {
            /*User.find(function (err, users) {
                if (err) res.send(err);
            
                //return the users
                res.json(users);
            });*/
            
            
            
    });

    /*
    //on routes that end in /users/:user_id
    apiRouter.route('/users/:user_id')

    //get the user with that id
    // accessed at GET
        .get(function (req, res) {

        User.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err);
        
            //return the user
            res.json(user);
        });

    })

        .put(function (req, res) {

        User.findById(req.params.user_id, function (err, user) {

            if (err) res.send(err);
        
            //upadte the users info only if its new
            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;
        
            //save the user
            user.save(function (err) {
                if (err) res.send(err);
            
                //return a message
                res.json({ message: 'User updated!' });
            });
        });
    })

        .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
                if (err) return res.send(err);

                res.json({ message: 'Successfully deleted' });
            });

    });
    */
    return apiRouter;

};