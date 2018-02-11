/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.system.department',['BlurAdmin.service.system.department','BlurAdmin.service.system.location'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('system.department', {
          url: '/department',
          templateUrl: 'app/pages/system/department/department.html',
          controller: 'departmentCtrl',
          title: '部门管理',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
