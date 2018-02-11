/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.system.user')
        .controller('userCtrl', UserCtrl);

    /** @ngInject */
    function UserCtrl($scope, $uibModal, $timeout, $filter, locationService, departmentService, positionService, userService, fileReader) {
        var userTable;
        $scope.users = [];
        $scope.toSave = function (user) {
            $uibModal.open({
                templateUrl: 'app/pages/system/user/edit.html',
                controller: saveModalCtrl,
                size: 'lg',
                resolve: {
                    'persist': user
                }
            });
        };

        $scope.toUpload = function (user) {
            $uibModal.open({
                templateUrl: 'app/pages/uploadModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, persist) {
                    $scope.picture = $filter('appImage')('theme/no-photo.png');

                    $scope.removePicture = function () {
                        $scope.picture = $filter('appImage')('theme/no-photo.png');
                        $scope.noPicture = true;
                    };
                    $scope.uploadPicture = function () {
                        var fileInput = document.getElementById('uploadFile');
                        fileInput.click();
                    };

                    $scope.getFile = function () {
                        fileReader.readAsDataUrl($scope.file, $scope)
                            .then(function (result) {
                                $scope.picture = result;
                            });
                    };

                    $scope.ok = function () {
                        if ($scope.picture == 'assets/img/theme/no-photo.png') {
                            alert('请选择图片在上传');
                            return false;
                        }
                        userService.upload($scope.picture, persist.code);

                        var modalInstance = $uibModalInstance;
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
                    };
                },
                resolve: {
                    'persist': user
                }
            });
        };

        $scope.preDelete = function (user) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, user) {
                    $scope.ok = function () {
                        afterOk(user);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'user': user,
                    afterOk: function () {
                        return $scope.delete;
                    }
                }
            });
        };

        $scope.preReuse = function (user) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/warningModal.html',
                size: 'sm',
                controller: function ($scope, $uibModalInstance, afterOk, user) {
                    $scope.ok = function () {
                        afterOk(user);
                        $uibModalInstance.dismiss();
                    }
                },
                resolve: {
                    'user': user,
                    afterOk: function () {
                        return $scope.reuse;
                    }
                }
            });
        };

        $scope.showHeadImg = function (imageName) {
            return userService.showHeadImg(imageName);
        };

        $scope.delete = function (user) {
            userService.delete(user).then(function () {
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

        $scope.reuse = function (user) {
            userService.reuse(user).then(function () {
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
            userTable = tableState;
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
                if (tableState.search.predicateObject.department) {
                    search.departmentName = tableState.search.predicateObject.department;
                }
                if (tableState.search.predicateObject.position) {
                    search.departmentName = tableState.search.predicateObject.position;
                }
                if (tableState.search.predicateObject.gender) {
                    search.gender = tableState.search.predicateObject.gender;
                }
                if (tableState.search.predicateObject.mobile) {
                    search.mobile = tableState.search.predicateObject.mobile;
                }
            }
            var start = pagination.start;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = pagination.number;  // Number of entries showed per page.

            userService.page(search, Math.ceil(start / number) + 1, number).then(function (data) {
                $scope.users = data.list;
                tableState.pagination.numberOfPages = data.pages;//set the number of pages so the pagination can update
                $scope.isLoading = false;
            });
        };

        var reload = function () {
            userTable.pagination.start = 0;
            $scope.doPage(userTable);
        };

        var saveModalCtrl = function ($scope, $rootScope, $uibModalInstance, persist) {
            $scope.createOrEdit;
            if (persist) {
                $scope.createOrEdit = '修改';
            } else {
                $scope.createOrEdit = '新增';
            }
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


            $scope.locations = [];
            $scope.location = {};
            $scope.departments = [];
            $scope.department = {}; // 所属部门
            $scope.positions = [];
            $scope.position = {}; // 上级岗位
            $scope.genders = ['男', '女'];
            $scope.user = {};

            $scope.submitForm = function (form) {
                if (!form.$valid) {
                    return false;
                }
                save();
            };

            var save = function () {
                var user = $scope.user;
                if ($scope.position.selected) {
                    user.positionCode = $scope.position.selected.code;
                }
                if ($scope.department.selected) {
                    user.departmentCode = $scope.department.selected.code;
                }
                var modalInstance = $uibModalInstance;
                userService.save(user).then(function () {
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
                        $scope.selectDepartments($scope.departments[0]);
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
                    $scope.user = persist;
                    if ($scope.user.birthday) {
                        $scope.user.birthday = new Date($scope.user.birthday);
                    }
                    if ($scope.user.entryDay) {
                        $scope.user.entryDay = new Date($scope.user.entryDay);
                    }
                    if ($scope.user.regularDay) {
                        $scope.user.regularDay = new Date($scope.user.regularDay);
                    }
                }
                locationService.findAll('启用').then(function (data) {
                    if (data.length > 0) {
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
                                debugger;
                                positionService.findAll($scope.department.selected.code).then(function (data) {
                                    if (data.length > 0) {
                                        $scope.positions = angular.copy(data);
                                        if (persist && persist.position) {
                                            $scope.position.selected = persist.position;
                                        } else {
                                            $scope.position.selected = $scope.positions[0];
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
