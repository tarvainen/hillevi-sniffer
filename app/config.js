(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Config', ['ngRoute']);

    /**
     * Configure.
     */
    angular.module('App.Config').config(config);

    /////////

    /**
     * Configure the providers.
     *
     * @param {*} $routeProvider
     * @param {*} $translateProvider
     * @param {*} $compileProvider
     */
    function config ($routeProvider, $translateProvider, $compileProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'web/index.html'
            })
            .when('/settings', {
                templateUrl: 'web/settings/index.html'
            })
        ;

        $translateProvider.useStaticFilesLoader({
            prefix: 'build/translated/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('fi');
        $translateProvider.useSanitizeValueStrategy(false);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
})();