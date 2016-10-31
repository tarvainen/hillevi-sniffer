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
            getAverageMousePosition: getAverageMousePosition
        };

        /**
         * Clear all the value arrays.
         */
        function reset () {
            service.keys = {};
            service.clicks = [];
            service.combos = [];
            service.stroke = 0;
            service.windows = {};

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
         * @param {string} key
         */
        function registerKeyPress (key) {
            if (!service.keys[key]) {
                service.keys[key] = 0;
            }

            service.keys[key]++;
            service.stroke++;
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
         * @param {[]} combo
         */
        function registerKeyCombo (combo) {
            service.combos.push(combo);
        }

        /**
         * Push the active window information.
         *
         * @param {*} data
         */
        function registerActiveWindow (data) {
            if (!service.windows[data.app]) {
                service.windows[data.app] = {
                    app: data.app,
                    activeTime: 0
                };
            }

            service.windows[data.app].activeTime++;
        }

        /**
         * Get all registered keys.
         *
         * @returns {*[]}
         */
        function getKeys () {
            return service.keys;
        }

        /**
         * Get the average mouse position since the last reset. If mouse has not moved at all,
         * we will return the last position the mouse was stuck to.
         *
         * @returns {*[]}
         */
        function getAverageMousePosition () {
            return [
                Math.round($filter('avg')(service.mouse.x)),
                Math.round($filter('avg')(service.mouse.y))
            ];
        }

        /**
         * Returns the mouse clicks as a shuffled array.
         *
         * @returns {*[]}
         */
        function getClicks () {
            return $filter('mix')(service.clicks).join('\n');
        }
    }

    LocalDataService.$inject = ['$rootScope', '$timeout', 'DataService'];

    /**
     * Data service for handling local data. This is needed to keep local data fully separated of the
     * data pushed to the server.
     *
     * @param   {*} $rootScope
     * @param   {*} $timeout
     * @param   {*} DataService
     *
     * @return {*}
     *
     * @constructor
     */
    function LocalDataService ($rootScope, $timeout, DataService) {
        var localData = DataService.storage.get('localData');
        var timeout = null;

        $rootScope.$on('keyReleased', onKeyReleased);
        $rootScope.$on('keyCombo', onKeyCombo);
        $rootScope.$on('mouseMoved', onMouseMoved);
        $rootScope.$on('mouseClicked', onMouseClicked);
        $rootScope.$on('activeWindowDetected', onActiveWindowDetected);

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
            // TODO: handle mouse move events
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
                activeWindows: {}
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