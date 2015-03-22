'use strict';

function stubGenerator($scope) {
	$scope.example = 'here goes an example';
}

angular.module('streams').controller('DataReaderController', ['$scope',
	function($scope) {
		// Data reader controller logic
		// TODO stub for now
		stubGenerator($scope);
	}
]);
