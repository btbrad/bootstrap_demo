"use strict";

$(function() {
  // 当文档加载完成才会执行
  function resize() {
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth <= 768;
    // 根据大小为界面上的每一张轮播图设置背景
    $("#main_ad > .carousel-inner > .item").each(function(i, item) {
      var $item = $(item);
      var imgSrc = isSmallScreen
        ? $item.data("image-xs")
        : $item.data("image-lg");

      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
        $item.css("backgroundImage", 'url("' + imgSrc + '")');
      }
    });
  }

  $(window)
    .on("resize", resize)
    .trigger("resize");

  // 初始化tooltips插件
  $('[data-toggle="tooltip"]').tooltip();

  // 控制标签页的标签宽度
  var $ulContainer = $(".nav-tabs");
  // 获取所有子元素的宽度和
  var width = 30;
  // 遍历子元素
  $ulContainer.children().each(function(index, element) {
    // console.log(element.clientWidth);
    width += element.clientWidth;
  });
  // 判断当前ul的宽是否超出了屏幕，如果超出就显示横向滚动条
  if (width > $(window).width()) {
    // 此时width等于所有li的总和
    $ulContainer.css("width", width);
    $ulContainer.parent().css("overflow-x", "scroll");
  }

  // a点击注册事件
  var $newsTitle = $(".news-title");
  $("#news .nav-pills a").on("click", function() {
    // 获取当前点击元素
    var $this = $(this);
    //获取对应title值
    var title = $this.data("title");
    //将title设置到相应的位置
    $newsTitle.text(title);
  });

  var $carousels = $(".carousel");
  var startX;
  var endX;
  var offset = 50;
  $carousels.on("touchstart", function(e) {
    startX = e.originalEvent.touches[0].clientX;
  });
  $carousels.on("touchmove", function(e) {
    endX = e.originalEvent.touches[0].clientX;
  });
  $carousels.on("touchend", function(e) {
    var distance = Math.abs(startX - endX);
    if (distance > offset) {
      $(this).carousel(startX > endX ? "next" : "prev");
    }
  });
  // 1.获取手指在轮播图元素上的一个滑动方向
  // 2.根据获得到的方向选择上一张或者下一张
});
