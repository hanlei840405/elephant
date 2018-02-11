/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.location',['BlurAdmin.service.system.department'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system.location', {
          url: '/location',
          templateUrl: 'app/pages/system/location/location.html',
          title: '属地查询',
          controller: 'locationCtrl',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})();
