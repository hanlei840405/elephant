(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.building', []).service('buildingService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'building/get',
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
                url: basicHost + 'building/page',
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
        this.findAll = function (locationCode, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'building/findAll',
                params: {
                    'locationCode': locationCode,
                    'status': status
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (building) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'building/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: building
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (building) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'building/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: building
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (building) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'building/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: building
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();