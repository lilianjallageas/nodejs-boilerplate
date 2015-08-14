// =============================================================================
// common/utils.js
// =============================================================================

// BASE SETUP
// =============================================================================
var msg             = require('./messages');
var httpStatus      = require('http-status-codes');


// PUBLIC METHODS
// =============================================================================

// checkQueryParams ----------------------------------
exports.checkQueryParams = function(paramsArray,res,callbackSuccess){
	var isFailure = false;
	var arrayLength = paramsArray.length;
	for (var i = 0; i < arrayLength; i++) {
		if(!paramsArray[i] || paramsArray[i] == '') {
			isFailure = true;
		}	
	}
	if(isFailure) {
		// Sending an error message if there are missing parameters in the request
		res.status(httpStatus.BAD_REQUEST).send({error: msg.req.ERROR.MISSING_PARAM});
	} else{
		callbackSuccess();
	};
}