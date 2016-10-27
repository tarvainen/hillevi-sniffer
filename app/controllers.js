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

    MainController.$inject = ['$scope', '$interval', 'InspectorDataService', 'DataService', '$filter'];

    /**
     * Main controller for the whole app.
     *
     * @param {*} $scope
     * @param {*} $interval
     * @param {*} InspectorDataService
     * @param {*} DataService
     * @param {*} $filter
     *
     * @constructor
     */
    function MainController ($scope, $interval, InspectorDataService, DataService, $filter) {
        var vm = this;

        vm.active = true;

        $scope.$watch('vm.active', activeWatcher);

        /**
         * Watcher for the activity changes.
         *
         * @param {*}  valueNew
         * @param {*}  valueOld
         */
        function activeWatcher (valueNew, valueOld) {
            $scope.$broadcast('activityChanged', valueNew);
        }

        // Read and send data in the intervals of one minute
        $interval(sendData, 1000 * 60);

        /**
         * Sends the inspected data to the server. If send fails for some reason
         * we save the data to the local storage for later usage.
         */
        function sendData () {
            if (!vm.active) {
                // TODO: save to local storage and return
                return;
            }

            var mouse = InspectorDataService.getAverageMousePosition();
            var keys = InspectorDataService.getKeys();
            var clicks = InspectorDataService.getClicks();

            // Send data to the server
            DataService.get('/api/mod/pcinspect/push', {
                data: [
                    {
                        timestamp: $filter('date')(Date.now(), 'dd.MM.yyyy HH:mm:ss'),
                        keys: keys
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