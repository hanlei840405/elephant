(function () {
  'use strict';

  angular.module('BlurAdmin.service.system.location', [
  ]).service('locationService', ['$http', '$q', 'systemHost', function($http, $q, systemHost){
  	this.get = function(code) {
  		var d = $q.defer();
  		$http({
  			method: 'GET',
  			url: systemHost + 'location/get',
  			params: {
  				'code': code
  			}
  		}).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
  	};
    this.findAll = function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: systemHost + 'location/findAll'
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
    this.save = function(location) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: systemHost + 'location/save',
        headers : {
                'Content-Type' : 'application/json'
            },
        data: location
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
    this.delete = function(location) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: systemHost + 'location/delete',
        headers : {
                'Content-Type' : 'application/json'
            },
        data: location
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
  }])

})();