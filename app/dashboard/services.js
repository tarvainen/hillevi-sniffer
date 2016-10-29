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
        .factory('DashboardDataService', DashboardDataService)
    ;

    //////////

    DashboardDataService.$inject = ['DataService'];

    /**
     * Data service for the dashboard.
     *
     * @param {*} DataService
     *
     * @returns {*}
     * @constructor
     */
    function DashboardDataService (DataService) {
        var keys = [];
        var keyCount = 0;
        var timestamp = Date.now();

        return {
            addKey: addKey,
            getTypingSpeed: getTypingSpeed,
            getLocalData: getLocalData,
            saveLocalData: saveLocalData
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

        /**
         * Get the local data which has nothing to do with the data pushed to the server.
         *
         * @return {*}
         */
        function getLocalData () {
            var data = DataService.storage.get('localData');

            // If the last data was saved today, lets return that
            if (data && data.timestamp ) {
                if (new Date(data.timestamp).getDate() !== new Date().getDate()) {
                    data.currentTypingSpeed = 0;
                    data.keysToday = 0;
                }

                return data;
            }

            return {
                currentTypingSpeed: 0,
                keysToday: 0,
                keyCombos: {
                    timestamp: new Date(),
                    combos: {}
                },
                totalKeys: {
                    timestamp: new Date(),
                    value: 0
                }
            };
        }

        /**
         * Save the local data so it won't get lost between application restartings.
         *
         * @param  {*} localData
         *
         * @return {*}
         */
        function saveLocalData (localData) {
            localData.timestamp = new Date();
            return DataService.storage.set('localData', localData);
        }
    }

})();