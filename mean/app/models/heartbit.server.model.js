'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Heartbit Schema
 */
var HeartbitSchema = new Schema({

    name: {
        type: String,
        default: '',
        required: 'Please fill Heartbit name',
        trim: true
    },

    type: {
        type: String,
        default: '',
        required: 'Please fill Heartbit type',
        trim: true
    },

    created: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Heartbit', HeartbitSchema);