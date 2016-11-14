(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Settings.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('Settings.Controllers')
        .controller('Settings.MainController', MainController)
    ;

    //////////////

    MainController.$inject = ['SettingsDataService', '$toast'];

    /**
     * Main controller for the settings interface.
     *
     * @param {*} SettingsDataService
     * @param {*} $toast
     *
     * @constructor
     */
    function MainController (SettingsDataService, $toast) {
        var vm = this;

        vm.settings = SettingsDataService.getSettings();

        /**
         * Saves the url and the token to the local storage. Then just test if those works?
         */
        vm.saveAndTest = function saveAndTest () {
            SettingsDataService.save(vm.settings);

            SettingsDataService.test().then(onSuccess, onError);

            /**
             * Called when the api connection is made successfully.
             */
            function onSuccess () {
                $toast('API_CONNECTION_TEST_SUCCESSFUL');
            }

            /**
             * Called when the api connection fails.
             */
            function onError () {
                $toast('API_CONNECTION_TEST_FAILED');
            }
        };
    }
})();