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

    MainController.$inject = ['$rootScope', '$timeout', '$filter', 'LocalDataService'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     * @param {*}   $timeout
     * @param {*}   $filter
     * @param {*}   LocalDataService
     *
     * @constructor
     */
    function MainController ($rootScope, $timeout, $filter, LocalDataService) {
        var vm = this;

        $rootScope.$on('localDataChanged', onLocalDataChanged);
        vm.localData = LocalDataService.getData();

        /**
         * Fires when the local data is changed.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onLocalDataChanged (e, data) {
            $timeout(function () {
                vm.localData = data;
                vm.localData.keyCombosArray = $filter('toArray')(vm.localData.keyCombos.combos);
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