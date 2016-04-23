$(function () {
	riot.compile(() => console.log(riot.mount('survey')));
	riot.route.base('/');
	riot.route.start(true);
});