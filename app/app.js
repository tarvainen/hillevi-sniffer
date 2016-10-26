(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App', [
        'ngMaterial',
        'pascalprecht.translate',
        'chart.js',
        'App.Config',
        'App.Controllers',
        'App.Services',
        'App.Inspector',
        'App.Dashboard',
        'Settings'
    ]);

})();