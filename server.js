
//Initialize the global root variable 
require('./root.js');

var express = require('express'),
	path	= require('path'),
	fs = require('fs'),
	db = require('./db'),
	api = require('./server/api.js'),
	registerParam = require('./server/register-param'),
	router	= express.Router();

var frontPage = `This is the surveys front page.
Open <a href="survey/b0b8ac2c-2147-486e-99a8-9f834393f069">a survey</a> to see content.`;

registerParam(router, 'id');
router
	.use('/api', api)
	.get('/', (req, res) => res.send(frontPage))
	.use('/node_modules', express.static(getAbsolute('node_modules')))
	.get('/bundle.js', (req, res) => res.sendFile(getAbsolute('public/bundle.js')))

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
	//In that case the template will be located at public/templates/<unique filename>
	var baseTemplate = path.join(__dirname, 'public', 'templates', templateName + '.html');
	fs.readFile(baseTemplate, 'utf-8', function(err, fileText){
		if(err){
			notFound(res);
		} else {
			var compiler = editing ? './server/compile-editor' : './server/compile-template';
			require(compiler)(options, fileText)
				.then(
					result => res.send(result),
					err => {
					console.error(err);
					res.status(500).send('Internal Server Error');
				});
		}
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
	return db.select('template', 'name')
		.from('surveys')
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