var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	fs			= require('fs'),
	nodemon		= require('nodemon'),
	livereload	= require('gulp-livereload'),
	path		= require('path'),
	_			= require('lodash');


gulp.task('build', ['form-js'], function(){

});


gulp.task('form-js', function(){
	console.log('building');
	return runBuild('form');
});

gulp.task('serve', ['build'], function(){
	nodemon({
		script: 'server.js',
		ignore: ['bundle.js']
	})
	.on('restart', function(){
		livereload();
	})
});


function runBuild(dir){
	return browserify(dir + '/app.js')
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(fs.createWriteStream(dir + '/bundle.js'));
}