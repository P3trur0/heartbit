'use strict';

// Configuring the Articles module
angular.module('heartbits').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Heartbits', 'heartbits', 'dropdown', '/heartbits(/create)?');
		Menus.addSubMenuItem('topbar', 'heartbits', 'List Heartbits', 'heartbits');
		Menus.addSubMenuItem('topbar', 'heartbits', 'New Heartbit', 'heartbits/create');
	}
]);