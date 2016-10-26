(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Controllers')
        .controller('MainController', MainController)
    ;

    ////////////

    MainController.$inject = ['$interval', 'InspectorDataService'];

    /**
     * Main controller for the whole app.
     *
     * @param {*} $interval
     * @param {*} InspectorDataService
     *
     * @constructor
     */
    function MainController ($interval, InspectorDataService) {
        // Read and send data in the intervals of one minute
        $interval(sendData, 1000 * 60);

        /**
         * Sends the inspected data to the server. If send fails for some reason
         * we save the data to the local storage for later usage.
         */
        function sendData () {
            var mouse = InspectorDataService.getAverageMousePosition();
            var keys = InspectorDataService.getKeys();
            var clicks = InspectorDataService.getClicks();

            // TODO: send data
            InspectorDataService.reset();
        }
    }

})();