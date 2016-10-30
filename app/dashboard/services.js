(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Dashboard.Services', []);

    /**
     * Service initializations.
     */
    angular.module('App.Dashboard.Services')
        .factory('DashboardDataService', DashboardDataService)
    ;

    //////////

    DashboardDataService.$inject = [];

    /**
     * Data service for the dashboard.
     *
     * @returns {*}
     * @constructor
     */
    function DashboardDataService () {
        return {};
    }

})();