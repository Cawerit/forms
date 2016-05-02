
import './routes';

//Quick and dirty save form function
window.saveForm = function () {

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
	req.open('POST', 'api/surveys/' + id + '/templates');
	req.send(formData);

	console.log('Uploading', content);

};