(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Services', []);

    /**
     * Service initializations.
     */
    angular.module('App.Dashboard.Services')
        .factory('DashboardDataService', DataService)
    ;

    //////////

    /**
     * Data service for the dashboard.
     *
     * @returns {*}
     * @constructor
     */
    function DataService () {
        var keys = [];
        var keyCount = 0;
        var timestamp = Date.now();

        return {
            addKey: addKey,
            getTypingSpeed: getTypingSpeed
        };

        /**
         * Add a key to the memory.
         *
         * @param {string} key
         */
        function addKey (key) {
            keys.push(key);
            keyCount++;
        }

        /**
         * Return the typing speed since last request.
         *
         * @param {string} scale
         *
         * @returns {number}
         */
        function getTypingSpeed (scale) {
            var divider = {'min': 60 * 1000, 'sec': 1000 }[scale || 'sec'] || 100;

            var seconds = (Date.now() - timestamp) / divider;
            timestamp = Date.now();
            var speed = Math.round(keyCount / seconds);

            keyCount = 0;

            return speed;
        }
    }

})();