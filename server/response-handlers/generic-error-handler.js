

module.exports = function getErrorHandler(res) {
	return function(error){
		console.error(error);
		res.status(500).send({ error: 'Internal Server Error' });
	};
};