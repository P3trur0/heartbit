'use strict';

angular.module('core').controller('IncreasingInputController', ['$element',

    function($element) {
        this.inputData = '';

        this.increaseSize = function() {
            var sizeIncrease = $element.children().val().length + 1;
            var widthIncrease = $element.children().val().length * 10;

            if (widthIncrease <= 20)
                widthIncrease = 30;
            if (sizeIncrease === 0)
                sizeIncrease = 2;

            $element.children().css('size', sizeIncrease + 'em');
            $element.children().css('width', widthIncrease + 'px');
        };

    }
]);
