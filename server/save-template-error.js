var templates = require('./s3/templates');

/**
 * @deprecated Use s3/templates#saveError instead
 */
module.exports = function (templateId) {
	return templates.saveError(templateId);
};