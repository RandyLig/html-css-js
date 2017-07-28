/* 获取样式 */
var getElem = function (selector) {
    return document.querySelector(selector);
};
/* 获取全部样式 */
var getAllElem = function (selector) {
    return document.querySelectorAll(selector);
};
/*获取元素样式*/
var getCls = function (element) {
    return element.getAttribute('class');
};
/*设置元素样式*/
var setCls = function (element,cls) {
     return element.setAttribute('class',cls);
};
/*为元素添加样式*/
var addCls = function (element,cls) {
    var BaseCls = getCls(element,cls);
    if (BaseCls.indexOf(cls) === -1) {
        setCls(element,BaseCls + ' '+ cls);
    }
};
/*删除元素样式*/
var delCls = function (element, cls) {
    var BaseCls = getCls(element,cls);
    if (BaseCls.indexOf(cls) !== -1) {
        setCls(element,BaseCls.split(cls).join(" ").replace(/\s+/g," "));
    }
};
//初始化样式 init
var screenAnimateElements = {

    '.screen-1' : [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow'
    ],
    '.screen-2' : [
        '.screen-2__heading',
        '.screen-2__phone',
        '.screen-2__heading2',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3'
    ],
    '.screen-3' : [
        '.screen-3__heading',
        '.screen-3__features',
        '.screen-3__heading2',
        '.screen-3__phone' ,
        '.screen-3__features-item_i_1',
        '.screen-3__features-item_i_2',
        '.screen-3__features-item_i_3',
        '.screen-3__features-item_i_4'
    ],
    '.screen-4' : [
        '.screen-4__heading',
        '.screen-4__heading2',
        '.screen-4__type-item_i_1',
        '.screen-4__type-item_i_2',
        '.screen-4__type-item_i_3',
        '.screen-4__type-item_i_4'
    ],
    '.screen-5' : [
        '.screen-5__heading',
        '.screen-5__heading2',
        '.screen-5__bg'
    ]
};
//设置样式为初始化
var setScreenAnimateInit = function (screenCls) {
    /*var screen = getElem(screenCls); //获取当前屏元素*/
    var animateElements = screenAnimateElements[screenCls]; //设置当前屏元素
    for (var i=0;i<animateElements.length;i++) {
        var element = getElem(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
    }
};
//设置样式为播放状态
var playScreenAnimate = function (screenCls) {
    /*var screen = getElem(screenCls); //获取当前屏元素*/
    var animateElements = screenAnimateElements[screenCls]; //设置当前屏元素
    for (var i=0;i<animateElements.length;i++) {
        var element = getElem(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
    }
};

/*页面加载时初始化所有样式*/
window.onload = function () {
    for (var k in screenAnimateElements) {
        setScreenAnimateInit(k);
        switchNavItems(0);
    }
};
/*//滚动到播放到哪*/
window.onscroll = function () {
    var top = document.body.scrollTop;
    if (top > 1) {
        switchNavItems(0);
        playScreenAnimate('.screen-1');
    }
    /* 为顶部导航和右侧导航实现动画 */
    if (top > 100) {
        addCls(getElem('.header'),'header_status_black');
        addCls(getElem('.outline'),'outline_status_in')
    }else {
        delCls(getElem('.header'),'header_status_black');
        delCls(getElem('.outline'),'outline_status_in')
    }
    if ( top > 800 -100) {
        playScreenAnimate('.screen-2');
        switchNavItems(1);
    }
    if ( top > 800*2 -100) {
        playScreenAnimate('.screen-3');
        switchNavItems(2);
    }
    if ( top > 800*3 -100) {
        playScreenAnimate('.screen-4');
        switchNavItems(3);
    }
    if ( top > 800*4 -100) {
        playScreenAnimate('.screen-5');
        switchNavItems(4);
    }
};
/* 导航与页面双向定位 */

var NavItems = getAllElem('.header__nav-item');
var OutLineItems = getAllElem('.outline-item');

/* 实现导航条根据页面内容切换*/
var switchNavItems = function (index) {

    /* 导航同步 */
  for ( i=0;i<NavItems.length; i++) {
      delCls(NavItems[i],'header__nav-item_status_active');
  }
    addCls(NavItems[index],'header__nav-item_status_active');
    /* 右侧同步*/
  for (var i=0;i<OutLineItems.length; i++) {
      delCls(OutLineItems[i],'outline-item_status_active');
    }
    addCls(OutLineItems[index],'outline-item_status_active');
};
/* 实现导航条的跳转 */
var setNavJump = function (i,lib) {
    var item = lib[i];
    item.onclick = function () {
        document.body.scrollTop = i*800;
    }
};
for( i=0;i<NavItems.length;i++) {
    setNavJump(i,NavItems);
}
for(var i=0;i<OutLineItems.length;i++) {
    setNavJump(i,OutLineItems);
}
/* 导航条滑动门的实现 （方法）*/
var NavTip = getElem('.header__nav-item-tip');
 var setTip = function (index,lib) {
    lib[index].onmousemove = function () {
        NavTip.style.left = (index*70) + 'px';
    };
    var activeIndex = 0;
     lib[index].onmouseout = function () {
         for (var i=0;i<lib.length;i++) {
            if(getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIndex = i;
                break;
            }
         }
         NavTip.style.left = (activeIndex*70) + 'px';
     }

};
 /* 实现滑动门 */
for( i=0;i<NavItems.length;i++) {
    setTip(i, NavItems);
}
