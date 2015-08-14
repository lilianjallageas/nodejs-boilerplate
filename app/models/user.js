// =============================================================================
// models/user.js
// =============================================================================

// BASE SETUP
// =============================================================================
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// SCHEMA
// =============================================================================
var UserSchema = new Schema({
	_id:            { type: Schema.Types.ObjectId },
	email:          { type: String, required: true },
	password:       { type: String, required: true },
	groups:         [{ type: String}],
	resetPwdToken:  { type: String },
	resetPwdExpire: { type: Date }
});


// EXPORTS
// =============================================================================
module.exports = mongoose.model('User', UserSchema);
