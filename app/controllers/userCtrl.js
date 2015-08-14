"use strict";

// =============================================================================
// controllers/userCtrl.js
// =============================================================================

// BASE SETUP
// =============================================================================
var userModel       = require('../models/user');
var utils           = require('../common/utils');
var msg             = require('../common/messages');
var mongoose        = require('mongoose');
var _               = require('underscore');
var httpStatus      = require('http-status-codes');


// PUBLIC METHODS
// =============================================================================

// addUser -------------------------------------------
var addUser = function(req,res){

	// Getting the data from the request
	var email       = req.param('username');
	var password    = req.param('password');

	// Checking that there is no missing information in the request
	utils.checkQueryParams([email,password], res, function(){

		// Checking if the user already exists
		userModel.findOne({'email': email}, function (err, userExist) {
			// TODO : Manage the error
			// if (err) return handleError(err);
			if (userExist) {
				res.status(httpStatus.FORBIDDEN).send({error: msg.user.ERROR.ALREADY_EXISTS});
			} else {
				// If the user doesn't already exist, we create it...
				var user        = new userModel();
				user._id        = mongoose.Types.ObjectId();
				user.email      = email;
				user.password   = password;
				// ...and save it in the database
				user.save(function(err) {
					if (err){ res.send(err) };
					// Returning the user in the response
					res.json(_.omit(user.toObject(),'password'));
				});
			}
		});
	});	
};

// validateUser --------------------------------------
var validateUser = function(req,res){

	// Getting the variables from the request
	var email       = req.query.username;
	var password    = req.query.password;
	console.log('email:'+email);
	console.log('password:'+password);

	// Checking that there is no missing information in the request
	utils.checkQueryParams([email,password], res, function(){

		// Finding the user in the database
		findUser(
			email, 
			password, 
			function(user){
				// We found the user, so we return it in the response
				res.json(_.omit(user,'password')); // returning the user to the client side, without the password
			}, 
			function(){
				// If no user is found (or more than one), we return an error message
				res.status(httpStatus.NOT_FOUND).send({error: msg.user.ERROR.NOT_FOUND});
			});

	});
};

// findUser ------------------------------------------
var findUser = function(email, password, callbackSuccess, callbackFail){

	// Finding the user in the database
	userModel.find({'email': email,'password': password}, function (err, users) {
		// TODO: Manage the error
		// if (err) return handleError(err);
		console.log("#findUser: email="+email+', pwd='+password);
		if (users.length == 1) {
			// If we found the user, we return the user
			return callbackSuccess(users[0].toJSON());
		} else { 
			return callbackFail();
		}
	});
};

// getById -------------------------------------------
var getById = function(req, res){

	// Getting the variables from the request
	var id = req.params.id;

	// Finding the user in the database
	userModel.findById(id, function (err, user) {
		// If no 'user' is found, an error is sent, so we execute the "callbackFail"
		if (err) {
			// If no user is found, we return an error message
			res.status(httpStatus.NOT_FOUND).send({error: msg.user.ERROR.NOT_FOUND});
		} else {
			// If no error, then we execute the "callbackSuccessful"
			console.log("#getById: id="+id);
			// We found the user, so we return it in the response
			res.json(_.omit(user.toObject(),'password')); // returning the user to the client side, without the password
		};
	});
};


// EXPORTS : userCtrl's API
// =============================================================================
module.exports = {
	addUser                 : addUser,
	validateUser            : validateUser,
	findUser                : findUser,
	getById                 : getById
};