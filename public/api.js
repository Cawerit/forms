

const FORMS_BASE = 'api/forms',
	COULD_NOT_PARSE_RESPONSE_ERROR = 'The response JSON could not be parsed';

export default {
	form: {
		post: saveForm
	},
	template: {
		post: editForm
	},
	error: {
		COULD_NOT_PARSE_RESPONSE : COULD_NOT_PARSE_RESPONSE_ERROR
	}
};


function saveForm(template){
	return new Promise((resolve, reject) => {
		$.ajax({
			method: 'POST',
			url: FORMS_BASE,
			contentType: 'application/json',
			dataType: 'json'
		}).then(result => {
			var id = result.id;
			console.log('save', id);
			return editForm(id, template)
				.then(resolve, reject);
		}, reject);
	});
}

function editForm(id, template){
	return new Promise((resolve, reject) => {
		const URL = `${FORMS_BASE}/${id}/templates`;

		var formData = new FormData(),
			blob = new Blob([template], { type: 'text/html' });

		formData.append('template', blob);
		var req = new XMLHttpRequest();
		req.open('POST', URL);
		req.onreadystatechange = function () {
			if(req.readyState === XMLHttpRequest.DONE){
				if(req.status >= 200 && req.status < 400) {
					resolveJson(req, resolve, reject);
				} else {
					resolveJson(req, reject, reject);
				}
			}
		};
		req.send(formData);
	});
}

function resolveJson(response, resolve, reject){
	var responseObj;
	try {
		responseObj = JSON.parse(response.responseText);
		resolve(responseObj);
	} catch (e){
		console.log(response);
		reject(new Error(COULD_NOT_PARSE_RESPONSE_ERROR));
	}
}