require('babel/register')({
	'optional': [ 'es7.asyncFunctions' ]
})
var gulp = require('gulp')
var mocha = require('gulp-mocha')
var runSequence = require('run-sequence')
var clean = require('gulp-clean')
var webpack = require('webpack')
var webpackConfig = require('./webpack/webpack.config')

gulp.task('default', function() {})
gulp.task('build', build)
gulp.task('test', test)
gulp.task('watch-test', watchTest)

function build() {
	runSequence('clean', 'webpack', function(){
		runSequence(['move-client-js', 'move-client-css'], 'clean-client-js-css', ['move-image', 'move-serverjs', 'move-sharejs', 'move-root'])
	})
}

function test() {
	return gulp.src(['src/js/test/test-*.js'], { read: false })
		.pipe(mocha({
			reporter: 'spec',
			globals: {
				should: require('should')
			}
		}))
}

function watchTest() {
	gulp.watch(['src/js/test/**'], ['test'])
}

gulp.task('clean', function() {
	return gulp.src('dist').pipe(clean())
})

gulp.task('move-client-js', function() {
	return gulp.src(['dist/*.js', 'dist/*.js.map'])
		.pipe(gulp.dest('dist/js/client/'))
})

gulp.task('move-client-css', function() {
	return gulp.src(['dist/*.css', 'dist/*.css.map'])
		.pipe(gulp.dest('dist/css/'))
})

gulp.task('clean-client-js-css', function(){
	return gulp.src(['dist/*.js', 'dist/*.css', 'dist/*.js.map', 'dist/*.css.map']).pipe(clean())
})

gulp.task('move-css', function() {
	return gulp.src(['src/css/**'])
		.pipe(gulp.dest('dist/css'))
})

gulp.task('move-image', function() {
	return gulp.src(['src/images/**'])
		.pipe(gulp.dest('dist/images'))
})

gulp.task('move-serverjs', function() {
	return gulp.src(['src/js/server/**'])
		.pipe(gulp.dest('dist/js/server/'))
})

gulp.task('move-sharejs', function() {
	return gulp.src(['src/js/shared/**'])
		.pipe(gulp.dest('dist/js/shared/'))
})

gulp.task('move-root', function() {
	return gulp.src(['./package.json'])
		.pipe(gulp.dest('dist/'))
})

gulp.task('webpack', function(cb) {
	return webpack(webpackConfig).run(function(err){
		if(err) console.error(err)
		if(cb) cb()
	})
})



