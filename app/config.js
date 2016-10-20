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
     */
    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'web/index.html'
            });
    }
})();