'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var heartbits = require('../../app/controllers/heartbits.server.controller');

	// Heartbits Routes
	app.route('/heartbits')
		.get(heartbits.list)
		.post(users.requiresLogin, heartbits.create);

	app.route('/heartbits/:heartbitId')
		.get(heartbits.read)
		.put(users.requiresLogin, heartbits.hasAuthorization, heartbits.update)
		.delete(users.requiresLogin, heartbits.hasAuthorization, heartbits.delete);

	// Finish by binding the Heartbit middleware
	app.param('heartbitId', heartbits.heartbitByID);
};
