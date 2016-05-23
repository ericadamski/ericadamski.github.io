var gulp = require('gulp');
var gls = require('gulp-live-server');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var typescript = require('gulp-tsc');
var fs = require('fs');
var del = require('del');

gulp.task('serve', () => {
  var server = gls.new(path.join(__dirname, 'bin', 'www'));
  server.start();

  gulp.watch(['public/**/*.{js,css}', 'views/*.html'],
    (file) => server.notify.apply(server, [file]));

  gulp.watch(['app.js', 'routes/*.js'], (file) => server.start.bind(server));
});

gulp.task('clean', () =>
  del([
    path.join(__dirname, 'app', 'root.component.css'),
  ])
);

gulp.task('compress', ['clean'], () => {
  var css = gulp.src(path.join(__dirname, 'public', 'stylesheets', '*.css'))
    .pipe(concat('root.component.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(__dirname, 'app')));

  // var js = fs.readdirSync(path.join(__dirname, 'public', 'app'))
  //   .map((folder) => {
  //     if (folder !== path.basename(folder, '.ts'))
  //       return gulp.src(path.join(__dirname, 'public', 'app', folder))
  //       .pipe(typescript({
  //         experimentalDecorators: true,
  //       }))
  //       .pipe(uglify())
  //       .pipe(rename(`${path.basename(folder, '.ts')}.min.js`))
  //       .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'js')));
  //     else
  //       return gulp.src(path.join(__dirname, 'public', 'app', folder, '*.ts'))
  //       .pipe(concat(`${folder}.ts`))
  //       .pipe(gulp.dest(path.join(__dirname, 'public', 'app', folder)))
  //       .pipe(typescript({
  //         experimentalDecorators: true,
  //       }))
  //       .pipe(rename(`${folder}.min.js`))
  //       .pipe(uglify())
  //       .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'js')));
  //   });

  return css;
});

gulp.task('default', ['compress']);
