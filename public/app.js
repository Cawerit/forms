//Quick and dirty save form function
window.saveForm = function () {

	$.post({
		url: 'api/test',
		data: {
			content: $('#edit-survey').html()
		}
	});

};