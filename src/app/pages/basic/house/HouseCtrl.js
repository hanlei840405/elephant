/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.house')
        .controller('HouseCtrl', HouseCtrl);

    /** @ngInject */
    function HouseCtrl($scope, $uibModal, $timeout, houseService, areaService, floorService, buildingService, locationService) {
        var houseTable;
        $scope.houses = [];
        $scope.toSave = function (house) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/house/edit.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': house
                }
            });
        };

        $scope.preDelete = function (house) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, house) {
                    $scope.ok = function () {
                        afterOk(house);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'house': house,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (house) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, house) {
                    $scope.ok = function () {
                        afterOk(house);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'house': house,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (house) {
            houseService.delete(house).then(function () {
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

        $scope.reuse = function (house) {
            houseService.reuse(house).then(function () {
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
            houseTable = tableState;
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

            houseService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.houses = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            houseTable.pagination.start = 0;
            $scope.doPage(houseTable);
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

            $scope.floors = [];
            $scope.floor = {};
            $scope.areas = [];
            $scope.area = {};

            $scope.house = {};

            $scope.submitForm = function (form) {
                debugger;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var house = $scope.house;
                if ($scope.area.selected) {
                    house.areaCode = $scope.area.selected.code;
                }
                var modalInstance = $uibModalInstance;
                houseService.save(house).then(function () {
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
                    $scope.house = persist;
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
                                floorService.findAll($scope.building.selected.code, '启用').then(function (data) {
                                    if (data.length > 0) {
                                        $scope.floors = angular.copy(data);
                                        if (persist && persist.floor) {
                                            $scope.floor.selected = persist.floor;
                                        } else {
                                            $scope.floor.selected = $scope.floors[0];
                                        }
                                        areaService.findAll($scope.floor.selected.code, '启用').then(function (data) {
                                            if (data.length > 0) {
                                                $scope.areas = angular.copy(data);
                                                if (persist && persist.area) {
                                                    $scope.area.selected = persist.area;
                                                } else {
                                                    $scope.area.selected = $scope.areas[0];
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }

            load();
        }
    }
})();
