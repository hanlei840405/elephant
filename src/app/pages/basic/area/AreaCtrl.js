/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.area')
        .controller('AreaCtrl', AreaCtrl);

    /** @ngInject */
    function AreaCtrl($scope, $uibModal, $timeout, areaService, floorService, buildingService, locationService, departmentService, positionService, userService) {
        var areaTable;
        $scope.areas = [];
        $scope.toSave = function (area) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/area/edit.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': area
                }
            });
        };

        $scope.preDelete = function (area) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, area) {
                    $scope.ok = function () {
                        afterOk(area);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'area': area,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (area) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, area) {
                    $scope.ok = function () {
                        afterOk(area);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'area': area,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.delete = function (area) {
            areaService.delete(area).then(function () {
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

        $scope.reuse = function (area) {
            areaService.reuse(area).then(function () {
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
            areaTable = tableState;
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
                if (tableState.search.predicateObject.floor) {
                    search.floorName = tableState.search.predicateObject.floor;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            areaService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.areas = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            areaTable.pagination.start = 0;
            $scope.doPage(areaTable);
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

            // 显示管家
            $scope.departments = [];
            $scope.department = {};
            $scope.positions = [];
            $scope.position = {};
            $scope.users = [];
            $scope.user = {};

            $scope.area = {};

            $scope.submitForm = function (form) {
                ;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var area = $scope.area;
                if ($scope.floor.selected) {
                    area.floorCode = $scope.floor.selected.code;
                }
                if ($scope.user.selected) {
                    area.userCode = $scope.user.selected.code;
                }
                var modalInstance = $uibModalInstance;
                areaService.save(area).then(function () {
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
                $scope.buildings = [];
                $scope.building = {};
                $scope.departments = [];
                $scope.department = {};
                buildingService.findAll(item.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.buildings = angular.copy(data);
                        $scope.building.selected = $scope.buildings[0];
                        $scope.selectBuildings($scope.buildings[0]);
                        $scope.selectDepartments($scope.buildings[0]);
                    }
                });
            };

            $scope.selectBuildings = function (item) {
                $scope.floors = [];
                $scope.floor = {};
                floorService.findAll(item.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.floors = angular.copy(data);
                        $scope.floor.selected = $scope.floors[0];
                    }
                });
            };

            $scope.selectDepartments = function (item) {
                $scope.positions = [];
                $scope.position = {};
                $scope.users = [];
                $scope.user = {};
                loadPositions(item.code);
            };

            $scope.selectPositions = function (item) {
                $scope.users = [];
                $scope.user = {};
                loadUsers($scope.department.selected.code, item.code);
            };

            var loadPositions = function (departmentCode) {
                positionService.findAll(departmentCode).then(function (data) {
                    if (data.length > 0) {
                        $scope.positions = angular.copy(data);
                        if (persist && persist.userCode) {
                            userService.selectByCode(persist.userCode, '启用').then(function (data) {
                                if (data && data.positionVo) {
                                    $scope.position.selected = data.positionVo;
                                }

                                // 加载管家列表
                                loadUsers(data.departmentVo.code, data.positionVo.code, persist.userCode);
                            });
                        } else {
                            $scope.position.selected = $scope.positions[0];
                            // 加载管家列表
                            loadUsers(departmentCode, $scope.position.selected.code);
                        }
                    }
                });
            };

            // 加载管家列表
            var loadUsers = function (departmentCode, positionCode, userCode) {
                userService.findAll(departmentCode, positionCode, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.users = angular.copy(data);
                        if (userCode) {
                            for (var i = 0; i < $scope.users.length; i++) {
                                if (userCode == $scope.users[i].code) {
                                    $scope.user.selected = $scope.users[i];
                                }
                            }
                        } else {
                            $scope.user.selected = $scope.users[0];
                        }
                    }
                });
            };

            var load = function() {
                debugger;
                if (persist) {
                    $scope.area = persist;
                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.locations = angular.copy(data);
                        if (persist && persist.floor && persist.floor.building && persist.floor.building.location) {
                            for (var i = 0; i < $scope.locations.length; i++) {
                                if (persist.floor.building.locationCode == $scope.locations[i].code) {
                                    $scope.location.selected = $scope.locations[i];
                                }
                            }
                        } else {
                            $scope.location.selected = $scope.locations[0];
                        }
                        departmentService.findAll($scope.location.selected.code, '启用').then(function (data) {
                            if (data.length > 0) {
                                $scope.departments = angular.copy(data);
                                if (persist && persist.userCode) {
                                    userService.selectByCode(persist.userCode).then(function (data) {
                                        if (data && data.departmentVo) {
                                            $scope.department.selected = data.departmentVo;
                                            loadPositions($scope.department.selected.code);
                                        }
                                    });
                                } else {
                                    $scope.department.selected = $scope.departments[0];
                                    loadPositions($scope.department.selected.code);
                                }

                            }
                        });

                        buildingService.findAll($scope.location.selected.code, '启用').then(function (data) {
                            if (data.length > 0) {
                                $scope.buildings = angular.copy(data);
                                if (persist && persist.floor.building && persist.building) {
                                    $scope.building.selected = persist.floor.building;
                                } else {
                                    $scope.building.selected = $scope.buildings[0];
                                }
                            }
                            floorService.findAll($scope.building.selected.code, '启用').then(function (data) {
                                if (data.length > 0) {
                                    $scope.floors = angular.copy(data);
                                    if (persist && persist.floor) {
                                        $scope.floor.selected = persist.floor;
                                    } else {
                                        $scope.floor.selected = $scope.floors[0];
                                    }
                                }
                            });
                        });
                    }
                });
            };

            load();
        }
    }
})();
