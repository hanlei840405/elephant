(function () {
    'use strict';

    angular.module('BlurAdmin.service.lease.leaseHouseContract', []).service('leaseHouseContractService', ['$http', '$q', 'operationHost', function ($http, $q, operationHost) {
        this.page = function (search, pageNo, pageSize) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: operationHost + 'leaseHouseContract/page',
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
        // 查找未签合同的房源
        this.findAvailableHouse = function (floorCode) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: operationHost + 'leaseHouseContract/availableHouses',
                params: {
                    'floorCode': floorCode
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (leaseHouseContract) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: operationHost + 'leaseHouseContract/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: leaseHouseContract
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (leaseHouseContract) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: operationHost + 'leaseHouseContract/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: leaseHouseContract
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (leaseHouseContract) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: operationHost + 'leaseHouseContract/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: leaseHouseContract
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();