'use strict';

/* PLUGINS
========================================================================== */
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed'),
	rename = require('gulp-rename'),
 	livereload = require('gulp-livereload'),
	shell = require('gulp-shell'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	path = require('path'),
	requirejsOptimize = require('gulp-requirejs-optimize');

/* TASKS
========================================================================== */

//Start a jekyll server
gulp.task('jekyllStart', shell.task([
  'jekyll serve --no-watch'
]));

//Build and compile Jekyll partials for development
gulp.task('jekyllBuild', shell.task([
  'jekyll build'
]));

//Build the website for production
gulp.task('jekyllProd', shell.task([
  'jekyll build --config _prod_config.yml'
]));

//Compile, prefix and generate the CSS from SCSS files
gulp.task('css', function() {

	return gulp.src('_site/sass/main-sass.scss')

	.pipe(sourcemaps.init())
	.pipe(sass({ errLogToConsole:true }))
	.pipe(autoprefixer({
		browers: ['last 15 versions']
	}))
	.pipe(rename('main.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('_site/css/'));

});

//Minify the generated CSS for production
gulp.task('minifyCSS', function () {

	return gulp.src('_site/sass/main-sass.scss')
	.pipe(sass({ errLogToConsole:true }))
	.pipe(autoprefixer('last 15 version'))
	.pipe(minifyCSS({keepSpecialComments:0}))
	.pipe(rename('main.css'))
	.pipe(gulp.dest('build/css'));

});

//Minify images
gulp.task('imageMin', function () {

    return gulp.src(['_site/img/**/*', '!_site/img/icons/icons.svg'] )
    	.pipe(changed('build/img'))
        .pipe(imagemin({
            optimizationLevel : 7
           // use: [pngcrush()]
        }))
        .pipe(gulp.dest('build/img'));

});

//Optmize the RequireJS files
gulp.task('scripts', function () {
    return gulp.src('_site/js/main.js')
	    .pipe(requirejsOptimize(function(file) {
            return {
            	name: 'main',
            	mainConfigFile: '_site/js/main.js',
                optimize: 'uglify2',
                useStrict: true,
                baseUrl: '_site/js',
                include: ['lib/require.js']
            };
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('svgSprite', function () {
    return gulp
        .src('_site/img/icons/*.svg')
        .pipe(svgmin(function (file) {

            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('_site/img/icons/'));
});

//Copy the SVG sprite to the build folder
gulp.task('copySVG', function() {
   gulp.src('_site/img/icons/icons.svg')
   .pipe(gulp.dest('build/img/icons/'));
});

/* DEV TASKS
========================================================================== */
//Creates a jekyll Server and auto build. Loads the dev config file
gulp.task('default', function() {

	//Star the liveReload Server
	livereload({ start: true });

	//Start the jekyllServer
	gulp.start('jekyllStart');

	//When a HTML Jekyll partial change, build the templates again
	gulp.watch(['**/*.html', '!_site/**/*.html'], ['jekyllBuild']);

	//When a SASS file change, build the CSS
	gulp.watch('_site/sass/**/*.scss', ['css']);

	//When any CSS, HTML or JS files change, reload the browser
	gulp.watch(['_site/css/main.css', '_site/**/*.html', '_site/js/**/*.js']).on('change', function(file) {
		livereload.changed(file.path);
	});

});

//Build the complete site inside the "build" folder
gulp.task('build', function() {

	gulp.start('minifyCSS');
	gulp.start('imageMin');
	gulp.start('copySVG');
	gulp.start('scripts');
	gulp.start('jekyllProd');

});