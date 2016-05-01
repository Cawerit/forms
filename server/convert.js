var StringDecoder = require('string_decoder').StringDecoder;

module.exports = {
	streamToBuffer: function(stream){
		return new Promise(function(resolve, reject){
			var buffers = [];
			stream.on('data', data => buffers.push(data));
			stream.on('end', () => resolve(Buffer.concat(buffers)));
			stream.on('error', error => reject(error));
		});
	}
};