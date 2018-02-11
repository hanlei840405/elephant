(function () {
  'use strict';

  angular.module('BlurAdmin.service.system.department', [
  ]).service('departmentService', ['$http', '$q', 'systemHost', function($http, $q, systemHost){
  	this.get = function(code) {
  		var d = $q.defer();
  		$http({
  			method: 'GET',
  			url: systemHost + 'department/get',
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
  	this.tree = function() {
  		var d = $q.defer();
  		$http({
  			method: 'GET',
  			url: systemHost + 'department/tree'
		  }).success(function(response) {
          d.resolve(response);
      }).error(function(response){
          d.reject(response.message);
      });
        return d.promise;
  	};
  	this.findAll = function(locationCode, status) {
  		var d = $q.defer();
  		$http({
  			method: 'GET',
  			url: systemHost + 'department/findAll',
  			params: {
          'locationCode': locationCode,
  				'status': status
  			}
  		}).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
  	};
    this.save = function(department) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: systemHost + 'department/save',
        headers : {
                'Content-Type' : 'application/json'
            },
        data: department
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
    this.delete = function(code) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: systemHost + 'department/delete',
        headers : {
                'Content-Type' : 'application/json'
            },
        data: code
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
    this.reuse = function(code) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: systemHost + 'department/reuse',
        headers : {
                'Content-Type' : 'application/json'
            },
        data: code
      }).success(function(response) {
            d.resolve(response);
        }).error(function(response){
            d.reject(response.message);
        });
        return d.promise;
    };
  }])

})();