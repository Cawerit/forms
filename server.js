
//Initialize the global root variable 
require('./root.js');

var express     = require('express'),
	path	    = require('path'),
	fs          = require('fs'),
	knex        = require('knex'),
	db          = require('./db'),
	api         = require('./server/api.js'),
	registerIdParam = require('./server/register-id-param'),
	obfuscateId = require('./server/obfuscate-id'),
	templates   = require('./server/s3/templates'),
	convert     = require('./server/convert'),
	buildInfo   = require('./build.info.json'),
	router	    = express.Router();

const frontPage = `This is the surveys front page.
Open <a href="forms/${obfuscateId.encode(1)}">a survey</a> to see content.`;

const mainApp =
	(req, res) => res.status(200).sendFile(path.join(global.root.dirname, 'public', 'index.html'));

registerIdParam(router);

router
	.use('/api', api)
	.get('/', (req, res) => res.send(frontPage))
	.use('/node_modules', express.static(getAbsolute('node_modules')))
	.use('/public', express.static(getAbsolute('public')))

	
	/////////////////
	// Note: the order of the following path definitions is significant due to the way express js resolves routes. Change with caution.
	/////////////////
	
	.get('/forms/create', mainApp)

	//Pages like forms/id return the server-compiled survey
	.get('/forms/:id', (req, res) => {
		getSurvey(req, res)
			.then(function(row) {
				var lastModified = Math.min(buildInfo.time, (row.created || new Date()).getTime()) + '',
					browserCache = req.get('If-Modified-Since');

				res.set('Last-Modified', lastModified);

				if(browserCache && browserCache === lastModified) {
					//Optimization and speed improvement:
					// if the If-Modified-Since header is the same as the date
					// when the template was last updated, we don't need to query
					// the S3 at all because the browser already has the correct file!
					// This will both increase the performance and reduce the workload on S3.
					res.status(304).send('Not Modified');
					return;
				}

				sendForm(res, {
					template: row.template,
					title: row.name
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).send('Internal Server Error');
			})
	})

	.get('/forms/**/*', mainApp);

function sendForm(res, options, editing) {
	var templateName = options.template;
	templates.get(templateName)
		.then(function (data) {
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
}

//TODO: might be handled by some other module
var app = express();
app.use('/', router);
app.listen(8080);

function notFound(res){
	res.status(404).send('Not found');
}

function getSurvey(req, res){

	res.set({
		'Cache-Control': 'private',
		'Max-Age': 0
	});

	return db.select('template', 'name', 'created'/*knex.raw(`round(date_part('epoch', created))`)*/)
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