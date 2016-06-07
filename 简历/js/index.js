
$(function(){
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        'sectionsColor': ['#22B573', '#1889C5', '#26B1B6', '#695684'],
        anchors: ['1', '2', '3', '4'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['首页', '技能', '作品', '联系'],
        'scrollOverflow': true,
    })
});

$(function() {
    var current_frame, //定义当前帧
        total_frames, //定义全部帧数
        path, //定义svg中的唯一path元素
        length, //定义path所生成的素描长度
        handle; //定义javascript动画句柄

    //定义初始化方法
    var init = function () {
        current_frame = 0;
        total_frames = 80;
        path = new Array(); // 这里保存多个path元素
        length = new Array(); // 这里保存每一个path元素长度

        $('path').each(function (i, item) {
            path[i] = $(this)[0];
            len = path[i].getTotalLength();
            length[i] = len;

            path[i].style.strokeDasharray = len + ' ' + len;
            path[i].style.strokeDashoffset = len;
        });

        handle = 0;
    };
    //定义实际的动画绘制方法，基本方法类似，只不过这里需要处理多条线段的动画绘制
    var draw = function () {
        var progress = current_frame / total_frames;
        if (progress > 1) { //这里定义完成动画
            window.cancelAnimationFrame(handle);
        } else {//否则使用reqeuestAnimationFrame来生成动画
            current_frame++;
            //这里处理多条素描线段绘制动画
            for (var j = 0; j < path.length; j++) {
                path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
            }
            handle = window.requestAnimationFrame(draw);
        }
    };
    var loadimage = function () {
        setTimeout(function () {
            $('#pic').fadeIn(600);
            $('#svg').fadeOut(0);
        }, 3000);
    };
    //定义一个重新运行方法
    var rerun = function () {
        $('#pic').fadeOut(600);
        $('#svg').fadeIn();
        init();
        draw();
        loadimage();
    };
    //页面加载即运行
    rerun();
});
$(document).ready(function () {
    window.setTimeout(function(){
        $("#photo").show();
        var top=parseInt($("#pic").css("top"))+100;
        $("#photo").css("top",top+"px")
    }, 7000);
});

$(document).ready(function () {
    $(".skill-list li").mouseenter(function () { /*防止冒泡*/
        $(this).find("div").show(100);
        $(this).siblings().find("div").hide();
    });
    $(".skill-list ").mouseleave(function () {
        $(".skill-list-details").hide();
    });


    $(".item li").eq(1).hover(function() {
        $(this).find("img").animate({top:"-720px"}, 3000);
    }, function() {
        $(this).find("img").stop().css("top",0);
    });

});


