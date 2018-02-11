/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.floor', ['BlurAdmin.service.basic.floor', 'BlurAdmin.service.basic.building', 'BlurAdmin.service.system.location'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.floor', {
                url: '/floor',
                templateUrl: 'app/pages/basic/floor/floor.html',
                title: '楼层管理',
                controller: 'FloorCtrl',
                sidebarMeta: {
                    order: 200,
                },
            });
    }

})();
