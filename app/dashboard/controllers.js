(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Dashboard.Controllers')
        .controller('Dashboard.MainController', MainController)
        .controller('Dashboard.SimpleWidgetController', SimpleWidgetController)
        .controller('Dashboard.GenericWidgetController', GenericWidgetController)
    ;
    
    ///////////////

    MainController.$inject = ['$rootScope', '$timeout', '$filter', '$interval', 'LocalDataService'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     * @param {*}   $timeout
     * @param {*}   $filter
     * @param {*}   $interval
     * @param {*}   LocalDataService
     *
     * @constructor
     */
    function MainController ($rootScope, $timeout, $filter, $interval, LocalDataService) {
        var vm = this;

        $rootScope.$on('localDataChanged', onLocalDataChanged);
        $interval(updateChart, 1000 * 60); // Update the chart in one minute cycles

        vm.localData = LocalDataService.getData();

        // Initialize temp data
        vm.tmpData = {
            lastTotalKeys: 0,
            keys: 0,
            typingSpeedTrend: {
                data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                labels: ['10min', '9min', '8min', '7min', '6min', '5min', '4min', '3min', '2min', '1min']
            }
        };

        /**
         * Update the chart showing the typing speed trend over last ten minutes.
         */
        function updateChart () {
            vm.tmpData.typingSpeedTrend.data[0].shift();
            vm.tmpData.typingSpeedTrend.data[0].push(vm.tmpData.keys);
            vm.tmpData.keys = 0;
        }

        /**
         * Fires when the local data is changed.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onLocalDataChanged (e, data) {
            $timeout(function () {
                if (data.totalKeys.value !== vm.tmpData.lastTotalKeys) {
                    vm.tmpData.keys++;
                }

                vm.tmpData.lastTotalKeys = data.totalKeys.value;

                vm.localData = data;
                vm.localData.keyCombosArray = $filter('toArray')(vm.localData.keyCombos.combos);
                vm.localData.activeWindowsArray = $filter('toArray')(vm.localData.activeWindows);
            });
        }

        /**
         * Fired when the total keys widget is reset.
         */
        vm.onTotalKeyReset = function () {
            vm.localData.totalKeys.timestamp = new Date();
        };
    }

    SimpleWidgetController.$inject = ['UIService'];

    /**
     * Controller for the simple widget.
     *
     * @param {*}    UIService
     *
     * @constructor
     */
    function SimpleWidgetController (UIService) {
        var vm = this;

        vm.color = vm.color || UIService.getRandomColor();

        vm.reset = function reset ($event) {
            $event.target.blur();
            vm.value = 0;

            if (vm.onReset instanceof Function) {
                vm.onReset();
            }
        };
    }

    /**
     * Controller for the generic widget.
     *
     * @constructor
     */
    function GenericWidgetController () {
        var vm = this;
    }

})();