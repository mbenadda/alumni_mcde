var gulp   = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src([ 'src/**/*.js' ])
    .pipe(eslint('./eslint.json'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
})

gulp.task('default', [ 'lint' ], function () {

});