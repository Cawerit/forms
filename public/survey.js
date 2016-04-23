import riot from 'riot';

import './components/page.tag';
import './components/pagelist.tag';

window.riot = riot;

$(function () {
	riot.mount('survey');
	riot.route.base('/');
	riot.route.start(true);
});