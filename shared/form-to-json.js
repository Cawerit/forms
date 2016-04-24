/**
 * Given the jQuery-like representation of a form, transforms its input fields to an object
 * containing key-value representation of the form. Key will be based on the `name` attribute of the
 * array and `value` will be either the value of the input or array of values if there are multiple
 * inputs with the same `name` (such as with checkboxes).
 *
 * NOTE: This module is shared between the server and the client. DO NOT use or require any
 * information that shouldn't be exposed to client.
 *
 * @param $ jQuery-compatible object (cheerio on the server).
 */
module.exports = function ($) {

	var arr = $.serializeArray(),
		result = {},
		value, name;

	for(var i=0, n=arr.length; i<n; i++){
		name = arr[i].name;
		value = arr[i].value;
		if(!name) continue;
		if(result.hasOwnProperty(name)){
			if(result[name].push){
				result[name].push(value);
			}  else {
				result[name] = [result[name], value];
			}
		} else {
			result[name] = value;
		}
	}

	console.log(arr);

	return result;

};