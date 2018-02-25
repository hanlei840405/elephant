/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.lease', [
      'BlurAdmin.pages.lease.leaseHouseContract',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('lease', {
          url: '/lease',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '租赁管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 1200,
          },
        });
  }

})();
