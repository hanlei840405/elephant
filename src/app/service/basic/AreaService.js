(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.area', []).service('areaService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'area/get',
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
                url: basicHost + 'area/page',
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
        this.findAll = function (floorCode, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'area/findAll',
                params: {
                    'floorCode': floorCode,
                    'status': status
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (area) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'area/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: area
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (area) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'area/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: area
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (area) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'area/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: area
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();