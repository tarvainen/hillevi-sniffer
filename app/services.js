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
        .factory('UIService', UIService)
        .factory('$toast', $toast)
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

    /**
     * Service for the ui data handling.
     *
     * @return {*}
     *
     * @constructor
     */
    function UIService () {
        var colors = [
            '#F4DCFE',
            '#FFA8A8',
            '#FF73B9',
            '#A9C5EB',
            '#72FE95',
            '#86BCFF',
            '#80B584'
        ];

        return {
            getColors: getColors,
            getRandomColor: getRandomColor
        };

        /**
         * Function to fetch array of random color to be attached like to a random colored text.
         *
         * @return {*}
         */
        function getColors () {
            return colors;
        }

        /**
         * Returns a random color from the random color array.
         *
         * @return {string}
         */
        function getRandomColor () {
            return colors[Math.round(Math.random() * colors.length)];
        }
    }

    $toast.$inject = ['$mdToast', '$translate'];

    /**
     * The toast service for making toasts.
     *
     * @param   {*} $mdToast
     * @param   {*} $translate
     *
     * @returns {Function}
     */
    function $toast ($mdToast, $translate) {
        return function (text) {
            $translate(text).then(onTranslation);

            /**
             * Create the toast after the translation text is returned.
             *
             * @param {string}  translation
             */
            function onTranslation (translation) {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .textContent(translation)
                        .hideDelay(3000)
                );
            }
        }
    }

})();