/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.position',[
    'BlurAdmin.service.system.location',
    'BlurAdmin.service.system.department',
    'BlurAdmin.service.system.position'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system.position', {
          url: '/position',
          templateUrl: 'app/pages/system/position/position.html',
          title: '岗位管理',
          controller: 'positionCtrl',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
