define(["jquery"], function($) {
   return function throttle(callback,delay,context){
    var lasttime = 0;
    return function(){
        var now = new Date().getTime();
        if(now-lasttime > delay){
            lasttime = new Date().getTime();
            callback.call(context);
        }
    }
}
});