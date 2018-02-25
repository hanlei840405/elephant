(function () {
    'use strict';

    angular.module('BlurAdmin.service.basic.dictionary', []).service('dictionaryService', ['$http', '$q', 'basicHost', function ($http, $q, basicHost) {
        this.page = function (search, pageNo, pageSize) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'dictionary/page',
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
        this.findDictionaryItemsByDictionaryCode = function (dictionaryCode, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'dictionary/dictionaryItems',
                params: {
                    'dictionaryCode': dictionaryCode,
                    'status': status
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.findDictionaryItemsByDictionaryKey = function (dictionaryKey, status) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: basicHost + 'dictionary/dictionaryItems',
                params: {
                    'dictionaryKey': dictionaryKey,
                    'status': status
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.save = function (dictionary) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/save',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionary
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.delete = function (dictionary) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionary
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuse = function (dictionary) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/reuse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionary
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.saveDictionaryItem = function (dictionaryItem) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/saveDictionaryItem',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionaryItem
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.deleteDictionaryItem = function (dictionaryItem) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/deleteDictionaryItem',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionaryItem
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
        this.reuseDictionaryItem = function (dictionaryItem) {
            var d = $q.defer();
            $http({
                method: 'POST',
                url: basicHost + 'dictionary/reuseDictionaryItem',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dictionaryItem
            }).success(function (response) {
                d.resolve(response);
            }).error(function (response) {
                d.reject(response.message);
            });
            return d.promise;
        };
    }])

})();