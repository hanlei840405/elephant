/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.building')
        .controller('BuildingCtrl', BuildingCtrl);

    /** @ngInject */
    function BuildingCtrl($scope, $uibModal, $timeout, buildingService, locationService) {
        var buildingTable;
        $scope.buildings = [];
        $scope.toSave = function (building) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/building/edit.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': building
                }
            });
        };

        $scope.preDelete = function (building) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, building) {
                    $scope.ok = function () {
                        afterOk(building);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'building': building,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (building) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, building) {
                    $scope.ok = function () {
                        afterOk(building);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'building': building,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (building) {
            buildingService.delete(building).then(function () {
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

        $scope.reuse = function (building) {
            buildingService.reuse(building).then(function () {
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
            buildingTable = tableState;
            $scope.isLoading = true;
            var pagination = tableState.pagination;
            var search = {};
            if (tableState.search.predicateObject) {
                if (tableState.search.predicateObject.code) {
                    search.code = tableState.search.predicateObject.code;
                }
                if (tableState.search.predicateObject.name) {
                    search.name = tableState.search.predicateObject.name;
                }
                if (tableState.search.predicateObject.location) {
                    search.locationName = tableState.search.predicateObject.location;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            buildingService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.buildings = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            buildingTable.pagination.start = 0;
            $scope.doPage(buildingTable);
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.createOrEdit;
            if (persist) {
                $scope.createOrEdit = '修改';
            } else {
                $scope.createOrEdit = '新增';
            }
            $scope.opened = false;

            $scope.locations = [];
            $scope.location = {};
            $scope.building = {};

            $scope.submitForm = function (form) {
                debugger;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var building = $scope.building;
                if ($scope.location.selected) {
                    building.locationCode = $scope.location.selected.code;
                }
                var modalInstance = $uibModalInstance;
                buildingService.save(building).then(function () {
                        $uibModal.open({
                            animation: true,
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ok = function () {
                                    $uibModalInstance.dismiss();
                                    modalInstance.dismiss();
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

            function load() {
                if (persist) {
                    $scope.building = persist;
                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.locations = angular.copy(data);
                        if (persist && persist.locationCode) {
                            for (var i = 0;i < $scope.locations.length; i++) {
                                if (persist.locationCode == $scope.locations[i].code) {
                                    $scope.location.selected = $scope.locations[i];
                                }
                            }
                        } else {
                            $scope.location.selected = $scope.locations[0];
                        }
                    }
                });
            }
            load();
        }
    }
})();
