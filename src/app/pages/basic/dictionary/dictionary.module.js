/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.basic.dictionary', ['BlurAdmin.service.basic.dictionary'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basic.dictionary', {
                url: '/dictionary',
                templateUrl: 'app/pages/basic/dictionary/dictionary.html',
                title: '字典管理',
                controller: 'DictionaryCtrl',
                sidebarMeta: {
                    order: 700,
                },
            });
    }

})();
