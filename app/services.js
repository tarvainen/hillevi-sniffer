(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Services', []);

    /**
     * Service definitions.
     */
    angular.module('App.Services')
        .factory('DataService', DataService)
    ;
    
    ///////////

    DataService.$inject = ['$http', '$httpParamSerializerJQLike', '$window'];

    /**
     * Data service for the whole app.
     *
     * @param {*} $http
     * @param {*} $httpParamSerializerJQLike
     * @param {*} $window
     *
     * @constructor
     */
    function DataService ($http, $httpParamSerializerJQLike, $window) {
        return {
            get: get,
            storage: {
                get: getFromStorage,
                set: setToStorage
            }
        };

        /**
         * Makes a call to the given route.
         *
         * @param {string} path
         * @param {*}      params
         *
         * @returns {*}
         */
        function get (path, params) {
            var options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': getFromStorage('settings').token || ''
                }
            };

            return $http.post(getFromStorage('settings').url + path, $httpParamSerializerJQLike(params || {}), options);
        }

        /**
         * Returns an item from the local storage.
         *
         * @param   {string}    key
         */
        function getFromStorage (key) {
            try {
                return JSON.parse($window.localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        }

        /**
         * Sets the item to the local storage.
         *
         * @param   {string}    key
         * @param   {string}    value
         */
        function setToStorage (key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        }
    }

})();