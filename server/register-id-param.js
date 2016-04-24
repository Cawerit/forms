var registerParam   = require('./register-param'),
	obfuscateId     = require('./obfuscate-id');

/**
 * Registers an id parameter for the given router.
 * @see register-param for more info
 * @param router
 * @param {string=} [paramName=id]
 * @returns {express.Router}
 */
module.exports = function (router, paramName) {
	return registerParam(router, paramName || 'id', {
		transform: 	obfuscateId.decode,
		validate: isInt
	});
};
/**
 * Checks whether a given value can be converted to an int without losing data
 * @param {string} value
 * @returns {boolean}
 */
function isInt(value){
	var hasVal = !!value,
		val = hasVal && parseInt(value, 10);
	return hasVal && //1. The value wasn't undefined or empty string
		val === val && //2. parseInt didn't return NaN
		(val+'') === value;//3. Converting value back to string should result in the **same** string (we didn't loose precision)
}