const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const reload = browserSync.reload

gulp.task('browser-sync', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./*.html').on('change', reload)
    gulp.watch('./*.css').on('change', reload)
    gulp.watch('./scss/**/*.scss', gulp.series('css'))
    gulp.watch('./**/*.pug').on('change', reload)
})



gulp.task('start', function () {
return nodemon({
    script: 'server.js'
    })
})

gulp.task('css', () => {
    return gulp.src('./scss/main.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass()) // turn sass file into css
        .pipe(prefix()) //auto prefix compiles automatically for all of the browsers
        .pipe(gulp.dest('./')) //send it to route
        .pipe(browserSync.stream()) //change the CSS file without refreshing
})



gulp.task('html', () => {
    browserSync.reload()
})

gulp.task('default',
    gulp.series('browser-sync', gulp.parallel('html', 'css')));

