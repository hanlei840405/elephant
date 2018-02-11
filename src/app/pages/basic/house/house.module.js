/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.house', ['BlurAdmin.service.basic.house', 'BlurAdmin.service.basic.area', 'BlurAdmin.service.basic.floor', 'BlurAdmin.service.basic.building', 'BlurAdmin.service.system.location'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.house', {
                url: '/house',
                templateUrl: 'app/pages/basic/house/house.html',
                title: '房产管理',
                controller: 'HouseCtrl',
                sidebarMeta: {
                    order: 400,
                },
            });
    }

})();
