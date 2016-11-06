(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Inspector.Services', []);

    /**
     * Service initialization.
     */
    angular.module('App.Inspector.Services')
        .factory('InspectorDataService', InspectorDataService)
        .factory('LocalDataService', LocalDataService)
    ;

    ///////////////

    InspectorDataService.$inject = ['$filter'];

    /**
     * Service for the inspector's data.
     *
     * @returns {*}
     *
     * @constructor
     */
    function InspectorDataService ($filter) {
        var service = this;

        // Initialize values
        reset();

        return {
            reset: reset,
            registerKeyPress: registerKeyPress,
            registerMouseMove: registerMouseMove,
            registerMouseClick: registerMouseClick,
            registerKeyCombo: registerKeyCombo,
            registerActiveWindow: registerActiveWindow,
            getKeys: getKeys,
            getClicks: getClicks,
            getActiveWindows: getActiveWindows,
            getKeyCombos: getKeyCombos,
            getAverageMousePosition: getAverageMousePosition,
            getTimeRange: getTimeRange
        };

        /**
         * Clear all the value arrays.
         */
        function reset () {
            service.start = new Date();
            service.keys = {};
            service.clicks = [];
            service.combos = {};
            service.stroke = 0;
            service.windows = {};
            service.keyDownTimes = [];

            if (service.mouse && service.mouse.x.length > 0) {
                service.mouse.x = [service.mouse.x.pop()];
                service.mouse.y = [service.mouse.y.pop()];
            } else {
                service.mouse = {
                    x: [],
                    y: []
                };
            }
        }

        /**
         * Add key to the pressed keys array.
         *
         * @param {*} keyData
         */
        function registerKeyPress (keyData) {
            if (!service.keys[keyData.key]) {
                service.keys[keyData.key] = 0;
            }

            service.keys[keyData.key]++;
            service.stroke++;
            service.keyDownTimes.push(keyData.downTime);
        }

        /**
         * Add mouse position to the mouse position array.
         *
         * @param {string} pos
         */
        function registerMouseMove (pos) {
            var position = pos.split(',');

            service.mouse.x.push(parseInt(position[0]));
            service.mouse.y.push(parseInt(position[1]));
        }

        /**
         * Push the mouse button with the coordinate value to the clicks array.
         *
         * @param {string} btn
         */
        function registerMouseClick (btn) {
            var values = [
                btn,
                service.mouse.x[service.mouse.x.length - 1],
                service.mouse.y[service.mouse.y.length - 1]
            ];

            service.clicks.push(values.join(';'));
        }

        /**
         * Push the detected key combo to the combo array.
         *
         * @param {[]} data
         */
        function registerKeyCombo (data) {
            var combo = data.join(' + ');

            if (!service.combos[combo]) {
                service.combos[combo] = 0;
            }

            service.combos[combo]++;
        }

        /**
         * Push the active window information.
         *
         * @param {*} data
         */
        function registerActiveWindow (data) {
            if (!service.windows[data.app]) {
                service.windows[data.app] = 0;
            }

            service.windows[data.app]++;
        }

        /**
         * Get all registered keys.
         *
         * @returns {*[]}
         */
        function getKeys () {
            service.keys.total = service.stroke;
            service.keys.keyDownTime = $filter('avg')(service.keyDownTimes);
            return service.keys;
        }

        /**
         * Get the average mouse position since the last reset. If mouse has not moved at all,
         * we will return the last position the mouse was stuck to.
         *
         * @returns {*}
         */
        function getAverageMousePosition () {
            return {
                x: Math.round($filter('avg')(service.mouse.x)),
                y: Math.round($filter('avg')(service.mouse.y))
            };
        }

        /**
         * Returns the mouse clicks as a shuffled array.
         *
         * @returns {*[]}
         */
        function getClicks () {
            return $filter('mix')(service.clicks);
        }

        /**
         * Returns the registered active window data.
         *
         * @return {*}
         */
        function getActiveWindows () {
            return service.windows;
        }

        /**
         * Returns the registered key combos.
         *
         * @return {*}
         */
        function getKeyCombos () {
            return service.combos;
        }

        /**
         * Returns the time range.
         *
         * @return {*}
         */
        function getTimeRange () {
            return {
                start: $filter('date')(service.start, 'dd.MM.yyyy HH:mm:ss'),
                end: $filter('date')(new Date(), 'dd.MM.yyyy HH:mm:ss')
            };
        }
    }

    LocalDataService.$inject = ['$rootScope', '$timeout', '$interval', 'DataService'];

    /**
     * Data service for handling local data. This is needed to keep local data fully separated of the
     * data pushed to the server.
     *
     * @param   {*} $rootScope
     * @param   {*} $timeout
     * @param   {*} $interval
     * @param   {*} DataService
     *
     * @return {*}
     *
     * @constructor
     */
    function LocalDataService ($rootScope, $timeout, $interval, DataService) {
        var localData = DataService.storage.get('localData');

        if (!localData) {
            reset();
        }

        var timeout = null;
        localData.lastMousePosition = localData.lastMousePosition || '0,0';

        $rootScope.$on('keyReleased', onKeyReleased);
        $rootScope.$on('keyCombo', onKeyCombo);
        $rootScope.$on('mouseMoved', onMouseMoved);
        $rootScope.$on('mouseClicked', onMouseClicked);
        $rootScope.$on('activeWindowDetected', onActiveWindowDetected);

        $interval(mouseSnapshot, 1000);

        // Start automatic notification interval
        notify();

        /**
         * Fired when the key is released.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onKeyReleased (e, data) {
            localData.keysToday++;
            localData.totalKeys.value++;

            localData.currentTypingSpeed++;
            $timeout(function () {
                localData.currentTypingSpeed--;
            }, 1000);

            notify();
        }

        /**
         * Fired when the key is released.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onKeyCombo (e, data) {
            var combo = data.join(' + ');

            if (!localData.keyCombos.combos[combo]) {
                localData.keyCombos.combos[combo] = {
                    combo: combo,
                    amount: 0
                };
            }

            localData.keyCombos.combos[combo].amount++;

            notify();
        }

        /**
         * Fired when the mouse is moved.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onMouseMoved (e, data) {
            var coordinates = data.split(',');
            var x = Math.round(coordinates[0] / 100) * 100;
            var y = window.screen.height - Math.round(coordinates[1] / 100) * 100;
            y < 0 ? y = 0 : 0;

            localData.lastMousePosition = x + ',' + y;
        }

        /**
         * Fired when the mouse is clicked.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onMouseClicked (e, data) {
            // TODO: handle mouse click events
        }

        /**
         * Fired when the active window information is fetched.
         *
         * @param  {*}  e
         * @param  {*}  data
         */
        function onActiveWindowDetected (e, data) {
            if (!localData.activeWindows[data.app]) {
                localData.activeWindows[data.app] = {
                    app: data.app,
                    titles: {}
                };
            }

            if (!localData.activeWindows[data.app].titles[data.title]) {
                localData.activeWindows[data.app].titles[data.title] = {
                    title: data.title,
                    activeTime: 0
                };
            }

            localData.activeWindows[data.app].titles[data.title].activeTime++;

            notify();
        }

        /**
         * Takes a snapshot of the mouse's position.
         */
        function mouseSnapshot () {
            if (!localData.mousePosition[localData.lastMousePosition]) {
                localData.mousePosition[localData.lastMousePosition] = {
                    x: +localData.lastMousePosition.split(',')[0],
                    y: +localData.lastMousePosition.split(',')[1],
                    r: 0
                };
            }

            localData.mousePosition[localData.lastMousePosition].r++;
        }

        /**
         * Notify the UI about the local data changes.
         */
        function notify () {
            if (timeout) {
                $timeout.cancel(timeout);
            }

            $rootScope.$emit('localDataChanged', localData);

            timeout = $timeout(function () {
                timeout = null;
                notify();
            }, 1000);

            var storedData = angular.copy(localData);
            storedData.currentTypingSpeed = 0;

            DataService.storage.set('localData', storedData);
        }

        /**
         * Resets the local data.
         */
        function reset () {
            localData = {
                lastMousePosition: '0,0',
                currentTypingSpeed: 0,
                keysToday: 0,
                keyCombos: {
                    timestamp: new Date(),
                    combos: {}
                },
                totalKeys: {
                    timestamp: new Date(),
                    value: 0
                },
                activeWindows: {},
                mousePosition: {}
            };

            DataService.storage.set('localData', localData);
        }

        /**
         * Returns the local data.
         *
         * @return {*}
         */
        function getData () {
            return localData;
        }

        return {
            reset: reset,
            getData: getData
        };
    }

})();