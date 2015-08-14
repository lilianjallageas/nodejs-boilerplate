// =============================================================================
// server.js
// =============================================================================


// BASE SETUP
// =============================================================================

// Calling the packages we need
var express         = require('express'); 		// call express
var app             = express(); 				// define our app using express
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var cors            = require('cors');
var passportUtils   = require('./app/common/passport-utils');
var config          = require('./config');

// Configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure the CORS rights
app.use(cors());

// Configure app port
var port            = process.env.PORT || config.app.port;

// Configure database connection
mongoose.connect(config.mongodb.dburl); 

// Getting the Controllers
var userCtrl        = require('./app/controllers/userCtrl');

// Initialize the authentication (Used to control who access the routes)
passportUtils.init(app);



// ROUTES FOR OUR API
// =============================================================================

// Create our router
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('>>>> Something is happening. Here is the path: '+req.path);
	next();
});

// Test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {});


// USERS ROUTES --------------------------------------
// (POST) Create a user
router.route('/users').post(userCtrl.addUser);
// (GET) Check the existence of a user
router.route('/users/validate').get(userCtrl.validateUser);
// (GET) Retrieve the user profile (Only allowed to 'ADMIN' users)
router.route('/users/:id/profile').get(passportUtils.auth('ADMIN'), userCtrl.getById);

// REGISTER OUR ROUTES -------------------------------
// All of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('>>> Server started on port : ' + port);

