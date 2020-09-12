/********** 사전지식 **********/


/********** 전역변수 **********/
var isWingShow = false;
var mainNow = 0;
var $mainSlide = $(".main-wrap .slide");
var mainLast = $mainSlide.length - 1;
var mainSpeed = 500;
var mainGap = 3000;
var mainInterval;
var mainPager = {off:'○',on:'●'};
mainInit();
mainPagerInit();
onMainLeave();

/********** 사용자정의 **********/
function mainInit(){
    $('.slides').empty();
    $($mainSlide[mainNow]).appendTo('.main-wrap .slides').removeClass('slide');
}
function mainAni(){
    $('.main-wrap .pager').html(mainPager.off);
    $('.main-wrap .pager').eq(mainNow).html(mainPager.on);
    $($mainSlide[mainNow]).prependTo('.main-wrap .slides').css('opacity',0)
    .addClass('slide').stop()
    .animate({'opacity': 1},mainSpeed,mainInit);
}
function mainPagerInit(){
    for(var i=0,html; i<=mainLast; i++){ 
        if(mainNow == i) html = '<span class="pager">'+mainPager.on+'</span>';
        else html = '<span class="pager">'+mainPager.off+'</span>';      
        $(html).appendTo('.main-wrap .pagers').click(onPager);
    }
           
}

/********** 이벤트콜백 **********/
function onWingClick(){
    if(isWingShow){
        isWingShow = false;
        $('.wing-conts').css('transform','translateX(350px)');
        $('.wing-wrap').css('background-color','rgba(0,0,0,0)');      
        setTimeout(function(){
            $('.wing-wrap').css('display','none');
        },300);
    }
    else {
        isWingShow = true;
        $('.wing-wrap').css('display','block');
        setTimeout(function(){
            $('.wing-wrap').css('background-color','rgba(0,0,0,0.4)');
        },0);
        setTimeout(function(){
            $('.wing-conts').css('transform','translateX(0)');
        },300);
       }
}
function onResize(){
    if($(this).outerWidth() >= 768){
        isWingShow = true;
        onWingClick();
    }
    if($(this).outerWidth() < 768){
        
    }
}
function onPrev(){
    mainNow = (mainNow == 0) ? mainLast : mainNow - 1;
    mainAni();
}
function onNext(){
    mainNow = (mainNow == 3) ? 0 : mainNow + 1;
    mainAni();
}
function onPager(){
    mainNow = $(this).index();
    mainAni();
}
function onMainHover(){
    clearInterval(mainInterval);
}
function onMainLeave(){
    mainInterval = setInterval(onNext,mainGap);
}

/********** 이벤트등록 **********/
$('.bt-wing').click(onWingClick);
$(window).resize(onResize);
$('.main-wrap .bt-prev').click(onPrev);
$('.main-wrap .bt-next').click(onNext);
$('.main-wrap').hover(onMainHover,onMainLeave);