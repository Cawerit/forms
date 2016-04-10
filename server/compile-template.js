var cheerio = require('cheerio'),
	path = require('path'),
	fs = require('fs');
/**
 * Compiles the given survey html to a richer version and stores the compiled file in
 * templates/compiled.
 * @param options
 * @param html
 * @returns {Promise}
 */
module.exports = function (options, html) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path.join(global.root.dirname, 'public', 'base-template.html'), 'utf-8', function (err, baseTemplate) {
			if(err){
				reject(err);
				return;
			}
			var $ = cheerio.load(baseTemplate);
			//Add the survey html to the base template
			$('body').html(html);
			//Add the title
			$('title').html(options.title || '');

			resolve($.html());
		});
	});
};