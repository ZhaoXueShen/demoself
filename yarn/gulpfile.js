/**
 * Created by wb-zxs269841 on 2017/11/3.
 */
// var  gulp = require('gulp');
// var  babel = require('gulp-babel');
// var  del = require('del');
//
// var paths = {
//     allSrcJs: 'src/**/*.js',
//     allSrcHtml: 'src/**/*.html',
//     libDir: 'build/js',
// };
//
//
// gulp.task('build',function () {
//     gulp.src(paths.allSrcJs).pipe(babel())
//         .pipe(gulp.dest(paths.libDir));
// });
//
// gulp.task('buildh',function () {
//     gulp.src(paths.allSrcHtml).pipe(gulp.dest(paths.libDir));
// });
//
// gulp.task('default',['build','buildh']);
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import { exec } from 'child_process';

const paths = {
    allSrcJs: 'src/**/*.js',
    libDir: 'lib',
};

gulp.task('clean', () => {
    return del(paths.libDir);
});

gulp.task('build', ['clean'], () => {
    return gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], (callback) => {
    exec(`node ${paths.libDir}`, (error, stdout) => {
        console.log(stdout);
        return callback(error);
    });
});

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);