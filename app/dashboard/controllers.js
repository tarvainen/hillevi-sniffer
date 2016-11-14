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
        .controller('Dashboard.KeyboardController', KeyboardController)
    ;
    
    ///////////////

    MainController.$inject = ['$rootScope', '$timeout'];

    /**
     * Main controller for the dashboard view.
     *
     * @param {*}   $rootScope
     * @param {*}   $timeout
     *
     * @constructor
     */
    function MainController ($rootScope, $timeout) {
        var vm = this;

        vm.keys = {};

        $rootScope.$on('keydown', function (e, data) {
            $timeout(function () {
                vm.keys[data] = 1;
            });
        });

        $rootScope.$on('keyup', function (e, data) {
            $timeout(function () {
                vm.keys[data] = 0;
            });
        });

        $rootScope.$on('mousemove', function (e, data) {
            // TODO: handle mousemove
        });

        $rootScope.$on('appChanged', function (e, data) {
            // TODO: handle appChanged
        });
    }

    /**
     * Controller for the keyboard layout.
     *
     * @constructor
     */
    function KeyboardController () {
        var vm = this;

        vm.layout = [
            [
                { key: 'key_Escape', cols: 1, text: 'esc' },
                { key: '', cols: 1, text: '' },
                { key: 'key_F1', cols: 1, text: 'F1' },
                { key: 'key_F2', cols: 1, text: 'F2' },
                { key: 'key_F3', cols: 1, text: 'F3' },
                { key: 'key_F4', cols: 1, text: 'F4' },
                { key: 'key_F5', cols: 1, text: 'F5' },
                { key: 'key_F6', cols: 1, text: 'F6' },
                { key: 'key_F7', cols: 1, text: 'F7' },
                { key: 'key_F8', cols: 1, text: 'F8' },
                { key: 'key_F9', cols: 1, text: 'F9' },
                { key: 'key_F10', cols: 1, text: 'F10' },
                { key: 'key_F11', cols: 1, text: 'F11' },
                { key: 'key_F12', cols: 1, text: 'F12' },
                { key: 'key_PrintScreen', cols: 1, text: 'Print Screen' },
                { key: 'key_ScrollLock', cols: 1, text: 'Scroll Lock' },
                { key: 'key_Pause', cols: 1, text: 'Pause' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' }
            ],
            [
                { key: 'key_BackQuote', cols: 1, text: '§' },
                { key: 'key_1', cols: 1, text: '1' },
                { key: 'key_2', cols: 1, text: '2' },
                { key: 'key_3', cols: 1, text: '3' },
                { key: 'key_4', cols: 1, text: '4' },
                { key: 'key_5', cols: 1, text: '5' },
                { key: 'key_6', cols: 1, text: '6' },
                { key: 'key_7', cols: 1, text: '7' },
                { key: 'key_8', cols: 1, text: '8' },
                { key: 'key_9', cols: 1, text: '9' },
                { key: 'key_0', cols: 1, text: '0' },
                { key: 'key_QuestionMark', cols: 1, text: '?' },
                { key: 'key_Hips', cols: 1, text: '`' },
                { key: 'key_Backspace', cols: 1, text: 'Back Space' },
                { key: 'key_Insert', cols: 1, text: 'Insert' },
                { key: 'key_Home', cols: 1, text: 'Home' },
                { key: 'key_PageUp', cols: 1, text: 'Page Up' },
                { key: 'key_NumLock', cols: 1, text: 'Num Lock' },
                { key: 'key_NumPadDivide', cols: 1, text: '/' },
                { key: 'key_NumPadMultiply', cols: 1, text: '*' }
            ],
            [
                { key: 'key_Tab', cols: 1, text: 'Tab' },
                { key: 'key_Q', cols: 1, text: 'Q' },
                { key: 'key_W', cols: 1, text: 'W' },
                { key: 'key_E', cols: 1, text: 'E' },
                { key: 'key_R', cols: 1, text: 'R' },
                { key: 'key_T', cols: 1, text: 'T' },
                { key: 'key_Y', cols: 1, text: 'Y' },
                { key: 'key_U', cols: 1, text: 'U' },
                { key: 'key_I', cols: 1, text: 'I' },
                { key: 'key_O', cols: 1, text: 'O' },
                { key: 'key_P', cols: 1, text: 'P' },
                { key: 'key_OU', cols: 1, text: 'Å' },
                { key: 'key_^', cols: 1, text: '^' },
                { key: '', cols: 1, text: '' },
                { key: 'key_Delete', cols: 1, text: 'Delete' },
                { key: 'key_End', cols: 1, text: 'End' },
                { key: 'key_PageDown', cols: 1, text: 'Page Down' },
                { key: 'key_NumPad7', cols: 1, text: 'Num7' },
                { key: 'key_NumPad8', cols: 1, text: 'Num8' },
                { key: 'key_NumPad9', cols: 1, text: 'Num9' }
            ],
            [
                { key: 'key_CapsLock', cols: 1, text: 'Caps Lock' },
                { key: 'key_A', cols: 1, text: 'A' },
                { key: 'key_S', cols: 1, text: 'S' },
                { key: 'key_D', cols: 1, text: 'D' },
                { key: 'key_F', cols: 1, text: 'F' },
                { key: 'key_G', cols: 1, text: 'G' },
                { key: 'key_H', cols: 1, text: 'H' },
                { key: 'key_J', cols: 1, text: 'J' },
                { key: 'key_K', cols: 1, text: 'K' },
                { key: 'key_L', cols: 1, text: 'L' },
                { key: 'key_OE', cols: 1, text: 'Ö' },
                { key: 'key_AE', cols: 1, text: 'Ä' },
                { key: 'key_BackSlash', cols: 1, text: '*' },
                { key: 'key_Enter', cols: 1, text: 'Enter' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: 'key_NumPad4', cols: 1, text: 'Num4' },
                { key: 'key_NumPad5', cols: 1, text: 'Num5' },
                { key: 'key_NumPad6', cols: 1, text: 'Num6' }
            ],
            [
                { key: 'key_LeftShift', cols: 1, text: 'Shift' },
                { key: 'key_Lt', cols: 1, text: '<' },
                { key: 'key_Z', cols: 1, text: 'Z' },
                { key: 'key_X', cols: 1, text: 'X' },
                { key: 'key_C', cols: 1, text: 'C' },
                { key: 'key_V', cols: 1, text: 'V' },
                { key: 'key_B', cols: 1, text: 'B' },
                { key: 'key_N', cols: 1, text: 'N' },
                { key: 'key_M', cols: 1, text: 'M' },
                { key: 'key_Comma', cols: 1, text: ',' },
                { key: 'key_Period', cols: 1, text: '.' },
                { key: 'key_Minus', cols: 1, text: '-' },
                { key: 'key_RightShift', cols: 1, text: 'Shift' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: 'key_Up', cols: 1, text: 'Up' },
                { key: '', cols: 1, text: '' },
                { key: 'key_NumPad1', cols: 1, text: 'Num1' },
                { key: 'key_NumPad2', cols: 1, text: 'Num2' },
                { key: 'key_NumPad3', cols: 1, text: 'Num3' }
            ],
            [
                { key: 'key_LeftControl', cols: 1, text: 'LControl' },
                { key: 'key_Cmd', cols: 1, text: 'Cmd' },
                { key: 'key_LeftAlt', cols: 1, text: 'Alt' },
                { key: 'key_Space', cols: 5, text: 'Space' },
                { key: 'key_RightAlt', cols: 1, text: 'Alt Gr' },
                { key: 'key_ContextMenu', cols: 1, text: 'Ctx Menu' },
                { key: 'key_RightControl', cols: 1, text: 'RControl' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: '', cols: 1, text: '' },
                { key: 'key_Left', cols: 1, text: 'Left' },
                { key: 'key_Down', cols: 1, text: 'Down' },
                { key: 'key_Right', cols: 1, text: 'Right' },
                { key: 'key_NumPad0', cols: 1, text: '0' },
                { key: 'key_NumPadSeparator', cols: 1, text: ',' },
                { key: '', cols: 1, text: '' }
            ]
        ];
    }

})();