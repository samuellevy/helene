// gulpfile.babel.js
// All this will error out if you don't use Babel
import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";

const sassOptions = {outputStyle: 'expanded', errLogToConsole: true};

exports.sass = () => (
  gulp.src('./src/scss/styles.scss')
  .pipe(sass(sassOptions))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream: true}))
);

exports.images = () => (
  gulp.src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
  .pipe(browserSync.reload({stream: true}))
);

exports.copy = () => (
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream: true}))
);

exports.fonts = () => {
  gulp.src([
    'node_modules/@fortawesome/fontawesome-free/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
  .pipe(gulp.dest('./dist/vendor/font-awesome'))
}

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
  notify: false,
  injectChanges: true
});

gulp.watch('./src/scss/**/*', gulp.series('sass'));
gulp.watch('./src/images/**/*', gulp.series('images'));
gulp.watch('./src/*.html', gulp.series('copy'));
gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));