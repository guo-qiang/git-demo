/**
* 1.LESS编译 压缩 合并(合并没有必要直接导包就行)
* 2.JS合并 压缩 混淆
* 3.img复制
* 4.html压缩
*
*/

//在gulpfile中载入gulp包，因为这个包提供了一些API

var gulp = require('gulp');
var less = require('gulp-less');//将less文件编译成css文件的包
var cssnano = require('gulp-cssnano');//将该文件压缩的包
var concat = require('gulp-concat');//js合并
var uglify = require('gulp-uglify');//js压缩
var htmlmin = require('gulp-htmlmin');//html压缩
var browserSync = require('browser-sync');//监听文件
//1.LESS编译 压缩 合并
//第一个参数是任务的名字，第二个参数是任务执行的函数
gulp.task('style',function(){
	//这里是在执行style任务时自动执行的
	gulp.src('src/styles/*.less')
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'));

});
//2.JS合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'));
});
//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'));
});
//4.html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest('dist'));
});

//启动服务监视文件变化
gulp.task('serve',function(){
	browserSync({
		port:2015,
		server:{
			baseDir:['dist']
		}
	})
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);

});