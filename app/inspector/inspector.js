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

        var pressed = [];
        var comboBit = false;

        gkm.events.on('key.pressed', function (e) {
            if (pressed.indexOf(e[0]) < 0) {
                pressed.push(e[0]);
            }

            comboBit = true;
        });

        gkm.events.on('key.released', function (e) {
            var key = $filter('$key')(e[0]);

            if (pressed.length > 1 && comboBit) {
                InspectorDataService.combo(pressed);
                $rootScope.$emit('combo', pressed);
            }

            comboBit = false;

            pressed.splice(pressed.indexOf(e[0]), 1);

            InspectorDataService.key(key[0]);
            $rootScope.$emit('key', key);
        });

        gkm.events.on('mouse.moved', function (e) {
            InspectorDataService.mouseMoved(e[0]);
        });

        gkm.events.on('mouse.pressed', function (e) {
            InspectorDataService.mouseClicked(e[0]);
        });
    }

})();