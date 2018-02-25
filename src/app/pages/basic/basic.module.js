/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.basic', [
      'BlurAdmin.pages.basic.building',
      'BlurAdmin.pages.basic.floor',
      'BlurAdmin.pages.basic.area',
      'BlurAdmin.pages.basic.house',
      'BlurAdmin.pages.basic.owner',
      'BlurAdmin.pages.basic.ownerProperty',
      'BlurAdmin.pages.basic.dictionary',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('basic', {
          url: '/basic',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '基础数据管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 1100,
          },
        });
  }

})();
