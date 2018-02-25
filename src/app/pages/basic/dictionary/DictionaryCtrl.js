/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.dictionary')
        .controller('DictionaryCtrl', DictionaryCtrl);

    /** @ngInject */
    function DictionaryCtrl($scope, $uibModal, $timeout, $filter, editableOptions, editableThemes, dictionaryService) {
        var dictionaryTable;
        $scope.dictionaries = [];
        $scope.toSave = function () {
            $scope.showForm = true;
            $scope.inserted = {
                name: ''
            };
            $scope.dictionaries.push($scope.inserted);
        };

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

        $scope.preDelete = function (dictionary) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, dictionary) {
                    $scope.ok = function () {
                        afterOk(dictionary);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'dictionary': dictionary,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (dictionary) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, dictionary) {
                    $scope.ok = function () {
                        afterOk(dictionary);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'dictionary': dictionary,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (dictionary) {
            dictionaryService.delete(dictionary).then(function () {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function () {
                            $uibModalInstance.dismiss();
                            reload();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm'
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.reuse = function (dictionary) {
            dictionaryService.reuse(dictionary).then(function () {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function () {
                            $uibModalInstance.dismiss();
                            reload();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm'
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.doPage = function (tableState) {
            dictionaryTable = tableState;
            $scope.isLoading = true;
            var pagination = tableState.pagination;
            var search = {};
            if (tableState.search.predicateObject) {
                if (tableState.search.predicateObject.name) {
                    search.name = tableState.search.predicateObject.name;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            dictionaryService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.dictionaries = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        $scope.submitForm = function (form) {
            if (!form.$valid) {
                alert('名称不能为空');
                return false;
            }
            $scope.inserted = form.$data;
            save();
            $scope.showForm = false;
        };

        var save = function () {
            var dictionary = $scope.inserted;
            dictionaryService.save(dictionary).then(function () {
                    $uibModal.open({
                        animation: true,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.ok = function () {
                                $uibModalInstance.dismiss();
                                reload();
                            }
                        },
                        templateUrl: 'app/pages/successModal.html',
                        size: 'sm'
                    });
                },
                function (reason) {
                    alert(reason);
                }
            );
        };

        var reload = function () {
            dictionaryTable.pagination.start = 0;
            $scope.doPage(dictionaryTable);
        };

        $scope.addItems = function (dictionary) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/dictionary/dictionaryItem.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': dictionary
                }
            });
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.dictionaryItems = [];

            $scope.insertedDictionaryItem = {};

            dictionaryService.findDictionaryItemsByDictionaryCode(persist.code, '启用').then(function (data) {
                $scope.dictionaryItems = data;
                $scope.isLoading = false;
            });

            $scope.toSaveDictionaryItem = function () {
                $scope.showDictionaryItemForm = true;
                $scope.inserted = {
                    name: ''
                };
                $scope.dictionaryItems.push($scope.inserted);
            };

            $scope.submitDictionaryItemForm = function (form) {

                if (!form.$valid) {
                    return false;
                }
                $scope.insertedDictionaryItem = form.$data;
                save();
            };

            var save = function () {
                var dictionaryItem = $scope.insertedDictionaryItem;
                dictionaryItem.dictionaryCode = persist.code;
                dictionaryService.saveDictionaryItem(dictionaryItem).then(function () {
                        debugger;
                        $scope.showDictionaryItemForm = false;
                        dictionaryService.dictionaryItems(persist.code, '启用').then(function (data) {
                            $scope.dictionaryItems = data;
                            $scope.isLoading = false;
                        });
                    },
                    function (reason) {
                        alert(reason);
                    }
                );
            };
        }
    }
})();
