/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.owner', ['BlurAdmin.service.system.location', 'BlurAdmin.service.basic.owner'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.owner', {
                url: '/owner',
                templateUrl: 'app/pages/basic/owner/owner.html',
                title: '业主管理',
                controller: 'OwnerCtrl',
                sidebarMeta: {
                    order: 500,
                },
            });
    }

})();
