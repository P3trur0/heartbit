'use strict';

angular.module('core').directive('blink',
    function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {

                function showElement() {
                    $element.css('display', 'inline');
                    $timeout(hideElement, 500);
                }

                function hideElement() {
                    $element.css('display', 'none');
                    $timeout(showElement, 500);
                }

                showElement();
            },
            template: '<span ng-transclude style="margin-left: -2px;"></span>',
            replace: true
        };
    }
);