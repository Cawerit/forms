var fs = require('fs'),
	path = require('path'),
	fromPromise = require('./from-promise');


module.exports = function(templateId){

	return new Promise(function (resolve, reject) {
		var type = typeof templateId;
		if((type === 'string' && templateId.length !== 0) || type === 'number') {
			fs.readFile(path.join(global.root.dirname, 'templates', templateId + '.tag'), 'utf-8', fromPromise(resolve, reject));
		} else {
			reject(new Error(templateId + ' is not valid id for a template'));
		}
	});
	
};