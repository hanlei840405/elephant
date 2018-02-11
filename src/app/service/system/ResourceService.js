(function () {
    'use strict';

    angular.module('BlurAdmin.service.system.resource', []).service('resourceService', ['$http', '$q', 'systemHost', function ($http, $q, systemHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'resource/get',
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
        this.tree = function () {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'resource/tree'
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.findAll = function () {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'resource/findAll'
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (resource) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'resource/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: resource
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (code) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'resource/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: code
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (code) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'resource/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: code
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.grant = function (code, creates, deletes) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'resource/grant',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'code': code,
                    'creates': creates,
                    'deletes': deletes
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.grant = function (code, creates, deletes) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'resource/grant',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'code': code,
                    'creates': creates,
                    'deletes': deletes
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();