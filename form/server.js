var express = require('express'),
    path	= require('path'),
    router	= express.Router();


router
    .param('id', (req, res, next, id) => {
        req.id = id;
	    next();
    });

router
    .get('/:id', (req, res) => {
	    res.send('hahaa ' + req.id);
    });

module.exports = router;
