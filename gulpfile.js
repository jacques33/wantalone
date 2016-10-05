/**
 * Created by jacques on 2016/9/17.
 */
var gulp = require('gulp');
concat = require('gulp-concat');
autoprefix = require('gulp-autoprefixer');
fileinclude = require('gulp-file-include');
connect = require('gulp-connect');
rename = require('gulp-rename');
livereload = require('gulp-livereload');

gulp.task('connect', function () {
    connect.server({
        root: './dist/',
        port: 9111,
        livereload: true
    });
});


//合并js
gulp.task('scripts1', function () {
    return gulp.src('src/js/api/*.js')
        .pipe(concat('api.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});
gulp.task('scripts2', function () {
    return gulp.src(['src/js/vendor/jquery-2.1.3.min.js', 'src/js/vendor/bootstrap.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});
gulp.task('scripts3', function () {
    return gulp.src('src/js/biz/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});
gulp.task('scripts4', function () {
    return gulp.src(['src/modules/**/*.js', 'src/modules/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/'
        }))
        .pipe(rename(function (path) {
            var dir = path.dirname;
            path.dirname = 'modules';
            path.basename = dir;
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

//合并css
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(autoprefix({browsers: ['last 5 version', 'safari >= 5', 'ie >= 8', 'opera 12.1', 'ios >= 7', 'android >= 4'],}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

//其他文件夹
gulp.task('root', function () {
    return gulp.src('src/root/*.*')
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});
gulp.task('img', function () {
    return gulp.src('src/img/*.*')
        .pipe(gulp.dest('./dist/img'))
        .pipe(livereload());
});

gulp.task('html', function () {
    return gulp.src('src/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});


gulp.watch('src/**/*.*', ['img', 'root', 'html', 'scripts1', 'scripts2', 'scripts3', 'scripts4', 'css'], function () {
    console.log('reload……');
});

gulp.task('watch',function () {
    livereload.listen();
    gulp.watch('src/**/*.*', ['img', 'root', 'html', 'scripts1', 'scripts2', 'scripts3', 'scripts4', 'css']);
});

//执行
gulp.task('default', ['watch','img', 'root', 'html', 'scripts1', 'scripts2', 'scripts3', 'scripts4', 'css', 'connect'], function () {
    // 将你的默认的任务代码放在这
});