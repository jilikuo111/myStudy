window.addEventListener("load", function () {
    // 标题栏透明色
    jdProject.touming();
    // 返回顶部按钮
    jdProject.returntop();
    // 秒杀剩余时间
    jdProject.lasttime();
    // 轮播图
    jdProject.lunbo();
})
var jdProject = {
    // 工具类
    tools: {
        // 时间不足10秒补0方法
        tozero: function (m) {
            return m < 10 ? "0" + m : m;
        },
        // 位移函数
        trans:function(obj,dis){
            obj.style.transform = dis;
            obj.style.webkitTransform = dis;
        },
        // 添加过渡效果
        addTrans:function(obj){
            obj.style.transition = "all 0.3s";
            obj.style.webkitTransition = "all 0.3s";
        },
        // 移出过渡效果
        removeTrans:function(obj){
            obj.style.transition = "none";
            obj.style.webkitTransition = "none";
        },
        transFunc:function(obj,callback){
            // 实现transitionend事件的兼容写法 webkitTransitionend
            obj.addEventListener("transitionend",function(e){
                console.log(this);
                (typeof callback == "function") && callback.call(this,e);
            });
            obj.addEventListener("webkitTransitionend",function(e){
                console.log(this);
                (typeof callback == "function") && callback.call(this,e);
            });
        }

    },
    // 标题栏透明色
    touming: function () {
        var oHeadcon = document.querySelector(".header_con");
        var oHeaderlunbo = document.querySelector(".header_lunbo");
        window.addEventListener("scroll", function () {
            oHeadcon.style.backgroundColor = `rgba(228, 49, 48, ${document.documentElement.scrollTop / oHeaderlunbo.offsetHeight})`;
        })
    },
    // 返回顶部
    returntop: function () {
        var oTop = document.querySelector(".goTop");
        // 获取可视区域高度
        var iH = document.documentElement.clientHeight;
        // 定义滚动距离变量
        let iTop;
        window.addEventListener("scroll", function () {
            iTop = document.documentElement.scrollTop;
            console.log(iTop);
            console.log(iH);
            if (iTop > iH) {
                oTop.style.display = "block";
            }
            else {
                oTop.style.display = "none";
            }

        })
        // 按钮点击时触发事件
        oTop.addEventListener("touchstart", function () {
            let timer = setInterval(function () {
                iTop -= 50;
                if (iTop <= 0) {
                    clearInterval(timer);
                    iTop = 0;
                }
                document.documentElement.scrollTop = iTop;
            }, 10)
        })
    },
    // 秒杀剩余时间
    lasttime: function () {
        // 获取对象
        var lstime = document.querySelectorAll(".ms-lasttime>div");
        // 假定给一个倒计时时间 3个小时
        let time = 60 * 60 * 3;
        let that = this;
        let timer = setInterval(function () {
            time--;
            // 获取时
            let h = Math.floor(time / 60 / 60);
            // 获取分
            let m = Math.floor(time % 3600 / 60);
            // 获取秒
            let s = Math.floor(time % 60);
            lstime[0].innerHTML = that.tools.tozero(h);
            lstime[1].innerHTML = that.tools.tozero(m);
            lstime[2].innerHTML = that.tools.tozero(s);
            if (time <= 0) {
                clearInterval(timer);
                return that.lasttime();
            }
        }, 1000)
    },
    // 轮播图
    lunbo: function () {
        // 1.获取对象
        var olunboBanner = document.querySelector("#lunbo_banner");
        var olunboNav = document.querySelector("#lunbo_nav");
        // 2.添加第一个li和最后一个li，实现无缝切换
        let firstLi = olunboBanner.children[0].cloneNode(true);
        let lastLi = olunboBanner.children[olunboBanner.children.length - 1].cloneNode(true);
        olunboBanner.appendChild(firstLi);
        olunboBanner.insertBefore(lastLi, olunboBanner.children[0])
        // 3.获取每个li的宽度，定义全局变量i，计数第i个li
        var iW = olunboBanner.children[0].clientWidth;
        var n = 1;
        // 4.初始化展示第一个li（也就是完成添加后的第二个li）
        // olunboBanner.style.transform = `translateX(${-iW * n}px)`;
        this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
        // 5.开启定时器，每次位移一个li
        let timer = setInterval(()=>{
            n++;
            // olunboBanner.style.transform = `translateX(${-iW * n}px)`;
            // olunboBanner.style.transition = "all 0.3s";
            this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
            this.tools.addTrans(olunboBanner);
            // this.
        }, 2000);
        // 6.过渡结束后触发事件
        olunboBanner.addEventListener("transitionend", function () {
            console.log("过度");
            if (n > olunboNav.children.length) {
                n = 1;
                // olunboBanner.style.transform = 'translateX(' + (-iW * n) + 'px)';
                // olunboBanner.style.transition = 'none';
                this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
                this.tools.removeTrans(olunboBanner);
            }
            if (n <= 0) {
                n = olunboNav.children.length;
                // olunboBanner.style.transform = 'translateX(' + (-iW * n) + 'px)';
                // olunboBanner.style.transition = 'none';
                this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
                this.tools.removeTrans(olunboBanner);

            }
            olunboNav.querySelector(".active").classList.remove("active");
            olunboNav.children[n - 1].classList.add("active");
        })

        // 手指操作
        // 1.手指按下的坐标点
        var startX = 0;
        // 2.手指滑动时候的坐标点
        var moveX = 0;
        // 3.滑动距离
        var disX = 0;
        // 4.判断手指是否滑动拉(优化)
        var isMove = false;
        // 手指点击屏幕事件
        olunboBanner.addEventListener("touchstart", (e)=> {
            clearInterval(timer);
            // 获取手指按下时的坐标点
            startX = e.touches[0].clientX;
        });
        // 手指滑动屏幕事件
        olunboBanner.addEventListener("touchmove", (e)=> {
            // 获取手指滑动的坐标点
            moveX = e.touches[0].clientX;
            // 滑动的距离
            disX = moveX - startX;
            olunboBanner.style.transform = `translateX(${-iW * n + disX}px)`
            this.tools.removeTrans(olunboBanner);
            isMove = true;
        });
        // 手指离开屏幕事件
        olunboBanner.addEventListener("touchend", ()=> {
            if (isMove) {
                // 判断disX 差值  临界值 屏幕的1/3 大于 1/3 则让轮播图滑动过去一张 否则还是当前本身
                if (Math.abs(disX) >= iW / 3) {
                    if (disX < 0) {
                        n++;
                    }
                    else {
                        n--;
                    }
                }
                // olunboBanner.style.transform = 'translateX(' + (-iW * n) + 'px)';
                // olunboBanner.style.transition = 'all 0.3s';
                this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
                this.tools.addTrans(olunboBanner);
            }
            // 变量重置
            startX = 0;
            // 2 手指滑动的时候的坐标点
            moveX = 0;
            // 3 差值距离
            disX = 0;
            // 4 判断是否手指滑动拉 (优化)
            isMove = false;
            // 开启定时器
            timer = setInterval(function () {
                n++;
                this.tools.trans(olunboBanner,`translateX(${-iW * n}px)`);
                this.tools.addTrans(olunboBanner);
            }, 2000);
        })
    }
}