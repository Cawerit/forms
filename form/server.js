var express = require('express'),
    path	= require('path'),
	db    = require('../db'),
	fs = require('fs'),
    router	= express.Router();


router
    .param('id', (req, res, next, id) => {
        req.id = id;
	    next();
    });

router
    .get('/:id', (req, res) => {

	    db.select('*')
		    .from('surveys')
		    .where({ id: req.id })
		    .then(function(rows) {
				if(!rows || rows.length === 0) {
					notFound(res);
				} else {

					//The file will be located at templates/compiled/<unique filename>
					var file = path.join(__dirname, 'templates', 'compiled', rows[0].template + '.html');

					fs.stat(file, function(err, stat){
						if(err == null) {
							res.writeHead(200, {
								'Content-Type': 'text/html',
								'Content-Length': stat.size
							});

							fs.createReadStream(file).pipe(res);
						} else {
							notFound(res);//haa
						}
					});
				}
		    });

    });

function notFound(res){
	res.status(404).send('Not found');
}

module.exports = router;
