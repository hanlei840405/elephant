(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.house', []).service('houseService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'house/get',
                params: {
                    'code': code
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.page = function (search, pageNo, pageSize) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'house/page',
                params: {
                    'search': search,
                    'pageNo': pageNo,
                    'pageSize': pageSize
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.findAll = function (buildingCode, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'house/findAll',
                params: {
                    'buildingCode': buildingCode,
                    'status': status
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (house) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'house/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: house
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (house) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'house/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: house
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (house) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'house/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: house
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();