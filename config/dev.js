// =============================================================================
// config/dev.js
// =============================================================================

// app -----------------------------------------------
exports.app = {
	port: 8181,
	url: {
		api: 'localhost:8181/api/',
		frontend: 'localhost:8000/app'
	}
}

// mongodb -------------------------------------------
exports.mongodb = {
	host: 'localhost',
	port: '27017',
	dbname: 'omo_dev',
	dburl: 'mongodb://localhost:27017/omo_dev'
}

// smtp ----------------------------------------------
exports.smtp = {
	host: 'smtp.xxxxxxxxxxxx.com',
	port: 587,
	user: 'postmaster@xxxxxxxxxxxx.com',
	password: 'xxxxxxxxxxxx',
	no_reply: '<no-reply@xxxxxxxxxxxx.com>'
}