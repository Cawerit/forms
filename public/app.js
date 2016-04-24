//Quick and dirty save form function
window.saveForm = function () {

	return $.ajax({
		method: 'PUT',
		url: 'api/survey/1/1/questions',
		data: JSON.stringify({
			testi: true,
			toimii: 1
		}),
		contentType: 'application/json',
		dataType: 'json',
		success: function (res) {
			console.log('woop');
		},
		error: function(){
			console.log('fail');
		}
	});


	//Note: this, among other things in this file, is currently not the most elegant/bullet-proof
	//way of doing things. Rather, this is just to get something working quickly
	var path = location.pathname,
		startlength = '/survey/'.length,
	//Parse the id part from url. This assumes that the url is in the form /survey/<id>/otherStuff
		id = path.substring(startlength, path.indexOf('/', startlength));

	var content = $('#edit-survey').val(),//Get the input content
		formData = new FormData(),
		blob = new Blob([content], { type: 'text/html' });

	formData.append('template', blob);
	var req = new XMLHttpRequest();
	req.open('POST', 'api/survey/' + id + '/html');
	req.send(formData);

	console.log('Uploading', content);

};