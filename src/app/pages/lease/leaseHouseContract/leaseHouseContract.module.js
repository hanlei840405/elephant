/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.lease.leaseHouseContract', [
        'BlurAdmin.service.basic.house',
        'BlurAdmin.service.basic.floor',
        'BlurAdmin.service.basic.building',
        'BlurAdmin.service.basic.dictionary',
        'BlurAdmin.service.system.location',
        'BlurAdmin.service.lease.leaseHouseContract'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('lease.leaseHouseContract', {
                url: '/leaseHouseContract',
                templateUrl: 'app/pages/lease/leaseHouseContract/leaseHouseContract.html',
                title: '房源租赁管理',
                controller: 'LeaseHouseContractCtrl',
                sidebarMeta: {
                    order: 100,
                },
            });
    }

})();
