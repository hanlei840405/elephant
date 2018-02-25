/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.lease.leaseHouseContract')
        .controller('LeaseHouseContractCtrl', LeaseHouseContractCtrl);

    /** @ngInject */
    function LeaseHouseContractCtrl($scope, $uibModal, $timeout, leaseHouseContractService, houseService, floorService, buildingService, locationService, dictionaryService) {
        var leaseHouseContractTable;
        $scope.leaseHouseContracts = [];
        $scope.toSave = function (leaseHouseContract) {
            $uibModal.open({
                templateUrl: 'app/pages/lease/leaseHouseContract/edit.html',
                controller: saveModalCtrl,
                size: 'lg',
                resolve: {
                    'persist': leaseHouseContract
                }
            });
        };

        $scope.preDelete = function (leaseHouseContract) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, leaseHouseContract) {
                    $scope.ok = function () {
                        afterOk(leaseHouseContract);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'leaseHouseContract': leaseHouseContract,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (leaseHouseContract) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, leaseHouseContract) {
                    $scope.ok = function () {
                        afterOk(leaseHouseContract);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'leaseHouseContract': leaseHouseContract,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (leaseHouseContract) {
            leaseHouseContractService.delete(leaseHouseContract).then(function () {
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

        $scope.reuse = function (leaseHouseContract) {
            leaseHouseContractService.reuse(leaseHouseContract).then(function () {
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
            leaseHouseContractTable = tableState;
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
                if (tableState.search.predicateObject.owner) {
                    search.owner = tableState.search.predicateObject.owner;
                }
                if (tableState.search.predicateObject.begin) {
                    search.begin = tableState.search.predicateObject.begin;
                }
                if (tableState.search.predicateObject.end) {
                    search.end = tableState.search.predicateObject.end;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            leaseHouseContractService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.leaseHouseContracts = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            leaseHouseContractTable.pagination.start = 0;
            $scope.doPage(leaseHouseContractTable);
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.createOrEdit;
            if (persist) {
                $scope.createOrEdit = '修改';
            } else {
                $scope.createOrEdit = '新增';
            }

            $scope.datePicker = {
                serviceFrom: {
                    opened: false,
                    format: 'yyyy-MM-dd',
                    options: {
                        showWeeks: false
                    }
                },
                serviceTo: {
                    opened: false,
                    format: 'yyyy-MM-dd',
                    options: {
                        showWeeks: false
                    }
                }
            };

            $scope.format = 'yyyy-MM-dd';
            $scope.options = {
                showWeeks: false
            };

            $scope.selectDate = function (obj) {
                $scope.datePicker[obj].opened = true;
            };

            $scope.locations = [];
            $scope.location = {};
            $scope.buildings = [];
            $scope.building = {};

            $scope.floors = [];
            $scope.floor = {};
            $scope.houses = [];
            $scope.house = {};
            $scope.settlementPeriods = [];
            $scope.settlementPeriod = {};
            $scope.payModes = [];
            $scope.payMode = {};

            $scope.leaseHouseContract = {};

            $scope.submitForm = function (form) {
                debugger;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var leaseHouseContract = $scope.leaseHouseContract;
                if ($scope.house.selected) {
                    leaseHouseContract.houseCode = $scope.house.selected.code;
                    leaseHouseContract.houseName = $scope.location.selected.name + ' ' + $scope.building.selected.name + ' ' + $scope.floor.selected.name + ' ' + $scope.house.selected.name;
                }
                var modalInstance = $uibModalInstance;
                leaseHouseContractService.save(leaseHouseContract).then(function () {
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

            $scope.selectBuildings = function () {
                buildingService.findAll($scope.location.selected.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.buildings = angular.copy(data);
                        $scope.building.selected = $scope.buildings[0];
                        $scope.selectFloors();
                    }
                });
            };

            $scope.selectFloors = function () {
                floorService.findAll($scope.building.selected.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.floors = angular.copy(data);
                        $scope.floor.selected = $scope.floors[0];
                        $scope.selectHouses();
                    }
                });
            };

            $scope.selectHouses = function () {
                leaseHouseContractService.findAvailableHouse($scope.floor.selected.code).then(function (data) {
                    if (data.length > 0) {
                        $scope.houses = angular.copy(data);
                        $scope.house.selected = $scope.houses[0];
                        $scope.showHouseInfo();
                    }
                });
            };

            $scope.showHouseInfo = function () {
                $scope.leaseHouseContract.houseAcreage = $scope.house.selected.acreage;
                $scope.leaseHouseContract.housePublicArea = $scope.house.selected.publicArea;
                $scope.leaseHouseContract.houseRent = $scope.house.selected.rent;
            };
            $scope.$watch('leaseHouseContract.serviceFrom + leaseHouseContract.serviceTo + leaseHouseContract.houseRent',  function() {
                if ($scope.leaseHouseContract.serviceFrom && $scope.leaseHouseContract.serviceTo && $scope.leaseHouseContract.houseAcreage && $scope.leaseHouseContract.houseRent) {
                    var days = $scope.leaseHouseContract.serviceTo.getTime() - $scope.leaseHouseContract.serviceFrom.getTime();
                    var day = days / (1000 * 60 * 60 * 24);
                    $scope.leaseHouseContract.amount = $scope.leaseHouseContract.houseRent * $scope.leaseHouseContract.houseAcreage * day;
                }
            });
            $scope.$watch('leaseHouseContract.amount + leaseHouseContract.discount',  function() {
                if ($scope.leaseHouseContract.amount) {
                    $scope.leaseHouseContract.payment = $scope.leaseHouseContract.amount + ($scope.leaseHouseContract.deposit || 0) - ($scope.leaseHouseContract.discount || 0);
                }
            });


            var load = function () {
                if (persist) {
                    $scope.leaseHouseContract = persist;
                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.locations = angular.copy(data);
                        $scope.location.selected = $scope.locations[0];
                        $scope.selectBuildings();
                    }
                });
                dictionaryService.findDictionaryItemsByDictionaryKey('lease-house-period', '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.settlementPeriods = angular.copy(data);
                        $scope.settlementPeriod.selected = $scope.locations[0];
                    }
                });
                dictionaryService.findDictionaryItemsByDictionaryKey('pay-mode', '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.payModes = angular.copy(data);
                        $scope.payMode.selected = $scope.locations[0];
                    }
                });
            };

            load();
        }
    }
})();
