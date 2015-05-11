
//start our angular module and inject userService
angular.module('configCtrl', ['configService'])

// user controller for the main page
// inject the User factory
.controller('configController', function(Config) {
	
	var vm = this;
	
	//grab all the configs at page load
	Config.all()
		.success(function(incomingConfig) {
			vm.processing = false;
			vm.configs = incomingConfig;
		});
	
	vm.addNewValue = function(itemId) {
		vm.configs.filter(function(x) { 
			return x._id == itemId; 
		})[0].valueList.push({ value: "" });
	};
	
	vm.removeValue = function(itemId) {		
		var config =
			vm.configs.filter(function(x) { 
				return x._id == itemId; 
			})[0];
			
		config.valueList.splice(-1, 1);
	};
	
	vm.updateConfig = function(configId) {
		Config.update(configId,
			vm.configs.filter(function(x) {
				return x._id == configId;
			})[0]
		);
	};
	
	
});

//controller applied to user creation page
/*.controller('configCreateController', function(Config) {
	
	var vm = this;
	
	//variable to hide/show elements of the view
	//differentiates between create or edit pages
	vm.type = 'create';
	
	vm.saveUser = function() {
		vm.processing = true;
		
		vm.message = '';
		
		//use the  create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				
				//clear the form
				vm.userData = {};
				vm.message = data.message;
			});
	};
	
})

//controller applied to user edit page
.controller('configEditController', function($routeParams, Config) {
	
	var vm = this;
	
	vm.type = 'edit';
	
	//get the user data for the user you want to edit
	//$routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});
		
	//function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		
		//call the userService function to update
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;
				
				//clear the form
				vm.userData = {};
				
				//bind the message from our API to vm.message
				vm.message = data.message;
			});	
	};
	
});*/