var knex = require('knex');

// Load the file containing the connection configuration.
// NOTE: For security reasons, this file is not included in the source control.
// Request the file from the author of this project and drop it in folder "credentials" to get access to db.
var config = require('./credentials/rds.credentials.json');

module.exports = knex({
	client: 'mysql',
	connection: config,
	pool: {
		min: 0
	}
});