const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const include = require('gulp-file-include');
const clean = require('gulp-clean');

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleanDist() {
    return src("dist")
        .pipe(clean());
}

exports.build = series(cleanDist, building);

function runScripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}
exports.runScripts = runScripts;


function runStyles() {
    return src('app/scss/main.scss')
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}
exports.runStyles = runStyles;


function watching() {
    watch(['app/scss/*.scss'], runStyles);
    watch(['app/js/main.js'], runScripts);
    watch(['app/components/*', 'app/pages/*'], includeFiles)
    watch(['app/*.html']).on('change', browserSync.reload);
}
exports.watching = watching;


function runServer() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
}
exports.runServer = runServer;


function includeFiles() {
    return src('./app/pages/*.html')
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./app/'));
}
exports.includeFiles = includeFiles;

exports.default = parallel(runStyles, runScripts, runServer, includeFiles, watching);