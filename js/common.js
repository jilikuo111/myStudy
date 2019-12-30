(function() {
    //设置body的字体大小
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                // if (clientWidth >= 1200) {
                //     docEl.style.fontSize = '50px';
                // } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                // }
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
})();

/*解决iphone页面层级相互影响滑动的问题*/
// 关闭页面滚动
// function closeTouch() {
//     document
//         .getElementsByTagName("body")[0]
//         .addEventListener("touchmove", preventDefault, {
//             passive: false
//         }); //阻止默认事件
// }
// // 打开页面滚动
// function openTouch() {
//     document
//         .getElementsByTagName("body")[0]
//         .removeEventListener("touchmove", preventDefault, {
//             passive: false
//         }); //打开默认事件
// }
// // 阻止冒泡
// var preventDefault = function(e) {
//     e.preventDefault();
// }

// // ios是否能滚动
// function getEventTar(ev) {
//     ev.cancelBubble = true; // ie下阻止冒泡
// }

// // 打开导航栏
// $("header").on("click", ".nav_icon", function() {
//     toggleNav(!$("body").hasClass("show_nav"));
// })

// // 关闭导航栏
// $(document).on("click", ".fiex_nav_bg", function() {
//     toggleNav(false);
// })

// // 切换导航栏
// $(".fixed_nav").on("click", "li", function() {
//     toggleNav(false);
// })

// // isShowNav true 显示侧边导航 false 关闭侧边导航
// function toggleNav(isShowNav) {
//     if (isShowNav) {
//         $("body").addClass("show_nav");
//         closeTouch();
//     } else {
//         $("body").removeClass("show_nav");
//         openTouch();
//     }
// }