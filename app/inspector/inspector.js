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

        // Global listener for key press event
        gkm.events.on('key.pressed', function (e) {
            if (pressed.indexOf(e[0]) < 0) {
                pressed.push(e[0]);
            }

            comboBit = true;
        });

        // Global listener for key released event
        gkm.events.on('key.released', function (e) {
            var key = $filter('$key')(e[0]);

            if (pressed.length > 1 && comboBit) {
                $rootScope.$emit('keyCombo', pressed);
            }

            comboBit = false;

            pressed.splice(pressed.indexOf(e[0]), 1);

            $rootScope.$emit('keyReleased', key);
        });

        // Global listener for the mouse move event
        gkm.events.on('mouse.moved', function (e) {
            $rootScope.$emit('mouseMoved', e[0]);
        });

        // Global listener for the mouse press event
        gkm.events.on('mouse.pressed', function (e) {
            $rootScope.$emit('mouseClicked', e[0]);
        });
    }

})();