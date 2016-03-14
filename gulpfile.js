var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	fs			= require('fs'),
	childProc	= require('child_process'),
	argv		= require('yargs').argv,
	path		= require('path'),
	wait		= require('gulp-wait');


gulp.task('build', ['form-js'], function(){

});


gulp.task('form-js', function(){
	return runBuild('form');
});

gulp.task('serve', ['build'], (function(){
	var node;

	function spawn(){
		console.log((node ? 'Restarting' : 'Starting') + ' the server.');
		node = childProc.fork('server.js');
	}

	return function serve(){
		if(node){
			restart();
		} else {
			spawn();
			if(argv.watch){
				var lr = require('gulp-livereload');
				lr.listen();
				var watch = require('gulp-watch');

				watch(['server.js', 'api/**/*'], restart)
					.pipe(wait(1000))//Wait a sec to reload the server before reloading the page
					.pipe(lr());	

				watch(['form/**/*', '!form/bundle.js'], () => runBuild('form'))
					.pipe(lr());
			}
		}

		function restart(files){
			gulp.start('build');
			node.once('exit', spawn);
			node.kill();
		}

	};

}()));

function runBuild(dir){
	return browserify(dir + '/app.js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.on('error', function(err){
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(fs.createWriteStream(dir + '/bundle.js'));
}