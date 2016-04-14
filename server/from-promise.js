/**
 * Very simple utility function to get a node callback from Promise
 * @param resolve The Promise's resolve function
 * @param reject The Promise's reject function
 * @returns {Function} A callback to be used in any normal node.js callback
 */
module.exports = function (resolve, reject) {
	return function (error, result) {
		if (error == null) {
			resolve(result);
		} else {
			reject(error);
		}
	};
};
