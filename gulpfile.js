'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

 
	
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(SCSS_SRC)
 
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
 
            // What is the destination for the compiled file?
            .pipe(gulp.dest(SCSS_DEST))
    );
}
 
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

function watch(){
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(SCSS_SRC, style)
}
    
// Don't forget to expose the task!
exports.watch = watch


// 'use strict';

// var gulp = require('gulp')
// var sass = require('gulp-sass')
// var minifyCSS = require('gulp-clean-css')
// // var uglify = require('gulp-uglify')
// var rename = require('gulp-rename')
// var changed = require('gulp-changed')

// var SCSS_SRC = './src/Assets/scss/**/*.scss'
// var SCSS_DEST = './src/Assets/css'

// gulp.task('compile_scss', function () {
//     gulp.src(SCSS_SRC)
//     .pipe(sass().on('error', sass.logError))
//     .pipe(minifyCSS())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(changed(SCSS_DEST))
//     .pipe(gulp.dest(SCSS_DEST))
// })

// gulp.task('watch_scss', function(){
//     gulp.watch(SCSS_SRC, ['compile_scss'])

// })

// gulp.task('default', ['watch_scss'])

