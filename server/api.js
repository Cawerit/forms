var express = require('express'),
	path = require('path'),
	db = global.root.require('db.js'),
	fs = require('fs'),
	busboy = require('connect-busboy'),
	registerParam = require('./register-param'),
//The api section will be a self-contained, independent router
	router = express.Router();


registerParam(router, 'id');
router
	.use(busboy())
	/**
	 * Handler for PUT calls to api/survey/<id>/html
	 * Updates the given survey template.
	 * Expects the template to be sent as multipart/form-data as the templates can get quite large
	 */
	.put('/survey/:id/html', function (req, res) {
		db.select('template').from('surveys').where('id', req.id).then(function (rows) {
			if(!rows || rows.length !== 1){
				res.status(404).send('Not found');
				return;
			}
			var templatePath = path.join(global.root.dirname, 'public', 'templates', rows[0].template + '.html');
			//Receive the multipart/form-data the client just sent us
			//Using the busboy library here to parse the upload content, see {@link https://github.com/mscdex/busboy}
			req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
				file.pipe(fs.createWriteStream(templatePath));
			});

			req.busboy.on('finish', function () {
				res.set('Connection', 'close');
				res.status(200).end();
			});

			req.pipe(req.busboy);
		});
	});


module.exports = router;



