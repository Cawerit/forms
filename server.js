var express = require('express'),
	path	= require('path'),
	router	= express.Router();

var frontPage = `This is the surveys front page.
Open <a href="survey/1">a survey</a> to see content.`;

router

	.get('/', (req, res) => res.send(frontPage))

	.get('/survey/:id', 
		(req, res) => res.sendFile(getAbsolute('form/index.html')))

	.use('/node_modules', express.static(getAbsolute('node_modules')))

	.get('/bundle.js', (req, res) => res.sendFile(getAbsolute('/bundle.js')));


//TODO: might be handeled by some other module
var app = express();
app.use('/', router);
app.listen(8080);



function getAbsolute(relative){
	return path.join(__dirname, relative);
}