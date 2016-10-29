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
        .directive('genericWidget', genericWidget)
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

    /**
     * Directive for the data widget.
     *
     * @return {*}
     */
    function genericWidget () {
        return {
            restrict: 'E',
            controller: 'Dashboard.GenericWidgetController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                model: '=',
                title: '@',
                subtitle: '@',
                template: '@'
            },
            templateUrl: '/web/dashboard/data-widget.html',
            replace: true
        }
    }

})();