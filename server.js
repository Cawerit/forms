var express = require('express'),
	path	= require('path'),
	router	= express.Router();

router
	.get('/', (req, res) => res.send('Surveys front page'))
	.get('/survey/*', (req, res) => res.sendFile(path.join(__dirname, 'form/index.html')));


//TODO: might be handeled by some other module
var app = express();
app.use('/', router);
app.listen(8080);