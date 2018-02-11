(function () {
    'use strict';

    angular.module('BlurAdmin.service.system.user', []).service('userService', ['$http', '$q', 'systemHost', function ($http, $q, systemHost) {
        this.selectByCode = function (code) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'user/getByCode',
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
        this.findAll = function (departmentCode, positionCode, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: systemHost + 'user/findAll',
                params: {
                    'departmentCode': departmentCode,
                    'positionCode': positionCode,
                    'status': status
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
                url: systemHost + 'user/page',
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
        this.save = function (user) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'user/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.upload = function (headImg, code) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'user/upload',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'headImg': headImg,
                    'code': code
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (user) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'user/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (user) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: systemHost + 'user/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.showHeadImg = function (imageName) {
            return systemHost + 'ext/images/system/user/' + imageName;
        };
    }])

})();