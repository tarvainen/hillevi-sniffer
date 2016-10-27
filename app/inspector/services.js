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

        // Initialize values
        reset();

        return {
            key: key,
            mouseMoved: mouseMoved,
            mouseClicked: mouseClicked,
            reset: reset,
            getKeys: getKeys,
            getClicks: getClicks,
            getAverageMousePosition: getAverageMousePosition
        };

        /**
         * Add key to the pressed keys array.
         *
         * @param {string} value
         */
        function key (value) {
            var key = $filter('$key')(value);

            if (!service.keys[key]) {
                service.keys[key] = 0;
            }

            service.keys[key]++;
        }

        /**
         * Add mouse position to the mouse position array.
         *
         * @param {string} pos
         */
        function mouseMoved (pos) {
            var position = pos.split(',');

            service.mouse.x.push(parseInt(position[0]));
            service.mouse.y.push(parseInt(position[1]));
        }

        /**
         * Push the mouse button with the coordinate value to the clicks array.
         *
         * @param {string} btn
         */
        function mouseClicked (btn) {
            var values = [
                btn,
                service.mouse.x[service.mouse.x.length - 1],
                service.mouse.y[service.mouse.y.length - 1]
            ];

            service.clicks.push(values.join(';'));
        }

        /**
         * Clear all the value arrays.
         */
        function reset () {
            service.keys = {};
            service.clicks = [];

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
         * Get all registered keys.
         *
         * @returns {*[]}
         */
        function getKeys () {
            return service.keys;
        }

        /**
         * Get the average mouse position since the last reset. If mouse has not moved at all,
         * we will return the last position the mouse was stuck to.
         *
         * @returns {*[]}
         */
        function getAverageMousePosition () {
            return [
                Math.round(avg(service.mouse.x)),
                Math.round(avg(service.mouse.y))
            ];

            /**
             * Calculate the average of values.
             *
             * @param  {[]} values
             *
             * @returns {number}
             */
            function avg (values) {
                if (!values || values.length === 0) {
                    return 0;
                }

                return values.reduce(function (p, c) {
                    return p + c;
                }) / values.length;
            }
        }

        /**
         * Returns the mouse clicks as a shuffled array.
         *
         * @returns {*[]}
         */
        function getClicks () {
            return mix(service.clicks).join('\n');
        }

        /**
         * Mix the data to the random order.
         *
         * @param {[]} a
         *
         * @returns {[]}
         */
        function mix (a) {
            var j, x, i;

            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }

            return a;
        }
    }
})();