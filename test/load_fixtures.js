// =============================================================================
// test/load_fixtures.js
// This files allows you to load test data in mongoDB
// Usage: `NODE_ENV=dev node ./test/load_fixtures.js`
// =============================================================================

// BASE SETUP
// =============================================================================
var config          = require('../config');
var fixtures        = require('pow-mongodb-fixtures').connect(config.mongodb.dburl);


// EXECUTION
// =============================================================================

// Deleting previous fixtures
fixtures.clear('users',             function(err){});

// Loading fixtures
fixtures.load(__dirname + '/fixtures/all.js', function(err){
	process.exit();
});