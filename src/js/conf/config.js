console.log("config.js被加载了");

requirejs.config({
    //beasUrl:"www.dayua.cn",
    baseUrl:"http://localhost:8080",
    paths:{
        "jquery":"https://cdn.bootcss.com/jquery/2.2.1/jquery.min",
        "my.jquery.hover":"js/mylib/my.jquery",
        "throttle":"js/mylib/throttle"
    }
})