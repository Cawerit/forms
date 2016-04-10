var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	fs			= require('fs'),
	childProc	= require('child_process'),
	argv		= require('yargs').argv,
	path		= require('path'),
	wait		= require('gulp-wait'),
	livereload  = require('gulp-livereload');

gulp.task('build', ['public-js']);

gulp.task('public-js', function(){
	return runBuild('public');
});

gulp.task('serve', (function(){

	//We'll place the node running the server here
	var node;

	return function() {
		function spawn() {
			console.log((node ? 'Restarting' : 'Starting') + ' the server.');
			node = childProc.fork('server.js');
		}

		if (node) {//This is a restart
			node.once('exit', spawn);
			node.kill();//Kill the prev node and restart
			if(argv.watch){
				livereload.reload();
			}
		} else {
			spawn();

			gulp.start('build');

			if (argv.watch) {//If --watch was specified, well wait for changes and restart
				livereload.listen();

				gulp.watch(['server.js', 'server/**/*.js'], ['serve']);
				gulp.watch(['public/**/*', '!public/bundle.js'], ['build']);
			}
		}
	}

})());

function runBuild(dir){
	var result = browserify(dir + '/app.js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.on('error', function(err){
			console.log(err.toString());
			this.emit('end');
		});
	if(argv.watch){
		result = result.pipe(livereload());
	}
	result = result.pipe(fs.createWriteStream(dir + '/bundle.js'));
	return result;
}