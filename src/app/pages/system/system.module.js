/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system', [
      'BlurAdmin.pages.system.location',
      'BlurAdmin.pages.system.department',
      'BlurAdmin.pages.system.position',
      'BlurAdmin.pages.system.user',
      'BlurAdmin.pages.system.resource'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system', {
          url: '/system',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '系统管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 1000,
          },
        });
  }

})();
