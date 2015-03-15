'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Heartbit = mongoose.model('Heartbit'),
	_ = require('lodash');

/**
 * Create a Heartbit
 */
exports.create = function(req, res) {
	var heartbit = new Heartbit(req.body);
	heartbit.user = req.user;

	heartbit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(heartbit);
		}
	});
};

/**
 * Show the current Heartbit
 */
exports.read = function(req, res) {
	res.jsonp(req.heartbit);
};

/**
 * Update a Heartbit
 */
exports.update = function(req, res) {
	var heartbit = req.heartbit ;

	heartbit = _.extend(heartbit , req.body);

	heartbit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(heartbit);
		}
	});
};

/**
 * Delete an Heartbit
 */
exports.delete = function(req, res) {
	var heartbit = req.heartbit ;

	heartbit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(heartbit);
		}
	});
};

/**
 * List of Heartbits
 */
exports.list = function(req, res) { 
	Heartbit.find().sort('-created').populate('user', 'displayName').exec(function(err, heartbits) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(heartbits);
		}
	});
};

/**
 * Heartbit middleware
 */
exports.heartbitByID = function(req, res, next, id) { 
	Heartbit.findById(id).populate('user', 'displayName').exec(function(err, heartbit) {
		if (err) return next(err);
		if (! heartbit) return next(new Error('Failed to load Heartbit ' + id));
		req.heartbit = heartbit ;
		next();
	});
};

/**
 * Heartbit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.heartbit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
