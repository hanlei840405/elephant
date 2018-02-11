(function () {
    'use strict';

    angular.module('BlurAdmin.service.system.position', []).service('positionService', ['$http', '$q', 'systemHost', function ($http, $q, systemHost) {
        this.findByResource = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'position/findByResource',
                params: {
                    'resourceCode': code
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
                url: systemHost + 'position/page',
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
        this.findAll = function (params) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'position/findAll',
                params: params
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (position) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'position/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: position
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (position) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'position/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: position
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (position) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'position/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: position
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();