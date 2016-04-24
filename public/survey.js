import riot from 'riot';
import toJson from '../shared/form-to-json';

import './components/page.tag';
import './components/pagelist.tag';

window.riot = riot;

var surveyId;

$(function () {

	$('#survey-container').submit(function(event){
		event.preventDefault();

		var obj = toJson($('form'));

		$.post({
			url: '/api/surveys/' + surveyId + '/answers',
			data: JSON.stringify(obj),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				console.log('woo', result);
			}
		});

	});

	riot.route.base('/');
	riot.route.start(true);

	riot.route(function (ignored, _surveyId) {
		surveyId = _surveyId;
	});

	var survey = riot.mount('survey');
});