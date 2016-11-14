(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Directives', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Dashboard.Directives')
        .directive('keyboard', keyboard)
    ;

    /////////////

    function keyboard () {
        return {
            restrict: 'E',
            templateUrl: 'web/dashboard/keyboard-layout.html',
            controller: 'Dashboard.KeyboardController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true,
            scope: {
                keys: '='
            }
        }
    }

})();