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
            'Quote': 'Ä',
            'Open Bracket': 'Å',
            'Close Bracket': '^',
            'Back Slash': '\'',
            'Semicolon': 'Ö',
            'Slash': '-',
            'Comma': ',',
            'Period': '.',
            'Minus': '?'
        };

        return function (input) {
            return mapping[input] || input;
        }
    }
})();