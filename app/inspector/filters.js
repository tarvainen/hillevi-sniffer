(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Inspector.Filters', []);

    /**
     * Filter initialization.
     */
    angular.module('App.Inspector.Filters')
        .filter('$key', $key)
    ;

    ////////////

    /**
     * Map the key for the right keyboard layout.
     *
     * @returns {Function}
     */
    function $key () {
        var mapping = {
            'Quote': 'AE',
            'Open Bracket': 'OU',
            'Close Bracket': '^',
            'Semicolon': 'OE',
            'Slash': 'Minus',
            'Minus': 'QuestionMark'
        };

        return function (input) {
            return 'key_' + (mapping[input] || input).replace(/\s/g, '');
        }
    }
})();