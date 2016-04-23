var db = root.require('db');

/**
 * We save template files in the filesystem and ids in db. In most cases this should work just nicely,
 * but sometimes some unexpected error might result in mismatch between the db and filesystem data.
 * If such error is found, mark the template as invalid to db so that next time the user will get
 * an older version of the template.
 *
 * NOTE: Do not call this method if it is not absolutely necessary to fix the error by hand. For example,
 * file-system error should be saved to db **only** if it is the result of malformed or missing template file.
 * A template marked with error won't be displayed until the error is manually fixed.
 *
 * @param templateId
 * @returns {Promise.<TResult>|*}
 */
module.exports = function (templateId) {
	if(!templateId || typeof templateId !== 'string') {
		return Promise.reject(new Error(templateId + ' is not a valid template id'));
	}
	return db('templates').where({
		id: (templateId + '')
	}).update({
		found_error: db.fn.now()
	}).then(function () {
		console.log('Saved error to db');
	});
};