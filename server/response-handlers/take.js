module.exports = {
	first: {
		template: data => takeTemplate(takeFirst(data))
	},
	bodyToString: data => data.Body.toString('utf-8')
};

function takeFirst(data){
	if(!data || data.length < 1) {
		throw new Error('The provided data does not contain a row of data');
	}

	return data[0];
}

function takeTemplate(data) {
	return data && data.template;
}