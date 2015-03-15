'use strict';

//Heartbits service used to communicate Heartbits REST endpoints
angular.module('heartbits').factory('Heartbits', ['$resource',
	function($resource) {
		return $resource('heartbits/:heartbitId', { heartbitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);