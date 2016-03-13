var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	fs			= require('fs'),
	childProc	= require('child_process'),
	argv		= require('yargs').argv,
	path		= require('path'),
	_			= require('lodash');


gulp.task('build', ['form-js'], function(){

});


gulp.task('form-js', function(){
	console.log('building');
	return runBuild('form');
});

gulp.task('serve', ['build'], (function(){

	var node;

	function spawn(){
		console.log('spawning child process');
		node = childProc.fork('server.js');
	}

	function onWatch(){
		console.log('aargs', arguments);
	}

	return function serve(done){
		if(node){
			node.once('exit', spawn);
			node.kill();
		} else {
			spawn();
			if(argv.watch){
				var lr = require('gulp-livereload');
				lr.listen();
				require('gulp-watch')('./**/*.js')
					.pipe(lr())
					.on('end', done);	
			}
		}
	};

}()));

function runBuild(dir){
	return browserify(dir + '/app.js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(fs.createWriteStream(dir + '/bundle.js'));
}