(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Filters', []);

    /**
     * Filter definitions.
     */
    angular.module('App.Filters')
        .filter('toArray', toArray)
    ;

    /////////////

    /**
     * Convert an object to array for using it in the ngRepeat.
     *
     * @return {Function}
     */
    function toArray () {
        return function (input) {
            var result = [];

            Object.keys(input)
                .map(function(key) {
                    result.push(input[key]);
                });

            return result;
        }
    }

})();