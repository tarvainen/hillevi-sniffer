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
        $interval(sendData, 1000 * 60);

        /**
         * Sends the inspected data to the server. If send fails for some reason
         * we save the data to the local storage for later usage.
         */
        function sendData () {
            var mousePosition = InspectorDataService.getAverageMousePosition();
            var keysPressed = InspectorDataService.getKeys();
            var mouseClicks = InspectorDataService.getClicks();
            var activeWindows = InspectorDataService.getActiveWindows();
            var keyCombos = InspectorDataService.getKeyCombos();
            var mousePath = InspectorDataService.getMousePositionBundle();
            var common = InspectorDataService.getCommonUsageDataBundle();
            var mouseTravelDistance = InspectorDataService.getMouseTravelDistance();

            // Send data to the server
            DataService.get('/api/mod/pcinspect/push', {
                data: [
                    {
                        time: InspectorDataService.getTimeRange(),
                        keys: keysPressed,
                        mousePosition: mousePosition,
                        mouseTravelDistance: mouseTravelDistance,
                        mouseClicks: mouseClicks,
                        activeWindows: activeWindows,
                        keyCombos: keyCombos,
                        mousePath: mousePath,
                        common: common,
                        screen: {
                            width: window.screen.width,
                            height: window.screen.height
                        }
                    }
                ]
            }).then(onSuccess);

            /**
             * Fired when the data is successfully sent to the server.
             */
            function onSuccess () {
                InspectorDataService.reset();
            }
        }
    }

})();