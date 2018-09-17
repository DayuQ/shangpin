//引入所需文件
let gulp = require('gulp');
let minify = require('gulp-babel-minify');//压缩编译  JS
let cleanCSS = require('gulp-clean-css');//压缩CSS
let connect = require('gulp-connect');//服务器
let sass = require('gulp-sass');//SASS
let Proxy = require('gulp-connect-proxy');//代理
//var proxy = require('http-proxy-middleware');
//let webserver = require('gulp-webserver');

gulp.task('build',function(){
    //CSS
    gulp.src("./src/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dest")),
    //SCSS
    gulp.src("./src/**/*.scss")
    .pipe(sass({
        outputStyle:"expanded"
    }).on('error', sass.logError))
    .pipe(gulp.dest("./dest"))
    //JS
    gulp.src("./src/**/*.js")
    .pipe(minify())
    .pipe(gulp.dest("./dest")),
    //HTML
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dest"))
})
//刷新页面
gulp.task('refreshHTML',()=>{
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dest"))
    .pipe(connect.reload())
})
//刷新CSS
gulp.task('refreshCSS',()=>{
    gulp.src("./src/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dest"))
})
//刷新SCSS
gulp.task('refreshSCSS',()=>{
    gulp.src("./src/**/*.scss")
    .pipe(sass({
        outputStyle:"expanded"
    }).on('error', sass.logError))
    .pipe(gulp.dest("./dest"))
})
//刷新JS
gulp.task('refreshJS',()=>{
    gulp.src("./src/**/*.js")
    .pipe(minify())
    .pipe(gulp.dest("./dest"))
})
//编写服务器
gulp.task("server", ()=>{
    //创建一个服务器
    connect.server({
        root : "dist", //指定服务器根目录在哪
        port : 8080, 
        livereload : true  //服务器是否可以热部署（即时刷新）
    })

})
gulp.task('server',()=>{
    connect.server({
        name:"dayu",
        root:"./dest",
        port:9000,
        livereload:true,
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
})
// gulp.task('proxyserver',function(){
//     var express = require('express');
//     var app = express();
//     app.use(express.static('dest'));
    
//     //请求http://localhost:3000/api/goodlist
//     app.use("/api/goodlist",function(req,res){
//         let prosy = http.request({
//             hostname:"www.smartisan.com",
//             path:"/product/shop_categories",
//             method:"get"
//         },(response)=>{
//             response.pipe(res);
//         });
//         prosy.on('error',(e)=>{
//             console.log(`请求遇到问题：${e.message}`);
//         })
//         prosy.end();
//     })
//     var server = app.listen(8080,function(){
//         var host=server.address().address;
//         var port = server.address().port;
//         console.log("ok",8080,port,host);
//     })
    //监听页面，CSS，JS  的改动
    






//});
    gulp.watch("./src/**/*.html",["refreshHTML"]);
    gulp.watch("./src/**/*.css",["refreshCSS","refreshHTML"]);
    gulp.watch("./src/**/*.scss",["refreshSCSS","refreshHTML"]);
    gulp.watch("./src/**/*.js",["refreshJS","refreshHTML"]);