/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.system.position')
        .controller('PositionCtrl', PositionCtrl);

    /** @ngInject */
    function PositionCtrl($scope, $uibModal, $timeout, locationService, departmentService, positionService) {
        var positionTable;
        $scope.positions = [];
        $scope.toSave = function (position) {
            $uibModal.open({
                templateUrl: 'app/pages/system/position/edit.html',
                controller: saveModalCtrl,
                size: 'md',
                resolve: {
                    'persist': position
                }
            });
        };

        $scope.preDelete = function (position) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, position) {
                    $scope.ok = function () {
                        afterOk(position);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'position': position,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.delete = function (position) {
            positionService.delete(position).then(function () {
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

        $scope.preReuse = function (position) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, position) {
                    $scope.ok = function () {
                        afterOk(position);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'position': position,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.reuse = function (position) {
            positionService.reuse(position).then(function () {
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
            positionTable = tableState;
            $scope.isLoading = true;
            var pagination = tableState.pagination;
            var search = {};
            if (tableState.search.predicateObject) {
                if (tableState.search.predicateObject.name) {
                    search.name = tableState.search.predicateObject.name;
                }
                if (tableState.search.predicateObject.location) {
                    search.locationName = tableState.search.predicateObject.location.name;
                }
                if (tableState.search.predicateObject.department) {
                    search.departmentName = tableState.search.predicateObject.department.name;
                }
                if (tableState.search.predicateObject.position) {
                    search.positionName = tableState.search.predicateObject.position.name;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            positionService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.positions = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        $scope.showValue = function (value) {
            if (value) {
                return '是';
            }
            return '否';
        };

        var reload = function () {
            positionTable.pagination.start = 0;
            $scope.doPage(positionTable);
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.createOrEdit;
            if (persist) {
                $scope.createOrEdit = '修改';
            } else {
                $scope.createOrEdit = '新增';
            }
            $scope.locations = [];
            $scope.location = {};
            $scope.departments = [];
            $scope.positions = [];
            $scope.position = {};
            $scope.department = {}; // 所属部门
            $scope.parent = {}; // 上级岗位
            $scope.manager = {}; // 是否机构负责人
            $scope.managers = [{name: '是', value: true}, {name: '否', value: false}];

            $scope.submitForm = function (form) {
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var position = $scope.position;
                if ($scope.parent.selected) {
                    position.positionCode = $scope.parent.selected.code;
                }
                if ($scope.department.selected) {
                    position.departmentCode = $scope.department.selected.code;
                }
                if ($scope.manager.selected) {
                    position.manager = $scope.manager.selected.value;
                }
                var modalInstance = $uibModalInstance;
                positionService.save(position).then(function () {
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
                departmentService.findAll(item.code, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.departments = angular.copy(data);
                        $scope.department.selected = $scope.departments[0];
                        $scope.selectPositions($scope.departments[0]);
                    }
                });
            };

            $scope.selectDepartments = function (item) {
                positionService.findAll({'departmentCode': item.code}).then(function (data) {
                    if (data.length > 0) {
                        $scope.positions = angular.copy(data);
                        $scope.parent.selected = $scope.positions[0];
                    }
                });
            };

            function load() {
                if (persist) {
                    $scope.position = persist;
                    for (var i = 0; i < $scope.managers.length; i++) {
                        if ($scope.managers[i].value == persist.manager) {
                            $scope.manager.selected = $scope.managers[i];
                            break;
                        }
                    }

                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
                        debugger;
                        $scope.locations = angular.copy(data);
                        if (persist && persist.department && persist.department.location) {
                            $scope.location.selected = persist.department.location;
                        } else {
                            $scope.location.selected = $scope.locations[0];
                        }
                        departmentService.findAll($scope.location.selected.code, '启用').then(function (data) {
                            if (data.length > 0) {
                                $scope.departments = angular.copy(data);
                                if (persist && persist.department) {
                                    $scope.department.selected = persist.department;
                                } else {
                                    $scope.department.selected = $scope.departments[0];
                                }
                                positionService.findAll({'departmentCode': $scope.department.selected.code}).then(function (data) {
                                    if (data.length > 0) {
                                        $scope.positions = angular.copy(data);
                                        if (persist && persist.position) {
                                            $scope.parent.selected = persist.position;
                                        } else {
                                            $scope.parent.selected = $scope.positions[0];
                                        }
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
