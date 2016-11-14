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

    MainController.$inject = [
        '$interval', 'InspectorDataService', 'DataService'
    ];

    /**
     * Main controller for the whole app.
     *
     * @param {*} $interval
     * @param {*} InspectorDataService
     * @param {*} DataService
     *
     * @constructor
     */
    function MainController (
        $interval, InspectorDataService, DataService
    ) {
        // Read and send data in the intervals of one minute
        // TODO: read from settings
        $interval(sendData, 1000 * 60);

        /**
         * Sends the inspected data to the server. If send fails for some reason
         * we save the data to the local storage for later usage.
         */
        function sendData () {
            var data = InspectorDataService.getBundledData();

            // Send data to the server
            DataService.get('/api/mod/pcinspect/push', {
                data: [ data ] // api reads data in arrays
            }).then(onSuccess, onError);

            /**
             * Fired when the data is successfully sent to the server.
             */
            function onSuccess () {
                InspectorDataService.reset();
            }

            /**
             * Error handler.
             */
            function onError () {
                // TODO: handle error
            }
        }
    }

})();