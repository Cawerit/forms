/**
 * Registers a new parameter to the given ExpressJS router object.
 * This parameter can then be used in the url and expected in the request object.
 * @see {@link http://expressjs.com/en/api.html#app.param for details}
 * @param {express.Router} router
 * @param {string} param
 * @return {express.Router} Returns back the router for easy method chaining
 */
module.exports = function (router, param) {
	router.param(param, function (req, res, next, value) {
		req[param] = value;
		next();
	});
	return router;
};