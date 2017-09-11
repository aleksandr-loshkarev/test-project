var gulp = require('gulp');
var sass = require('gulp-sass');
var scss = require('gulp-scss');
var watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');

gulp.task('scss', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('watch', function() {
    watch('src/index.html', function() {
        gulp.start('html');
    });
    watch('src/scss/*.scss', function() {
        gulp.start('scss');
    });
    watch('src/js/*.{js,json}', function() {
        gulp.start('js');
    });
    watch('src/images/*', function() {
        gulp.start('images');
    });
    watch('src/images/**/*.{png,jpg,svg}', function() {
        gulp.start('images');
    });
});
