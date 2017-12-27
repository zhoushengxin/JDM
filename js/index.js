window.onload =function () {
    //搜索显示
    search();
    //轮播图
    banner();
    //倒计时
    // downTime();
}


//搜索显示
var search =function () {
        var searchBox =document.querySelector(".jd_search_box");
        var banner = document.querySelector(".jd_banner")
        var height =banner.offsetHeight;


        window.onscroll =function () {
            var opacity =0;

            var top =window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if (top < height){
                opacity =top/height * 0.85
            }else {
                opacity = 0.85;
            }

            searchBox.style.background ="rgba(201,24,35,"+opacity+")";

        }

}

var banner =function () {
    var banner =document.querySelector(".jd_banner");
    var width =banner.offsetWidth;
    var imageBox =banner.querySelector("ul:first-child");
    var pointBox =banner.querySelector("ul:last-child");
    var lis =pointBox.querySelectorAll("li")


    var addTransitions =function () {
        imageBox.style.transition ="0.3s";
        imageBox.style.webkitTransition ="0.3s";
    }
    var removeTransitions =function () {
        imageBox.style.transition ="none";
        imageBox.style.webkitTransition="none";
    }
    var setTranslateX =function (translateX) {
        imageBox.style.transform = "translateX("+translateX+"px)";
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
    }

    var index = 1
    var timer =setInterval(function () {
        index++;
        addTransitions()
        var translateX = -index * width;
        setTranslateX(translateX);
    },1000);


    imageBox.addEventListener("transitionend",function () {
        if (index >=9){
            index =1;
            removeTransitions();
            var translateX = -index * width;
            setTranslateX(translateX)
        } else if (index <=0){
            index =8;
            removeTransitions();
            var translateX = - index * width;
            setTranslateX(translateX);
        }
        setPoint();
    })


    var setPoint =function () {
        pointBox.querySelector("li.now").classList.remove("now");
        lis[index - 1 ].classList.add("now")
    }


    var startX =0;
    var distanceX =0;
    var isMove =false;
    var startTime =0;

    imageBox.addEventListener("touchstart",function (e) {
        startTime = Date.now();
        startX = e.touches[0].clientX;

        clearInterval(timer);
    })

    imageBox.addEventListener("touchmove",function (e) {
        var moveX =e.touches[0].clientX;

        distanceX =moveX -startX;

        var translateX = -index * width +distanceX;
        removeTransitions();
        setTranslateX(translateX)
        isMove =true;
    })


    imageBox.addEventListener("touchend",function () {
        if (isMove){
            var totalTime =Date.now() - startTime;
            var speed =Math.abs(distanceX) / totalTime;

            if (speed>0.2){
                if (distanceX<0){
                    index++
                }else {
                    index--
                }


                addTransitions();
                setTranslateX(-index*width);
                clearInterval(timer);
                timer =setInterval(function () {
                    index++;
                    addTransitions()
                    var translateX =-index*width;
                    setTranslateX(translateX);
                },1000);
                return false;
            }

            if (Math.abs(distanceX) <width /3){
                addTransitions();
                setTranslateX(-index*width)
            }else {
                if (distanceX<0){
                    index++
                }else {
                    index--
                }

                addTransitions();0
                setTranslateX(-index *width)
            }

        }

        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加上过渡*/
            addTransitions();
            /*做定位*/
            var translateX = -index * width;
            setTranslateX(translateX);
        }, 1000);

        startX =0;
        distanceX =0;
        isMove =false;

    })

}

