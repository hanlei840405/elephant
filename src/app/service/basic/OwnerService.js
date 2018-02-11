(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.owner', []).service('ownerService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.get = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'owner/get',
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
                url: basicHost + 'owner/page',
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
                url: basicHost + 'owner/findAll',
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
        this.save = function (owner) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'owner/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: owner
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (owner) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'owner/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: owner
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (owner) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'owner/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: owner
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.showHeadImg = function (imageName) {
            return systemHost + 'ext/images/basic/owner/' + imageName;
        };
    }])

})();