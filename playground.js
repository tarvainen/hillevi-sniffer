(function () {
    /**
     * This file is here just for storing some notes and something like that.
     * This won't affect the application itself. Here you may find some examples of using modules.
     */

    'use strict';

    testActiveWindow();

    /**
     * Test the active window module.
     */
    function testActiveWindow () {
        var activeWindow = require('active-window');

        setTimeout(function () {
            activeWindow.getActiveWindow(function (window) {
                console.log(window.title);
            });
        }, 1000);
    }
})();