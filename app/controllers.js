(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Controllers')
        .controller('MainController', MainController)
    ;

    ////////////

    MainController.$inject = [];

    /**
     * Main controller for the whole app.
     *
     * @constructor
     */
    function MainController () {
        var vm = this;
    }

})();