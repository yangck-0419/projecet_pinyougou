window.addEventListener("load", function () {
  // 获取元素
  var arrow_l = document.querySelector(".arrow-l");
  var arrow_r = document.querySelector(".arrow-r");
  var focus = document.querySelector(".focus");
  var focusWidth = focus.offsetWidth;
  // 鼠标经过focus就显示隐藏按钮
  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    timer = null; //清除定时器变量
  });
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = this.setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });
  // 动态生成小圆圈，有几张图片，就生成几个小圆圈
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  for (var i = 0; i < ul.children.length; i++) {
    // 创建一个li;
    var li = document.createElement("li");
    //纪录当前小圆圈当前的索引号 通过自定义属性来做
    li.setAttribute("index", i);
    // 将li插入ol中;
    ol.appendChild(li);
    // 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
    li.addEventListener("click", function () {
      // 把所有li清除current
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      // 当前li设置current类名
      this.className = "current";
      // 点击小圆圈移动图片，移动的是ul
      //ul的移动距离就是小圆圈索引号×图片的宽度，注意是负值
      //当点击了某个li 就拿到当前li的索引号
      var index = this.getAttribute("index");
      //当我们点击了某个li,就要把li的索引号给num
      num = index;
      //当我们点击了某个li,就要把li的索引号给circle
      circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  // 把ol里面的第一个li设为类名current
  ol.children[0].className = "current";
  // 克隆第一张图片（li)放到ul最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //点击右侧按钮，向右滚动一张
  var num = 0;
  //flag是节流阀
  var flag = ture;
  // circle控制小圆圈的播放
  var circle = 0;
  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false; //关闭节流阀
      //如果走到了最后的图片，ul要快速复原，left改为0
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = ture; //打开节流阀
      });
      circle++;
      //如果circle == 4 说明走到最后克隆的图片了,就复原了
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  //左侧按钮
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      //如果走到了最后的图片，ul要快速复原，left改为0
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle--;
      //如果circle <0 说明第一张图片，则小圆圈更改为第四个小圆圈（3）
      // if (circle < 0) {
      //   circle = ol.children.length - 1;
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle;
      circleChange();
    }
  });
  function circleChange() {
    // 先清除其余小圆圈current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = "current";
  }

  //自动播放轮播图
  var timer = this.setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
});
