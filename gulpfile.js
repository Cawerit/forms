var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	fs			= require('fs'),
	childProc	= require('child_process'),
	argv		= require('yargs').argv,
	path		= require('path'),
	wait		= require('gulp-wait'),
	gulpFn      = require('gulp-fn'),
	riotify     = require('riotify'),
	livereload  = require('gulp-livereload');

gulp.task('build', ['app-js', 'survey-js']);

gulp.task('app-js', function(){
	return runBuild('public/app');
});

gulp.task('survey-js', function () {
	return runBuild('public/survey');
});

gulp.task('components', function () {
	var bundledFile = 'public/components-bundle.js';
	var result = browserify('components/**/*.tag')
		.transform(riotify)
		.bundle();

	result.pipe(wait(1000))
		.pipe(gulpFn(function () {
			livereload.changed(bundledFile);
		}));

	return result.pipe(fs.createWriteStream(bundledFile));
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
				setTimeout(() => livereload.reload(), 1000);//We need to wait a sec to let the server restart
			}
		} else {
			spawn();

			gulp.start('build');

			if (argv.watch) {//If --watch was specified, well wait for changes and restart
				livereload.listen();

				gulp.watch(['server.js', 'server/**/*.js'], ['serve']);
				gulp.watch(['public/**/*', '!public/app-bundle.js', '!public/survey-bundle.js'], ['build']);
			}
		}
	}

})());

function runBuild(filename){
	var bundledFile = filename + '-bundle.js';
	var result = browserify(filename + '.js')
		.transform('babelify', { presets: ['es2015'] })
		.transform(riotify)
		.bundle();

	if(argv.watch){
		result
			.pipe(wait(1000))
			.pipe(gulpFn(function () {
				livereload.changed(bundledFile);
			}));
	}

	result = result.
		on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(fs.createWriteStream(bundledFile));

	return result;
}