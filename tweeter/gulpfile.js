var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');


gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('scss', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'))
        .pipe(connect.reload())
});

gulp.task('html', function(){
    gulp.src('./**/*.html')
        // .pipe(gulp.dest('./'))
        .pipe(connect.reload())
})

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/'));
});

gulp.task('minify-images', () =>
    gulp.src('images/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist-images/'))
);

gulp.task('watch', function(){
	gulp.watch('scss/**/*.scss', ['scss']);
	gulp.watch('css/**/*.css',{ delay: 500 }, ['minify-css']);
    gulp.watch('./**/*.html', ['html'])
});

gulp.task('default', ['connect', 'watch', 'minify-images']);
