const { src, dest, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const { init, watch, reload } = require('browser-sync').create();

function html() {
    return src('app/**.html')
        // .pipe(include({
        //     prefix: '@@'
        // }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'))
}

function scss() {
    return src('app/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(dest('dist/css'))
}

// function js() {
//     return src(['app/js/index.js'])
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(concat('all.js'))
//         .pipe(dest('app/js/concat/'))
// }

function fonts() {
    return src('app/fonts/**')
        .pipe(dest('dist/fonts'))
}

function serve() {
    init({
        server: './dist'
    })

    watch('app/**.html', series(html)).on('change', reload);
    watch('app/scss/**', series(scss)).on('change', reload);
    // watch('app/js/**.js', series(js)).on('change', reload);
}

exports.serve = series(html, scss, fonts, serve);