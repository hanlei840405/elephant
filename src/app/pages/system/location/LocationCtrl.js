/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
 (function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.location')
  .controller('LocationCtrl', LocationCtrl);

  /** @ngInject */
  function LocationCtrl($scope, $uibModal, $timeout, locationService) {
    $scope.locations = []; // 属地列表

      $timeout(function() {
        locationService.findAll().then(function(data) {
          $scope.locations = angular.copy(data);
        });
      });
  }
})();
