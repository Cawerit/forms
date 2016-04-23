import riot from 'riot';

import './components/page.tag';
import './components/pagelist.tag';

window.riot = riot;

$(function () {

	$('#survey-container').submit(function(event){
		event.preventDefault();
		var data = $(this).serialize();
	});

	var survey = riot.mount('survey');
	console.log(survey);
	riot.route.base('/');
	riot.route.start(true);
});