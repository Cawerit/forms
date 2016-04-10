var cheerio = require('cheerio'),
	path = require('path'),
	fs = require('fs');
/**
 * Compiles a editor template, used when editing the html templates of surveys.
 * NOTE: Very much a work in progress, this whole file should probably be considered
 * deprecated. This is just a quick solution to get some test surveys done.
 * @deprecated We'll switch to some actual client side JS later...
 */
module.exports = function (options, html) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path.join(global.root.dirname, 'public', 'index.html'), 'utf-8', function (err, baseTemplate) {
			if(err){
				reject(err);
				return;
			}
			var $ = cheerio.load(baseTemplate);
			//Add the survey html to the base template
			$('<textarea id="edit-survey" style="width: 500px; height: 500px;"></textarea>').val(html).appendTo('body');
			//Add the title
			$('title').html(options.title || '');

			//Submit button (really quick and dirty)
			$('<button onclick="saveForm()">Save changes</button>').appendTo('body');

			resolve($.html());
		});
	});
};