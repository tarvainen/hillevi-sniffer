(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Inspector', [
        'App.Inspector.Filters',
        'App.Inspector.Services'
    ]);

    /**
     * Initializations.
     */
    angular.module('App.Inspector')
        .run(run)
    ;

    /////////////////

    run.$inject = ['$rootScope', '$filter', 'InspectorDataService'];

    /**
     * Run once to require gkm and init listeners.
     *
     * @param {*} $rootScope
     * @param {*} $filter
     * @param {*} InspectorDataService
     */
    function run ($rootScope, $filter, InspectorDataService) {
        var gkm = require('gkm');

        gkm.events.on('key.released', function (e) {
            InspectorDataService.key(e[0]);
            $rootScope.$emit('key', $filter('$key')(e[0]));
        });

        gkm.events.on('mouse.moved', function (e) {
            InspectorDataService.mouseMoved(e[0]);
        });

        gkm.events.on('mouse.pressed', function (e) {
            InspectorDataService.mouseClicked(e[0]);
        });
    }

})();