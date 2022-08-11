function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = Math.ceil((target - obj.offsetLeft) / 10);
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      //停止动画
      // clearInterval(timer);
      // if (callback) {
      //   callback();
      // }
      callback && callback();
    }
    obj.style.left = obj.offsetLeft + step + "px";
  }, 30);
}
