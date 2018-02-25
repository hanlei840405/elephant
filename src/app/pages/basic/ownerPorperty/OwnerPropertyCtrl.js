/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.ownerProperty')
        .controller('OwnerPropertyCtrl', OwnerPropertyCtrl);

    /** @ngInject */
    function OwnerPropertyCtrl($scope, $uibModal, $timeout, ownerService, locationService, buildingService, areaService, floorService, houseService) {
        var ownerTable;
        $scope.owners = [];
        $scope.houses = [];
        $scope.toSave = function (owner) {
            $uibModal.open({
                templateUrl: 'app/pages/basic/owner/edit.html',
                controller: saveModalCtrl,
                size: 'lg',
                resolve: {
                    'persist': owner
                }
            });
        };

        $scope.preDelete = function (owner) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, owner) {
                    $scope.ok = function () {
                        afterOk(owner);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'owner': owner,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (owner) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, owner) {
                    $scope.ok = function () {
                        afterOk(owner);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'owner': owner,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.showHeadImg = function (imageName) {
            return ownerService.showHeadImg(imageName);
        };

        $scope.delete = function (owner) {
            ownerService.delete(owner).then(function () {
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

        $scope.reuse = function (owner) {
            ownerService.reuse(owner).then(function () {
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
            ownerTable = tableState;
            $scope.isLoading = true;
            var pagination = tableState.pagination;
            var search = {};
            if (tableState.search.predicateObject) {
                if (tableState.search.predicateObject.name) {
                    search.name = tableState.search.predicateObject.name;
                }
                if (tableState.search.predicateObject.mobile) {
                    search.mobile = tableState.search.predicateObject.mobile;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            ownerService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.owners = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            ownerTable.pagination.start = 0;
            $scope.doPage(ownerTable);
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.createOrEdit;
            if (persist) {
                $scope.createOrEdit = '修改';
            } else {
                $scope.createOrEdit = '新增';
            }

            $scope.houses = [];
            $scope.selected = {};
            $scope.owner = {};
            $scope.genders = ['男', '女'];

            $scope.datePicker = {
                birthday: {
                    opened: false,
                    format: 'yyyy-MM-dd',
                    options: {
                        showWeeks: false
                    }
                },
                entryDay: {
                    opened: false,
                    format: 'yyyy-MM-dd',
                    options: {
                        showWeeks: false
                    }
                },
                regularDay: {
                    opened: false,
                    format: 'yyyy-MM-dd',
                    options: {
                        showWeeks: false
                    }
                }
            };
            $scope.opened = false;
            $scope.format = 'yyyy-MM-dd';
            $scope.options = {
                showWeeks: false
            };

            $scope.selectDate = function (obj) {
                $scope.datePicker[obj].opened = true;
            };

            $scope.submitForm = function (form) {
                debugger;
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var owner = $scope.owner;
                var modalInstance = $uibModalInstance;
                ownerService.save(owner).then(function () {
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
                    $scope.owner = persist;
                }
                houseService.findAll(null, '启用').then(function (data) {
                    if (data.length > 0) {
                        $scope.houses = angular.copy(data);
                    }
                });
            }
            load();
        }
    }
})();
