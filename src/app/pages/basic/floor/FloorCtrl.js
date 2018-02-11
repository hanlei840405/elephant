/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.floor')
        .controller('FloorCtrl', FloorCtrl);

    /** @ngInject */
    function FloorCtrl($scope, $uibModal, $timeout, floorService, buildingService, locationService) {
        var floorTable;
        $scope.floors = [];
        $scope.toSave = function (floor) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/floor/edit.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': floor
                }
            });
        };

        $scope.preDelete = function (floor) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, floor) {
                    $scope.ok = function () {
                        afterOk(floor);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'floor': floor,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (floor) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, floor) {
                    $scope.ok = function () {
                        afterOk(floor);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'floor': floor,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (floor) {
            floorService.delete(floor).then(function () {
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

        $scope.reuse = function (floor) {
            floorService.reuse(floor).then(function () {
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
            floorTable = tableState;
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
                if (tableState.search.predicateObject.building) {
                    search.buildingName = tableState.search.predicateObject.building;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            floorService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.floors = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            floorTable.pagination.start = 0;
            $scope.doPage(floorTable);
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
            $scope.buildings = [];
            $scope.building = {};

            $scope.floor = {};

            $scope.submitForm = function (form) {
                debugger;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var floor = $scope.floor;
                if ($scope.building.selected) {
                    floor.buildingCode = $scope.building.selected.code;
                }
                var modalInstance = $uibModalInstance;
                floorService.save(floor).then(function () {
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

            $scope.selectLocations = function (item) {
                buildingService.findAll(item.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.buildings = angular.copy(data);
                        $scope.building.selected = $scope.buildings[0];
                    }
                });
            };

            function load() {
                if (persist) {
                    $scope.floor = persist;
                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.locations = angular.copy(data);
                        if (persist && persist.building && persist.building.locationCode) {
                            for (var i = 0; i < $scope.locations.length; i++) {
                                if (persist.building.locationCode == $scope.locations[i].code) {
                                    $scope.location.selected = $scope.locations[i];
                                }
                            }
                        } else {
                            $scope.location.selected = $scope.locations[0];
                        }
                        buildingService.findAll($scope.location.selected.code, '启用').then(function (data) {
                            if (data.length > 0) {
                                $scope.buildings = angular.copy(data);
                                if (persist && persist.building) {
                                    $scope.building.selected = persist.building;
                                } else {
                                    $scope.building.selected = $scope.buildings[0];
                                }
                            }
                        });
                    }
                });
            }

            load();
        }
    }
})();
