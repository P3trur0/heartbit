'use strict';

angular.module('core').controller('IncreasingInputController', ['$scope', '$element',

    function($scope, $element) {
        alert($element.length);
        $element.css('width', $element.length + 1);
    }
]);