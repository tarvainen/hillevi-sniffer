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

    MainController.$inject = ['SettingsDataService'];

    /**
     * Main controller for the settings interface.
     *
     * @constructor
     */
    function MainController (SettingsDataService) {
        var vm = this;

        vm.settings = SettingsDataService.getSettings();

        /**
         * Saves the url and the token to the local storage. Then just test if those works?
         */
        vm.saveAndTest = function saveAndTest () {
            SettingsDataService.save(vm.settings);
            if (SettingsDataService.test(vm.settings.url, vm.settings.token)) {
                // TODO: make success notification
            } else {
                // TODO: make error
            }
        };
    }
})();