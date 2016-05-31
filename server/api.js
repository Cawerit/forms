var express         = require('express'),
	path            = require('path'),
	db              = global.root.require('db.js'),
	inputParser     = global.root.require('shared/form-input-parser'),
	fs              = require('fs'),
	_each            = require('lodash/each'),
	busboy          = require('connect-busboy'),
	bodyParser      = require('body-parser'),
	cheerio         = require('cheerio'),
	obfuscateId     = require('./obfuscate-id'),
	registerIdParam = require('./register-id-param'),
	readTemplate    = require('./read-template'),
	convert         = require('./convert'),
	onError         = require('./response-handlers/generic-error-handler'),
	takeResult      = require('./response-handlers/take'),
	templates       = require('./s3/templates'),
//The api section will be a self-contained, independent router
	router = express.Router();


registerIdParam(router);
registerIdParam(router, 'templateId');

router
	.use(busboy())
	.use(bodyParser.json())

	.post('/forms', function(req, res) {
		db.insert({

		}, 'id')
			.into('surveys')
			.then(function (rows) {
				if(!rows || rows.length !== 1){
					notFound(res);
					return;
				}

				res.status(201).send({
					id: obfuscateId.encode(rows[0])
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).send({ error: 'Internal Server Error' });
			});
	})
		
	.get('/forms/:id', function(req, res) {
		var templateId;
		getTemplate(req.id)
			.then(res => (templateId = takeResult.first.template(res)))
			.then(templates.get)
			.then(takeResult.bodyToString)
			.then(function (content) {
				res.status(200).send(content);
			}, err => {
				console.log('Errr', templateId);
				templates.saveError(templateId);
				onError(res)(err);
			});
	})

	/**
	 * Handler for PUT calls to api/survey/<id>/html
	 * Updates the given survey template.
	 * Expects the template to be sent as multipart/form-data as the templates can get quite large
	 */
	.post('/forms/:id/templates', function (req, res) {
		db.insert({//Insert new template row to db
			survey: req.id + ''
		}, 'id')//return its id
			.into('templates')
			.then(function (rows) {

				if(!rows || rows.length !== 1) {
					notFound(res);
					return;
				}

				var templateId = rows[0];
				var fileUploadPromises = [];
				//Receive the multipart/form-data the client just sent us
				//Using the busboy library here to parse the upload content, see {@link https://github.com/mscdex/busboy}
				req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
					var fileUpload = convert.streamToBuffer(file)
						.then(buffer => templates.put(templateId, buffer));
					fileUploadPromises.push(fileUpload);
					fileUpload.catch(err => console.log(err));
				});

				req.busboy.on('finish', function () {
					res.set('Connection', 'close');
					Promise.all(fileUploadPromises).then(() => res.status(201).send({
						id: obfuscateId.encode(req.id+''),
						template: obfuscateId.encode(templateId)
					}), err => res.status(500).send({ error: 'Internal Server Error'}) );
				});
				req.pipe(req.busboy);

			}, () => notFound(res));
	})
	.post('/forms/:id/answers', function (req, res) {

		var id = req.id,
			answers = req.body;

		if(!answers) {
			res.status(400).send({ error: 'No answers to save.' });
			return;
		}

		var templateId;
		//Read the survey template. We need to check that all the necessary answers are there
		getTemplate(id)
		.then(takeResult.first.template)
		.then(_templateId => {
			templateId = _templateId;
			return templates.get(_templateId);
		})
		.then(function (template) {

			var $ = cheerio.load(template),
				inputs = inputParser($('survey'), $);

			//TODO: Validate inputs here...

			db.insert({
				template: templateId
			}, 'id').into('answer_sets').then(function (rows) {
				var id = rows[0],
					inserts = [];

				_each(inputs, (value, key) => {
					var obj = {
						answer_set: id,
						name: (value.name + '')
					};
					var answer = answers[value.name];
					if(typeof answer === 'number' && answer === answer && Math.floor(answer) === answer){
						obj.value_int = answer;
					} else {
						obj.value_text = answer ? (answer + '') : null;
					}
					inserts.push(obj);
				});

				db.insert(inserts).into('answers').then(function(){
					res.status(201).send(inserts);
				});

			});
		})
			.catch(function (err) {
				console.log(err);
				res.status(500).send({ error: 'Internal Server Error' });
			})

	});

function getTemplate(id) {
	return db.select('template').from('survey_templates').where({ id: id });
}

function notFound(res){
	res.status(404).send('Not found');
}


module.exports = router;



