/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.resource',[
    'BlurAdmin.service.system.resource',
      'BlurAdmin.service.system.position'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system.resource', {
          url: '/resource',
          templateUrl: 'app/pages/system/resource/resource.html',
          title: '资源管理',
          controller: 'resourceCtrl',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
