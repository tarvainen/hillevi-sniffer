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

    run.$inject = ['$rootScope', '$filter', '$interval'];

    /**
     * Run once to require gkm and init listeners.
     *
     * @param {*} $rootScope
     * @param {*} $filter
     * @param {*} $interval
     */
    function run ($rootScope, $filter, $interval) {
        var gkm = require('gkm');

        var pressed = [];
        var comboBit = false;
        var timingKeys = {};

        // Global listener for key press event
        gkm.events.on('key.pressed', function (e) {
            timingKeys[e[0]] = Date.now();

            if (pressed.indexOf(e[0]) < 0) {
                pressed.push(e[0]);
            }

            comboBit = true;
        });

        // Global listener for key released event
        gkm.events.on('key.released', function (e) {
            var duration = Date.now() - timingKeys[e[0]];

            var key = $filter('$key')(e[0]);

            if (pressed.length > 1 && comboBit) {
                if (angular.equals(pressed, ['Left Control', 'V']) ||
                    angular.equals(pressed, ['Right Control', 'V'])
                ) {
                    // Yes, we really have always to require this again and again
                    var gui = require('nw.gui');
                    var clipboard = gui.Clipboard.get();
                    $rootScope.$emit('paste', clipboard.get('text'));
                }

                $rootScope.$emit('keyCombo', pressed);
            }

            comboBit = false;

            pressed.splice(pressed.indexOf(e[0]), 1);

            $rootScope.$emit('keyReleased', {
                key: key,
                downTime: duration
            });
        });

        // Global listener for the mouse move event
        gkm.events.on('mouse.moved', function (e) {
            $rootScope.$emit('mouseMoved', e[0]);
        });

        // Global listener for the mouse press event
        gkm.events.on('mouse.pressed', function (e) {
            $rootScope.$emit('mouseClicked', e[0]);
        });

        var activeWindow = require('active-window');

        // "Listen" the active window. We don't have event based way to do this so let's do it by polling.
        $interval(function () {
            activeWindow.getActiveWindow(function (window) {
                var data = {
                    app: strip(window.app.replace(/\s/g, '')).split(',')[1],
                    title: strip(window.title)
                };

                $rootScope.$emit('activeWindowDetected', data);
            });

            /**
             * Strips the quotation marks out of the text.
             *
             * @param {string} name
             *
             * @return {*}
             */
            function strip (name) {
                return name.replace(/["]/g, '');
            }
        }, 1000);
    }

})();