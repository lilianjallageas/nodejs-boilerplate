// =============================================================================
// test/fixtures/all.js
// =============================================================================

// BASE SETUP
// =============================================================================
var id = require('pow-mongodb-fixtures').createObjectId;

// Dates ---------------------------------------------
var tomorrow = new Date();
tomorrow.setHours(0,0,0,0);
tomorrow.setDate(tomorrow.getDate() + 1);
var today = new Date();
today.setHours(0,0,0,0);
var yesterday = new Date();
yesterday.setHours(0,0,0,0);
yesterday.setDate(yesterday.getDate() - 1);
var yesterday_1 = new Date();
yesterday_1.setHours(0,0,0,0);
yesterday_1.setDate(yesterday.getDate() - 1);

// User Ids ------------------------------------------
var userID_1 = id('54331aab6a1f1d538eaaacdb');
var userID_2 = id('54331aab6a1f1d538eaaacdc');
var userID_3 = id('54331aab6a1f1d538eaaacdd');
var userID_4 = id('54331aab6a1f1d538eaaacde');


// USERS
// =============================================================================
var users = exports.users = {
	user1: {
		_id:         userID_1,
		email:      'toto@toto.com',
		password:   'password_1',
		groups:     ['ADMIN']
	},
	user2: {
		_id:         userID_2,
		email:      'titi@titi.com',
		password:   'password_2',
		groups:     ['ADMIN','STYLIST']
	},
	user3: {
		_id:         userID_3,
		email:      'tata@tata.com',
		password:   'password_3',
		groups:     ['CUSTOMER']
	},
	user4: {
		_id:         userID_4,
		email:      'tutu@tutu.com',
		password:   'password_4',
		groups:     ['CUSTOMER'],
		resetPwdToken: 'thisIsATestToken',
		resetPwdExpire: tomorrow
	}
}
