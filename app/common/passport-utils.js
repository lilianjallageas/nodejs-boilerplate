// =============================================================================
// common/passport-utils.js
//
// See "http://passportjs.org/"
//
// =============================================================================

// BASE SETUP
// =============================================================================
var _               = require('underscore');
var msg             = require('../common/messages');
var userCtrl        = require('../controllers/userCtrl');
var httpStatus      = require('http-status-codes');
var passport        = require('passport');
var BasicStrategy   = require('passport-http').BasicStrategy;

// Setting up the 'Basic' strategy
passport.use(new BasicStrategy({
	},
	function(username, password, done) {
		userCtrl.findUser(
			username,
			password,
			function(user){
				// We found the user
				console.log("#passport, user:"+user.email+":"+user.password);
				return done(null, user);
			},
			function(){
				// We didn't find the user
				console.log("#passport, we did not find the user: username:"+username+", password:"+password);
				return done(null, false);
			});
	}
));


// PUBLIC METHODS
// =============================================================================

// init ----------------------------------------------
exports.init = function(app){
	app.use(passport.initialize());
};

// auth ----------------------------------------------
exports.auth = function(userGroup){
	return [
		passport.authenticate('basic', {session:false}),
		function(req, res, next) {
			// Checking if the 'user' found in the 'Basic' strategy belongs to the required group.
			if (req.user && (-1 != _.indexOf(req.user.groups, userGroup))) {
				console.log('#passport.authenticate: The user belows to the required group ('+userGroup+')');
				next();
			} else {
				console.log('#passport.authenticate: The user doesnt below to the required group');
				res.status(httpStatus.UNAUTHORIZED).send({error: msg.user.ERROR.UNAUTHORIZED});
			}
		}
	];
};