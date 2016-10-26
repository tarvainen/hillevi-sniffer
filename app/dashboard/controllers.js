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
    ;
    
    ///////////////

    MainController.$inject = ['$rootScope', '$scope', '$interval', 'DashboardDataService'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     * @param {*}   $scope
     * @param {*}   $interval
     * @param {*}   DashboardDataService
     * @constructor
     */
    function MainController ($rootScope, $scope, $interval, DashboardDataService) {
        var vm = this;

        vm.active = true;

        // Listen variable changes
        $rootScope.$on('key', onKeyPressed);
        $scope.$on('activityChanged', onActivityChanged);

        // TODO: fetch the interval from user's settings
        $interval(calculateValues, 1000);

        vm.typingSpeed = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        vm.labels = ['10s', '9s', '8s', '6s', '5s', '4s', '3s', '2s', '1s'];

        /**
         * Calculates the values for the typing speed. Then update the UI.
         */
        function calculateValues () {
            vm.typingSpeed[0].shift();
            vm.typingSpeed[0].push(DashboardDataService.getTypingSpeed());
        }

        /**
         * Fires when the key is pressed.
         *
         * @param {*} e
         * @param {*} key
         */
        function onKeyPressed (e, key) {
            DashboardDataService.addKey(key);
        }

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

})();