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
        .filter('mix', mix)
        .filter('avg', avg)
        .filter('countdown', _countdown)
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

    /**
     * Mix the data to the random order.
     *
     * @returns {Function}
     */
    function mix () {
        return function (a) {
            var j, x, i;

            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }

            return a;
        }
    }

    /**
     * Calculate the average of values
     *
     * @returns {Function}
     */
    function avg () {
        return function avg (values) {
            if (!values || values.length === 0) {
                return 0;
            }

            return values.reduce(function (p, c) {
                    return p + c;
                }) / values.length;
        }
    }

    /**
     * Converts the input (in seconds) to the countdown format like '4min 14s'
     *
     * @return {Function}
     *
     * @private
     */
    function _countdown () {
        function c (input) {
            var date = new Date().setTime(Date.now() + parseInt(input) * 1000);
            return countdown(date).toString();
        }

        return c;
    }

})();