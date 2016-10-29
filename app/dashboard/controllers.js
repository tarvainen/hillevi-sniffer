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

    MainController.$inject = ['$rootScope', '$scope', '$interval', 'DashboardDataService', '$timeout', '$filter'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     * @param {*}   $scope
     * @param {*}   $interval
     * @param {*}   DashboardDataService
     * @param {*}   $timeout
     * @param {*}   $filter
     *
     * @constructor
     */
    function MainController ($rootScope, $scope, $interval, DashboardDataService, $timeout, $filter) {
        var vm = this;

        vm.active = true;

        // Contains the local data which user may reset and do other random stuff with that
        vm.localData = DashboardDataService.getLocalData();

        // Listen variable changes
        $rootScope.$on('key', onKeyPressed);
        $rootScope.$on('combo', onKeyCombo);
        $scope.$on('activityChanged', onActivityChanged);

        // TODO: fetch the interval from user's settings
        $interval(calculateValues, 1000);

        vm.typingSpeed = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        vm.labels = ['10s', '9s', '8s', '6s', '5s', '4s', '3s', '2s', '1s'];

        /**
         * Calculates the values for the typing speed. Then update the UI.
         */
        function calculateValues () {
            vm.localData.currentTypingSpeed = DashboardDataService.getTypingSpeed();

            vm.typingSpeed[0].shift();
            vm.typingSpeed[0].push(vm.localData.currentTypingSpeed);

            // Save the data to the local storage so it won't get lost
            DashboardDataService.saveLocalData(vm.localData);
        }

        /**
         * Fires when the key is pressed.
         *
         * @param {*} e
         * @param {*} key
         */
        function onKeyPressed (e, key) {
            $timeout(function () {
                vm.localData.keysToday++;
                vm.localData.totalKeys.value++;

                DashboardDataService.addKey(key);
            });
        }

        /**
         * Fires then the key combo is detected.
         *
         * @param {*}  e
         * @param {[]} combo
         */
        function onKeyCombo (e, combo) {
            var comboName = combo.join(' + ');

            if (!vm.localData.keyCombos.combos[comboName]) {
                vm.localData.keyCombos.combos[comboName] = {
                    combo: comboName,
                    amount: 0
                };
            }

            vm.localData.keyCombos.combos[comboName].amount++;
            vm.localData.keyCombosArray = $filter('toArray')(vm.localData.keyCombos.combos);
        }

        /**
         * Reset the total keys.
         */
        vm.onTotalKeyReset = function onTotalKeyReset () {
            vm.localData.totalKeys.timestamp = new Date();
        };

        /**
         * Fires when the activity switch is changed.
         *
         * @param {*} e
         * @param {*} val
         */
        function onActivityChanged (e, val) {
            vm.active = val;
        }
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