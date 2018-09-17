console.log("test.js执行了");

require(["conf/config"],function(){
    //加载其他模块
    require(["jquery"],function($){
        //搜索框出现
        $(".head-search").click(function(){
            $(this).hide();
            $("#input-search").show().animate({width:200,paddingRight:15},function(){
                $(".head-search-guanbi").fadeIn();
            })
        })
        //搜索框消失
        $(".head-search-guanbi").click(function(){
            $(this).hide();
            $("#input-search").animate({width:25,paddingRight:0},function(){
                $(this).hide();
                $(".head-search").show();
            })
        })
        //搜索
        require(["throttle"],function(Throttle){//引入函数节流
            $("#input-search").on("input",Throttle(function(){
                console.log(this.val());
                let val = this.val();
                $.ajax({
                    url:`http://localhost:9000/proxy/you.163.com/xhr/search/searchAutoComplete.json?__timestamp=1536931879451&keywordPrefix=${val}`,
                    datatype:"JSON",
                    success:function(data){

                    }
                })
            },300,$("#input-search")))
            })




        //小点的运动
        $("#pople-menu li").mouseover(function(){
            $(".head-top-down ul").eq($(this).index()).css("display","inline-block").siblings().css("display","none");
            let val = $(this).offset().left-79;
            $("#dot").stop().animate({left:val},"fast")
        })
        //头部menu的所有动画
        $(".menu-warapper li").mouseenter(function(){
            //下划线的运动
            $("#bottom-line").show().stop().animate({left:$(this).offset().left-75,width:$(this).width()},"fast");
            //遮盖层层出现 
            $(".head-bottom-wrapper").stop().animate({opacity:100},"slow");
            //显示不同的列表
            $(".head-bottom div").eq($(this).index()).show().siblings().hide();
            //获取当前列表的高度
            let _height = $(".head-bottom div").eq($(this).index()).height()+60;//注意存在上下的padding
            //列表出现动画,高度动画
            $(".head-bottom").stop().animate({top:0,opacity:100,height:_height});
        })
        $(".head-bottom").mouseleave(function(){
            $(".head-bottom").stop().animate({top:-1000,opacity:100},function(){
                $("#bottom-line").hide();
            });
            $(".head-bottom-wrapper").stop().animate({opacity:0});
        })

    })
})
