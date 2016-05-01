var AWS = require('aws-sdk'),
	path = require('path'),
	db = global.root.require('db.js'),
	fromPromise = require('../from-promise');

/**
 * DO NOT CHANGE THESE CONSTANTS!
 * 
 * Templates are stored in the bucket with this prefix to separate them from other resource types.
 * Changing the prefix will result in data-loss as the previously stored keys can no longer be retrieved.
 */
const TEMPLATE_PREFIX = require('./file-prefixes.json').TEMPLATE,
	getObjectKey = templateId => TEMPLATE_PREFIX + '/' + templateId.replace(/\//g, '-'),
	BUCKET_NAME = 'fi.onoppa.surveys';

var s3 = new AWS.S3(global.root.require('credentials/s3.credentials.json')),
	bucketPromise;

module.exports = {
	/**
	 * Uploads template to the S3 bucket
	 * @param {string} templateId Unique id for the template
	 * @param {Buffer|string} body Contents of the template
	 * @returns {Promise.<*>}
	 */
	put: function (templateId, body) {
		return getBucket().then(function () {
			var params = {
				Bucket: BUCKET_NAME,
				Key: getObjectKey(templateId+''),
				Body: body
			};
			return new Promise((resolve, reject) => s3.putObject(params, fromPromise(resolve, reject)));
		});
	},
	get: function (templateId) {
		return getBucket().then(function(){
			var params = {
				Bucket: BUCKET_NAME,
				Key: getObjectKey(templateId+'')
			};
			return new Promise((resolve, reject) => s3.getObject(params, fromPromise(resolve, reject)));
		});
	},
	/**
	 * We save template files in the S3 bucket and their ids in RDS database. In most cases this should work just nicely,
	 * but sometimes some unexpected error might result in mismatch between the db and filesystem data.
	 * If such error is found, it's important to mark the template as invalid to db so that next time the user will get
	 * an older (functional) version of the template.
	 *
	 * NOTE: Do not call this method if it is not absolutely necessary to fix the error by hand. For example,
	 * file-system error should be saved to db **only** if it is the result of malformed or missing template file.
	 * A template marked with error won't be displayed until the error is manually fixed.
	 *
	 * @param {string} templateId
	 * @returns {Promise.<*>}
	 */
	saveError: function(templateId){
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
	}

};

function getBucket(){
	if(!bucketPromise) {
		bucketPromise = new Promise((resolve, reject) => s3.createBucket({ Bucket: BUCKET_NAME }, resolve));
	}
	return bucketPromise;
}