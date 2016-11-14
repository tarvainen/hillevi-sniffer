(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Dashboard.Controllers')
        .controller('Dashboard.MainController', MainController)
    ;
    
    ///////////////

    MainController.$inject = ['$rootScope'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     *
     * @constructor
     */
    function MainController ($rootScope) {
        var vm = this;
    }

})();