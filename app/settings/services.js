(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Settings.Services', []);

    /**
     * Service definitions.
     */
    angular.module('Settings.Services')
        .factory('SettingsDataService', SettingsDataService)
    ;

    ///////

    SettingsDataService.$inject = ['DataService'];

    /**
     * Data service for the settings interface.
     *
     * @returns {*}
     *
     * @constructor
     */
    function SettingsDataService (DataService) {
        return {
            save: save,
            getSettings: getSettings,
            test: test
        };

        /**
         * Test that the url and token are valid.
         *
         * @param {string} url
         * @param {string} token
         */
        function test (url, token) {
            // TODO: Implement some testing route to check if url and token are valid
        }

        /**
         * Fetch settings from the local storage.
         *
         * @returns {*}
         */
        function getSettings () {
            return DataService.storage.get('settings');
        }

        /**
         * Saves the settings to the local storage.
         *
         * @param settings
         */
        function save (settings) {
            DataService.storage.set('settings', settings);
        }
    }

})();