var path = require('path');
/**
 * A global object that can be used for easily requiring files relative to the top of the project.
 * @see {@link https://gist.github.com/branneman/8048520 for details}
 */
global.root = {
	/**
	 * Requires the given file, relative to the project root (this file)
	 * @param filePath
	 * @returns {*}
	 */
	require: function (filePath) {
		return require(path.join(__dirname, filePath));
	},
	/**
	 * Directory path of the project root (this file).
	 * Useful when retrieving other than js files.
	 */
	dirname: __dirname
};
