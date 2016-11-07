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
        '$rootScope', '$interval', 'InspectorDataService', 'DataService', '$filter'
    ];

    /**
     * Main controller for the whole app.
     *
     * @param {*} $rootScope
     * @param {*} $interval
     * @param {*} InspectorDataService
     * @param {*} DataService
     * @param {*} $filter
     *
     * @constructor
     */
    function MainController (
        $rootScope, $interval, InspectorDataService, DataService, $filter
    ) {
        // Watch global events
        $rootScope.$on('mouseMoved', onMouseMoved);
        $rootScope.$on('mouseClicked', onMouseClicked);
        $rootScope.$on('keyReleased', onKeyReleased);
        $rootScope.$on('keyCombo', onKeyCombo);
        $rootScope.$on('activeWindowDetected', onActiveWindowDetected);

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

            // Send data to the server
            DataService.get('/api/mod/pcinspect/push', {
                data: [
                    {
                        time: InspectorDataService.getTimeRange(),
                        keys: keysPressed,
                        mousePosition: mousePosition,
                        mouseClicks: mouseClicks,
                        activeWindows: activeWindows,
                        keyCombos: keyCombos,
                        mousePath: mousePath,
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

        /**
         * Fired when the mouse is moved.
         *
         * @param   {*}  e
         * @param   {*} data
         */
        function onMouseMoved (e, data) {
            InspectorDataService.registerMouseMove(data);
        }

        /**
         * Fired when the mouse is clicked.
         *
         * @param   {*}  e
         * @param   {*} data
         */
        function onMouseClicked (e, data) {
            InspectorDataService.registerMouseClick(data);
        }

        /**
         * Fired when a keyboard key is released.
         *
         * @param   {*}  e
         * @param   {*} data
         */
        function onKeyReleased (e, data) {
            InspectorDataService.registerKeyPress(data);
        }

        /**
         * Fired when a key combo is detected.
         *
         * @param   {*}  e
         * @param   {*} data
         */
        function onKeyCombo (e, data) {
            InspectorDataService.registerKeyCombo(data);
        }

        /**
         * Fires when the active window information is fetched.
         *
         * @param   {*}  e
         * @param   {*} data
         */
        function onActiveWindowDetected (e, data) {
            InspectorDataService.registerActiveWindow(data);
        }
    }

})();