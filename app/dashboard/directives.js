(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Directives', []);

    /**
     * Initialize directives.
     */
    angular.module('App.Dashboard.Directives')
        .directive('simpleWidget', simpleWidget)
    ;

    //////////////

    /**
     * Simple widget directive.
     *
     * @return {*}
     */
    function simpleWidget () {
        return {
            restrict: 'E',
            controller: 'Dashboard.SimpleWidgetController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                value: '=',
                color: '@',
                title: '@',
                subtitle: '@',
                noReset: '=',
                onReset: '='
            },
            templateUrl: '/web/dashboard/simple-widget.html',
            replace: true
        };
    }

})();