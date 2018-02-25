/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.ownerProperty', ['BlurAdmin.service.system.location',
        'BlurAdmin.service.basic.building',
        'BlurAdmin.service.basic.area',
        'BlurAdmin.service.basic.floor',
        'BlurAdmin.service.basic.house',
        'BlurAdmin.service.basic.owner'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.ownerProperty', {
                url: '/ownerProperty',
                templateUrl: 'app/pages/basic/ownerProperty/ownerProperty.html',
                title: '销售/租赁管理',
                controller: 'OwnerPropertyCtrl',
                sidebarMeta: {
                    order: 500,
                },
            });
    }

})();
