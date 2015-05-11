
angular.module('configService', [])

.factory('Config', function($http){
	
	var configFactory = {};
	
	//get a single user
	configFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};
	
	//get all tags
	configFactory.all = function() {
		return $http.get('/config');
	};
	
	//create a user
	configFactory.create = function(userData) {
		return $http.post('/config/', userData);
	};
	
	//update a usesr
	configFactory.update = function(id, configData) {
		return $http.put('/config/' + id, configData);
	};
	
	//delete a user
	configFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};
	
	return configFactory;
	
});