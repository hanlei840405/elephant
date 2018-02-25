/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.system.resource')
        .controller('ResourceCtrl', ResourceCtrl);

    /** @ngInject */
    function ResourceCtrl($scope, $uibModal, $timeout, resourceService, positionService) {
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
        $scope.resources = [];
        $scope.resources = [];
        $scope.resource = {};
        $scope.parent = {};

        $scope.readyCB = function () {
        };

        $scope.showNode = function (node, selected, event) {
            resourceService.get(selected.node.id).then(function (data) {
                $scope.resource = angular.copy(data);
                if ($scope.resource.status == '启用') {
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
                if (data.resource) {
                    for (var i = 0; i < $scope.resources.length; i++) {
                        if ($scope.resources[i].code == data.resource.code) {
                            $scope.parent.selected = $scope.resources[i];
                            break;
                        }
                    }
                }

            });

            // 重新加载授权列表
            creates = [];
            deletes = [];

            for (var i = 0;i < $scope.positions.length; i++) {
                $scope.positions[i].checked = false;
            }
            positionService.findAll({'resourceCode': selected.node.id}).then(function (data) {
                for (var i = 0;i < data.length; i++) {
                    var position = data[i];
                    creates.push(position.code);
                    $scope.positions[i].checked = true;
                }
            }, function (data) {
                alert(data);
            });
        };

        $scope.preDelete = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk) {
                    $scope.ok = function () {
                        afterOk();
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.delete = function () {
            resourceService.delete($scope.resource.code).then(function () {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function () {
                            $uibModalInstance.dismiss();
                            load();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm'
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.preReuse = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk) {
                    $scope.ok = function () {
                        afterOk();
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.reuse = function () {
            resourceService.reuse($scope.resource.code).then(function () {
                $uibModal.open({
                    animation: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function () {
                            $uibModalInstance.dismiss();
                            load();
                        }
                    },
                    templateUrl: 'app/pages/successModal.html',
                    size: 'sm'
                });
            }, function (data) {
                alert(data);
            });
        };

        $scope.submitForm = function (form) {
            if (!form.$valid) {
                return false;
            }
            if (!$scope.resource.code) { // 转新增处理
                save();
            } else { // 转更新处理
                modify();
            }
        };

        var save = function () {
            var resource = $scope.resource;
            if ($scope.parent.selected) {
                resource.resourceCode = $scope.parent.selected.code;
            }
            resourceService.save(resource).then(function () {
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

        $scope.reset = function () {
            angular.copy({}, $scope.resource);
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
                resourceService.tree().then(function (data) {
                    $scope.treeData = data;
                    $scope.basicConfig.version++;
                });
                resourceService.findAll().then(function (data) {
                    $scope.resources = angular.copy(data);
                    $scope.parent.selected = $scope.resources[0];
                });
            });
        };
        load();

        // 授权
        var positionTable;
        $scope.doPositionPage = function (tableState) {
            positionTable = tableState;
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
                for (var i = 0; i < $scope.positions.length; i++) {
                    $scope.positions[i].checked = false;
                }
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };
        $scope.all = false;
        var creates = [];
        var deletes = [];
        $scope.checkAll = function (active) {
            if (active) {
                $scope.all = true;
                debugger;
                for (var i = 0; i < $scope.positions.length; i++) {
                    creates.push($scope.positions[i].code);
                    for (var j = deletes.length - 1; j >= 0; j--) {
                        if (deletes[j] == $scope.positions[i].code) {
                            deletes.splice(j, 1);
                        }
                    }
                }
                creates = creates.filter(function (item, index, array) {
                    return array.indexOf(item) === index;
                });
            } else {
                $scope.all = false;
                for (var i = 0; i < $scope.positions.length; i++) {
                    deletes.push($scope.positions[i].code);
                    for (var j = deletes.length - 1; j >= 0; j--) {
                        if (creates[j] == $scope.positions[i].code) {
                            creates.splice(j, 1);
                        }
                    }
                }
            }
            console.log(creates, deletes);
        };
        $scope.check = function (active, code) {
            if (active) {
                creates.push(code);
                for (var i = deletes.length - 1; i >= 0; i--) {
                    if (deletes[i] == code) {
                        deletes.splice(i, 1);
                    }
                }
            } else {
                deletes.push(code);
                for (var i = creates.length - 1; i >= 0; i--) {
                    if (creates[i] == code) {
                        creates.splice(i, 1);
                        break;
                    }
                }
            }
            if (creates.length == $scope.positions.length) {
                $scope.all = true;
            } else {
                $scope.all = false;
            }
            console.log(creates, deletes);
        };
        $scope.grant = function () {
            if ($scope.resource.code) {
                resourceService.grant($scope.resource.code, creates, deletes).then(function (data) {
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
                                angular.element('#selectAll').click();
                                return $scope.reset;
                            }
                        }
                    });
                }, function (data) {
                    alert(data);
                });
            }else {
                alert('请先选择资源');
            }
        };
    }
})();
