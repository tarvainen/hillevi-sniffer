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

    run.$inject = ['InspectorDataService'];

    /**
     * Run once to require gkm and init listeners.
     *
     * @param {*} InspectorDataService
     */
    function run (InspectorDataService) {
        var gkm = require('gkm');

        gkm.events.on('key.released', function (e) {
            InspectorDataService.key(e[0]);
        });

        gkm.events.on('mouse.moved', function (e) {
            InspectorDataService.mouseMoved(e[0]);
        });

        gkm.events.on('mouse.pressed', function (e) {
            InspectorDataService.mouseClicked(e[0]);
        });
    }

})();