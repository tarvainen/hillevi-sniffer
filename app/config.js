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
     * @param {*} ChartJsProvider
     */
    function config ($routeProvider, $translateProvider, $compileProvider, ChartJsProvider) {
        // Setup chart.js
        ChartJsProvider.setOptions('bubble', {
            scales: {
                responsive: false,
                maintainAspectRatio: false,
                xAxes: [{
                    display: false,
                    ticks: {
                        max: window.screen.width,
                        min: 0,
                        stepSize: 10
                    }
                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        max: window.screen.height,
                        min: 0,
                        stepSize: 10
                    }
                }]
            },
            animation: false,
            tooltips: false
        });

        $routeProvider
            .when('/', {
                templateUrl: 'web/index.html',
                controller: 'Dashboard.MainController',
                controllerAs: 'vm'
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

        // Define countdown's display format
        countdown.setFormat({
            plural: 'ms|s|min|h|d||||',
            singular: 'ms|s|min|h|d||||',
            last: ' '
        });
    }
})();