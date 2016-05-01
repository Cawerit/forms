
//Initialize the global root variable 
require('./root.js');

var express     = require('express'),
	path	    = require('path'),
	fs          = require('fs'),
	db          = require('./db'),
	api         = require('./server/api.js'),
	registerIdParam = require('./server/register-id-param'),
	obfuscateId = require('./server/obfuscate-id'),
	templates   = require('./server/s3/templates'),
	convert     = require('./server/convert'),
	router	    = express.Router();

var frontPage = `This is the surveys front page.
Open <a href="survey/${obfuscateId.encode(1)}">a survey</a> to see content.`;

registerIdParam(router);

router
	.use('/api', api)
	.get('/', (req, res) => res.send(frontPage))
	.use('/node_modules', express.static(getAbsolute('node_modules')))
	.use('/public', express.static(getAbsolute('public')))

	//Pages like survey/id return the compiled survey
	.get('/survey/:id', (req, res) => {
		getSurvey(req, res)
			.then(function(row) {
				sendForm(res, {
					template: row.template,
					title: row.name
				});
			});
	})
	.get('/survey/:id/edit', (req, res) => {
		getSurvey(req, res)
			.then(function (row){
				sendForm(res, {
					template: row.template,
					title: row.name
				}, true);
			});
	});

function sendForm(res, options, editing){
	var templateName = options.template;
	templates.get(templateName)
		.then(function(data){
			var fileText = data.Body.toString('utf-8');

			var compiler = editing ? './server/compile-editor' : './server/compile-template';
			require(compiler)(options, fileText)
				.then(
					result => res.send(result),
					err => {
						console.error(err);
						res.status(500).send('Internal Server Error');
					});
	}, err => {
		console.log(err);
		res.status(500).send('Internal Server Error');
	});

	//In that case the template will be located at public/templates/<unique filename>
	// var baseTemplate = path.join(__dirname, 'templates', templateName + '.tag');
	// fs.readFile(baseTemplate, 'utf-8', function(err, fileText){
	// 	if(err){
	// 		notFound(res);
	// 		saveTemplateError(options.template);
	// 	} else {
	// 		var compiler = editing ? './server/compile-editor' : './server/compile-template';
	// 		require(compiler)(options, fileText)
	// 			.then(
	// 				result => res.send(result),
	// 				err => {
	// 				console.error(err);
	// 				res.status(500).send('Internal Server Error');
	// 			});
	// 	}
	// });
}

//TODO: might be handled by some other module
var app = express();
app.use('/', router);
app.listen(8080);

function notFound(res){
	res.status(404).send('Not found');
}

function getSurvey(req, res){
	return db.select('template', 'name')
		.from('survey_templates')
		.where({ id: req.id })
		.then(function(rows){//Error handling if we don't find the survey
			if (!rows || rows.length !== 1) {
				//We should only have one row when we query with id, otherwise send error
				notFound(res);
				return Promise.reject(new Error('Found ' + (rows && rows.length) + ' rows when there should have been 1.'));
			} else return rows[0];
		});
}

function getAbsolute(relative){
	return path.join(__dirname, relative);
}