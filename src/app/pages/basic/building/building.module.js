/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.building', ['BlurAdmin.service.basic.building', 'BlurAdmin.service.system.location'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.building', {
                url: '/building',
                templateUrl: 'app/pages/basic/building/building.html',
                title: '建筑管理',
                controller: 'BuildingCtrl',
                sidebarMeta: {
                    order: 100,
                },
            });
    }

})();
