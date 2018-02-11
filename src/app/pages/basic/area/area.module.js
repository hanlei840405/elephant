/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.area', ['BlurAdmin.service.basic.area', 'BlurAdmin.service.basic.floor',
        'BlurAdmin.service.basic.building', 'BlurAdmin.service.system.location', 'BlurAdmin.service.system.department',
        'BlurAdmin.service.system.position', 'BlurAdmin.service.system.user'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.area', {
                url: '/area',
                templateUrl: 'app/pages/basic/area/area.html',
                title: '区域管理',
                controller: 'AreaCtrl',
                sidebarMeta: {
                    order: 300,
                },
            });
    }

})();
