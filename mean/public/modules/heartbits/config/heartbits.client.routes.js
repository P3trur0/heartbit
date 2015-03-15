'use strict';

//Setting up route
angular.module('heartbits').config(['$stateProvider',
	function($stateProvider) {
		// Heartbits state routing
		$stateProvider.
		state('listHeartbits', {
			url: '/heartbits',
			templateUrl: 'modules/heartbits/views/list-heartbits.client.view.html'
		}).
		state('createHeartbit', {
			url: '/heartbits/create',
			templateUrl: 'modules/heartbits/views/create-heartbit.client.view.html'
		}).
		state('viewHeartbit', {
			url: '/heartbits/:heartbitId',
			templateUrl: 'modules/heartbits/views/view-heartbit.client.view.html'
		}).
		state('editHeartbit', {
			url: '/heartbits/:heartbitId/edit',
			templateUrl: 'modules/heartbits/views/edit-heartbit.client.view.html'
		});
	}
]);