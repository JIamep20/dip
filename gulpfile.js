var gulp =          require("gulp");
var gutil =         require("gulp-util");
var webpack =       require("webpack");
var webpackConfig = require("./webpack.config.js");
var del =           require('del');
var gulpif =        require('gulp-if');
var rename =        require('gulp-rename');
var sass =          require('gulp-sass');
var sourcemaps =    require('gulp-sourcemaps');
var cleancss =      require('gulp-clean-css');

var prod = !!gutil.env.prod;

gulp.task('clean', function () {
    return del('public/{js,css,img}');
});

gulp.task('sass', function () {
    return gulp.src('resources/assets/sass/index.scss')
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(prod, cleancss()))
        .pipe(rename('app.css'))
        .pipe(gulpif(!prod, sourcemaps.write()))
        .pipe(gulp.dest('public/css'));
});

gulp.task('webpack:build', function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            colors: true,
            chunks: false
        }));
        callback();
    });
});

gulp.task('watch', function() {
    gulp.watch(['resources/assets/js/**/*'], ['webpack:build']);
    gulp.watch(['resources/assets/sass/**/*'], ['sass'])
});

var tasks = ['sass', 'webpack:build'];

if(prod) tasks.unshift('clean');
console.log(tasks);
gulp.task('default', ['build']);
gulp.task('build', tasks);
gulp.task('build:watch', ['build', 'watch']);