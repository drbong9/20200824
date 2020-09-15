/********** 사전지식 **********/
// loaderInit();
// function loaderInit(){
//     $('.loader-wrap').each(function(){
//         var $loaderWrap = $(this);
//         var $loader = $(this).find(".loader");
//         var $img = $(this).find("img");
//         var len = $img.length;
//         cnt = 0;
//         // $loader.show();
//         $img.on("load",function(){
//             cnt++;
//             console.log(cnt);
//             if(cnt == len) {
//                 $loader.hide();
//                 if($loaderWrap.hasClass('main-wrap')){
               
//                 }
//             }
//         });
//     });
// }

/********** 전역변수 **********/
var scTop = 0;
var isWingShow = false;
var mainNow = 0;
var $mainSlide = $(".main-wrap .slide");
var mainLast = $mainSlide.length - 1;
var mainSpeed = 500;
var mainGap = 3000;
var mainInterval;
var mainPager = {off:'○',on:'●'};
var cnt;

var $aboutSlide = $('.about-wrap .slide');
var aboutNow = 0;
var aboutLast = $aboutSlide.length - 1;
var aboutInterval;
var aboutgap = 4000;
aboutInit();
onAboutLeave();


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

function pfResize(){
    var imgHeight = $('.pf').eq(0).find('img').height();
    $('.pf').height(imgHeight * 0.8);
    $('.pf').find('img').css('margin-top',(-imgHeight * 0.1)+'px');
}

function aboutInit(){
    $('.about-slide').height($aboutSlide.eq(0).height());    
}

function aboutAni(){
    $aboutSlide.css('opacity',0);
    $aboutSlide.eq(aboutNow).css('opacity',1);
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
    pfResize();
    aboutInit();
    // mobile - > pc
    if($(this).outerWidth() >= 768){
        isWingShow = true;
        onWingClick();
    }
    if($(this).outerWidth() < 768){
        
    }
}

function onscroll(){
    sctop = $(this).scrollTop();    
    if(sctop > 200){
        $('.header').css('background-color','beige');
    }
    else {
        $('.header').css('background-color','white');
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
function onMainLoaded(){
    $(this.elements[0]).find('.loader').hide();
    mainInit();
    mainPagerInit();
    onMainLeave();
}

function onPfsLoaded(){
    pfResize();
    $(this.elements[0]).masonry({
        itemSelector: '.pf',
  // use element for option
        columnWidth: '.pf-sizer',
        percentPosition: true
    });
}

function onAboutPrev(){
    aboutNow = (aboutNow == 0) ? aboutLast : aboutNow - 1;
    aboutAni();
}
function onAboutNext(){
    aboutNow = (aboutNow == aboutLast) ? 0 : aboutNow + 1;
    aboutAni();
}

function onTwitter(){
    // location.href = 'https://twitter.com'
    window.open('https://twitter.com')
}

function onAboutHover(){
    clearInterval(aboutInterval);
}
function onAboutLeave(){
    aboutInterval = setInterval(onAboutNext,aboutgap);
}

/********** 이벤트등록 **********/
$('.bt-wing').click(onWingClick);
$(window).resize(onResize);
$(window).scroll(onscroll);
$('.main-wrap .bt-prev').click(onPrev);
$('.main-wrap .bt-next').click(onNext);
$('.main-wrap').hover(onMainHover,onMainLeave);
$('.main-wrap').imagesLoaded(onMainLoaded);
$('.pf-wrap .pfs').imagesLoaded(onPfsLoaded);
$('.about-slide .bt-prev').click(onAboutPrev);
$('.about-slide .bt-next').click(onAboutNext);
$('.footer .twitter').click(onTwitter);
$('.about-slide').hover(onAboutHover,onAboutLeave);