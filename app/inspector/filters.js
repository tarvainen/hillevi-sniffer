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
        .filter('keyComboAlias', keyComboAlias)
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

    keyComboAlias.$inject = ['$translate'];

    /**
     * Fetches the key combo alias for the combo by the current language.
     *
     * @param {*}    $translate
     *
     * @return {Function}
     */
    function keyComboAlias ($translate) {
        var mapping = {
            'Left Control + C': 'COPY',
            'Right Control + C': 'COPY',
            'Left Control + S': 'SAVE',
            'Left Control + A': 'SELECT_ALL',
            'Left Control + X': 'CUT',
            'Left Control + V': 'PASTE'
        };

        return function (input) {
            return $translate.instant(mapping[input]);
        }
    }
})();