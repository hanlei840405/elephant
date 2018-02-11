/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.user',[
    'BlurAdmin.service.system.location',
    'BlurAdmin.service.system.department',
    'BlurAdmin.service.system.position',
    'BlurAdmin.service.system.user'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system.user', {
          url: '/user',
          templateUrl: 'app/pages/system/user/user.html',
          title: '员工管理',
          controller: 'userCtrl',
          sidebarMeta: {
            order: 400,
          },
        });
  }

})();
