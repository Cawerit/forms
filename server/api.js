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
	templates       = require('./s3/templates'),
//The api section will be a self-contained, independent router
	router = express.Router();


registerIdParam(router);
registerIdParam(router, 'templateId');

router
	.use(busboy())
	.use(bodyParser.json())
	/**
	 * Handler for PUT calls to api/survey/<id>/html
	 * Updates the given survey template.
	 * Expects the template to be sent as multipart/form-data as the templates can get quite large
	 */
	.post('/surveys/:id/templates', function (req, res) {
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
					//file.pipe(fs.createWriteStream(templatePath));
				});

				req.busboy.on('finish', function () {
					res.set('Connection', 'close');
					Promise.all(fileUploadPromises).then(() => res.status(200).send({
						id: (req.id+''),
						template: obfuscateId.encode(templateId)
					}), err => res.status(500).send({ error: 'Internal Server Error'}) );
				});
				req.pipe(req.busboy);

			}, () => notFound(res));
	})
	.post('/surveys/:id/answers', function (req, res) {

		var id = req.id,
			answers = req.body;

		if(!answers) {
			res.status(400).send({ error: 'No answers to save.' });
			return;
		}

		var templateId;
		//Read the survey template. We need to check that all the necessary answers are there
		db.select('template').from('survey_templates').where({ id: id }).then(function (rows) {
			if(rows && rows.length === 1) {
				templateId = rows[0].template;
				return readTemplate(templateId);
			} else {
				var msg = 'No templates found for survey ' + obfuscateId.encode(id);
				res.status(404).send({ error: msg });
				return Promise.reject(new Error(msg));
			}
		}).then(function (template) {

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
					res.status(200).send(inserts);
				});

			});
		})
			.catch(function (err) {
				console.log(err);
				res.status(500).send({ error: 'Internal Server Error' });
			})

	});


	// .put('/survey/:id/:templateId/questions', function (req, res) {
	//
	// 	var id = (req.id + ''),
	// 		templateId = (req.templateId + ''),
	// 		questions = req.body;//the bodParser plugin will parse the json for us
	//
	// 	if(!questions || !(questions.constructor === Array) || !questions.length) {
	// 		res.status(400).send({ error: `Request did'n contain a list of questions.` });
	// 		return;
	// 	}
	// });
	

function notFound(res){
	res.status(404).send('Not found');
}


module.exports = router;



