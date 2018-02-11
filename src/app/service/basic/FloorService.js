(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.floor', []).service('floorService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'floor/get',
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
                url: basicHost + 'floor/page',
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
                url: basicHost + 'floor/findAll',
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
        this.save = function (floor) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'floor/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: floor
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (floor) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'floor/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: floor
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (floor) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'floor/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: floor
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();