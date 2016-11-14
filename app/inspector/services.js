(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Inspector.Services', []);

    /**
     * Service initialization.
     */
    angular.module('App.Inspector.Services')
        .factory('InspectorDataService', InspectorDataService)
    ;

    ///////////////

    InspectorDataService.$inject = ['$filter'];

    /**
     * Service for the inspector's data.
     *
     * @returns {*}
     *
     * @constructor
     */
    function InspectorDataService ($filter) {
        var service = this;
        var idleStart = -1;

        // Initialize values
        reset();

        return {
            reset: reset,
            registerKeyPress: registerKeyPress,
            registerMouseMove: registerMouseMove,
            registerMouseClick: registerMouseClick,
            registerKeyCombo: registerKeyCombo,
            registerActiveWindow: registerActiveWindow,
            registerPasteEvent: registerPasteEvent,
            registerIdleStart: registerIdleStart,
            registerIdleEnd: registerIdleEnd,
            getKeys: getKeys,
            getClicks: getClicks,
            getActiveWindows: getActiveWindows,
            getKeyCombos: getKeyCombos,
            getAverageMousePosition: getAverageMousePosition,
            getTimeRange: getTimeRange,
            getMousePositionBundle: getMousePositionBundle,
            getCommonUsageDataBundle: getCommonUsageDataBundle,
            getMouseTravelDistance: getMouseTravelDistance
        };

        /**
         * Clear all the value arrays.
         */
        function reset () {
            service.start = new Date();
            service.keys = {};
            service.clicks = [];
            service.combos = {};
            service.stroke = 0;
            service.windows = {};
            service.keyDownTimes = [];
            service.mousePositionBundle = '';
            service.pasted = 0;
            service.idleTime = 0.0;
            service.mouseTravelDistance = 0;

            if (service.mouse && service.mouse.x.length > 0) {
                service.mouse.x = [service.mouse.x.pop()];
                service.mouse.y = [service.mouse.y.pop()];
            } else {
                service.mouse = {
                    x: [],
                    y: []
                };
            }
        }

        /**
         * Add key to the pressed keys array.
         *
         * @param {*} keyData
         */
        function registerKeyPress (keyData) {
            if (!service.keys[keyData.key]) {
                service.keys[keyData.key] = 0;
            }

            service.keys[keyData.key]++;
            service.stroke++;
            service.keyDownTimes.push(keyData.downTime);
        }

        /**
         * Add mouse position to the mouse position array.
         *
         * @param {string} pos
         */
        function registerMouseMove (pos) {
            var position = pos.split(',');

            var x1 = service.mouse.x[service.mouse.x.length - 1] || 0;
            var y1 = service.mouse.y[service.mouse.y.length - 1] || 0;

            var x2 = parseInt(position[0]);
            var y2 = parseInt(position[1]);

            service.mouseTravelDistance += Math.sqrt(
                Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            );

            service.mouse.x.push(x2);
            service.mouse.y.push(y2);
            service.mousePositionBundle += position.join('|') + ';';
        }

        /**
         * Push the mouse button with the coordinate value to the clicks array.
         *
         * @param {string} btn
         */
        function registerMouseClick (btn) {
            var values = [
                btn,
                service.mouse.x[service.mouse.x.length - 1],
                service.mouse.y[service.mouse.y.length - 1]
            ];

            service.clicks.push(values.join(';'));
        }

        /**
         * Push the detected key combo to the combo array.
         *
         * @param {[]} data
         */
        function registerKeyCombo (data) {
            var combo = data.join(' + ');

            if (!service.combos[combo]) {
                service.combos[combo] = 0;
            }

            service.combos[combo]++;
        }

        /**
         * Push the active window information.
         *
         * @param {*} data
         */
        function registerActiveWindow (data) {
            if (!service.windows[data.app]) {
                service.windows[data.app] = 0;
            }

            service.windows[data.app]++;
        }

        /**
         * Register the paste event.
         *
         * @param {number} len
         */
        function registerPasteEvent (len) {
            service.pasted += len;
        }

        /**
         * Register the idle start.
         */
        function registerIdleStart () {
            idleStart = Date.now();
        }

        /**
         * Register the idle end.
         */
        function registerIdleEnd () {
            service.idleTime += Date.now() - idleStart;
            idleStart = -1;
        }

        /**
         * Get all registered keys.
         *
         * @returns {*[]}
         */
        function getKeys () {
            service.keys.total = service.stroke;
            service.keys.keyDownTime = $filter('avg')(service.keyDownTimes);
            service.keys.pasted = service.pasted;
            return service.keys;
        }

        /**
         * Get the average mouse position since the last reset. If mouse has not moved at all,
         * we will return the last position the mouse was stuck to.
         *
         * @returns {*}
         */
        function getAverageMousePosition () {
            return {
                x: Math.round($filter('avg')(service.mouse.x)),
                y: Math.round($filter('avg')(service.mouse.y))
            };
        }

        /**
         * Returns the mouse clicks as a shuffled array.
         *
         * @returns {*[]}
         */
        function getClicks () {
            return $filter('mix')(service.clicks);
        }

        /**
         * Returns the registered active window data.
         *
         * @return {*}
         */
        function getActiveWindows () {
            return service.windows;
        }

        /**
         * Returns the registered key combos.
         *
         * @return {*}
         */
        function getKeyCombos () {
            return service.combos;
        }

        /**
         * Returns the time range.
         *
         * @return {*}
         */
        function getTimeRange () {
            return {
                start: $filter('date')(service.start, 'dd.MM.yyyy HH:mm:ss'),
                end: $filter('date')(new Date(), 'dd.MM.yyyy HH:mm:ss')
            };
        }

        /**
         * Returns the mouse position bundle string to be sent to the server.
         *
         * @returns {string|*|string}
         */
        function getMousePositionBundle () {
            return service.mousePositionBundle;
        }

        /**
         * Returns an object containing some common usage data.
         *
         * @returns {*}
         */
        function getCommonUsageDataBundle () {
            if (idleStart !== -1) {
                registerIdleEnd();
                registerIdleStart();
            }

            return {
                idleTime: service.idleTime
            };
        }

        /**
         * Returns the mouse travel distance.
         *
         * @returns {number|*}
         */
        function getMouseTravelDistance () {
            return service.mouseTravelDistance;
        }
    }

})();