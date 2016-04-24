

module.exports = function($form, $) {
	var result = {};
	$form.find('input, select').each(function () {
		var $el = $(this),
			selector, name;

		name = $el.attr('name');
		if(name) {
			selector = `[name="${name}"]`;
		} else {
			name = $el.attr('id');
			selector = '#'+name;
		}
		if(!name) {
			return;
		}

		var config = result.hasOwnProperty(name) ? result[name] : (result[name] = {
			name: name,
			selector: selector
		});

		if(!config.hasOwnProperty('type')){
			config.type = ($el.attr('type') || '').toLowerCase() === 'number' ? 'number' : 'text';
		}

		if($el.attr('required')) {
			config.required = true;
		}

	});

	return result;
};