var cheerio = require('cheerio'),
	path = require('path'),
	fromPromise = require('./from-promise');
	fs = require('fs');
/**
 * Compiles the given survey html to a richer version and stores the compiled file in
 * templates/compiled.
 * @param options
 * @param html
 * @returns {Promise}
 */
module.exports = function (options, html) {
	//We need both the base html template and the css for it,
	//let's load these in parallel
	var templatePromise = new Promise(function (resolve, reject) {
		fs.readFile(path.join(global.root.dirname, 'public', 'base-template.html'), 'utf-8', fromPromise(resolve, reject));
		}),
		cssPromise = new Promise(function (resolve, reject) {
			fs.readFile(path.join(global.root.dirname, 'public', 'base-style.css'), 'utf-8', fromPromise(resolve, reject));
		});
	
	//When both have finished loading, we can inject the css to html
		return Promise.all([templatePromise, cssPromise]).then(function (values) {
			var baseTemplate = values[0],
				baseCss = values[1],
				$ = cheerio.load(baseTemplate);
			//Add the survey html to the base template
			$('body').html(html);
			//Add the title
			$('title').html(options.title || '');
			//Add the css
			$('<style></style>').append(baseCss).appendTo('head');
			return $.html();
		});
};