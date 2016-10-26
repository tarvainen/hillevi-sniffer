(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App', [
        'ngMaterial',
        'pascalprecht.translate',
        'App.Config',
        'App.Controllers',
        'App.Services',
        'App.Inspector',
        'Settings'
    ]);

})();