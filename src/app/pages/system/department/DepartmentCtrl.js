/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.system.department')
        .controller('DepartmentCtrl', DepartmentCtrl);

    /** @ngInject */
    function DepartmentCtrl($scope, $uibModal, $timeout, departmentService, locationService) {
        $scope.model = {
            content: '<h1>AlloyEditor</h1><p>Yes, you can edit this content. <strong>Right here and right now</strong>.</p>'
        };
        $scope.action = {};
        $scope.basicConfig = {
            core: {
                error: function (error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                animation: true,
                check_callback: true
            },
            types: {
                folder: {
                    icon: 'ion-ios-folder'
                },
                default: {
                    icon: 'ion-document-text'
                }
            },
            plugins: ['types'],
            version: 1
        };
        $scope.treeData = [];
        $scope.locations = []; // 属地列表
        $scope.departments = []; // 上级列表
        $scope.location = {}; // 选中的属地
        $scope.department = {}; // 表单对象
        $scope.parent = {}; // 选中的上级

        $scope.readyCB = function () {
        };

        $scope.showNode = function (node, selected, event) {
            debugger;
            departmentService.get(selected.node.id).then(function (data) {
                $scope.department = angular.copy(data);
                if ($scope.department.status == '启用') {
                    angular.copy({
                        saveAction: false,
                        modifyAction: true,
                        deleteAction: true,
                        reuseAction: false
                    }, $scope.action);
                } else {
                    angular.copy({
                        saveAction: false,
                        modifyAction: false,
                        deleteAction: false,
                        reuseAction: false
                    }, $scope.action);

                }
                $scope.parent = angular.copy({});
                for (var i = 0; i < $scope.locations.length; i++) {
                    if ($scope.locations[i].code == data.location.code) {
                        $scope.location.selected = $scope.locations[i];
                        break;
                    }
                }

                for (var i = 0; i < $scope.departments.length; i++) {
                    if ($scope.departments[i].code == data.department.code) {
                        $scope.parent.selected = $scope.departments[i];
                        break;
                    }
                }

            });
        };

        $scope.preDelete = function () {
            $uibModal.open({
                animation: true,
                controller: function ($scope, $uibModalInstance, afterOk) {
                    $scope.ok = function () {
                        afterOk();
                        $uibModalInstance.dismiss();
                    }
                },
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                resolve: {
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.delete = function () {
            departmentService.delete($scope.department.code).then(function (data) {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance, afterOk) {
                        $scope.ok = function () {
                            afterOk();
                            $uibModalInstance.dismiss();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm',
                    resolve: {
                        afterOk: function () {
                            return $scope.reset;
                        }
                    }
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.preReuse = function () {
            $uibModal.open({
                animation: true,
                controller: function ($scope, $uibModalInstance, afterOk) {
                    $scope.ok = function () {
                        afterOk();
                        $uibModalInstance.dismiss();
                    }
                },
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                resolve: {
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.reuse = function () {
            debugger;
            departmentService.reuse($scope.department.code).then(function (data) {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance, afterOk) {
                        $scope.ok = function () {
                            afterOk();
                            $uibModalInstance.dismiss();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm',
                    resolve: {
                        afterOk: function () {
                            return $scope.reset;
                        }
                    }
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.submitForm = function (form) {
            if (!form.$valid) {
                return false;
            }
            if (!$scope.department.code) { // 转新增处理
                save();
            } else { // 转更新处理
                modify();
            }
        };

        $scope.reset = function () {
            angular.copy({}, $scope.location);
            angular.copy({}, $scope.department);
            angular.copy({}, $scope.parent);
            load();
        };

        var load = function () {
            angular.copy({
                saveAction: true,
                modifyAction: false,
                deleteAction: false,
                reuseAction: false
            }, $scope.action);
            $timeout(function () {
                departmentService.tree().then(function (data) {
                    $scope.treeData = data;
                    $scope.basicConfig.version++;
                });

                locationService.findAll('启用', 0, 9999).then(function (data) {
                    $scope.locations = angular.copy(data);
                    if (data.length > 0) {
                        $scope.location.selected = $scope.locations[0];
                        departmentService.findAll($scope.location.selected.code, '启用').then(function (data) {
                            $scope.departments = angular.copy(data);
                            $scope.parent.selected = $scope.departments[0];
                        });
                    }
                });
            });
        };

        var save = function () {
            var department = $scope.department;
            if ($scope.location.selected) {
                department.locationCode = $scope.location.selected.code;
            }
            if ($scope.parent.selected) {
                department.departmentCode = $scope.parent.selected.code;
            }
            departmentService.save(department).then(function (data) {
                    $uibModal.open({
                        animation: true,
                        controller: function ($scope, $uibModalInstance, afterOk) {
                            $scope.ok = function () {
                                afterOk();
                                $uibModalInstance.dismiss();
                            }
                        },
                        templateUrl: 'app/pages/successModal.html',
                        size: 'sm',
                        resolve: {
                            afterOk: function () {
                                return $scope.reset;
                            }
                        }
                    });
                },
                function (reason) {
                    alert(reason);
                }
            );
        };

        var modify = function () {
            $uibModal.open({
                animation: true,
                controller: function ($scope, $uibModalInstance, afterOk) {
                    $scope.ok = function () {
                        afterOk();
                        $uibModalInstance.dismiss();
                    }
                },
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                resolve: {
                    afterOk: function () {
                        return save;
                    }
                }
            });
        };
    }
})();
