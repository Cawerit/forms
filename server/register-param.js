/**
 * Registers a new parameter to the given ExpressJS router object.
 * This parameter can then be used in the url and expected in the request object.
 * @see {@link http://expressjs.com/en/api.html#app.param for details}
 * @param {express.Router} router
 * @param {string} param
 * @param {{ validate: function(*), transform: function(*) }} [options]
 * @return {express.Router} Returns back the router for easy method chaining
 */
module.exports = function (router, param, options) {
	router.param(param, function (req, res, next, value) {

		if(options) {
			if (options.validate && !options.validate(value)) {
				res.status(400).send('Bad Request');
				return;
			}

			if (options.transform) {
				value = options.transform(value);
			}
		}

		req[param] = value;
		next();
	});
	return router;
};